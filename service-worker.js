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
  console.log('[Service Worker] Instalando Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Cache abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('push', event => {
  console.log('[Service Worker] Push recibido');
  const data = event.data ? event.data.json() : { title: 'AquaMaster', body: 'Notificación' };
  const options = {
    body: data.body || 'Notificación sin cuerpo',
    icon: '/AquaMaster/icon-192x192.png',
    badge: '/AquaMaster/icon-192x192.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Notificación sin título', options)
  );
});

self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click recibido');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/AquaMaster/')
  );
});

