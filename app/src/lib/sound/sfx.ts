'use client'

import { Howl } from 'howler'

type SfxKey =
  | 'enter'
  | 'shuffle'
  | 'hover'
  | 'select'
  | 'flip'
  | 'reveal'
  | 'chime'
  | 'click'

const SFX_PATHS: Record<SfxKey, string> = {
  enter: '/sounds/sfx/chimes/bell-strike.ogg',
  shuffle: '/sounds/sfx/kenney-casino/card-shuffle.ogg',
  hover: '/sounds/sfx/kenney-casino/card-slide-1.ogg',
  select: '/sounds/sfx/kenney-casino/card-place-2.ogg',
  flip: '/sounds/sfx/kenney-casino/card-fan-1.ogg',
  reveal: '/sounds/sfx/magic-rpg/spell_01.ogg',
  chime: '/sounds/sfx/magic-rpg/item_gem_02.ogg',
  click: '/sounds/sfx/magic-rpg/item_coins_01.ogg',
}

const cache = new Map<SfxKey, Howl>()

function getSfx(key: SfxKey, volume: number): Howl {
  let s = cache.get(key)
  if (!s) {
    s = new Howl({ src: [SFX_PATHS[key]], volume, preload: true })
    cache.set(key, s)
  }
  return s
}

export function playSfx(key: SfxKey, opts?: { volume?: number }) {
  if (typeof window === 'undefined') return
  try {
    const s = getSfx(key, opts?.volume ?? 0.5)
    s.volume(opts?.volume ?? 0.5)
    s.play()
  } catch {
    // Browser may block audio before user interaction — silently ignore
  }
}

let bgm: Howl | null = null

export function startBgm(volume = 0.25) {
  if (typeof window === 'undefined') return
  if (!bgm) {
    bgm = new Howl({
      src: ['/sounds/bgm/mystical-ambient.ogg'],
      loop: true,
      volume,
    })
  }
  if (!bgm.playing()) bgm.play()
  bgm.volume(volume)
}

export function stopBgm() {
  if (bgm && bgm.playing()) bgm.stop()
}
