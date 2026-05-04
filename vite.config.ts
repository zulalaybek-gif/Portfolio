import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetFallbackPlugin() {
  const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#f4f4f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="36" fill="#71717a">Missing Figma Asset</text></svg>`
  const placeholderDataUrl = `data:image/svg+xml,${encodeURIComponent(placeholderSvg)}`

  return {
    name: 'figma-asset-fallback',
    resolveId(source: string) {
      if (source.startsWith('figma:asset/')) {
        return '\0figma-asset-fallback'
      }
      return null
    },
    load(id: string) {
      if (id === '\0figma-asset-fallback') {
        return `export default ${JSON.stringify(placeholderDataUrl)};`
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    figmaAssetFallbackPlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
