'use client'

import Image from 'next/image'
import { CardBack } from './CardBack'
import { cn } from '@/lib/utils'
import type { TarotCard } from '@/lib/tarot/types'
import { cardImagePath } from '@/lib/tarot/cards'

interface CardProps {
  card?: TarotCard
  flipped?: boolean
  reversed?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showName?: boolean
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-20 h-[140px]',
  md: 'w-36 h-[252px]',
  lg: 'w-56 h-[392px]',
}

export function Card({
  card,
  flipped = false,
  reversed = false,
  size = 'md',
  className,
  showName = false,
}: CardProps) {
  return (
    <div
      className={cn(
        'relative select-none [perspective:1200px]',
        SIZE_CLASSES[size],
        className
      )}
    >
      <div
        className={cn(
          'relative h-full w-full rounded-xl transition-transform duration-700 [transform-style:preserve-3d]',
          flipped && '[transform:rotateY(180deg)]'
        )}
      >
        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <CardBack />
        </div>

        {/* Front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-gold/60 bg-navy shadow-[0_0_20px_rgba(212,175,55,0.3)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          {card && (
            <div
              className={cn(
                'relative h-full w-full',
                reversed && 'rotate-180'
              )}
            >
              <Image
                src={cardImagePath(card)}
                alt={card.nameKo}
                fill
                sizes="(max-width: 768px) 40vw, 240px"
                className="object-cover"
                priority={false}
              />
            </div>
          )}
          {showName && card && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/95 to-transparent p-2 text-center">
              <p className="font-display text-sm text-gold">{card.nameKo}</p>
              {reversed && (
                <p className="text-[10px] text-lavender">역방향</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
