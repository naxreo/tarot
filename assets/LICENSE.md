# 자산 라이선스 및 출처

이 디렉토리의 모든 자산은 무료로 사용할 수 있으며, 상업적 사용도 가능합니다.
각 자산의 라이선스와 원본 출처는 아래에 명시되어 있습니다.

---

## 1. 타로 카드 이미지 (78장)

**위치**: `cards/raw/`, `cards/optimized/`

- **이름**: Rider-Waite-Smith Tarot Deck
- **저작자**: Pamela Colman Smith (일러스트), Arthur Edward Waite (체계)
- **발행연도**: 1909년
- **라이선스**: **Public Domain** (저작권 만료)
  - 미국 / EU 기준 100년 이상 경과
  - 한국 저작권법상 저작자 사망 후 70년 기준 충족
- **출처**: [Wikimedia Commons - Rider-Waite Tarot](https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck)
- **다운로드 패턴**: `https://commons.wikimedia.org/wiki/Special:FilePath/<filename>`

### 카드 매핑
| 슬러그 | Wikimedia 파일명 |
|--------|------------------|
| `00-fool` ~ `21-world` | `RWS_Tarot_NN_<Name>.jpg` |
| `wands-01` ~ `wands-14` | `Wands01.jpg` ~ `Wands14.jpg` |
| `cups-01` ~ `cups-14` | `Cups01.jpg` ~ `Cups14.jpg` |
| `swords-01` ~ `swords-14` | `Swords01.jpg` ~ `Swords14.jpg` |
| `pentacles-01` ~ `pentacles-14` | `Pents01.jpg` ~ `Pents14.jpg` |

> Minor Arcana 번호 매핑: 01=Ace, 02-10=숫자, 11=Page, 12=Knight, 13=Queen, 14=King

---

## 2. 효과음 (SFX)

### 2-1. Kenney Casino Audio Pack
**위치**: `sounds/sfx/kenney-casino/` (54개 파일)

- **저작자**: Kenney (www.kenney.nl)
- **라이선스**: **CC0 (Public Domain Dedication)** — 출처 표기 불필요, 자유로운 상업적 사용
- **출처**: [OpenGameArt - 54 Casino Sound Effects](https://opengameart.org/content/54-casino-sound-effects-cards-dice-chips)
- **포맷**: OGG Vorbis
- **포함**: 카드 셔플 / 슬라이드 / 플레이스 / 팬, 칩 / 다이스 사운드

### 2-2. 80 CC0 RPG SFX
**위치**: `sounds/sfx/magic-rpg/` (선별된 33개 파일)

- **저작자**: rubberduck (OpenGameArt)
- **라이선스**: **CC0 (Public Domain Dedication)**
- **출처**: [OpenGameArt - 80 CC0 RPG SFX](https://opengameart.org/content/80-cc0-rpg-sfx)
- **포맷**: OGG Vorbis
- **포함**: 스펠 / 마법 효과 / 보석 / 동전 / 책장 넘김 등

### 2-3. Bell Chime (트림 가공)
**위치**: `sounds/sfx/chimes/bell-strike.ogg`

- **원본**: `Gong_or_bell_vibrant.ogg`
- **저작자**: Tubo (Wikimedia Commons 사용자)
- **라이선스**: **CC BY-SA 4.0** (Attribution-ShareAlike)
  - 사용 시 저작자 표기 필요
  - 파생 저작물은 동일 라이선스로 배포
- **출처**: [Wikimedia Commons - Gong or bell vibrant.ogg](https://commons.wikimedia.org/wiki/File:Gong_or_bell_vibrant.ogg)
- **가공**: 앞 5초 + fade-out 적용 (ffmpeg)

> ⚠️ **주의**: 이 파일은 BY-SA이므로 사용 시 크레딧 표기 필수. CC0 자산만 쓰려면 이 파일을 사용하지 마세요.

---

## 3. 배경 음악 (BGM)

### 3-1. Mystical Ambient (트림 가공)
**위치**: `sounds/bgm/mystical-ambient.ogg`

- **원본 곡명**: "Still Habitat" (앨범: Calm Pills - Uplifting Pills)
- **저작자**: Alaeddin Hallak
- **라이선스**: **CC0 1.0 Universal (Public Domain Dedication)**
- **출처**: [Internet Archive - Calm Pills](https://archive.org/details/CalmPills)
- **가공**: 4분 구간 추출 + fade-in/fade-out (ffmpeg, libvorbis q4)
- **용도**: 무한 루프 BGM

---

## 4. 라이선스 요약

| 자산 | 라이선스 | 크레딧 필요 | 상업적 사용 |
|------|----------|-------------|-------------|
| 타로 카드 78장 | Public Domain | ❌ | ✅ |
| Kenney Casino SFX | CC0 | ❌ | ✅ |
| 80 CC0 RPG SFX | CC0 | ❌ | ✅ |
| Bell Chime | CC BY-SA 4.0 | ✅ | ✅ |
| Mystical Ambient | CC0 | ❌ | ✅ |

---

## 5. 크레딧 표기 예시

웹사이트 footer 또는 별도 크레딧 페이지에 다음 내용을 포함하는 것을 권장합니다 (CC BY-SA 자산을 사용할 경우 필수):

```
타로 카드 이미지: Pamela Colman Smith (1909, Public Domain)
효과음: Kenney (kenney.nl, CC0), rubberduck (OpenGameArt, CC0)
종소리: Tubo (Wikimedia Commons, CC BY-SA 4.0)
배경 음악: Alaeddin Hallak - "Still Habitat" (CC0, Internet Archive)
```

---

## 6. 재다운로드 / 재생산

모든 자산은 `scripts/` 디렉토리의 스크립트로 재생산할 수 있습니다:

```bash
bash assets/scripts/download_cards.sh    # 타로 카드 다운로드
bash assets/scripts/optimize_cards.sh    # 카드 이미지 최적화
```

오디오는 수동 다운로드가 더 안정적이며, 각 URL은 위 섹션에 명시되어 있습니다.
