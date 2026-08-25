import { defineConfig } from 'vite'
import { resolve } from 'node:path'

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isGitHubUserSite = repository.endsWith('.github.io')

export default defineConfig({
  // GitHub Pages project sites are served from /<repository-name>/.
  // Local development and a <user>.github.io site continue to use the root.
  base: process.env.GITHUB_ACTIONS && repository && !isGitHubUserSite
    ? `/${repository}/`
    : '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        interests: resolve(import.meta.dirname, 'interests.html')
      }
    }
  }
})
