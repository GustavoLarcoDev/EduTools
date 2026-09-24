/** True when the app is built as the static GitHub Pages demo (no backend). */
export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO === 'true'

/** Base path the app is served from ('' locally, '/EduTools' on GitHub Pages). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const REPO_URL = 'https://github.com/GustavoLarcoDev/EduTools'
export const SITE_URL = 'https://gustavolarcodev.github.io/EduTools/'

/** Prefix a /public asset path with the base path (raw <img> tags don't get it automatically). */
export function asset(path: string) {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}
