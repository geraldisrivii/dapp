import { resolve, join } from 'node:path'
import { type Plugin } from 'vite'

type IsolatedModule = {
  name: string
  workspaceDirectory: string
  repositoryDirectories: string[]
}

type IsolatedAliasesOptions = {
  modules: IsolatedModule[]
  relativePathToProjectRoot: string
  hasSrc: boolean
}

export function useIsolatedAlias(options: IsolatedAliasesOptions) {
  const { modules, relativePathToProjectRoot, hasSrc } = options
  const aliasedModules = {} as Record<string, string>
  for (const module of modules) {
    for (const pkg of module.repositoryDirectories) {
      const isolatedKey = `${module.workspaceDirectory}/${pkg}`
      aliasedModules[isolatedKey] = resolve(
        relativePathToProjectRoot,
        module.workspaceDirectory,
        pkg
      )
    }
  }
  const cwd = process.cwd().replaceAll('\\', '/')
  const root = resolve(cwd, relativePathToProjectRoot)
  return {
    name: 'xaf-isolated-aliases',
    /**
     * @param {string} importer
     */
    resolveId(id, importer, resolveOptions) {
      if (
        !importer ||
        importer.includes('node_modules') ||
        id.includes('virtual:')
      ) {
        return null
      }
      id = id.replaceAll('\\', '/')
      // importer = importer.replaceAll('\\', '/')
      const rootIsolated = importer.substring(
        /** +1 -- remove's / */ root.length + 1
      )
      const [workspace, pkg] = rootIsolated.split('/')
      const isolatedKey = `${workspace}/${pkg}`
      const isIsolatedAlias = isolatedKey in aliasedModules
      if (isIsolatedAlias) {
        const isolatedAbsolutePath = aliasedModules[isolatedKey]
        const cleanedId = id.replace(cwd, '')
        const aliasedId = join(
          isolatedAbsolutePath,
          hasSrc ? cleanedId.replace('/src', '') : cleanedId
        )
        return this.resolve(
          aliasedId,
          importer,
          Object.assign({ skipSelf: true }, resolveOptions)
        ).then((resolved) => {
          return resolved || { id: aliasedId }
        })
      }
      return null
    }
  } as Plugin
}
