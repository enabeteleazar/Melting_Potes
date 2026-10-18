import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function collectFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name)
    return entry.isDirectory() ? collectFiles(path) : [path]
  })
}

function copyStaticFiles() {
  return {
    name: 'copy-static-files',
    apply: 'build',
    generateBundle() {
      const files = [
        ...['components', 'assets/data'].flatMap(collectFiles),
        resolve('robots.txt'),
        resolve('sitemap.xml'),
      ]

      for (const file of files) {
        this.emitFile({
          type: 'asset',
          fileName: file.slice(resolve('.').length + 1).split('\\').join('/'),
          source: readFileSync(file),
        })
      }
    },
  }
}

export default {
  plugins: [copyStaticFiles()],
}
