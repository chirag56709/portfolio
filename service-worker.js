const CACHE_NAME = "chirag-portfolio-cache-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/skills.html",
  "/projects.html",
  "/resume.html",
  "/blog.html",
  "/gallery.html",
  "/css/style.css",
  "/images/logo.jpg",
  "/offline.html"
];

// Install event - caching files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - cleanup old caches (optional but good practice)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - network falling back to cache and offline page
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match("/offline.html"));
    })
  );
});
