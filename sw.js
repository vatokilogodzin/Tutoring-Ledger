// Offline support for Tutoring Ledger.
// Bump CACHE when any file below changes so phones pick up the new version.
const CACHE = "tutoring-ledger-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./fonts/familjen-grotesk-latin-600-normal.woff2",
  "./fonts/familjen-grotesk-latin-700-normal.woff2",
  "./fonts/familjen-grotesk-latin-ext-600-normal.woff2",
  "./fonts/familjen-grotesk-latin-ext-700-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-400-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-700-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-ext-400-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-ext-700-normal.woff2",
  "./fonts/ibm-plex-mono-latin-400-normal.woff2",
  "./fonts/ibm-plex-mono-latin-500-normal.woff2",
  "./fonts/ibm-plex-mono-latin-ext-400-normal.woff2",
  "./fonts/ibm-plex-mono-latin-ext-500-normal.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  // The page: open instantly from cache, refresh the cached copy in the background.
  if (req.mode === "navigate") {
    const refresh = fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy));
        }
        return res;
      })
      .catch(() => null);
    event.waitUntil(refresh);
    event.respondWith(
      caches.match("./index.html").then((hit) => hit || refresh.then((res) => res || Response.error()))
    );
    return;
  }

  // Everything else (fonts, icons): cache first.
  event.respondWith(
    caches.match(req).then((hit) =>
      hit ||
      fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
    )
  );
});
