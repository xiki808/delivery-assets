# Store submission files

The production Android package and iOS bundle ID are `app.iowetea.delivery`.
The matching launcher icon is embedded in `../delivery-app`; this repository
holds the source and store artwork.

| File | Use |
| --- | --- |
| `google-play/icon-512.png` | Play listing icon, 512 × 512 opaque PNG |
| `google-play/feature-graphic.png` | Play feature graphic, 1024 × 500 opaque PNG |
| `app-store/icon-1024.png` | Reference for the icon embedded in the iOS build |
| `google-play/phone/*.png` | Six 1080 × 1920 dashboard previews |
| `app-store/iphone/*.png` | Six 1206 × 2622 dashboard previews |
| `app-store/ipad/*.png` | Six 2064 × 2752 dashboard previews |
| `google-play/CONSOLE.md` | Copy-ready Play listing and content checklist |
| `app-store/CONNECT.md` | Copy-ready App Store listing and review checklist |
| `../web-documents/*.html` | Public policy, support, and deletion URLs |

The graphics come from `brand/icon.svg` and `brand/feature-graphic.svg`. The
icon uses the web mark from `delivery-frontend/src/components/public/PublicIcon.vue`
and the web's default green accent (`oklch(68% 0.115 155)` / `#57ad79`). To
regenerate with ImageMagick:

```bash
bash store/generate.sh
```

The 18 screenshots render the actual Vue dashboard in Chromium with fictional
sample tasks. They are browser previews, not captures of the signed Flutter app.
Each device folder contains the same six views: Overview, Workflow, System,
Tasks, Archive, and Account, numbered in that order.
The capture script intercepts API calls locally and does not use a production
account. To regenerate them from this workspace:

```bash
cd ../delivery-frontend && npm run dev -- --host 127.0.0.1 --port 5190
# In another terminal:
chromium --headless=new --no-sandbox --remote-debugging-port=9223 --user-data-dir=/tmp/delivery-store-capture-chromium about:blank
# In another terminal, from delivery-assets:
node store/capture-dashboard.mjs
```

Compare these previews with the signed app on Android and iPad/iPhone before
submission. Replace any image whose layout or safe area differs from the app.

## Still needed before submission

1. Check the dashboard previews against signed-app screens on the Mac.
   They have the listed store dimensions and fictional sample content, but
   browser rendering does not capture native safe areas or system chrome.
   Use a dedicated review account with sample tasks and no private data for
   any replacement captures. Keep the final files in the same directories.
2. Provide reviewers working account credentials and any machine resources
   needed to exercise the app. There is currently no built-in demo mode.
3. Verify the Account page's deletion-request link in the final app. The
   public page offers an email route; there is no direct deletion action.
   Confirm the stores' account-deletion answers reflect manual account
   provisioning and this request flow.
4. Review all three public pages, especially the privacy policy's operator,
   retention, and provider disclosures, against the production service.
   Publish this repo with GitHub Pages, then open each URL in a private browser.
5. Build signed release binaries from `../delivery-app` and check the icon,
   Firebase configuration, notifications, login, and external document links.
   The current Android `release` build still uses the debug signing key; set up
   a production keystore before uploading an app bundle.

For current size and content requirements, see
[Google Play preview assets](https://support.google.com/googleplay/android-developer/answer/9866151),
[App Store screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications),
and the [App Review guidelines](https://developer.apple.com/app-store/review/guidelines/).
