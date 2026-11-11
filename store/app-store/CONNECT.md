# App Store Connect worksheet — Delivery

Prepared for a **new** iOS app, bundle ID `app.iowetea.delivery`. This is a
copy-and-check guide, not a record of values already saved in Apple Developer
or App Store Connect. Build the `prod` flavor of `../delivery-app`.

## 1. Apple Developer, signing, and push notifications

1. Enroll in the Apple Developer Program and accept pending App Store Connect
   agreements. Decide the actual legal seller and confirm that `Delivery` is
   available as an app name.
2. In **Apple Developer → Certificates, Identifiers & Profiles → Identifiers
   → + → App IDs → App**, register an **explicit** ID
   `app.iowetea.delivery`. Enable **Push Notifications** for that ID. If
   distributing staging, register `app.iowetea.delivery.staging` separately
   and enable Push Notifications there too.
3. On the Mac, open `../delivery-app/ios/Runner.xcworkspace`. Under the
   **Runner** target's **Signing & Capabilities**, select your team and add or
   confirm **Push Notifications** and **Background Modes** with **Remote
   notifications** and **Background fetch**. Confirm the `prod` scheme uses
   `app.iowetea.delivery` and a matching distribution profile/certificate.
4. Confirm the *signed Release-prod archive* has an `aps-environment`
   entitlement of `production`. The source `Runner.entitlements` now says
   `production`, but the uploaded archive's signed entitlement still needs
   checking. Refresh provisioning after changing capabilities.
5. In **Apple Developer → Keys**, create an APNs authentication key with APNs
   enabled. Download the `.p8` once and record the Key ID and Team ID
   privately. In **Firebase console → Project settings → Cloud Messaging →
   Apple app configuration**, upload the key, Key ID, and Team ID to the
   Firebase project Delivery uses. An APNs auth key supports both development
   and production.
6. Register the production iOS app in that Firebase project with bundle ID
   `app.iowetea.delivery`, then replace
   `../delivery-app/ios/GoogleService-Info.plist`. Its current bundle ID is
   old. For staging, register its separate bundle ID and put its plist at
   `ios/GoogleService-Info-staging.plist`. The backend's Firebase service
   account must use the same project as these apps. Keep keys and credentials
   outside this public repository.

There is **no separate push switch in App Store Connect**. The required
capability is in Apple Developer and Xcode. On a physical iPhone, install a
signed production build, grant notification permission, sign in, enable task
alerts on **Account**, then trigger a sample task message or blocked-task
event. Check foreground, background, closed-app, and notification tap-through
to the right task. TestFlight is useful for the production APNs path.

## 2. Create the app record

In **App Store Connect → Apps → + → New App**, select **iOS** and enter:

| Field | Value to enter |
| --- | --- |
| Name | `Delivery` (subject to availability) |
| Primary language | English (UK), if that is your intended listing language |
| Bundle ID | `app.iowetea.delivery` |
| SKU | `app.iowetea.delivery` (suggested internal choice) |
| User access | Choose the appropriate team access |

Create this record before uploading a build. In **App Information**, choose
**Productivity** as the proposed primary category and complete content
rights, age rating, and other required fields. Enter the actual copyright
holder/year. Set pricing, countries/regions, availability, and release timing.
Complete EU trader status and any other regional prompts that apply.

## 3. Fill the iOS version and product page

| Field | Value to enter |
| --- | --- |
| Subtitle | `Your tasks, wherever you are` |
| Keywords | `development,tasks,projects,agents,workflow,notifications` |
| Support URL | `https://xiki808.github.io/delivery-assets/web-documents/support.html` |
| Privacy Policy URL | `https://xiki808.github.io/delivery-assets/web-documents/privacy-policy.html` |
| Marketing URL (optional) | `https://delivery.iowetea.com` |
| Privacy Choices URL (optional, if offered) | `https://xiki808.github.io/delivery-assets/web-documents/account-deletion.html` |
| Version | Match the signed build's `CFBundleShortVersionString` |

Description (plain text):

```text
Stay close to your development work from your iPhone or iPad. Delivery opens the same dashboard you use in your browser, so you can follow tasks, read updates, and respond when an agent needs your input.

Enable optional task notifications to hear when a task sends a message, becomes blocked, or reaches completion after you request an alert. Tap a notification to return to the relevant task.

Review projects, machines, agents, and task history from one place. Available features depend on your account and connected development setup.

A Delivery account is required. Contact the Delivery team for access.
```

