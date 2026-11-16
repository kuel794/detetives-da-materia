/* =========================================================
   DETETIVES DA MATÉRIA — cabine de foto do detetive
   Câmera do aparelho + disfarce desenhado (chapéu, óculos, lupa)
   + moldura tipo polaroide para o visitante fotografar e postar.
   A foto NUNCA sai do aparelho: fica só na memória da página e é
   apagada quando o próximo visitante começa.
   ========================================================= */
(function () {
  'use strict';

  const TINTA = '#0b1e3f', AMARELO = '#ffc933', BRANCO = '#ffffff';
  const L = 900; // a foto é um quadrado de 900 x 900

  /* ---------- formas (caminhos SVG, servem para a tela e para o canvas) ---------- */
  const circ = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
  const elip = (cx, cy, rx, ry) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;
  const F = (d, fill, stroke, sw, extra) => Object.assign({ d, fill, stroke, sw }, extra || {});

  const OCULOS_REDONDO = [
    F(circ(360, 440, 74), 'rgba(190,225,255,.28)', TINTA, 14),
    F(circ(540, 440, 74), 'rgba(190,225,255,.28)', TINTA, 14),
    F('M434 432 Q450 412 466 432', null, TINTA, 12),
    F('M286 425 L232 405', null, TINTA, 12),
    F('M614 425 L668 405', null, TINTA, 12),
    F('M318 412 Q328 390 354 382', null, BRANCO, 9, { op: 0.85 }),
    F('M498 412 Q508 390 534 382', null, BRANCO, 9, { op: 0.85 })
  ];
  const OCULOS_ESCURO = [
    F('M276 404 L624 404', null, TINTA, 14),
    F(elip(362, 446, 84, 58), '#10131a', TINTA, 11),
    F(elip(538, 446, 84, 58), '#10131a', TINTA, 11),
    F('M278 420 L230 404', null, TINTA, 12),
    F('M622 420 L670 404', null, TINTA, 12),
    F('M318 430 Q334 412 362 408', null, BRANCO, 9, { op: 0.75 }),
    F('M494 430 Q510 412 538 408', null, BRANCO, 9, { op: 0.75 })
  ];
  const LUPA = [
    F('M800 790 L872 862', null, TINTA, 50),
    F('M800 790 L872 862', null, '#6b4322', 32),
    F(circ(735, 725, 92), 'rgba(200,230,255,.3)', TINTA, 32),
    F(circ(735, 725, 92), null, AMARELO, 18),
    F('M688 690 Q700 660 730 652', null, BRANCO, 10, { op: 0.85 })
  ];
  const CHAPEU_CLASSICO = [
    F('M232 262 Q205 300 222 352 Q252 330 268 285 Z', '#8a5530', TINTA, 9),
    F('M668 262 Q695 300 678 352 Q648 330 632 285 Z', '#8a5530', TINTA, 9),
    F('M222 268 C215 150 320 78 450 78 C580 78 685 150 678 268 Q450 302 222 268 Z', '#9b6234', TINTA, 10),
    F('M335 96 Q318 185 330 282', null, '#6b3f1d', 9, { op: 0.55 }),
    F('M450 80 L450 294', null, '#6b3f1d', 9, { op: 0.55 }),
    F('M565 96 Q582 185 570 282', null, '#6b3f1d', 9, { op: 0.55 }),
    F('M232 205 Q450 165 668 205', null, '#6b3f1d', 9, { op: 0.55 }),
    F('M268 140 Q450 104 632 140', null, '#6b3f1d', 9, { op: 0.55 }),
    F('M318 283 Q450 318 582 283 Q575 345 450 352 Q325 345 318 283 Z', '#7d4a26', TINTA, 10),
    F(elip(424, 76, 26, 14), '#6b3f1d', TINTA, 7),
    F(elip(476, 76, 26, 14), '#6b3f1d', TINTA, 7),
    F(circ(450, 78, 10), '#5a3518', TINTA, 6)
  ];
  const BOINA = [
    F('M228 262 C200 190 300 118 460 116 C620 114 712 178 682 250 Q455 300 228 262 Z', '#1d4583', TINTA, 10),
    F('M300 182 Q360 142 440 136', null, 'rgba(255,255,255,.35)', 12),
    F('M236 250 Q455 292 676 240 L680 268 Q455 318 232 280 Z', '#14325f', TINTA, 8),
    F('M456 118 q-4 -26 12 -30', null, TINTA, 12),
    F(circ(604, 222, 22), AMARELO, TINTA, 6)
  ];
  const CHAPEU_AGENTE = [
    F('M150 288 Q450 352 750 288 Q770 262 718 252 Q450 312 182 252 Q130 262 150 288 Z', '#2b2f3a', TINTA, 10),
    F('M262 262 C250 150 320 108 400 122 Q450 140 500 122 C580 108 650 150 638 262 Q450 296 262 262 Z', '#3a3f4d', TINTA, 10),
    F('M266 226 Q450 262 634 226 L637 262 Q450 296 263 262 Z', AMARELO, TINTA, 8),
    F('M450 142 L450 224', null, '#22252e', 9)
  ];

  const KITS = [
    { id: 'classico', nome: 'Clássico', formas: [].concat(OCULOS_REDONDO, CHAPEU_CLASSICO, LUPA) },
    { id: 'boina', nome: 'Boina', formas: [].concat(OCULOS_REDONDO, BOINA, LUPA) },
    { id: 'agente', nome: 'Agente', formas: [].concat(OCULOS_ESCURO, CHAPEU_AGENTE, LUPA) }
  ];
  const kitPorId = (id) => KITS.find((k) => k.id === id) || KITS[0];

  function svgKit(kit, guia) {
    return '<svg viewBox="0 0 900 900" class="kit-svg" aria-hidden="true">' +
      (guia ? '<path d="' + elip(450, 480, 200, 262) + '" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="18 14" opacity=".8"/>' : '') +
      kit.formas.map((f) => '<path d="' + f.d + '" fill="' + (f.fill || 'none') + '"' +
        (f.stroke ? ' stroke="' + f.stroke + '" stroke-width="' + f.sw + '" stroke-linecap="round" stroke-linejoin="round"' : '') +
        (f.op ? ' opacity="' + f.op + '"' : '') + '/>').join('') + '</svg>';
  }

  function desenharKit(ctx, kit) {
    kit.formas.forEach((f) => {
      const p = new Path2D(f.d);
      ctx.save();
      ctx.globalAlpha = f.op || 1;
      if (f.fill) { ctx.fillStyle = f.fill; ctx.fill(p); }
      if (f.stroke) { ctx.strokeStyle = f.stroke; ctx.lineWidth = f.sw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(p); }
      ctx.restore();
    });
  }

  /* ---------- montagem final (polaroide) ---------- */
  async function polaroide(baseUrl, nome) {
    try {
      await Promise.all([
        document.fonts.load("800 72px 'Barlow Condensed'"),
        document.fonts.load("44px 'Special Elite'"),
        document.fonts.load("700 26px 'Nunito'")
      ]);
    } catch (e) { /* segue com a fonte reserva */ }
    const img = await carregar(baseUrl);
    const W = 900, H = 1270, M = 45, FT = W - 2 * M;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.fillStyle = '#fbf7ee'; x.fillRect(0, 0, W, H);
    x.drawImage(img, M, M, FT, FT);
    x.strokeStyle = 'rgba(11,30,63,.15)'; x.lineWidth = 2; x.strokeRect(M, M, FT, FT);
    // fitas amarelas nos cantos
    [[110, 32, -18], [790, 32, 18]].forEach(([cx, cy, a]) => {
      x.save(); x.translate(cx, cy); x.rotate(a * Math.PI / 180);
      x.fillStyle = 'rgba(255,201,51,.85)'; x.fillRect(-80, -20, 160, 40); x.restore();
    });
    x.textAlign = 'center'; x.fillStyle = TINTA;
    x.font = "800 74px 'Barlow Condensed', 'Arial Narrow', sans-serif";
    x.fillText('DETETIVE DA MATÉRIA', W / 2, 952);
    x.fillStyle = '#1d4583';
    x.font = "44px 'Special Elite', 'Courier New', monospace";
    const n = (nome || '').trim() || 'Detetive anônimo';
    x.fillText(n.length > 30 ? n.slice(0, 29) + '…' : n, W / 2, 1018);
    x.fillStyle = '#4a5b78';
    x.font = "700 24px 'Nunito', sans-serif";
    x.fillText('UNIMAM · Feira de Química · ' + new Date().toLocaleDateString('pt-BR'), W / 2, 1072);
    // créditos do trabalho acadêmico
    const cr = DM.creditos;
    x.strokeStyle = 'rgba(11,30,63,.18)'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(120, 1104); x.lineTo(W - 120, 1104); x.stroke();
    x.fillStyle = '#4a5b78'; x.font = "700 21px 'Nunito', sans-serif";
    x.fillText('Disciplina: ' + cr.disciplina + '  ·  Docente: ' + cr.docente, W / 2, 1142);
    x.fillText('Discentes: ' + DM.listaNomes(cr.discentes), W / 2, 1176);
    x.fillStyle = '#8a97ad'; x.font = "600 17px 'Nunito', sans-serif";
    x.fillText('Sistema: ' + cr.desenvolvedor + ' · ' + cr.instagram, W / 2, 1222);
    return c.toDataURL('image/jpeg', 0.9);
  }

  const carregar = (src) => new Promise((ok, erro) => { const i = new Image(); i.onload = () => ok(i); i.onerror = erro; i.src = src; });

  /* ---------- tela de registro: nome → câmera → ajuste ---------- */
  let ativo = null;

  function fechar() {
    if (!ativo) return;
    ativo.parar();
    ativo.el.classList.remove('on');
    const el = ativo.el;
    setTimeout(() => el.remove(), 250);
    ativo = null;
  }

  function abrir(opc) {
    fechar();
    const I = DM.icone, Som = DM.som;
    const esc = (t) => String(t).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    let kit = kitPorId(opc.kit), stream = null, fonte = null, ajuste = { escala: 1, dx: 0, dy: 0 };

    const el = document.createElement('div');
    el.className = 'modal-fundo registro-fundo';
    el.innerHTML = `
      <div class="registro" role="dialog" aria-modal="true">
        <div class="registro-cab">
          <div><p class="sobre">REGISTRO DO DETETIVE</p><h3 id="rg-tit">Como você se chama?</h3></div>
          <ol class="registro-passos"><li data-p="nome" class="on">1 · Nome</li><li data-p="foto">2 · Foto</li><li data-p="cert">3 · Certificado</li></ol>
        </div>
        <div class="registro-corpo" id="rg-corpo"></div>
      </div>
      <input type="file" accept="image/*" capture="user" id="rg-arquivo" hidden>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('on'));
    const corpo = el.querySelector('#rg-corpo');
    const passo = (p, titulo) => {
      el.querySelector('#rg-tit').textContent = titulo;
      el.querySelectorAll('.registro-passos li').forEach((li) => li.classList.toggle('on', li.dataset.p === p));
    };
    const pararCamera = () => { if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; } };
    ativo = { el, parar: pararCamera };

    const seletorKits = () => `<div class="kits">${KITS.map((k) => `
      <button class="kit-btn ${k.id === kit.id ? 'on' : ''}" data-kit="${k.id}">${svgKit(k, false)}<span>${k.nome}</span></button>`).join('')}</div>`;
    const ligarKits = (aoTrocar) => corpo.querySelectorAll('[data-kit]').forEach((b) => b.addEventListener('click', () => {
      kit = kitPorId(b.dataset.kit);
      corpo.querySelectorAll('[data-kit]').forEach((x) => x.classList.toggle('on', x === b));
      aoTrocar();
    }));

    /* 1. nome */
    function telaNome() {
      passo('nome', 'Como você se chama?');
      corpo.innerHTML = `
        <div class="rg-nome">
          <p>Esse nome vai no seu certificado e na sua foto de detetive.</p>
          <input id="rg-input" maxlength="40" autocomplete="off" placeholder="Digite seu nome" value="${esc(opc.nome || '')}">
          <div class="rg-botoes">
            <button class="btn btn-sec" data-pular>Pular e ver o certificado</button>
            <button class="btn btn-pri btn-grande" id="rg-ok">${I('seta')} Continuar</button>
          </div>
        </div>`;
      const inp = corpo.querySelector('#rg-input'), ok = corpo.querySelector('#rg-ok');
      const valida = () => { ok.disabled = inp.value.trim().length < 2; };
      inp.addEventListener('input', valida); valida();
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !ok.disabled) ok.click(); });
      setTimeout(() => inp.focus(), 300);
      ok.addEventListener('click', () => { opc.nome = inp.value.trim(); telaCamera(); });
      corpo.querySelector('[data-pular]').addEventListener('click', () => { opc.nome = inp.value.trim(); concluir(null); });
    }

    /* 2. câmera ao vivo */
    let tentativa = 0;
    async function telaCamera() {
      passo('foto', 'Hora da foto de detetive!');
      corpo.innerHTML = `
        <div class="rg-foto">
          <div class="cam-quadro" id="cam">
            <video id="cam-video" playsinline muted autoplay></video>
            <div class="cam-kit" id="cam-kit">${svgKit(kit, true)}</div>
            <div class="cam-contagem" id="cam-n"></div>
            <div class="cam-flash" id="cam-flash"></div>
            <div class="cam-aviso" id="cam-aviso"><div><span class="cam-gira"></span><p>Ligando a câmera…</p></div></div>
          </div>
          <div class="rg-lado">
            <p class="rg-dica">${I('alvo')} Encaixe o rosto no contorno tracejado e escolha seu disfarce:</p>
            ${seletorKits()}
            <button class="btn btn-pri btn-grande" id="cam-tirar" disabled>${I('estrela')} Tirar foto</button>
            <button class="btn btn-sec" id="cam-arquivo">${I('camera')} Câmera do aparelho / escolher foto</button>
            <button class="btn btn-sec" id="cam-boneco">${I('digital')} Usar boneco de detetive</button>
            <button class="btn btn-ghost" data-pular>Pular a foto</button>
            <p class="rg-privado">A foto não é enviada para lugar nenhum: fica só nesta tela e é apagada quando o próximo visitante começar.</p>
          </div>
        </div>`;
      const video = corpo.querySelector('#cam-video'), aviso = corpo.querySelector('#cam-aviso'), tirar = corpo.querySelector('#cam-tirar');
      video.muted = true;
      ligarKits(() => { corpo.querySelector('#cam-kit').innerHTML = svgKit(kit, true); });
      corpo.querySelector('[data-pular]').addEventListener('click', () => concluir(null));
      corpo.querySelector('#cam-arquivo').addEventListener('click', () => el.querySelector('#rg-arquivo').click());
      corpo.querySelector('#cam-boneco').addEventListener('click', () => { pararCamera(); fonte = boneco(); ajuste = { escala: 1, dx: 0, dy: 0 }; telaAjuste(); });
      tirar.addEventListener('click', () => contagem(video));

      const minha = ++tentativa;
      const vale = () => ativo && minha === tentativa && corpo.contains(video);
      const falhou = (titulo, texto) => {
        if (!vale()) return;
        aviso.innerHTML = `<div><p class="cam-erro-tit">${titulo}</p><p>${texto}</p>
          <button class="btn btn-pri" id="cam-denovo">${I('reiniciar')} Tentar de novo</button></div>`;
        aviso.querySelector('#cam-denovo').addEventListener('click', telaCamera);
      };

      if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        return falhou('Câmera indisponível aqui', 'Este navegador não liberou a câmera para o site. Use <b>Câmera do aparelho</b> ou o <b>boneco de detetive</b>.');
      }
      // se a câmera não responder em 8 s, avisa (sem isso a tela ficava presa em "Ligando a câmera…")
      const relogio = setTimeout(() => falhou('A câmera não respondeu', 'Ela pode estar em uso por outro programa (Google Meet, Zoom, Teams, WhatsApp ou outra aba). Feche-o e toque em <b>Tentar de novo</b>.'), 8000);
      try {
        pararCamera();
        let s;
        try {
          s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false });
        } catch (e1) {
          if (e1 && (e1.name === 'NotAllowedError' || e1.name === 'SecurityError')) throw e1;
          s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false }); // segunda tentativa, sem exigências
        }
        if (!vale()) { s.getTracks().forEach((t) => t.stop()); return; }
        stream = s;
        video.srcObject = s;
        const pronto = () => {
          if (!vale() || !video.videoWidth) return;
          clearTimeout(relogio);
          aviso.remove(); tirar.disabled = false;
        };
        video.addEventListener('loadeddata', pronto);
        video.addEventListener('playing', pronto);
        const pl = video.play(); if (pl && pl.catch) pl.catch(() => {});
      } catch (e) {
        clearTimeout(relogio);
        const n = e && e.name;
        if (n === 'NotAllowedError' || n === 'SecurityError') falhou('Câmera bloqueada', 'O acesso à câmera foi negado. Toque no cadeado ao lado do endereço, permita a câmera e toque em <b>Tentar de novo</b>.');
        else if (n === 'NotFoundError' || n === 'OverconstrainedError') falhou('Nenhuma câmera encontrada', 'Este aparelho não tem câmera disponível. Use o <b>boneco de detetive</b>.');
        else if (n === 'NotReadableError' || n === 'AbortError' || n === 'TrackStartError') falhou('A câmera está ocupada', 'Outro programa está usando a câmera (Google Meet, Zoom, Teams, WhatsApp ou outra aba). Feche-o e toque em <b>Tentar de novo</b>.');
        else falhou('Não deu para abrir a câmera', 'Toque em <b>Tentar de novo</b>, use a <b>câmera do aparelho</b> ou o <b>boneco de detetive</b>.');
      }
    }

    // personagem desenhado, para quando não houver câmera (a foto e o certificado seguem funcionando)
    function boneco() {
      const c = document.createElement('canvas'); c.width = L; c.height = L;
      const x = c.getContext('2d');
      const g = x.createLinearGradient(0, 0, 0, L); g.addColorStop(0, '#1d4583'); g.addColorStop(1, '#0b1e3f');
      x.fillStyle = g; x.fillRect(0, 0, L, L);
      x.strokeStyle = 'rgba(160,200,255,.12)'; x.lineWidth = 2;
      for (let i = 0; i <= L; i += 60) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, L); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(L, i); x.stroke(); }
      const forma = (d, fill, stroke, sw) => { const p = new Path2D(d); x.fillStyle = fill; x.fill(p); if (stroke) { x.strokeStyle = stroke; x.lineWidth = sw; x.lineJoin = 'round'; x.stroke(p); } };
      forma('M110 900 C120 760 250 700 450 700 C650 700 780 760 790 900 Z', '#9b6234', TINTA, 10);         // casaco
      forma('M330 712 L450 820 L570 712 L540 700 L450 770 L360 700 Z', '#7d4a26', TINTA, 8);             // gola
      forma('M392 640 L392 720 Q450 750 508 720 L508 640 Z', '#e9d6c2', TINTA, 9);                        // pescoço
      forma(elip(450, 480, 196, 250), '#f1dcc6', TINTA, 10);                                              // rosto
      forma(elip(258, 470, 26, 44), '#f1dcc6', TINTA, 9); forma(elip(642, 470, 26, 44), '#f1dcc6', TINTA, 9); // orelhas
      x.strokeStyle = TINTA; x.lineWidth = 10; x.lineCap = 'round';
      x.beginPath(); x.moveTo(440, 500); x.quadraticCurveTo(425, 545, 455, 552); x.stroke();             // nariz
      x.beginPath(); x.moveTo(380, 600); x.quadraticCurveTo(450, 650, 520, 600); x.stroke();             // sorriso
      x.fillStyle = 'rgba(255,140,120,.35)';
      x.beginPath(); x.ellipse(330, 560, 34, 20, 0, 0, Math.PI * 2); x.fill();
      x.beginPath(); x.ellipse(570, 560, 34, 20, 0, 0, Math.PI * 2); x.fill();
      return c;
    }

    function contagem(video) {
      const n = corpo.querySelector('#cam-n'), btn = corpo.querySelector('#cam-tirar');
      btn.disabled = true;
      let k = 3;
      const tic = () => {
        if (!ativo) return;
        if (k === 0) {
          n.textContent = '';
          const fl = corpo.querySelector('#cam-flash'); fl.classList.remove('on'); void fl.offsetWidth; fl.classList.add('on');
          if (Som.foto) Som.foto();
          capturar(video);
          return;
        }
        n.textContent = k; n.classList.remove('bate'); void n.offsetWidth; n.classList.add('bate');
        if (Som.tique) Som.tique();
        k--; setTimeout(tic, 900);
      };
      tic();
    }

    // congela o quadro da câmera (espelhado, como uma selfie) e corta no centro
    function capturar(video) {
      const vw = video.videoWidth, vh = video.videoHeight;
      if (!vw || !vh) return;
      const lado = Math.min(vw, vh);
      const c = document.createElement('canvas'); c.width = L; c.height = L;
      const x = c.getContext('2d');
      x.translate(L, 0); x.scale(-1, 1);
      x.drawImage(video, (vw - lado) / 2, (vh - lado) / 2, lado, lado, 0, 0, L, L);
      pararCamera();
      fonte = c; ajuste = { escala: 1, dx: 0, dy: 0 };
      telaAjuste();
    }

    // plano B: o app de câmera do aparelho (funciona mesmo quando o navegador bloqueia a câmera)
    el.querySelector('#rg-arquivo').addEventListener('change', async (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const url = URL.createObjectURL(f);
      try {
        const img = await carregar(url);
        const c = document.createElement('canvas'); c.width = L; c.height = L;
        const lado = Math.min(img.naturalWidth, img.naturalHeight);
        c.getContext('2d').drawImage(img, (img.naturalWidth - lado) / 2, (img.naturalHeight - lado) / 2, lado, lado, 0, 0, L, L);
        pararCamera();
        fonte = c; ajuste = { escala: 1, dx: 0, dy: 0 };
        telaAjuste();
      } finally { URL.revokeObjectURL(url); e.target.value = ''; }
    });

    /* 3. ajuste: arrastar e aumentar a foto até o rosto caber no disfarce */
    function desenharBase(x, comKit) {
      x.fillStyle = '#071530'; x.fillRect(0, 0, L, L);
      const s = ajuste.escala, w = L * s;
      x.drawImage(fonte, (L - w) / 2 + ajuste.dx, (L - w) / 2 + ajuste.dy, w, w);
      if (comKit) desenharKit(x, kit);
    }

    function telaAjuste() {
      passo('foto', 'Ficou bom? Ajuste se quiser');
      corpo.innerHTML = `
        <div class="rg-foto">
          <div class="cam-quadro ajustando"><canvas id="aj-tela" width="${L}" height="${L}"></canvas>
            <div class="cam-dica-arraste">${I('mao')} Use + para aumentar e arraste para encaixar o rosto</div></div>
          <div class="rg-lado">
            ${seletorKits()}
            <div class="zoom"><button class="btn btn-sec" data-z="-1" aria-label="Diminuir">−</button><span>Tamanho</span><button class="btn btn-sec" data-z="1" aria-label="Aumentar">+</button></div>
            <button class="btn btn-pri btn-grande" id="aj-ok">${I('ok')} Usar esta foto</button>
            <button class="btn btn-sec" id="aj-outra">${I('reiniciar')} Tirar outra</button>
          </div>
        </div>`;
      const tela = corpo.querySelector('#aj-tela'), x = tela.getContext('2d');
      const redesenha = () => desenharBase(x, true);
      redesenha();
      ligarKits(redesenha);
      corpo.querySelectorAll('[data-z]').forEach((b) => b.addEventListener('click', () => {
        ajuste.escala = Math.max(1, Math.min(2.6, ajuste.escala + (+b.dataset.z) * 0.12));
        const lim = (L * ajuste.escala - L) / 2;
        ajuste.dx = Math.max(-lim, Math.min(lim, ajuste.dx)); ajuste.dy = Math.max(-lim, Math.min(lim, ajuste.dy));
        redesenha();
      }));
      // arrastar
      let arr = null;
      tela.addEventListener('pointerdown', (e) => { arr = { x: e.clientX, y: e.clientY, dx: ajuste.dx, dy: ajuste.dy }; tela.setPointerCapture(e.pointerId); corpo.querySelector('.cam-dica-arraste') && corpo.querySelector('.cam-dica-arraste').remove(); });
      tela.addEventListener('pointermove', (e) => {
        if (!arr) return;
        const k = L / tela.getBoundingClientRect().width;
        ajuste.dx = arr.dx + (e.clientX - arr.x) * k; ajuste.dy = arr.dy + (e.clientY - arr.y) * k;
        const lim = (L * ajuste.escala - L) / 2; // nunca deixa borda vazia
        ajuste.dx = Math.max(-lim, Math.min(lim, ajuste.dx)); ajuste.dy = Math.max(-lim, Math.min(lim, ajuste.dy));
        redesenha();
      });
      ['pointerup', 'pointercancel'].forEach((ev) => tela.addEventListener(ev, () => { arr = null; }));
      corpo.querySelector('#aj-outra').addEventListener('click', telaCamera);
      corpo.querySelector('#aj-ok').addEventListener('click', () => {
        const c = document.createElement('canvas'); c.width = L; c.height = L;
        desenharBase(c.getContext('2d'), true);
        concluir(c.toDataURL('image/jpeg', 0.9));
      });
    }

    function concluir(base) {
      passo('cert', 'Certificado pronto!');
      const kitId = kit.id;
      fechar();
      opc.aoConcluir({ nome: opc.nome || '', base, kit: kitId });
    }

    telaNome();
  }

  DM.foto = { abrir, fechar, polaroide };
})();
