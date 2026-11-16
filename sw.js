/* Guarda o site no aparelho para funcionar sem internet na feira.
   Ao publicar uma versão nova, troque o número de VERSAO. */
const VERSAO = 'detetives-v2';
const ARQUIVOS = [
  './', 'index.html', 'manifest.webmanifest', 'css/style.css',
  'js/data.js', 'js/svg.js', 'js/foto.js', 'js/app.js',
  'assets/img/logo-unimam.png', 'assets/img/logo-unimam-clara.png', 'assets/img/icone-192.png', 'assets/img/icone-512.png',
  'assets/fonts/barlow-condensed-latin-600-normal.woff2', 'assets/fonts/barlow-condensed-latin-700-normal.woff2',
  'assets/fonts/barlow-condensed-latin-800-normal.woff2', 'assets/fonts/nunito-latin-400-normal.woff2',
  'assets/fonts/nunito-latin-600-normal.woff2', 'assets/fonts/nunito-latin-700-normal.woff2',
  'assets/fonts/nunito-latin-800-normal.woff2', 'assets/fonts/special-elite-latin-400-normal.woff2'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// responde do aparelho na hora e, se houver internet, atualiza a cópia guardada para a próxima vez
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSAO).then(async (c) => {
    const guardado = await c.match(e.request, { ignoreSearch: true });
    const daRede = fetch(e.request).then((r) => { if (r && r.ok) c.put(e.request, r.clone()); return r; }).catch(() => guardado);
    return guardado || daRede;
  }));
});
