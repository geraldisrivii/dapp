import { type Plugin } from 'vite'

const virtualModuleId = 'virtual:bundle'
const resolvedVirtualModuleId = '\0' + virtualModuleId
const codeBundleKey = '$DATA'

function buildProperty(key: string, instructions: unknown) {
  return `'${key}': ${instructions}`
}

function prepareProperty(raw: unknown) {
  if (typeof raw === 'string') {
    return `'${raw}'`
  } else if (typeof raw === 'number' || typeof raw === 'boolean') {
    return raw
  }
  return raw
}

function createBundleData(rawOptions: Record<string, unknown>) {
  const code = []
  for (const key of Object.keys(rawOptions)) {
    const value = prepareProperty(rawOptions[key])
    code.push(buildProperty(key, value))
  }
  return `const $DATA = {${code.join(',')}}`
}

export function useLoadFreezedBundleValue(
  options: Record<string, string | number>
) {
  return {
    name: 'xaf-bundle-load',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const bundle = createBundleData(options)
        return `${bundle}\nexport function LFB(key) { return ${codeBundleKey}[key] }`
      }
    }
  } as Plugin
}
