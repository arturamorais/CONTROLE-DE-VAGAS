const CACHE = 'plenus-v1';
const STATIC = [
  '/',
  '/index.html',
  '/inicio.html',
  '/admin.html',
  '/cadastro.html',
  '/reset-senha.html',
  '/css/dashboard.css',
  '/css/estilo.css',
  '/js/supabase.js',
  '/js/auth.js',
  '/js/dashboard.js',
  '/js/admin.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Só intercepta GET; deixa Supabase API passar direto
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('supabase.co')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
