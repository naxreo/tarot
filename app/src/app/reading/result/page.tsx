'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useReading } from '@/store/reading'
import { Card } from '@/components/Card'
import { playSfx } from '@/lib/sound/sfx'

export default function ResultPage() {
  const router = useRouter()
  const draws = useReading((s) => s.draws)
  const spread = useReading((s) => s.spread)
  const category = useReading((s) => s.category)
  const reset = useReading((s) => s.reset)

  useEffect(() => {
    if (draws.length === 0) {
      router.replace('/reading')
      return
    }
    playSfx('chime', { volume: 0.4 })
  }, [draws, router])

  if (draws.length === 0 || !spread) return null

  const handleRestart = () => {
    playSfx('click')
    reset()
    router.push('/')
  }

  // Summary line: dominant suit + ratio of reversed
  const reversedCount = draws.filter((d) => d.isReversed).length
  const suitCounts: Record<string, number> = {}
  draws.forEach((d) => {
    const key = d.card.arcana === 'major' ? '메이저 아르카나' : d.card.suit ?? ''
    suitCounts[key] = (suitCounts[key] || 0) + 1
  })
  const dominant = Object.entries(suitCounts).sort(([, a], [, b]) => b - a)[0]

  return (
    <main className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center px-6 py-20">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="font-script text-3xl text-lavender text-glow-soft"
      >
        카드의 메시지
      </motion.p>

      {category && (
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-2 font-display text-3xl text-gold text-glow-gold md:text-4xl"
        >
          {category.label}
        </motion.h1>
      )}

      {category && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-3 text-center text-moonlight/70"
        >
          {category.prompt}
        </motion.p>
      )}

      <div className="mt-12 w-full space-y-12">
        {draws.map((draw, idx) => {
          const position = spread.positions[idx]
          const meaning = draw.isReversed
            ? draw.card.meaning.reversed
            : draw.card.meaning.upright
          const keywords = draw.isReversed
            ? draw.card.keywords.reversed
            : draw.card.keywords.upright

          return (
            <motion.section
              key={`${draw.card.id}-${idx}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.25, duration: 0.7 }}
              className="flex flex-col gap-6 rounded-2xl border border-gold/20 bg-mystic/15 p-6 backdrop-blur-sm md:flex-row md:p-8"
            >
              <div className="flex flex-shrink-0 flex-col items-center gap-3">
                <Card
                  card={draw.card}
                  flipped
                  reversed={draw.isReversed}
                  size="md"
                />
                <div className="text-center">
                  <p className="font-display text-lg text-gold">
                    {draw.card.nameKo}
                  </p>
                  <p className="text-xs text-moonlight/50">{draw.card.name}</p>
                  {draw.isReversed && (
                    <p className="mt-1 text-xs text-cosmic">역방향</p>
                  )}
                </div>
              </div>

              <div className="flex-1">
                {position && (
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="rounded-full border border-gold/40 px-3 py-1 font-display text-xs tracking-widest text-gold">
                      {position.name}
                    </span>
                    <span className="text-xs text-moonlight/50">
                      {position.description}
                    </span>
                  </div>
                )}

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full bg-lavender/15 px-2.5 py-0.5 text-xs text-lavender"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <p className="text-base leading-relaxed text-moonlight">
                  {meaning}
                </p>

                <p className="mt-3 text-sm italic text-moonlight/60">
                  ✦ {draw.card.description}
                </p>
              </div>
            </motion.section>
          )
        })}
      </div>

      {/* Overall summary */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: draws.length * 0.25 + 0.4, duration: 0.7 }}
        className="mt-16 w-full rounded-2xl border border-gold/40 bg-gradient-to-br from-mystic/30 to-navy/30 p-8 backdrop-blur-sm"
      >
        <h3 className="font-script text-3xl text-gold text-glow-soft">
          오늘의 한 마디
        </h3>
        <p className="mt-4 leading-relaxed text-moonlight/90">
          {spread.cardCount === 1
            ? '한 장의 카드는, 지금 이 순간 당신이 들어야 할 가장 진실한 한 마디를 건넵니다. 이 카드의 메시지를 오늘 하루의 나침반으로 삼아 보세요.'
            : `${spread.cardCount}장의 카드가 ${
                spread.positions.map((p) => p.name).join(' → ')
              }의 흐름으로 당신에게 이야기를 들려주었습니다.`}
        </p>
        {dominant && (
          <p className="mt-3 text-sm text-moonlight/70">
            가장 많이 나타난 영역은{' '}
            <span className="font-display text-gold">{dominant[0]}</span> 입니다.
            그곳에 당신의 에너지가 집중되어 있다는 뜻일 수 있어요.
          </p>
        )}
        {reversedCount > 0 && (
          <p className="mt-2 text-sm text-moonlight/70">
            역방향 카드가 {reversedCount}장 나왔습니다. 무엇을 다시 들여다봐야
            할지 마음에 물어 보세요.
          </p>
        )}
      </motion.section>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: draws.length * 0.25 + 1, duration: 0.6 }}
        className="mt-16 mb-8 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/reading"
          onClick={() => {
            playSfx('click')
            reset()
          }}
          className="rounded-full border border-gold/60 bg-gold/10 px-6 py-3 font-display text-sm tracking-widest text-gold transition hover:bg-gold/20"
        >
          다시 펼치기
        </Link>
        <button
          onClick={handleRestart}
          className="rounded-full border border-moonlight/30 bg-transparent px-6 py-3 font-display text-sm tracking-widest text-moonlight/80 transition hover:border-moonlight/70 hover:text-moonlight"
        >
          처음으로
        </button>
      </motion.div>

      <p className="mb-8 text-center text-xs text-moonlight/40">
        ✦ 카드는 정해진 미래가 아닌, 오늘의 당신을 비추는 거울입니다 ✦
      </p>
    </main>
  )
}
