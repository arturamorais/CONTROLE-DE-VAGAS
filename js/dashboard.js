// ============================================================
//  CONFIGURAÇÕES
// ============================================================
const TURMAS = {
  educacao_infantil: ['MATERNAL 1', 'MATERNAL 2', 'PRÉ ESCOLAR 1', 'PRÉ ESCOLAR 2'],
  fundamental1:      ['1º ANO', '2º ANO', '3º ANO', '4º ANO', '5º ANO'],
  fundamental2:      ['6º ANO', '7º ANO', '8º ANO', '9º ANO'],
  ensino_medio:      ['1ª SÉRIE', '2ª SÉRIE', '3ª SÉRIE']
};

const SEGMENTO_LABEL = {
  educacao_infantil: 'Educação Infantil',
  fundamental1:      'Fundamental 1',
  fundamental2:      'Fundamental 2',
  ensino_medio:      'Ensino Médio'
};

const STATUS_LABEL = {
  pendente:   'Pendente',
  em_analise: 'Em análise',
  aprovado:   'Aprovado',
  reprovado:  'Reprovado'
};

let alunoCounter          = 0;
let modoEdicao            = false;
let solicitacaoEditandoId = null;

// ============================================================
//  LOGGING
// ============================================================
async function registrarLog(acao, entidade, entidadeId, descricao) {
  try {
    const { data: { user } } = await cliente.auth.getUser();
    if (!user) return;
    const { data: perfil } = await cliente.from('usuarios').select('nome').eq('id', user.id).single();
    await cliente.from('logs').insert({
      usuario_id:   user.id,
      nome_usuario: perfil?.nome || user.email || 'Responsável',
      tipo_usuario: 'responsavel',
      acao,
      entidade,
      entidade_id:  entidadeId ? String(entidadeId) : null,
      descricao
    });
  } catch { /* logs não devem quebrar o fluxo */ }
}

// ============================================================
//  INICIALIZAÇÃO
// ============================================================
async function init() {
  const { data } = await cliente.auth.getUser();
  if (!data.user) { window.location.href = 'index.html'; return; }
  await carregarPerfil(data.user);
  await carregarStats(data.user.id);
  await carregarOverview(data.user.id);
  // Exibe botão de gestão se o usuário também for colaborador ativo
  const { data: colab } = await cliente
    .from('colaboradores').select('id').eq('id', data.user.id).eq('ativo', true).single();
  if (colab) document.getElementById('btn-admin-wrap').style.display = 'block';
}

// ============================================================
//  AUTH
// ============================================================
async function logout() {
  await registrarLog('logout', 'sessao', null, 'Usuário saiu do sistema');
  await cliente.auth.signOut();
  window.location.href = 'index.html';
}

