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

  // 카드를 한 장씩 순차적으로 뒤집는다. 모두 뒤집힌 뒤에는 사용자가 '설명 보기'를 눌러야 다음 단계로 이동한다.
  useEffect(() => {
    if (draws.length === 0) return
    if (flippedCount >= draws.length) return
    const t = setTimeout(() => {
      playSfx('flip', { volume: 0.5 })
      setTimeout(() => playSfx('reveal', { volume: 0.3 }), 350)
      setFlippedCount((c) => c + 1)
    }, PER_CARD_DELAY)
    return () => clearTimeout(t)
  }, [flippedCount, draws.length])

  if (draws.length === 0 || !spread) return null

  const allFlipped = flippedCount >= draws.length

  const handleViewDetails = () => {
    playSfx('click')
    router.push('/reading/result')
  }

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

      {allFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <p className="text-center font-script text-2xl text-lavender text-glow-soft">
            이제 카드의 이야기를 들어볼 시간입니다
          </p>
          <button
            type="button"
            onClick={handleViewDetails}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gold bg-gold/10 px-10 py-4 font-display text-base tracking-widest text-gold backdrop-blur-sm transition hover:scale-105 hover:bg-gold/20"
          >
            <span className="relative z-10">설명 보기</span>
            <svg
              className="relative z-10 transition group-hover:translate-x-1"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </motion.div>
      )}
    </main>
  )
}
