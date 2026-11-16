#!/usr/bin/env bash
# Regenerate Studio graphics from the vector brand source.
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
python3 "$root/brand/generate.py"
temp_dir=$(mktemp -d)
trap 'rm -rf "$temp_dir"' EXIT
convert -background none -density 384 "$root/brand/icon-mark.svg" -resize 1024x1024 \
  -strip -depth 8 "PNG32:$temp_dir/studio-mark.png"

convert -background none "$root/brand/icon.svg" -strip -alpha off -depth 8 \
  "PNG24:$root/store/app-store/icon-1024.png"
convert "$root/store/app-store/icon-1024.png" -resize 512x512 -strip -depth 8 \
  "PNG32:$root/store/google-play/icon-512.png"
convert -background none "$root/brand/feature-graphic.svg" \
  \( "$temp_dir/studio-mark.png" -resize 94x94 \) -geometry +55+25 -composite \
  -font DejaVu-Sans-Bold -fill white -pointsize 61 -gravity northwest \
  -annotate +70+132 'IOweTea Studio' \
  -font DejaVu-Sans -fill '#dce2fb' -pointsize 27 \
  -annotate +74+255 'From prompt to project.' \
  -strip -alpha off -depth 8 "PNG24:$root/store/google-play/feature-graphic.png"

# Optional App Store creative placements. Both are opaque, placement-specific
# crops so text and the dashboard motif remain visible in Apple's preview.
convert -background none "$root/brand/app-store-header.svg" \
  \( "$temp_dir/studio-mark.png" -resize 340x340 \) -geometry +300+235 -composite \
  -font DejaVu-Sans-Bold -fill white -pointsize 220 -gravity northwest \
  -annotate +300+550 'IOweTea Studio' \
  -font DejaVu-Sans -fill '#dce2fb' -pointsize 92 \
  -annotate +315+910 'From prompt to project.' \
  -strip -alpha off -depth 8 "PNG24:$root/store/app-store/header.png"
convert -background none "$root/brand/app-store-search.svg" \
  \( "$temp_dir/studio-mark.png" -resize 350x350 \) -geometry +290+310 -composite \
  -font DejaVu-Sans-Bold -fill white -pointsize 230 -gravity northwest \
  -annotate +280+650 'IOweTea Studio' \
  -font DejaVu-Sans -fill '#dce2fb' -pointsize 98 \
  -annotate +295+1030 'From prompt to project.' \
  -strip -alpha off -depth 8 "PNG24:$root/store/app-store/search-results.png"
