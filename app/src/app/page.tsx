'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { playSfx } from '@/lib/sound/sfx'

export default function LandingPage() {
  useEffect(() => {
    // Note: SFX won't play before user gesture in most browsers — that's fine.
    const t = setTimeout(() => playSfx('chime', { volume: 0.3 }), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6">
      {/* Subtitle script */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="font-script text-3xl text-lavender text-glow-soft md:text-4xl"
      >
        Mystic Tarot
      </motion.p>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="mt-2 max-w-3xl break-keep text-center font-display text-4xl font-bold tracking-wider text-gold text-glow-gold md:text-6xl"
      >
        당신의 운명을 들여다보세요
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2 }}
        className="mt-6 max-w-xl text-center text-base leading-relaxed text-moonlight/80 md:text-lg"
      >
        78장의 카드 중 마음이 닿는 것을 골라 보세요.
        <br />
        오늘의 당신에게 필요한 한 마디가 기다리고 있습니다.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="mt-12"
      >
        <Link
          href="/reading"
          onClick={() => playSfx('click')}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gold bg-gold/10 px-10 py-4 font-display text-lg tracking-widest text-gold backdrop-blur-sm transition hover:bg-gold/20 hover:scale-105 hover:border-glow"
        >
          <span className="relative z-10">타로 시작하기</span>
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
          <span className="absolute inset-0 -z-0 animate-glow rounded-full" />
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="mt-16 text-xs text-moonlight/40"
      >
        ✦ 결과는 저장되지 않습니다. 오직 지금 이 순간을 위한 메시지입니다. ✦
      </motion.p>
    </main>
  )
}
