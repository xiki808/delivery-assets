// Capture the real Vue dashboard with disposable API responses. No account or
// production service is contacted. Requires a local Vite server and Chromium
// with a DevTools port; see store/README.md.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const storeDir = path.dirname(fileURLToPath(import.meta.url));
const cdpBase = process.env.CDP_URL || "http://127.0.0.1:9223";
const dashboardBase = process.env.DASHBOARD_URL || "http://127.0.0.1:5190";

const fixture = String.raw`(() => {
  const now = new Date().toISOString();
  const minutesAgo = (n) => new Date(Date.now() - n * 60000).toISOString();
  const machine = {
    machine_id: "studio-machine", label: "Studio", host: "studio.local",
    status: "connected", summary: { delivery_mode: "auto", transport_intent: "running" }
  };
  const workers = [
    { worker_id: "builder", friendly_name: "Builder", status: "running", task_id: "task-12", enabled: true, transport_intent: "running", color: "#57ad79", lease: { machine_id: "studio-machine" } },
    { worker_id: "reviewer", friendly_name: "Reviewer", status: "idle", task_id: null, enabled: true, transport_intent: "running", color: "#9a82cf" }
  ];
  const task = (dir, id, title, summary, stage, status, age, worker, extra = {}) => ({
    dir, id, public_task_id: id, task_type: "feature", title, summary,
    workflow_stage: stage, status, updated_at: minutesAgo(age), tags: ["Studio/app"],
    assigned_worker: worker ? { worker_id: worker } : null,
    worker: worker && status === "running" ? { worker_id: worker } : null,
    ...extra
  });
  const board = [
    task("task-12", "tsk-12", "Build the onboarding flow", "Create a clear first-run experience for new accounts.", "build", "running", 4, "builder"),
    task("task-13", "tsk-13", "Review the release plan", "Confirm the final store copy and rollout steps.", "review", "waiting_user", 12, "reviewer", { requires_user: true }),
    task("task-14", "tsk-14", "Test account settings", "Verify sign-in, notification settings, and account links.", "testing", "completed", 35, "reviewer"),
    task("task-15", "tsk-15", "Prepare the mobile release", "Check the signed builds on Android and iOS.", "release", "pending", 22, null)
  ];
  const queue = [
    { id: 21, display_id: "tsk-21", machine_id: "studio-machine", status: "queued", queue_position: 0, task_type: "feature", title: "Polish the project overview", request: "Improve the project summary and progress view.", fields: { project: "Studio" }, created_at: minutesAgo(25), submitted_by: "Avery" },
    { id: 22, display_id: "tsk-22", machine_id: "studio-machine", status: "queued", queue_position: 1, task_type: "feature", title: "Add helpful empty states", request: "Guide new users through their first task.", fields: { project: "Studio" }, created_at: minutesAgo(60), submitted_by: "Avery" }
  ];
  const archive = [
    { dir: "task-09", id: "tsk-09", title: "Improve task search", task_type: "feature", project: "Studio", worker: "Builder", archived_at: minutesAgo(230), archive_reason: "completed", total_ms: 840000 },
    { dir: "task-08", id: "tsk-08", title: "Update project navigation", task_type: "feature", project: "Studio", worker: "Reviewer", archived_at: minutesAgo(430), archive_reason: "completed", total_ms: 1200000 }
  ];
  const dataFor = (path, search) => {
    if (path === "/api/account/me") return { email: "avery@example.test", blocked: false, tier: { label: "Business", features: { push_notifications: true, suggested_tasks: true, tuning: true }, limits: {} } };
    if (path === "/api/overview") return { machines: [machine], workers, task_queue: queue };
    if (path === "/api/worker") return workers;
    if (path === "/api/delivery/board") return { machines: [{ machine_id: machine.machine_id, rev: 1, tasks: board }] };
    if (path === "/api/task") return search.get("status") === "queue" ? queue : [];
    if (path === "/api/project") return {
      machine_id: machine.machine_id,
      project_items: [{ name: "Studio", machine_id: machine.machine_id }],
      remotes: [{ name: "Studio Git", url: "https://github.com/studio", projects: ["Studio"], has_token: true }],
      items: [{ key: "Studio/app", name: "Studio App", alias: "app", project: "Studio", remote_name: "Studio Git", remote_url: "https://github.com/studio", machine_id: machine.machine_id, branch: "main", status: "connected" }],
    };
    if (path === "/api/archive/tasks") return { machine_id: machine.machine_id, machine_label: machine.label, items: archive, summary: { total: 2, last_7_days: 2 } };
    if (path === "/api/activity") return { items: [
      { id: 3, kind: "task", severity: "info", message: "Review the release plan needs your input", timestamp: minutesAgo(12), machine_id: machine.machine_id, task_id: "tsk-13" },
      { id: 2, kind: "task", severity: "success", message: "Test account settings completed", timestamp: minutesAgo(35), machine_id: machine.machine_id, task_id: "tsk-14" },
      { id: 1, kind: "task", severity: "info", message: "Build the onboarding flow started", timestamp: minutesAgo(55), machine_id: machine.machine_id, task_id: "tsk-12" }
    ] };
    if (path === "/api/runtime/overview") return { agents: [], models: [], enabled_agents: [], stages: [], steps: [] };
    if (path === "/api/runtime/agents") return { agents: [], enabled_agents: [] };
    if (path === "/api/access") return { items: [] };
    return {};
  };
  localStorage.setItem("auth", JSON.stringify({ accessToken: "store-preview", refreshToken: "", user: { name: "Avery", email: "avery@example.test", initials: "AV" }, blocked: false }));
  window.EventSource = class { addEventListener() {} removeEventListener() {} close() {} };
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = new URL(typeof input === "string" ? input : input.url, location.href);
    if (!url.pathname.startsWith("/api/")) return originalFetch(input, init);
    const body = JSON.stringify({ data: dataFor(url.pathname, url.searchParams) });
    return Promise.resolve(new Response(body, { status: 200, headers: { "Content-Type": "application/json" } }));
  };
})();`;

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      const pending = this.pending.get(msg.id);
      if (!pending) return;
      this.pending.delete(msg.id);
      if (msg.error) pending.reject(new Error(msg.error.message));
      else pending.resolve(msg.result || {});
    });
  }
  call(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const target = await fetch(`${cdpBase}/json/new?about:blank`, { method: "PUT" }).then((r) => r.json());
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve, { once: true });
  ws.addEventListener("error", reject, { once: true });
});
const cdp = new Cdp(ws);
await cdp.call("Page.enable");
await cdp.call("Runtime.enable");
await cdp.call("Page.addScriptToEvaluateOnNewDocument", { source: fixture });

