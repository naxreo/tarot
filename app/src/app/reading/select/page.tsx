'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useReading } from '@/store/reading'
import { CardBack } from '@/components/CardBack'
import { playSfx } from '@/lib/sound/sfx'
import { cn } from '@/lib/utils'

const FAN_ARC_DEG = 60 // total arc span

export default function SelectPage() {
  const router = useRouter()
  const spread = useReading((s) => s.spread)
  const deck = useReading((s) => s.deck)
  const picked = useReading((s) => s.picked)
  const togglePick = useReading((s) => s.togglePick)
  const finalizeDraws = useReading((s) => s.finalizeDraws)

  useEffect(() => {
    if (!spread || deck.length === 0) {
      router.replace('/reading')
    }
  }, [spread, deck, router])

  useEffect(() => {
    if (!spread) return
    if (picked.length === spread.cardCount) {
      finalizeDraws()
      const t = setTimeout(() => router.push('/reading/reveal'), 900)
      return () => clearTimeout(t)
    }
  }, [picked.length, spread, finalizeDraws, router])

  if (!spread || deck.length === 0) return null

  const handlePick = (cardId: number) => {
    if (picked.includes(cardId)) return
    if (picked.length >= spread.cardCount) return
    playSfx('select', { volume: 0.45 })
    togglePick(cardId)
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center px-4 pt-20 pb-8">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center font-display text-2xl text-gold text-glow-gold md:text-3xl"
      >
        마음이 닿는 카드를 골라 보세요
      </motion.h2>
      <p className="mt-2 text-center text-sm text-moonlight/70">
        <span className="text-lavender">{picked.length}</span>
        <span className="mx-1 text-moonlight/40">/</span>
        <span>{spread.cardCount}</span>
        <span className="ml-2 text-moonlight/40">| {spread.name}</span>
      </p>

      {/* Picked cards tray */}
      <div className="mt-6 flex h-32 items-end justify-center gap-3">
        <AnimatePresence>
          {picked.map((id, idx) => (
            <motion.div
              key={id}
              layoutId={`card-${id}`}
              initial={false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              className="relative h-28 w-16 [filter:drop-shadow(0_0_12px_rgba(212,175,55,0.6))]"
            >
              <CardBack />
              <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-navy">
                {idx + 1}
              </span>
            </motion.div>
          ))}
          {/* Empty slots */}
          {Array.from({ length: spread.cardCount - picked.length }).map(
            (_, i) => (
              <motion.div
                key={`empty-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="h-28 w-16 rounded-xl border border-dashed border-gold/30"
              />
            )
          )}
        </AnimatePresence>
      </div>

      {/* Fan of cards */}
      <div className="relative mt-10 h-[420px] w-full max-w-6xl">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {deck.map((cardId, idx) => {
            const total = deck.length
            // Spread cards over arc
            const t = total > 1 ? idx / (total - 1) : 0.5
            const angleDeg = -FAN_ARC_DEG / 2 + t * FAN_ARC_DEG
            const isPicked = picked.includes(cardId)
            // 선택된 카드는 fan에서 unmount해서 tray와의 layoutId morph가 끊기지 않게 한다
            if (isPicked) return null
            return (
              <FanCard
                key={cardId}
                cardId={cardId}
                angleDeg={angleDeg}
                index={idx}
                disabled={picked.length >= spread.cardCount}
                onPick={handlePick}
              />
            )
          })}
        </div>
      </div>

      {picked.length === spread.cardCount && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center font-display text-gold text-glow-soft"
        >
          ✦ 카드의 메시지를 펼치는 중... ✦
        </motion.p>
      )}
    </main>
  )
}

interface FanCardProps {
  cardId: number
  angleDeg: number
  index: number
  disabled: boolean
  onPick: (id: number) => void
}

function FanCard({ cardId, angleDeg, index, disabled, onPick }: FanCardProps) {
  const radius = 360
  const angleRad = (angleDeg * Math.PI) / 180
  const x = Math.sin(angleRad) * radius
  const y = -Math.cos(angleRad) * radius + radius

  return (
    <motion.button
      layoutId={`card-${cardId}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.005,
        duration: 0.5,
        type: 'spring',
        stiffness: 120,
        damping: 18,
      }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
        transformOrigin: 'center',
      }}
      whileHover={
        disabled
          ? undefined
          : {
              y: -16,
              scale: 1.08,
              transition: { duration: 0.2 },
            }
      }
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
      onClick={() => onPick(cardId)}
      onMouseEnter={() =>
        !disabled && playSfx('hover', { volume: 0.1 })
      }
      className={cn(
        'h-32 w-20 sm:h-36 sm:w-24',
        'cursor-pointer transition-shadow',
        'hover:[filter:drop-shadow(0_0_18px_rgba(212,175,55,0.7))]',
        disabled && 'cursor-not-allowed opacity-60'
      )}
    >
      <CardBack />
    </motion.button>
  )
}
