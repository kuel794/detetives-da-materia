/* Guarda o site no aparelho para funcionar sem internet na feira.
   Ao publicar uma versão nova, troque o número de VERSAO. */
const VERSAO = 'detetives-v4';
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
// Com internet: busca a versão mais nova (e atualiza a cópia guardada).
// Sem internet (ou rede lenta, mais de 4 s): usa a cópia guardada no aparelho.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSAO).then(async (c) => {
    const guardado = () => c.match(e.request, { ignoreSearch: true });
    try {
      const r = await Promise.race([
        fetch(e.request, { cache: 'no-cache' }),
        new Promise((_, nao) => setTimeout(() => nao(new Error('lento')), 4000))
      ]);
      if (r && r.ok) c.put(e.request, r.clone());
      return r;
    } catch (err) {
      return (await guardado()) || Response.error();
    }
  }));
});
