// KAP LLM에게 타로 결과 해석을 요청하는 서버 사이드 API 라우트

import { NextResponse } from 'next/server'
import { kapChat } from '@/lib/api/kap'

export const runtime = 'nodejs'

interface CardInput {
  name: string
  nameKo: string
  arcana: 'major' | 'minor'
  suit?: string
  isReversed: boolean
  positionName?: string
  positionDescription?: string
  baseKeywords: string[]
  baseMeaning: string
}

interface InterpretRequest {
  category: { label: string; prompt: string } | null
  spread: { name: string; description: string; cardCount: number }
  cards: CardInput[]
}

export interface InterpretResponse {
  perCard: { headline: string; interpretation: string; advice: string }[]
  overall: { title: string; message: string; guidance: string }
}

const SYSTEM_PROMPT = `당신은 따뜻하고 솔직한 동네 언니/형 같은 타로 리더입니다. 점쟁이가 아니라, 카드를 빌려 상대의 일상을 같이 정리해 주는 사람입니다.

쓰기 규칙 (반드시 지킨다).
- 일상의 언어로 씁니다. 회사, 사람 관계, 공부, 운동, 잠, 돈, 휴식, 대화 같은 구체적인 맥락으로 잘게 씁니다.
- 은유·선문답·철학적 수사는 금지. "구속을 풀어낸다", "해방의 에너지", "운명의 흐름" 같은 표현 쓰지 않습니다.
- 추상명사 나열 금지. 균형·해방·통찰·에너지·본질·조화·흐름 같은 단어는 사용해도 한 문장에 하나까지만.
- "〜하는 순간 〜이 찾아올 것이고", "〜을 위한 기반이 됩니다" 식의 자기계발서 투는 지양합니다.
- 수동태 "〜되어 있습니다" 도 피하고 "〜해보세요", "〜이 도움이 될 수 있어요" 같은 구어체로 씁니다.
- 운명을 단정하지 않고, "〜할 수 있어요", "〜을 권해요" 같은 가능성 어조를 씁니다.

나쁜 예 (피해야 함).
“과거의 무모함은 현재에 균형 잡힌 나눔으로 전환되었고, 그 균형이 미래의 해방을 위한 기반이 됩니다.”
좋은 예 (이 방향).
“예전엔 혼자 다 해야 한다는 마음으로 운전대 잡았다면, 요즘은 주변 사람들과 조금씩 나눠 들고 있는 거 같아요. 그 리듬이 계속되면, 하지 않아도 되는 일까지 도맡아서 맡고 있던 부담을 덜어볼 수 있을 거예요.”

출력은 반드시 지정된 JSON 스키마를 그대로 따르며, 다른 설명·머리말·코드펜스 없이 JSON만 반환합니다.`

function buildUserPrompt(req: InterpretRequest): string {
  const { category, spread, cards } = req

  const cardsLines = cards
    .map((c, i) => {
      const orient = c.isReversed ? '역방향' : '정방향'
      const pos = c.positionName
        ? `${c.positionName}(${c.positionDescription ?? ''})`
        : `${i + 1}번째`
      const arcana =
        c.arcana === 'major'
          ? '메이저 아르카나'
          : `마이너 아르카나(${c.suit ?? ''})`
      return `- 위치 ${pos} | ${c.nameKo}(${c.name}) | ${arcana} | ${orient}\n  · 기본 키워드: ${c.baseKeywords.join(', ')}\n  · 기본 의미: ${c.baseMeaning}`
    })
    .join('\n')

  return `다음 타로 리딩 결과를 해석해 주세요.

[질문 영역]
${category ? `${category.label} — ${category.prompt}` : '오늘의 메시지'}

[스프레드]
${spread.name} (${spread.cardCount}장) — ${spread.description}

[뽑힌 카드]
${cardsLines}

요청사항.
1) 각 카드별로 해당 위치의 의미와 카드의 정/역방향을 함께 고려한 해석을 작성합니다.
2) 카드별 해석은 한 문단(3~5문장)으로 쓰되, 반드시 **구체적인 일상 장면**으로 치환합니다.
   - 좋은 예. "회의에서 말을 꺼낼지 말지 망설일 때", "친구의 연락을 답하지 못한 채 며칠이 지났을 때", "일을 마치고 퇴근해서 한숨 쉬는 저녁".
   - **쓰지 말 표현 예시**. "에너지의 원천", "내면의 통찰", "운명의 전환점", "구속을 풀어내", "해방", "본질".
3) 카드별로 오늘 하루에 바로 시도해 볼 수 있을 만한 행동 한 가지를 advice로 적습니다. 예. "자기 전에 오늘 고마웠던 사람 한 명에게 메시지 한 줄 보내 보세요."
4) 마지막으로 모든 카드를 관통하는 종합 메시지를 작성합니다. 종합도 "요즘 이런 상황이고, 이런 흐름이 보이니, 이런 식으로 해볼 수 있을 거예요" 형식의 일상적 조언으로 씁니다.

다음 JSON 스키마를 정확히 따르세요. 다른 텍스트 없이 JSON만 반환합니다.

{
  "perCard": [
    {
      "headline": "이 카드가 지금 당신에게 건네는 한 줄 요약 (구체적 상황 압축)",
      "interpretation": "카드 위치·정역방향·키워드를 반영한 3~5문장 해석. 추상어 대신 일상 장면으로 치환",
      "advice": "오늘 당장 해볼 수 있는 구체적인 행동 한 가지"
    }
    // 카드 수만큼
  ],
  "overall": {
    "title": "리딩 전체를 관통하는 짧은 제목 (12자 이내, 일상어)",
    "message": "카드들의 흐름을 종합한 4~6문장 메시지. 이야기하듯 편안한 말투",
    "guidance": "이 리딩을 마음에 새기기 위한 한 줄 가이드"
  }
}

perCard 배열의 길이는 반드시 ${cards.length}이며, 입력된 카드 순서를 유지합니다.`
}

function parseJson(content: string): InterpretResponse {
  // KAP 응답이 코드펜스에 감싸 오는 경우 대비
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  const raw = (fenced ? fenced[1] : content).trim()
  return JSON.parse(raw) as InterpretResponse
}

export async function POST(request: Request) {
  let body: InterpretRequest
  try {
    body = (await request.json()) as InterpretRequest
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  if (!body?.cards?.length || !body.spread) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  const userPrompt = buildUserPrompt(body)

  try {
    const content = await kapChat(
      [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      {
        temperature: 0.7,
        maxTokens: 3000,
        responseFormat: { type: 'json_object' },
      },
    )

    const parsed = parseJson(content)

    if (
      !Array.isArray(parsed.perCard) ||
      parsed.perCard.length !== body.cards.length ||
      !parsed.overall
    ) {
      throw new Error('해석 응답 스키마 불일치')
    }

    return NextResponse.json(parsed satisfies InterpretResponse)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error'
    console.error('[interpret] KAP 호출 실패:', message)
    return NextResponse.json(
      { error: 'kap_failed', message },
      { status: 502 },
    )
  }
}
