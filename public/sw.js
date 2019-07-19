// online-only minimal serviceworker, switch src/serviceWorker to point to `sw.js` if you want to use it

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", event => self.clients.claim());

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", event => self.skipWaiting());

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", event => {});
