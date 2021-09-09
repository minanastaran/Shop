const cacheName = "cache-v1";
const staticAssets = [
    './',
    './index.html',
    './favicon.png',
    './manifest.webmanifest'
]

// add staticAssets to cach
self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

//deactive reload
self.addEventListener('activate', event => {
    self.clients.claim();
});


//check and fetch cach
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((resp) => {
            return resp || fetch(event.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                        cache.put(event.request, response.clone());
                        return response;
                });
            });
        })
    );
});
// self.addEventListener('fetch', async event => {
//     const req = event.request;
//     const url = new URL(req.url);
//     if (url.origin === location.origin) {
//         event.respondWith(cacheFirst(req));
//     } else {
//         event.respondWith(networkAndCache(req));
//     }
// });

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        const cached = await cache.match(req);
        return cached;
    }
}