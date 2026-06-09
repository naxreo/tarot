import type { TarotCard } from './types'

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 0,
    slug: '00-fool',
    name: 'The Fool',
    nameKo: '바보',
    arcana: 'major',
    keywords: {
      upright: ['새로운 시작', '순수함', '모험', '자유', '가능성'],
      reversed: ['무모함', '준비 부족', '망설임', '위험'],
    },
    meaning: {
      upright:
        '새로운 여정의 시작점에 서 있습니다. 미지의 세계로 향하는 용기와 열린 마음을 의미하며, 두려움 없이 한 발 내딛는 순간의 자유를 상징합니다.',
      reversed:
        '계획 없는 충동, 무모한 도전을 경계해야 할 때입니다. 잠시 멈추고 발 밑을 살펴보세요. 모험은 좋지만, 안전한 매듭 하나는 짓고 떠나야 합니다.',
    },
    description: '절벽 끝에 선 청년이 작은 봇짐과 흰 장미를 들고 새로운 여정으로 향합니다.',
  },
  {
    id: 1,
    slug: '01-magician',
    name: 'The Magician',
    nameKo: '마법사',
    arcana: 'major',
    keywords: {
      upright: ['창조력', '의지', '실행력', '잠재력', '능력'],
      reversed: ['속임수', '재능 낭비', '미숙함', '자만'],
    },
    meaning: {
      upright:
        '당신 안의 모든 자원과 재능을 사용해 무언가를 만들어 낼 수 있는 시기입니다. 의지가 곧 현실이 됩니다.',
      reversed:
        '재능은 있지만 방향이 흐트러져 있습니다. 자신을 또는 타인을 속이고 있지 않은지 점검해 보세요.',
    },
    description: '무한대 기호 아래, 4가지 슈트의 도구를 다루는 마법사가 하늘과 땅을 잇습니다.',
  },
  {
    id: 2,
    slug: '02-high-priestess',
    name: 'The High Priestess',
    nameKo: '여사제',
    arcana: 'major',
    keywords: {
      upright: ['직관', '신비', '내면의 지혜', '무의식', '비밀'],
      reversed: ['직관 무시', '비밀 폭로', '표면적 사고'],
    },
    meaning: {
      upright:
        '논리보다 직관, 말보다 침묵에 답이 있는 시기입니다. 마음 깊은 곳의 목소리에 귀를 기울이세요.',
      reversed:
        '숨겨야 할 것이 드러나거나, 본인의 직관을 외면하고 있을 수 있습니다. 내면을 다시 살펴볼 때입니다.',
    },
    description: '두 기둥 사이, 토라 두루마리를 든 여사제가 달과 함께 신비를 지킵니다.',
  },
  {
    id: 3,
    slug: '03-empress',
    name: 'The Empress',
    nameKo: '여황제',
    arcana: 'major',
    keywords: {
      upright: ['풍요', '모성', '창조성', '사랑', '자연'],
      reversed: ['의존', '과잉보호', '창의력 상실'],
    },
    meaning: {
      upright:
        '풍요롭고 결실을 맺는 시기입니다. 사랑, 관계, 창작 활동 모두에서 따뜻한 에너지가 흐릅니다.',
      reversed:
        '돌봄이 집착이 되거나, 자신을 잊고 타인에게만 헌신하고 있을 수 있습니다. 자기 자신부터 챙겨야 합니다.',
    },
    description: '왕관에 12개의 별을 두른 여황제가 풍요로운 자연 한가운데 앉아 있습니다.',
  },
  {
    id: 4,
    slug: '04-emperor',
    name: 'The Emperor',
    nameKo: '황제',
    arcana: 'major',
    keywords: {
      upright: ['권위', '안정', '리더십', '구조', '통제력'],
      reversed: ['독재', '경직', '권력 남용'],
    },
    meaning: {
      upright:
        '질서와 규율을 통해 상황을 단단히 다질 수 있는 시기입니다. 리더의 자리에서 결단을 내려야 합니다.',
      reversed:
        '통제가 지나쳐 주변과 충돌하거나, 반대로 결단력을 잃어가고 있을 수 있습니다.',
    },
    description: '숫양 머리 장식의 왕좌에 앉은 황제가 홀과 보주를 들고 세상을 통치합니다.',
  },
  {
    id: 5,
    slug: '05-hierophant',
    name: 'The Hierophant',
    nameKo: '교황',
    arcana: 'major',
    keywords: {
      upright: ['전통', '가르침', '제도', '신념', '멘토'],
      reversed: ['반항', '비순응', '자유로운 사고'],
    },
    meaning: {
      upright:
        '전통적인 길, 검증된 방법을 따를 때 안정을 얻습니다. 좋은 멘토를 만나거나 가르침을 받게 됩니다.',
      reversed:
        '정해진 틀을 깨고 나만의 길을 찾아야 할 때입니다. 기존의 규범이 더 이상 맞지 않을 수 있습니다.',
    },
    description: '삼중관을 쓴 교황이 두 제자를 축복하고, 그의 발 아래 열쇠가 놓여 있습니다.',
  },
  {
    id: 6,
    slug: '06-lovers',
    name: 'The Lovers',
    nameKo: '연인',
    arcana: 'major',
    keywords: {
      upright: ['사랑', '조화', '결합', '선택', '가치관'],
      reversed: ['불화', '잘못된 선택', '가치관 충돌'],
    },
    meaning: {
      upright:
        '중요한 관계와 선택의 순간입니다. 마음이 향하는 곳이 곧 길입니다.',
      reversed:
        '관계에 균열이 가거나, 가치관이 맞지 않는 선택지 앞에서 망설이고 있을 수 있습니다.',
    },
    description: '천사의 축복 아래, 아담과 이브가 생명의 나무 앞에 마주 서 있습니다.',
  },
  {
    id: 7,
    slug: '07-chariot',
    name: 'The Chariot',
    nameKo: '전차',
    arcana: 'major',
    keywords: {
      upright: ['의지력', '승리', '결단', '추진력', '자기 통제'],
      reversed: ['방향 상실', '통제력 부족', '무력감'],
    },
    meaning: {
      upright:
        '강한 의지로 목표를 향해 돌진할 수 있는 시기입니다. 흔들리지 않으면 승리가 따라옵니다.',
      reversed:
        '방향을 잃고 같은 자리를 맴돌고 있습니다. 진짜 가고 싶은 곳이 어디인지 다시 물어야 합니다.',
    },
    description: '검은 스핑크스와 흰 스핑크스를 다스리며, 별빛 천막을 두른 전사가 전진합니다.',
  },
  {
    id: 8,
    slug: '08-strength',
    name: 'Strength',
    nameKo: '힘',
    arcana: 'major',
    keywords: {
      upright: ['용기', '인내', '내면의 힘', '자제력', '동정심'],
      reversed: ['약함', '자기 회의', '분노', '의심'],
    },
    meaning: {
      upright:
        '거친 사자를 부드러운 손길로 다루듯, 내면의 격렬한 감정을 평온하게 마주할 수 있는 시기입니다.',
      reversed:
        '두려움이 당신의 발목을 잡고 있습니다. 자신을 믿는 연습이 필요합니다.',
    },
    description: '꽃을 머리에 두른 여인이 사자의 입을 부드럽게 다루며, 위에 무한대 기호가 빛납니다.',
  },
  {
    id: 9,
    slug: '09-hermit',
    name: 'The Hermit',
    nameKo: '은둔자',
    arcana: 'major',
    keywords: {
      upright: ['성찰', '고독', '내면 탐구', '지혜', '안내'],
      reversed: ['외로움', '고립', '사회적 단절'],
    },
    meaning: {
      upright:
        '잠시 멀어져 자신을 들여다보는 시간이 필요합니다. 고독 속에서 지혜의 등불이 켜집니다.',
      reversed:
        '자기만의 동굴에 너무 오래 머물고 있습니다. 다시 세상으로 나올 때가 되었습니다.',
    },
    description: '눈 덮인 산 정상에서 노인이 등불을 들고 어둠을 비춥니다.',
  },
  {
    id: 10,
    slug: '10-wheel-of-fortune',
    name: 'Wheel of Fortune',
    nameKo: '운명의 수레바퀴',
    arcana: 'major',
    keywords: {
      upright: ['변화', '운명', '기회', '순환', '행운'],
      reversed: ['불운', '정체', '통제 불능'],
    },
    meaning: {
      upright:
        '큰 흐름의 전환점이 다가옵니다. 막혀 있던 것이 풀리거나, 새로운 챕터가 열립니다.',
      reversed:
        '계획대로 풀리지 않고 흐름이 거꾸로 흐르는 듯합니다. 거스르지 말고 잠시 머무세요.',
    },
    description: '네 생명체가 둘러싼 거대한 수레바퀴가 끝없이 회전합니다.',
  },
  {
    id: 11,
    slug: '11-justice',
    name: 'Justice',
    nameKo: '정의',
    arcana: 'major',
    keywords: {
      upright: ['공정', '진실', '균형', '인과응보', '책임'],
      reversed: ['불공정', '편견', '책임 회피'],
    },
    meaning: {
      upright:
        '뿌린 대로 거두는 시기입니다. 정직한 선택은 정직한 결과로 돌아옵니다.',
      reversed:
        '회피하고 싶은 진실이 있을 수 있습니다. 결과를 받아들이고 균형을 회복할 차례입니다.',
    },
    description: '왕좌에 앉은 정의의 여신이 균형의 저울과 진실의 검을 들고 있습니다.',
  },
  {
    id: 12,
    slug: '12-hanged-man',
    name: 'The Hanged Man',
    nameKo: '매달린 사람',
    arcana: 'major',
    keywords: {
      upright: ['희생', '새로운 관점', '기다림', '통찰', '항복'],
      reversed: ['정체', '무의미한 희생', '지연'],
    },
    meaning: {
      upright:
        '관점을 거꾸로 뒤집어 볼 때 답이 보입니다. 지금의 멈춤은 더 큰 도약을 위한 준비입니다.',
      reversed:
        '오래 멈춰 있는 것이 점점 의미를 잃고 있습니다. 새로운 시도로 흐름을 다시 만들어 보세요.',
    },
    description: '나무 십자가에 한 발이 묶인 채 거꾸로 매달린 사람의 얼굴 주변에 후광이 빛납니다.',
  },
  {
    id: 13,
    slug: '13-death',
    name: 'Death',
    nameKo: '죽음',
    arcana: 'major',
    keywords: {
      upright: ['종결', '변형', '새로운 시작', '정리', '해방'],
      reversed: ['변화 거부', '정체', '두려움'],
    },
    meaning: {
      upright:
        '한 단계가 분명히 끝나고, 새로운 단계가 열립니다. 진짜 죽음이 아닌 깊은 변화를 의미합니다.',
      reversed:
        '끝내야 할 것을 붙들고 있습니다. 손을 놓아야 새로운 것이 들어옵니다.',
    },
    description: '검은 갑옷의 해골 기사가 흰 장미 깃발을 들고 새로운 새벽 위를 걷습니다.',
  },
  {
    id: 14,
    slug: '14-temperance',
    name: 'Temperance',
    nameKo: '절제',
    arcana: 'major',
    keywords: {
      upright: ['균형', '조화', '절제', '인내', '융합'],
      reversed: ['불균형', '과잉', '극단'],
    },
    meaning: {
      upright:
        '서두르지 않고 두 흐름을 부드럽게 섞을 때, 가장 아름다운 결과가 만들어집니다.',
      reversed:
        '한쪽으로 너무 기울어 있습니다. 일과 쉼, 마음과 머리의 균형을 다시 잡으세요.',
    },
    description: '천사가 두 잔 사이로 물을 흘려보내며, 한 발은 땅 위에, 한 발은 물 위에 둡니다.',
  },
  {
    id: 15,
    slug: '15-devil',
    name: 'The Devil',
    nameKo: '악마',
    arcana: 'major',
    keywords: {
      upright: ['속박', '유혹', '집착', '물질주의', '중독'],
      reversed: ['해방', '자유', '깨달음'],
    },
    meaning: {
      upright:
        '무언가에 묶여 자유를 잃고 있습니다. 그 사슬은 사실 당신이 풀 수 있는 것입니다.',
      reversed:
        '오래 묶여 있던 것에서 빠져나올 힘을 회복했습니다. 한 발 내딛으세요.',
    },
    description: '뿔 달린 악마 아래 사슬에 묶인 두 사람이 서 있지만, 사슬은 헐겁습니다.',
  },
  {
    id: 16,
    slug: '16-tower',
    name: 'The Tower',
    nameKo: '탑',
    arcana: 'major',
    keywords: {
      upright: ['갑작스러운 변화', '파괴', '충격', '폭로', '깨달음'],
      reversed: ['변화 회피', '재앙 지연', '두려움'],
    },
    meaning: {
      upright:
        '단단해 보이던 구조가 무너집니다. 충격적이지만, 진짜가 아니었던 것이 떨어져 나가는 과정입니다.',
      reversed:
        '오는 변화를 자꾸 미루고 있습니다. 결국 마주해야 할 것이 있다면 차라리 빨리 마주하세요.',
    },
    description: '번개에 맞은 탑에서 왕관과 사람들이 떨어지고, 그 위에 폭풍이 휘몰아칩니다.',
  },
  {
    id: 17,
    slug: '17-star',
    name: 'The Star',
    nameKo: '별',
    arcana: 'major',
    keywords: {
      upright: ['희망', '영감', '평온', '치유', '새로운 가능성'],
      reversed: ['절망', '신뢰 상실', '부정적 사고'],
    },
    meaning: {
      upright:
        '폭풍 뒤의 고요처럼, 부드러운 빛이 당신을 다시 회복시킵니다. 작은 희망을 믿어도 좋습니다.',
      reversed:
        '잠시 빛이 흐려진 것뿐입니다. 별이 사라진 게 아니라 구름이 가린 것뿐임을 기억하세요.',
    },
    description: '8각별 아래 무릎 꿇은 여인이 두 항아리로 물을 흘려보내며 땅과 호수를 적십니다.',
  },
  {
    id: 18,
    slug: '18-moon',
    name: 'The Moon',
    nameKo: '달',
    arcana: 'major',
    keywords: {
      upright: ['환상', '직관', '무의식', '두려움', '혼란'],
      reversed: ['진실 발견', '환상에서 벗어남', '명확함'],
    },
    meaning: {
      upright:
        '확실하지 않은 시간 속에서 두려움이 솟아오를 수 있습니다. 모든 그림자가 위협은 아닙니다.',
      reversed:
        '오랫동안 흐릿했던 안개가 걷힙니다. 진짜였던 것이 무엇인지 분명히 보입니다.',
    },
    description: '두 탑 사이로 달이 떠 있고, 개와 늑대가 짖으며, 가재가 연못에서 기어 나옵니다.',
  },
  {
    id: 19,
    slug: '19-sun',
    name: 'The Sun',
    nameKo: '태양',
    arcana: 'major',
    keywords: {
      upright: ['성공', '기쁨', '활력', '긍정', '명료함'],
      reversed: ['일시적 좌절', '자기 회의', '미성숙'],
    },
    meaning: {
      upright:
        '가장 밝은 시기입니다. 노력의 결실, 진실한 기쁨, 환한 미소가 자연스럽게 따라옵니다.',
      reversed:
        '잠시 구름이 끼었지만, 태양은 그 위에 그대로입니다. 빛이 다시 닿을 때까지 멈추지 마세요.',
    },
    description: '태양 아래 해바라기 정원에서, 흰 말을 탄 어린아이가 환하게 웃고 있습니다.',
  },
  {
    id: 20,
    slug: '20-judgement',
    name: 'Judgement',
    nameKo: '심판',
    arcana: 'major',
    keywords: {
      upright: ['부활', '각성', '결정', '용서', '소명'],
      reversed: ['자기 비판', '후회', '변화 거부'],
    },
    meaning: {
      upright:
        '깊은 곳에서 부름이 들립니다. 지난 시간을 정리하고, 더 큰 자신으로 깨어날 때입니다.',
      reversed:
        '스스로에게 너무 가혹합니다. 지난 일은 흘려보내고, 다시 일어설 자격이 있습니다.',
    },
    description: '천사의 나팔 소리에 맞춰 관 속의 사람들이 두 팔을 들고 깨어납니다.',
  },
  {
    id: 21,
    slug: '21-world',
    name: 'The World',
    nameKo: '세계',
    arcana: 'major',
    keywords: {
      upright: ['완성', '성취', '통합', '여정의 끝', '충족'],
      reversed: ['미완성', '정체', '목표 미달성'],
    },
    meaning: {
      upright:
        '한 주기의 아름다운 마무리입니다. 다음 시작을 위한 가장 단단한 기반이 만들어졌습니다.',
      reversed:
        '거의 다 왔지만, 마지막 한 걸음이 남아 있습니다. 마무리에 한 번 더 정성을 들이세요.',
    },
    description: '월계관 화환 안에서 한 인물이 두 지팡이를 들고, 네 모서리에 4원소의 상징이 새겨져 있습니다.',
  },
]
