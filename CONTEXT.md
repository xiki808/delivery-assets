# Delivery Assets Context

This repository follows the static-file layout of `iowetea/assets`. GitHub
Pages serves files from the root of `main` with no build step. The Flutter app
is `../delivery-app`; the dashboard is `../delivery-frontend`; the API is
`../delivery-backend`.

The store package and bundle ID for the production app is
`app.iowetea.delivery`. Store listing claims must describe current behavior:
the app displays the hosted Delivery dashboard and can register a phone for
task push notifications. Account creation is currently manual, the dashboard
offers password-confirmed account deletion on the Account page, and there is
no review demo mode. The public deletion page retains an email route for
people who cannot sign in. Source changes must be shipped before the store
worksheets describe this as live behavior.

The public support contact used by the current dashboard is
`info.iowetea@gmail.com`. Legal pages are drafts requiring owner review of the
real operator, retention, processors, and deletion procedure before release.
Never put review credentials, private account data, or screenshots of real user
tasks in this public repository.
