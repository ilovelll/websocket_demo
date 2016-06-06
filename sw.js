var CACHE_NAME = 'my-site-cache-v1';
const IMG_CACHE = 'img-cache'
var urlsToCache = [
  '/bundle.js',
  '/css/stars.css'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  )
})
self.addEventListener('fetch', function(event) {
  console.log(111)
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  )
})