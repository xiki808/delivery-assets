# App Store Connect worksheet — Delivery

These fields are proposed for the production iOS app. Confirm the final build,
account owner, and availability in App Store Connect.

| Field | Value |
| --- | --- |
| Name | `Delivery` |
| Bundle ID | `com.iowetea.delivery` |
| SKU | `com.iowetea.delivery` (suggested internal value) |
| Subtitle | `Your tasks, wherever you are` |
| Primary category | Productivity |
| Keywords | `development,tasks,projects,agents,workflow,notifications` |
| Support URL | `https://xiki808.github.io/delivery-assets/web-documents/support.html` |
| Privacy Policy URL | `https://xiki808.github.io/delivery-assets/web-documents/privacy-policy.html` |
| Marketing URL | `https://delivery.iowetea.com` |

Description:

```text
Stay close to your development work from your iPhone. Delivery opens the same dashboard you use in your browser, so you can follow tasks, read updates, and respond when an agent needs your input.

Enable optional task notifications to hear when a task sends a message, becomes blocked, or reaches completion after you request an alert. Tap a notification to return to the relevant task.

Review projects, machines, agents, and task history from one place. Available features depend on your account and connected development setup.

A Delivery account is required. Contact the Delivery team for access.
```

The store icon is included in the signed iOS app. `icon-1024.png` is a reference
copy. Capture screenshots from the signed app using a dedicated sample account.
App Store Connect requires at least one iPhone Dynamic Island medium screenshot
and a 13-inch iPad screenshot; this app supports iPadOS. Check the current
[accepted sizes](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications)
for the capture devices. Use actual app screens and no private task content.

## Review and disclosures

- Supply an active review account with sample projects/tasks and enough
  connected resources to exercise the app. Add real contact name, email, and
  phone in App Store Connect. The app has no full demo mode.
- Verify that the Account page opens the deletion request page. Accounts are
  provisioned manually and the request is handled by email; there is no
  direct self-service deletion action.
- Complete App Privacy from observed transmissions and retention, including
  dashboard data, FCM token, device ID, uploaded files, and connected providers.
- Answer encryption/export, age rating, content rights, territories, and trader
  information for the actual release and legal owner. Do not guess these from
  this worksheet.
- Confirm the Firebase and APNs setup on the signed iOS build; this repo does
  not contain the signing or production Firebase credentials.

Never store review credentials in this public repository. Enter them only in
App Store Connect.

Official references: [product page fields](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information),
[App Privacy](https://developer.apple.com/app-store/app-privacy-details/),
[App Review guidelines](https://developer.apple.com/app-store/review/guidelines/).
