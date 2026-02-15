/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'clothes-shop-pos-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})

// Handle badge updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_BADGE') {
    const count = event.data.count
    if (count > 0) {
      self.registration.setAppBadge(count).catch((error) => {
        console.log('Badge API not supported', error)
      })
    } else {
      self.registration.clearAppBadge().catch((error) => {
        console.log('Badge API not supported', error)
      })
    }
  }
})
