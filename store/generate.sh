#!/usr/bin/env bash
# Regenerate store graphics from the vector brand sources.
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)

convert -background none "$root/brand/icon.svg" -alpha off -type TrueColor \
  "$root/store/app-store/icon-1024.png"
convert "$root/store/app-store/icon-1024.png" -resize 512x512 -alpha off -type TrueColor \
  "$root/store/google-play/icon-512.png"
convert -background none "$root/brand/feature-graphic.svg" \
  -font DejaVu-Sans-Bold -fill white -pointsize 78 -gravity northwest \
  -annotate +70+130 'Delivery' \
  -font DejaVu-Sans -fill '#d1ead9' -pointsize 27 \
  -annotate +74+255 'Your tasks, wherever you are.' \
  -alpha off -type TrueColor "$root/store/google-play/feature-graphic.png"

# Optional App Store creative placements. Both are opaque, placement-specific
# crops so text and the dashboard motif remain visible in Apple's preview.
convert -background none -resize 3840x1646! "$root/brand/app-store-header.svg" \
  -font DejaVu-Sans-Bold -fill white -pointsize 250 -gravity northwest \
  -annotate +300+550 'Delivery' \
  -font DejaVu-Sans -fill '#d1ead9' -pointsize 92 \
  -annotate +315+910 'Development, in reach.' \
  -alpha off -type TrueColor -depth 8 "$root/store/app-store/header.png"
convert -background none -resize 3840x2560! "$root/brand/app-store-search.svg" \
  -font DejaVu-Sans-Bold -fill white -pointsize 260 -gravity northwest \
  -annotate +280+650 'Delivery' \
  -font DejaVu-Sans -fill '#d1ead9' -pointsize 98 \
  -annotate +295+1030 'Follow work from anywhere.' \
  -alpha off -type TrueColor -depth 8 "$root/store/app-store/search-results.png"
