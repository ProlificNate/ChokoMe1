// Cache names
const CACHE_NAME = 'chokome-cache-v1';
const DATA_CACHE_NAME = 'chokome-data-cache-v1';

// Files to cache
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/index-*.css',
  '/assets/index-*.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    // Handle API requests
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(async (cache) => {
        try {
          const response = await fetch(event.request);
          // If response is good, clone it and store it in the cache
          if (response.status === 200) {
            cache.put(event.request.url, response.clone());
          }
          return response;
        } catch (err) {
          // If fetch fails, try to get from cache
          return cache.match(event.request);
        }
      })
    );
  } else {
    // Handle non-API requests
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});