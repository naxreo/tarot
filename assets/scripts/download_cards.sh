#!/usr/bin/env bash
# Download all 78 Rider-Waite-Smith tarot card images from Wikimedia Commons
# Source: Public Domain (1909, Pamela Colman Smith / Arthur Edward Waite)

set -uo pipefail

OUTPUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/cards/raw"
BASE_URL="https://commons.wikimedia.org/wiki/Special:FilePath"

mkdir -p "$OUTPUT_DIR"
cd "$OUTPUT_DIR"

# Format: <local_name>|<wikimedia_filename>
declare -a CARDS=(
  # Major Arcana (22)
  "00-fool|RWS_Tarot_00_Fool.jpg"
  "01-magician|RWS_Tarot_01_Magician.jpg"
  "02-high-priestess|RWS_Tarot_02_High_Priestess.jpg"
  "03-empress|RWS_Tarot_03_Empress.jpg"
  "04-emperor|RWS_Tarot_04_Emperor.jpg"
  "05-hierophant|RWS_Tarot_05_Hierophant.jpg"
  "06-lovers|RWS_Tarot_06_Lovers.jpg"
  "07-chariot|RWS_Tarot_07_Chariot.jpg"
  "08-strength|RWS_Tarot_08_Strength.jpg"
  "09-hermit|RWS_Tarot_09_Hermit.jpg"
  "10-wheel-of-fortune|RWS_Tarot_10_Wheel_of_Fortune.jpg"
  "11-justice|RWS_Tarot_11_Justice.jpg"
  "12-hanged-man|RWS_Tarot_12_Hanged_Man.jpg"
  "13-death|RWS_Tarot_13_Death.jpg"
  "14-temperance|RWS_Tarot_14_Temperance.jpg"
  "15-devil|RWS_Tarot_15_Devil.jpg"
  "16-tower|RWS_Tarot_16_Tower.jpg"
  "17-star|RWS_Tarot_17_Star.jpg"
  "18-moon|RWS_Tarot_18_Moon.jpg"
  "19-sun|RWS_Tarot_19_Sun.jpg"
  "20-judgement|RWS_Tarot_20_Judgement.jpg"
  "21-world|RWS_Tarot_21_World.jpg"
)

# Minor Arcana (56) - 4 suits x 14 cards
# Suits map: Wands, Cups, Swords, Pents(Pentacles)
# Numbers: 01=Ace, 02-10, 11=Page, 12=Knight, 13=Queen, 14=King
for suit_pair in "wands|Wands" "cups|Cups" "swords|Swords" "pentacles|Pents"; do
  local_suit="${suit_pair%%|*}"
  wiki_suit="${suit_pair##*|}"
  for i in $(seq -w 1 14); do
    CARDS+=("${local_suit}-${i}|${wiki_suit}${i}.jpg")
  done
done

echo "Downloading ${#CARDS[@]} cards to ${OUTPUT_DIR}"
echo "----------------------------------------"

success=0
failed=0
skipped=0

for entry in "${CARDS[@]}"; do
  local_name="${entry%%|*}"
  wiki_name="${entry##*|}"
  output_file="${local_name}.jpg"

  if [ -s "$output_file" ]; then
    echo "  [skip] $output_file (already exists)"
    skipped=$((skipped+1))
    continue
  fi

  if curl -sLf \
      --max-redirs 10 \
      --retry 3 \
      --retry-delay 2 \
      --connect-timeout 15 \
      --max-time 60 \
      -A "MysticTarot/1.0 (educational; +https://example.com)" \
      -o "$output_file" "${BASE_URL}/${wiki_name}"; then
    # Verify it's actually an image (not an error page)
    if file "$output_file" | grep -q "JPEG\|PNG\|image"; then
      size=$(stat -c%s "$output_file")
      printf "  [ ok ] %-30s (%d bytes)\n" "$output_file" "$size"
      success=$((success+1))
    else
      echo "  [fail] $output_file -- not an image"
      rm -f "$output_file"
      failed=$((failed+1))
    fi
  else
    echo "  [fail] $output_file -- curl error"
    failed=$((failed+1))
  fi

  # Rate limit: be polite to Wikimedia
  sleep 1
done

echo "----------------------------------------"
echo "Done: $success success, $failed failed, $skipped skipped"
