import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.resolve(root, 'dist')

async function prerender() {
  // Read the built template
  const template = await fs.readFile(path.resolve(dist, 'index.html'), 'utf-8')
  
  // Import the server entry
  const { render } = await import(path.resolve(dist, 'server/entry-server.js'))
  
  const { appHtml, headTags, htmlAttrs, bodyAttrs, bodyTags } = await render()
  
  // Replace placeholders in template
  const html = template
    .replace('<!--head-tags-->', headTags)
    .replace('<html', `<html${htmlAttrs}`)
    .replace('<body', `<body${bodyAttrs}`)
    .replace('<!--app-html-->', appHtml)
    .replace('</body>', `${bodyTags}</body>`)
  
  // Write the pre-rendered HTML
  await fs.writeFile(path.resolve(dist, 'index.html'), html)
  
  console.log('✅ Pre-rendering complete!')
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err)
  process.exit(1)
})
