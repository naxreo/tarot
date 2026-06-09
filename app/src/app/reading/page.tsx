'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/tarot/categories'
import { SPREADS } from '@/lib/tarot/spreads'
import { useReading } from '@/store/reading'
import { playSfx } from '@/lib/sound/sfx'
import { cn } from '@/lib/utils'

type Step = 'category' | 'spread'

export default function ReadingEntryPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('category')
  const setCategory = useReading((s) => s.setCategory)
  const setSpread = useReading((s) => s.setSpread)
  const initDeck = useReading((s) => s.initDeck)
  const selectedCategory = useReading((s) => s.category)

  const handleCategory = (idx: number) => {
    playSfx('select', { volume: 0.4 })
    setCategory(CATEGORIES[idx])
    setStep('spread')
  }

  const handleSpread = (idx: number) => {
    playSfx('select', { volume: 0.4 })
    setSpread(SPREADS[idx])
    initDeck()
    router.push('/reading/shuffle')
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="absolute top-6 left-6">
        {step === 'spread' && (
          <button
            onClick={() => {
              playSfx('click', { volume: 0.3 })
              setStep('category')
            }}
            className="text-sm text-moonlight/60 hover:text-gold"
          >
            ← 카테고리 다시 고르기
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {step === 'category' && (
          <motion.section
            key="category"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl"
          >
            <h1 className="text-center font-display text-3xl text-gold text-glow-gold md:text-4xl">
              무엇이 궁금한가요?
            </h1>
            <p className="mt-3 text-center text-moonlight/70">
              마음에 떠오르는 주제를 하나 선택해 주세요.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {CATEGORIES.map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCategory(idx)}
                  onMouseEnter={() => playSfx('hover', { volume: 0.15 })}
                  className="group relative flex flex-col items-center gap-3 rounded-2xl border border-gold/30 bg-mystic/20 p-6 backdrop-blur-sm transition hover:border-gold/80 hover:bg-mystic/40"
                >
                  <span className="text-4xl">{cat.emoji}</span>
                  <span className="font-display tracking-wide text-gold">
                    {cat.label}
                  </span>
                  <span className="text-xs text-moonlight/60">
                    {cat.prompt}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {step === 'spread' && (
          <motion.section
            key="spread"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl"
          >
            <h1 className="text-center font-display text-3xl text-gold text-glow-gold md:text-4xl">
              몇 장의 카드를 펼칠까요?
            </h1>
            {selectedCategory && (
              <p className="mt-3 text-center text-moonlight/70">
                <span className="text-lavender">{selectedCategory.label}</span>
                에 대해 카드를 펼칩니다.
              </p>
            )}

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {SPREADS.map((sp, idx) => (
                <motion.button
                  key={sp.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSpread(idx)}
                  onMouseEnter={() => playSfx('hover', { volume: 0.15 })}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-gold/30 bg-mystic/20 p-6 text-left backdrop-blur-sm transition hover:border-gold/80 hover:bg-mystic/40"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl text-gold">
                      {sp.cardCount}
                    </span>
                    <span className="text-sm text-moonlight/60">장</span>
                  </div>
                  <p className="font-display text-lg text-moonlight">
                    {sp.name}
                  </p>
                  <p className="text-xs leading-relaxed text-moonlight/60">
                    {sp.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {sp.positions.map((p, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-gold/30 px-2 py-0.5 text-[10px] text-lavender"
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}
