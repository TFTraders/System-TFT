self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('tft-cache').then(cache => {
      return cache.addAll([
        '/index.html',
        '/pages/masters.html',
        '/pages/planes.html',
        '/assets/images/logo.png',
        '/assets/images/background.jpg',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
