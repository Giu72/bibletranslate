const CACHE_NAME = 'bibletranslate-v1';
const urlsToCache = [
  '/bibletranslate/',
  '/bibletranslate/index.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Installazione del service worker e cache delle risorse base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercetta le richieste e serve dalla cache se disponibile
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Restituisce la risorsa dalla cache, oppure la cerca in rete
        return response || fetch(event.request);
      })
  );
});

// Pulisce le vecchie cache quando viene attivato un nuovo service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});