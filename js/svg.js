/* =========================================================
   DETETIVES DA MATÉRIA — ilustrações (SVG gerado em código)
   Nada de imagem externa: tudo é desenhado aqui.
   ========================================================= */

window.DM = window.DM || {};

(function () {
  /* ---------- utilitários ---------- */
  let uidSeq = 0;
  const uid = (p) => (p || 'u') + (++uidSeq);

  // gerador pseudoaleatório com semente (desenho igual a cada visita)
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const f1 = (n) => Math.round(n * 10) / 10;

  function polyBlob(cx, cy, r, R, n) {
    const pts = [];
    const k = n || 7;
    for (let i = 0; i < k; i++) {
      const a = (i / k) * Math.PI * 2 + R() * 0.5;
      const rr = r * (0.72 + R() * 0.4);
      pts.push(f1(cx + Math.cos(a) * rr) + ',' + f1(cy + Math.sin(a) * rr));
    }
    return pts.join(' ');
  }

  /* ---------- ÍCONES ---------- */
  const ICON = {
    lupa: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.4 15.4 21 21"/>',
    bequer: '<path d="M6 3h12M7.5 3v6.2L3.6 18.4A1.8 1.8 0 0 0 5.2 21h13.6a1.8 1.8 0 0 0 1.6-2.6L16.5 9.2V3"/><path d="M5.6 15h12.8"/>',
    pasta: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/>',
    livro: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20v-3"/><path d="M8.5 7.5h7M8.5 11h5"/>',
    tubos: '<path d="M6 3v13.5a2.5 2.5 0 0 0 5 0V3M5 3h7"/><path d="M14.5 3v10a2.5 2.5 0 0 0 5 0V3M13.5 3h7"/><path d="M6 11h5M14.5 9h5"/>',
    raio: '<path d="M13.5 2 4.5 13.5h6.5L10 22l9-11.5h-6.5z"/>',
    estrela: '<path d="m12 2.8 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.6l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
    painel: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6"/>',
    som: '<path d="M4 9h3.2L12 5v14l-4.8-4H4z"/><path d="M15.8 9.2a4 4 0 0 1 0 5.6M18.6 6.4a8 8 0 0 1 0 11.2"/>',
    mudo: '<path d="M4 9h3.2L12 5v14l-4.8-4H4z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>',
    sairTelaCheia: '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>',
    telaCheia: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    reiniciar: '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1"/><path d="M3.5 3.5v5h5"/>',
    ok: '<path d="m4.5 12.5 5 5L19.5 7"/>',
    x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    seta: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    voltar: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
    play: '<path d="M7.5 4.8v14.4L19 12z"/>',
    imprimir: '<path d="M7 8V3h10v5"/><path d="M7 17H4.5A1.5 1.5 0 0 1 3 15.5v-6A1.5 1.5 0 0 1 4.5 8h15A1.5 1.5 0 0 1 21 9.5v6a1.5 1.5 0 0 1-1.5 1.5H17"/><path d="M7 13h10v8H7z"/>',
    digital: '<path d="M7.5 5.5A8 8 0 0 1 20 12v1.5M4 12a8 8 0 0 1 1.3-4.4M4.5 16.5a13 13 0 0 0 .5-4.5 7 7 0 0 1 11.6-5.3"/><path d="M8 12a4 4 0 0 1 8 0c0 3-.4 5.6-1.5 8M12 12c0 3.6-.6 6.4-2 9M8.5 16.5c-.3 1.5-.8 2.9-1.6 4"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    cadeado: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    relogio: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 2M9.5 2.5h5M12 2.5V6"/>',
    camera: '<path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2L9 5h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.5"/>',
    baixar: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    alvo: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    mao: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10.5V4a1.5 1.5 0 0 1 3 0v7M14 10.5V5.5a1.5 1.5 0 0 1 3 0V13M17 11a1.5 1.5 0 0 1 3 0v3.5A6.5 6.5 0 0 1 13.5 21h-1a6 6 0 0 1-4.6-2.2L4.6 14.7a1.6 1.6 0 0 1 2.3-2.2L8 13.6"/>'
  };
  DM.icone = function (nome, cls) {
    return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON[nome] || '') + '</svg>';
  };

  /* ---------- cores das ilustrações (painel escuro) ---------- */
  const C = {
    vidro: '#dbe9ff', vidroF: 'rgba(219,233,255,.07)',
    agua: '#4da3ff', oleo: '#ffcc33', areia: '#d9b27c', areiaE: '#b48a52',
    ferro: '#2c333d', ferroM: '#aab6c6', sal: '#ffffff', amarelo: '#ffc933',
    feijao: '#8a3424', pedra: '#8e979f', chama: '#ff9f1c'
  };
  DM.cor = C;

  function grade(id) {
    return '<defs><pattern id="' + id + '" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(160,200,255,.07)" stroke-width="1"/></pattern></defs>';
  }

  /* molécula de água (O azul + 2 H brancos) */
  function h2o(x, y, a, s) {
    s = s || 1;
    const r = 5 * s, h = 2.7 * s, d = 5.4 * s;
    const a1 = a - 0.9, a2 = a + 0.9;
    return '<g><circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="' + f1(r) + '" fill="#3d8ff0"/>' +
      '<circle cx="' + f1(x + Math.cos(a1) * d) + '" cy="' + f1(y + Math.sin(a1) * d) + '" r="' + f1(h) + '" fill="#eaf4ff"/>' +
      '<circle cx="' + f1(x + Math.cos(a2) * d) + '" cy="' + f1(y + Math.sin(a2) * d) + '" r="' + f1(h) + '" fill="#eaf4ff"/></g>';
  }

  /* ================== ILUSTRAÇÕES DOS ARQUIVOS ================== */
  DM.ilustracao = function (tipo) {
    const g = uid('g');
    const R = rng(tipo.length * 97 + 13);
    let s = '<svg viewBox="0 0 360 220" class="ilu" role="img">' + grade(g) +
      '<rect width="360" height="220" fill="url(#' + g + ')"/>';
    const lbl = (x, y, t, anchor) => '<text x="' + x + '" y="' + y + '" class="ilu-lbl" text-anchor="' + (anchor || 'middle') + '">' + t + '</text>';

    if (tipo === 'estados') {
      const caixa = (x) => '<rect x="' + x + '" y="40" width="96" height="120" rx="10" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-opacity=".5" stroke-width="2"/>';
      s += caixa(18) + caixa(132) + caixa(246);
      for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) s += '<circle class="vib" style="animation-delay:-' + f1(R()) + 's" cx="' + (36 + c * 15) + '" cy="' + (78 + r * 14) + '" r="6.2" fill="' + C.amarelo + '"/>';
      for (let i = 0; i < 22; i++) s += '<circle class="flu" style="animation-delay:-' + f1(R() * 3) + 's" cx="' + f1(146 + R() * 70) + '" cy="' + f1(104 + R() * 48) + '" r="6.2" fill="' + C.agua + '"/>';
      for (let i = 0; i < 9; i++) s += '<circle class="gas" style="animation-delay:-' + f1(R() * 4) + 's" cx="' + f1(262 + R() * 66) + '" cy="' + f1(56 + R() * 92) + '" r="6.2" fill="#ffffff" fill-opacity=".85"/>';
      s += lbl(66, 186, 'SÓLIDO') + lbl(180, 186, 'LÍQUIDO') + lbl(294, 186, 'GASOSO');
    }

    if (tipo === 'energia') {
      // béquer sobre a chama + raio + sol
      s += '<path d="M130 60h80M136 60v100a10 10 0 0 0 10 10h48a10 10 0 0 0 10-10V60" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-width="3" stroke-linejoin="round"/>';
      s += '<rect x="139" y="110" width="62" height="57" rx="6" fill="' + C.agua + '" fill-opacity=".5"/>';
      for (let i = 0; i < 6; i++) s += '<circle class="bolha" style="animation-delay:-' + f1(i * 0.35) + 's" cx="' + (148 + i * 9) + '" cy="160" r="3" fill="#fff" fill-opacity=".7"/>';
      s += '<g class="vapor-g">' + [0, 1, 2].map(i => '<path class="vapor" style="animation-delay:-' + (i * 0.7) + 's" d="M' + (152 + i * 18) + ' 52c-6-8 6-12 0-20s6-12 0-20" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>').join('') + '</g>';
      s += '<path class="chama" d="M170 210c-14 0-20-10-16-20 3-8 10-10 10-20 8 6 6 12 10 14 2-5 6-7 6-12 8 8 12 16 8 26-2 7-9 12-18 12z" fill="' + C.chama + '"/>';
      s += '<path d="M170 205c-6 0-9-4-7-9 1-4 5-5 5-9 4 3 3 6 5 7 1-2 3-3 3-6 3 4 5 8 3 12-1 3-4 5-9 5z" fill="#ffe08a"/>';
      // sol
      s += '<g class="giro" style="transform-origin:300px 64px"><circle cx="300" cy="64" r="20" fill="' + C.amarelo + '"/>' +
        Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return '<path d="M' + f1(300 + Math.cos(a) * 28) + ' ' + f1(64 + Math.sin(a) * 28) + 'L' + f1(300 + Math.cos(a) * 38) + ' ' + f1(64 + Math.sin(a) * 38) + '" stroke="' + C.amarelo + '" stroke-width="4" stroke-linecap="round"/>'; }).join('') + '</g>';
      // raio
      s += '<path class="pisca" d="M62 40 36 98h20l-8 44 30-62H58z" fill="' + C.amarelo + '"/>';
      s += lbl(56, 170, 'ELÉTRICA') + lbl(300, 120, 'LUMINOSA') + lbl(270, 196, 'TÉRMICA') + lbl(170, 32, 'muda o estado', 'middle');
    }

    if (tipo === 'pura') {
      s += '<rect x="40" y="26" width="280" height="150" rx="14" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-opacity=".5" stroke-width="2"/>';
      for (let i = 0; i < 16; i++) {
        const x = 70 + (i % 6) * 44 + (Math.floor(i / 6) % 2) * 20 + R() * 8, y = 58 + Math.floor(i / 6) * 42 + R() * 8;
        s += '<g class="flu" style="animation-delay:-' + f1(R() * 3) + 's">' + h2o(x, y, R() * 6.28, 1.6) + '</g>';
      }
      s += lbl(180, 204, 'SÓ MOLÉCULAS DE ÁGUA (H₂O): UM ÚNICO COMPONENTE');
    }

    if (tipo === 'misturas') {
      s += '<rect x="40" y="26" width="280" height="150" rx="14" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-opacity=".5" stroke-width="2"/>';
      for (let i = 0; i < 14; i++) s += '<g class="flu" style="animation-delay:-' + f1(R() * 3) + 's">' + h2o(62 + R() * 236, 48 + R() * 110, R() * 6.28, 1.5) + '</g>';
      for (let i = 0; i < 8; i++) s += '<polygon class="flu" style="animation-delay:-' + f1(R() * 3) + 's" points="' + polyBlob(62 + R() * 236, 48 + R() * 110, 10, R, 6) + '" fill="' + C.amarelo + '"/>';
      s += '<g transform="translate(70 194)">' + h2o(0, -4, 0.5, 1.2) + '</g>' + lbl(84, 198, 'componente A', 'start');
      s += '<polygon points="' + polyBlob(212, 190, 8, R, 6) + '" fill="' + C.amarelo + '"/>' + lbl(226, 198, 'componente B', 'start');
    }

    if (tipo === 'homogenea') {
      s += bequerSimples(110, 30, 140, 150, '<rect x="0" y="40" width="140" height="120" fill="' + C.agua + '" fill-opacity=".42"/>' +
        Array.from({ length: 26 }, (_, i) => '<circle class="flu" style="animation-delay:-' + f1(R() * 3) + 's" cx="' + f1(10 + (i % 7) * 20 + R() * 6) + '" cy="' + f1(54 + Math.floor(i / 7) * 26 + R() * 8) + '" r="3" fill="#fff" fill-opacity=".75"/>').join(''));
      s += '<path d="M268 120h-12" stroke="' + C.amarelo + '" stroke-width="2"/>' + lbl(276, 116, '1 FASE', 'start') + '<text x="276" y="134" class="ilu-sub" text-anchor="start">aspecto igual</text><text x="276" y="148" class="ilu-sub" text-anchor="start">em todo ponto</text>';
    }

    if (tipo === 'heterogenea') {
      s += bequerSimples(90, 30, 140, 150,
        '<rect x="0" y="30" width="140" height="34" fill="' + C.oleo + '" fill-opacity=".85"/>' +
        '<rect x="0" y="64" width="140" height="60" fill="' + C.agua + '" fill-opacity=".45"/>' +
        '<path d="M0 124q20-8 40 0t40 0 40 0 30-2V160H0z" fill="' + C.areia + '"/>');
      const seta = (y, t) => '<path d="M238 ' + y + 'h18" stroke="' + C.amarelo + '" stroke-width="2"/><text x="262" y="' + (y + 5) + '" class="ilu-lbl" text-anchor="start">' + t + '</text>';
      s += seta(77, 'FASE 1 · óleo') + seta(124, 'FASE 2 · água') + seta(168, 'FASE 3 · areia');
    }

    return s + '</svg>';
  };

  function bequerSimples(x, y, w, h, conteudo) {
    const id = uid('bq');
    const r = 12;
    return '<defs><clipPath id="' + id + '"><path d="M0 0H' + w + 'V' + (h - r) + 'Q' + w + ' ' + h + ' ' + (w - r) + ' ' + h + 'H' + r + 'Q0 ' + h + ' 0 ' + (h - r) + 'z"/></clipPath></defs>' +
      '<g transform="translate(' + x + ' ' + y + ')">' +
      '<g clip-path="url(#' + id + ')">' + conteudo + '</g>' +
      '<path d="M-8 0H0V' + (h - r) + 'Q0 ' + h + ' ' + r + ' ' + h + 'H' + (w - r) + 'Q' + w + ' ' + h + ' ' + w + ' ' + (h - r) + 'V0" fill="none" stroke="' + C.vidro + '" stroke-width="3" stroke-linejoin="round"/>' +
      [0.35, 0.55, 0.75].map(p => '<path d="M' + (w - 18) + ' ' + f1(h * p) + 'h12" stroke="' + C.vidro + '" stroke-opacity=".5" stroke-width="2"/>').join('') +
      '</g>';
  }

  /* ================== AMOSTRA COM LUPA ================== */
  /* Interior do béquer: x 64..256, y 70..330 */
  const IN = { x0: 64, x1: 256, y0: 70, y1: 330 };

  const AMOSTRAS = {
    'agua-areia': {
      zonas: [[70, 118, 'Superfície: só água, nada flutua'], [118, 262, 'Água: moléculas de H₂O se movendo livremente'], [262, 330, 'Fundo: grãos sólidos grandes que não se dissolvem']],
      macro(R) {
        let s = '<rect x="64" y="118" width="192" height="212" fill="' + C.agua + '" fill-opacity=".38"/>';
        s += '<path d="M64 270q16-10 32-4t32-2 32 2 32-4 32 2 32 2V330H64z" fill="' + C.areia + '"/>';
        for (let i = 0; i < 70; i++) s += '<circle cx="' + f1(68 + R() * 186) + '" cy="' + f1(276 + R() * 52) + '" r="' + f1(1 + R() * 1.6) + '" fill="' + C.areiaE + '"/>';
        for (let i = 0; i < 8; i++) s += '<circle cx="' + f1(80 + R() * 160) + '" cy="' + f1(150 + R() * 100) + '" r="1.8" fill="' + C.areia + '"/>';
        return s;
      },
      micro(R) {
        let s = '';
        for (let i = 0; i < 120; i++) s += h2o(64 + R() * 192, 120 + R() * 150, R() * 6.28, 1.15);
        for (let i = 0; i < 46; i++) s += '<polygon points="' + polyBlob(64 + R() * 192, 272 + R() * 60, 11 + R() * 6, R, 7) + '" fill="' + C.areia + '" stroke="' + C.areiaE + '" stroke-width="1.5"/>';
        return s;
      }
    },
    'agua-oleo': {
      zonas: [[70, 112, 'Acima do líquido: ar'], [112, 176, 'Camada de cima: moléculas de óleo, menos denso'], [176, 330, 'Camada de baixo: moléculas de água, mais densa']],
      macro(R) {
        let s = '<rect x="64" y="176" width="192" height="154" fill="' + C.agua + '" fill-opacity=".38"/>';
        s += '<rect x="64" y="112" width="192" height="64" fill="' + C.oleo + '" fill-opacity=".85"/>';
        s += '<path d="M64 176h192" stroke="#fff3c4" stroke-width="2" stroke-opacity=".7"/>';
        for (let i = 0; i < 5; i++) s += '<ellipse cx="' + f1(90 + R() * 140) + '" cy="' + f1(128 + R() * 36) + '" rx="' + f1(4 + R() * 5) + '" ry="3" fill="#fff6d5" fill-opacity=".55"/>';
        return s;
      },
      micro(R) {
        let s = '';
        for (let i = 0; i < 46; i++) {
          const x = 64 + R() * 192, y = 114 + R() * 60, a = R() * 180;
          s += '<g transform="translate(' + f1(x) + ' ' + f1(y) + ') rotate(' + f1(a) + ')"><path d="M-14 0q3.5-6 7 0t7 0 7 0 7 0" fill="none" stroke="' + C.oleo + '" stroke-width="4.5" stroke-linecap="round"/></g>';
        }
        for (let i = 0; i < 110; i++) s += h2o(64 + R() * 192, 180 + R() * 152, R() * 6.28, 1.15);
        return s;
      }
    },
    'areia-ferro': {
      zonas: [[70, 168, 'Acima: ar, nenhum líquido na amostra'], [168, 330, 'Mistura de dois sólidos: grãos claros e lascas metálicas escuras']],
      macro(R) {
        let s = '<path d="M64 176q24-10 48-4t48-2 48 2 48-4V330H64z" fill="#dcc092"/>';
        for (let i = 0; i < 170; i++) s += '<circle cx="' + f1(66 + R() * 188) + '" cy="' + f1(180 + R() * 148) + '" r="' + f1(1 + R() * 1.6) + '" fill="' + (R() < 0.55 ? C.ferro : C.areiaE) + '"/>';
        return s;
      },
      micro(R) {
        let s = '';
        for (let i = 0; i < 70; i++) s += '<polygon points="' + polyBlob(64 + R() * 192, 176 + R() * 158, 10 + R() * 5, R, 7) + '" fill="' + C.areia + '" stroke="' + C.areiaE + '" stroke-width="1.5"/>';
        for (let i = 0; i < 60; i++) {
          const x = 64 + R() * 192, y = 178 + R() * 152, a = R() * 180, w = 16 + R() * 12;
          s += '<g transform="translate(' + f1(x) + ' ' + f1(y) + ') rotate(' + f1(a) + ')"><rect x="' + f1(-w / 2) + '" y="-2.6" width="' + f1(w) + '" height="5.2" rx="1.5" fill="' + C.ferroM + '"/><rect x="' + f1(-w / 2 + 2) + '" y="-1.6" width="' + f1(w * 0.5) + '" height="1.4" fill="#fff" fill-opacity=".7"/></g>';
        }
        return s;
      }
    },
    'agua-sal': {
      zonas: [[70, 112, 'Acima do líquido: ar'], [112, 330, 'Água com íons de sódio (Na⁺) e cloreto (Cl⁻) espalhados por igual']],
      macro(R) {
        let s = '<rect x="64" y="112" width="192" height="218" fill="' + C.agua + '" fill-opacity=".38"/>';
        s += '<path d="M74 140v150" stroke="#fff" stroke-opacity=".25" stroke-width="6" stroke-linecap="round"/>';
        return s;
      },
      micro(R) {
        let s = '';
        for (let i = 0; i < 135; i++) s += h2o(64 + R() * 192, 114 + R() * 218, R() * 6.28, 1.1);
        for (let i = 0; i < 26; i++) {
          const x = 70 + R() * 180, y = 120 + R() * 205;
          s += R() < 0.5
            ? '<circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="5" fill="#b38cff"/><text x="' + f1(x) + '" y="' + f1(y + 3) + '" class="ion">+</text>'
            : '<circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="7.5" fill="#3ddc97"/><text x="' + f1(x) + '" y="' + f1(y + 3.5) + '" class="ion">−</text>';
        }
        return s;
      }
    },
    'feijao-pedras': {
      zonas: [[70, 168, 'Acima: ar, a amostra é seca'], [168, 330, 'Grãos lisos marrons (feijões) e pedaços duros e irregulares (pedras)']],
      _itens: null,
      itens(R) {
        if (this._itens) return this._itens;
        const it = []; let t = 0;
        while (it.length < 34 && t++ < 3000) {
          const pedra = it.filter(i => i.p).length < 6 && R() < 0.22;
          const x = 80 + R() * 160, y = 186 + R() * 132;
          if (it.every(o => Math.hypot(o.x - x, o.y - y) > 21)) it.push({ x, y, a: R() * 180, p: pedra, poly: pedra ? polyBlob(0, 0, 12, R, 7) : null });
        }
        this._itens = it; return it;
      },
      macro(R) {
        let s = '';
        this.itens(R).forEach(o => {
          s += '<g transform="translate(' + f1(o.x) + ' ' + f1(o.y) + ') rotate(' + f1(o.a) + ')">' +
            (o.p ? '<polygon points="' + o.poly + '" fill="' + C.pedra + '" stroke="#6b737b" stroke-width="1.5"/>'
              : '<ellipse rx="14" ry="9" fill="' + C.feijao + '"/><ellipse cx="-3" cy="-3" rx="5" ry="2.2" fill="#fff" fill-opacity=".25"/>') + '</g>';
        });
        return s;
      },
      micro(R) {
        let s = '';
        this.itens(R).forEach(o => {
          s += '<g transform="translate(' + f1(o.x) + ' ' + f1(o.y) + ') rotate(' + f1(o.a) + ')">' +
            (o.p ? '<polygon points="' + o.poly + '" fill="#a7b0b8" stroke="#e9eef3" stroke-width="2"/><circle cx="-3" cy="2" r="1.5" fill="#5c646c"/><circle cx="4" cy="-3" r="1.2" fill="#5c646c"/><circle cx="2" cy="5" r="1" fill="#5c646c"/>'
              : '<ellipse rx="14" ry="9" fill="#a8432f" stroke="#ffd9cf" stroke-width="1.5"/><path d="M-5 0h10" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>') + '</g>';
        });
        return s;
      }
    }
  };

  DM.zonasAmostra = (tipo) => AMOSTRAS[tipo].zonas;

  DM.amostra = function (tipo) {
    const A = AMOSTRAS[tipo];
    A._itens = null;
    const id = uid('am');
    const R1 = rng(tipo.length * 31 + 7);
    const macro = A.macro(R1);
    const R2 = rng(tipo.length * 31 + 7);
    if (A.itens) A.itens(R2);
    const micro = A.micro(rng(tipo.length * 53 + 11));
    const corpo = 'M64 66V312a18 18 0 0 0 18 18H238a18 18 0 0 0 18-18V66';
    return '<svg viewBox="0 0 320 380" class="amostra-svg" data-id="' + id + '">' +
      grade(id + 'gr') +
      '<defs>' +
      '<clipPath id="' + id + 'in"><path d="M64 60H256V312a18 18 0 0 1-18 18H82a18 18 0 0 1-18-18z"/></clipPath>' +
      '<clipPath id="' + id + 'lente"><circle class="lente-clip" cx="160" cy="230" r="58"/></clipPath>' +
      '<radialGradient id="' + id + 'brilho" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<rect width="320" height="380" fill="url(#' + id + 'gr)"/>' +
      '<ellipse cx="160" cy="352" rx="120" ry="10" fill="#000" fill-opacity=".25"/>' +
      '<g clip-path="url(#' + id + 'in)">' + macro + '</g>' +
      '<path d="' + corpo + '" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M50 62h20M250 62h20" stroke="' + C.vidro + '" stroke-width="4" stroke-linecap="round"/>' +
      [130, 180, 230, 280].map((y, i) => '<path d="M226 ' + y + 'h22" stroke="' + C.vidro + '" stroke-opacity=".55" stroke-width="2"/><text x="222" y="' + (y + 4) + '" class="escala">' + (400 - i * 100) + '</text>').join('') +
      '<path d="M78 90v200" stroke="#fff" stroke-opacity=".12" stroke-width="8" stroke-linecap="round"/>' +
      /* visão da lupa */
      '<g clip-path="url(#' + id + 'lente)">' +
      '<circle class="lente-fundo" cx="160" cy="230" r="58" fill="#06122a"/>' +
      '<g clip-path="url(#' + id + 'in)">' + micro + '</g>' +
      '<circle class="lente-fundo2" cx="160" cy="230" r="58" fill="url(#' + id + 'brilho)"/>' +
      '</g>' +
      /* armação da lupa */
      '<g class="lente-armacao" transform="translate(160 230)">' +
      '<path d="M40 40l46 46" stroke="#1d2b44" stroke-width="22" stroke-linecap="round"/>' +
      '<path d="M44 44l40 40" stroke="' + C.amarelo + '" stroke-width="14" stroke-linecap="round"/>' +
      '<circle r="58" fill="none" stroke="#0b1e3f" stroke-width="13"/>' +
      '<circle r="58" fill="none" stroke="' + C.amarelo + '" stroke-width="7"/>' +
      '<circle r="62" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/>' +
      '<path d="M-30 -40a50 50 0 0 1 30 -12" stroke="#fff" stroke-opacity=".6" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      '</svg>';
  };

  /* ================== CENAS DO LABORATÓRIO ================== */
  const lbl = (x, y, t, d, anchor, linha) =>
    '<g class="lab-lbl" style="animation-delay:' + d + 's">' +
    (linha ? '<path d="' + linha + '" stroke="' + C.amarelo + '" stroke-width="2" fill="none"/>' : '') +
    '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'start') + '">' + t + '</text></g>';

  const suporte = (x, yTop) =>
    '<rect x="' + (x - 60) + '" y="282" width="120" height="10" rx="3" fill="#2a4372"/>' +
    '<rect x="' + (x - 3) + '" y="' + yTop + '" width="6" height="' + (284 - yTop) + '" rx="3" fill="#4b6696"/>';

  const bico = (x, y) => /* bico de Bunsen com chama, base em y */
    '<rect x="' + (x - 26) + '" y="' + (y - 8) + '" width="52" height="8" rx="3" fill="#4b6696"/>' +
    '<rect x="' + (x - 7) + '" y="' + (y - 52) + '" width="14" height="46" rx="2" fill="#6f87b3"/>' +
    '<g class="chama"><path d="M' + x + ' ' + (y - 54) + 'c-11 0-15-8-12-16 2-6 7-8 7-15 6 5 5 9 8 11 1-4 4-5 4-9 6 6 9 12 6 19-1 6-6 10-13 10z" fill="' + C.chama + '"/>' +
    '<path d="M' + x + ' ' + (y - 57) + 'c-5 0-7-3-5-7 1-3 3-4 3-7 3 2 2 4 4 5 1-2 2-2 2-4 2 3 3 5 2 8 0 3-3 5-6 5z" fill="#7cc4ff"/></g>';

  function bequerLab(x, y, w, h, fillCls, fillCor, nivel) {
    const id = uid('bl');
    return '<defs><clipPath id="' + id + '"><path d="M' + x + ' ' + y + 'H' + (x + w) + 'V' + (y + h - 8) + 'q0 8-8 8H' + (x + 8) + 'q-8 0-8-8z"/></clipPath></defs>' +
      '<g clip-path="url(#' + id + ')"><rect class="' + fillCls + '" x="' + x + '" y="' + (y + h - nivel) + '" width="' + w + '" height="' + nivel + '" fill="' + fillCor + '" fill-opacity=".55"/></g>' +
      '<path d="M' + (x - 6) + ' ' + y + 'H' + x + 'V' + (y + h - 8) + 'q0 8 8 8H' + (x + w - 8) + 'q8 0 8-8V' + y + '" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-width="3" stroke-linejoin="round"/>';
  }

  const CENAS = {
    filtracao() {
      const R = rng(11);
      let s = suporte(320, 60);
      s += '<path d="M320 118H262" stroke="#4b6696" stroke-width="6" stroke-linecap="round"/>';
      // béquer que despeja
      s += '<g class="f-despeja"><path d="M58 36h70v74a8 8 0 0 1-8 8H66a8 8 0 0 1-8-8z" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-width="3"/>' +
        '<g class="f-mistura"><rect x="61" y="66" width="64" height="49" rx="5" fill="#9fc3d9" fill-opacity=".55"/><rect x="61" y="100" width="64" height="15" rx="4" fill="' + C.areia + '"/></g></g>';
      s += '<path class="f-jato" pathLength="1" d="M134 52q40 -6 70 64" fill="none" stroke="#b8c6b0" stroke-width="7" stroke-linecap="round"/>';
      // funil + papel
      s += '<path d="M156 112H264L222 174V218H198V174z" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-width="3" stroke-linejoin="round"/>';
      s += '<path d="M166 116H254L210 168z" fill="#f4efe2" fill-opacity=".92"/>';
      s += '<path class="f-residuo" d="M188 142H232L210 168z" fill="' + C.areia + '"/>';
      for (let i = 0; i < 8; i++) s += '<circle class="f-residuo" cx="' + f1(198 + R() * 24) + '" cy="' + f1(148 + R() * 12) + '" r="1.6" fill="' + C.areiaE + '"/>';
      // gotas
      s += '<g class="f-gotas">' + [0, 1, 2].map(i => '<circle class="gota" style="animation-delay:' + (i * 0.33) + 's" cx="210" cy="222" r="4" fill="' + C.agua + '"/>').join('') + '</g>';
      s += bequerLab(165, 228, 90, 58, 'f-filtrado', C.agua, 40);
      s += lbl(272, 152, 'Resíduo: areia', 2.8, 'start', 'M236 152h30');
      s += lbl(272, 268, 'Filtrado: água', 3.6, 'start', 'M258 262h10');
      s += lbl(56, 150, 'Papel de filtro', 2.2, 'start', 'M128 146l40-12');
      return s;
    },

    decantacao() {
      const id = uid('fun');
      let s = suporte(320, 30);
      s += '<path d="M320 64H218" stroke="#4b6696" stroke-width="6" stroke-linecap="round"/>';
      const corpo = 'M192 52C146 70 136 124 160 154L196 192H204L240 154C264 124 254 70 208 52Z';
      s += '<defs><clipPath id="' + id + '"><path d="' + corpo + '"/></clipPath></defs>';
      s += '<g clip-path="url(#' + id + ')">' +
        '<rect class="d-oleo" x="130" y="74" width="140" height="40" fill="' + C.oleo + '" fill-opacity=".9"/>' +
        '<rect class="d-agua" x="130" y="114" width="140" height="80" fill="' + C.agua + '" fill-opacity=".55"/></g>';
      s += '<path d="' + corpo + '" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-width="3"/>';
      s += '<rect x="192" y="30" width="16" height="24" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-width="3"/><rect x="188" y="22" width="24" height="10" rx="3" fill="#6f87b3"/>';
      s += '<path d="M196 192v40M204 192v40" stroke="' + C.vidro + '" stroke-width="3"/>';
      s += '<rect x="182" y="200" width="36" height="10" rx="3" fill="#6f87b3"/>';
      s += '<g class="d-torneira" style="transform-origin:200px 205px"><rect x="196" y="194" width="8" height="22" rx="3" fill="' + C.amarelo + '"/></g>';
      s += '<rect class="d-jato" x="198" y="232" width="4" height="34" fill="' + C.agua + '"/>';
      s += bequerLab(160, 240, 80, 46, 'd-recebe', C.agua, 34);
      s += lbl(40, 92, 'Óleo: menos denso', 0.4, 'start', 'M150 92h-14');
      s += lbl(40, 150, 'Água: mais densa', 0.8, 'start', 'M158 146h-24');
      s += lbl(226, 214, 'Torneira aberta', 1.6, 'start', 'M218 206h6');
      s += lbl(248, 276, 'Água separada', 5.8, 'start');
      return s;
    },

    magnetica() {
      const R = rng(23);
      let s = '<path d="M70 236H330L314 262H86z" fill="#2a4372" stroke="#6f87b3" stroke-width="3" stroke-linejoin="round"/>';
      for (let i = 0; i < 90; i++) s += '<circle cx="' + f1(96 + R() * 210) + '" cy="' + f1(228 + R() * 12) + '" r="' + f1(2.6 + R() * 1.8) + '" fill="' + C.areia + '"/>';
      // limalhas: cada uma pula para um polo do ímã e sobe com ele
      for (let i = 0; i < 26; i++) {
        const x = 100 + R() * 200, y = 226 + R() * 12;
        const polo = i % 2 ? 225 : 175;
        const tx = polo + (R() - 0.5) * 18, ty = 144 + R() * 9;
        s += '<g transform="translate(' + f1(x) + ' ' + f1(y) + ')"><rect class="m-lim" style="--x1:' + f1(tx - x) + 'px;--y1:' + f1(ty - y) + 'px;--r0:' + Math.round(R() * 180) + 'deg;--r1:' + Math.round(80 + R() * 20) + 'deg;animation-delay:' + f1(R() * 0.25) + 's" x="-7" y="-1.8" width="14" height="3.6" rx="1.2" fill="' + C.ferroM + '"/></g>';
      }
      // ímã em U
      s += '<g class="m-ima">' +
        '<path d="M164 66a36 36 0 0 1 72 0V140H214V66a14 14 0 0 0-28 0V140H164z" fill="#ff5a5f"/>' +
        '<path d="M170 64a30 30 0 0 1 20-27" stroke="#fff" stroke-opacity=".35" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        '<rect x="164" y="120" width="22" height="20" fill="#e8eef5"/><rect x="214" y="120" width="22" height="20" fill="#e8eef5"/>' +
        '<text x="175" y="135" class="polo">N</text><text x="225" y="135" class="polo">S</text>' +
        '<g class="m-campo">' + [0, 1, 2].map(i => '<path d="M' + (175 - i * 8) + ' 148q' + (25 + i * 8) + ' ' + (22 + i * 12) + ' ' + (50 + i * 16) + ' 0" fill="none" stroke="' + C.amarelo + '" stroke-dasharray="4 6" stroke-width="2" stroke-opacity=".7"/>').join('') + '</g>' +
        '</g>';
      s += lbl(250, 92, 'Ferro: atraído pelo ímã', 4.6, 'start', 'M240 120l14-20');
      s += lbl(96, 288, 'Areia: fica na bandeja', 4.9, 'start');
      return s;
    },

    evaporacao() {
      const id = uid('ev');
      const R = rng(5);
      let s = '<path d="M140 186L120 282M260 186L280 282M200 186V200" stroke="#6f87b3" stroke-width="5" stroke-linecap="round"/>';
      s += '<rect x="126" y="180" width="148" height="8" rx="3" fill="#4b6696"/>';
      s += bico(200, 282);
      const prato = 'M138 136Q200 210 262 136Z';
      s += '<defs><clipPath id="' + id + '"><path d="' + prato + '"/></clipPath></defs>';
      s += '<g clip-path="url(#' + id + ')"><rect class="e-liquido" x="130" y="140" width="140" height="40" fill="' + C.agua + '" fill-opacity=".6"/>';
      for (let i = 0; i < 14; i++) {
        const x = 168 + R() * 64, y = 160 + R() * 10;
        s += '<rect class="e-cristal" style="animation-delay:' + f1(3 + R() * 2.4) + 's" x="' + f1(x) + '" y="' + f1(y) + '" width="7" height="7" transform="rotate(' + Math.round(R() * 40) + ' ' + f1(x + 3.5) + ' ' + f1(y + 3.5) + ')" fill="#fff"/>';
      }
      s += '</g>';
      s += '<path d="' + prato + '" fill="none" stroke="#f1ede4" stroke-width="5" stroke-linejoin="round"/>';
      s += '<g class="e-vapor-g">' + [0, 1, 2, 3].map(i => '<path class="vapor" style="animation-delay:' + f1(i * 0.45) + 's" d="M' + (166 + i * 22) + ' 128c-7-9 7-14 0-23s7-14 0-23" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3.5" stroke-linecap="round"/>').join('') + '</g>';
      s += lbl(392, 52, 'Vapor de água vai para o ar', 1.2, 'end', 'M300 60l-36 30');
      s += lbl(34, 150, 'Cápsula de porcelana', 0.6, 'start', 'M140 150h-12');
      s += lbl(246, 226, 'Sal fica no fundo', 5.6, 'start', 'M240 222l-18-50');
      return s;
    },

    destilacao() {
      const id = uid('ds');
      const R = rng(9);
      let s = suporte(58, 60);
      s += bico(100, 296);
      s += '<rect x="64" y="204" width="72" height="6" rx="2" fill="#4b6696"/>';
      s += '<g transform="translate(0 -14)">';
      s += '<path d="M58 140H68" stroke="#4b6696" stroke-width="6"/>';
      // balão
      s += '<defs><clipPath id="' + id + '"><circle cx="100" cy="176" r="40"/></clipPath></defs>';
      s += '<g clip-path="url(#' + id + ')"><rect class="ds-nivel" x="56" y="170" width="90" height="60" fill="' + C.agua + '" fill-opacity=".55"/>';
      for (let i = 0; i < 6; i++) s += '<circle class="bolha" style="animation-delay:-' + f1(i * 0.3) + 's" cx="' + (80 + i * 8) + '" cy="210" r="3" fill="#fff" fill-opacity=".7"/>';
      for (let i = 0; i < 9; i++) s += '<rect class="e-cristal" style="animation-delay:' + f1(4.2 + R() * 1.5) + 's" x="' + f1(80 + R() * 38) + '" y="' + f1(204 + R() * 6) + '" width="5" height="5" fill="#fff"/>';
      s += '</g>';
      s += '<circle cx="100" cy="176" r="40" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-width="3"/>';
      s += '<path d="M92 137V84M108 137V84" stroke="' + C.vidro + '" stroke-width="3"/>';
      s += '<rect x="96" y="58" width="8" height="40" rx="3" fill="#e8eef5"/><circle cx="100" cy="98" r="4" fill="#ff5a5f"/>';
      // braço lateral + condensador
      s += '<path d="M108 100L150 112" stroke="' + C.vidro + '" stroke-width="7" stroke-linecap="round"/>';
      s += '<path d="M150 112L300 186" stroke="#7cc4ff" stroke-opacity=".22" stroke-width="30" stroke-linecap="round"/>';
      s += '<path d="M150 112L300 186" stroke="' + C.vidro + '" stroke-opacity=".5" stroke-width="32" stroke-linecap="round" fill="none" class="ds-camisa"/>';
      s += '<path d="M140 107L312 192" stroke="' + C.vidro + '" stroke-width="7" stroke-linecap="round"/>';
      s += '<path d="M282 196v24M168 98v-22" stroke="#7cc4ff" stroke-width="4" stroke-linecap="round"/>';
      s += '<path d="M276 214l6 8 6-8M162 82l6-8 6 8" fill="none" stroke="#7cc4ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
      // vapor andando no condensador
      s += '<g class="ds-fluxo">' + [0, 1, 2, 3, 4].map(i => '<circle class="ds-vapor" style="animation-delay:' + f1(i * 0.38) + 's" cx="112" cy="101" r="4"/>').join('') + '</g>';
      s += '<g class="ds-pinga">' + [0, 1].map(i => '<circle class="gota" style="animation-delay:' + (i * 0.5) + 's" cx="314" cy="198" r="3.5" fill="' + C.agua + '"/>').join('') + '</g>';
      // erlenmeyer
      const id2 = uid('er');
      const erl = 'M306 206H322V226L348 278H280L306 226Z';
      s += '<defs><clipPath id="' + id2 + '"><path d="' + erl + '"/></clipPath></defs>';
      s += '<g clip-path="url(#' + id2 + ')"><rect class="ds-recebe" x="276" y="248" width="80" height="32" fill="' + C.agua + '" fill-opacity=".6"/></g>';
      s += '<path d="' + erl + '" fill="' + C.vidroF + '" stroke="' + C.vidro + '" stroke-width="3" stroke-linejoin="round"/>';
      s += '</g>';
      s += lbl(392, 34, 'Condensador: água fria esfria o vapor', 1.0, 'end', 'M300 42L238 112');
      s += lbl(150, 236, 'Balão: o sal fica', 5.0, 'start', 'M146 232l-14-26');
      s += lbl(392, 292, 'Água pura', 5.4, 'end');
      return s;
    },

    catacao() {
      const R = rng(41);
      let s = '<ellipse cx="170" cy="204" rx="138" ry="56" fill="#e9e3d6"/><ellipse cx="170" cy="200" rx="122" ry="46" fill="#f7f3ea"/>';
      s += '<path d="M310 228h70l-8 34h-54z" fill="#4b6696"/><ellipse cx="345" cy="228" rx="35" ry="9" fill="#6f87b3"/>';
      const ped = [[110, 196], [196, 178], [232, 218], [150, 224]];
      const fei = [];
      let t = 0;
      while (fei.length < 30 && t++ < 4000) {
        const x = 70 + R() * 200, y = 168 + R() * 64;
        if (((x - 170) ** 2) / (112 ** 2) + ((y - 200) ** 2) / (40 ** 2) > 1) continue;
        if (ped.every(p => Math.hypot(p[0] - x, p[1] - y) > 22) && fei.every(p => Math.hypot(p[0] - x, p[1] - y) > 18)) fei.push([x, y, R() * 180]);
      }
      fei.forEach(f => s += '<g transform="translate(' + f1(f[0]) + ' ' + f1(f[1]) + ') rotate(' + f1(f[2]) + ')"><ellipse rx="11" ry="7" fill="' + C.feijao + '"/><path d="M-3.5 0h7" stroke="#fff" stroke-opacity=".8" stroke-width="1.8" stroke-linecap="round"/></g>');
      ped.forEach((p, i) => s += '<g transform="translate(' + p[0] + ' ' + p[1] + ')"><polygon class="c-pedra c-p' + i + '" points="' + polyBlob(0, 0, 10, R, 7) + '" fill="' + C.pedra + '" stroke="#5f676f" stroke-width="1.5"/></g>');
      // pinça (a ponta fica na origem do grupo)
      s += '<g class="c-pinca"><g transform="rotate(-28)"><path d="M-3 -2L-10 -110M3 -2L10 -110" stroke="#dfe6ee" stroke-width="6" stroke-linecap="round"/><path d="M-10 -110h20" stroke="#dfe6ee" stroke-width="7" stroke-linecap="round"/></g></g>';
      s += lbl(20, 62, 'Pedrinhas retiradas uma a uma', 0.4, 'start');
      s += lbl(300, 290, 'Pedras', 6.4, 'start');
      return s;
    },

    peneiracao() {
      const R = rng(77);
      let s = '<path d="M90 272h220l-14 18H104z" fill="#4b6696"/>';
      s += '<path class="p-monte" d="M120 272q80-30 160 0z" fill="' + C.areia + '"/>';
      s += '<g class="p-peneira">';
      s += '<path d="M110 120h180l-16 50H126z" fill="' + C.vidroF + '" stroke="#6f87b3" stroke-width="4" stroke-linejoin="round"/>';
      s += '<path d="M126 170h148" stroke="' + C.vidro + '" stroke-width="3" stroke-dasharray="3 4"/>';
      s += '<path d="M100 120h200" stroke="#6f87b3" stroke-width="8" stroke-linecap="round"/>';
      for (let i = 0; i < 10; i++) s += '<polygon points="' + polyBlob(140 + i * 13 + R() * 4, 158 - (i % 2) * 9, 9, R, 7) + '" fill="#8e979f" stroke="#5f676f" stroke-width="1.5"/>';
      for (let i = 0; i < 36; i++) {
        const x = 134 + R() * 132, y = 150 + R() * 16;
        s += '<circle class="p-fino" style="--dy:' + f1(98 + R() * 12 - (y - 150)) + 'px;animation-delay:' + f1(0.8 + R() * 3.8) + 's" cx="' + f1(x) + '" cy="' + f1(y) + '" r="2.6" fill="' + C.areia + '"/>';
      }
      s += '</g>';
      s += lbl(304, 96, 'Grãos grossos ficam', 4.6, 'end', 'M260 104v40');
      s += lbl(334, 248, 'Grãos finos passam', 5.0, 'end');
      return s;
    }
  };

  DM.cena = function (nome) {
    const g = uid('cg');
    return '<svg viewBox="0 0 400 300" class="lab-svg cena-' + nome + '">' + grade(g) +
      '<rect width="400" height="300" fill="url(#' + g + ')"/>' + CENAS[nome]() + '</svg>';
  };

  /* keyframes da catação (gerados a partir das posições) */
  (function () {
    const T = 7.2, ped = [[110, 196], [196, 178], [232, 218], [150, 224]];
    const tigela = [[336, 222], [350, 224], [342, 216], [356, 218]];
    const pct = (t) => (t / T * 100).toFixed(2) + '%';
    const desc = (x, y) => 'transform:translate(' + x + 'px,' + y + 'px)';
    let pin = '@keyframes c-pinca{0%{' + desc(380, 40) + '}';
    let pedras = '';
    ped.forEach((p, i) => {
      const t0 = 0.5 + i * 1.6;
      pin += pct(t0 + 0.5) + '{' + desc(p[0], p[1] - 4) + '}' + pct(t0 + 0.65) + '{' + desc(p[0], p[1] - 4) + '}' +
        pct(t0 + 1.25) + '{' + desc(tigela[i][0], tigela[i][1] - 18) + '}' + pct(t0 + 1.4) + '{' + desc(tigela[i][0], tigela[i][1] - 18) + '}';
      const dx = tigela[i][0] - p[0], dy = tigela[i][1] - p[1];
      pedras += '@keyframes c-p' + i + '{0%,' + pct(t0 + 0.65) + '{transform:translate(0,0)}' +
        pct(t0 + 0.95) + '{transform:translate(' + (dx * 0.45) + 'px,' + (dy * 0.45 - 46) + 'px)}' +
        pct(t0 + 1.25) + '{transform:translate(' + dx + 'px,' + (dy - 14) + 'px)}' +
        pct(t0 + 1.45) + ',100%{transform:translate(' + dx + 'px,' + dy + 'px)}}' +
        '.play .c-p' + i + '{animation:c-p' + i + ' ' + T + 's cubic-bezier(.45,0,.3,1) both}';
    });
    pin += '100%{' + desc(380, 40) + '}}';
    const st = document.createElement('style');
    st.textContent = pin + pedras + '.c-pinca{transform:translate(380px,40px)}.play .c-pinca{animation:c-pinca ' + T + 's cubic-bezier(.45,0,.3,1) both}';
    document.head.appendChild(st);
  })();
})();
