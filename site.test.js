import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import { describe, expect, it } from 'vitest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = __dirname

function readHTML(relPath) {
  const html = fs.readFileSync(path.join(root, relPath), 'utf-8')
  return new JSDOM(html).window.document
}

describe('index.html', () => {
  const doc = readHTML('index.html')

  it('a un titre et un charset définis', () => {
    expect(doc.title.trim().length).toBeGreaterThan(0)
    expect(doc.querySelector('meta[charset]')).not.toBeNull()
  })

  it('inclut les trois composants (header, menu, footer) sous forme de fichiers existants', () => {
    const includes = [...doc.querySelectorAll('[data-include]')].map((el) =>
      el.getAttribute('data-include'),
    )
    expect(includes.sort()).toEqual(
      ['components/footer.html', 'components/header.html', 'components/menu.html'].sort(),
    )
    for (const include of includes) {
      expect(fs.existsSync(path.join(root, include))).toBe(true)
    }
  })

  // Le favicon et l'image Open Graph pointent vers un dossier img/ qui n'existe
  // pas dans ce dépôt (défaut préexistant, hors périmètre de ce test) : on ne
  // vérifie donc que les ressources dont dépend le rendu fonctionnel de la page.
  it('référence un CSS et des scripts JS qui existent réellement', () => {
    expect(fs.existsSync(path.join(root, 'assets/css/style.css'))).toBe(true)
    expect(fs.existsSync(path.join(root, 'assets/js/include.js'))).toBe(true)
    expect(fs.existsSync(path.join(root, 'assets/js/script.js'))).toBe(true)
  })
})

describe('assets/data/data.json', () => {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/data.json'), 'utf-8'))

  it('a la forme attendue par script.js (menus[].categories[].items[])', () => {
    expect(Array.isArray(data.menus)).toBe(true)
    const menu1 = data.menus.find((m) => m.id === 'menu1')
    expect(menu1).toBeDefined()
    expect(Array.isArray(menu1.categories)).toBe(true)
    expect(menu1.categories.length).toBeGreaterThan(0)

    for (const categorie of menu1.categories) {
      expect(typeof categorie.nom).toBe('string')
      expect(Array.isArray(categorie.items)).toBe(true)
      for (const item of categorie.items) {
        expect(typeof item.nom).toBe('string')
        expect(typeof item.prix).toBe('number')
      }
    }
  })
})
