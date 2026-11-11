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
