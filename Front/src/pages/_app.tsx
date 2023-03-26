import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto, Oswald } from 'next/font/google'
import Head from 'next/head'

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
		<>
		<Head>
      <title>HOW TO SURVIVE</title>
    </Head>
		<main className={`${roboto.className} font-sans bg-black`}>
			<Component {...pageProps} />
		</main>
		</>
	)
}
