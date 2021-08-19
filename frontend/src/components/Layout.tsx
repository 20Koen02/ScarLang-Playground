import React, { ReactNode } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import GithubIcon from 'mdi-react/GithubIcon';
import WeatherNightIcon from 'mdi-react/WeatherNightIcon';
import WeatherSunnyIcon from 'mdi-react/WeatherSunnyIcon';
import { useTheme } from 'next-themes';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col h-screen justify-between dark:bg-vsdark">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link
          rel="stylesheet"
          type="text/css"
          data-name="vs/editor/editor.main"
          href="https://cdn.jsdelivr.net/npm/monaco-editor@0.27.0/min/vs/editor/editor.main.css"></link>
      </Head>

      <header className="flex h-20 justify-between items-center px-5 sm:px-12 flex-shrink-0 gap-2 sm:gap-5 border-b dark:border-gray-600">
        <h1 className="text-xl sm:text-2xl font-bold flex-shrink-0">
          ⚡ ScarLang
        </h1>
        <div className="flex gap-2 sm:gap-5 text-gray-500 dark:text-gray-300 text-sm sm:text-base">
          <a href="https://20koen02.github.io/ScarLang-Docs/" className="hover:text-yellow-500 dark:hover:text-yellow-500">Docs</a>
          <a href="https://github.com/20Koen02/ScarLang" className="hover:text-yellow-500 dark:hover:text-yellow-500">Download</a>
        </div>
      </header>



      <div className="mb-auto h-full">
        {children}
      </div>

      <footer className="flex h-20 justify-between items-center px-5 sm:px-12 flex-shrink-0 gap-2 sm:gap-5 border-t dark:border-gray-600">
        <span className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
          <span className="rotate-180 inline-block">&copy;</span> {new Date().getFullYear()} Koen van Wijngaarden. Some rights reserved.
        </span>
        <div className="flex gap-2 sm:gap-3 flex-shrink-0">
          <a href="https://github.com/20Koen02" target="_blank" rel="noreferrer" className="flex items-center gap-2 sm:rounded sm:border sm:dark:border-gray-600 sm:px-3 sm:py-1
          sm:hover:border-yellow-500 sm:dark:hover:border-yellow-500 sm:active:bg-gray-200 sm:dark:active:bg-gray-700">
            <span className="hidden sm:inline">GitHub</span>
            <Image src="https://github.com/20Koen02.png"
              width="22"
              height="22"
              alt="20Koen02 Github Profile Picture"
              className="rounded-full" />
          </a>
          <button type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="flex items-center gap-1 sm:rounded sm:border sm:dark:border-gray-600 sm:px-3 sm:py-1
          sm:hover:border-yellow-500 sm:dark:hover:border-yellow-500 sm:active:bg-gray-200 sm:dark:active:bg-gray-700">
            <span className="hidden sm:inline">Theme</span>
            {theme === 'light' ? <WeatherNightIcon className="text-gray-500 dark:text-gray-300"></WeatherNightIcon> : <WeatherSunnyIcon className="text-gray-500 dark:text-gray-300"></WeatherSunnyIcon>}
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Layout