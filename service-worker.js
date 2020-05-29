const cache_name = "arsenal-v2";
var cached_urls = [
  "/index.html",
  "/img/1.JPG",
  "/img/2.JPG",
  "/img/3.JPG",
  "/img/4.JPG",
  "/img/bg.jpg",
  "/img/logo.png",
  "/css/main.css",
  "/js/main.js",
  "/js/service/matchData.js",
  "/js/service/standingData.js",
  "/vendor/materialize/css/materialize.min.css",
  "/vendor/materialize/js/materialize.min.js",
  "/vendor/jquery/jquery-3.5.1.min.js",
  "/vendor/indexDb/idb.js"
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
  event.respondWith(
    caches
      .match(event.request, { cacheName: cache_name })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
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
