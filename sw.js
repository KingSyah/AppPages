const CACHE_NAME = 'applauncher-v5';

// Aset statis — aman di-cache lama (jarang berubah)
// app.js disertakan di sini agar tombol langsung muncul dari cache (no delay)
// Kalau ada update data APPS, cukup bump CACHE_NAME ke v5, v6, dst.
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './starfield.js',
  './favicon.svg',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './Tools/index.html',
  './Tools/style.css',
  './Tools/editor.js'
];

// Tidak ada file Network First lagi
const NETWORK_FIRST = [];

// Install — cache aset statis saja
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate — hapus cache lama
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — Network First untuk app.js, Cache First untuk yang lain
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isNetworkFirst = NETWORK_FIRST.some(name => url.pathname.endsWith('/' + name) || url.pathname.endsWith(name));

  if (isNetworkFirst) {
    // Network First: ambil dari server, update cache, fallback ke cache kalau offline
    e.respondWith(
      fetch(e.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
          return response;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Cache First: untuk aset statis (gambar, CSS, dll)
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
  }
});
