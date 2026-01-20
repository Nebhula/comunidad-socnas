const CACHE_NAME = 'socnas-pwa-v1';
const BASE = '/comunidad-socnas/';

const urlsToCache = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Intercepta requests y devuelve cache si falla la red
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(BASE + 'index.html'))
  );
});
