'use client'

import { useMemo } from 'react'
import { seeded } from '@/lib/utils'

interface Star {
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function StarryBackground({ density = 80 }: { density?: number }) {
  const stars = useMemo<Star[]>(() => {
    const rnd = seeded(42)
    return Array.from({ length: density }, () => ({
      x: rnd() * 100,
      y: rnd() * 100,
      size: 1 + rnd() * 2,
      delay: rnd() * 3,
      duration: 2 + rnd() * 3,
    }))
  }, [density])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at top, #2D1B69 0%, #0B0B2A 60%, #050516 100%)',
      }}
    >
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-moonlight animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 215, 0, 0.4)`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-30 mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(155, 126, 189, 0.3), transparent 40%), radial-gradient(circle at 80% 70%, rgba(232, 180, 216, 0.2), transparent 50%)',
        }}
      />
    </div>
  )
}
