# Mystic Tarot - 자산 디렉토리

> Next.js 타로 카드 웹 앱의 정적 자산 (이미지 / 오디오) 모음.
> 모든 자산은 무료로 사용 가능하며, 라이선스는 [LICENSE.md](./LICENSE.md) 참조.

## 디렉토리 구조

```
assets/
├── README.md              (이 파일)
├── LICENSE.md             (모든 자산의 라이선스 및 출처)
├── manifest.json          (자산 식별/매핑 - 앱에서 import 가능)
│
├── cards/
│   ├── raw/               (원본 78장, ~1100x1920 JPG, 67MB)
│   └── optimized/         (웹 최적화 78장 x 2포맷 = 156개 파일, 42MB)
│       ├── 00-fool.jpg / .webp
│       ├── ...
│       └── pentacles-14.jpg / .webp
│
├── sounds/
│   ├── bgm/
│   │   └── mystical-ambient.ogg    (4분 루프 BGM, CC0)
│   └── sfx/
│       ├── kenney-casino/   (54개 카드 SFX, CC0)
│       ├── magic-rpg/       (33개 마법/UI SFX, CC0)
│       └── chimes/          (1개 종소리, CC BY-SA)
│
└── scripts/
    ├── download_cards.sh  (78장 재다운로드)
    └── optimize_cards.sh  (이미지 최적화)
```

## 자산 통계

| 카테고리 | 개수 | 총 용량 |
|----------|------|---------|
| 카드 (원본) | 78 | 67 MB |
| 카드 (최적화 JPG + WebP) | 156 | 42 MB |
| BGM | 1 | 3.0 MB |
| SFX (Kenney 카드) | 54 | 636 KB |
| SFX (RPG 마법/UI) | 33 | 1.1 MB |
| SFX (종소리) | 1 | 44 KB |

## Next.js에서 사용하기

### 1. public 디렉토리로 복사
```bash
# 프로젝트 루트의 public/ 으로 복사 (또는 심볼릭 링크)
cp -r assets/cards/optimized public/cards
cp -r assets/sounds public/sounds
```

### 2. manifest.json 활용
```typescript
// app/lib/tarot/manifest.ts
import manifest from '@/assets/manifest.json'

export const CARDS = [
  ...manifest.cards.major_arcana,
  ...manifest.cards.minor_arcana_suits.flatMap(suit =>
    manifest.cards.minor_arcana_ranks.map(rank => ({
      slug: `${suit.slug_prefix}-${rank.slug_suffix}`,
      name: `${rank.name} of ${suit.suit}`,
      name_ko: `${suit.theme} ${rank.name_ko}`,
      suit: suit.suit,
      rank: rank.rank,
    }))
  ),
]

export const SFX = manifest.audio.sfx.recommended_mapping
export const BGM = manifest.audio.bgm.tracks[0]
```

### 3. 카드 이미지 사용
```tsx
import Image from 'next/image'

<Image
  src={`/cards/${card.slug}.webp`}
  alt={card.name_ko}
  width={768}
  height={1344}
/>
```

### 4. 사운드 사용 (howler.js)
```typescript
import { Howl } from 'howler'

const cardFlip = new Howl({
  src: ['/sounds/sfx/kenney-casino/card-fan-1.ogg'],
  volume: 0.6,
})

const bgm = new Howl({
  src: ['/sounds/bgm/mystical-ambient.ogg'],
  loop: true,
  volume: 0.3,
})
```

## 카드 슬러그 규칙

### Major Arcana (22장)
`<번호 2자리>-<영어 케밥 케이스 이름>`

| 슬러그 | 카드 |
|--------|------|
| `00-fool` | The Fool |
| `01-magician` | The Magician |
| ... | ... |
| `21-world` | The World |

### Minor Arcana (56장)
`<슈트>-<번호 2자리>`

- 슈트: `wands` / `cups` / `swords` / `pentacles`
- 번호: 01(Ace) ~ 14(King)
  - 01 = Ace, 02-10 = 2~10, 11 = Page, 12 = Knight, 13 = Queen, 14 = King

예: `cups-01` = Ace of Cups, `swords-13` = Queen of Swords

## 추가 정보

- [LICENSE.md](./LICENSE.md): 라이선스 상세
- [manifest.json](./manifest.json): 자산 매니페스트
- 카드 의미 / 해석: `../타로카드_가이드.md`
- 앱 기획: `../기획서.md`
