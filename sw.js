// 4-nov: abre con la copia guardada (al instante) y la actualiza por detrás. Una versión nueva cambia este archivo,
// se instala sola y la página se recarga una vez (ver controllerchange en index.html). Las llamadas al /exec no pasan por aquí.
const C='bp-10cd7772e5',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 const net=caches.open(C).then(c=>fetch(r).then(x=>{if(x.ok)c.put(r,x.clone());return x}));
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||net.catch(()=>caches.match('index.html'))));
 e.waitUntil(net.catch(()=>{}))});
