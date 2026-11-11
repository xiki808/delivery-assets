# Google Play Console worksheet — Delivery

Prepared for a **new** Android app, package `app.iowetea.delivery`. This is
a copy-and-check guide, not a record of values already saved in Play Console.
Build the `prod` flavor of `../delivery-app`.

## 1. Prepare the release and Firebase push setup

1. Complete Play developer account verification and any pending agreements.
   Decide whether the app is free or paid and which countries to support.
2. In **Firebase console → Project settings → Your apps**, register an Android
   app with package `app.iowetea.delivery`. Download its
   `google-services.json` into `../delivery-app/android/app/`. The current
   file still targets an **old package ID** and must be replaced. If you
   distribute staging, register `app.iowetea.delivery.staging` separately
   and use a configuration containing both clients or flavor-specific files.
   The backend's Firebase service account must use the same project as the
   Android app so it can send FCM messages.
3. Create a private **upload keystore** and change
   `../delivery-app/android/app/build.gradle` to use its release signing
   config. The current release build uses the **debug key**; it is not ready
   for Play. Back up the upload key/passwords securely and enroll in
   **Play App Signing** for the first release.
4. Check the merged manifest and release build: `POST_NOTIFICATIONS`,
   notification channel/icon, Internet permission, target SDK, version
   code/name, and the `prod` package ID. There is **no separate Play
   Console push capability switch**. Android push uses Firebase Cloud
   Messaging and, on supported devices, Google Play services. The app asks
   for notification permission during its notification flow.
5. From `../delivery-app`, run `flutter build appbundle --flavor prod
   --release`. Install the AAB through an internal Play test on a physical
   Android phone. Sign in, enable task alerts on **Account**, trigger a sample
   task message or blocked-task event, and check foreground, background,
   closed-app, and notification tap-through behavior.

Keep keystores, Firebase service-account JSON, review credentials, and
private task data outside this public repository.

## 2. Create the Play Console app and listing

In **All apps → Create app**, enter `Delivery`, select your primary language,
choose **App** and **Free** or **Paid**, and accept the declarations shown.
Confirm the first uploaded AAB uses package `app.iowetea.delivery`; this
sets the Play package name. Follow every remaining **Dashboard → Set up your
app** task, as requirements can vary by account and release.

Under **Store presence → Main store listing** and **Store settings**, enter:

| Field | Value to enter |
| --- | --- |
| App name | `Delivery` |
| Short description | `Follow development tasks and respond when your agent needs you.` |
| App type / category | App / Productivity |
| Contact email | `info.iowetea@gmail.com` |
| Website | `https://delivery.iowetea.com` |
| Privacy policy URL | `https://xiki808.github.io/delivery-assets/web-documents/privacy-policy.html` |
| Account-deletion URL (App content) | `https://xiki808.github.io/delivery-assets/web-documents/account-deletion.html` |

Full description:

```text
Delivery puts your development tasks in reach when you are away from your computer. Sign in to the same dashboard you use in your browser to follow work, read task updates, and answer questions from your agents.

When a task needs your input or becomes blocked, the app can send a phone notification. Tap a notification to open the relevant task. You can also request a one-time notification when a task completes. Notifications are optional and depend on your account's features and device settings.

The dashboard also lets you review projects, machines, agents, and task history. Available controls depend on your account and connected development setup.

A Delivery account is required. Account access is currently arranged through the Delivery team; this app does not offer self-service sign-up.
```

Upload `icon-512.png`, `feature-graphic.png`, and the six images in
`phone/` in numbered order: Overview, Workflow, System, Tasks, Archive,
Account. They are 1080 × 1920 fictional browser previews of the real
dashboard. Compare them with the signed Android app and replace any whose
safe area or layout differs. Keep real tasks and private repository names out
of final screenshots. Add tablet/Chromebook sets only for form factors you
actually support and can verify; this repo currently has a phone set.

## 3. Complete Policy → App content

- **App access:** mark that part of the app requires sign-in. Enter a
  dedicated review account's username/password in the **private Play Console
  fields**, plus instructions to view sample tasks and test alerts. Keep
  needed sample machines/agents online during review. The public landing
  page is not signed-in dashboard access; there is no built-in demo.
- **Privacy policy and Data safety:** publish the policy URL, then audit the
  final app *and hosted dashboard/backend*. Include account email/profile,
  tasks/messages, connected machine/repository data, uploads, device ID,
  FCM token, and connected providers. Answer collection, sharing, encryption
  in transit, retention, and deletion from actual behavior.
- **Account deletion:** accounts are manually provisioned. The Account page
  links to an email deletion-request page. Describe this accurately if Play
  asks about account creation/deletion and verify the public URL. Do not
  claim immediate or in-app self-service deletion. Confirm the actual account
  model and request flow meet the current Play rule.
- **Ads, target audience, and content rating:** answer from the real release
  and intended users. No ad SDK appears in the Flutter pubspec, but check the
  hosted dashboard too. Complete any other declarations the console shows
  for your app/account, such as data practices or special app categories.
- **Permissions:** explain `POST_NOTIFICATIONS` as optional task alerts if
  asked. Check all declarations against the final merged manifest. Do not
  reuse IOweTea's VPN, camera, or foreground-service answers: Delivery does
  not have those features.

Publish this repo through GitHub Pages before entering policy/deletion URLs.
Open the privacy, support, and deletion pages in a private browser, and
review their operator, retention, processor, and deletion statements against
the production service.

## 4. Test and release

1. Upload the signed production AAB to **Test and release → Testing →
   Internal testing**, configure testers, and install from Play. Check sign-in,
   attachments, external links, deletion link, icon, and FCM delivery.
2. If this is a **personal** Play developer account created after **13
   November 2023**, run the required **closed test with at least 12 testers
   continuously opted in for at least 14 days**, then apply for production
   access on the Dashboard. Other account types should follow the
   requirements Play Console shows for that account.
3. Complete the listing, App content, and Dashboard setup. In **Test and
   release → Production**, create a release, upload/select the AAB, review
   app signing and release notes, resolve blocking warnings, choose countries
   and release timing, then submit/roll out for review. Monitor status.
4. For later updates, increase the Flutter build number (Android version
   code), build a new production AAB with the same upload key, and repeat
   release checks.

## Official references

- [Create and set up an app](https://support.google.com/googleplay/android-developer/answer/9859152)
- [Store listing graphics](https://support.google.com/googleplay/android-developer/answer/9866151)
- [App access and App content](https://support.google.com/googleplay/android-developer/answer/9859455)
- [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Account deletion](https://support.google.com/googleplay/android-developer/answer/13327111)
- [Testing requirements for new personal accounts](https://support.google.com/googleplay/android-developer/answer/14151465)
- [Firebase Cloud Messaging for Flutter](https://firebase.google.com/docs/cloud-messaging/flutter/get-started)
- [Flutter Android release guide](https://docs.flutter.dev/deployment/android)
