import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/dist/shared/lib/router/router'

function MyApp({ Component, pageProps }: any | AppProps) {
  return (
    <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
