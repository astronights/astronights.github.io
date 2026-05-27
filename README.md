# Shubhankar Agrawal

Personal portfolio site available at [astronights.github.io](https://astronights.github.io).

A web rendition of my CV with interactive data visualisations built on top of a YAML-driven content layer.

## Stack

- **React 18 + TypeScript** — component framework
- **Vite** — build tooling
- **Tailwind CSS** — styling (zinc/teal palette, dark mode first)
- **@iconify/react** — skill & tool icons
- **js-yaml** — content loaded at runtime from `/public/content/*.yaml`

## Interactive Components

- **3D Skill Graph** — force-directed knowledge graph via `react-force-graph-3d` + `three.js`
- **Education Neural Network** — animated node graph via `reactflow`
- **Interests Word Cloud** — weighted cloud via `@visx/wordcloud`

## Content

All page content lives in `/public/content/` as YAML files — no redeployment needed for copy updates:

| File | Section |
|---|---|
| `profile.yaml` | Header, About, contact links |
| `experience.yaml` | Work history |
| `education.yaml` | Education |
| `projects.yaml` | Projects |
| `skills.yaml` | Skills cards + graph data |
| `interests.yaml` | Interests word cloud |

## Development

```bash
npm install
npm start        # dev server
npm run build    # production build
```
