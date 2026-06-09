import { cn } from '@/lib/utils'

interface CardBackProps {
  className?: string
}

export function CardBack({ className }: CardBackProps) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-xl border border-gold/60',
        className
      )}
      style={{
        background:
          'radial-gradient(circle at center, #2D1B69 0%, #1a1145 60%, #0B0B2A 100%)',
      }}
    >
      <svg
        viewBox="0 0 100 175"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="cardback-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="87.5" r="40" fill="url(#cardback-glow)" />
        {/* Outer border ornament */}
        <rect
          x="4"
          y="4"
          width="92"
          height="167"
          rx="6"
          ry="6"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.6"
          opacity="0.7"
        />
        <rect
          x="7"
          y="7"
          width="86"
          height="161"
          rx="4"
          ry="4"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.3"
          opacity="0.4"
        />
        {/* Mandala-style center pattern */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x = 50 + Math.cos(angle) * 18
          const y = 87.5 + Math.sin(angle) * 18
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="1.5" fill="#FFD700" opacity="0.8" />
              <line
                x1="50"
                y1="87.5"
                x2={x}
                y2={y}
                stroke="#D4AF37"
                strokeWidth="0.3"
                opacity="0.5"
              />
            </g>
          )
        })}
        <circle cx="50" cy="87.5" r="20" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.7" />
        <circle cx="50" cy="87.5" r="14" fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.6" />
        <circle cx="50" cy="87.5" r="8" fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.7" />
        {/* Center star */}
        <g transform="translate(50, 87.5)">
          <path
            d="M0,-7 L1.5,-2 L7,-2 L2.5,1.5 L4,7 L0,3.5 L-4,7 L-2.5,1.5 L-7,-2 L-1.5,-2 Z"
            fill="#FFD700"
            opacity="0.9"
          />
        </g>
        {/* Corner motifs */}
        {[
          [12, 12],
          [88, 12],
          [12, 163],
          [88, 163],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill="#D4AF37" opacity="0.6" />
        ))}
      </svg>
    </div>
  )
}
