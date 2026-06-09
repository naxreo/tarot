#!/usr/bin/env bash
# Resize and re-encode tarot cards for web use
# Source images: ~1100x1920 JPEG @ ~1MB each
# Target: 768x1344 JPEG (quality 82) + WebP variants — about 100-200KB each

set -uo pipefail

ASSETS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RAW_DIR="${ASSETS_DIR}/cards/raw"
OUT_DIR="${ASSETS_DIR}/cards/optimized"

mkdir -p "$OUT_DIR"

TARGET_WIDTH=768
TARGET_HEIGHT=1344

echo "Optimizing cards: ${RAW_DIR} -> ${OUT_DIR}"
echo "Target: ${TARGET_WIDTH}x${TARGET_HEIGHT}, JPEG q=82 + WebP q=80"
echo "----------------------------------------"

count=0
total=$(ls "$RAW_DIR"/*.jpg 2>/dev/null | wc -l)

for src in "$RAW_DIR"/*.jpg; do
  name=$(basename "$src" .jpg)
  jpg_out="${OUT_DIR}/${name}.jpg"
  webp_out="${OUT_DIR}/${name}.webp"

  # JPEG (universal fallback)
  ffmpeg -y -loglevel error -i "$src" \
    -vf "scale=${TARGET_WIDTH}:${TARGET_HEIGHT}:flags=lanczos" \
    -q:v 4 "$jpg_out"

  # WebP (modern, ~30% smaller)
  ffmpeg -y -loglevel error -i "$src" \
    -vf "scale=${TARGET_WIDTH}:${TARGET_HEIGHT}:flags=lanczos" \
    -c:v libwebp -quality 80 "$webp_out"

  count=$((count+1))
  jpg_size=$(stat -c%s "$jpg_out")
  webp_size=$(stat -c%s "$webp_out")
  printf "  [%2d/%2d] %-22s jpg=%6dKB webp=%6dKB\n" \
    "$count" "$total" "$name" $((jpg_size/1024)) $((webp_size/1024))
done

echo "----------------------------------------"
echo "Done: $count cards optimized"
echo ""
echo "Total size:"
du -sh "$RAW_DIR" "$OUT_DIR" 2>/dev/null || true
