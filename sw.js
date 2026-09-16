/**
 * Service Worker for Lótus Calçados PWA
 * Enables offline functionality, caching, and fast loading
 * Auto-updates cache on every deploy
 */

// Generate cache name based on current date (forces refresh daily)
const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
const CACHE_NAME = 'lotus-cache-' + today;
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/tokens.css',
  '/script.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap'
];

console.log('Service Worker: Using cache:', CACHE_NAME);

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(URLS_TO_CACHE).catch(() => {
          console.log('Service Worker: Some assets could not be cached');
        });
      })
  );
  // Force activation of new SW immediately
  self.skipWaiting();
});

// Activate event - clean old caches aggressively
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete ALL caches except current one
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim all clients immediately
  self.clients.claim();
  console.log('Service Worker: Activated with cache:', CACHE_NAME);
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Network first for API calls and cross-origin
  if (request.url.includes('/api/') || !request.url.includes(self.location.origin)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone and cache successful responses
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Fall back to cache
          return caches.match(request);
        })
    );
  } else {
    // Cache first for app resources
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request)
            .then(fetchResponse => {
              if (fetchResponse && fetchResponse.status === 200) {
                const responseToCache = fetchResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(request, responseToCache);
                });
              }
              return fetchResponse;
            })
            .catch(() => {
              // Return offline page if available
              return caches.match('/offline.html');
            });
        })
    );
  }
});

// Message event - for cache management
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker: Registered');
