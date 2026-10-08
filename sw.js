const CACHE_NAME = 'cmr-v28';
const ASSETS = ['./','./index.html','./manifest.json','./cmr-pages/page-1.png','./cmr-pages/page-2.png','./cmr-pages/page-3.png','./cmr-pages/page-4.png'];
self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', event => { if(event.request.method!=='GET') return; event.respondWith(caches.match(event.request).then(cached=>cached || fetch(event.request).then(resp=>{ const copy=resp.clone(); caches.open(CACHE_NAME).then(c=>c.put(event.request,copy)); return resp; }).catch(()=>cached))); });
