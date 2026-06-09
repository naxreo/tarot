import type { Metadata } from 'next'
import { Cinzel, Italianno } from 'next/font/google'
import { StarryBackground } from '@/components/StarryBackground'
import { BgmToggle } from '@/components/BgmToggle'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const italianno = Italianno({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-italianno',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mystic Tarot — 당신의 운명을 들여다보세요',
  description:
    '78장의 타로 카드와 함께 떠나는 짧은 자기 성찰의 여정. 카드를 직접 고르고, 뒤집고, 메시지를 받아 보세요.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${cinzel.variable} ${italianno.variable}`}>
      <body className="font-body">
        <StarryBackground density={100} />
        <BgmToggle />
        {children}
      </body>
    </html>
  )
}
