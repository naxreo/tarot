'use client'

import { create } from 'zustand'
import { ALL_CARDS, getCard } from '@/lib/tarot/cards'
import type { Category, DrawnCard, Spread } from '@/lib/tarot/types'

interface ReadingState {
  category: Category | null
  spread: Spread | null
  /** A randomized 78-id pool for the current reading */
  deck: number[]
  /** ids of cards user has clicked, in click order */
  picked: number[]
  /** finalized draws (with reversed orientation) — set after picking completes */
  draws: DrawnCard[]
  /** UI: BGM on/off */
  bgmEnabled: boolean

  setCategory: (c: Category) => void
  setSpread: (s: Spread) => void
  initDeck: () => void
  togglePick: (cardId: number) => void
  finalizeDraws: () => void
  reset: () => void
  setBgm: (on: boolean) => void
}

function shuffleDeck(): number[] {
  const ids = ALL_CARDS.map((c) => c.id)
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ids[i], ids[j]] = [ids[j], ids[i]]
  }
  return ids
}

export const useReading = create<ReadingState>((set, get) => ({
  category: null,
  spread: null,
  deck: [],
  picked: [],
  draws: [],
  bgmEnabled: false,

  setCategory: (c) => set({ category: c }),
  setSpread: (s) => set({ spread: s, picked: [] }),
  initDeck: () => set({ deck: shuffleDeck(), picked: [], draws: [] }),

  togglePick: (cardId) => {
    const { picked, spread } = get()
    if (!spread) return
    if (picked.includes(cardId)) {
      set({ picked: picked.filter((id) => id !== cardId) })
    } else if (picked.length < spread.cardCount) {
      set({ picked: [...picked, cardId] })
    }
  },

  finalizeDraws: () => {
    const { picked } = get()
    const draws: DrawnCard[] = picked
      .map((id, idx) => {
        const card = getCard(id)
        if (!card) return null
        return {
          card,
          isReversed: Math.random() < 0.4,
          position: idx,
        }
      })
      .filter(Boolean) as DrawnCard[]
    set({ draws })
  },

  reset: () =>
    set({
      category: null,
      spread: null,
      deck: [],
      picked: [],
      draws: [],
    }),

  setBgm: (on) => set({ bgmEnabled: on }),
}))
