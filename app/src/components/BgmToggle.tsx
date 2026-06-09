'use client'

import { useEffect } from 'react'
import { useReading } from '@/store/reading'
import { startBgm, stopBgm, playSfx } from '@/lib/sound/sfx'

export function BgmToggle() {
  const bgmEnabled = useReading((s) => s.bgmEnabled)
  const setBgm = useReading((s) => s.setBgm)

  useEffect(() => {
    if (bgmEnabled) startBgm()
    else stopBgm()
  }, [bgmEnabled])

  const handleToggle = () => {
    playSfx('click', { volume: 0.3 })
    setBgm(!bgmEnabled)
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={bgmEnabled ? '배경음 끄기' : '배경음 켜기'}
      className="fixed top-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-navy/60 text-gold backdrop-blur-md transition hover:border-gold hover:bg-mystic/60"
    >
      {bgmEnabled ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  )
}
