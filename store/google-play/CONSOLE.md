# Google Play Console worksheet — Delivery

These are proposed fields for the new Android app. Check them against the
signed production build and Play Console before submission.

| Field | Value |
| --- | --- |
| App name | `Delivery` |
| Package name | `com.iowetea.delivery` |
| Short description | `Follow development tasks and respond when your agent needs you.` |
| App type | App |
| Category | Productivity |
| Contact email | `info.iowetea@gmail.com` |
| Website | `https://delivery.iowetea.com` |
| Privacy policy | `https://xiki808.github.io/delivery-assets/web-documents/privacy-policy.html` |
| Account deletion | `https://xiki808.github.io/delivery-assets/web-documents/account-deletion.html` |

Full description:

```text
Delivery puts your development tasks in reach when you are away from your computer. Sign in to the same dashboard you use in your browser to follow work, read task updates, and answer questions from your agents.

When a task needs your input or becomes blocked, the app can send a phone notification. Tap a notification to open the relevant task. You can also request a one-time notification when a task completes. Notifications are optional and depend on your account's features and device settings.

The dashboard also lets you review projects, machines, agents, and task history. Available controls depend on your account and connected development setup.

A Delivery account is required. Account access is currently arranged through the Delivery team; this app does not offer self-service sign-up.
```

Upload `icon-512.png` and `feature-graphic.png`. Capture phone screenshots from
the signed app using a dedicated sample account. The screenshots must show
current screens and avoid private tasks or repository details.

## App content and review

- Mark the app as requiring sign-in. Provide a working review account and any
  connected machine needed to inspect task flows. The public landing page is
  viewable without sign-in, but it does not demonstrate the dashboard.
- Complete Data safety from the release build and server behavior. Check account
  email/profile, tasks and messages, uploaded files, FCM token, device ID,
  external providers, and deletion/retention. Do not select “no data collected”
  based on the mobile shell alone.
- Answer content rating, target audience, ads, and app access questions from
  the actual service. No advertising SDK is declared in the Flutter pubspec;
  verify the dashboard and release build too.
- Verify the deletion URL is public and the Account page opens it. Account
  creation is manual; explain that in the account-deletion questionnaire. The
  page provides an email deletion request, not immediate self-service deletion.
- The notification permission should be explained as optional task alerts.

Never put review credentials in this public repository. Enter them in the
private Play Console review fields.

Official references: [listing assets](https://support.google.com/googleplay/android-developer/answer/9866151),
[app access](https://support.google.com/googleplay/android-developer/answer/9859455),
[Data safety](https://support.google.com/googleplay/android-developer/answer/10787469),
[account deletion](https://support.google.com/googleplay/android-developer/answer/13327111).
