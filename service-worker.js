importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
const ver = "1";

workbox.precaching.precacheAndRoute([
    {url:"/",revision:"3"},
    {url:"/manifest.json",revision:ver},
    {url:"/asset/icon-72x72.png",revision:ver},
    {url:"/asset/icon-96x96.png",revision:ver},
    {url:"/asset/icon-128x128.png",revision:ver},
    {url:"/asset/icon-144x144.png",revision:ver},
    {url:"/asset/icon-192x192.png",revision:ver},
    {url:"/asset/icon-256x256.png",revision:ver},
    {url:"/asset/icon-384x384.png",revision:ver},
    {url:"/asset/icon-512x512.png",revision:ver},
    {url:"/index.html",revision:ver},
    {url:"/nav.html",revision:ver},
    {url:"/css/lib/materialize.min.css",revision:ver},
    {url:"/js/lib/idb.js",revision:ver},
    {url:"/js/lib/materialize.min.js",revision:ver},
    {url:"/js/main.js",revision:ver},
    {url:"/js/nav.js",revision:ver},
    {url:"/js/page.js",revision:ver},
    {url:"/js/api.js",revision:ver},
    {url:"/js/db.js",revision:ver},
    {url:"/js/nav.js",revision:ver},
    {url:"/js/config-service-worker.js", revision:ver},
    {url:"/js/config-notification.js",revision:ver}
]);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName : "google-fonts-stylesheets"
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
        cacheName : "google-fonts-webfonts",
        plugins : [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds : 60 * 60 * 24 * 365,
                maxEntries : 30
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName : "pages"
    })
)

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName : "team-api",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds : 60 * 30
            })
        ]
    })
)
workbox.routing.registerRoute(
    new RegExp('/team.html'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName : "teams"
    })
)

self.addEventListener("push",e=>{
    let body;
    if (e.data) {
        body = e.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: 'asset/icon-512x512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
              action: 'buka-action',
              title: 'buka'
            },
            {
              action: 'tidak-action',
              title: 'tidak'
            }
        ]
    };
    e.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

self.addEventListener("notificationclick",e=>{
    e.notification.close();
    if (!e.action) {
        console.log('Notification Click.');
        return;
      }
    switch (e.action) {
        case 'buka-action':
            clients.openWindow("https://google.com");
          break;
        case 'tidak-action':
          console.log('Pengguna memilih action no');
          break;
        default:
          console.log(`Action yang dipilih tidak dikenal: '${e.action}'`);
          break;
      }
})