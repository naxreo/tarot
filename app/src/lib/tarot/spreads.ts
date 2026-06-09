import type { Spread } from './types'

export const SPREADS: Spread[] = [
  {
    id: 'one',
    name: '한 장 스프레드',
    cardCount: 1,
    description: '지금 이 순간의 메시지를 한 마디로 듣고 싶을 때',
    positions: [
      { name: '오늘의 메시지', description: '지금 당신에게 필요한 한 마디' },
    ],
  },
  {
    id: 'three',
    name: '쓰리 카드 스프레드',
    cardCount: 3,
    description: '시간의 흐름 속에서 상황을 깊이 이해하고 싶을 때',
    positions: [
      { name: '과거', description: '현재 상황을 만든 흐름' },
      { name: '현재', description: '지금 당신이 서 있는 자리' },
      { name: '미래', description: '이 흐름이 향하는 방향' },
    ],
  },
  {
    id: 'five',
    name: '파이브 카드 스프레드',
    cardCount: 5,
    description: '복잡한 상황을 입체적으로 들여다보고 싶을 때',
    positions: [
      { name: '상황', description: '지금 일어나고 있는 일' },
      { name: '도전', description: '마주하고 있는 어려움' },
      { name: '행동', description: '취할 수 있는 행동' },
      { name: '결과', description: '이대로 갔을 때의 흐름' },
      { name: '조언', description: '카드가 건네는 마지막 한 마디' },
    ],
  },
]

export function getSpread(id: string): Spread | undefined {
  return SPREADS.find((s) => s.id === id)
}
