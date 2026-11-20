# IOweTea Create Assets Context

This repository follows the static-file layout of `iowetea-home-assets`. GitHub
Pages serves files from the root of `main` with no build step. The Flutter app
is `../app`; the dashboard is `../frontend`; the API is
`../backend`.

`brand/create.svg` is the Create mark: shared cup, leaf and teabag, a prompt
chevron and cursor on the teabag, and three square workstream endpoints that
merge inside and below the cup into one release output. Run
`bash store/generate.sh` to rebuild the icon and promotional artwork from it.
The square icon centers the combined cup and leaf with equal opposite margins
to its border; the handle and Create merge character below the cup are excluded
from that measurement.
The icon shares the family's deep green-black `#0A0F0A` base, warm white cup
outlines, green leaf, and bronze teabag. Its liquid uses Create Ocean Blue
`#327F99`, with pale ocean `#73B2C6` on the release output. The liquid extends
beneath the cup outline so no dark seam appears at the lower edge. Follow the
shared [branding contract](../../../branding/contract.md).
`brand/create.svg` is the single editable cup source. Its generated
`brand/icon.svg` and `brand/icon-light.svg` provide the dark and light
treatments required by the family contract. The store uses the dark icon;
the dashboard uses the treatment that matches its current appearance.
These asset changes accompany the app and dashboard rename. The 36
screenshots still show the former product name, so review those with
the product rollout before publishing a rebranded listing.

The store package and bundle ID for the production app is
`app.iowetea.delivery`. Store listing claims must describe current behavior:
the app displays the hosted IOweTea Create dashboard and can register a phone for
task push notifications. Account creation is currently manual, the dashboard
offers password-confirmed account deletion on the Account page, and there is
no review demo mode. The public deletion page retains an email route for
people who cannot sign in. Source changes must be shipped before the store
worksheets describe this as live behavior.

The public support contact used by the dashboard source is
`create.support@iowetea.com`. Legal pages are drafts requiring owner review of the
real operator, retention, processors, and deletion procedure before release.
Never put review credentials, private account data, or screenshots of real user
tasks in this public repository.