// ============================================================
//  NAVEGAÇÃO
// ============================================================
function showSection(name) {
  document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  const nav = document.querySelector(`[data-section="${name}"]`);
  if (nav) nav.classList.add('active');
  const titles = {
    'overview':            'Início',
    'nova-solicitacao':    'Nova Solicitação',
    'minhas-solicitacoes': 'Solicitações',
    'perfil':              'Meu Perfil'
  };
  document.querySelector('.topbar-title').textContent = titles[name] || '';
  if (name === 'minhas-solicitacoes') carregarSolicitacoes();
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
//  SIDEBAR MOBILE
// ============================================================
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('active');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

// ============================================================
//  PERFIL
// ============================================================
async function carregarPerfil(user) {
  const { data } = await cliente.from('usuarios').select('*').eq('id', user.id).single();
  const nome  = data?.nome     || '';
  const tel   = data?.telefone || '';
  const email = user.email     || '';
  document.getElementById('sidebar-nome').textContent          = nome  || 'Sem nome';
  document.getElementById('sidebar-email').textContent         = email;
  document.getElementById('welcome-msg').textContent           = `Olá, ${nome || 'Responsável'}! 👋`;
  document.getElementById('profile-nome-display').textContent  = nome  || 'Seu nome';
  document.getElementById('profile-email-display').textContent = email;
  document.getElementById('perfil-nome').value                 = nome;
  document.getElementById('perfil-telefone').value             = tel;
}

async function salvarPerfil() {
  const btn      = document.getElementById('btn-salvar-perfil');
  const alertDiv = document.getElementById('perfil-alert');
  alertDiv.innerHTML = '';
  const { data: { user } } = await cliente.auth.getUser();
  const nome     = document.getElementById('perfil-nome').value.trim();
  const telefone = document.getElementById('perfil-telefone').value.trim();
  btn.disabled = true;
  btn.innerHTML = '<span class="loading"></span> Salvando...';
  const { error } = await cliente.from('usuarios').upsert({ id: user.id, nome, telefone });
  btn.disabled = false;
  btn.innerHTML = '💾 Salvar Alterações';
  if (error) { alertDiv.innerHTML = `<div class="alert alert-error">${error.message}</div>`; return; }
  await carregarPerfil(user);
  await registrarLog('editar_perfil', 'usuarios', user.id, 'Perfil atualizado');
  showToast('✅ Perfil atualizado!');
}

async function alterarEmail() {
  const btn      = document.getElementById('btn-alterar-email');
  const alertDiv = document.getElementById('email-alert');
  const novoEmail = document.getElementById('novo-email').value.trim();
  alertDiv.innerHTML = '';
  if (!novoEmail) {
    alertDiv.innerHTML = '<div class="alert alert-error">Informe o novo e-mail.</div>';
    return;
  }
  btn.disabled = true;
  btn.innerHTML = '<span class="loading"></span> Enviando...';
  const { error } = await cliente.auth.updateUser({ email: novoEmail });
  btn.disabled = false;
  btn.innerHTML = '📧 Enviar link de confirmação';
  if (error) { alertDiv.innerHTML = `<div class="alert alert-error">${error.message}</div>`; return; }
  alertDiv.innerHTML = '<div class="alert alert-info">Link enviado! Verifique o novo e-mail para confirmar a alteração.</div>';
  document.getElementById('novo-email').value = '';
}

// ============================================================
//  OVERVIEW (início)
// ============================================================
async function carregarOverview(userId) {
  const { data } = await cliente
    .from('interesse_vagas')
    .select('id, status, created_at, alunos(nome_aluno, segmento, turma, status_aluno), historico_solicitacoes(descricao, autor_tipo, autor_nome, created_at)')
    .eq('usuario_id', userId)
    .order('created_at', { ascending: false });

  if (!data?.length) {
    document.getElementById('overview-solicitacoes').innerHTML = `
      <div class="empty-state" style="padding:1.5rem">
        <span class="empty-icon">📭</span>
        <p>Nenhuma solicitação ainda.</p>
        <button class="btn btn-primary btn-sm" onclick="showSection('nova-solicitacao')">📝 Fazer Solicitação</button>
      </div>`;
    return;
  }

  // ---- alertas contextuais ----
  const alertas = [];
  data.forEach(s => {
    if (s.status === 'aprovado') {
      alertas.push({ cor: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', icon: '🎉', msg: `Solicitação <strong>aprovada</strong>! Entre em contato com a escola para efetivar a matrícula.` });
    }
    if (s.status === 'reprovado') {
      alertas.push({ cor: '#b91c1c', bg: '#fef2f2', border: '#fecaca', icon: '📩', msg: `Uma solicitação foi <strong>reprovada</strong>. Verifique o histórico para mais detalhes.` });
    }
  });

  const cardAlertas = document.getElementById('card-proximos-passos');
  if (alertas.length) {
    cardAlertas.style.display = '';
    cardAlertas.innerHTML = alertas.map(a => `
      <div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.875rem 1.125rem;background:${a.bg};border:1px solid ${a.border};border-radius:var(--radius-sm);margin-bottom:0.5rem">
        <span style="font-size:1.2rem;flex-shrink:0">${a.icon}</span>
        <span style="font-size:0.855rem;color:${a.cor};line-height:1.55">${a.msg}</span>
      </div>`).join('');
  }

  // ---- mini cards de solicitações ----
  const STATUS_CONFIG = {
    pendente:   { icon: '⏳', cor: '#92400e', bg: '#fef3c7', label: 'Pendente' },
    em_analise: { icon: '🔍', cor: '#1e40af', bg: '#eff6ff', label: 'Em Análise' },
    aprovado:   { icon: '✅', cor: '#15803d', bg: '#f0fdf4', label: 'Aprovado' },
    reprovado:  { icon: '✕',  cor: '#b91c1c', bg: '#fef2f2', label: 'Reprovado' }
  };

  const PROXIMOS = {
    pendente:   'Aguardando análise da equipe Plenus.',
    em_analise: 'Em análise — a equipe entrará em contato em breve.',
    aprovado:   'Entre em contato com a escola para efetivar a matrícula.',
    reprovado:  'Confira o histórico para entender o motivo.'
  };

  document.getElementById('overview-solicitacoes').innerHTML = data.map(s => {
    const cfg      = STATUS_CONFIG[s.status] || STATUS_CONFIG.pendente;
    const dataFmt  = new Date(s.created_at).toLocaleDateString('pt-BR');
    const alunos   = (s.alunos || []).map(a => escapeHtmlDash(a.nome_aluno)).join(', ') || '–';
    const ultimaNota = [...(s.historico_solicitacoes || [])]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
    const notaHtml = ultimaNota ? `
      <div style="margin-top:0.5rem;font-size:0.775rem;color:var(--gray-dark);background:var(--white-smoke);border-left:3px solid ${cfg.bg === '#f0fdf4' ? '#22c55e' : '#e2e8f0'};padding:0.35rem 0.625rem;border-radius:0 0.375rem 0.375rem 0;line-height:1.5">
        💬 ${escapeHtmlDash(ultimaNota.descricao)} <span style="color:var(--gray)">· ${ultimaNota.autor_tipo === 'colaborador' ? 'Equipe Plenus' : 'Você'}</span>
      </div>` : '';

    return `
      <div style="display:flex;align-items:flex-start;gap:0.875rem;padding:0.875rem 0;border-bottom:1px solid var(--gray-light);cursor:pointer" onclick="showSection('minhas-solicitacoes')">
        <div style="width:38px;height:38px;border-radius:0.625rem;background:${cfg.bg};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0">${cfg.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.15rem">
            <span style="font-size:0.855rem;font-weight:700;color:var(--navy-mid)">${alunos}</span>
            <span class="status-badge status-${s.status}" style="font-size:0.65rem">${cfg.label}</span>
          </div>
          <div style="font-size:0.775rem;color:var(--gray-dark)">${PROXIMOS[s.status] || ''}</div>
          ${notaHtml}
          <div style="font-size:0.7rem;color:var(--gray);margin-top:0.25rem">${dataFmt}</div>
        </div>
      </div>`;
  }).join('');
}

function escapeHtmlDash(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ============================================================
//  STATS
// ============================================================
async function carregarStats(userId) {
  const { data } = await cliente.from('interesse_vagas')
    .select('id, status, alunos(id)').eq('usuario_id', userId);
  if (!data) return;
  const totalAlunos = data.reduce((acc, s) => acc + (s.alunos?.length || 0), 0);
  const aprovados   = data.filter(s => s.status === 'aprovado').length;
  document.getElementById('stat-solicitacoes').textContent = data.length;
  document.getElementById('stat-alunos').textContent       = totalAlunos;
  document.getElementById('stat-aprovados').textContent    = aprovados;
}

// ============================================================
//  HISTÓRICO
// ============================================================
async function registrarHistorico(interesseId, descricao, autorTipo) {
  try {
    const nomeAutor = document.getElementById('sidebar-nome').textContent.trim() || 'Responsável';
    await cliente.from('historico_solicitacoes').insert({
      interesse_id: interesseId,
      descricao,
      autor_nome: nomeAutor,
      autor_tipo: autorTipo
    });
  } catch { /* não deve quebrar o fluxo */ }
}

// ============================================================
//  TOGGLES DO FORMULÁRIO
// ============================================================
function toggleDesconto() {
  const checked = document.getElementById('toggle-desconto').checked;
  document.getElementById('desconto-detalhe').style.display = checked ? 'block' : 'none';
}
function togglePermuta() {
  const val = document.getElementById('tipo-permuta').value;
  document.getElementById('permuta-detalhe').style.display = val !== 'nao' ? 'block' : 'none';
}

// ============================================================
//  CHIPS (seleção rápida)
// ============================================================
function toggleChip(btn) {
  btn.classList.toggle('chip-active');
}

function getChipsText(groupId) {
  return Array.from(document.querySelectorAll(`#${groupId} .chip-active`))
    .map(c => c.dataset.value)
    .join('; ');
}

function clearChips(groupId) {
  document.querySelectorAll(`#${groupId} .chip-active`)
    .forEach(c => c.classList.remove('chip-active'));
}

// ============================================================
//  CAMPO MOEDA (estilo app bancário)
// ============================================================
function formatarMoeda(input) {
  let digits = input.value.replace(/\D/g, '');
  if (!digits) { input.value = ''; return; }
  digits = digits.replace(/^0+/, '') || '0';
  digits = digits.padStart(3, '0');
  const cents = digits.slice(-2);
  let reais = digits.slice(0, -2);
  reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  input.value = `${reais},${cents}`;
}

function parseMoeda(str) {
  if (!str) return null;
  const num = parseFloat(str.replace(/\./g, '').replace(',', '.'));
  return isNaN(num) ? null : num;
}

function setMoeda(input, value) {
  if (!value && value !== 0) { input.value = ''; return; }
  const cents = Math.round(value * 100);
  let digits = String(cents).padStart(3, '0');
  const c = digits.slice(-2);
  let r = digits.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  input.value = `${r},${c}`;
}

// ============================================================
//  GERENCIAMENTO DE ALUNOS
// ============================================================
function adicionarAluno() {
  alunoCounter++;
  const id = alunoCounter;
  document.getElementById('alunos-empty').style.display = 'none';
  const div = document.createElement('div');
  div.className = 'aluno-card';
  div.id = `aluno-${id}`;
  div.innerHTML = `
    <div class="aluno-card-header">
      <div class="aluno-number">
        <span class="aluno-badge">${id}</span>
        Aluno ${id}
      </div>
      <button class="btn btn-danger btn-sm btn-icon" onclick="removerAluno(${id})" title="Remover">✕</button>
    </div>
    <div class="form-grid">
      <div class="form-group full-width">
        <label>Nome completo do aluno *</label>
        <input type="text" id="aluno-nome-${id}" placeholder="Nome completo do aluno">
      </div>
      <div class="form-group">
        <label>Segmento *</label>
        <select id="aluno-segmento-${id}" onchange="atualizarTurmas(${id})">
          <option value="">Selecione o segmento...</option>
          <option value="educacao_infantil">Educação Infantil</option>
          <option value="fundamental1">Fundamental 1</option>
          <option value="fundamental2">Fundamental 2</option>
          <option value="ensino_medio">Ensino Médio</option>
        </select>
      </div>
      <div class="form-group">
        <label>Turma / Ano *</label>
        <select id="aluno-turma-${id}" disabled>
          <option value="">Selecione o segmento primeiro</option>
        </select>
      </div>
      <div class="form-group">
        <label>Turno *</label>
        <select id="aluno-turno-${id}">
          <option value="">Selecione...</option>
          <option value="manha">☀️ Manhã</option>
          <option value="tarde">🌤️ Tarde</option>
          <option value="tanto_faz">🔄 Tanto faz</option>
        </select>
      </div>
    </div>`;
  document.getElementById('alunos-list').appendChild(div);
  div.querySelector('input').focus();
}

function removerAluno(id) {
  const card = document.getElementById(`aluno-${id}`);
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(-6px)';
    card.style.transition = 'all 0.2s ease';
    setTimeout(() => {
      card.remove();
      if (!document.querySelectorAll('.aluno-card').length)
        document.getElementById('alunos-empty').style.display = 'block';
    }, 200);
  }
}

function atualizarTurmas(id) {
  const segmento = document.getElementById(`aluno-segmento-${id}`).value;
  const select   = document.getElementById(`aluno-turma-${id}`);
  select.innerHTML = '<option value="">Selecione a turma...</option>';
  select.disabled  = !segmento;
  if (segmento && TURMAS[segmento]) {
    TURMAS[segmento].forEach(t => {
      const opt = document.createElement('option');
      opt.value = t; opt.textContent = t;
      select.appendChild(opt);
    });
  }
}

// ============================================================
//  MODO EDIÇÃO
// ============================================================
async function editarSolicitacao(id) {
  const { data, error } = await cliente
    .from('interesse_vagas').select('*, alunos(*)').eq('id', id).single();
  if (error || !data) return showToast('Erro ao carregar solicitação.');

  modoEdicao            = true;
  solicitacaoEditandoId = id;

  // Preencher campos gerais
  document.getElementById('motivo-transferencia').value = data.motivo_transferencia  || '';
  document.getElementById('motivo-plenus').value        = data.motivo_escolha_plenus || '';
  setMoeda(document.getElementById('valor-mensalidade'), data.valor_mensalidade_anterior);
  document.getElementById('taxa-desconto').value        = data.taxa_desconto_almejada    || '';
  document.getElementById('toggle-desconto').checked    = data.tem_desconto || false;
  toggleDesconto();
  document.getElementById('descricao-desconto').value   = data.descricao_desconto  || '';
  document.getElementById('tipo-permuta').value         = data.tipo_permuta        || 'nao';
  togglePermuta();
  document.getElementById('descricao-permuta').value    = data.descricao_permuta   || '';

  // Recriar alunos
  document.getElementById('alunos-list').innerHTML = '';
  document.getElementById('alunos-empty').style.display = 'none';
  alunoCounter = 0;
  for (const aluno of (data.alunos || [])) {
    adicionarAluno();
    const cnt = alunoCounter;
    document.getElementById(`aluno-nome-${cnt}`).value    = aluno.nome_aluno;
    document.getElementById(`aluno-segmento-${cnt}`).value = aluno.segmento;
    atualizarTurmas(cnt);
    document.getElementById(`aluno-turma-${cnt}`).value   = aluno.turma;
    document.getElementById(`aluno-turno-${cnt}`).value   = aluno.turno;
  }

  // Atualizar UI para modo edição
  document.getElementById('btn-enviar').innerHTML          = '💾 Salvar Alterações';
  document.getElementById('form-title').textContent        = 'Editar Solicitação';
  document.getElementById('form-subtitle').textContent     = 'Altere as informações e clique em Salvar Alterações';
  document.getElementById('edit-mode-banner').style.display = 'flex';
  document.getElementById('form-alert').innerHTML          = '';

  showSection('nova-solicitacao');
}

function cancelarEdicao() {
  modoEdicao            = false;
  solicitacaoEditandoId = null;
  limparFormulario();
  document.getElementById('btn-enviar').innerHTML           = '📤 Enviar Solicitação';
  document.getElementById('form-title').textContent         = 'Nova Solicitação de Vaga';
  document.getElementById('form-subtitle').textContent      = 'Preencha as informações abaixo para solicitar uma vaga no Colégio Plenus';
  document.getElementById('edit-mode-banner').style.display = 'none';
  document.getElementById('form-alert').innerHTML           = '';
}

// ============================================================
//  ENVIO / ATUALIZAÇÃO DA SOLICITAÇÃO
// ============================================================
async function enviarSolicitacao() {
  const btn      = document.getElementById('btn-enviar');
  const alertDiv = document.getElementById('form-alert');
  alertDiv.innerHTML = '';

  const chipsTransf = getChipsText('chips-motivo-transferencia');
  const textoTransf = document.getElementById('motivo-transferencia').value.trim();
  const motivoTransferencia = [chipsTransf, textoTransf].filter(Boolean).join('\n');

  const chipsPlenus = getChipsText('chips-motivo-plenus');
  const textoPlenus = document.getElementById('motivo-plenus').value.trim();
  const motivoPlenus = [chipsPlenus, textoPlenus].filter(Boolean).join('\n');

  if (!motivoTransferencia)
    return setAlert(alertDiv, 'Selecione ao menos um motivo de transferência ou preencha o campo de informações adicionais.', 'error');
  if (!motivoPlenus)
    return setAlert(alertDiv, 'Selecione ao menos um motivo de escolha do Colégio Plenus ou preencha o campo de informações adicionais.', 'error');

  const alunoCards = document.querySelectorAll('.aluno-card');
  if (!alunoCards.length)
    return setAlert(alertDiv, 'Adicione pelo menos um aluno à solicitação.', 'error');

  const alunos = [];
  for (const card of alunoCards) {
    const cid     = card.id.replace('aluno-', '');
    const nome    = document.getElementById(`aluno-nome-${cid}`).value.trim();
    const segmento = document.getElementById(`aluno-segmento-${cid}`).value;
    const turma   = document.getElementById(`aluno-turma-${cid}`).value;
    const turno   = document.getElementById(`aluno-turno-${cid}`).value;
    if (!nome || !segmento || !turma || !turno)
      return setAlert(alertDiv, `Preencha todos os campos do Aluno ${cid}.`, 'error');
    alunos.push({ nome_aluno: nome, segmento, turma, turno });
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="loading"></span> Salvando...';

  const { data: { user } } = await cliente.auth.getUser();
  const temDesconto = document.getElementById('toggle-desconto').checked;
  const tipoPermuta = document.getElementById('tipo-permuta').value;
  const campos = {
    motivo_transferencia:       motivoTransferencia,
    motivo_escolha_plenus:      motivoPlenus,
    valor_mensalidade_anterior: parseMoeda(document.getElementById('valor-mensalidade').value),
    tem_desconto:               temDesconto,
    descricao_desconto:         temDesconto ? (() => { const c = getChipsText('chips-desconto'); const t = document.getElementById('descricao-desconto').value.trim(); return [c, t].filter(Boolean).join('\n') || null; })() : null,
    taxa_desconto_almejada:     parseFloat(document.getElementById('taxa-desconto').value) || null,
    tipo_permuta:               tipoPermuta,
    descricao_permuta:          tipoPermuta !== 'nao' ? (document.getElementById('descricao-permuta').value.trim() || null) : null
  };

  if (modoEdicao) {
    // ── MODO EDIÇÃO: UPDATE ──
    const { error: errUpd } = await cliente
      .from('interesse_vagas').update(campos).eq('id', solicitacaoEditandoId);
    if (errUpd) {
      btn.disabled = false; btn.innerHTML = '💾 Salvar Alterações';
      return setAlert(alertDiv, `Erro: ${errUpd.message}`, 'error');
    }
    // Recriar alunos: delete + insert
    await cliente.from('alunos').delete().eq('interesse_id', solicitacaoEditandoId);
    const { error: errA } = await cliente.from('alunos')
      .insert(alunos.map(a => ({ ...a, interesse_id: solicitacaoEditandoId })));
    btn.disabled = false; btn.innerHTML = '💾 Salvar Alterações';
    if (errA) return setAlert(alertDiv, `Erro ao salvar alunos: ${errA.message}`, 'error');
    await registrarLog('editar_solicitacao', 'interesse_vagas', solicitacaoEditandoId, `Solicitação editada (${alunos.length} aluno(s))`);
    await registrarHistorico(solicitacaoEditandoId, 'Solicitação editada pelo responsável', 'responsavel');
    setAlert(alertDiv, '✅ Solicitação atualizada com sucesso!', 'success');
    cancelarEdicao();
  } else {
    // ── NOVA SOLICITAÇÃO: INSERT ──
    const { data: interesse, error: errIns } = await cliente
      .from('interesse_vagas').insert({ usuario_id: user.id, ...campos }).select().single();
    if (errIns) {
      btn.disabled = false; btn.innerHTML = '📤 Enviar Solicitação';
      return setAlert(alertDiv, `Erro: ${errIns.message}`, 'error');
    }
    const { error: errA } = await cliente.from('alunos')
      .insert(alunos.map(a => ({ ...a, interesse_id: interesse.id })));
    btn.disabled = false; btn.innerHTML = '📤 Enviar Solicitação';
    if (errA) return setAlert(alertDiv, `Erro ao salvar alunos: ${errA.message}`, 'error');
    await registrarLog('criar_solicitacao', 'interesse_vagas', interesse.id, `Nova solicitação com ${alunos.length} aluno(s)`);
    await registrarHistorico(interesse.id, 'Solicitação enviada', 'responsavel');
    setAlert(alertDiv, '✅ Solicitação enviada com sucesso! Nossa equipe entrará em contato.', 'success');
    limparFormulario();
  }

  await carregarStats(user.id);
}

function limparFormulario() {
  ['motivo-transferencia','motivo-plenus','valor-mensalidade','taxa-desconto','descricao-desconto','descricao-permuta']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['chips-motivo-transferencia','chips-motivo-plenus','chips-desconto'].forEach(clearChips);
  document.getElementById('toggle-desconto').checked    = false;
  document.getElementById('desconto-detalhe').style.display = 'none';
  document.getElementById('tipo-permuta').value         = 'nao';
  document.getElementById('permuta-detalhe').style.display  = 'none';
  document.getElementById('alunos-list').innerHTML      = '';
  document.getElementById('alunos-empty').style.display = 'block';
  alunoCounter = 0;
}

// ============================================================
//  LISTA DE SOLICITAÇÕES
// ============================================================
async function carregarSolicitacoes() {
  const container = document.getElementById('solicitacoes-list');
  container.innerHTML = `<div class="empty-state"><span class="empty-icon">⏳</span><p>Carregando...</p></div>`;

  const { data: { user } } = await cliente.auth.getUser();
  const { data, error } = await cliente
    .from('interesse_vagas')
    .select('*, alunos(*), historico_solicitacoes(descricao, autor_tipo, created_at)')
    .eq('usuario_id', user.id).order('created_at', { ascending: false });

  if (error) { container.innerHTML = `<div class="alert alert-error">Erro: ${error.message}</div>`; return; }

  if (!data?.length) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📭</span>
        <p>Você ainda não fez nenhuma solicitação.</p>
        <button class="btn btn-primary" onclick="showSection('nova-solicitacao')">📝 Fazer Primeira Solicitação</button>
      </div>`;
    return;
  }

  container.innerHTML = data.map(s => {
    const data_fmt    = new Date(s.created_at).toLocaleDateString('pt-BR');
    const numAlunos   = s.alunos?.length || 0;
    const statusLabel = STATUS_LABEL[s.status] || s.status;
    const alunosNomes = s.alunos?.length
      ? s.alunos.map(a => `<strong>${a.nome_aluno}</strong> – ${SEGMENTO_LABEL[a.segmento] || a.segmento} / ${a.turma}`).join('<br>')
      : '–';
    const podeEditar = s.status === 'pendente';

    // Ressalva: aprovado mas com alunos não aprovados
    const alunos        = s.alunos || [];
    const totalAlunos   = alunos.length;
    const aprovados     = alunos.filter(a => (a.status_aluno || 'pendente') === 'aprovado').length;
    const reprovados    = alunos.filter(a => (a.status_aluno || 'pendente') === 'reprovado').length;
    const temRessalva   = s.status === 'aprovado' && totalAlunos > 0 && aprovados < totalAlunos;
    const ressalvaHtml  = temRessalva ? `
      <div style="margin-top:0.625rem;background:#fef3c7;border:1px solid #fde68a;border-left:3px solid #f59e0b;border-radius:0 0.5rem 0.5rem 0;padding:0.5rem 0.75rem;font-size:0.78rem;color:#92400e;line-height:1.5">
        ⚠️ <strong>Aprovado com ressalvas:</strong> ${aprovados} de ${totalAlunos} aluno${totalAlunos !== 1 ? 's' : ''} aprovado${aprovados !== 1 ? 's' : ''}${reprovados > 0 ? ` · ${reprovados} reprovado${reprovados !== 1 ? 's' : ''}` : ''}.
        Verifique os detalhes de cada aluno abaixo.
      </div>` : '';

    const historico = [...(s.historico_solicitacoes || [])]
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const historicoHtml = historico.length ? `
      <details style="margin-top:0.75rem">
        <summary style="font-size:0.775rem;font-weight:700;color:var(--gray-dark);cursor:pointer;list-style:none;display:flex;align-items:center;gap:0.4rem;user-select:none">
          📋 Histórico (${historico.length} entrada${historico.length !== 1 ? 's' : ''})
        </summary>
        <div style="margin-top:0.625rem;padding-left:0.5rem;border-left:2px solid var(--gray-light);display:flex;flex-direction:column;gap:0.625rem">
          ${historico.map(h => {
            const isColab = h.autor_tipo === 'colaborador';
            return `
            <div style="display:flex;gap:0.625rem;align-items:flex-start">
              <div style="width:28px;height:28px;border-radius:50%;background:${isColab ? '#fff7ed' : '#eff6ff'};border:2px solid ${isColab ? '#fed7aa' : '#bfdbfe'};display:flex;align-items:center;justify-content:center;font-size:0.7rem;flex-shrink:0;margin-top:1px">${isColab ? '🏫' : '👤'}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:0.8rem;font-weight:600;color:var(--navy-mid);line-height:1.45">${h.descricao}</div>
                <div style="font-size:0.7rem;color:var(--gray);margin-top:0.1rem">${new Date(h.created_at).toLocaleString('pt-BR')} · <span style="font-weight:600;color:${isColab ? '#ea580c' : '#2563eb'}">${isColab ? 'Equipe Plenus' : 'Você'}</span></div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </details>` : '';

    const badgeLabel = temRessalva ? 'Aprovado com ressalvas' : statusLabel;

    return `
      <div class="solicitacao-card">
        <div class="solicitacao-info" style="flex:1">
          <h3>🎒 ${numAlunos} aluno${numAlunos !== 1 ? 's' : ''} · ${data_fmt}</h3>
          <p style="margin-top:0.35rem; line-height:1.6">${alunosNomes}</p>
          ${ressalvaHtml}
          ${historicoHtml}
        </div>
        <div class="solicitacao-meta" style="display:flex;align-items:center;gap:0.5rem;flex-shrink:0;flex-wrap:wrap">
          <span class="status-badge status-${s.status}">${badgeLabel}</span>
          ${podeEditar ? `<button class="btn btn-secondary btn-sm" onclick="editarSolicitacao('${s.id}')">✏️ Editar</button>` : ''}
        </div>
      </div>`;
  }).join('');
}

// ============================================================
//  HELPERS
// ============================================================
function setAlert(el, msg, type) {
  el.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showToast(msg) {
  const isErro  = msg.startsWith('❌');
  const isAviso = msg.startsWith('⚠️');
  const icon    = isErro ? 'error' : isAviso ? 'warning' : 'success';
  Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  }).fire({ icon, title: msg });
}

// ============================================================
//  START
// ============================================================
init();
