import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto, Oswald } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
		<main className={`${roboto.variable} font-sans bg-black`}>
			<Component {...pageProps} />
		</main>
	)
}