Promotional text is optional. Upload the six images in `iphone/`
(1206 × 2622) and the six in `ipad/` (2064 × 2752), numbered Overview,
Workflow, System, Tasks, Archive, Account. The store icon is embedded in the
signed app; `icon-1024.png` is a reference. These images are fictional
browser previews of the real dashboard, not native app captures. Compare them
with the signed iPhone/iPad app and replace any whose safe area or layout
differs. Check Apple's accepted sizes when uploading. Do not show real task
data or private repository names.

## 4. Privacy, compliance, and review access

- **App Privacy:** answer from the final app *and* hosted dashboard/backend:
  account email/profile, task text/messages, machine/repository information,
  uploads, device identifier, FCM token, and connected providers. State
  actual collection, sharing, purposes, tracking, and data linked to users.
- **Account deletion:** after the new frontend and backend changes are shipped,
  Account → Delete account asks the signed-in user to confirm their email and
  password, then removes the account, backend data, uploaded files, connected
  machines, and account branches. Test this with a disposable account in the
  final build; the action cannot be undone. The public deletion page retains
  an email route for users who cannot sign in. Copies on users' own machines
  or external providers are outside Delivery's server cleanup. Do not claim
  that those copies are automatically deleted.
- **Export compliance:** answer encryption questions for the actual build and
  its HTTPS/Firebase traffic. Set any Info.plist exemption key only after
  determining the correct classification.
- **App Review Information:** enter a real first/last name, monitored email,
  and international phone. Select **Sign-in required** and enter a working
  dedicated review username/password in App Store Connect only. Keep sample
  projects/tasks and any needed connected resources available throughout
  review. Create a **second disposable review account** so Apple can test
  Account → Delete account without destroying the main review setup. Put its
  credentials only in the private Notes field. Supply a stable review setup or
  supporting video for features needing external machines. The public landing
  page is not a demo of the signed-in dashboard.

Suggested **Notes for Review** (replace bracketed details after testing the
uploaded build; enter credentials only in App Store Connect):

```text
Delivery opens the hosted development dashboard. Use the main review account in the Sign-in required fields to view sample projects and tasks. Open Tasks to inspect the task page. On Account, enable push notifications on a physical iPhone; a sample task can send a message or become blocked to demonstrate an alert. [Describe the exact sample task and any machine steps that are available to the reviewer.]

Account deletion is at Account → Delete account. To test it, use the separate disposable account listed here: [enter its username and password in this private field]. Confirm its email and password in the deletion dialog. This permanently deletes that disposable account; the main review account remains available. The public deletion page also offers an email route for users unable to sign in.
```

Publish this repository through GitHub Pages before entering the URLs. Open
the support, privacy, and deletion pages in a private browser, and review
their operator, retention, processor, and deletion statements against the
production service.

## 5. Upload, test, and submit

1. On the Mac, update the version/build number, install Flutter/CocoaPods
   dependencies, and test login, attachments, external links, account deletion,
   icon, and notifications on physical iPhone; check iPad layout too.
2. From `../delivery-app`, run `flutter build ipa --flavor prod --release`,
   or archive the `prod` scheme in Xcode. Validate bundle ID, production
   APNs entitlement, Firebase plist, icon, version, and signing. Upload via
   Xcode Organizer or Transporter, then select the processed build on the
   App Store version page.
3. Test the production build through TestFlight, including push delivery and
   tap-through. Complete any TestFlight compliance/beta review prompts.
4. Finish all required product-page, privacy, and compliance fields. Choose
   release timing, click **Add for Review**, then **Submit for Review** in the
   draft submission. Monitor review messages and release status.

## Official references

- [Register an App ID and capabilities](https://developer.apple.com/help/account/identifiers/register-an-app-id)
- [APNs authentication keys](https://developer.apple.com/help/account/capabilities/communicate-with-apns-using-authentication-tokens)
- [Firebase Cloud Messaging for Flutter](https://firebase.google.com/docs/cloud-messaging/flutter/get-started)
- [Create an App Store Connect app record](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app)
- [App version information](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information)
- [Screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications)
- [App Privacy details](https://developer.apple.com/app-store/app-privacy-details/)
- [App Review guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Offering account deletion in your app](https://developer.apple.com/support/offering-account-deletion-in-your-app/)
- [Flutter iOS release guide](https://docs.flutter.dev/deployment/ios)
- [Submit an app](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app)
