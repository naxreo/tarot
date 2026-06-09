'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useReading } from '@/store/reading'
import { CardBack } from '@/components/CardBack'
import { playSfx } from '@/lib/sound/sfx'

const DUMMY_CARDS = 18
const SHUFFLE_DURATION = 3200

export default function ShufflePage() {
  const router = useRouter()
  const spread = useReading((s) => s.spread)

  useEffect(() => {
    if (!spread) {
      router.replace('/reading')
      return
    }
    playSfx('shuffle', { volume: 0.5 })
    const t = setTimeout(() => router.push('/reading/select'), SHUFFLE_DURATION)
    return () => clearTimeout(t)
  }, [router, spread])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="font-display text-2xl text-gold text-glow-gold md:text-3xl"
      >
        카드를 섞고 있습니다
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-4 text-center text-moonlight/70"
      >
        마음을 가다듬고, 호흡을 골라 보세요.
      </motion.p>

      <div className="relative mt-16 h-[280px] w-[280px] sm:h-[360px] sm:w-[360px]">
        {Array.from({ length: DUMMY_CARDS }).map((_, i) => {
          const angle = (i / DUMMY_CARDS) * Math.PI * 2
          const targetX = Math.cos(angle) * 120
          const targetY = Math.sin(angle) * 90
          const delay = i * 0.04
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 h-32 w-20"
              style={{ marginLeft: -40, marginTop: -64 }}
              initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
              animate={{
                x: [0, targetX, targetX * 0.4, 0, 0],
                y: [0, targetY, targetY * 0.4, 0, 0],
                rotate: [0, (i * 30) % 360, (i * 110) % 360, 0, 0],
                scale: [1, 0.85, 1.05, 1, 1],
                opacity: [1, 0.9, 0.95, 1, 1],
              }}
              transition={{
                duration: SHUFFLE_DURATION / 1000,
                times: [0, 0.25, 0.55, 0.85, 1],
                delay,
                ease: 'easeInOut',
              }}
            >
              <CardBack />
            </motion.div>
          )
        })}

        {/* Glowing center pulse */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-10 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-gold"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </main>
  )
}
