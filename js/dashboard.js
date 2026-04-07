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
  pendente:    'Pendente',
  em_analise:  'Em análise',
  aprovado:    'Aprovada',
  reprovado:   'Reprovada',
  cancelado:   'Cancelada',
  matriculado: 'Confirmada'
};

let alunoCounter          = 0;
let modoEdicao            = false;
let solicitacaoEditandoId = null;
let _solicitacoesResp     = [];
let _dadosOriginaisEdicao = null;

// ============================================================
//  LOGGING
// ============================================================
async function registrarLog(acao, entidade, entidadeId, descricao) {
  try {
    const { data: { user } } = await cliente.auth.getUser();
    if (!user) return;
    const { data: perfil } = await cliente.from('usuarios').select('nome').eq('id', user.id).maybeSingle();
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
    .from('colaboradores').select('id').eq('id', data.user.id).eq('ativo', true).maybeSingle();
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
  const { data } = await cliente.from('usuarios').select('*').eq('id', user.id).maybeSingle();
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

  if (telefone && !validarTelefone(telefone)) {
    alertDiv.innerHTML = `<div class="alert alert-error">Telefone inválido. Use o formato (00) 00000-0000.</div>`;
    return;
  }

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

async function alterarSenha() {
  const btn        = document.getElementById('btn-alterar-senha');
  const alertDiv   = document.getElementById('senha-alert');
  const senhaAtual = document.getElementById('perfil-senha-atual').value;
  const novaSenha  = document.getElementById('perfil-nova-senha').value;
  const confirmar  = document.getElementById('perfil-confirmar-senha').value;
  alertDiv.innerHTML = '';

  if (!senhaAtual) { alertDiv.innerHTML = `<div class="alert alert-error">Informe a senha atual.</div>`; return; }
  if (!novaSenha)  { alertDiv.innerHTML = `<div class="alert alert-error">Informe a nova senha.</div>`; return; }
  if (novaSenha.length < 6) { alertDiv.innerHTML = `<div class="alert alert-error">A nova senha deve ter pelo menos 6 caracteres.</div>`; return; }
  if (novaSenha !== confirmar) { alertDiv.innerHTML = `<div class="alert alert-error">As senhas não coincidem.</div>`; return; }

  btn.disabled = true; btn.innerHTML = '<span class="loading"></span> Verificando...';

  const { data: { user } } = await cliente.auth.getUser();
  const { error: errLogin } = await cliente.auth.signInWithPassword({ email: user.email, password: senhaAtual });
  if (errLogin) {
    btn.disabled = false; btn.innerHTML = '🔒 Alterar Senha';
    alertDiv.innerHTML = `<div class="alert alert-error">Senha atual incorreta.</div>`;
    return;
  }

  btn.innerHTML = '<span class="loading"></span> Salvando...';
  const { error } = await cliente.auth.updateUser({ password: novaSenha });
  btn.disabled = false; btn.innerHTML = '🔒 Alterar Senha';

  if (error) { alertDiv.innerHTML = `<div class="alert alert-error">${error.message}</div>`; return; }

  document.getElementById('perfil-senha-atual').value    = '';
  document.getElementById('perfil-nova-senha').value     = '';
  document.getElementById('perfil-confirmar-senha').value = '';
  alertDiv.innerHTML = `<div class="alert alert-success">✅ Senha alterada com sucesso!</div>`;
  await registrarLog('alterar_senha', 'usuarios', user.id, 'Senha alterada pelo usuário');
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
    pendente:    { icon: '⏳', cor: '#92400e', bg: '#fef3c7', label: 'Pendente' },
    em_analise:  { icon: '🔍', cor: '#1e40af', bg: '#eff6ff', label: 'Em Análise' },
    aprovado:    { icon: '✅', cor: '#15803d', bg: '#f0fdf4', label: 'Aprovada' },
    reprovado:   { icon: '✕',  cor: '#b91c1c', bg: '#fef2f2', label: 'Reprovada' },
    cancelado:   { icon: '🚫', cor: '#7c3aed', bg: '#f5f3ff', label: 'Cancelada' },
    matriculado: { icon: '🎓', cor: '#0e7490', bg: '#ecfeff', label: 'Confirmada' }
  };

  const PROXIMOS = {
    pendente:    'Aguardando análise da equipe Plenus.',
    em_analise:  'Em análise — a equipe entrará em contato em breve.',
    aprovado:    'Entre em contato com a escola para efetivar a matrícula.',
    reprovado:   'Confira o histórico para entender o motivo.',
    cancelado:   'Solicitação cancelada.',
    matriculado: 'Matrícula confirmada! Aguarde o contato da escola.'
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

function toggleVerMais(btn) {
  const desc = btn.parentElement.querySelector('.historico-desc');
  if (!desc) return;
  const collapsed = desc.style.overflow === 'hidden';
  if (collapsed) {
    desc.style.maxHeight = '';
    desc.style.overflow  = '';
    btn.textContent = 'ver menos ▴';
  } else {
    desc.style.maxHeight = '3.9em';
    desc.style.overflow  = 'hidden';
    btn.textContent = 'ver mais ▾';
  }
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

// Restaura chips selecionados a partir do valor salvo e coloca o restante no textarea
function restoreChips(groupId, textoId, savedValue) {
  clearChips(groupId);
  const el = document.getElementById(textoId);
  if (!savedValue) { if (el) el.value = ''; return; }

  const chips     = Array.from(document.querySelectorAll(`#${groupId} [data-value]`));
  const chipVals  = new Set(chips.map(c => c.dataset.value));
  const partes    = savedValue.replace(/\n/g, '; ').split('; ').map(p => p.trim()).filter(Boolean);
  const naoChips  = [];

  for (const parte of partes) {
    const chip = chips.find(c => c.dataset.value === parte);
    if (chip) chip.classList.add('chip-active');
    else if (!chipVals.has(parte)) naoChips.push(parte);
  }
  if (el) el.value = naoChips.join('; ');
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
    .from('interesse_vagas').select('*, alunos(*)').eq('id', id).maybeSingle();
  if (error || !data) return showToast('Erro ao carregar solicitação.');

  modoEdicao            = true;
  solicitacaoEditandoId = id;
  _dadosOriginaisEdicao = data;

  // Preencher campos gerais
  restoreChips('chips-motivo-transferencia', 'motivo-transferencia', data.motivo_transferencia  || '');
  restoreChips('chips-motivo-plenus',        'motivo-plenus',        data.motivo_escolha_plenus || '');
  setMoeda(document.getElementById('valor-mensalidade'), data.valor_mensalidade_anterior);
  document.getElementById('taxa-desconto').value     = data.taxa_desconto_almejada || '';
  document.getElementById('toggle-desconto').checked = data.tem_desconto || false;
  toggleDesconto();
  restoreChips('chips-desconto', 'descricao-desconto', data.descricao_desconto || '');
  document.getElementById('tipo-permuta').value  = data.tipo_permuta    || 'nao';
  togglePermuta();
  document.getElementById('descricao-permuta').value = data.descricao_permuta || '';

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
  _dadosOriginaisEdicao = null;
  limparFormulario();
  document.getElementById('btn-enviar').innerHTML           = '📤 Enviar Solicitação';
  document.getElementById('form-title').textContent         = 'Nova Solicitação de Vaga';
  document.getElementById('form-subtitle').textContent      = 'Preencha as informações abaixo para solicitar uma vaga no Colégio Plenus';
  document.getElementById('edit-mode-banner').style.display = 'none';
  document.getElementById('form-alert').innerHTML           = '';
}

function _buildMsgEdicao(novosCampos, novosAlunos) {
  if (!_dadosOriginaisEdicao) return 'Solicitação editada pelo responsável.';

  const orig   = _dadosOriginaisEdicao;
  const linhas = [];

  const trunc = (s, max = 70) => {
    const str = (s || '').replace(/\n/g, ' ').trim();
    return str.length > max ? str.slice(0, max) + '…' : str || '–';
  };

  // Campos de texto longo
  const textCampos = [
    { campo: 'motivo_transferencia',  label: 'Motivo de transferência' },
    { campo: 'motivo_escolha_plenus', label: 'Motivo de escolha do Plenus' },
    { campo: 'descricao_desconto',    label: 'Descrição do desconto' },
    { campo: 'descricao_permuta',     label: 'Descrição da permuta' },
  ];
  for (const { campo, label } of textCampos) {
    const ant = (orig[campo] || '').trim();
    const nov = (novosCampos[campo] || '').trim();
    if (ant === nov) continue;
    if (!ant)      linhas.push(`${label}: adicionado "${trunc(nov)}"`);
    else if (!nov) linhas.push(`${label}: removido "${trunc(ant)}"`);
    else           linhas.push(`${label}: "${trunc(ant)}" → "${trunc(nov)}"`);
  }

  // Booleano
  const antDesc = orig.tem_desconto ?? false;
  const novDesc = novosCampos.tem_desconto ?? false;
  if (String(antDesc) !== String(novDesc))
    linhas.push(`Possui desconto atual: ${antDesc ? 'Sim' : 'Não'} → ${novDesc ? 'Sim' : 'Não'}`);

  // Numéricos
  const fmtMoeda = v => v != null ? `R$ ${Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '–';
  if (String(orig.valor_mensalidade_anterior ?? '') !== String(novosCampos.valor_mensalidade_anterior ?? ''))
    linhas.push(`Mensalidade atual: ${fmtMoeda(orig.valor_mensalidade_anterior)} → ${fmtMoeda(novosCampos.valor_mensalidade_anterior)}`);

  if (String(orig.taxa_desconto_almejada ?? '') !== String(novosCampos.taxa_desconto_almejada ?? ''))
    linhas.push(`Desconto almejado: ${orig.taxa_desconto_almejada != null ? orig.taxa_desconto_almejada + '%' : '–'} → ${novosCampos.taxa_desconto_almejada != null ? novosCampos.taxa_desconto_almejada + '%' : '–'}`);

  // Permuta
  const PERM_LBL = { nao: 'Não', servico: 'Serviço', produto: 'Produto', outro: 'Outro' };
  if (String(orig.tipo_permuta ?? '') !== String(novosCampos.tipo_permuta ?? ''))
    linhas.push(`Tipo de permuta: ${PERM_LBL[orig.tipo_permuta] || orig.tipo_permuta || '–'} → ${PERM_LBL[novosCampos.tipo_permuta] || novosCampos.tipo_permuta || '–'}`);

  // Alunos: comparar por nome (lowercase) para detectar add / remove / mudança
  const TURNO_LBL_E = { manha: 'Manhã', tarde: 'Tarde', integral: 'Integral' };
  const SEG_LBL_E   = { educacao_infantil: 'Ed. Infantil', fundamental1: 'Fund. 1', fundamental2: 'Fund. 2', ensino_medio: 'Ens. Médio' };
  const fmtAluno    = a => `${SEG_LBL_E[a.segmento] || a.segmento} · ${a.turma} · ${TURNO_LBL_E[a.turno] || a.turno}`;

  const origByNome = Object.fromEntries((orig.alunos || []).map(a => [(a.nome_aluno || '').toLowerCase(), a]));
  const novByNome  = Object.fromEntries(novosAlunos.map(a => [(a.nome_aluno || '').toLowerCase(), a]));

  for (const a of novosAlunos) {
    const key = (a.nome_aluno || '').toLowerCase();
    if (!origByNome[key]) {
      linhas.push(`Aluno adicionado: ${a.nome_aluno} (${fmtAluno(a)})`);
    } else {
      const o = origByNome[key];
      const diffs = [];
      if (o.segmento !== a.segmento) diffs.push(`segmento: ${SEG_LBL_E[o.segmento] || o.segmento} → ${SEG_LBL_E[a.segmento] || a.segmento}`);
      if (o.turma    !== a.turma)    diffs.push(`turma: ${o.turma} → ${a.turma}`);
      if (o.turno    !== a.turno)    diffs.push(`turno: ${TURNO_LBL_E[o.turno] || o.turno} → ${TURNO_LBL_E[a.turno] || a.turno}`);
      if (diffs.length) linhas.push(`Aluno alterado: ${a.nome_aluno} (${diffs.join(', ')})`);
    }
  }
  for (const a of (orig.alunos || [])) {
    if (!novByNome[(a.nome_aluno || '').toLowerCase()])
      linhas.push(`Aluno removido: ${a.nome_aluno} (${fmtAluno(a)})`);
  }

  if (!linhas.length) return 'Solicitação editada pelo responsável (nenhuma alteração detectada).';
  return 'Solicitação editada pelo responsável.\n' + linhas.map(l => `• ${l}`).join('\n');
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
  const motivoTransferencia = [chipsTransf, textoTransf].filter(Boolean).join('; ');

  const chipsPlenus = getChipsText('chips-motivo-plenus');
  const textoPlenus = document.getElementById('motivo-plenus').value.trim();
  const motivoPlenus = [chipsPlenus, textoPlenus].filter(Boolean).join('; ');

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
    descricao_desconto:         temDesconto ? (() => { const c = getChipsText('chips-desconto'); const t = document.getElementById('descricao-desconto').value.trim(); return [c, t].filter(Boolean).join('; ') || null; })() : null,
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
    await registrarHistorico(solicitacaoEditandoId, _buildMsgEdicao(campos, alunos), 'responsavel');
    _dadosOriginaisEdicao = null;
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
    .select('*, alunos(*), historico_solicitacoes(descricao, autor_tipo, created_at), desconto_concedido, permuta_aceita, condicoes_permuta_aceita')
    .eq('usuario_id', user.id).order('created_at', { ascending: false });

  if (error) { container.innerHTML = `<div class="alert alert-error">Erro: ${error.message}</div>`; return; }
  _solicitacoesResp = data || [];

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
        ⚠️ <strong>Aprovada com ressalvas:</strong> ${aprovados} de ${totalAlunos} aluno${totalAlunos !== 1 ? 's' : ''} aprovado${aprovados !== 1 ? 's' : ''}${reprovados > 0 ? ` · ${reprovados} reprovado${reprovados !== 1 ? 's' : ''}` : ''}.
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
                ${(() => { const d = escapeHtmlDash(h.descricao||''); const long = (h.descricao||'').length>120||(h.descricao||'').includes('\n'); return long ? `<div class="historico-desc" style="font-size:0.8rem;line-height:1.45;max-height:3.9em;overflow:hidden">${d}</div><button class="ver-mais-btn" onclick="toggleVerMais(this)">ver mais ▾</button>` : `<div class="historico-desc" style="font-size:0.8rem;line-height:1.45">${d}</div>`; })()}
                <div style="font-size:0.7rem;color:var(--gray);margin-top:0.1rem">${new Date(h.created_at).toLocaleString('pt-BR')} · <span style="font-weight:600;color:${isColab ? '#ea580c' : '#2563eb'}">${isColab ? 'Equipe Plenus' : 'Você'}</span></div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </details>` : '';

    const badgeLabel = temRessalva ? 'Aprovada com ressalvas' : statusLabel;

    // Decisão financeira da escola (somente leitura para o responsável)
    const temDecisaoFin = s.desconto_concedido || s.permuta_aceita !== null && s.permuta_aceita !== undefined;
    const decisaoFinHtml = temDecisaoFin ? `
      <div style="margin-top:0.75rem;background:#f0fdf4;border:1px solid #bbf7d0;border-left:3px solid #22c55e;border-radius:0 0.5rem 0.5rem 0;padding:0.625rem 0.875rem">
        <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#15803d;margin-bottom:0.4rem">✅ Decisão da Escola</div>
        <div style="display:flex;flex-wrap:wrap;gap:1rem">
          ${s.desconto_concedido ? `<div style="font-size:0.82rem"><span style="color:#64748b">Desconto concedido:</span> <strong style="color:#15803d">${escapeHtmlDash(s.desconto_concedido)}</strong></div>` : ''}
          ${s.permuta_aceita !== null && s.permuta_aceita !== undefined
            ? `<div style="font-size:0.82rem"><span style="color:#64748b">Permuta:</span> <strong style="color:${s.permuta_aceita ? '#15803d' : '#dc2626'}">${s.permuta_aceita ? 'Aceita' : 'Não aceita'}</strong>${s.permuta_aceita && s.condicoes_permuta_aceita ? ` — ${escapeHtmlDash(s.condicoes_permuta_aceita)}` : ''}</div>`
            : ''}
        </div>
      </div>` : '';

    const STATUS_BORDER = { pendente:'var(--amber)', em_analise:'var(--blue)', aprovado:'var(--green)', reprovado:'var(--red)', cancelado:'#7c3aed', matriculado:'#0e7490' };
    const leftColor = STATUS_BORDER[s.status] || 'var(--gray-light)';

    return `
      <div class="solicitacao-card" style="border-left:4px solid ${leftColor}">
        <div class="solicitacao-info" style="flex:1">
          <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.4rem">
            <span class="status-badge status-${s.status}">${badgeLabel}</span>
            <span style="font-size:0.75rem;color:var(--gray)">📅 ${data_fmt}</span>
          </div>
          <h3 style="font-size:0.9rem;margin:0 0 0.3rem">🎒 ${numAlunos} aluno${numAlunos !== 1 ? 's' : ''}</h3>
          <p style="margin:0;line-height:1.6;color:var(--gray-dark)">${alunosNomes}</p>
          ${ressalvaHtml}
          ${decisaoFinHtml}
          ${historicoHtml}
        </div>
        <div class="solicitacao-meta" style="display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem;flex-shrink:0">
          <button class="btn btn-secondary btn-sm" onclick="abrirDetalheResp('${s.id}')">🔍 Ver detalhes</button>
          ${podeEditar ? `<button class="btn btn-secondary btn-sm" onclick="editarSolicitacao('${s.id}')">✏️ Editar</button>` : ''}
        </div>
      </div>`;
  }).join('');
}

// ============================================================
//  MODAL DETALHE (RESPONSÁVEL)
// ============================================================
function abrirDetalheResp(id) {
  const s = _solicitacoesResp.find(x => x.id === id);
  if (!s) return;

  const alunos  = s.alunos || [];
  const dataFmt = new Date(s.created_at).toLocaleString('pt-BR');

  const TURNO_LBL   = { manha: '☀️ Manhã', tarde: '🌤️ Tarde', tanto_faz: '🔄 Tanto faz' };
  const PERMUTA_LBL = { nao: 'Não possui', parcial: 'Permuta parcial', completa: 'Permuta completa' };
  const ST_ALUNO    = {
    pendente:    { bg: '#fef3c7', color: '#92400e', border: '#fde68a', label: 'Pendente'   },
    aprovado:    { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0', label: 'Aprovado'   },
    reprovado:   { bg: '#fee2e2', color: '#dc2626', border: '#fecaca', label: 'Reprovado'  },
    matriculado: { bg: '#ecfeff', color: '#0e7490', border: '#a5f3fc', label: 'Matriculado'}
  };
  const totalAlunos = alunos.length;
  const aprov       = alunos.filter(a => a.status_aluno === 'aprovado').length;
  const matr        = alunos.filter(a => a.status_aluno === 'matriculado').length;
  const temRessalva = s.status === 'aprovado' && totalAlunos > 0 && (aprov + matr) < totalAlunos;
  const badgeLabel  = temRessalva ? 'Aprovada com ressalvas' : (STATUS_LABEL[s.status] || s.status);

  // Alunos
  const alunosHtml = alunos.length ? alunos.map(a => {
    const st = ST_ALUNO[a.status_aluno] || ST_ALUNO['pendente'];
    return `
      <div style="display:flex;align-items:center;gap:0.625rem;padding:0.625rem 0.875rem;border:1.5px solid var(--gray-light);border-left:4px solid ${st.border};border-radius:var(--radius-sm);background:white">
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:0.875rem;color:var(--navy-mid)">${escapeHtmlDash(a.nome_aluno)}</div>
          <div style="font-size:0.75rem;color:var(--gray-dark);margin-top:0.1rem">${SEGMENTO_LABEL[a.segmento] || a.segmento} · ${escapeHtmlDash(a.turma)} · ${TURNO_LBL[a.turno] || a.turno}</div>
        </div>
        <span style="font-size:0.67rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;padding:0.25rem 0.625rem;border-radius:9999px;background:${st.bg};color:${st.color};border:1px solid ${st.border};white-space:nowrap">${st.label}</span>
      </div>`;
  }).join('') : '<p style="font-size:0.85rem;color:var(--gray)">Nenhum aluno cadastrado.</p>';

  // Financeiro informado pelo responsável
  const finHtml = `
    <div class="fin-section">
      <div class="fin-section-header resp-header">📋 Informado por você</div>
      <div class="fin-section-grid">
        <div class="fin-section-item">
          <div class="fin-section-label">Mensalidade Atual</div>
          <div class="fin-section-value"><span style="font-size:1rem;font-weight:800;color:var(--navy-mid)">${s.valor_mensalidade_anterior ? Number(s.valor_mensalidade_anterior).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) : '–'}</span></div>
        </div>
        <div class="fin-section-item">
          <div class="fin-section-label">Desconto Almejado</div>
          <div class="fin-section-value"><span style="font-size:1rem;font-weight:800;color:var(--navy-mid)">${s.taxa_desconto_almejada ? s.taxa_desconto_almejada + '%' : '–'}</span></div>
        </div>
        <div class="fin-section-item">
          <div class="fin-section-label">Possui Desconto Atual?</div>
          <div class="fin-section-value">${s.tem_desconto ? '✅ Sim' : '❌ Não'}</div>
          ${s.tem_desconto && s.descricao_desconto ? `<div style="font-size:0.78rem;color:var(--gray-dark);margin-top:0.3rem">${escapeHtmlDash(s.descricao_desconto)}</div>` : ''}
        </div>
        <div class="fin-section-item">
          <div class="fin-section-label">Permuta</div>
          <div class="fin-section-value">${PERMUTA_LBL[s.tipo_permuta] || '–'}</div>
          ${s.tipo_permuta !== 'nao' && s.descricao_permuta ? `<div style="font-size:0.78rem;color:var(--gray-dark);margin-top:0.3rem">${escapeHtmlDash(s.descricao_permuta)}</div>` : ''}
        </div>
      </div>
    </div>`;

  // Decisão da escola
  const temDecisao = s.desconto_concedido || (s.permuta_aceita !== null && s.permuta_aceita !== undefined);
  const decisaoHtml = temDecisao ? `
    <div class="fin-section">
      <div class="fin-section-header escola-header">🏫 Decisão da Escola</div>
      <div class="fin-section-grid">
        ${s.desconto_concedido ? `
        <div class="fin-section-item">
          <div class="fin-section-label">Desconto Concedido</div>
          <div class="fin-section-value"><span style="font-weight:700;color:#15803d">${escapeHtmlDash(s.desconto_concedido)}</span></div>
        </div>` : ''}
        ${s.permuta_aceita !== null && s.permuta_aceita !== undefined ? `
        <div class="fin-section-item">
          <div class="fin-section-label">Permuta</div>
          <div class="fin-section-value"><span style="font-weight:700;color:${s.permuta_aceita ? '#15803d' : '#dc2626'}">${s.permuta_aceita ? '✅ Aceita' : '❌ Não aceita'}</span></div>
          ${s.permuta_aceita && s.condicoes_permuta_aceita ? `<div style="font-size:0.78rem;color:var(--gray-dark);margin-top:0.3rem">${escapeHtmlDash(s.condicoes_permuta_aceita)}</div>` : ''}
        </div>` : ''}
      </div>
    </div>` : '';

  document.getElementById('resp-det-body').innerHTML = `
    <!-- Header -->
    <div class="${'modal-head-' + s.status}" style="padding:1rem 1.25rem;border-bottom:1px solid var(--gray-light);margin:-1.375rem -1.5rem 1.25rem">
      <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.3rem">
        <span class="status-badge status-${s.status}">${badgeLabel}</span>
        <span style="font-size:0.75rem;color:var(--gray)">📅 ${dataFmt}</span>
      </div>
    </div>

    ${temRessalva ? `
    <div style="background:#fef3c7;border:1px solid #fde68a;border-left:3px solid #f59e0b;border-radius:0 var(--radius-sm) var(--radius-sm) 0;padding:0.5rem 0.75rem;font-size:0.8rem;color:#92400e;margin-bottom:1rem">
      ⚠️ <strong>Aprovada com ressalvas:</strong> ${aprov} de ${totalAlunos} aluno${totalAlunos !== 1 ? 's' : ''} aprovado${aprov !== 1 ? 's' : ''}.
    </div>` : ''}

    <!-- Alunos -->
    <div style="margin-bottom:1.25rem">
      <div style="font-size:0.67rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--gray);margin-bottom:0.625rem">🎒 Alunos</div>
      <div style="display:flex;flex-direction:column;gap:0.5rem">${alunosHtml}</div>
    </div>

    <!-- Motivos -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.875rem;margin-bottom:1.25rem">
      <div class="detalhe-section" style="margin:0">
        <div class="detalhe-section-title">📝 Motivo da Transferência</div>
        <div class="detalhe-section-body">
          <p style="font-size:0.855rem;color:var(--navy-mid);line-height:1.65;margin:0">${escapeHtmlDash(s.motivo_transferencia || '–')}</p>
        </div>
      </div>
      <div class="detalhe-section" style="margin:0">
        <div class="detalhe-section-title">⭐ Por que escolheu o Colégio Plenus</div>
        <div class="detalhe-section-body">
          <p style="font-size:0.855rem;color:var(--navy-mid);line-height:1.65;margin:0">${escapeHtmlDash(s.motivo_escolha_plenus || '–')}</p>
        </div>
      </div>
    </div>

    <!-- Financeiro -->
    <div style="display:flex;flex-direction:column;gap:0.875rem">
      ${finHtml}
      ${decisaoHtml}
    </div>`;

  document.getElementById('resp-detalhe-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function fecharDetalheResp() {
  document.getElementById('resp-detalhe-overlay').classList.remove('active');
  document.body.style.overflow = '';
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
