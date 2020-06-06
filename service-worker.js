const cache_name = "arsenal-v2";
var cached_urls = [
  "/",
  "/manifest.json",
  '/push.js',
  "/index.html",
  "/match.html",
  "/saved.html",
  "/img/1.JPG",
  "/img/2.JPG",
  "/img/3.JPG",
  "/img/4.JPG",
  "/img/bg.jpg",
  "/img/logo.png",
  "/css/main.css",
  "/css/alert.css",
  "/js/main.js",
  "/js/database.js",
  "/js/service/matchData.js",
  "/js/service/standingData.js",
  "/js/service/saveData.js",
  "/vendor/materialize/css/materialize.min.css",
  "/vendor/materialize/js/materialize.min.js",
  "/vendor/jquery/jquery-3.5.1.min.js",
  "/img/icon/icon-192x192.png",
  "/vendor/indexDb/idb.js",
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cache_name)
      .then(function (cache) {
        return cache.addAll(cached_urls);
      })
  );
});

self.addEventListener("fetch", function (event) {
  const base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(cache_name).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != cache_name) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

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