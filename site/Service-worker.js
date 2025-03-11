const CACHE_NAME = 'cwmerch-ai-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/PWA/manifest.json',
    '/PWA/icon-192x192.png',
    '/PWA/icon-512x512.png',
    '/css/main.css', // Adjust this path if necessary
    '/js/app.js' // Adjust this path if necessary
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
