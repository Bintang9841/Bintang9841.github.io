// service-worker.js

const CACHE_NAME = 'chill-cafe-cache-v1';
const urlsToCache = [
    '/',
    'styles.css',
    'script.js',
    'assets/images/affogato.jpg',
    'assets/images/americano.jpg',
    // ... (daftar file lain yang ingin Anda cache)
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Cache berhasil dibuka');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request)
                .then(function(response) {
                    return caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, response.clone());
                            return response;
                        });
                });
        })
    );
});