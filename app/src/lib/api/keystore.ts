// 카카오 사내 Keystore에서 API 키/토큰을 조회하고 프로세스 단위로 캐시하는 헬퍼 (server-only)

const KEYSTORE_BASE_URL =
  process.env.KEYSTORE_BASE_URL ?? 'https://keystore.dev.onkakao.net'

const cache = new Map<string, string>()

/**
 * Keystore에서 authKey에 해당하는 value를 조회한다.
 * 응답이 JSON 객체일 수도 있으므로 호출자는 string 결과를 그대로 토큰으로 사용한다.
 */
export async function keystore(authKey: string): Promise<string> {
  const cached = cache.get(authKey)
  if (cached) return cached

  const url = `${KEYSTORE_BASE_URL}/user/key/${authKey}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`Keystore 조회 실패: ${res.status} ${res.statusText}`)
  }
  const data = (await res.json()) as { value: unknown }
  if (typeof data.value !== 'string') {
    throw new Error('Keystore value가 문자열이 아닙니다')
  }
  cache.set(authKey, data.value)
  return data.value
}
