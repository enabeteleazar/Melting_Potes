# Melting Potes

Site web statique du restaurant Melting Potes.

## Prérequis

- Node.js 20.19+ ou 22.12+
- pnpm 12.14.0 (via Corepack)

## Installation

Activez Corepack si nécessaire, puis installez les dépendances :

```sh
corepack enable
pnpm install
```

## Développement

Lancez le serveur de développement :

```sh
pnpm dev
```

Vite affiche l’URL locale, généralement <http://localhost:5173>.

## Build de production

```sh
pnpm build
```

Les fichiers prêts à être déployés sont générés dans `dist/`.

Pour démarrer un serveur local de prévisualisation de ce build :

```sh
pnpm start
```

Vite affiche l’URL locale, généralement <http://localhost:4173>.

## Tests

```sh
pnpm test
```
