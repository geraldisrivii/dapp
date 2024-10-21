import { type Plugin } from 'vite'

export function useStringTransformer(
  options: Record<string, string | (() => string)>
) {
  const keys = Object.keys(options)
  return {
    name: 'xaf-string-transformer',
    transform(code, id) {
      if (
        !code ||
        (id.includes('node_modules') && !id.includes('@undeads')) ||
        id.includes('virtual')
      ) {
        return
      }
      for (const key of keys) {
        const compiledKey = `__REPL__${key}`
        if (code.includes(compiledKey)) {
          let value = options[key]
          if (typeof value === 'function') {
            value = value()
          }
          code = code.replaceAll(compiledKey, value)
        }
      }
      return {
        code,
        map: null
      }
    }
  } as Plugin
}
