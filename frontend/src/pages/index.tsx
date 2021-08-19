
import type { NextPage } from 'next'
import React, { createRef, useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'
import monarchScarLang from '../monaco/scarlang-monarch'
import defaultScarScript from '../monaco/default-script'

interface File {
  name: string,
  content: string,
}

interface Files {
  [name: string]: File
}

const Home: NextPage = () => {
  const { theme, setTheme } = useTheme()
  const [fileName, setFileName] = useState("main.scar");
  
  const builtInFuncsArray = ["append", "clear", "extend", "input", "isArray", "isFloat", "isFunction", "isInteger", "isString", "length", "pop", "print", "run"]

  function getBuiltInFuncSuggestion(monaco: any, func: string) {
    return {
      label: func,
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: func+ '(${1})',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
    }
  }

  function handleEditorWillMount(monaco: any) {
    monaco.languages.register({ id: 'scarlang' });
    monaco.languages.setMonarchTokensProvider('scarlang', monarchScarLang)
    
    const builtInFuncs = builtInFuncsArray.map(func => getBuiltInFuncSuggestion(monaco, func))
    monaco.languages.registerCompletionItemProvider('scarlang', {
      provideCompletionItems: () => {
        return {
          suggestions: [
            ...builtInFuncs,
          ]
        }
      }
    })
  }

  const files: Files = {
    "main.scar": {
      name: "main.scar",
      content: defaultScarScript
    },
  }
  const file = files[fileName];


  return (
    <Layout title="⚡ ScarLang">
      <div className="flex h-full w-full flex-col md:flex-row">
        <div className="w-full md:w-2/3 border-r dark:border-gray-600">
          <Editor
            height="calc(100vh - 10rem)"
            defaultLanguage="scarlang"
            defaultValue={file.content}
            path={file.name}
            className="w-full md:w-2/3"
            options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
            theme={theme === "light" ? "light" : "vs-dark"}
            beforeMount={handleEditorWillMount}
          />
        </div>

        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="border-b dark:border-gray-600 p-4 flex items-center gap-4">
            <button type="button" className="flex-shrink-0 rounded border dark:border-gray-600 px-3 py-1 hover:border-yellow-500 dark:hover:border-yellow-500 active:bg-gray-200 dark:active:bg-gray-700">
              <span>Run script</span>
            </button>
            <span className="italic text-xs">Tip: Press F1 while editing to see all commands.</span>
          </div>
          <div className="m-5">Output</div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
