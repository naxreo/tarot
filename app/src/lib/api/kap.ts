// 카카오 사내 KAP LLM(gpt-oss-120b, OpenAI 호환) Chat Completions 호출 클라이언트 (server-only)

import { keystore } from './keystore'

const KAP_BASE_URL =
  process.env.KAP_BASE_URL ?? 'https://api-inference-internal.kap.9rum.cc'
const KAP_AUTH_KEY = process.env.KAP_KEYSTORE_AUTH_KEY ?? 'ffwogqGXCylOstbb'
const KAP_MODEL = process.env.KAP_MODEL ?? 'gpt-oss-120b'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatOptions {
  temperature?: number
  maxTokens?: number
  /** OpenAI 호환 response_format. JSON 강제 시 { type: 'json_object' } */
  responseFormat?: { type: 'json_object' }
  /** 호출 타임아웃 (ms) */
  timeoutMs?: number
}

interface ChatCompletionResponse {
  choices: { message: { content: string } }[]
}

export async function kapChat(
  messages: ChatMessage[],
  options: ChatOptions = {},
): Promise<string> {
  const token = await keystore(KAP_AUTH_KEY)

  const controller = new AbortController()
  const timeoutMs = options.timeoutMs ?? 60_000
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(`${KAP_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: KAP_MODEL,
        messages,
        temperature: options.temperature ?? 0.6,
        max_tokens: options.maxTokens ?? 3000,
        ...(options.responseFormat
          ? { response_format: options.responseFormat }
          : {}),
      }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(`KAP 호출 실패: ${res.status} ${res.statusText} ${body}`)
    }

    const data = (await res.json()) as ChatCompletionResponse
    const content = data.choices?.[0]?.message?.content
    if (!content) throw new Error('KAP 응답에 content가 없습니다')
    return content
  } finally {
    clearTimeout(timer)
  }
}