const pages = ["overview", "workflow", "system", "tasks", "archive", "account"];
const captures = [
  { device: "google-play/phone", width: 360, height: 640, scale: 3, mobile: true, pages },
  { device: "google-play/tablet-7", width: 603, height: 1072, scale: 2, mobile: true, pages },
  { device: "google-play/tablet-10", width: 720, height: 1280, scale: 2, mobile: true, pages },
  { device: "google-play/chromebook", width: 1920, height: 1080, scale: 1, mobile: false, pages },
  { device: "app-store/iphone", width: 402, height: 874, scale: 3, mobile: true, pages },
  { device: "app-store/ipad", width: 1032, height: 1376, scale: 2, mobile: true, pages },
];

for (const capture of captures) {
  if (process.env.CAPTURE_DEVICE && capture.device !== process.env.CAPTURE_DEVICE) continue;
  await cdp.call("Emulation.setDeviceMetricsOverride", {
    width: capture.width, height: capture.height,
    deviceScaleFactor: capture.scale, mobile: capture.mobile,
  });
  await cdp.call("Emulation.setTouchEmulationEnabled", { enabled: capture.mobile });
  for (const [index, page] of capture.pages.entries()) {
    if (process.env.CAPTURE_PAGE && page !== process.env.CAPTURE_PAGE) continue;
    await cdp.call("Page.navigate", { url: `${dashboardBase}/${page}` });
    await pause(2200);
    const result = await cdp.call("Runtime.evaluate", {
      expression: "JSON.stringify({path: location.pathname, text: document.body.innerText.slice(0, 260)})",
      returnByValue: true,
    });
    const state = JSON.parse(result.result.value);
    if (state.path !== `/${page}` || !state.text.toLowerCase().includes(page)) {
      throw new Error(`Dashboard failed to render ${page}: ${JSON.stringify(state)}`);
    }
    if (capture.device === "app-store/ipad" && page === "workflow") {
      await cdp.call("Runtime.evaluate", {
        expression: "[...document.querySelectorAll('button')].find((button) => button.textContent.trim() === 'List')?.click()",
      });
      await pause(450);
    }
    if (page === "tasks" && capture.device !== "app-store/ipad") {
      await cdp.call("Runtime.evaluate", {
        expression: "document.querySelector('.tasks-page').style.paddingBottom = '100vh'; const queue = document.querySelector('.queue-head'); queue.scrollIntoView({ block: 'start' }); window.scrollBy(0, queue.getBoundingClientRect().top - 85)",
      });
      await pause(450);
    }
    const screenshot = await cdp.call("Page.captureScreenshot", {
      format: "png", fromSurface: true, captureBeyondViewport: false,
    });
    const dir = path.join(storeDir, capture.device);
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${index + 1}-${page}.png`);
    await writeFile(file, Buffer.from(screenshot.data, "base64"));
    process.stdout.write(`${path.relative(storeDir, file)}: ${capture.width * capture.scale}×${capture.height * capture.scale}\n`);
  }
}
ws.close();
await fetch(`${cdpBase}/json/close/${target.id}`);
