import type { Category } from './types'

export const CATEGORIES: Category[] = [
  {
    id: 'love',
    emoji: '💕',
    label: '연애 / 관계',
    prompt: '지금 나의 관계는 어떤 흐름 위에 있나요?',
  },
  {
    id: 'career',
    emoji: '💼',
    label: '직장 / 진로',
    prompt: '나의 일과 진로는 어디로 향하고 있나요?',
  },
  {
    id: 'money',
    emoji: '💰',
    label: '재물 / 금전',
    prompt: '나의 재물 흐름에 대해 알려주세요.',
  },
  {
    id: 'self',
    emoji: '🌱',
    label: '개인 성장',
    prompt: '나 자신은 지금 어떤 단계에 있나요?',
  },
  {
    id: 'people',
    emoji: '🤝',
    label: '인간관계',
    prompt: '주변의 사람들과의 관계는 어떻게 흘러갈까요?',
  },
  {
    id: 'today',
    emoji: '🎲',
    label: '오늘의 운세',
    prompt: '오늘 하루, 카드가 건네는 메시지는 무엇인가요?',
  },
]

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id)
}
