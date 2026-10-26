/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 슬림한 프로덕션 이미지를 위해 standalone 서버 산출물 생성. .next/standalone 곽레.
  output: 'standalone',
  images: {
    formats: ['image/webp'],
  },
}

export default nextConfig
