# Delivery Assets Context

This repository follows the static-file layout of `iowetea/assets`. GitHub
Pages serves files from the root of `main` with no build step. The Flutter app
is `../delivery-app`; the dashboard is `../delivery-frontend`; the API is
`../delivery-backend`.

The store package and bundle ID for the production app is
`com.iowetea.delivery`. Store listing claims must describe current behavior:
the app displays the hosted Delivery dashboard and can register a phone for
task push notifications. Account creation is currently manual, the dashboard
links to an account deletion request page, and there is no review demo mode.
The deletion request is handled by email; keep that clear in the store
worksheets until a direct deletion flow exists.

The public support contact used by the current dashboard is
`info.iowetea@gmail.com`. Legal pages are drafts requiring owner review of the
real operator, retention, processors, and deletion procedure before release.
Never put review credentials, private account data, or screenshots of real user
tasks in this public repository.
