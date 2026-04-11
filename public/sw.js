// MIKATA Service Worker — Cache-first for articles, network-first for navigation
const CACHE_NAME = 'mikata-v1'
const ARTICLES_CACHE = 'mikata-articles'
const MAX_CACHED_ARTICLES = 3

const PRECACHE_URLS = ['/offline']

// Install: precache offline page
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== ARTICLES_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// Check if URL is an article page (matches /:genre/:sub/:slug pattern)
function isArticlePage(url) {
  const path = new URL(url).pathname
  const articlePatterns = ['/sports/', '/economy/', '/gaming/']
  return articlePatterns.some(
    (pattern) => path.startsWith(pattern) && path.split('/').filter(Boolean).length >= 3
  )
}

// Trim article cache to MAX_CACHED_ARTICLES (FIFO)
async function trimArticleCache() {
  const cache = await caches.open(ARTICLES_CACHE)
  const keys = await cache.keys()
  while (keys.length > MAX_CACHED_ARTICLES) {
    await cache.delete(keys.shift())
  }
}

// Fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle GET requests
  if (request.method !== 'GET') return

  // Only handle same-origin navigation and document requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          // Cache article pages for offline reading
          if (isArticlePage(request.url) && response.ok) {
            const clone = response.clone()
            const cache = await caches.open(ARTICLES_CACHE)
            await cache.put(request, clone)
            await trimArticleCache()
          }
          return response
        })
        .catch(async () => {
          // Try to serve from article cache
          const cached = await caches.match(request)
          if (cached) return cached

          // Fallback to offline page
          const offlinePage = await caches.match('/offline')
          if (offlinePage) return offlinePage

          return new Response('Offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
          })
        })
    )
    return
  }

  // For non-navigation requests, try cache first then network
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  )
})
