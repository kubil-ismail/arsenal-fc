importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: "/manifest.json", revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/match.html', revision: '1' },
    { url: '/saved.html', revision: '1' },
    { url: '/img/1.JPG', revision: '1' },
    { url: '/img/2.JPG', revision: '1' },
    { url: '/img/3.JPG', revision: '1' },
    { url: '/img/4.JPG', revision: '1' },
    { url: '/img/bg.jpg', revision: '1' },
    { url: '/img/logo.png', revision: '1' },
    { url: '/css/main.css', revision: '1' },
    { url: '/css/alert.css', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/database.js', revision: '1' },
    { url: '/js/service/matchData.js', revision: '1' },
    { url: '/js/service/standingData.js', revision: '1' },
    { url: '/js/service/saveData.js', revision: '1' },
    { url: '/vendor/materialize/css/materialize.min.css', revision: '1' },
    { url: '/vendor/materialize/js/materialize.min.js', revision: '1' },
    { url: '/vendor/jquery/jquery-3.5.1.min.js', revision: '1' },
    { url: '/img/icon/icon-192x192.png', revision: '1' },
    { url: '/vendor/indexDb/idb.js', revision: '1' }
  ]);
  
  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
  )
  
  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst()
  );
  
  workbox.routing.registerRoute(
    new RegExp('/css/materialize.min.css'),
    workbox.strategies.cacheFirst()
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  );
}
else {
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/img/icon/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});