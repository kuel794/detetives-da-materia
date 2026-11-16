/* Junta o site inteiro (HTML + CSS + JS + fontes) num único arquivo .html,
   para enviar por WhatsApp, e-mail ou pendrive e abrir em outro aparelho.
   Uso: node ferramentas/gerar-arquivo-unico.js  (ou clique duplo em "GERAR ARQUIVO UNICO.bat") */
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const ler = (p) => fs.readFileSync(path.join(raiz, p), 'utf8');

let html = ler('index.html');

// o arquivo único não usa instalação nem modo offline (isso é só para o link publicado)
html = html.replace(/\s*<link rel="(manifest|apple-touch-icon)"[^>]*>/g, '');

// CSS com as fontes embutidas em base64
let css = ler('css/style.css').replace(/url\('\.\.\/assets\/fonts\/([^']+)'\)/g, (_, nome) => {
  const b64 = fs.readFileSync(path.join(raiz, 'assets/fonts', nome)).toString('base64');
  return "url('data:font/woff2;base64," + b64 + "')";
});
html = html.replace('<link rel="stylesheet" href="css/style.css">', () => '<style>\n' + css + '\n</style>');
if (html.includes('href="css/')) throw new Error('O CSS não foi embutido.');

// scripts embutidos, na mesma ordem
// (com função no replace, os "$" do código não são interpretados como padrões)
html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, (_, arq) => {
  const js = ler(arq);
  if (/<\/script/i.test(js)) throw new Error('O arquivo ' + arq + ' contém "</script" e quebraria o HTML.');
  return '<script>\n' + js + '\n</script>';
});

// imagens (logo) embutidas em base64, onde quer que o caminho apareça (HTML ou JS)
html = html.replace(/assets\/img\/([\w.-]+\.(png|jpg|svg))/g, (_, nome, ext) => {
  const tipo = ext === 'svg' ? 'image/svg+xml' : ext === 'jpg' ? 'image/jpeg' : 'image/png';
  return 'data:' + tipo + ';base64,' + fs.readFileSync(path.join(raiz, 'assets/img', nome)).toString('base64');
});

const saidaDir = path.join(raiz, 'para-enviar');
fs.mkdirSync(saidaDir, { recursive: true });
const saida = path.join(saidaDir, 'Detetives-da-Materia.html');
fs.writeFileSync(saida, html, 'utf8');
console.log('Pronto: ' + saida + ' (' + Math.round(fs.statSync(saida).size / 1024) + ' KB)');
