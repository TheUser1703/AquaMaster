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

// Manejo de eventos push para notificaciones
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Notificación sin cuerpo',
    icon: '/AquaMaster/icon-192x192.png', // Ruta a tu icono de notificación
    badge: '/AquaMaster/icon-192x192.png' // Ruta a tu insignia de notificación
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Notificación sin título', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/AquaMaster/')
  );
});
