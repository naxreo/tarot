'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useReading } from '@/store/reading'
import { Card } from '@/components/Card'
import { playSfx } from '@/lib/sound/sfx'

const PER_CARD_DELAY = 1400

export default function RevealPage() {
  const router = useRouter()
  const draws = useReading((s) => s.draws)
  const spread = useReading((s) => s.spread)
  const [flippedCount, setFlippedCount] = useState(0)

  useEffect(() => {
    if (draws.length === 0) {
      router.replace('/reading')
    }
  }, [draws, router])

  useEffect(() => {
    if (draws.length === 0) return
    if (flippedCount >= draws.length) {
      const t = setTimeout(() => router.push('/reading/result'), 1500)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      playSfx('flip', { volume: 0.5 })
      setTimeout(() => playSfx('reveal', { volume: 0.3 }), 350)
      setFlippedCount((c) => c + 1)
    }, PER_CARD_DELAY)
    return () => clearTimeout(t)
  }, [flippedCount, draws.length, router])

  if (draws.length === 0 || !spread) return null

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center font-display text-2xl text-gold text-glow-gold md:text-3xl"
      >
        카드가 메시지를 펼칩니다
      </motion.h2>

      <div className="mt-16 flex flex-wrap justify-center gap-6 sm:gap-10">
        {draws.map((draw, idx) => {
          const isFlipped = idx < flippedCount
          const position = spread.positions[idx]
          return (
            <motion.div
              key={`${draw.card.id}-${idx}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="flex flex-col items-center gap-3"
            >
              {position && (
                <p className="font-display text-sm tracking-widest text-lavender">
                  {position.name}
                </p>
              )}

              <div className="relative">
                <Card
                  card={draw.card}
                  flipped={isFlipped}
                  reversed={draw.isReversed}
                  size="md"
                />
                {/* Burst effect during flip */}
                <AnimatePresence>
                  {isFlipped && (
                    <motion.div
                      key="burst"
                      initial={{ opacity: 0.9, scale: 0.3 }}
                      animate={{ opacity: 0, scale: 2.5 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="pointer-events-none absolute inset-0 rounded-xl bg-gold/40 blur-xl"
                    />
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {isFlipped && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-center"
                  >
                    <p className="font-display text-base text-gold">
                      {draw.card.nameKo}
                    </p>
                    {draw.isReversed && (
                      <p className="mt-0.5 text-xs text-cosmic">역방향</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {flippedCount >= draws.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center font-script text-2xl text-lavender text-glow-soft"
        >
          이제 카드의 이야기를 들어볼 시간입니다
        </motion.p>
      )}
    </main>
  )
}
