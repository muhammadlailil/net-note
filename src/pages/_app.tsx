import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const interRegular = Inter({
  subsets: ['latin'],
  variable: '--inter-regular',
  weight : "400"
})
const interSemiBold = Inter({
  subsets: ['latin'],
  variable: '--inter-semi-bold',
  weight : "600"
})
const interBold = Inter({
  subsets: ['latin'],
  variable: '--inter-bold',
  weight : "700"
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${interRegular.variable} ${interSemiBold.variable} ${interBold.variable} h-full font-inter-regular`}>
      <Component {...pageProps} />
    </div>
  )
}
