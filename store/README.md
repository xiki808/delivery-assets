# Store submission files

The production Android package and iOS bundle ID are `com.iowetea.delivery`.
The matching launcher icon is embedded in `../delivery-app`; this repository
holds the source and store artwork.

| File | Use |
| --- | --- |
| `google-play/icon-512.png` | Play listing icon, 512 × 512 opaque PNG |
| `google-play/feature-graphic.png` | Play feature graphic, 1024 × 500 opaque PNG |
| `app-store/icon-1024.png` | Reference for the icon embedded in the iOS build |
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

## Still needed before submission

1. Capture real, signed-app screenshots on a review account with sample tasks
   and no private data. At least two phone screenshots are needed for Google
   Play; at least one accepted iPhone screenshot and one 13-inch iPad
   screenshot are needed for App Store Connect (`delivery-app` supports iPad).
   Put final
   captures under `store/google-play/phone/`, `store/app-store/iphone/`, and
   `store/app-store/ipad/`. Do not upload fabricated dashboard screenshots.
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
