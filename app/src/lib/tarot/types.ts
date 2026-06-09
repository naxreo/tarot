export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'

export interface TarotCard {
  id: number
  slug: string
  name: string
  nameKo: string
  arcana: Arcana
  suit?: Suit
  number?: number
  keywords: {
    upright: string[]
    reversed: string[]
  }
  meaning: {
    upright: string
    reversed: string
  }
  description: string
}

export interface DrawnCard {
  card: TarotCard
  isReversed: boolean
  position: number
}

export interface Spread {
  id: string
  name: string
  cardCount: number
  description: string
  positions: { name: string; description: string }[]
}

export interface Category {
  id: string
  emoji: string
  label: string
  prompt: string
}
