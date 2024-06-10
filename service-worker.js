const CACHE_NAME = 'aquamaster-cache-v1';
const urlsToCache = [
  '/AquaMaster/',
  '/AquaMaster/index.html',
  '/AquaMaster/styles.css',
  '/AquaMaster/app.js',
  '/AquaMaster/icon-192x192.png',
  '/AquaMaster/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
