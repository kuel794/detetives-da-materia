/* =========================================================
   DETETIVES DA MATÉRIA — aplicação
   ========================================================= */
(function () {
  'use strict';

  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const I = DM.icone;
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const embaralhar = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------------- ESTADO ---------------- */
  function novoEstado() {
    const casos = {};
    DM.casos.forEach((c) => (casos[c.id] = { etapa: 0, respostas: [], acertos: 0, pontos: 0, resolvido: false }));
    return { casos, quiz: null, quizFeito: false, quizAcertos: 0, quizPontos: 0, lidos: {}, vistos: {}, nome: '', foto: null, polaroide: null, kit: 'classico', registroFeito: false };
  }
  let estado = novoEstado();

  const pontosCasos = () => DM.casos.reduce((s, c) => s + estado.casos[c.id].pontos, 0);
  const pontosTotal = () => pontosCasos() + estado.quizPontos;
  const casosResolvidos = () => DM.casos.filter((c) => estado.casos[c.id].resolvido).length;
  const acertosCasos = () => DM.casos.reduce((s, c) => s + estado.casos[c.id].acertos, 0);
  const qtd = (o) => Object.keys(o).length;
  const distintivo = (p) => DM.distintivos.find((d) => p >= d.min);

  /* ---------------- SOM (sintetizado, sem arquivos) ----------------
     Volume no máximo: cada som soma duas ondas ricas em harmônicos (quadrada/serra,
     que o ouvido percebe bem mais alto que a senoide), passa por um reforço de ganho
     e por um limitador que segura o pico perto de 0 dB sem distorcer.
     Para mudar o volume geral, ajuste DM.VOLUME em data.js (0 a 1). */
  const Som = {
    ligado: true, ctx: null, saida: null, ruido: null,
    garantir() {
      if (!this.ctx) {
        try {
          const c = new (window.AudioContext || window.webkitAudioContext)();
          const limitador = c.createDynamicsCompressor();
          limitador.threshold.value = -3; limitador.knee.value = 0; limitador.ratio.value = 20;
          limitador.attack.value = 0.002; limitador.release.value = 0.12;
          const reforco = c.createGain(); reforco.gain.value = 2.2 * (DM.VOLUME == null ? 1 : DM.VOLUME);
          reforco.connect(limitador).connect(c.destination);
          this.ctx = c; this.saida = reforco;
          const n = c.sampleRate * 0.4, buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
          for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
          this.ruido = buf;
        } catch (e) { this.ctx = null; }
      }
      if (this.ctx && this.ctx.state !== 'running') this.ctx.resume();
      return this.ctx;
    },
    // um tom com envelope; "ate" faz a nota deslizar de frequência
    tom(f, dur, tipo, vol, atraso, ate) {
      if (!this.ligado) return;
      const c = this.garantir(); if (!c) return;
      const t = c.currentTime + 0.01 + (atraso || 0);
      const o = c.createOscillator(), g = c.createGain();
      o.type = tipo || 'square'; o.frequency.setValueAtTime(f, t);
      if (ate) o.frequency.exponentialRampToValueAtTime(ate, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol || 0.8, t + 0.008);
      g.gain.setValueAtTime(vol || 0.8, t + dur * 0.55);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(this.saida); o.start(t); o.stop(t + dur + 0.05);
    },
    // nota "gorda": quadrada + serra uma oitava acima
    nota(f, dur, vol, atraso, ate) {
      this.tom(f, dur, 'square', vol, atraso, ate);
      this.tom(f * 2, dur, 'sawtooth', vol * 0.45, atraso, ate ? ate * 2 : 0);
    },
    estouro(dur, vol, atraso, corte) {
      if (!this.ligado) return;
      const c = this.garantir(); if (!c) return;
      const t = c.currentTime + 0.01 + (atraso || 0);
      const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      s.buffer = this.ruido; f.type = 'lowpass'; f.frequency.value = corte || 1800;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(f).connect(g).connect(this.saida); s.start(t); s.stop(t + dur + 0.02);
    },
    // Toques em botões e navegação ficam em silêncio (ele achou chato som a cada clique).
    clique() { },
    // Todos os sons usam o mesmo timbre macio do som de erro, o que ele aprovou:
    // triangular + senoide (tipo marimba), alto mas sem aspereza.
    suave(f, dur, vol, atraso) {
      this.tom(f, dur, 'triangle', vol, atraso);
      this.tom(f, dur, 'sine', vol * 0.8, atraso);
      this.tom(f * 2, dur * 0.6, 'sine', vol * 0.18, atraso);
    },
    // acerto: o espelho do erro, dois tons subindo ("plim-plim")
    ok() { this.suave(523, 0.16, 1, 0); this.suave(784, 0.42, 1, 0.15); },
    erro() { this.suave(392, 0.2, 1, 0); this.suave(311, 0.42, 1, 0.19); },
    tique() { this.suave(880, 0.1, 0.75); },
    tempoEsgotado() { this.suave(523, 0.18, 1, 0); this.suave(440, 0.18, 1, 0.17); this.suave(349, 0.5, 1, 0.34); },
    foto() { this.suave(784, 0.1, 1, 0); this.suave(1175, 0.3, 1, 0.09); },
    carimbo() { this.tom(150, 0.3, 'sine', 1, 0, 45); this.estouro(0.18, 1, 0, 900); },
    vitoria() {
      [523, 659, 784].forEach((f, i) => this.suave(f, 0.18, 1, i * 0.14));
      this.suave(1047, 0.8, 1, 0.42);
    }
  };
  DM.som = Som;
  // destrava o áudio no primeiro toque (navegadores só liberam som depois de uma interação)
  ['pointerdown', 'touchend', 'keydown'].forEach((ev) => document.addEventListener(ev, () => Som.garantir(), { passive: true }));
  // iPad/iPhone: sem isto o som do site some quando a chave de silencioso está ligada
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { /* ignore */ }

  /* ---------------- NAVEGAÇÃO ENTRE TELAS ---------------- */
  let atual = null;
  let limpezas = [];
  const aoSair = (fn) => limpezas.push(fn);

  function ir(nome, p) {
    p = p || {};
    limpezas.forEach((fn) => { try { fn(); } catch (e) { /* ignore */ } });
    limpezas = [];
    const palco = $('#palco');
    const velha = $('.tela.ativa', palco);
    const nova = document.createElement('section');
    nova.className = 'tela tela-' + nome;
    nova.innerHTML = TELAS[nome].html(p);
    palco.appendChild(nova);
    if (velha) {
      velha.classList.remove('ativa'); velha.classList.add('saindo');
      setTimeout(() => velha.remove(), 380);
    }
    requestAnimationFrame(() => requestAnimationFrame(() => nova.classList.add('ativa')));
    atual = nome;
    document.body.dataset.tela = nome;
    if (TELAS[nome].init) TELAS[nome].init(nova, p);
    atualizarTopo();
  }

  /* ---------------- TOPO ---------------- */
  function atualizarTopo() {
    $('#t-pontos').textContent = pontosTotal();
    $('#t-casos').textContent = casosResolvidos() + '/5';
    $('#t-arq').textContent = qtd(estado.lidos) + '/6';
    $('#t-lab').textContent = qtd(estado.vistos) + '/7';
    $('#t-quiz').textContent = estado.quizFeito ? estado.quizAcertos + '/10' : '—';
    $$('.topo-nav [data-ir]').forEach((b) => b.classList.toggle('on', b.dataset.ir === atual || (atual === 'caso' && b.dataset.ir === 'casos')));
  }

  function voarPontos(origem, n) {
    const alvo = $('#t-pontos-box');
    if (!origem || !alvo) return;
    const a = origem.getBoundingClientRect(), b = alvo.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'voa-pontos'; el.textContent = '+' + n;
    el.style.left = a.left + a.width / 2 + 'px'; el.style.top = a.top + a.height / 2 + 'px';
    el.style.setProperty('--dx', b.left + b.width / 2 - (a.left + a.width / 2) + 'px');
    el.style.setProperty('--dy', b.top + b.height / 2 - (a.top + a.height / 2) + 'px');
    document.body.appendChild(el);
    setTimeout(() => { el.remove(); alvo.classList.remove('pulsa'); void alvo.offsetWidth; alvo.classList.add('pulsa'); atualizarTopo(); }, 850);
  }

  /* ---------------- MODAL ---------------- */
  function modal(o) {
    const fundo = document.createElement('div');
    fundo.className = 'modal-fundo';
    fundo.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' +
      (o.icone ? '<div class="modal-ico">' + I(o.icone) + '</div>' : '') +
      '<h3>' + o.titulo + '</h3><p>' + o.texto + '</p><div class="modal-botoes">' +
      o.botoes.map((b, i) => '<button class="btn ' + (b.cls || 'btn-sec') + '" data-i="' + i + '">' + b.txt + '</button>').join('') +
      '</div></div>';
    document.body.appendChild(fundo);
    requestAnimationFrame(() => fundo.classList.add('on'));
    const fechar = () => { fundo.classList.remove('on'); setTimeout(() => fundo.remove(), 250); };
    fundo.addEventListener('click', (e) => {
      const b = e.target.closest('[data-i]');
      if (!b) return;
      Som.clique(); fechar();
      const fn = o.botoes[+b.dataset.i].acao; if (fn) fn();
    });
    return { fechar, el: fundo };
  }

  function reiniciar(semPerguntar) {
    const fazer = () => {
      if (DM.foto) DM.foto.fechar(); // desliga a câmera e apaga a foto do visitante anterior
      estado = novoEstado();
      $$('.modal-fundo').forEach((m) => m.remove());
      ir('inicio');
    };
    if (semPerguntar) return fazer();
    modal({
      icone: 'reiniciar', titulo: 'Começar do zero?',
      texto: 'Toda a investigação será apagada para que um novo detetive comece a missão.',
      botoes: [{ txt: 'Continuar investigando' }, { txt: 'Sim, novo visitante', cls: 'btn-pri', acao: fazer }]
    });
  }

  /* ---------------- LUPA INTERATIVA ---------------- */
  function lupa(svg, aoMudar) {
    const clip = $('.lente-clip', svg), f1 = $('.lente-fundo', svg), f2 = $('.lente-fundo2', svg), arm = $('.lente-armacao', svg);
    let pos = { x: 160, y: 230 }, arrastando = false, desloc = { x: 0, y: 0 };
    function mover(x, y) {
      x = Math.max(56, Math.min(264, x)); y = Math.max(70, Math.min(330, y));
      pos = { x, y };
      [clip, f1, f2].forEach((c) => { c.setAttribute('cx', x); c.setAttribute('cy', y); });
      arm.setAttribute('transform', 'translate(' + x + ' ' + y + ')');
      if (aoMudar) aoMudar(x, y);
    }
    function ponto(e) {
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    }
    function down(e) {
      const p = ponto(e);
      const dentro = Math.hypot(p.x - pos.x, p.y - pos.y) < 72 || (p.x > pos.x + 20 && p.y > pos.y + 20 && p.x < pos.x + 100 && p.y < pos.y + 100);
      desloc = dentro ? { x: pos.x - p.x, y: pos.y - p.y } : { x: 0, y: 0 };
      arrastando = true;
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
      mover(p.x + desloc.x, p.y + desloc.y);
      svg.classList.add('usando');
      e.preventDefault();
    }
    function move(e) { if (!arrastando) return; const p = ponto(e); mover(p.x + desloc.x, p.y + desloc.y); }
    function up() { arrastando = false; }
    svg.addEventListener('pointerdown', down);
    svg.addEventListener('pointermove', move);
    svg.addEventListener('pointerup', up);
    svg.addEventListener('pointercancel', up);
    return { mover };
  }

  /* ---------------- TELAS ---------------- */
  const TELAS = {};

  /* ===== INÍCIO ===== */
  TELAS.inicio = {
    html: () => `
      <div class="fita fita-topo"><div class="fita-txt">${'ÁREA DE INVESTIGAÇÃO CIENTÍFICA &nbsp;●&nbsp; ACESSO LIBERADO A DETETIVES &nbsp;●&nbsp; '.repeat(6)}</div></div>
      <div class="inicio-grid">
        <div class="inicio-texto">
          <img class="logo-inicio" src="${DM.creditos.logoClara}" alt="${DM.creditos.instituicao}">
          <h1 class="titulo-mega"><span>DETETIVES</span><span class="amarelo">DA MATÉRIA</span></h1>
          <p class="missao-tag">MISSÃO: INVESTIGAR, IDENTIFICAR E SEPARAR!</p>
          <button class="btn btn-pri btn-gigante" data-acao="comecar">${I('lupa')}<span>INICIAR INVESTIGAÇÃO</span>${I('seta')}</button>
        </div>
        <div class="inicio-cena">
          <div class="scanner">
            <div class="scanner-cab"><span class="led"></span>ANÁLISE DE AMOSTRA · Nº 002</div>
            ${DM.amostra('agua-oleo')}
            <div class="scanner-rodape" id="ini-leitura">Varredura em andamento…</div>
          </div>
        </div>
        <div class="inicio-creditos">
          <div class="creditos">
            <p class="creditos-tit">TRABALHO ACADÊMICO · FEIRA DE QUÍMICA</p>
            <dl>
              <div><dt>Disciplina</dt><dd>${DM.creditos.disciplina}</dd></div>
              <div><dt>Docente</dt><dd>${DM.creditos.docente}</dd></div>
              <div><dt>Discentes</dt><dd>${DM.listaNomes(DM.creditos.discentes)}</dd></div>
            </dl>
          </div>
          <p class="dev">Sistema desenvolvido por ${DM.creditos.desenvolvedor} · ${DM.creditos.instagram}</p>
        </div>
      </div>
      <div class="fita fita-base"><div class="fita-txt rev">${'NÃO ULTRAPASSE &nbsp;●&nbsp; LABORATÓRIO EM INVESTIGAÇÃO &nbsp;●&nbsp; '.repeat(8)}</div></div>
    `,
    init(el) {
      const svg = $('.amostra-svg', el);
      const leitura = $('#ini-leitura', el);
      const zonas = DM.zonasAmostra('agua-oleo');
      const L = lupa(svg, (x, y) => { const z = zonas.find((z) => y >= z[0] && y < z[1]); if (z) leitura.textContent = z[2]; });
      let t0 = performance.now(), raf, parado = false;
      svg.addEventListener('pointerdown', () => (parado = true));
      const loop = (t) => {
        if (!parado) { const s = (t - t0) / 1000; L.mover(160 + Math.sin(s * 0.7) * 60, 210 + Math.sin(s * 1.1) * 90); }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      aoSair(() => cancelAnimationFrame(raf));
    }
  };

  /* ===== CENTRAL DE CONHECIMENTOS ===== */
  TELAS.arquivos = {
    html(p) {
      const id = p.id || DM.conhecimentos[0].id;
      return `
      <div class="tela-cab">
        <div><p class="sobre">CENTRAL DE CONHECIMENTOS</p><h2>Arquivos secretos do laboratório</h2></div>
        <button class="btn btn-sec" data-ir="casos">Ir para os casos ${I('seta')}</button>
      </div>
      <div class="arq-layout">
        <nav class="arq-lista">
          ${DM.conhecimentos.map((k) => `
            <button class="arq-aba ${k.id === id ? 'on' : ''} ${estado.lidos[k.id] ? 'lido' : ''}" data-arq="${k.id}">
              <span class="arq-cod">${k.codigo}</span>
              <span class="arq-nome">${k.titulo}</span>
              <span class="arq-check">${I('ok')}</span>
            </button>`).join('')}
        </nav>
        <article class="dossie" id="dossie"></article>
      </div>`;
    },
    init(el, p) {
      const mostrar = (id) => {
        const k = DM.conhecimentos.find((x) => x.id === id);
        estado.lidos[id] = true;
        $$('.arq-aba', el).forEach((b) => b.classList.toggle('on', b.dataset.arq === id));
        $(`.arq-aba[data-arq="${id}"]`, el).classList.add('lido');
        const idx = DM.conhecimentos.indexOf(k);
        const prox = DM.conhecimentos[idx + 1];
        const d = $('#dossie', el);
        d.classList.remove('entra'); void d.offsetWidth; d.classList.add('entra');
        d.innerHTML = `
          <div class="dossie-cab"><span class="clip"></span><span class="arq-cod">${k.codigo} · ARQUIVO LIBERADO</span></div>
          <div class="dossie-corpo">
            <div class="dossie-ilu">${DM.ilustracao(k.ilustracao)}</div>
            <div class="dossie-txt">
              <h3>${k.titulo}</h3>
              <p class="dossie-resumo">${k.resumo}</p>
              <p>${k.texto}</p>
            </div>
          </div>
          <div class="dossie-pontos">${k.pontos.map((pt) => `<div class="ponto"><b>${pt[0]}</b><span>${pt[1]}</span></div>`).join('')}</div>
          <div class="pista-detetive">${I('lupa')}<div><b>PISTA DO DETETIVE</b><p>${k.pista}</p></div></div>
          <div class="dossie-nav">
            ${prox ? `<button class="btn btn-sec" data-arq="${prox.id}">Próximo arquivo: ${prox.titulo} ${I('seta')}</button>`
            : `<button class="btn btn-pri" data-ir="casos">Arquivos estudados! Ir para os casos ${I('seta')}</button>`}
          </div>`;
        d.scrollTop = 0;
        atualizarTopo();
      };
      el.addEventListener('click', (e) => { const b = e.target.closest('[data-arq]'); if (b) { Som.clique(); mostrar(b.dataset.arq); } });
      mostrar(p.id || DM.conhecimentos[0].id);
    }
  };

  /* ===== LISTA DE CASOS ===== */
  TELAS.casos = {
    html() {
      return `
      <div class="tela-cab">
        <div><p class="sobre">CASOS DE INVESTIGAÇÃO</p><h2>Cinco amostras aguardam análise</h2></div>
        <button class="btn btn-sec" data-ir="quiz">Desafio surpresa ${I('seta')}</button>
      </div>
      <div class="casos-grid">
        ${DM.casos.map((c, i) => {
          const e = estado.casos[c.id];
          const st = e.resolvido ? `<span class="carimbo-mini">RESOLVIDO · ${e.pontos} pts</span>` : e.etapa > 0 ? `<span class="tag-andamento">EM ANDAMENTO · etapa ${e.etapa + 1}/4</span>` : '<span class="tag-nova">EM ABERTO</span>';
          return `
          <button class="caso-card ${e.resolvido ? 'resolvido' : ''}" data-caso="${c.id}" style="animation-delay:${i * 70}ms">
            <span class="caso-aba">CASO Nº ${c.numero}</span>
            <span class="caso-mini mini">${DM.amostra(c.amostra)}</span>
            <span class="caso-info">
              <b>${c.titulo}</b>
              <span class="caso-local">${I('pin')} ${c.local}</span>
              ${st}
            </span>
          </button>`;
        }).join('')}
      </div>`;
    },
    init(el) {
      el.addEventListener('click', (e) => { const b = e.target.closest('[data-caso]'); if (b) { Som.clique(); ir('caso', { id: b.dataset.caso }); } });
    }
  };

  /* ===== UM CASO ===== */
  const correta = (et, op) => (et.certo ? op.id === et.certo : !!op.ok);

  TELAS.caso = {
    html(p) {
      const c = DM.casos.find((x) => x.id === p.id);
      return `
      <div class="tela-cab">
        <div><p class="sobre">CASO Nº ${c.numero} · ${c.local.toUpperCase()}</p><h2>${c.titulo}</h2></div>
        <button class="btn btn-sec" data-ir="casos">${I('voltar')} Casos</button>
      </div>
      <div class="caso-layout">
        <aside class="evidencia">
          <div class="evid-cab"><span class="led"></span>EVIDÊNCIA · AMOSTRA ${c.numero}</div>
          <div class="evid-amostra">
            ${DM.amostra(c.amostra)}
            <div class="dica-lupa">${I('mao')} Arraste a lupa sobre a amostra</div>
          </div>
          <div class="evid-leitura"><b>LUPA</b><span id="leitura">Toque na amostra para ver as partículas.</span></div>
        </aside>
        <div class="caso-dir">
          <div id="trilha"></div>
          <div class="pistas">
            <p class="pistas-tit">${I('pasta')} Pistas coletadas</p>
            <ol>${c.pistas.map((t) => `<li>${t}</li>`).join('')}</ol>
          </div>
          <section class="interrogatorio" id="interrog"></section>
        </div>
      </div>`;
    },
    init(el, p) {
      const c = DM.casos.find((x) => x.id === p.id);
      const e = estado.casos[c.id];
      const svg = $('.amostra-svg', $('.evid-amostra', el));
      const zonas = DM.zonasAmostra(c.amostra);
      const leit = $('#leitura', el);
      lupa(svg, (x, y) => {
        const z = zonas.find((z) => y >= z[0] && y < z[1]);
        if (z && leit.textContent !== z[2]) { leit.textContent = z[2]; leit.classList.remove('pisca1'); void leit.offsetWidth; leit.classList.add('pisca1'); }
        $('.dica-lupa', el).classList.add('some');
      });
      const box = $('#interrog', el);

      const trilhaEl = $('#trilha', el);
      const desenharTrilha = () => { trilhaEl.innerHTML = trilha(); };
      function trilha() {
        return `<div class="trilha">${c.etapas.map((et, i) => {
          const r = e.respostas[i];
          const cls = r === undefined ? (i === e.etapa ? 'atual' : '') : r ? 'certo' : 'errado';
          return `<div class="trilha-passo ${cls}"><span class="trilha-n">${r === undefined ? i + 1 : r ? I('ok') : I('x')}</span><span>${DM.nomesEtapa[et.tipo]}</span></div>`;
        }).join('<span class="trilha-linha"></span>')}</div>`;
      }

      function etapa() {
        const et = c.etapas[e.etapa];
        desenharTrilha();
        box.innerHTML = `
          <div class="pergunta-box entra">
            <p class="etapa-rot">ETAPA ${e.etapa + 1} DE 4 · ${DM.nomesEtapa[et.tipo].toUpperCase()}</p>
            <h3>${et.pergunta}</h3>
            ${et.tipo === 'metodo' ? '<p class="nota">Mais de um método pode resolver o caso.</p>' : ''}
            <div class="opcoes ${et.opcoes.length === 3 ? 'tres' : ''}">
              ${et.opcoes.map((op) => `<button class="opcao" data-op="${op.id}"><span class="opcao-marca"></span><span>${op.txt}</span></button>`).join('')}
            </div>
            <div class="feedback" id="fb"></div>
          </div>`;
        $$('.opcao', box).forEach((b) => b.addEventListener('click', () => responder(b)));
      }

      function responder(btn) {
        const et = c.etapas[e.etapa];
        if (e.respostas[e.etapa] !== undefined) return;
        const op = et.opcoes.find((o) => o.id === btn.dataset.op);
        const ok = correta(et, op);
        e.respostas[e.etapa] = ok;
        $$('.opcao', box).forEach((b) => {
          b.disabled = true;
          const o = et.opcoes.find((x) => x.id === b.dataset.op);
          if (correta(et, o)) b.classList.add('certa');
          if (b === btn && !ok) b.classList.add('errada');
          if (b === btn) b.classList.add('escolhida');
        });
        if (ok) { e.acertos++; e.pontos += DM.PONTOS_ETAPA; Som.ok(); voarPontos(btn, DM.PONTOS_ETAPA); } else Som.erro();
        const ultima = e.etapa === c.etapas.length - 1;
        const fb = $('#fb', box);
        fb.className = 'feedback on ' + (ok ? 'ok' : 'nao');
        fb.innerHTML = `
          <div class="fb-ico">${I(ok ? 'ok' : 'x')}</div>
          <div class="fb-txt"><b>${ok ? 'Pista confirmada! +' + DM.PONTOS_ETAPA + ' pontos' : 'Não foi dessa vez, detetive.'}</b><p>${et.explica}</p></div>
          <button class="btn btn-pri" id="prox">${ultima ? 'Fechar o caso' : 'Próxima etapa'} ${I('seta')}</button>`;
        desenharTrilha();
        $('#prox', fb).addEventListener('click', () => {
          Som.clique();
          e.etapa++;
          if (e.etapa >= c.etapas.length) { e.resolvido = true; conclusao(true); } else etapa();
          if (trilhaEl.getBoundingClientRect().top < 0 || trilhaEl.getBoundingClientRect().top > window.innerHeight * 0.6) trilhaEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        setTimeout(() => fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
      }

      function conclusao(agora) {
        const idx = DM.casos.indexOf(c);
        const prox = DM.casos.slice(idx + 1).concat(DM.casos.slice(0, idx)).find((x) => !estado.casos[x.id].resolvido);
        const k = c.conclusao;
        desenharTrilha();
        el.querySelector('.caso-dir').classList.add('fechado');
        box.innerHTML = `
          <div class="conclusao entra">
            <div class="conc-cab">
              <div>
                <p class="etapa-rot">RELATÓRIO FINAL · CASO Nº ${c.numero}</p>
                <h3>${c.etapas[0].opcoes.find((o) => o.ok).txt}</h3>
              </div>
              <div class="carimbo ${agora ? 'bate' : ''}">CASO<br>RESOLVIDO</div>
            </div>
            <div class="conc-grid">
              <div class="ficha">
                <div><span>Classificação</span><b>${k.tipo}</b></div>
                <div><span>Fases</span><b>${k.fases}</b></div>
                <div><span>Separação</span><b>${k.metodo}</b></div>
                <div><span>Pontos</span><b>${e.pontos} / 40</b></div>
              </div>
              <div class="conclusao-cena">
                <div class="cena-box play">${DM.cena(k.cena)}</div>
                <button class="btn btn-ghost btn-repetir" data-repetir>${I('play')} Ver de novo</button>
              </div>
            </div>
            <div class="conclusao-botoes">
              ${prox ? `<button class="btn btn-pri" data-caso-prox="${prox.id}">Próximo caso: ${prox.titulo} ${I('seta')}</button>`
              : `<button class="btn btn-pri" data-ir="quiz">Todos os casos resolvidos! Ir ao Desafio Surpresa ${I('seta')}</button>`}
              <button class="btn btn-sec" data-ir="casos">Ver todos os casos</button>
            </div>
          </div>`;
        if (agora) { setTimeout(() => Som.carimbo(), 380); }
        $('[data-caso-prox]', box) && $('[data-caso-prox]', box).addEventListener('click', (ev) => { Som.clique(); ir('caso', { id: ev.currentTarget.dataset.casoProx }); });
        $('[data-repetir]', box).addEventListener('click', () => replay($('.cena-box', box)));
        atualizarTopo();
      }

      if (e.resolvido) conclusao(false); else etapa();
    }
  };

  function replay(box) {
    Som.clique();
    box.classList.remove('play'); void box.offsetWidth;
    box.innerHTML = box.innerHTML; // recria o SVG para zerar as animações
    void box.offsetWidth; box.classList.add('play');
  }

  /* ===== LABORATÓRIO DE MÉTODOS ===== */
  TELAS.lab = {
    html(p) {
      return `
      <div class="tela-cab">
        <div><p class="sobre">LABORATÓRIO DE MÉTODOS</p><h2>Como separar uma mistura</h2></div>
        <button class="btn btn-sec" data-ir="casos">${I('voltar')} Voltar aos casos</button>
      </div>
      <div class="lab-layout">
        <nav class="lab-lista">
          ${DM.metodos.map((m, i) => `<button class="lab-btn ${estado.vistos[m.id] ? 'visto' : ''}" data-met="${m.id}"><span class="lab-n">${String(i + 1).padStart(2, '0')}</span>${m.nome}<span class="arq-check">${I('ok')}</span></button>`).join('')}
        </nav>
        <div class="lab-palco" id="labpalco"></div>
      </div>`;
    },
    init(el, p) {
      let timers = [];
      const limpar = () => { timers.forEach(clearTimeout); timers = []; };
      aoSair(limpar);
      const mostrar = (id) => {
        limpar();
        const m = DM.metodos.find((x) => x.id === id);
        estado.vistos[id] = true;
        $$('.lab-btn', el).forEach((b) => b.classList.toggle('on', b.dataset.met === id));
        $(`.lab-btn[data-met="${id}"]`, el).classList.add('visto');
        const i = DM.metodos.indexOf(m);
        const prox = DM.metodos[i + 1];
        const pal = $('#labpalco', el);
        pal.innerHTML = `
          <div class="lab-tela entra">
            <div class="lab-monitor">
              <div class="evid-cab"><span class="led"></span>EXPERIMENTO ${String(i + 1).padStart(2, '0')} · ${m.nome.toUpperCase()}</div>
              <div class="cena-box play">${DM.cena(m.cena)}</div>
              <button class="btn btn-ghost btn-repetir" data-repetir>${I('play')} Repetir experimento</button>
            </div>
            <div class="lab-info">
              <h3>${m.nome}</h3>
              <div class="lab-tags"><span><small>Princípio</small>${m.principio}</span><span><small>Para misturas</small>${m.mistura}</span></div>
              <p>${m.texto}</p>
              <ol class="lab-passos">${m.passos.map((t) => `<li>${t}</li>`).join('')}</ol>
              <div class="pista-detetive">${I('lupa')}<div><b>NO DIA A DIA</b><p>${m.cotidiano}</p></div></div>
              ${prox ? `<button class="btn btn-sec" data-met="${prox.id}">Próximo: ${prox.nome} ${I('seta')}</button>` : `<button class="btn btn-pri" data-ir="quiz">Ir para o Desafio Surpresa ${I('seta')}</button>`}
            </div>
          </div>`;
        const passos = $$('.lab-passos li', pal);
        const acende = () => { limpar(); passos.forEach((li) => li.classList.remove('on')); [0, 2200, 4400].forEach((t, k) => timers.push(setTimeout(() => passos[k] && passos[k].classList.add('on'), t + 200))); };
        acende();
        $('[data-repetir]', pal).addEventListener('click', () => { replay($('.cena-box', pal)); acende(); });
        atualizarTopo();
      };
      el.addEventListener('click', (e) => { const b = e.target.closest('[data-met]'); if (b) { Som.clique(); mostrar(b.dataset.met); } });
      mostrar(p.id || DM.metodos[0].id);
    }
  };

  /* ===== DESAFIO SURPRESA (com tempo por pergunta) ===== */
  function novoQuiz() {
    return {
      perguntas: embaralhar(DM.quiz).slice(0, DM.QUIZ_TOTAL).map((q) => {
        const ordem = embaralhar(q.o.map((t, i) => i));
        return { p: q.p, e: q.e, o: ordem.map((i) => q.o[i]), c: ordem.indexOf(q.c) };
      }),
      i: 0, acertos: 0, pontos: 0, seq: 0, melhorSeq: 0, esgotadas: 0, res: []
    };
  }

  TELAS.quiz = {
    html() {
      return `
      <div class="tela-cab">
        <div><p class="sobre">DESAFIO SURPRESA</p><h2>Responda antes que o tempo acabe</h2></div>
        <button class="btn btn-sec" data-acao="concluir">${I('estrela')} Concluir missão</button>
      </div>
      <div class="quiz-area" id="quiz"></div>`;
    },
    init(el) {
      const area = $('#quiz', el);
      const TEMPO = DM.QUIZ_TEMPO;
      let relogio = null, avanco = null;
      const pararRelogio = () => { clearInterval(relogio); relogio = null; };
      const pararAvanco = () => { clearTimeout(avanco); avanco = null; };
      aoSair(() => { pararRelogio(); pararAvanco(); });

      const intro = () => {
        area.innerHTML = `
          <div class="quiz-intro entra">
            <div class="quiz-intro-ico">${I('relogio')}</div>
            <h3>${estado.quizFeito ? 'Desafio concluído: ' + estado.quizAcertos + ' de 10 acertos' : 'Pronto para o desafio?'}</h3>
            <p>${estado.quizFeito ? 'Você pode jogar de novo. A nova pontuação substitui a anterior.'
              : 'São <b>10 perguntas</b> sorteadas e você tem <b>' + TEMPO + ' segundos</b> para cada uma. Acertou dentro do tempo, ganha <b>10 pontos</b>. Se o tempo acabar, a pergunta passa e os pontos dela ficam para trás.'}</p>
            <button class="btn btn-pri btn-grande" data-acao="quiz-iniciar">${I('raio')} ${estado.quizFeito ? 'Jogar de novo' : 'Começar o desafio'}</button>
          </div>`;
      };

      const pergunta = () => {
        pararAvanco();
        const q = estado.quiz, P = q.perguntas[q.i];
        area.innerHTML = `
          <div class="quiz-topo">
            <div class="quiz-seg">${q.perguntas.map((_, k) => `<i class="${q.res[k] === true ? 'ok' : q.res[k] === false ? 'nao' : k === q.i ? 'atual' : ''}"></i>`).join('')}</div>
            <div class="quiz-stats"><span>Pergunta <b>${q.i + 1}</b>/10</span><span>Acertos <b>${q.acertos}</b></span><span class="seq ${q.seq >= 3 ? 'quente' : ''}">${I('raio')} Sequência <b>${q.seq}</b></span></div>
          </div>
          <div class="quiz-card entra">
            <div class="cronometro" id="crono">
              <div class="crono-num"><b id="crono-s">${TEMPO}</b><small>seg</small></div>
              <div class="crono-trilho"><i id="crono-barra"></i></div>
            </div>
            <p class="etapa-rot">PERGUNTA ${String(q.i + 1).padStart(2, '0')}</p>
            <h3>${P.p}</h3>
            <div class="opcoes quiz-ops">${P.o.map((t, k) => `<button class="opcao" data-k="${k}"><span class="letra">${'ABCD'[k]}</span><span>${t}</span></button>`).join('')}</div>
            <div class="feedback" id="qfb"></div>
          </div>`;
        $$('.opcao', area).forEach((b) => b.addEventListener('click', () => responder(b)));
        iniciarRelogio();
      };

      const iniciarRelogio = () => {
        pararRelogio();
        const fim = performance.now() + TEMPO * 1000;
        const num = $('#crono-s', area), barra = $('#crono-barra', area), caixa = $('#crono', area);
        let ultimo = TEMPO;
        relogio = setInterval(() => {
          const resta = Math.max(0, (fim - performance.now()) / 1000);
          const seg = Math.ceil(resta);
          barra.style.transform = 'scaleX(' + (resta / TEMPO) + ')';
          if (seg !== ultimo) {
            ultimo = seg; num.textContent = seg;
            if (seg <= 5 && seg > 0) { caixa.classList.add('urgente'); Som.tique(); }
          }
          if (resta <= 0) { pararRelogio(); esgotou(); }
        }, 100);
      };

      const revelar = (escolhido) => {
        const q = estado.quiz, P = q.perguntas[q.i];
        $$('.opcao', area).forEach((b) => { b.disabled = true; if (+b.dataset.k === P.c) b.classList.add('certa'); });
        if (escolhido) escolhido.classList.add('escolhida');
      };

      const mostrarFeedback = (tipo, titulo) => {
        const q = estado.quiz, P = q.perguntas[q.i];
        const ult = q.i === q.perguntas.length - 1;
        const fb = $('#qfb', area);
        fb.className = 'feedback on ' + (tipo === 'ok' ? 'ok' : 'nao');
        fb.innerHTML = `<div class="fb-ico">${I(tipo === 'ok' ? 'ok' : tipo === 'tempo' ? 'relogio' : 'x')}</div>
          <div class="fb-txt"><b>${titulo}</b><p>${P.e}</p></div>
          <button class="btn btn-pri btn-auto" id="qprox" style="--auto:${DM.QUIZ_PAUSA}s">${ult ? 'Ver resultado' : 'Próxima pergunta'} ${I('seta')}</button>`;
        $$('.quiz-seg i', area)[q.i].className = q.res[q.i] ? 'ok' : 'nao';
        $('.seq', area).outerHTML = `<span class="seq ${q.seq >= 3 ? 'quente' : ''}">${I('raio')} Sequência <b>${q.seq}</b></span>`;
        let foi = false;
        const seguir = () => { if (foi) return; foi = true; pararAvanco(); if (ult) fim(); else { q.i++; pergunta(); } };
        $('#qprox', fb).addEventListener('click', () => { Som.clique(); seguir(); });
        avanco = setTimeout(seguir, DM.QUIZ_PAUSA * 1000);
        setTimeout(() => fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
      };

      const responder = (btn) => {
        const q = estado.quiz, P = q.perguntas[q.i];
        if (q.res[q.i] !== undefined) return;
        pararRelogio();
        const k = +btn.dataset.k, ok = k === P.c;
        q.res[q.i] = ok;
        revelar(btn);
        if (!ok) btn.classList.add('errada');
        if (ok) { q.acertos++; q.pontos += DM.PONTOS_QUIZ; q.seq++; q.melhorSeq = Math.max(q.melhorSeq, q.seq); Som.ok(); voarPontos(btn, DM.PONTOS_QUIZ); }
        else { q.seq = 0; Som.erro(); }
        estado.quizPontos = q.pontos;
        mostrarFeedback(ok ? 'ok' : 'nao', ok ? (q.seq >= 3 ? 'Modo detetive: ' + q.seq + ' acertos seguidos!' : 'Resposta certa! +10 pontos') : 'Resposta incorreta');
      };

      const esgotou = () => {
        const q = estado.quiz;
        if (q.res[q.i] !== undefined) return;
        q.res[q.i] = false; q.seq = 0; q.esgotadas++;
        revelar(null);
        $('#crono', area).classList.add('zerado');
        Som.tempoEsgotado();
        mostrarFeedback('tempo', 'Tempo esgotado! A resposta certa está em verde.');
      };

      const fim = () => {
        const q = estado.quiz;
        pararRelogio();
        estado.quizFeito = true; estado.quizAcertos = q.acertos; estado.quizPontos = q.pontos;
        Som.vitoria();
        const msg = q.acertos >= 9 ? 'Faro impecável!' : q.acertos >= 7 ? 'Excelente investigação!' : q.acertos >= 5 ? 'Bom trabalho, detetive!' : 'Toda investigação ensina algo novo!';
        area.innerHTML = `
          <div class="quiz-intro entra">
            <p class="etapa-rot">DESAFIO CONCLUÍDO</p>
            <div class="placar"><b>${q.acertos}</b><span>de 10 acertos</span></div>
            <h3>${msg}</h3>
            <p>Você somou <b>${q.pontos} pontos</b> no desafio. Melhor sequência: <b>${q.melhorSeq}</b> acertos seguidos.${q.esgotadas ? ' O tempo acabou em <b>' + q.esgotadas + '</b> pergunta' + (q.esgotadas > 1 ? 's' : '') + '.' : ''}</p>
            <div class="conclusao-botoes centro">
              ${casosResolvidos() < 5 ? `<button class="btn btn-pri" data-ir="casos">Resolver os casos que faltam ${I('seta')}</button><button class="btn btn-sec" data-acao="concluir">Encerrar missão</button>`
              : `<button class="btn btn-pri btn-grande" data-ir="resultado">${I('estrela')} Ver resultado final</button>`}
            </div>
          </div>`;
        atualizarTopo();
      };

      el.addEventListener('click', (e) => {
        if (e.target.closest('[data-acao="quiz-iniciar"]')) { Som.clique(); estado.quiz = novoQuiz(); estado.quizPontos = 0; atualizarTopo(); pergunta(); }
      });
      if (estado.quiz && !estado.quizFeito) {
        // Voltou no meio do desafio. A pergunta deixada aberta conta como tempo esgotado:
        // assim ninguém sai para consultar os arquivos e volta com o relógio zerado.
        const q = estado.quiz;
        if (q.res[q.i] === undefined) { q.res[q.i] = false; q.seq = 0; q.esgotadas++; }
        if (q.i >= q.perguntas.length - 1) fim(); else { q.i++; pergunta(); }
      } else intro();
    }
  };

  /* ===== RESULTADO + CERTIFICADO ===== */
  TELAS.resultado = {
    html() {
      const p = pontosTotal(), d = distintivo(p);
      const hoje = new Date().toLocaleDateString('pt-BR');
      return `
      <div class="confete" aria-hidden="true">${Array.from({ length: 36 }, (_, i) => `<i style="--x:${Math.random() * 100}vw;--d:${(Math.random() * 1.6).toFixed(2)}s;--r:${Math.round(Math.random() * 360)}deg;--c:${['#ffc933', '#ffffff', '#7cc4ff', '#ffe08a'][i % 4]}"></i>`).join('')}</div>
      <div class="res-layout">
        <div class="res-placar entra">
          <p class="sobre">MISSÃO CONCLUÍDA</p>
          <h2 class="res-tit">Parabéns, detetive!</h2>
          <div class="res-numero"><b id="contador">0</b><span>de ${DM.PONTOS_MAX} pontos</span></div>
          <div class="distintivo d-${d.cor}">${I('estrela')}<div><b>${d.nome}</b><span>${d.titulo}</span></div></div>
          <div class="res-stats">
            <div><b>${casosResolvidos()}/5</b><span>casos resolvidos</span></div>
            <div><b>${acertosCasos()}/20</b><span>pistas certas</span></div>
            <div><b>${estado.quizFeito ? estado.quizAcertos : 0}/10</b><span>acertos no desafio</span></div>
          </div>
          <label class="nome-campo">
            <span>Seu nome no certificado</span>
            <input id="nome" maxlength="40" autocomplete="off" placeholder="Seu nome" value="${esc(estado.nome)}">
          </label>
          <div id="res-acoes">${acoesResultado()}</div>
        </div>
        <div class="certificado entra" id="certificado">
          <div class="cert-borda ${estado.polaroide ? 'com-foto' : ''}" id="cert-borda">
            <div class="cert-marca">${I('digital')}</div>
            <div class="cert-topo"><span>${DM.creditos.disciplina.toUpperCase()}</span><span>REGISTRO Nº ${String(Math.floor(1000 + Math.random() * 9000))}</span></div>
            <div class="cert-meio">
              <div class="cert-foto" id="cert-foto">${estado.polaroide ? `<img src="${estado.polaroide}" alt="Foto de detetive">` : ''}</div>
              <div class="cert-conteudo">
                <img class="cert-logo" src="${DM.creditos.logo}" alt="${DM.creditos.instituicao}">
                <p class="cert-sobre">CERTIFICADO</p>
                <h3 class="cert-tit">DETETIVE DA MATÉRIA</h3>
                <p class="cert-txt">Certificamos que</p>
                <p class="cert-nome" id="cert-nome">${estado.nome ? esc(estado.nome) : '<span class="vazio">Seu nome aqui</span>'}</p>
                <p class="cert-txt">concluiu a missão <b>Investigar, Identificar e Separar</b>, analisando amostras, classificando misturas e escolhendo os métodos de separação adequados, com <b>${p} pontos</b>.</p>
              </div>
            </div>
            <div class="cert-creditos">
              <span><b>Disciplina:</b> ${DM.creditos.disciplina}</span>
              <span><b>Docente:</b> ${DM.creditos.docente}</span>
              <span><b>Discentes:</b> ${DM.listaNomes(DM.creditos.discentes)}</span>
            </div>
            <div class="cert-rodape">
              <div class="cert-ass"><span class="ass">Detetives da Matéria</span><i></i><small>Coordenação da missão</small></div>
              <div class="cert-selo d-${d.cor}">${I('estrela')}<small>${d.nome.replace('Distintivo de ', '').toUpperCase()}</small></div>
              <div class="cert-ass"><span class="ass data">${hoje}</span><i></i><small>Data</small></div>
            </div>
          </div>
        </div>
      </div>`;
    },
    init(el) {
      const alvo = pontosTotal(), c = $('#contador', el);
      const t0 = performance.now();
      let raf;
      const passo = (t) => { const k = Math.min(1, (t - t0) / 1400); c.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3))); if (k < 1) raf = requestAnimationFrame(passo); };
      raf = requestAnimationFrame(passo);
      aoSair(() => cancelAnimationFrame(raf));
      Som.vitoria();
      const inp = $('#nome', el), nome = $('#cert-nome', el);
      const mostrarNome = () => { nome.innerHTML = estado.nome.trim() ? esc(estado.nome) : '<span class="vazio">Seu nome aqui</span>'; };

      // refaz a polaroide (ela traz o nome escrito embaixo da foto)
      let espera = null;
      const montarFoto = async (mostrarCartao) => {
        if (!estado.foto) return;
        const url = await DM.foto.polaroide(estado.foto, estado.nome);
        if (atual !== 'resultado') return;
        estado.polaroide = url;
        $('#cert-foto', el).innerHTML = `<img src="${url}" alt="Foto de detetive">`;
        $('#cert-borda', el).classList.add('com-foto');
        $('#res-acoes', el).innerHTML = acoesResultado();
        if (mostrarCartao === true) cartaoParaFoto();
      };

      inp.addEventListener('input', () => {
        estado.nome = inp.value; mostrarNome();
        clearTimeout(espera); espera = setTimeout(montarFoto, 400);
      });
      aoSair(() => clearTimeout(espera));

      const registro = () => DM.foto.abrir({
        nome: estado.nome, kit: estado.kit,
        aoConcluir: (r) => {
          estado.registroFeito = true;
          estado.nome = r.nome; inp.value = r.nome; mostrarNome();
          estado.kit = r.kit;
          if (r.base) { estado.foto = r.base; montarFoto(true); }
        }
      });

      el.addEventListener('click', (e) => {
        const a = e.target.closest('[data-acao]');
        if (!a) return;
        if (a.dataset.acao === 'foto') registro();
        if (a.dataset.acao === 'cartao') cartaoParaFoto();
        if (a.dataset.acao === 'baixar' && estado.polaroide) {
          const ln = document.createElement('a');
          const slug = (estado.nome || 'detetive').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
          ln.href = estado.polaroide; ln.download = 'detetive-da-materia-' + slug + '.jpg';
          document.body.appendChild(ln); ln.click(); ln.remove();
        }
      });

      // ao chegar no final, o registro (nome + foto) abre sozinho
      if (!estado.registroFeito) { const t = setTimeout(registro, 1700); aoSair(() => clearTimeout(t)); }
    }
  };

  // Tela limpa, sem botões no meio, feita para o visitante fotografar com o celular e postar.
  function cartaoParaFoto() {
    if (!estado.polaroide) return;
    const p = pontosTotal(), d = distintivo(p), cr = DM.creditos;
    const fundo = document.createElement('div');
    fundo.className = 'modal-fundo cartao-fundo';
    fundo.innerHTML = `
      <div class="cartao" role="dialog" aria-modal="true">
        <div class="cartao-fita"><span>${'DETETIVES DA MATÉRIA &nbsp;●&nbsp; MISSÃO CUMPRIDA &nbsp;●&nbsp; '.repeat(6)}</span></div>
        <div class="cartao-corpo">
          <img class="cartao-polaroide" src="${estado.polaroide}" alt="Foto de detetive">
          <div class="cartao-info">
            <img class="cartao-logo" src="${cr.logoClara}" alt="${cr.instituicao}">
            <p class="sobre">MISSÃO CUMPRIDA · FEIRA DE QUÍMICA</p>
            <h2 class="cartao-nome">${esc(estado.nome || 'Detetive anônimo')}</h2>
            <p class="cartao-titulo">é oficialmente <b>Detetive da Matéria</b></p>
            <div class="cartao-pontos">
              <div class="distintivo d-${d.cor}">${I('estrela')}<div><b>${d.nome}</b><span>${p} de ${DM.PONTOS_MAX} pontos</span></div></div>
            </div>
            <div class="creditos cartao-creditos">
              <p class="creditos-tit">TRABALHO ACADÊMICO</p>
              <dl>
                <div><dt>Disciplina</dt><dd>${cr.disciplina}</dd></div>
                <div><dt>Docente</dt><dd>${cr.docente}</dd></div>
                <div><dt>Discentes</dt><dd>${DM.listaNomes(cr.discentes)}</dd></div>
              </dl>
            </div>
            <p class="dev">Sistema desenvolvido por ${cr.desenvolvedor} · ${cr.instagram}</p>
          </div>
        </div>
        <button class="btn btn-pri btn-grande cartao-fechar" data-fechar>Ver meu certificado completo ${I('seta')}</button>
      </div>`;
    document.body.appendChild(fundo);
    requestAnimationFrame(() => fundo.classList.add('on'));
    fundo.querySelector('[data-fechar]').addEventListener('click', () => { fundo.classList.remove('on'); setTimeout(() => fundo.remove(), 250); });
  }

  function acoesResultado() {
    return `
      ${estado.polaroide ? `<button class="btn btn-pri btn-foto" data-acao="cartao">${I('estrela')} Tela para foto</button>` : ''}
      <button class="btn ${estado.foto ? 'btn-sec' : 'btn-pri'} btn-foto" data-acao="foto">${I('camera')} ${estado.foto ? 'Refazer minha foto' : 'Tirar minha foto de detetive'}</button>
      <div class="res-botoes">
        ${estado.polaroide ? `<button class="btn btn-sec" data-acao="baixar">${I('baixar')} Baixar foto</button>` : ''}
        <button class="btn btn-sec" data-acao="imprimir">${I('imprimir')} Imprimir</button>
        <button class="btn btn-sec btn-novo" data-acao="novo">${I('reiniciar')} Novo visitante</button>
      </div>`;
  }

  /* ---------------- AÇÕES GLOBAIS ---------------- */
  function concluir() {
    const faltam = [];
    if (casosResolvidos() < 5) faltam.push((5 - casosResolvidos()) + ' caso(s)');
    if (!estado.quizFeito) faltam.push('o Desafio Surpresa');
    if (!faltam.length) return ir('resultado');
    modal({
      icone: 'pasta', titulo: 'Ainda há pistas em aberto',
      texto: 'Faltam ' + faltam.join(' e ') + '. Você pode encerrar agora com ' + pontosTotal() + ' pontos ou continuar investigando.',
      botoes: [{ txt: 'Continuar investigando', cls: 'btn-sec' }, { txt: 'Encerrar e ver resultado', cls: 'btn-pri', acao: () => ir('resultado') }]
    });
  }

  document.addEventListener('click', (e) => {
    const go = e.target.closest('[data-ir]');
    if (go && !go.closest('.modal')) { Som.clique(); ir(go.dataset.ir); return; }
    const a = e.target.closest('[data-acao]');
    if (!a) return;
    const acao = a.dataset.acao;
    if (acao === 'comecar') { Som.garantir(); Som.ok(); ir('arquivos'); }
    if (acao === 'concluir') { Som.clique(); concluir(); }
    if (acao === 'reiniciar' || acao === 'novo') { Som.clique(); reiniciar(); }
    if (acao === 'imprimir') { Som.clique(); window.print(); }
    if (acao === 'som') {
      Som.ligado = !Som.ligado;
      a.innerHTML = I(Som.ligado ? 'som' : 'mudo');
      a.setAttribute('aria-label', Som.ligado ? 'Desligar som' : 'Ligar som');
      if (Som.ligado) Som.ok();
    }
    if (acao === 'tela-cheia') {
      const d = document, r = d.documentElement;
      if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
      else (r.requestFullscreen || r.webkitRequestFullscreen).call(r);
    }
  });

  /* ---------------- INATIVIDADE (exposição) ---------------- */
  const OCIOSO_MS = 150000, AVISO_S = 20;
  let ultimoToque = Date.now(), aviso = null;
  ['pointerdown', 'keydown', 'input'].forEach((ev) => document.addEventListener(ev, () => { ultimoToque = Date.now(); }, { passive: true }));
  setInterval(() => {
    if (atual === 'inicio' || aviso) return;
    if (Date.now() - ultimoToque < OCIOSO_MS) return;
    let s = AVISO_S;
    aviso = modal({
      icone: 'digital', titulo: 'Ainda está investigando?',
      texto: 'Sem toques há algum tempo. A missão recomeça para o próximo visitante em <b class="contagem">' + s + '</b> segundos.',
      botoes: [{ txt: 'Continuar minha missão', cls: 'btn-pri', acao: () => { clearInterval(tk); aviso = null; } }]
    });
    const tk = setInterval(() => {
      s--;
      const b = $('.contagem', aviso.el); if (b) b.textContent = s;
      if (s <= 0) { clearInterval(tk); aviso = null; reiniciar(true); }
    }, 1000);
  }, 2000);

  /* ---------------- PARTIDA ---------------- */
  function montarTopo() {
    $('#topo').innerHTML = `
      <button class="marca" data-ir="arquivos" aria-label="Arquivos">
        <span class="marca-ico">${I('lupa')}</span>
        <span class="marca-txt"><b>DETETIVES</b><b class="amarelo">DA MATÉRIA</b></span>
      </button>
      <nav class="topo-nav">
        <button data-ir="arquivos">${I('livro')}<span>Arquivos</span><em id="t-arq">0/6</em></button>
        <button data-ir="casos">${I('lupa')}<span>Casos</span><em id="t-casos">0/5</em></button>
        <button data-ir="lab">${I('tubos')}<span>Laboratório</span><em id="t-lab">0/7</em></button>
        <button data-ir="quiz">${I('raio')}<span>Desafio</span><em id="t-quiz">—</em></button>
      </nav>
      <div class="topo-dir">
        <div class="pontos-box" id="t-pontos-box"><small>PONTOS</small><b id="t-pontos">0</b></div>
        <button class="ico-btn" data-acao="som" aria-label="Desligar som">${I('som')}</button>
        ${(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen) ? `<button class="ico-btn" data-acao="tela-cheia" aria-label="Tela cheia">${I('telaCheia')}</button>` : ''}
        <button class="ico-btn reset" data-acao="reiniciar" aria-label="Reiniciar para novo visitante">${I('reiniciar')}</button>
      </div>`;
  }

  // evita zoom por gesto de pinça e o menu de toque longo durante a exposição
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('contextmenu', (e) => { if (!e.target.closest('input')) e.preventDefault(); });

  montarTopo();
  ir('inicio');

  // no link publicado (https), guarda o site no aparelho para funcionar sem internet
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
