import { MAJOR_ARCANA } from './major'
import { MINOR_ARCANA } from './minor'
import type { TarotCard } from './types'

export const ALL_CARDS: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA]

export const CARDS_BY_ID = new Map<number, TarotCard>(
  ALL_CARDS.map((c) => [c.id, c])
)

export function getCard(id: number): TarotCard | undefined {
  return CARDS_BY_ID.get(id)
}

export function cardImagePath(card: TarotCard, format: 'jpg' | 'webp' = 'webp'): string {
  return `/cards/${card.slug}.${format}`
}
