const CACHE_NAME = "arsenal-v1";
var urlsToCache = [
  "/",
  "/index.html",
  "/src/pages/home.html",
  "/src/css/main.css",
  "/src/css/form_color.css",
  "/src/img/logo.png",
  "/src/img/1.JPG",
  "/src/img/2.JPG",
  "/src/img/3.JPG",
  "/src/img/4.JPG",
  "/src/img/xPmCO3.jpg",
  "/src/js/main.js",
  // "/src/service/getMatch.js",
  // "/src/service/getStandings.js",
  "/src/vendor/jquery/jquery-3.5.1.min.js",
  "/src/vendor/materialize/css/materialize.min.css",
  "/manifest.json",
  "/src/img/icon/apple-icon-57x57.png",
  "/src/img/icon/apple-icon-60x60.png",
  "/src/img/icon/apple-icon-72x72.png",
  "/src/img/icon/apple-icon-76x76.png",
  "/src/img/icon/apple-icon-114x114.png",
  "/src/img/icon/apple-icon-120x120.png",
  "/src/img/icon/apple-icon-144x144.png",
  "/src/img/icon/apple-icon-152x152.png",
  "/src/img/icon/apple-icon-180x180.png",
  "/src/img/icon/android-icon-192x192.png",
  "/src/img/icon/favicon-32x32.png",
  "/src/img/icon/favicon-96x96.png",
  "/src/img/icon/favicon-16x16.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
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
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
