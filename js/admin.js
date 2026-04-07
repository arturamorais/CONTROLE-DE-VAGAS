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
  educacao_infantil: 'Ed. Infantil',
  fundamental1:      'Fund. 1',
  fundamental2:      'Fund. 2',
  ensino_medio:      'Ensino Médio'
};

const TURNO_LABEL = {
  manha:     '☀️ Manhã',
  tarde:     '🌤️ Tarde',
  tanto_faz: '🔄 Tanto faz'
};

const PERMUTA_LABEL = {
  nao:      'Não possui',
  parcial:  'Permuta parcial',
  completa: 'Permuta completa'
};

const STATUS_LABEL = {
  pendente:    'Pendente',
  em_analise:  'Em Análise',
  aprovado:    'Aprovada',
  reprovado:   'Reprovada',
  cancelado:   'Cancelada',
  matriculado: 'Confirmada'
};

const CARGO_LABEL = {
  master:       'Master',
  admin:        'Administrador',
  colaborador:  'Colaborador'
};

// Permissões por cargo
const PERMISSOES = {
  master:      ['overview','solicitacoes','enturmar','cadastros','relatorios','logs','dados','colaboradores','perfil'],
  admin:       ['overview','solicitacoes','enturmar','cadastros','relatorios','colaboradores','perfil'],
  colaborador: ['overview','solicitacoes','enturmar','perfil']
};

const GUIAS = {
  pendente: {
    titulo:    '📋 Como Avaliar esta Solicitação',
    subtitulo: 'Siga as etapas antes de avançar para Em Análise',
    etapas: [
      { icon: '👤', titulo: 'Verifique os dados do responsável',    desc: 'Confirme nome, telefone e e-mail. Certifique-se de que o contato está correto e acessível.' },
      { icon: '📝', titulo: 'Analise o motivo da transferência',    desc: 'Compreenda por que o responsável está saindo da escola atual. Avalie se há razões pedagógicas, financeiras ou estruturais.' },
      { icon: '⭐', titulo: 'Avalie o motivo de escolha do Plenus', desc: 'Identifique as expectativas do responsável. Verifique se estão alinhadas com a proposta pedagógica do colégio.' },
      { icon: '💰', titulo: 'Analise a situação financeira',        desc: 'Verifique o valor da mensalidade atual, o desconto almejado e a possibilidade de permuta. Avalie a viabilidade.' },
      { icon: '🎒', titulo: 'Confira os dados dos alunos',         desc: 'Verifique segmento, turma e turno solicitados. Consulte a disponibilidade de vagas antes de avançar.' },
      { icon: '➡️', titulo: 'Próximo passo',                       desc: 'Se tudo estiver adequado, mova para Em Análise e entre em contato com o responsável para dar continuidade.' }
    ]
  },
  em_analise: {
    titulo:    '🔍 Como Prosseguir com a Análise',
    subtitulo: 'Etapas para concluir a avaliação e tomar uma decisão',
    etapas: [
      { icon: '📞', titulo: 'Entre em contato com o responsável',   desc: 'Ligue ou envie mensagem confirmando o recebimento e manifestando interesse. Demonstre atenção e cuidado.' },
      { icon: '🏫', titulo: 'Verifique a disponibilidade de vagas', desc: 'Confirme com a coordenação se há vagas no segmento, turma e turno solicitados pelo responsável.' },
      { icon: '💬', titulo: 'Negocie o desconto almejado',          desc: 'Avalie com a coordenação financeira a viabilidade do desconto solicitado. Formalize qualquer acordo.' },
      { icon: '🤝', titulo: 'Avalie a permuta (se houver)',         desc: 'Se o responsável ofereceu permuta, avalie se o serviço atende às necessidades do colégio antes de aceitar.' },
      { icon: '✅', titulo: 'Tome a decisão final',                 desc: 'Com base em todas as informações, aprove ou reprove. Registre sempre uma observação no histórico explicando a decisão.' }
    ]
  },
  aprovado: {
    titulo:    '🎓 Próximos Passos — Efetivação de Matrícula',
    subtitulo: 'O aluno foi aprovado. Conduza o processo de matrícula',
    etapas: [
      { icon: '📞', titulo: 'Entre em contato imediatamente',     desc: 'Parabenize o responsável pela aprovação e informe os próximos passos. Demonstre entusiasmo com a chegada ao Colégio Plenus.' },
      { icon: '📄', titulo: 'Solicite a documentação necessária', desc: 'RG e CPF do responsável, certidão de nascimento do aluno, histórico escolar, boletim recente e comprovante de residência.' },
      { icon: '💳', titulo: 'Apresente as condições financeiras', desc: 'Informe o valor da mensalidade final, descontos acordados, forma de pagamento e datas de vencimento.' },
      { icon: '📅', titulo: 'Agende a efetivação da matrícula',   desc: 'Marque data e horário para assinatura do contrato, entrega dos documentos e visita ao colégio se necessário.' },
      { icon: '🏫', titulo: 'Prepare a recepção do aluno',        desc: 'Comunique a coordenação pedagógica da turma sobre o novo aluno. Organize a integração para o primeiro dia.' }
    ]
  }
};

const FRASES_STATUS = {
  aprovado:    'Aprovada. O aluno(a) será dirigido(a) para efetivação de matrícula.',
  reprovado:   'Reprovado. Infelizmente a solicitação não pôde ser atendida no momento. Agradecemos o interesse no Colégio Plenus e ficamos à disposição para futuras oportunidades.',
  em_analise:  'Solicitação em análise pela equipe pedagógica. Em breve entraremos em contato para dar continuidade ao processo de seleção.',
  pendente:    'Solicitação recebida e registrada. Aguardando início da análise pela equipe do Colégio Plenus.',
  cancelado:   'Solicitação cancelada. A vaga aprovada foi cancelada pela equipe do Colégio Plenus.',
  matriculado: 'Matrícula confirmada! O(s) aluno(s) foi(ram) matriculado(s) e alocado(s) na(s) turma(s) conforme informado. Ressaltamos que, por necessidade de organização pedagógica, a turma poderá ser ajustada pela coordenação. Em qualquer alteração, o responsável será prontamente comunicado.'
};

let todasSolicitacoes  = [];
let solicitacaoAtualId = null;
let obsEditandoId      = null;
let cargoAtual         = null;

// ============================================================
//  LOGGING
// ============================================================
async function registrarLog(acao, entidade, entidadeId, descricao) {
  try {
    const { data: { user } } = await cliente.auth.getUser();
    if (!user) return;
    const { data: col } = await cliente.from('colaboradores').select('nome').eq('id', user.id).single();
    await cliente.from('logs').insert({
      usuario_id:   user.id,
      nome_usuario: col?.nome || user.email || 'Colaborador',
      tipo_usuario: 'colaborador',
      acao, entidade,
      entidade_id:  entidadeId ? String(entidadeId) : null,
      descricao
    });
  } catch { /* logs não devem quebrar o fluxo */ }
}

// ============================================================
//  INICIALIZAÇÃO
// ============================================================
async function init() {
  const { data: { user } } = await cliente.auth.getUser();
  if (!user) { window.location.href = 'index.html'; return; }

  const { data: colab } = await cliente
    .from('colaboradores')
    .select('nome, cargo, ativo')
    .eq('id', user.id)
    .single();

  if (!colab || !colab.ativo) {
    window.location.href = 'inicio.html';
    return;
  }

  cargoAtual = colab.cargo;
  const cargo = CARGO_LABEL[colab.cargo] || colab.cargo;
  document.getElementById('sidebar-nome').textContent    = colab.nome;
  document.getElementById('sidebar-email').textContent   = user.email;
  document.getElementById('sidebar-cargo').textContent   = cargo;
  document.getElementById('profile-nome-display').textContent  = colab.nome;
  document.getElementById('profile-email-display').textContent = user.email;
  document.getElementById('profile-cargo-display').textContent = cargo;
  document.getElementById('perfil-nome').value           = colab.nome;

  // Carregar telefone do perfil
  const { data: uData } = await cliente.from('usuarios').select('telefone').eq('id', user.id).maybeSingle();
  if (uData?.telefone) document.getElementById('perfil-telefone').value = uData.telefone;

  // Revelar itens do nav conforme permissões do cargo
  const permitido = PERMISSOES[colab.cargo] || PERMISSOES['colaborador'];
  ['cadastros','relatorios','logs','dados','colaboradores'].forEach(sec => {
    const el = document.getElementById('nav-' + sec);
    if (el) el.style.display = permitido.includes(sec) ? '' : 'none';
  });

  // Opção Master no modal de adicionar colaborador — só visível para master
  const optMaster = document.getElementById('colab-cargo-master');
  if (optMaster) optMaster.style.display = colab.cargo === 'master' ? '' : 'none';

  await carregarStats();
  await carregarUltimasSolicitacoes();
  verificarNotificacoesPendentes();
}

// ============================================================
//  AUTH
// ============================================================
async function logout() {
  await registrarLog('logout', 'sessao', null, 'Colaborador saiu do sistema');
  await cliente.auth.signOut();
  window.location.href = 'index.html';
}

// ============================================================
//  GERENCIAR DADOS (exclusão)
// ============================================================
let todasSolicitacoesDados = [];
let selecionadosDados      = new Set();

async function carregarDados() {
  const container = document.getElementById('dados-lista');
  container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">⏳</span><p>Carregando...</p></div>`;
  selecionadosDados.clear();
  atualizarBtnExcluir();

  const { data: solicitacoes } = await cliente
    .from('interesse_vagas')
    .select('id, status, created_at, usuario_id, alunos(nome_aluno)')
    .order('created_at', { ascending: false });

  const ids = [...new Set((solicitacoes || []).map(s => s.usuario_id))];
  const { data: perfis } = ids.length
    ? await cliente.from('usuarios').select('id, nome, email').in('id', ids)
    : { data: [] };
  const pm = Object.fromEntries((perfis || []).map(p => [p.id, p]));

  todasSolicitacoesDados = (solicitacoes || []).map(s => ({
    ...s, responsavel: pm[s.usuario_id] || {}
  }));

  filtrarDados();
}

function filtrarDados() {
  const busca = document.getElementById('dados-busca').value.toLowerCase().trim();
  const lista = busca
    ? todasSolicitacoesDados.filter(s => {
        const r = s.responsavel;
        return [r.nome, r.email, ...(s.alunos || []).map(a => a.nome_aluno)]
          .join(' ').toLowerCase().includes(busca);
      })
    : todasSolicitacoesDados;

  document.getElementById('dados-count').textContent =
    `${lista.length} solicitaç${lista.length !== 1 ? 'ões' : 'ão'}`;

  renderDados(lista);
}

function renderDados(lista) {
  const container = document.getElementById('dados-lista');
  if (!lista.length) {
    container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">📭</span><p>Nenhuma solicitação encontrada.</p></div>`;
    return;
  }

  container.innerHTML = lista.map(s => {
    const r       = s.responsavel;
    const alunos  = (s.alunos || []).map(a => a.nome_aluno).join(', ') || '–';
    const data    = new Date(s.created_at).toLocaleDateString('pt-BR');
    const checked = selecionadosDados.has(s.id) ? 'checked' : '';
    return `
      <div style="display:flex;align-items:center;gap:0.875rem;padding:0.75rem 0;border-bottom:1px solid var(--gray-light)">
        <input type="checkbox" ${checked} onchange="toggleSelecionado('${s.id}', this.checked)"
          style="width:16px;height:16px;cursor:pointer;accent-color:var(--orange)">
        <div style="flex:1;min-width:0">
          <div style="font-size:0.85rem;font-weight:600">${escapeHtml(r.nome || '–')}</div>
          <div style="font-size:0.775rem;color:var(--gray-dark)">${escapeHtml(alunos)}</div>
          <div style="font-size:0.73rem;color:var(--gray)">${data} · ${escapeHtml(r.email || '–')}</div>
        </div>
        <span class="status-badge status-${s.status}" style="font-size:0.72rem;flex-shrink:0">${STATUS_LABEL[s.status]}</span>
        <button class="btn btn-danger btn-sm" style="flex-shrink:0" onclick="excluirSolicitacao('${s.id}')">🗑️</button>
      </div>`;
  }).join('');
}

function toggleSelecionado(id, checked) {
  if (checked) selecionadosDados.add(id);
  else selecionadosDados.delete(id);
  atualizarBtnExcluir();
}

function atualizarBtnExcluir() {
  const btn = document.getElementById('btn-excluir-selecionados');
  if (!btn) return;
  const n = selecionadosDados.size;
  btn.style.display = n > 0 ? '' : 'none';
  btn.textContent = `🗑️ Excluir ${n} selecionado${n !== 1 ? 's' : ''}`;
}

async function excluirSolicitacao(id) {
  const sol = todasSolicitacoesDados.find(s => s.id === id);
  const nome = sol?.responsavel?.nome || 'esta solicitação';

  const ok = await Swal.fire({
    title: 'Excluir solicitação?',
    html: `<span style="font-size:0.875rem">Todos os dados de <strong>${escapeHtml(nome)}</strong> serão removidos permanentemente.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444'
  });
  if (!ok.isConfirmed) return;

  const { error } = await _deletarSolicitacao(id);
  if (error) {
    Swal.fire({ title: 'Erro ao excluir', text: error.message, icon: 'error', confirmButtonColor: '#ef4444' });
    return;
  }
  todasSolicitacoesDados = todasSolicitacoesDados.filter(s => s.id !== id);
  selecionadosDados.delete(id);
  atualizarBtnExcluir();
  filtrarDados();
  showToast('✅ Solicitação excluída.');
}

async function excluirSelecionados() {
  const n = selecionadosDados.size;
  if (!n) return;

  const ok = await Swal.fire({
    title: `Excluir ${n} solicitaç${n !== 1 ? 'ões' : 'ão'}?`,
    html: `<span style="font-size:0.875rem">Esta ação é <strong>irreversível</strong>.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir tudo',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444'
  });
  if (!ok.isConfirmed) return;

  const idsParaDeletar = [...selecionadosDados];
  const falhas = [];
  for (const id of idsParaDeletar) {
    const { error } = await _deletarSolicitacao(id);
    if (error) falhas.push(id);
  }

  const excluidos = idsParaDeletar.filter(id => !falhas.includes(id));
  todasSolicitacoesDados = todasSolicitacoesDados.filter(s => !excluidos.includes(s.id));
  excluidos.forEach(id => selecionadosDados.delete(id));
  atualizarBtnExcluir();
  filtrarDados();

  if (falhas.length) {
    Swal.fire({ title: 'Atenção', text: `${excluidos.length} excluído(s), ${falhas.length} não puderam ser removidos (verifique as permissões).`, icon: 'warning', confirmButtonColor: '#ef4444' });
  } else {
    showToast(`✅ ${n} solicitaç${n !== 1 ? 'ões excluídas' : 'ão excluída'}.`);
  }
}

async function _deletarSolicitacao(id) {
  // Busca ids dos alunos para deletar alocações primeiro
  const { data: alunos } = await cliente.from('alunos').select('id').eq('interesse_id', id);
  const alunoIds = (alunos || []).map(a => a.id);
  if (alunoIds.length) {
    const { error: eAloc } = await cliente.from('alocacoes').delete().in('aluno_id', alunoIds);
    if (eAloc) return { error: eAloc };
  }
  const { error: eHist } = await cliente.from('historico_solicitacoes').delete().eq('interesse_id', id);
  if (eHist) return { error: eHist };
  const { error: eAlun } = await cliente.from('alunos').delete().eq('interesse_id', id);
  if (eAlun) return { error: eAlun };
  const { error: eInt } = await cliente.from('interesse_vagas').delete().eq('id', id);
  if (eInt) return { error: eInt };
  return { error: null };
}

async function limparLogs() {
  const ok = await Swal.fire({
    title: 'Limpar todos os logs?',
    html: `<span style="font-size:0.875rem">Todo o histórico de atividade será removido. Esta ação é <strong>irreversível</strong>.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, limpar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444'
  });
  if (!ok.isConfirmed) return;

  const { error } = await cliente.from('logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) { showToast('❌ Erro: ' + error.message); return; }
  showToast('✅ Logs limpos.');
}

async function limparHistorico() {
  const ok = await Swal.fire({
    title: 'Limpar todo o histórico?',
    html: `<span style="font-size:0.875rem">Todas as notas e registros de status de todas as solicitações serão removidos. <strong>Irreversível</strong>.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, limpar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444'
  });
  if (!ok.isConfirmed) return;

  const { error } = await cliente.from('historico_solicitacoes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) { showToast('❌ Erro: ' + error.message); return; }
  showToast('✅ Histórico limpo.');
}

// ============================================================
//  NOTIFICAÇÃO DE PENDENTES
// ============================================================
async function verificarNotificacoesPendentes() {
  const { data } = await cliente
    .from('interesse_vagas')
    .select('status')
    .in('status', ['pendente', 'em_analise']);

  if (!data || data.length === 0) return;

  const pendentes = data.filter(d => d.status === 'pendente').length;
  const analise   = data.filter(d => d.status === 'em_analise').length;

  let partes = [];
  if (pendentes > 0) partes.push(`<strong>${pendentes}</strong> pendente${pendentes !== 1 ? 's' : ''}`);
  if (analise   > 0) partes.push(`<strong>${analise}</strong> em análise`);

  document.getElementById('notif-modal-texto').innerHTML =
    `Existem ${partes.join(' e ')} aguardando sua atenção.`;
  document.getElementById('notif-modal-overlay').classList.add('active');
}

function fecharNotifModal() {
  document.getElementById('notif-modal-overlay').classList.remove('active');
}

// ============================================================
//  COLABORADORES
// ============================================================
async function carregarColaboradores() {
  const container = document.getElementById('colaboradores-lista');
  container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">⏳</span><p>Carregando...</p></div>`;

  const { data: lista, error } = await cliente
    .from('colaboradores')
    .select('id, nome, cargo, ativo')
    .order('nome');

  if (error) {
    container.innerHTML = `<div class="alert alert-error">Erro ao carregar colaboradores.</div>`;
    return;
  }

  // Buscar emails via tabela usuarios
  const ids = (lista || []).map(c => c.id);
  const { data: usuarios } = ids.length
    ? await cliente.from('usuarios').select('id, email').in('id', ids)
    : { data: [] };
  const emailMap = Object.fromEntries((usuarios || []).map(u => [u.id, u.email]));

  // Cache para uso no modal de edição
  _todosColaboradores = (lista || []).map(c => ({ ...c, email: emailMap[c.id] || '' }));

  if (!lista?.length) {
    container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">👥</span><p>Nenhum colaborador cadastrado.</p></div>`;
    return;
  }

  const isAdmin  = cargoAtual === 'admin' || cargoAtual === 'master';
  const isMaster = cargoAtual === 'master';

  // Botão Adicionar — só master pode cadastrar colaboradores
  const btnAdicionar = document.getElementById('btn-adicionar-colab');
  if (btnAdicionar) btnAdicionar.style.display = isMaster ? '' : 'none';

  container.innerHTML = lista.map(c => {
    const email    = emailMap[c.id] || '—';
    const cargoLbl = CARGO_LABEL[c.cargo] || c.cargo;
    const ativoClr = c.ativo ? '#22c55e' : '#94a3b8';
    const ativoTxt = c.ativo ? 'Ativo' : 'Inativo';

    const opcoescargo = isMaster
      ? `<option value="colaborador" ${c.cargo === 'colaborador' ? 'selected' : ''}>Colaborador</option>
         <option value="admin"       ${c.cargo === 'admin'       ? 'selected' : ''}>Administrador</option>
         <option value="master"      ${c.cargo === 'master'      ? 'selected' : ''}>Master</option>`
      : `<option value="colaborador" ${c.cargo === 'colaborador' ? 'selected' : ''}>Colaborador</option>
         <option value="admin"       ${c.cargo === 'admin'       ? 'selected' : ''}>Administrador</option>`;

    const controles = isAdmin ? `
      <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap">
        <select style="font-size:0.78rem;padding:0.3rem 0.5rem;border:1px solid var(--gray-light);border-radius:0.5rem;background:var(--white);color:var(--navy-mid)"
          onchange="alterarCargoColaborador('${c.id}', this.value)">
          ${opcoescargo}
        </select>
        <button class="btn btn-sm" style="font-size:0.78rem;padding:0.3rem 0.75rem;background:${c.ativo ? '#fee2e2' : '#dcfce7'};color:${c.ativo ? '#b91c1c' : '#15803d'};border:1px solid ${c.ativo ? '#fca5a5' : '#86efac'};border-radius:0.5rem"
          onclick="toggleColaboradorAtivo('${c.id}', ${c.ativo})">
          ${c.ativo ? '🔴 Desativar' : '🟢 Ativar'}
        </button>
        <button class="btn btn-secondary btn-sm" onclick="abrirEditarColaborador('${c.id}')">✏️ Editar</button>
        <button class="btn btn-sm" style="background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5;border-radius:0.5rem;font-size:0.78rem;padding:0.3rem 0.75rem"
          onclick="excluirColaborador('${c.id}','${escapeHtml(c.nome)}')">🗑️ Excluir</button>
      </div>` : '';

    return `
      <div style="display:flex;align-items:center;padding:0.875rem 0;border-bottom:1px solid var(--gray-light);gap:1rem;flex-wrap:wrap">
        <div style="flex:1;min-width:150px">
          <div style="font-weight:600;font-size:0.875rem">${c.nome}</div>
          <div style="font-size:0.78rem;color:var(--gray-dark);overflow-wrap:break-word;word-break:break-all">${escapeHtml(email)}</div>
        </div>
        <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;color:${ativoClr};font-weight:600">
          <span style="width:8px;height:8px;border-radius:50%;background:${ativoClr};display:inline-block"></span>
          ${ativoTxt}
        </div>
        <span class="status-badge" style="font-size:0.72rem">${cargoLbl}</span>
        ${controles}
      </div>`;
  }).join('');
}

function abrirModalAdicionarColaborador() {
  document.getElementById('colab-nome-input').value    = '';
  document.getElementById('colab-email-input').value   = '';
  document.getElementById('colab-cargo-select').value  = 'colaborador';
  document.getElementById('colab-modal-alert').innerHTML = '';
  document.getElementById('colab-modal-overlay').classList.add('active');
}

function fecharColabModal() {
  document.getElementById('colab-modal-overlay').classList.remove('active');
}

function fecharColabModalClick(e) {
  if (e.target === document.getElementById('colab-modal-overlay')) fecharColabModal();
}

async function salvarNovoColaborador() {
  const nome  = document.getElementById('colab-nome-input').value.trim();
  const email = document.getElementById('colab-email-input').value.trim().toLowerCase();
  const cargo = document.getElementById('colab-cargo-select').value;
  const alertEl = document.getElementById('colab-modal-alert');
  const btn     = document.getElementById('btn-salvar-colab');

  alertEl.innerHTML = '';
  if (!nome)  { alertEl.innerHTML = `<div class="alert alert-error">Informe o nome do colaborador.</div>`; return; }
  if (!email) { alertEl.innerHTML = `<div class="alert alert-error">Informe o e-mail do colaborador.</div>`; return; }

  btn.disabled = true; btn.innerHTML = '<span class="loading"></span> Criando...';

  const { data: resultado, error: errRpc } = await cliente.rpc('criar_colaborador', {
    p_email: email,
    p_nome:  nome,
    p_cargo: cargo
  });

  btn.disabled = false; btn.innerHTML = '➕ Adicionar';

  if (errRpc) {
    alertEl.innerHTML = `<div class="alert alert-error">Erro: ${errRpc.message}</div>`;
    return;
  }

  const novoId      = resultado.id;
  const senhaTmp    = resultado.senha_temporaria;
  const urlAcesso   = window.location.origin + '/index.html';

  await registrarLog('adicionar_colaborador', 'colaboradores', novoId,
    `Colaborador ${nome} (${email}) criado com cargo ${CARGO_LABEL[cargo]}`);

  fecharColabModal();
  carregarColaboradores();

  // Exibe a senha temporária para o master compartilhar
  await Swal.fire({
    icon: 'success',
    title: '✅ Colaborador criado!',
    html: `
      <p style="font-size:0.875rem;color:#475569;margin-bottom:1rem;line-height:1.6">
        Compartilhe as credenciais abaixo com <strong>${escapeHtml(nome)}</strong>.
        O colaborador poderá alterar a senha após o primeiro acesso.
      </p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.875rem;text-align:left;font-size:0.85rem">
        <div style="margin-bottom:0.5rem"><span style="color:#64748b">E-mail:</span> <strong>${escapeHtml(email)}</strong></div>
        <div><span style="color:#64748b">Senha temporária:</span> <strong id="swal-senha-tmp" style="font-family:monospace;letter-spacing:0.05em">${escapeHtml(senhaTmp)}</strong></div>
      </div>
      <div style="margin-top:0.75rem;font-size:0.8rem;color:#64748b">URL de acesso: <a href="${urlAcesso}" target="_blank">${urlAcesso}</a></div>
    `,
    showCancelButton: true,
    confirmButtonText: '📋 Copiar credenciais',
    cancelButtonText: 'Fechar',
    confirmButtonColor: '#f97316'
  }).then(r => {
    if (r.isConfirmed) {
      navigator.clipboard.writeText(
        `Acesso ao sistema Colégio Plenus\nURL: ${urlAcesso}\nE-mail: ${email}\nSenha temporária: ${senhaTmp}`
      );
      showToast('📋 Credenciais copiadas!');
    }
  });
}

function abrirEditarColaborador(id) {
  const c = _todosColaboradores.find(x => x.id === id);
  if (!c) return;
  document.getElementById('colab-edit-id').value             = c.id;
  document.getElementById('colab-edit-email-original').value = c.email || '';
  document.getElementById('colab-edit-nome').value           = c.nome || '';
  document.getElementById('colab-edit-email').value          = c.email || '';
  document.getElementById('colab-edit-alert').innerHTML      = '';
  document.getElementById('colab-edit-modal-overlay').classList.add('active');
}

function fecharEditarColabModal() {
  document.getElementById('colab-edit-modal-overlay').classList.remove('active');
}

async function redefinirSenhaColab() {
  const id       = document.getElementById('colab-edit-id').value;
  const email    = document.getElementById('colab-edit-email').value.trim();
  const nome     = document.getElementById('colab-edit-nome').value.trim();
  const feedback = document.getElementById('colab-edit-link-feedback');

  const { isConfirmed } = await Swal.fire({
    icon: 'warning',
    title: 'Gerar nova senha?',
    html: `<p style="font-size:0.875rem;color:#475569">Uma nova senha temporária será gerada para <strong>${escapeHtml(nome)}</strong>. A senha atual deixará de funcionar.</p>`,
    showCancelButton: true,
    confirmButtonText: 'Sim, gerar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#f97316'
  });
  if (!isConfirmed) return;

  const { data: senhaTmp, error } = await cliente.rpc('redefinir_senha_colaborador', { p_user_id: id });
  if (error) { showToast('❌ Erro: ' + error.message); return; }

  const urlAcesso = window.location.origin + '/index.html';
  await registrarLog('redefinir_senha_colaborador', 'colaboradores', id, `Senha temporária gerada para ${email}`);

  feedback.style.display = 'none';

  await Swal.fire({
    icon: 'success',
    title: '🔑 Nova senha gerada!',
    html: `
      <p style="font-size:0.875rem;color:#475569;margin-bottom:1rem;line-height:1.6">
        Compartilhe as credenciais abaixo com <strong>${escapeHtml(nome)}</strong>.
      </p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.875rem;text-align:left;font-size:0.85rem">
        <div style="margin-bottom:0.5rem"><span style="color:#64748b">E-mail:</span> <strong>${escapeHtml(email)}</strong></div>
        <div><span style="color:#64748b">Senha temporária:</span> <strong style="font-family:monospace;letter-spacing:0.05em">${escapeHtml(senhaTmp)}</strong></div>
      </div>
      <div style="margin-top:0.75rem;font-size:0.8rem;color:#64748b">URL: <a href="${urlAcesso}" target="_blank">${urlAcesso}</a></div>
    `,
    showCancelButton: true,
    confirmButtonText: '📋 Copiar credenciais',
    cancelButtonText: 'Fechar',
    confirmButtonColor: '#f97316'
  }).then(r => {
    if (r.isConfirmed) {
      navigator.clipboard.writeText(
        `Acesso ao sistema Colégio Plenus\nURL: ${urlAcesso}\nE-mail: ${email}\nSenha temporária: ${senhaTmp}`
      );
      showToast('📋 Credenciais copiadas!');
    }
  });
}

async function salvarEdicaoColaborador() {
  const id            = document.getElementById('colab-edit-id').value;
  const emailOriginal = document.getElementById('colab-edit-email-original').value.trim().toLowerCase();
  const nome          = document.getElementById('colab-edit-nome').value.trim();
  const email         = document.getElementById('colab-edit-email').value.trim().toLowerCase();
  const alertEl       = document.getElementById('colab-edit-alert');
  const btn           = document.getElementById('btn-salvar-colab-edit');

  alertEl.innerHTML = '';
  if (!nome)  { alertEl.innerHTML = `<div class="alert alert-error">Informe o nome.</div>`; return; }
  if (!email) { alertEl.innerHTML = `<div class="alert alert-error">Informe o e-mail.</div>`; return; }

  const emailMudou = email !== emailOriginal;

  if (emailMudou) {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: 'Alterar e-mail?',
      html: `<p style="font-size:0.875rem;color:#475569;line-height:1.6">
        O e-mail de login será alterado de<br>
        <strong>${emailOriginal}</strong><br>para<br>
        <strong>${email}</strong><br><br>
        O colaborador precisará usar o novo e-mail para acessar o sistema.
      </p>`,
      showCancelButton: true,
      confirmButtonText: 'Sim, alterar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f97316'
    });
    if (!isConfirmed) return;
  }

  btn.disabled = true; btn.textContent = 'Salvando...';

  if (emailMudou) {
    const { error: errEmail } = await cliente.rpc('alterar_email_usuario', {
      p_user_id: id,
      p_novo_email: email
    });
    if (errEmail) {
      btn.disabled = false; btn.textContent = '💾 Salvar';
      alertEl.innerHTML = `<div class="alert alert-error">Erro ao alterar e-mail: ${errEmail.message}</div>`;
      return;
    }
    document.getElementById('colab-edit-email-original').value = email;
  }

  const { error } = await cliente.from('colaboradores').update({ nome }).eq('id', id);
  btn.disabled = false; btn.textContent = '💾 Salvar';

  if (error) { alertEl.innerHTML = `<div class="alert alert-error">Erro: ${error.message}</div>`; return; }

  await registrarLog('editar_colaborador', 'colaboradores', id,
    emailMudou ? `Colaborador atualizado — e-mail alterado para ${email}` : `Nome atualizado para ${nome}`);
  fecharEditarColabModal();
  showToast('✅ Colaborador atualizado!');
  carregarColaboradores();
}

async function excluirColaborador(id, nome) {
  const { isConfirmed } = await Swal.fire({
    title: 'Excluir colaborador?',
    html: `<p>Excluir <strong>${escapeHtml(nome)}</strong> permanentemente?</p>
           <p style="font-size:0.82rem;color:#b91c1c;margin-top:0.4rem">O acesso ao painel e o cadastro completo serão removidos. Esta ação é irreversível.</p>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626'
  });
  if (!isConfirmed) return;

  // Remove da tabela colaboradores e do auth.users via RPC com security definer
  const { error } = await cliente.rpc('excluir_usuario_permanente', { user_id: id });
  if (error) { showToast('❌ Erro ao excluir: ' + error.message); return; }

  await registrarLog('excluir_colaborador', 'colaboradores', id, `Colaborador ${nome} excluído permanentemente`);
  showToast('✅ Colaborador excluído permanentemente.');
  carregarColaboradores();
}

async function toggleColaboradorAtivo(id, ativoAtual) {
  const novoAtivo = !ativoAtual;
  const { error } = await cliente
    .from('colaboradores')
    .update({ ativo: novoAtivo })
    .eq('id', id);

  if (error) { showToast('❌ Erro ao atualizar status.'); return; }

  showToast(novoAtivo ? '✅ Colaborador ativado.' : '✅ Colaborador desativado.');
  carregarColaboradores();
}

async function alterarCargoColaborador(id, novoCargo) {
  const { error } = await cliente
    .from('colaboradores')
    .update({ cargo: novoCargo })
    .eq('id', id);

  if (error) { showToast('❌ Erro ao alterar cargo.'); return; }

  showToast('✅ Cargo atualizado.');
  await registrarLog('alterar_cargo_colaborador', 'colaboradores', id,
    `Cargo alterado para ${CARGO_LABEL[novoCargo]}`);
}

// ============================================================
//  NAVEGAÇÃO
// ============================================================
function showSection(name) {
  const permitido = PERMISSOES[cargoAtual] || PERMISSOES['colaborador'];
  if (!permitido.includes(name)) {
    showToast('⚠️ Você não tem permissão para acessar esta seção.');
    return;
  }
  document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  const nav = document.querySelector(`[data-section="${name}"]`);
  if (nav) nav.classList.add('active');
  const titles = {
    'overview':       'Início',
    'solicitacoes':   'Solicitações',
    'enturmar':       'Enturmar',
    'cadastros':      'Cadastros',
    'relatorios':     'Relatórios',
    'logs':           'Atividade',
    'colaboradores':  'Colaboradores',
    'dados':          'Gerenciar Dados',
    'perfil':         'Meu Perfil'
  };
  document.querySelector('.topbar-title').textContent = titles[name] || '';
  if (name === 'solicitacoes') {
    document.getElementById('filtro-status').value = '';
    document.getElementById('busca-input').value   = '';
    carregarSolicitacoes();
  }
  if (name === 'enturmar')      carregarEnturmar();
  if (name === 'cadastros')     carregarCadastros();
  if (name === 'relatorios')    carregarRelatorios();
  if (name === 'logs')          carregarLogs();
  if (name === 'colaboradores') carregarColaboradores();
  if (name === 'dados')         carregarDados();
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
//  STATS
// ============================================================
async function carregarStats() {
  const { data } = await cliente.from('interesse_vagas').select('id, status');
  if (!data) return;
  document.getElementById('stat-total').textContent    = data.length;
  document.getElementById('stat-pendente').textContent = data.filter(s => s.status === 'pendente').length;
  document.getElementById('stat-analise').textContent  = data.filter(s => s.status === 'em_analise').length;
  document.getElementById('stat-aprovado').textContent = data.filter(s => s.status === 'aprovado').length;
  document.getElementById('stat-reprovado').textContent= data.filter(s => s.status === 'reprovado').length;
}

// ============================================================
//  ÚLTIMAS SOLICITAÇÕES (overview)
// ============================================================
async function carregarUltimasSolicitacoes() {
  const { data } = await cliente
    .from('interesse_vagas')
    .select('id, status, created_at, alunos(nome_aluno), usuario_id')
    .order('created_at', { ascending: false })
    .limit(5);

  const container = document.getElementById('ultimas-solicitacoes');
  if (!data?.length) {
    container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">📭</span><p>Nenhuma solicitação ainda.</p></div>`;
    return;
  }

  // Buscar perfis dos usuários
  const ids = [...new Set(data.map(s => s.usuario_id))];
  const { data: perfis } = await cliente.from('usuarios').select('id, nome').in('id', ids);
  const pm = Object.fromEntries((perfis || []).map(p => [p.id, p]));

  container.innerHTML = data.map(s => {
    const resp = pm[s.usuario_id] || {};
    const dataFmt = new Date(s.created_at).toLocaleDateString('pt-BR');
    const numAlunos = s.alunos?.length || 0;
    return `
      <div class="solicitacao-card" style="cursor:pointer" onclick="irParaDetalhe('${s.id}')">
        <div class="solicitacao-info" style="flex:1">
          <h3>🎒 ${numAlunos} aluno${numAlunos !== 1 ? 's' : ''} · ${resp.nome || 'Responsável'}</h3>
          <p style="margin-top:0.2rem">${dataFmt}</p>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;flex-shrink:0">
          <span class="status-badge status-${s.status}">${STATUS_LABEL[s.status]}</span>
        </div>
      </div>`;
  }).join('');
}

async function irParaDetalhe(id) {
  showSection('solicitacoes');
  await carregarSolicitacoes();
  abrirDetalhe(id);
}

function irParaSolicitacoes(status) {
  showSection('solicitacoes');
  document.getElementById('filtro-status').value = status;
  filtrarSolicitacoes();
}

// ============================================================
//  SOLICITAÇÕES
// ============================================================
async function carregarSolicitacoes() {
  const container = document.getElementById('solicitacoes-list');
  container.innerHTML = `<div class="empty-state"><span class="empty-icon">⏳</span><p>Carregando...</p></div>`;

  const [
    { data: solicitacoes, error },
    { data: todosAlunos },
    { data: todasAlocacoes },
    { data: todasTurmasData }
  ] = await Promise.all([
    cliente.from('interesse_vagas').select('*').order('created_at', { ascending: false }),
    cliente.from('alunos').select('*'),
    cliente.from('alocacoes').select('id, aluno_id, turma_id'),
    cliente.from('turmas').select('id, nome_turma, serie, segmento, turno')
  ]);

  if (error) {
    container.innerHTML = `<div class="alert alert-error">Erro: ${error.message}</div>`;
    return;
  }

  // Montar mapas para cross-reference
  const turmaMap   = Object.fromEntries((todasTurmasData || []).map(t => [t.id, t]));
  const alocMap    = {};
  (todasAlocacoes || []).forEach(al => {
    alocMap[al.aluno_id] = { id: al.id, turma_id: al.turma_id, turmas: turmaMap[al.turma_id] || null };
  });

  // Agrupar alunos por interesse_id e injetar alocações
  const alunosPorSolic = {};
  (todosAlunos || []).forEach(a => {
    if (!alunosPorSolic[a.interesse_id]) alunosPorSolic[a.interesse_id] = [];
    alunosPorSolic[a.interesse_id].push({
      ...a,
      alocacoes: alocMap[a.id] ? [alocMap[a.id]] : []
    });
  });

  // Buscar perfis dos responsáveis
  const ids = [...new Set((solicitacoes || []).map(s => s.usuario_id))];
  const { data: perfis } = ids.length
    ? await cliente.from('usuarios').select('id, nome, telefone, email').in('id', ids)
    : { data: [] };
  const pm = Object.fromEntries((perfis || []).map(p => [p.id, p]));

  todasSolicitacoes = (solicitacoes || []).map(s => ({
    ...s,
    alunos: alunosPorSolic[s.id] || [],
    responsavel: pm[s.usuario_id] || {}
  }));

  filtrarSolicitacoes();
}

function filtrarSolicitacoes() {
  const status = document.getElementById('filtro-status').value;
  const busca  = document.getElementById('busca-input').value.toLowerCase().trim();

  let lista = todasSolicitacoes;

  if (status) lista = lista.filter(s => s.status === status);
  if (busca) lista = lista.filter(s => {
    const resp = s.responsavel || {};
    const haystack = [
      resp.nome || '',
      resp.email || '',
      resp.telefone || '',
      ...(s.alunos || []).map(a => a.nome_aluno)
    ].join(' ').toLowerCase();
    return haystack.includes(busca);
  });

  document.getElementById('solicitacoes-count').textContent =
    `${lista.length} solicitaç${lista.length !== 1 ? 'ões' : 'ão'} encontrada${lista.length !== 1 ? 's' : ''}`;

  renderSolicitacoes(lista);
}

function diasDesde(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  return diff;
}

function renderSolicitacoes(lista) {
  const container = document.getElementById('solicitacoes-list');
  if (!lista.length) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📭</span>
        <p>Nenhuma solicitação encontrada com os filtros atuais.</p>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('filtro-status').value='';document.getElementById('busca-input').value='';filtrarSolicitacoes()">
          Limpar filtros
        </button>
      </div>`;
    return;
  }

  const GUIA_BTN = {
    pendente:   { label: '📋 Como Avaliar',    cls: 'btn-secondary' },
    em_analise: { label: '🔍 Como Prosseguir', cls: 'btn-secondary' },
    aprovado:   { label: '🎓 Próximos Passos', cls: 'btn-success'   }
  };

  container.innerHTML = lista.map(s => {
    const resp    = s.responsavel || {};
    const alunos  = s.alunos || [];
    const dataFmt = new Date(s.created_at).toLocaleDateString('pt-BR');

    const dias = diasDesde(s.created_at);
    const slaAtivo = (s.status === 'pendente' || s.status === 'em_analise');
    const slaCor   = dias >= 7 ? '#dc2626' : dias >= 3 ? '#d97706' : '#16a34a';
    const slaBg    = dias >= 7 ? '#fee2e2' : dias >= 3 ? '#fef3c7' : '#dcfce7';
    const slaBorder= dias >= 7 ? '#fecaca' : dias >= 3 ? '#fde68a' : '#bbf7d0';
    const slaHtml  = slaAtivo
      ? `<span style="font-size:0.67rem;font-weight:700;padding:0.2rem 0.5rem;border-radius:9999px;background:${slaBg};color:${slaCor};border:1px solid ${slaBorder};white-space:nowrap">⏱ ${dias === 0 ? 'Hoje' : dias === 1 ? '1 dia' : dias + ' dias'}</span>`
      : '';

    const totalAlunos  = alunos.length;
    const aprov        = alunos.filter(a => (a.status_aluno || 'pendente') === 'aprovado').length;
    const reprov       = alunos.filter(a => (a.status_aluno || 'pendente') === 'reprovado').length;
    const matrAlunos   = alunos.filter(a => (a.status_aluno || 'pendente') === 'matriculado').length;
    const temRessalva  = s.status === 'aprovado' && totalAlunos > 0 && (aprov + matrAlunos) < totalAlunos;
    const badgeLabel   = temRessalva ? 'Aprovada com ressalvas' : STATUS_LABEL[s.status];

    const alunosTags = alunos.map(a => {
      const st = a.status_aluno || 'pendente';
      const cor = st === 'aprovado'   ? 'background:#dcfce7;color:#15803d;border-color:#bbf7d0'
                : st === 'reprovado'  ? 'background:#fee2e2;color:#dc2626;border-color:#fecaca'
                : st === 'matriculado'? 'background:#ecfeff;color:#0e7490;border-color:#a5f3fc'
                : '';
      const icon = st === 'aprovado' ? '✅' : st === 'reprovado' ? '✕' : st === 'matriculado' ? '🎓' : '🎒';
      return `<span class="aluno-tag" style="${cor}">${icon} ${escapeHtml(a.nome_aluno)} · ${SEGMENTO_LABEL[a.segmento] || a.segmento} · ${a.turma}</span>`;
    }).join('');

    const guiaBtn = GUIA_BTN[s.status]
      ? `<button class="btn ${GUIA_BTN[s.status].cls} btn-sm" onclick="event.stopPropagation(); abrirGuiaModal('${s.id}')">${GUIA_BTN[s.status].label}</button>`
      : '';

    const ressalvaHtml = temRessalva ? `
      <div style="background:#fef3c7;border:1px solid #fde68a;border-left:3px solid #f59e0b;border-radius:0 0.375rem 0.375rem 0;padding:0.45rem 0.75rem;font-size:0.775rem;color:#92400e;line-height:1.5">
        ⚠️ <strong>Aprovada com ressalvas:</strong> ${aprov} de ${totalAlunos} aluno${totalAlunos !== 1 ? 's' : ''} aprovado${aprov !== 1 ? 's' : ''}${reprov > 0 ? ` · ${reprov} reprovado${reprov !== 1 ? 's' : ''}` : ''}.
      </div>` : '';

    return `
      <div class="solicitacao-admin-card border-${s.status}" onclick="abrirDetalhe('${s.id}')">

        <!-- Top: name + status + actions -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;flex-wrap:wrap">
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.3rem">
              <span class="status-badge status-${s.status}">${badgeLabel}</span>
              ${slaHtml}
            </div>
            <div style="font-size:1rem;font-weight:800;color:var(--navy-mid);line-height:1.25;margin-bottom:0.25rem">${escapeHtml(resp.nome || '–')}</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.875rem">
              ${resp.email    ? `<span style="font-size:0.775rem;color:var(--gray-dark)">📧 ${escapeHtml(resp.email)}</span>` : ''}
              ${resp.telefone ? `<span style="font-size:0.775rem;color:var(--gray-dark)">📞 ${escapeHtml(resp.telefone)}</span>` : ''}
              <span style="font-size:0.72rem;color:var(--gray)">📅 ${dataFmt}</span>
            </div>
          </div>
          <div style="display:flex;gap:0.4rem;flex-wrap:wrap;flex-shrink:0" onclick="event.stopPropagation()">
            ${guiaBtn}
            <button class="btn btn-secondary btn-sm" onclick="imprimirFicha('${s.id}')">🖨️ Ficha</button>
            <button class="btn btn-primary btn-sm" onclick="abrirDetalhe('${s.id}')">Ver Detalhes →</button>
          </div>
        </div>

        <!-- Financial info strip -->
        <div style="display:flex;flex-wrap:wrap;gap:1.5rem;padding:0.625rem 0;border-top:1px solid var(--gray-light);border-bottom:1px solid var(--gray-light)">
          <div>
            <div style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--gray)">Mensalidade atual</div>
            <div style="font-size:0.875rem;font-weight:700;color:var(--navy-mid);margin-top:0.1rem">${s.valor_mensalidade_anterior ? formatarMoedaExibicao(s.valor_mensalidade_anterior) : '–'}</div>
          </div>
          <div>
            <div style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--gray)">Desconto almejado</div>
            <div style="font-size:0.875rem;font-weight:700;color:var(--navy-mid);margin-top:0.1rem">${s.taxa_desconto_almejada ? s.taxa_desconto_almejada + '%' : '–'}</div>
          </div>
          <div>
            <div style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--gray)">Permuta</div>
            <div style="font-size:0.875rem;font-weight:600;color:var(--navy-mid);margin-top:0.1rem">${PERMUTA_LABEL[s.tipo_permuta] || '–'}</div>
          </div>
        </div>

        ${ressalvaHtml}
        ${alunos.length ? `<div class="aluno-tags">${alunosTags}</div>` : ''}
      </div>`;
  }).join('');
}

// ============================================================
//  MODAL DE DETALHE
// ============================================================
function abrirDetalhe(id) {
  const s = todasSolicitacoes.find(x => x.id === id);
  if (!s) return;
  solicitacaoAtualId = id;

  const resp        = s.responsavel || {};
  const alunos      = s.alunos || [];
  const dataFmt     = new Date(s.created_at).toLocaleString('pt-BR');
  const updFmt      = s.updated_at ? new Date(s.updated_at).toLocaleString('pt-BR') : '–';
  const totalAlunos = alunos.length;
  const aprov       = alunos.filter(a => (a.status_aluno || 'pendente') === 'aprovado').length;
  const reprov      = alunos.filter(a => (a.status_aluno || 'pendente') === 'reprovado').length;
  const matrAlunos  = alunos.filter(a => (a.status_aluno || 'pendente') === 'matriculado').length;
  const temRessalva = s.status === 'aprovado' && totalAlunos > 0 && (aprov + matrAlunos) < totalAlunos;
  const badgeLabel  = temRessalva ? 'Aprovada com ressalvas' : STATUS_LABEL[s.status];

  const guiaBtnLabel = { pendente: '📋 Como Avaliar', em_analise: '🔍 Como Prosseguir', aprovado: '🎓 Próximos Passos' }[s.status];

  document.getElementById('modal-content').innerHTML = `

    <!-- Cabeçalho colorido por status -->
    <div class="modal-head-${s.status}" style="padding:1.25rem 1.5rem 1rem;border-bottom:1px solid var(--gray-light)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.4rem">
            <span class="status-badge status-${s.status}">${badgeLabel}</span>
            ${gerarBotoesStatus(s.status, id)}
          </div>
          <h2 style="font-size:1.2rem;font-weight:800;color:var(--navy-mid);margin:0 0 0.35rem;line-height:1.2;letter-spacing:-0.3px">${escapeHtml(resp.nome || 'Responsável sem nome')}</h2>
          <div style="display:flex;flex-wrap:wrap;gap:0.875rem">
            ${resp.email    ? `<span style="font-size:0.8rem;color:var(--gray-dark)">📧 ${escapeHtml(resp.email)}</span>` : ''}
            ${resp.telefone ? `<span style="font-size:0.8rem;color:var(--gray-dark)">📞 ${escapeHtml(resp.telefone)}</span>` : ''}
            <span style="font-size:0.75rem;color:var(--gray)">🗓️ ${dataFmt}</span>
          </div>
        </div>
        <button class="btn-modal-close" onclick="fecharModal()">✕</button>
      </div>
    </div>

    ${temRessalva ? `
    <div style="background:#fef3c7;border-bottom:2px solid #fde68a;padding:0.5rem 1.5rem;font-size:0.8rem;color:#92400e;line-height:1.5">
      ⚠️ <strong>Aprovada com ressalvas:</strong> ${aprov} de ${totalAlunos} aluno${totalAlunos !== 1 ? 's' : ''} aprovado${aprov !== 1 ? 's' : ''}${reprov > 0 ? ` · ${reprov} reprovado${reprov !== 1 ? 's' : ''}` : ''}.
    </div>` : ''}

    <!-- Abas -->
    <div class="detalhe-tabs-wrap">
      <button class="detalhe-tab active" onclick="trocarAbaDetalhe('resumo',this)" id="tab-resumo">📋 Resumo</button>
      <button class="detalhe-tab" onclick="trocarAbaDetalhe('financeiro',this)" id="tab-financeiro">💰 Financeiro</button>
      <button class="detalhe-tab" onclick="trocarAbaDetalhe('alunos',this)" id="tab-alunos">🎒 Alunos<span class="tab-count">${alunos.length}</span></button>
      <button class="detalhe-tab" onclick="trocarAbaDetalhe('historico',this)" id="tab-historico">🕐 Histórico</button>
    </div>

    <div class="modal-body">

      <!-- ABA: Resumo -->
      <div id="aba-resumo" class="detalhe-aba" style="padding:1.25rem 1.5rem;display:flex;flex-direction:column;gap:1rem">

        ${guiaBtnLabel ? `
        <div>
          <button class="btn btn-secondary btn-sm" onclick="abrirGuiaModal('${id}')">${guiaBtnLabel}</button>
        </div>` : ''}

        <div id="ultima-nota-display" style="display:none;background:#fffbeb;border:1px solid #fde68a;border-left:3px solid #f59e0b;border-radius:0 var(--radius-sm) var(--radius-sm) 0;padding:0.625rem 0.875rem">
          <div style="font-size:0.62rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#92400e;margin-bottom:0.2rem">💬 Última nota interna</div>
          <div id="ultima-nota-texto" style="font-size:0.82rem;color:var(--navy-mid);line-height:1.55;white-space:pre-wrap"></div>
          <div id="ultima-nota-meta" style="font-size:0.7rem;color:var(--gray);margin-top:0.25rem"></div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.875rem">
          <div class="detalhe-section" style="margin:0">
            <div class="detalhe-section-title">📝 Motivo da Transferência</div>
            <div class="detalhe-section-body">
              <p style="font-size:0.855rem;color:var(--navy-mid);line-height:1.65;margin:0">${escapeHtml(s.motivo_transferencia || '–')}</p>
            </div>
          </div>
          <div class="detalhe-section" style="margin:0">
            <div class="detalhe-section-title">⭐ Por que escolheu o Colégio Plenus</div>
            <div class="detalhe-section-body">
              <p style="font-size:0.855rem;color:var(--navy-mid);line-height:1.65;margin:0">${escapeHtml(s.motivo_escolha_plenus || '–')}</p>
            </div>
          </div>
        </div>

        <p style="text-align:center;font-size:0.715rem;color:var(--gray);margin:0;padding-top:0.625rem;border-top:1px solid var(--gray-light)">
          Criado em ${dataFmt} · Atualizado em ${updFmt}
        </p>
      </div>

      <!-- ABA: Financeiro -->
      <div id="aba-financeiro" class="detalhe-aba" style="padding:1.25rem 1.5rem;display:none;flex-direction:column;gap:1rem">

        <!-- Informações do responsável (somente leitura) -->
        <div class="fin-section">
          <div class="fin-section-header resp-header">📋 Informado pelo responsável</div>
          <div class="fin-section-grid">
            <div class="fin-section-item">
              <div class="fin-section-label">Mensalidade Atual</div>
              <div class="fin-section-value">
                <span style="font-size:1rem;font-weight:800;color:var(--navy-mid)">${s.valor_mensalidade_anterior ? formatarMoedaExibicao(s.valor_mensalidade_anterior) : '–'}</span>
              </div>
            </div>
            <div class="fin-section-item">
              <div class="fin-section-label">Desconto Almejado</div>
              <div class="fin-section-value">
                <span style="font-size:1rem;font-weight:800;color:var(--navy-mid)">${s.taxa_desconto_almejada ? s.taxa_desconto_almejada + '%' : '–'}</span>
              </div>
            </div>
            <div class="fin-section-item">
              <div class="fin-section-label">Possui Desconto Atual?</div>
              <div class="fin-section-value">${s.tem_desconto ? '✅ Sim' : '❌ Não'}</div>
              ${s.tem_desconto && s.descricao_desconto ? `<div style="font-size:0.78rem;color:var(--gray-dark);margin-top:0.3rem">${escapeHtml(s.descricao_desconto)}</div>` : ''}
            </div>
            <div class="fin-section-item">
              <div class="fin-section-label">Permuta Solicitada</div>
              <div class="fin-section-value">${PERMUTA_LABEL[s.tipo_permuta] || '–'}</div>
              ${s.tipo_permuta !== 'nao' && s.descricao_permuta ? `<div style="font-size:0.78rem;color:var(--gray-dark);margin-top:0.3rem">${escapeHtml(s.descricao_permuta)}</div>` : ''}
            </div>
          </div>
        </div>

        <!-- Decisão da escola (editável) -->
        <div class="fin-section">
          <div class="fin-section-header escola-header">🏫 Decisão da escola</div>
          <div class="fin-section-grid">
            <div class="fin-section-item">
              <div class="fin-section-label">
                Desconto Concedido
                <button class="btn btn-secondary btn-sm" style="font-size:0.65rem;padding:0.12rem 0.4rem" onclick="editarFinanceiro('${id}','desconto')">✏️ Editar</button>
              </div>
              <div id="fin-desconto-display" class="fin-section-value">
                ${s.desconto_concedido
                  ? `<span style="color:#15803d;font-weight:700">${escapeHtml(s.desconto_concedido)}</span>`
                  : '<span style="color:var(--gray);font-weight:400;font-size:0.82rem">Não informado</span>'}
              </div>
            </div>
            <div class="fin-section-item">
              <div class="fin-section-label">
                Permuta
                <button class="btn btn-secondary btn-sm" style="font-size:0.65rem;padding:0.12rem 0.4rem" onclick="editarFinanceiro('${id}','permuta')">✏️ Editar</button>
              </div>
              <div id="fin-permuta-display" class="fin-section-value">
                ${s.permuta_aceita !== null && s.permuta_aceita !== undefined
                  ? `<span style="font-weight:700;color:${s.permuta_aceita ? '#15803d' : '#dc2626'}">${s.permuta_aceita ? '✅ Aceita' : '❌ Não aceita'}</span>`
                  : '<span style="color:var(--gray);font-weight:400;font-size:0.82rem">Não informado</span>'}
                ${s.permuta_aceita && s.condicoes_permuta_aceita ? `<div style="font-size:0.78rem;color:var(--gray-dark);margin-top:0.3rem">${escapeHtml(s.condicoes_permuta_aceita)}</div>` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ABA: Alunos -->
      <div id="aba-alunos" class="detalhe-aba" style="display:none;flex-direction:column;padding:0.875rem 1rem;gap:0.75rem">
        <div id="alunos-detalhe-lista" style="display:flex;flex-direction:column;gap:0.75rem">
          ${renderAlunosDetalhe(alunos, id)}
        </div>
      </div>

      <!-- ABA: Histórico -->
      <div id="aba-historico" class="detalhe-aba" style="padding:1.25rem 1.5rem;display:none;flex-direction:column;gap:1rem">
        <div style="display:flex;justify-content:flex-end">
          <button class="btn btn-secondary btn-sm" onclick="abrirObsModal('')">+ Adicionar Nota</button>
        </div>
        <div id="historico-lista">
          <div style="display:flex;align-items:center;gap:0.5rem;color:var(--gray);font-size:0.82rem">
            <span class="loading" style="border-color:rgba(0,0,0,0.1);border-top-color:var(--gray)"></span>
            Carregando histórico...
          </div>
        </div>
      </div>

    </div>`;

  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  carregarHistoricoModal(id);
}

function trocarAbaDetalhe(aba, btn) {
  document.querySelectorAll('.detalhe-aba').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.detalhe-tab').forEach(el => el.classList.remove('active'));
  document.getElementById('aba-' + aba).style.display = 'flex';
  btn.classList.add('active');
}

async function editarFinanceiro(id, campo) {
  const s = todasSolicitacoes.find(x => x.id === id);
  if (!s) return;

  let result;
  if (campo === 'desconto') {
    result = await Swal.fire({
      title: '💰 Desconto Concedido',
      html: `<p style="font-size:0.85rem;color:#475569;margin-bottom:0.75rem">Informe o desconto concedido ao responsável (ex: 20%, R$ 150,00, etc.)</p>
             <input id="swal-desconto" class="swal2-input" placeholder="Ex: 15% ou R$ 200,00" value="${escapeHtml(s.desconto_concedido || '')}">`,
      showCancelButton: true,
      confirmButtonText: '💾 Salvar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f97316',
      preConfirm: () => document.getElementById('swal-desconto').value.trim()
    });
    if (!result.isConfirmed) return;
    const val = result.value;
    const { error } = await cliente.from('interesse_vagas').update({ desconto_concedido: val || null }).eq('id', id);
    if (error) { showToast('❌ Erro: ' + error.message); return; }
    s.desconto_concedido = val || null;
    document.getElementById('fin-desconto-display').innerHTML = val
      ? `<span style="font-size:0.95rem;font-weight:700;color:#15803d">${escapeHtml(val)}</span>`
      : '<span style="color:var(--gray);font-size:0.85rem">Não informado</span>';
    await registrarLog('editar_financeiro', 'interesse_vagas', id, `Desconto concedido: ${val || 'removido'}`);
    showToast('✅ Desconto atualizado!');

  } else {
    const valorInicial = s.permuta_aceita === true ? 'sim' : s.permuta_aceita === false ? 'nao' : 'nd';

    const OPTS = [
      { val: 'sim', icon: '✅', label: 'Aceita',      bg: '#f0fdf4', border: '#22c55e', color: '#15803d' },
      { val: 'nao', icon: '❌', label: 'Não aceita',  bg: '#fef2f2', border: '#ef4444', color: '#dc2626' },
      { val: 'nd',  icon: '–',  label: 'Não definido', bg: '#f8fafc', border: '#94a3b8', color: '#64748b' }
    ];

    result = await Swal.fire({
      title: '<span style="font-size:1rem;font-weight:700">🔄 Decisão sobre Permuta</span>',
      html: `
        <div style="text-align:left;padding:0 0.125rem">
          <p style="font-size:0.82rem;color:#64748b;margin-bottom:1.125rem;line-height:1.5">
            Informe se a permuta solicitada pelo responsável foi aceita pela escola.
          </p>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.625rem;margin-bottom:1.25rem">
            ${OPTS.map(o => `
            <button type="button" class="permuta-opt-btn" data-val="${o.val}"
              style="padding:0.875rem 0.5rem;border-radius:0.625rem;border:2px solid ${o.val === valorInicial ? o.border : '#e2e8f0'};
                     background:${o.val === valorInicial ? o.bg : 'white'};color:${o.val === valorInicial ? o.color : '#94a3b8'};
                     cursor:pointer;transition:all 0.15s;font-family:inherit;width:100%">
              <div style="font-size:1.4rem;margin-bottom:0.35rem;line-height:1">${o.icon}</div>
              <div style="font-size:0.78rem;font-weight:700;line-height:1.3">${o.label}</div>
            </button>`).join('')}
          </div>

          <div id="condicoes-wrap" style="display:${valorInicial === 'sim' ? 'block' : 'none'}">
            <label style="font-size:0.78rem;font-weight:700;color:#475569;display:block;margin-bottom:0.375rem;text-transform:uppercase;letter-spacing:0.04em">Condições acordadas</label>
            <textarea id="swal-condicoes" rows="6"
              style="width:100%;padding:0.625rem 0.75rem;border:1.5px solid #e2e8f0;border-radius:0.5rem;font-size:0.85rem;font-family:inherit;resize:vertical;outline:none;color:#0f172a;line-height:1.5;min-height:120px"
              placeholder="Descreva as condições da permuta...">${escapeHtml(s.condicoes_permuta_aceita || '')}</textarea>
          </div>

          <input type="hidden" id="permuta-valor" value="${valorInicial}">
        </div>`,
      showCancelButton: true,
      confirmButtonText: '💾 Salvar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#94a3b8',
      width: '420px',
      didOpen: (popup) => {
        const OPTS_MAP = { sim: OPTS[0], nao: OPTS[1], nd: OPTS[2] };
        popup.querySelectorAll('.permuta-opt-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const val = btn.dataset.val;
            popup.querySelector('#permuta-valor').value = val;
            popup.querySelectorAll('.permuta-opt-btn').forEach(b => {
              b.style.background   = 'white';
              b.style.borderColor  = '#e2e8f0';
              b.style.color        = '#94a3b8';
            });
            const o = OPTS_MAP[val];
            btn.style.background  = o.bg;
            btn.style.borderColor = o.border;
            btn.style.color       = o.color;
            const wrap = popup.querySelector('#condicoes-wrap');
            if (wrap) wrap.style.display = val === 'sim' ? 'block' : 'none';
          });
        });
      },
      preConfirm: () => ({
        aceita: document.getElementById('permuta-valor').value,
        condicoes: document.getElementById('swal-condicoes')?.value?.trim() || ''
      })
    });
    if (!result.isConfirmed) return;
    const { aceita, condicoes } = result.value;
    const permutaVal = aceita === 'sim' ? true : aceita === 'nao' ? false : null;
    const { error } = await cliente.from('interesse_vagas')
      .update({ permuta_aceita: permutaVal, condicoes_permuta_aceita: condicoes || null })
      .eq('id', id);
    if (error) { showToast('❌ Erro: ' + error.message); return; }
    s.permuta_aceita = permutaVal;
    s.condicoes_permuta_aceita = condicoes || null;
    document.getElementById('fin-permuta-display').innerHTML =
      permutaVal !== null
        ? `<span style="font-size:0.875rem;font-weight:700;color:${permutaVal ? '#15803d' : '#dc2626'}">${permutaVal ? '✅ Aceita' : '❌ Não aceita'}</span>`
          + (permutaVal && condicoes ? `<p style="font-size:0.82rem;color:var(--gray-dark);margin:0.25rem 0 0">${escapeHtml(condicoes)}</p>` : '')
        : '<span style="color:var(--gray);font-size:0.85rem">Não informado</span>';
    await registrarLog('editar_financeiro', 'interesse_vagas', id, `Permuta: ${aceita} — ${condicoes || '–'}`);
    showToast('✅ Permuta atualizada!');
  }
}

async function imprimirFicha(id) {
  const s = todasSolicitacoes.find(x => x.id === id);
  if (!s) return;

  const resp    = s.responsavel || {};
  const alunos  = s.alunos || [];
  const dataFmt = new Date(s.created_at).toLocaleString('pt-BR');
  const updFmt  = s.updated_at ? new Date(s.updated_at).toLocaleString('pt-BR') : '–';

  const totalAlunos = alunos.length;
  const aprov       = alunos.filter(a => a.status_aluno === 'aprovado').length;
  const matr        = alunos.filter(a => a.status_aluno === 'matriculado').length;
  const temRessalva = s.status === 'aprovado' && totalAlunos > 0 && (aprov + matr) < totalAlunos;
  const badgeLabel  = temRessalva ? 'Aprovada com ressalvas' : (STATUS_LABEL[s.status] || s.status);

  // Buscar histórico
  const { data: hist } = await cliente
    .from('historico_solicitacoes')
    .select('descricao, autor_nome, autor_tipo, created_at')
    .eq('interesse_id', id)
    .order('created_at', { ascending: true });

  const STATUS_BG = { pendente:'#fef3c7', em_analise:'#eff6ff', aprovado:'#dcfce7', reprovado:'#fee2e2', cancelado:'#f5f3ff', matriculado:'#ecfeff' };
  const STATUS_CL = { pendente:'#92400e', em_analise:'#1e40af', aprovado:'#15803d', reprovado:'#b91c1c', cancelado:'#7c3aed', matriculado:'#0e7490' };
  const STATUS_BD = { pendente:'#fde68a', em_analise:'#bfdbfe', aprovado:'#bbf7d0', reprovado:'#fecaca', cancelado:'#ddd6fe', matriculado:'#a5f3fc' };
  const ALUNO_CL  = { pendente:'#92400e', aprovado:'#15803d', reprovado:'#b91c1c', matriculado:'#0e7490' };
  const ALUNO_BG  = { pendente:'#fef3c7', aprovado:'#dcfce7', reprovado:'#fee2e2', matriculado:'#ecfeff' };
  const ALUNO_BD  = { pendente:'#fde68a', aprovado:'#bbf7d0', reprovado:'#fecaca', matriculado:'#a5f3fc' };

  const alunosCardHtml = alunos.map((a, i) => {
    const alocacao  = a.alocacoes?.[0];
    const turmaInfo = alocacao?.turmas
      ? `${alocacao.turmas.serie} – ${alocacao.turmas.nome_turma} (${TURNO_LABEL_FULL[alocacao.turmas.turno] || alocacao.turmas.turno})`
      : null;
    const st  = a.status_aluno || 'pendente';
    const lbl = STATUS_ALUNO_LABEL[st] || st;
    const extra = turmaInfo
      ? ` · 🏫 ${turmaInfo}`
      : (a.motivo_reprovacao ? ` · ✕ ${a.motivo_reprovacao}` : '');
    return `
      <div style="display:flex;align-items:center;gap:8px;padding:5px 10px;border:1px solid #e2e8f0;border-left:3px solid ${ALUNO_BD[st]||'#e2e8f0'};border-radius:5px;background:white;margin-bottom:4px">
        <div style="width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#60a5fa);color:white;font-weight:800;font-size:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i+1}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:10px;color:#0f172a">${a.nome_aluno}</div>
          <div style="font-size:8.5px;color:#64748b;margin-top:1px">${SEGMENTO_LABEL[a.segmento] || a.segmento} · ${a.turma} · ${TURNO_LABEL[a.turno] || a.turno}${extra}</div>
        </div>
        <span style="font-size:7.5px;font-weight:800;text-transform:uppercase;padding:2px 7px;border-radius:20px;background:${ALUNO_BG[st]};color:${ALUNO_CL[st]};border:1px solid ${ALUNO_BD[st]};white-space:nowrap;flex-shrink:0">${lbl}</span>
      </div>`;
  }).join('');

  const histTimelineHtml = (hist || []).length ? (hist || []).map(h => {
    const isColab = h.autor_tipo === 'colaborador';
    return `
      <div style="display:flex;gap:7px;align-items:flex-start;padding:4px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:20px;height:20px;border-radius:50%;background:${isColab ? '#fff7ed' : '#eff6ff'};border:1.5px solid ${isColab ? '#fed7aa' : '#bfdbfe'};display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0">${isColab ? '🏫' : '👤'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:9px;font-weight:600;color:#0f172a;line-height:1.4">${h.descricao}</div>
          <div style="font-size:8px;color:#94a3b8;margin-top:1px">${new Date(h.created_at).toLocaleString('pt-BR')} · <span style="font-weight:600;color:${isColab ? '#ea580c' : '#2563eb'}">${isColab ? 'Equipe Plenus' : (h.autor_nome || 'Responsável')}</span></div>
        </div>
      </div>`;
  }).join('') : '<div style="color:#94a3b8;font-size:9px;padding:4px 0">Sem registros no histórico.</div>';

  const temDecisao = s.desconto_concedido || (s.permuta_aceita !== null && s.permuta_aceita !== undefined);

  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html lang="pt-br"><head>
    <meta charset="UTF-8">
    <title>Ficha de Atendimento – ${resp.nome || ''}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { height: 100%; }
      body { font-family: 'Inter', system-ui, sans-serif; font-size: 10px; color: #1e293b; background: white; }
      .page { height: 100%; display: flex; flex-direction: column; }

      /* Header */
      .doc-header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
      .doc-logo { display: flex; align-items: center; gap: 8px; }
      .doc-logo-icon { width: 30px; height: 30px; background: rgba(59,130,246,.2); border: 1px solid rgba(59,130,246,.35); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
      .doc-logo-text { font-size: 12px; font-weight: 800; line-height: 1.2; }
      .doc-logo-sub  { font-size: 7.5px; color: #f97316; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; margin-top: 1px; }
      .doc-meta { text-align: right; }
      .doc-title { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: rgba(255,255,255,.6); }
      .doc-gen   { font-size: 8.5px; color: rgba(255,255,255,.4); margin-top: 2px; }

      /* Status strip */
      .status-strip { background: ${STATUS_BG[s.status] || '#f8fafc'}; border-bottom: 2px solid ${STATUS_BD[s.status] || '#e2e8f0'}; padding: 5px 20px; display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
      .status-badge { display: inline-flex; align-items: center; padding: 2px 10px; border-radius: 20px; font-size: 8.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; background: ${STATUS_BG[s.status]}; color: ${STATUS_CL[s.status]}; border: 1px solid ${STATUS_BD[s.status]}; }
      .status-dates { font-size: 8.5px; color: #64748b; }

      /* Content wrapper */
      .content { padding: 12px 20px 8px; display: flex; flex-direction: column; gap: 10px; flex: 1; overflow: hidden; }

      /* Two-column row */
      .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; }

      /* Anotações */
      .anotacoes-wrap { display: flex; flex-direction: column; flex: 1; min-height: 0; }
      .anotacoes-area { flex: 1; border: 1.5px dashed #cbd5e1; border-radius: 6px; background: #fafafa; min-height: 0; }

      /* Section */
      .sec { margin-bottom: 10px; }
      .sec-title { font-size: 7.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #94a3b8; margin-bottom: 5px; display: flex; align-items: center; gap: 5px; }
      .sec-title::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }

      /* Info grid */
      .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; }
      .info-cell { padding: 5px 9px; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
      .info-cell:nth-child(even) { border-right: none; }
      .info-cell:nth-last-child(-n+2) { border-bottom: none; }
      .info-cell:last-child:nth-child(odd) { border-bottom: none; }
      .info-cell.full { grid-column: 1 / -1; border-right: none; }
      .info-lbl { font-size: 7px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #94a3b8; margin-bottom: 2px; }
      .info-val { font-size: 9.5px; font-weight: 600; color: #0f172a; line-height: 1.4; }

      /* Decisão da escola */
      .decisao-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; overflow: hidden; margin-top: 6px; }
      .decisao-header { background: #dcfce7; padding: 4px 9px; font-size: 7.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #15803d; border-bottom: 1px solid #bbf7d0; }
      .decisao-grid { display: grid; grid-template-columns: 1fr 1fr; }
      .decisao-cell { padding: 5px 9px; border-right: 1px solid #bbf7d0; }
      .decisao-cell:last-child { border-right: none; }

      /* Ressalva */
      .ressalva { background: #fef3c7; border: 1px solid #fde68a; border-left: 3px solid #f59e0b; padding: 4px 10px; font-size: 8.5px; color: #92400e; border-radius: 0 5px 5px 0; }

      /* Footer */
      .doc-footer { border-top: 1px solid #e2e8f0; padding: 5px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 8px; color: #94a3b8; flex-shrink: 0; }

      @page { size: landscape; margin: 6mm 8mm; }
      @media print {
        body { background: white; }
        .doc-header  { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .status-strip { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .decisao-box  { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    </style>
  </head><body>
  <div class="page">

    <!-- Cabeçalho -->
    <div class="doc-header">
      <div class="doc-logo">
        <div class="doc-logo-icon">🏫</div>
        <div>
          <div class="doc-logo-text">Colégio Plenus</div>
          <div class="doc-logo-sub">Sistema de Vagas</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title">Ficha de Atendimento</div>
        <div class="doc-gen">Gerada em ${new Date().toLocaleString('pt-BR')}</div>
      </div>
    </div>

    <!-- Faixa de status -->
    <div class="status-strip">
      <span class="status-badge">${badgeLabel}</span>
      <span class="status-dates">Solicitado em ${dataFmt} · Atualizado em ${updFmt}</span>
    </div>

    <div class="content">

      ${temRessalva ? `<div class="ressalva">⚠️ <strong>Aprovada com ressalvas:</strong> ${aprov} de ${totalAlunos} aluno${totalAlunos !== 1 ? 's' : ''} aprovado${aprov !== 1 ? 's' : ''}.</div>` : ''}

      <div class="cols">

      <!-- Coluna esquerda: Responsável + Alunos -->
      <div>
        <div class="sec">
          <div class="sec-title">👤 Responsável</div>
          <div class="info-grid">
            <div class="info-cell"><div class="info-lbl">Nome</div><div class="info-val">${resp.nome || '–'}</div></div>
            <div class="info-cell"><div class="info-lbl">Telefone</div><div class="info-val">${resp.telefone || '–'}</div></div>
            <div class="info-cell full"><div class="info-lbl">E-mail</div><div class="info-val">${resp.email || '–'}</div></div>
          </div>
        </div>
        <div class="sec">
          <div class="sec-title">🎒 Alunos (${alunos.length})</div>
          ${alunosCardHtml || '<div style="color:#94a3b8;font-size:9px">Nenhum aluno cadastrado.</div>'}
        </div>
      </div>

      <!-- Coluna direita: Motivos + Financeiro + Histórico -->
      <div>
        <div class="sec">
          <div class="sec-title">📝 Motivos</div>
          <div class="info-grid">
            <div class="info-cell full" style="border-bottom:1px solid #e2e8f0">
              <div class="info-lbl">Motivo da Transferência</div>
              <div class="info-val" style="font-weight:400;color:#334155;line-height:1.5">${s.motivo_transferencia || '–'}</div>
            </div>
            <div class="info-cell full">
              <div class="info-lbl">Por que escolheu o Colégio Plenus</div>
              <div class="info-val" style="font-weight:400;color:#334155;line-height:1.5">${s.motivo_escolha_plenus || '–'}</div>
            </div>
          </div>
        </div>
        <div class="sec">
          <div class="sec-title">💰 Financeiro</div>
          <div class="info-grid">
            <div class="info-cell"><div class="info-lbl">Mensalidade Atual</div><div class="info-val">${s.valor_mensalidade_anterior ? formatarMoedaExibicao(s.valor_mensalidade_anterior) : '–'}</div></div>
            <div class="info-cell"><div class="info-lbl">Desconto Almejado</div><div class="info-val">${s.taxa_desconto_almejada ? s.taxa_desconto_almejada + '%' : '–'}</div></div>
            <div class="info-cell"><div class="info-lbl">Possui Desconto Atual</div><div class="info-val">${s.tem_desconto ? 'Sim' : 'Não'}${s.tem_desconto && s.descricao_desconto ? ' — ' + s.descricao_desconto : ''}</div></div>
            <div class="info-cell"><div class="info-lbl">Permuta Solicitada</div><div class="info-val">${PERMUTA_LABEL[s.tipo_permuta] || '–'}${s.tipo_permuta !== 'nao' && s.descricao_permuta ? ' — ' + s.descricao_permuta : ''}</div></div>
          </div>
          ${temDecisao ? `
          <div class="decisao-box">
            <div class="decisao-header">✅ Decisão da Escola</div>
            <div class="decisao-grid">
              <div class="decisao-cell"><div class="info-lbl">Desconto Concedido</div><div class="info-val" style="color:#15803d">${s.desconto_concedido || '–'}</div></div>
              <div class="decisao-cell"><div class="info-lbl">Permuta</div><div class="info-val" style="color:${s.permuta_aceita ? '#15803d' : '#b91c1c'}">${s.permuta_aceita === true ? 'Aceita' : s.permuta_aceita === false ? 'Não aceita' : '–'}${s.permuta_aceita && s.condicoes_permuta_aceita ? ' — ' + s.condicoes_permuta_aceita : ''}</div></div>
            </div>
          </div>` : ''}
        </div>
        <div class="sec">
          <div class="sec-title">🕐 Histórico (${(hist||[]).length})</div>
          ${histTimelineHtml}
        </div>
      </div>

      </div><!-- /cols -->

      <!-- Anotações -->
      <div class="anotacoes-wrap">
        <div class="sec-title">✏️ Anotações do atendimento</div>
        <div class="anotacoes-area"></div>
      </div>

    </div>

    <div class="doc-footer">
      <span>Colégio Plenus · Sistema de Gestão de Vagas</span>
      <span>Documento gerado automaticamente</span>
    </div>

  </div>
  <script>window.onload = () => { window.print(); }</script>
  </body></html>`);
  win.document.close();
}

function fecharModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
  solicitacaoAtualId = null;
  // NÃO limpa obsEditandoId aqui — pode ser usado pelo fluxo de status
}

function fecharModalClick(event) {
  if (event.target === document.getElementById('modal-overlay')) fecharModal();
}

// ============================================================
//  ALUNOS INDIVIDUAIS
// ============================================================
const STATUS_ALUNO_LABEL = { pendente: 'Pendente', aprovado: 'Aprovado', reprovado: 'Reprovado', matriculado: 'Matriculado' };
const STATUS_ALUNO_CLS   = { pendente: 'status-pendente', aprovado: 'status-aprovado', reprovado: 'status-reprovado', matriculado: 'status-matriculado' };

function renderAlunosDetalhe(alunos, interesseId) {
  if (!alunos.length) return '<p style="padding:1rem;color:var(--gray);font-size:0.85rem">Nenhum aluno cadastrado.</p>';
  return alunos.map((a, i) => {
    const statusAluno = a.status_aluno || 'pendente';
    const aprovado    = statusAluno === 'aprovado';
    const reprovado   = statusAluno === 'reprovado';
    const matriculado = statusAluno === 'matriculado';
    const alocacao    = a.alocacoes?.[0];
    const turmaInfo   = alocacao?.turmas
      ? `${alocacao.turmas.serie} – ${alocacao.turmas.nome_turma} (${TURNO_LABEL_FULL[alocacao.turmas.turno] || alocacao.turmas.turno})`
      : null;

    const infoBody = [
      reprovado && a.motivo_reprovacao ? `
        <div class="aluno-detalhe-card-body">
          <div style="background:#fee2e2;border:1px solid #fecaca;border-radius:0.375rem;padding:0.5rem 0.75rem;font-size:0.78rem;color:#b91c1c">
            ✕ <strong>Motivo da reprovação:</strong> ${escapeHtml(a.motivo_reprovacao)}
          </div>
        </div>` : '',
      aprovado ? `
        <div class="aluno-detalhe-card-body">
          <div id="aluno-enturma-${a.id}" style="background:${turmaInfo ? '#f0fdf4' : '#fffbeb'};border:1px solid ${turmaInfo ? '#bbf7d0' : '#fde68a'};border-radius:0.375rem;padding:0.5rem 0.75rem;font-size:0.78rem;color:${turmaInfo ? '#15803d' : '#92400e'}">
            ${turmaInfo
              ? `🏫 <strong>Enturmado:</strong> ${escapeHtml(turmaInfo)} <span style="color:#0e7490;margin-left:0.25rem">· Aguardando finalização</span>`
              : `⏳ <strong>Aguardando enturmação</strong> — aprovado mas não alocado em nenhuma turma`}
          </div>
        </div>` : '',
      matriculado ? `
        <div class="aluno-detalhe-card-body">
          <div style="background:#ecfeff;border:1px solid #a5f3fc;border-radius:0.375rem;padding:0.5rem 0.75rem;font-size:0.78rem;color:#0e7490">
            🎓 <strong>Matriculado</strong> — para reverter, cancele a solicitação.
          </div>
        </div>` : ''
    ].filter(Boolean).join('');

    return `
      <div class="aluno-detalhe-card aluno-${statusAluno}" id="aluno-row-${a.id}">

        <!-- Cabeçalho do card -->
        <div class="aluno-detalhe-card-head">
          <div class="aluno-num-badge">${i + 1}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:0.9rem;color:var(--navy-mid);line-height:1.25">${escapeHtml(a.nome_aluno)}</div>
            <div style="font-size:0.75rem;color:var(--gray-dark);margin-top:0.1rem">${SEGMENTO_LABEL[a.segmento] || a.segmento} · ${a.turma} · ${TURNO_LABEL[a.turno] || a.turno}</div>
          </div>
          <span class="status-badge ${STATUS_ALUNO_CLS[statusAluno]}" id="aluno-badge-${a.id}" style="font-size:0.65rem;flex-shrink:0">${STATUS_ALUNO_LABEL[statusAluno]}</span>
        </div>

        ${infoBody}

        <!-- Form de reprovação (hidden) -->
        <div id="form-reprovacao-${a.id}" class="aluno-detalhe-card-form">
          <textarea id="motivo-reprovacao-${a.id}" rows="2" placeholder="Descreva o motivo da reprovação deste aluno..." style="font-size:0.82rem"></textarea>
          <div style="display:flex;gap:0.5rem;justify-content:flex-end">
            <button class="btn btn-secondary btn-sm" onclick="cancelarReprovacaoAluno('${a.id}')">Cancelar</button>
            <button class="btn btn-danger btn-sm" onclick="confirmarReprovacaoAluno('${a.id}','${interesseId}')">✕ Confirmar Reprovação</button>
          </div>
        </div>

        <!-- Ações -->
        <div id="aluno-acoes-${a.id}" class="aluno-detalhe-card-actions">
          ${matriculado ? `
            <span style="font-size:0.78rem;color:#0e7490;font-style:italic;padding:0.1rem 0">✔ Matriculado</span>
          ` : `
            ${!aprovado && !reprovado ? `<button class="btn btn-success btn-sm" onclick="aprovarAluno('${a.id}','${interesseId}')">✅ Aprovar</button>` : ''}
            ${aprovado && turmaInfo  ? `<button class="btn btn-primary btn-sm" onclick="confirmarMatriculaAluno('${a.id}','${interesseId}')">🎓 Matricular</button>` : ''}
            ${aprovado && !turmaInfo ? `<button class="btn btn-primary btn-sm" disabled title="Enturme o aluno antes de matricular" style="opacity:0.45;cursor:not-allowed">🎓 Matricular</button>` : ''}
            ${!reprovado ? `<button class="btn btn-danger btn-sm" onclick="abrirReprovacaoAluno('${a.id}','${interesseId}')">✕ Reprovar</button>` : ''}
            ${(aprovado || reprovado) ? `<button class="btn btn-secondary btn-sm" onclick="resetarAluno('${a.id}','${interesseId}')">↩ Desfazer</button>` : ''}
          `}
        </div>

      </div>`;
  }).join('');
}

async function confirmarMatriculaAluno(alunoId, interesseId) {
  const sol   = todasSolicitacoes.find(s => s.id === interesseId);
  const aluno = sol?.alunos?.find(a => a.id === alunoId);
  if (!aluno) return;

  const alocacao  = aluno.alocacoes?.[0];
  const turmaInfo = alocacao?.turmas
    ? `${alocacao.turmas.serie} – ${alocacao.turmas.nome_turma} (${TURNO_LABEL_FULL[alocacao.turmas.turno] || alocacao.turmas.turno})`
    : null;

  if (!turmaInfo) {
    showToast('⚠️ Enturme o aluno antes de matricular.');
    return;
  }

  const nomeColaborador = document.getElementById('sidebar-nome').textContent.trim() || 'Colaborador';
  const txtTurma = turmaInfo ? `\n\nTurma: ${turmaInfo}` : '';
  const nota = FRASES_STATUS['matriculado'] + txtTurma;

  const { isConfirmed } = await Swal.fire({
    title: '🎓 Confirmar matrícula?',
    html: `<p style="font-size:0.875rem">Confirmar matrícula de <strong>${escapeHtml(aluno.nome_aluno)}</strong>?</p>
           ${turmaInfo ? `<p style="font-size:0.82rem;color:#0e7490;margin-top:0.4rem">🏫 Turma: ${escapeHtml(turmaInfo)}</p>` : ''}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '🎓 Confirmar matrícula',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#0e7490'
  });
  if (!isConfirmed) return;

  // Verifica se todos os alunos da solicitação estão matriculados após esta ação
  const todosAlunos   = sol?.alunos || [];
  const outrosNaoMatr = todosAlunos.filter(a => a.id !== alunoId && a.status_aluno !== 'matriculado');

  // Atualiza o status do aluno para matriculado
  const { error } = await cliente.from('alunos')
    .update({ status_aluno: 'matriculado' })
    .eq('id', alunoId);
  if (error) { showToast('❌ Erro: ' + error.message); return; }

  aluno.status_aluno = 'matriculado';

  // Se todos os alunos agora estão matriculados, muda a solicitação para matriculado
  if (outrosNaoMatr.length === 0) {
    const { data: updSolic, error: errSolic } = await cliente.from('interesse_vagas')
      .update({ status: 'matriculado' })
      .eq('id', interesseId)
      .select('id');
    if (errSolic) { showToast('❌ Erro ao confirmar solicitação: ' + errSolic.message); return; }
    if (!updSolic?.length) { showToast('❌ Sem permissão para atualizar a solicitação. Verifique as políticas RLS.'); return; }
    if (sol) sol.status = 'matriculado';
    await registrarHistorico(interesseId, nota, nomeColaborador);
    await registrarLog('matricular_aluno', 'alunos', alunoId, `${aluno.nome_aluno} matriculado — solicitação concluída`);
    showToast('🎓 Solicitação confirmada! Todos os alunos matriculados.');
  } else {
    await registrarHistorico(interesseId, `Aluno ${aluno.nome_aluno} matriculado.${txtTurma}`, nomeColaborador);
    await registrarLog('matricular_aluno', 'alunos', alunoId, `${aluno.nome_aluno} matriculado individualmente`);
    showToast(`🎓 ${aluno.nome_aluno} matriculado!`);
  }

  await carregarSolicitacoes();
  await carregarStats();
  abrirDetalhe(interesseId);
}

async function aprovarAluno(alunoId, interesseId) {
  const { data: upd, error } = await cliente.from('alunos')
    .update({ status_aluno: 'aprovado', motivo_reprovacao: null })
    .eq('id', alunoId)
    .select('id');
  if (error) { showToast('❌ Erro: ' + error.message); return; }
  if (!upd?.length) { showToast('❌ Sem permissão para atualizar este aluno. Verifique as políticas RLS.'); return; }

  const s    = todasSolicitacoes.find(x => x.id === interesseId);
  const aluno = s?.alunos?.find(a => a.id === alunoId);
  if (aluno) { aluno.status_aluno = 'aprovado'; aluno.motivo_reprovacao = null; }

  const nome = aluno?.nome_aluno || 'Aluno';
  const nomeColab = document.getElementById('sidebar-nome').textContent.trim() || 'Colaborador';
  await registrarHistorico(interesseId, `Aluno "${nome}" aprovado.`, nomeColab);
  await atualizarStatusGeral(interesseId);

  recarregarAlunosDetalhe(interesseId);
  showToast(`✅ ${nome} aprovado!`);
}

function abrirReprovacaoAluno(alunoId) {
  document.getElementById(`form-reprovacao-${alunoId}`).style.display = 'flex';
  document.getElementById(`aluno-acoes-${alunoId}`).style.display     = 'none';
  document.getElementById(`motivo-reprovacao-${alunoId}`).focus();
}

function cancelarReprovacaoAluno(alunoId) {
  document.getElementById(`form-reprovacao-${alunoId}`).style.display = 'none';
  document.getElementById(`aluno-acoes-${alunoId}`).style.display     = 'flex';
}

async function confirmarReprovacaoAluno(alunoId, interesseId) {
  const motivo = document.getElementById(`motivo-reprovacao-${alunoId}`).value.trim();
  if (!motivo) { showToast('⚠️ Descreva o motivo da reprovação.'); return; }

  const { data: upd, error } = await cliente.from('alunos')
    .update({ status_aluno: 'reprovado', motivo_reprovacao: motivo })
    .eq('id', alunoId)
    .select('id');
  if (error) { showToast('❌ Erro: ' + error.message); return; }
  if (!upd?.length) { showToast('❌ Sem permissão para atualizar este aluno. Verifique as políticas RLS.'); return; }

  const s    = todasSolicitacoes.find(x => x.id === interesseId);
  const aluno = s?.alunos?.find(a => a.id === alunoId);
  if (aluno) { aluno.status_aluno = 'reprovado'; aluno.motivo_reprovacao = motivo; }

  const nome = aluno?.nome_aluno || 'Aluno';
  const nomeColab = document.getElementById('sidebar-nome').textContent.trim() || 'Colaborador';
  await registrarHistorico(interesseId, `Aluno "${nome}" reprovado. Motivo: ${motivo}`, nomeColab);
  await atualizarStatusGeral(interesseId);

  recarregarAlunosDetalhe(interesseId);
  showToast(`✕ ${nome} reprovado.`);
}

async function resetarAluno(alunoId, interesseId) {
  const s     = todasSolicitacoes.find(x => x.id === interesseId);
  const aluno = s?.alunos?.find(a => a.id === alunoId);
  const nome  = aluno?.nome_aluno || 'Aluno';

  const alocacao  = aluno?.alocacoes?.[0];
  const turmaInfo = alocacao?.turmas
    ? `${alocacao.turmas.serie} – ${alocacao.turmas.nome_turma}`
    : null;

  // Confirmação com aviso de desenturmação se aplicável
  const { isConfirmed } = await Swal.fire({
    icon: 'warning',
    title: `Desfazer status de ${escapeHtml(nome)}?`,
    html: turmaInfo
      ? `<p style="font-size:0.875rem;color:#475569;line-height:1.6">
           O aluno voltará para <strong>Pendente</strong>.<br><br>
           ⚠️ <strong>${escapeHtml(nome)}</strong> está enturmado em <strong>${escapeHtml(turmaInfo)}</strong> e será <strong>removido da turma</strong>.
         </p>`
      : `<p style="font-size:0.875rem;color:#475569;line-height:1.6">
           O aluno voltará para <strong>Pendente</strong>.
         </p>`,
    showCancelButton: true,
    confirmButtonText: 'Sim, desfazer',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#f97316'
  });
  if (!isConfirmed) return;

  // Remover alocação se existir
  if (alocacao?.id) {
    const { error: errAloc } = await cliente.from('alocacoes').delete().eq('id', alocacao.id);
    if (errAloc) { showToast('❌ Erro ao remover da turma: ' + errAloc.message); return; }
    // Atualizar cache local
    aluno.alocacoes = [];
  }

  const { data: upd, error } = await cliente.from('alunos')
    .update({ status_aluno: 'pendente', motivo_reprovacao: null })
    .eq('id', alunoId)
    .select('id');
  if (error) { showToast('❌ Erro: ' + error.message); return; }
  if (!upd?.length) { showToast('❌ Sem permissão para atualizar este aluno. Verifique as políticas RLS.'); return; }

  if (aluno) { aluno.status_aluno = 'pendente'; aluno.motivo_reprovacao = null; }

  const nomeColab = document.getElementById('sidebar-nome').textContent.trim() || 'Colaborador';
  const notaHist  = turmaInfo
    ? `Status do aluno "${nome}" revertido para Pendente. Removido da turma ${turmaInfo}.`
    : `Status do aluno "${nome}" revertido para Pendente.`;
  await registrarHistorico(interesseId, notaHist, nomeColab);
  await atualizarStatusGeral(interesseId);

  recarregarAlunosDetalhe(interesseId);
  showToast(turmaInfo ? `↩ ${nome} voltou para Pendente e foi removido da turma.` : `↩ ${nome} voltou para Pendente.`);
}

// Status dos alunos → só atualiza a solicitação se TODOS estiverem aprovados
async function atualizarStatusGeral(interesseId) {
  const s = todasSolicitacoes.find(x => x.id === interesseId);
  if (!s?.alunos?.length) return;

  const statuses    = s.alunos.map(a => a.status_aluno || 'pendente');
  const todosAprovados = statuses.every(st => st === 'aprovado');

  if (!todosAprovados) return; // só age se todos aprovados
  if (s.status === 'aprovado' || s.status === 'matriculado') return; // já está aprovado/matriculado

  const { error } = await cliente.from('interesse_vagas')
    .update({ status: 'aprovado' }).eq('id', interesseId);
  if (error) return;

  s.status = 'aprovado';
  await carregarStats();
  await carregarUltimasSolicitacoes();
  filtrarSolicitacoes();
}

function recarregarAlunosDetalhe(interesseId) {
  const s = todasSolicitacoes.find(x => x.id === interesseId);
  const container = document.getElementById('alunos-detalhe-lista');
  if (!container || !s) return;
  container.innerHTML = renderAlunosDetalhe(s.alunos || [], interesseId);
  carregarHistoricoModal(interesseId);
}

// ============================================================
//  HISTÓRICO
// ============================================================
function escapeHtml(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

async function registrarHistorico(interesseId, descricao, nomeAutor) {
  try {
    await cliente.from('historico_solicitacoes').insert({
      interesse_id: interesseId,
      descricao,
      autor_nome:  nomeAutor,
      autor_tipo:  'colaborador'
    });
  } catch { /* não deve quebrar o fluxo */ }
}

async function carregarHistoricoModal(id) {
  const container = document.getElementById('historico-lista');
  if (!container) return;

  const { data } = await cliente
    .from('historico_solicitacoes')
    .select('descricao, autor_nome, autor_tipo, created_at')
    .eq('interesse_id', id)
    .order('created_at', { ascending: false });

  if (!data?.length) {
    container.innerHTML = '<p style="color:var(--gray);font-size:0.82rem">Nenhum registro ainda.</p>';
    atualizarUltimaNota(null);
    return;
  }

  container.innerHTML = data.map(h => `
    <div class="historico-item">
      <div class="historico-dot ${h.autor_tipo}"></div>
      <div class="historico-info">
        <span class="historico-desc">${escapeHtml(h.descricao)}</span>
        <span class="historico-meta">
          ${new Date(h.created_at).toLocaleString('pt-BR')} · ${escapeHtml(h.autor_nome)}
        </span>
      </div>
    </div>`).join('');

  // Exibe a nota mais recente na seção de status
  atualizarUltimaNota(data[0]);
}

function atualizarUltimaNota(h) {
  const wrap  = document.getElementById('ultima-nota-display');
  const texto = document.getElementById('ultima-nota-texto');
  const meta  = document.getElementById('ultima-nota-meta');
  if (!wrap) return;
  if (!h) { wrap.style.display = 'none'; return; }
  texto.textContent = h.descricao;
  meta.textContent  = `${new Date(h.created_at).toLocaleString('pt-BR')} · ${h.autor_nome}`;
  wrap.style.display = 'block';
}

// ============================================================
//  ATUALIZAR STATUS
// ============================================================
function gerarBotoesStatus(status, id) {
  const sol     = todasSolicitacoes.find(s => s.id === id);
  const nAlunos = (sol?.alunos || []).length;

  const acoes = {
    pendente:   [
      { s: 'em_analise', label: '🔍 Em Análise', cls: 'btn-secondary' },
      { s: 'aprovado',   label: '✅ Aprovar',    cls: 'btn-success'   }
    ],
    em_analise: [
      { s: 'pendente',   label: '↩ Pendente',   cls: 'btn-secondary' },
      // Aprovar na solicitação só quando 1 aluno; com múltiplos, aprovar individualmente
      ...(nAlunos <= 1 ? [{ s: 'aprovado', label: '✅ Aprovar', cls: 'btn-success' }] : []),
      { s: 'reprovado',  label: '✕ Reprovar',   cls: 'btn-danger'    }
    ],
    aprovado:    [
      // Matricular na solicitação só quando 1 aluno; com múltiplos, matricular individualmente
      ...(nAlunos <= 1 ? [{ s: 'matriculado', label: '🎓 Matricular', cls: 'btn-primary' }] : []),
      { s: 'cancelado',   label: '🚫 Cancelar',   cls: 'btn-danger'    }
    ],
    matriculado: [
      { s: 'cancelado',   label: '🚫 Cancelar',   cls: 'btn-danger'    }
    ],
    reprovado:   [
      { s: 'pendente',    label: '↩ Pendente',    cls: 'btn-secondary' }
    ],
    cancelado:   [
      { s: 'pendente',    label: '↩ Reabrir',     cls: 'btn-secondary' }
    ]
  };
  return (acoes[status] || [])
    .map(a => `<button class="btn ${a.cls} btn-sm" onclick="confirmarStatus('${id}','${a.s}')">${a.label}</button>`)
    .join('');
}

// ============================================================
//  MODAL DE GUIA DE ORIENTAÇÃO
// ============================================================
function abrirGuiaModal(id) {
  const s = todasSolicitacoes.find(x => x.id === id);
  if (!s) return;
  const guia = GUIAS[s.status];
  if (!guia) return;

  document.getElementById('guia-modal-titulo').textContent    = guia.titulo;
  document.getElementById('guia-modal-subtitulo').textContent = guia.subtitulo;
  document.getElementById('guia-modal-body').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:0.875rem">
      ${guia.etapas.map((e, i) => `
        <div style="display:flex;gap:0.875rem;align-items:flex-start;padding:0.875rem;background:var(--white-smoke);border-radius:var(--radius-sm);border:1px solid var(--gray-light)">
          <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--blue),#60a5fa);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0">${e.icon}</div>
          <div>
            <div style="font-size:0.825rem;font-weight:700;color:var(--navy-mid);margin-bottom:0.2rem">
              <span style="color:var(--gray);font-weight:600;margin-right:0.35rem">${i + 1}.</span>${e.titulo}
            </div>
            <div style="font-size:0.78rem;color:var(--gray-dark);line-height:1.55">${e.desc}</div>
          </div>
        </div>`).join('')}
    </div>`;

  document.getElementById('guia-modal-overlay').classList.add('active');
}

function fecharGuiaModal() {
  document.getElementById('guia-modal-overlay').classList.remove('active');
}

function fecharGuiaModalClick(event) {
  if (event.target === document.getElementById('guia-modal-overlay')) fecharGuiaModal();
}

// ============================================================
//  MODAL UNIFICADO: CONFIRMAÇÃO DE STATUS + NOTA
// ============================================================
const ACAO_CONFIG = {
  aprovado:    { titulo: '✅ Aprovar solicitação',        cor: '#15803d', bg: '#dcfce7', border: '#bbf7d0', texto: 'Ao confirmar, o status será alterado para Aprovada e a nota abaixo será registrada no histórico.' },
  reprovado:   { titulo: '✕ Reprovar solicitação',       cor: '#dc2626', bg: '#fee2e2', border: '#fecaca', texto: 'Ao confirmar, o status será alterado para Reprovado e a nota abaixo será registrada no histórico.' },
  em_analise:  { titulo: '🔍 Colocar em Análise',        cor: '#1e40af', bg: '#eff6ff', border: '#bfdbfe', texto: 'Ao confirmar, o status será alterado para Em Análise e a nota abaixo será registrada no histórico.' },
  pendente:    { titulo: '↩ Voltar para Pendente',       cor: '#b45309', bg: '#fef3c7', border: '#fde68a', texto: 'Ao confirmar, o status será alterado para Pendente e a nota abaixo será registrada no histórico.' },
  cancelado:   { titulo: '🚫 Cancelar solicitação',      cor: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', texto: 'Atenção: esta ação cancela uma solicitação já aprovada ou confirmada. O motivo é obrigatório e será registrado no histórico.', obrigatorio: true },
  matriculado: { titulo: '🎓 Confirmar Solicitação',     cor: '#0e7490', bg: '#ecfeff', border: '#a5f3fc', texto: 'Ao confirmar, a solicitação será marcada como Confirmada. O responsável será informado sobre a turma e a possibilidade de ajuste pedagógico.' }
};

function confirmarStatus(id, novoStatus) {
  if (novoStatus === 'aprovado') {
    executarStatusDireto(id, novoStatus);
    return;
  }

  const cfg = ACAO_CONFIG[novoStatus] || { titulo: 'Confirmar', cor: 'var(--navy-mid)', bg: '#f8fafc', border: '#e2e8f0', texto: 'Confirmar alteração de status?' };
  const statusAtual = STATUS_LABEL[todasSolicitacoes.find(s => s.id === id)?.status] || '–';

  document.getElementById('acao-modal-titulo').textContent    = cfg.titulo;
  document.getElementById('acao-modal-titulo').style.color    = cfg.cor;
  document.getElementById('acao-modal-subtitulo').textContent = `Status atual: ${statusAtual}`;

  const alerta = document.getElementById('acao-modal-alerta');
  alerta.textContent   = cfg.texto;
  alerta.style.background = cfg.bg;
  alerta.style.border     = `1px solid ${cfg.border}`;
  alerta.style.color      = cfg.cor;

  // Para matriculado: pré-preencher com turmas dos alunos enturmados
  if (novoStatus === 'matriculado') {
    const sol = todasSolicitacoes.find(s => s.id === id);
    const alunos = sol?.alunos || [];
    const linhasTurmas = alunos
      .filter(a => a.alocacoes?.[0]?.turmas)
      .map(a => {
        const t = a.alocacoes[0].turmas;
        return `• ${a.nome_aluno}: ${t.serie} – ${t.nome_turma} (${TURNO_LABEL_FULL[t.turno] || t.turno})`;
      });
    const listaAlunos = linhasTurmas.length
      ? '\n\nAluno(s) e turma(s):\n' + linhasTurmas.join('\n')
      : '';
    document.getElementById('acao-modal-textarea').value =
      FRASES_STATUS['matriculado'] + listaAlunos;
  } else {
    document.getElementById('acao-modal-textarea').value = FRASES_STATUS[novoStatus] || '';
  }

  const btnConfirmar = document.getElementById('btn-confirmar-acao');
  btnConfirmar.className = `btn btn-sm ${(novoStatus === 'reprovado' || novoStatus === 'cancelado') ? 'btn-danger' : novoStatus === 'matriculado' ? 'btn-primary' : 'btn-secondary'}`;
  btnConfirmar.onclick = () => executarAtualizacaoStatus(id, novoStatus);

  document.getElementById('acao-modal-overlay').classList.add('active');
}

// ---- Confirmação de atualização em massa dos alunos ----
async function pedirConfirmacaoAlunos(alunos, novoStatusAluno) {
  if (!alunos || !alunos.length) return true;

  const icone = { aprovado: '✅', reprovado: '✕', pendente: '⏳' };
  const cor   = { aprovado: '#15803d', reprovado: '#dc2626', pendente: '#b45309' };
  const label = STATUS_ALUNO_LABEL[novoStatusAluno] || novoStatusAluno;

  const listaHtml = alunos.map(a => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0.45rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;margin-bottom:0.3rem;font-size:0.82rem;gap:0.5rem">
      <span style="font-weight:600;color:#0f172a;text-align:left">${escapeHtml(a.nome_aluno)}</span>
      <span style="color:${cor[novoStatusAluno] || '#475569'};font-weight:700;white-space:nowrap">${icone[novoStatusAluno] || ''} ${label}</span>
    </div>`).join('');

  const { isConfirmed } = await Swal.fire({
    title: 'Atualizar status dos alunos?',
    html: `
      <p style="font-size:0.875rem;color:#475569;margin-bottom:0.875rem">
        A alteração da solicitação irá atualizar o status de <strong>${alunos.length} aluno${alunos.length !== 1 ? 's' : ''}</strong> para
        <strong style="color:${cor[novoStatusAluno] || '#475569'}">${label}</strong>:
      </p>
      <div style="max-height:220px;overflow-y:auto;margin-bottom:0.75rem">${listaHtml}</div>
      <p style="font-size:0.75rem;color:#94a3b8">Você poderá ajustar o status de cada aluno individualmente depois.</p>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: `Sim, atualizar todos`,
    cancelButtonText: 'Não, manter como estão',
    confirmButtonColor: cor[novoStatusAluno] || '#3b82f6',
    cancelButtonColor: '#64748b',
    reverseButtons: true,
    customClass: { popup: 'swal-wide' }
  });

  return isConfirmed;
}

// Mapeia status da solicitação → status que os alunos devem ter
// matriculado = null → não altera o status dos alunos
function _statusAlunoParaSolic(novoStatus) {
  const mapa = {
    aprovado:   'aprovado',
    reprovado:  'reprovado',
    pendente:   'pendente',
    em_analise: 'pendente',
    cancelado:  'pendente',
    matriculado: null        // não altera alunos
  };
  return mapa[novoStatus] ?? 'pendente';
}

async function executarStatusDireto(id, novoStatus) {
  const solAtual       = todasSolicitacoes.find(s => s.id === id);
  const statusAnterior = STATUS_LABEL[solAtual?.status] || '–';
  const todosAlunos    = solAtual?.alunos || [];
  const statusAluno    = _statusAlunoParaSolic(novoStatus);

  // Só mostra modal e atualiza alunos cujo status vai de fato mudar
  const alunosAfetados = statusAluno !== null
    ? todosAlunos.filter(a => a.status_aluno !== statusAluno)
    : [];

  if (alunosAfetados.length > 0) {
    const confirmar = await pedirConfirmacaoAlunos(alunosAfetados, statusAluno);
    if (!confirmar) return;
  }

  const { data: atualizado, error } = await cliente
    .from('interesse_vagas')
    .update({ status: novoStatus })
    .eq('id', id)
    .select('id');

  if (error) { showToast('❌ Erro ao salvar: ' + error.message); return; }
  if (!atualizado?.length) { showToast('❌ Sem permissão. Verifique se seu usuário é colaborador ativo.'); return; }

  const nomeColaborador = document.getElementById('sidebar-nome').textContent.trim() || 'Colaborador';

  if (statusAluno !== null && alunosAfetados.length > 0) {
    await cliente.from('alunos').update({ status_aluno: statusAluno, motivo_reprovacao: null })
      .in('id', alunosAfetados.map(a => a.id));
    alunosAfetados.forEach(a => { a.status_aluno = statusAluno; a.motivo_reprovacao = null; });
  }

  await registrarHistorico(id, `Status alterado de "${statusAnterior}" para "${STATUS_LABEL[novoStatus]}"`, nomeColaborador);

  const notaFinal = FRASES_STATUS[novoStatus] || '';
  if (notaFinal) await registrarHistorico(id, notaFinal, nomeColaborador);

  await registrarLog('alterar_status', 'interesse_vagas', id, `Status alterado para "${STATUS_LABEL[novoStatus]}"`);

  if (solAtual) solAtual.status = novoStatus;
  fecharModal();
  showToast(`✅ Status: ${STATUS_LABEL[novoStatus]}`);
  await carregarSolicitacoes();
  await carregarStats();
  await carregarUltimasSolicitacoes();
}

function fecharAcaoModal() {
  document.getElementById('acao-modal-overlay').classList.remove('active');
}

function fecharAcaoModalClick(event) {
  if (event.target === document.getElementById('acao-modal-overlay')) fecharAcaoModal();
}

async function executarAtualizacaoStatus(id, novoStatus) {
  const btn  = document.getElementById('btn-confirmar-acao');
  const nota = document.getElementById('acao-modal-textarea').value.trim();

  const cfg = ACAO_CONFIG[novoStatus] || {};
  if (cfg.obrigatorio && !nota) {
    const alertEl = document.getElementById('acao-modal-alerta');
    alertEl.textContent   = '⚠️ O motivo é obrigatório para cancelar. Preencha o campo acima.';
    alertEl.style.background = '#fee2e2';
    alertEl.style.border     = '1px solid #fecaca';
    alertEl.style.color      = '#b91c1c';
    document.getElementById('acao-modal-textarea').focus();
    return;
  }

  const solAtual       = todasSolicitacoes.find(s => s.id === id);
  const statusAnterior = STATUS_LABEL[solAtual?.status] || '–';
  const todosAlunos    = solAtual?.alunos || [];
  const statusAluno    = _statusAlunoParaSolic(novoStatus);

  // Só mostra modal e atualiza alunos cujo status vai de fato mudar
  const alunosAfetados = statusAluno !== null
    ? todosAlunos.filter(a => a.status_aluno !== statusAluno)
    : [];

  if (alunosAfetados.length > 0) {
    const confirmar = await pedirConfirmacaoAlunos(alunosAfetados, statusAluno);
    if (!confirmar) return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="loading"></span> Salvando...';

  const { data: atualizado, error } = await cliente
    .from('interesse_vagas')
    .update({ status: novoStatus })
    .eq('id', id)
    .select('id');

  btn.disabled = false;
  btn.innerHTML = '✔ Confirmar';

  if (error) { showToast('❌ Erro ao salvar: ' + error.message); return; }
  if (!atualizado?.length) { showToast('❌ Sem permissão. Verifique se seu usuário é colaborador ativo.'); return; }

  const nomeColaborador = document.getElementById('sidebar-nome').textContent.trim() || 'Colaborador';

  // Propaga o novo status apenas para alunos que realmente precisam mudar
  if (statusAluno !== null && alunosAfetados.length > 0) {
    await cliente.from('alunos').update({ status_aluno: statusAluno, motivo_reprovacao: null })
      .in('id', alunosAfetados.map(a => a.id));
    alunosAfetados.forEach(a => { a.status_aluno = statusAluno; a.motivo_reprovacao = null; });
  }

  // Ao cancelar: remove alocações de todos os alunos enturmados
  if (novoStatus === 'cancelado') {
    const alunosEnturmados = todosAlunos.filter(a => a.alocacoes?.[0]?.id);
    if (alunosEnturmados.length > 0) {
      const alocIds = alunosEnturmados.map(a => a.alocacoes[0].id);
      await cliente.from('alocacoes').delete().in('id', alocIds);
      alunosEnturmados.forEach(a => { a.alocacoes = []; });
    }
  }

  // Registra mudança de status no histórico
  await registrarHistorico(id, `Status alterado de "${statusAnterior}" para "${STATUS_LABEL[novoStatus]}"`, nomeColaborador);

  const notaFinal = nota || FRASES_STATUS[novoStatus] || '';
  if (notaFinal) await registrarHistorico(id, notaFinal, nomeColaborador);

  await registrarLog('alterar_status', 'interesse_vagas', id, `Status alterado para "${STATUS_LABEL[novoStatus]}" · ${notaFinal}`);

  fecharAcaoModal();
  fecharModal();
  showToast(`✅ Status: ${STATUS_LABEL[novoStatus]}`);
  await carregarSolicitacoes();
  await carregarStats();
  await carregarUltimasSolicitacoes();
}


// ============================================================
//  MODAL DE OBSERVAÇÃO INTERNA
// ============================================================
function abrirObsModal(textoInicial) {
  obsEditandoId = solicitacaoAtualId || obsEditandoId;
  document.getElementById('obs-modal-textarea').value = textoInicial ?? '';
  document.getElementById('obs-modal-overlay').classList.add('active');
}

function fecharObsModal() {
  document.getElementById('obs-modal-overlay').classList.remove('active');
  obsEditandoId = null;
}

function fecharObsModalClick(event) {
  if (event.target === document.getElementById('obs-modal-overlay')) fecharObsModal();
}

async function confirmarSalvarObservacao() {
  if (!obsEditandoId) return;
  const btn = document.getElementById('btn-confirmar-obs');
  const obs = document.getElementById('obs-modal-textarea').value.trim();
  if (!obs) { showToast('⚠️ Digite uma mensagem antes de salvar.'); return; }

  btn.disabled = true;
  btn.innerHTML = '<span class="loading"></span> Salvando...';

  const nomeColaborador = document.getElementById('sidebar-nome').textContent.trim() || 'Colaborador';
  const { error } = await cliente.from('historico_solicitacoes').insert({
    interesse_id: obsEditandoId,
    descricao:    obs,
    autor_nome:   nomeColaborador,
    autor_tipo:   'colaborador'
  });

  btn.disabled = false;
  btn.innerHTML = '💾 Confirmar e Salvar';

  if (error) { showToast('❌ Erro: ' + error.message); return; }

  await registrarLog('observacao', 'interesse_vagas', obsEditandoId, 'Nota adicionada ao histórico');
  const idAtualizar = obsEditandoId;
  const modalPrincipalAberto = document.getElementById('modal-overlay').classList.contains('active');
  fecharObsModal();
  if (modalPrincipalAberto) carregarHistoricoModal(idAtualizar);
  showToast('✅ Nota registrada no histórico!');
}

// ============================================================
//  ENTURMAR
// ============================================================
const TURNO_LABEL_FULL = { manha: '☀️ Manhã', tarde: '🌤️ Tarde' };
let todasTurmas  = [];
let todosAlunosAprovados = [];
let alunoAlocandoId      = null;

function switchEnturmarTab(tab) {
  document.getElementById('enturmar-turmas').style.display  = tab === 'turmas'  ? '' : 'none';
  document.getElementById('enturmar-alocacao').style.display = tab === 'alocacao' ? '' : 'none';
  document.getElementById('tab-turmas').classList.toggle('active',  tab === 'turmas');
  document.getElementById('tab-alocacao').classList.toggle('active', tab === 'alocacao');
  if (tab === 'alocacao') {
    document.getElementById('filtro-alocado').value = 'nao';
    carregarAlocacao();
  }
}

// ---- Turmas ----
async function carregarEnturmar() {
  const { data, error } = await cliente
    .from('turmas')
    .select('*, alocacoes(id, alunos(id, nome_aluno, segmento, turma))')
    .order('segmento').order('serie').order('nome_turma');
  if (error) { document.getElementById('turmas-lista').innerHTML = `<div class="alert alert-error">${error.message}</div>`; return; }
  todasTurmas = data || [];
  renderTurmas();
}

function renderTurmas() {
  const segFiltro = document.getElementById('filtro-segmento-turmas').value;
  const lista = segFiltro ? todasTurmas.filter(t => t.segmento === segFiltro) : todasTurmas;
  const container = document.getElementById('turmas-lista');

  if (!lista.length) {
    container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">🏫</span><p>Nenhuma turma cadastrada${segFiltro ? ' neste segmento' : ''}.</p></div>`;
    return;
  }

  // Agrupar por segmento
  const grupos = {};
  lista.forEach(t => {
    const seg = SEGMENTO_LABEL[t.segmento] || t.segmento;
    if (!grupos[seg]) grupos[seg] = [];
    grupos[seg].push(t);
  });

  container.innerHTML = Object.entries(grupos).map(([seg, turmas]) => `
    <div style="margin-bottom:0.25rem">
      <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--gray-dark);padding:0.5rem 1rem;background:var(--white-smoke);border-bottom:1px solid var(--gray-light)">${seg}</div>
      ${turmas.map(t => {
        const alocados   = t.alocacoes?.length || 0;
        const livres     = t.capacidade - alocados;
        const pct        = alocados / t.capacidade;
        const vagasCls   = pct >= 1 ? 'cheia' : pct >= 0.8 ? 'quase' : 'ok';
        const vagasLabel = pct >= 1 ? '🔴 Lotada' : `${livres} vaga${livres !== 1 ? 's' : ''}`;

        const alunosHtml = alocados > 0
          ? (t.alocacoes || []).map((aloc, i) => {
              const al = aloc.alunos;
              return al
                ? `<div style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0;border-bottom:1px solid var(--gray-light)">
                     <span style="font-size:0.7rem;font-weight:700;color:var(--gray);width:18px;text-align:right;flex-shrink:0">${i+1}.</span>
                     <span style="font-size:0.8rem;font-weight:600;color:var(--navy-mid);flex:1">${escapeHtml(al.nome_aluno)}</span>
                     <span style="font-size:0.7rem;color:var(--gray-dark);margin-right:0.25rem">${al.turma || ''}</span>
                     <button class="btn btn-danger btn-sm btn-icon" title="Remover da turma" onclick="removerAlunoDaTurma('${al.id}','${aloc.id}','${escapeHtml(al.nome_aluno)}','${escapeHtml(t.serie)} – ${escapeHtml(t.nome_turma)}')">✕</button>
                   </div>`
                : '';
            }).join('')
          : `<div style="font-size:0.78rem;color:var(--gray);padding:0.5rem 0">Nenhum aluno enturmado.</div>`;

        return `
          <div class="turma-card" style="flex-direction:column;align-items:stretch;gap:0">
            <div style="display:flex;align-items:center;gap:0.75rem">
              <div class="turma-card-info" style="flex:1">
                <span class="turma-card-nome">${t.serie} – ${t.nome_turma}</span>
                <span class="turma-card-meta">${TURNO_LABEL_FULL[t.turno] || t.turno} · ${alocados}/${t.capacidade} alunos</span>
              </div>
              <div style="display:flex;align-items:center;gap:0.5rem;flex-shrink:0">
                <span class="turma-vagas ${vagasCls}">${vagasLabel}</span>
                <button class="btn btn-secondary btn-sm btn-icon" title="Imprimir lista" onclick="imprimirTurma('${t.id}')">🖨️</button>
                <button class="btn btn-danger btn-sm btn-icon" title="Excluir" onclick="excluirTurma('${t.id}')">✕</button>
              </div>
            </div>
            <details style="margin-top:0.5rem">
              <summary style="font-size:0.75rem;font-weight:600;color:var(--blue);cursor:pointer;list-style:none;display:flex;align-items:center;gap:0.35rem">
                👥 Ver alunos enturmados (${alocados})
              </summary>
              <div style="margin-top:0.5rem;padding:0 0.25rem">
                ${alunosHtml}
              </div>
            </details>
          </div>`;
      }).join('')}
    </div>`).join('');
}

function abrirModalTurma() {
  document.getElementById('turma-modal-titulo').textContent = 'Nova Turma';
  document.getElementById('turma-segmento').value   = '';
  document.getElementById('turma-serie').value      = '';
  document.getElementById('turma-serie').disabled   = true;
  document.getElementById('turma-nome').value       = '';
  document.getElementById('turma-turno').value      = '';
  document.getElementById('turma-capacidade').value = '30';
  document.getElementById('turma-modal-alert').innerHTML = '';
  document.getElementById('turma-modal-overlay').classList.add('active');
}

function fecharTurmaModal() { document.getElementById('turma-modal-overlay').classList.remove('active'); }
function fecharTurmaModalClick(e) { if (e.target === document.getElementById('turma-modal-overlay')) fecharTurmaModal(); }

function atualizarSeriesTurma() {
  const seg    = document.getElementById('turma-segmento').value;
  const select = document.getElementById('turma-serie');
  const series = {
    educacao_infantil: ['MATERNAL 1','MATERNAL 2','PRÉ ESCOLAR 1','PRÉ ESCOLAR 2'],
    fundamental1:      ['1º ANO','2º ANO','3º ANO','4º ANO','5º ANO'],
    fundamental2:      ['6º ANO','7º ANO','8º ANO','9º ANO'],
    ensino_medio:      ['1ª SÉRIE','2ª SÉRIE','3ª SÉRIE']
  };
  select.innerHTML = '<option value="">Selecione...</option>';
  select.disabled  = !seg;
  if (seg) (series[seg] || []).forEach(s => { const o = document.createElement('option'); o.value = o.textContent = s; select.appendChild(o); });
}

async function salvarTurma() {
  const btn       = document.getElementById('btn-salvar-turma');
  const alertDiv  = document.getElementById('turma-modal-alert');
  const segmento  = document.getElementById('turma-segmento').value;
  const serie     = document.getElementById('turma-serie').value;
  const nomeTurma = document.getElementById('turma-nome').value.trim();
  const turno     = document.getElementById('turma-turno').value;
  const cap       = parseInt(document.getElementById('turma-capacidade').value) || 30;

  if (!segmento || !serie || !nomeTurma || !turno) {
    alertDiv.innerHTML = '<div class="alert alert-error">Preencha todos os campos obrigatórios.</div>';
    return;
  }

  btn.disabled = true; btn.innerHTML = '<span class="loading"></span> Salvando...';

  // Buscar ou criar ano letivo ativo
  let { data: anoAtivo } = await cliente.from('anos_letivos').select('id').eq('ativo', true).single();
  if (!anoAtivo) {
    const ano = new Date().getFullYear();
    const { data: novoAno } = await cliente.from('anos_letivos').insert({ ano, ativo: true }).select('id').single();
    anoAtivo = novoAno;
  }

  const { error } = await cliente.from('turmas').insert({
    ano_letivo_id: anoAtivo.id, segmento, serie, nome_turma: nomeTurma, turno, capacidade: cap
  });

  btn.disabled = false; btn.innerHTML = '💾 Salvar Turma';

  if (error) { alertDiv.innerHTML = `<div class="alert alert-error">${error.message}</div>`; return; }

  await registrarLog('criar_turma', 'turmas', null, `Turma ${serie} – ${nomeTurma} criada`);
  fecharTurmaModal();
  showToast(`✅ Turma "${nomeTurma}" criada!`);
  await carregarEnturmar();
}

async function excluirTurma(id) {
  const turma = todasTurmas.find(t => t.id === id);
  if ((turma?.alocacoes?.length || 0) > 0) {
    Swal.fire({
      title: 'Turma com alunos',
      text: 'Não é possível excluir uma turma que possui alunos alocados. Remova os alunos primeiro.',
      icon: 'warning',
      confirmButtonColor: '#f97316'
    });
    return;
  }
  const { isConfirmed } = await Swal.fire({
    title: 'Excluir turma?',
    html: `<span style="font-size:0.875rem">A turma <strong>${escapeHtml(turma?.serie || '')} – ${escapeHtml(turma?.nome_turma || '')}</strong> será removida permanentemente.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
    reverseButtons: true
  });
  if (!isConfirmed) return;
  const { error } = await cliente.from('turmas').delete().eq('id', id);
  if (error) { showToast('❌ Erro: ' + error.message); return; }
  showToast('✅ Turma excluída.');
  await carregarEnturmar();
}

function imprimirTurma(turmaId) {
  const t = todasTurmas.find(x => x.id === turmaId);
  if (!t) return;
  const alunos = (t.alocacoes || []).map(a => a.alunos).filter(Boolean);

  const linhas = alunos.length
    ? alunos.map((a, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${a.nome_aluno}</td>
          <td>${a.turma || '–'}</td>
        </tr>`).join('')
    : `<tr><td colspan="3" style="text-align:center;color:#94a3b8">Nenhum aluno enturmado.</td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Lista de Alunos — ${t.serie} – ${t.nome_turma}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 2rem; color: #0f172a; }
    h1 { font-size: 1.2rem; margin-bottom: 0.25rem; }
    .meta { font-size: 0.85rem; color: #475569; margin-bottom: 1.5rem; }
    table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    th { background: #0f172a; color: white; padding: 0.5rem 0.75rem; text-align: left; }
    td { padding: 0.45rem 0.75rem; border-bottom: 1px solid #e2e8f0; }
    tr:nth-child(even) td { background: #f8fafc; }
    .footer { margin-top: 2rem; font-size: 0.75rem; color: #94a3b8; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <h1>🏫 ${t.serie} – ${t.nome_turma}</h1>
  <div class="meta">
    ${SEGMENTO_LABEL[t.segmento] || t.segmento} · ${TURNO_LABEL_FULL[t.turno] || t.turno} · ${alunos.length}/${t.capacidade} alunos
  </div>
  <table>
    <thead><tr><th>#</th><th>Nome do Aluno</th><th>Série Solicitada</th></tr></thead>
    <tbody>${linhas}</tbody>
  </table>
  <div class="footer">Colégio Plenus · Gerado em ${new Date().toLocaleString('pt-BR')}</div>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}

async function removerAlunoDaTurma(alunoId, alocacaoId, nomeAluno, nomeTurma) {
  const { isConfirmed } = await Swal.fire({
    title: 'Remover aluno da turma?',
    html: `<span style="font-size:0.875rem"><strong>${escapeHtml(nomeAluno)}</strong> será removido de <strong>${escapeHtml(nomeTurma)}</strong> e voltará para a lista de aguardando enturmação.</span>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sim, remover',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
    reverseButtons: true
  });
  if (!isConfirmed) return;
  const { error } = await cliente.from('alocacoes').delete().eq('id', alocacaoId);
  if (error) { showToast('❌ Erro: ' + error.message); return; }
  await registrarLog('remover_alocacao', 'alocacoes', alunoId, `Aluno "${nomeAluno}" removido de ${nomeTurma}`);
  showToast(`✅ ${nomeAluno} removido da turma.`);
  await carregarAlocacao();
  await carregarEnturmar();
}

// ---- Alocação ----
async function carregarAlocacao() {
  const container = document.getElementById('alocacao-lista');
  container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">⏳</span><p>Carregando...</p></div>`;

  // Busca paralela: alunos aprovados + todas as alocações + turmas
  const [
    { data: alunos,   error },
    { data: alocList },
    { data: turmaList }
  ] = await Promise.all([
    cliente.from('alunos').select('*, interesse_vagas(usuario_id, status)').eq('status_aluno', 'aprovado'),
    cliente.from('alocacoes').select('id, aluno_id, turma_id'),
    cliente.from('turmas').select('id, serie, nome_turma, segmento, turno')
  ]);

  if (error) { container.innerHTML = `<div class="alert alert-error">${error.message}</div>`; return; }

  // Montar mapas para cruzamento
  const turmaMap = Object.fromEntries((turmaList || []).map(t => [t.id, t]));
  const alocMap  = {};
  (alocList || []).forEach(al => {
    alocMap[al.aluno_id] = { ...al, turmas: turmaMap[al.turma_id] || null };
  });

  // Buscar responsáveis
  const ids = [...new Set((alunos || []).map(a => a.interesse_vagas?.usuario_id).filter(Boolean))];
  const { data: perfis } = ids.length
    ? await cliente.from('usuarios').select('id, nome').in('id', ids)
    : { data: [] };
  const pm = Object.fromEntries((perfis || []).map(p => [p.id, p]));

  todosAlunosAprovados = (alunos || []).map(a => {
    const aloc = alocMap[a.id];
    return {
      ...a,
      responsavel: pm[a.interesse_vagas?.usuario_id] || {},
      alocacoes: aloc ? [aloc] : []
    };
  });

  // Também recarregar turmas para select de alocação
  if (!todasTurmas.length) await carregarEnturmar();

  renderAlocacao();
}

function renderAlocacao() {
  const busca     = document.getElementById('busca-alocacao').value.toLowerCase().trim();
  const segFiltro = document.getElementById('filtro-segmento-alocacao').value;
  const alocFiltro = document.getElementById('filtro-alocado').value;
  const container = document.getElementById('alocacao-lista');

  let lista = todosAlunosAprovados;
  if (segFiltro) lista = lista.filter(a => a.segmento === segFiltro);
  if (alocFiltro === 'nao') lista = lista.filter(a => !a.alocacoes?.length);
  if (alocFiltro === 'sim') lista = lista.filter(a => a.alocacoes?.length > 0);
  if (busca) lista = lista.filter(a =>
    [a.nome_aluno, a.responsavel?.nome || ''].join(' ').toLowerCase().includes(busca)
  );

  if (!lista.length) {
    container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">🎒</span><p>Nenhum aluno encontrado.</p></div>`;
    return;
  }

  container.innerHTML = lista.map(a => {
    const alocado   = a.alocacoes?.[0];
    const turmaInfo = alocado?.turmas
      ? `${alocado.turmas.serie} – ${alocado.turmas.nome_turma} (${TURNO_LABEL_FULL[alocado.turmas.turno] || alocado.turmas.turno})`
      : null;

    const statusEnturma = turmaInfo
      ? `<div style="display:inline-flex;align-items:center;gap:0.35rem;margin-top:0.3rem;font-size:0.775rem;font-weight:600;color:#15803d;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:0.4rem;padding:0.2rem 0.6rem">
           🏫 <span>${escapeHtml(turmaInfo)}</span>
         </div>`
      : `<div style="display:inline-flex;align-items:center;gap:0.35rem;margin-top:0.3rem;font-size:0.775rem;font-weight:600;color:#b45309;background:#fefce8;border:1px solid #fde68a;border-radius:0.4rem;padding:0.2rem 0.6rem">
           ⏳ Aguardando enturmação
         </div>`;

    return `
      <div class="aluno-alocar-card">
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:0.875rem;color:var(--navy-mid)">${escapeHtml(a.nome_aluno)}</div>
          <div style="font-size:0.75rem;color:var(--gray-dark)">${SEGMENTO_LABEL[a.segmento] || a.segmento} · ${a.turma} · ${TURNO_LABEL[a.turno] || a.turno}</div>
          <div style="font-size:0.73rem;color:var(--gray)">Responsável: ${escapeHtml(a.responsavel?.nome || '–')}</div>
          ${statusEnturma}
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;flex-shrink:0;flex-wrap:wrap">
          ${turmaInfo
            ? `<button class="btn btn-secondary btn-sm" onclick="abrirAlocarModal('${a.id}','${escapeHtml(a.nome_aluno)}','${a.segmento}')">✏️ Alterar</button>
               <button class="btn btn-danger btn-sm btn-icon" title="Remover da turma" onclick="removerAlocacao('${a.id}','${alocado.id}')">✕</button>`
            : `<button class="btn btn-primary btn-sm" onclick="abrirAlocarModal('${a.id}','${escapeHtml(a.nome_aluno)}','${a.segmento}')">🏫 Enturmar</button>`
          }
        </div>
      </div>`;
  }).join('');
}

function abrirAlocarModal(alunoId, nomeAluno, segmento) {
  alunoAlocandoId = alunoId;
  document.getElementById('alocar-modal-titulo').textContent    = `🏫 Enturmar: ${nomeAluno}`;
  document.getElementById('alocar-modal-subtitulo').textContent = `${SEGMENTO_LABEL[segmento] || segmento}`;
  document.getElementById('alocar-modal-alert').innerHTML       = '';
  document.getElementById('alocar-turma-info').style.display    = 'none';

  // Preencher select com turmas do mesmo segmento
  const turmasSegmento = todasTurmas.filter(t => t.segmento === segmento);
  const sel = document.getElementById('alocar-turma-select');
  sel.innerHTML = '<option value="">Selecione a turma...</option>';
  turmasSegmento.forEach(t => {
    const alocados = t.alocacoes?.length || 0;
    const livres   = t.capacidade - alocados;
    const opt      = document.createElement('option');
    opt.value      = t.id;
    opt.textContent = `${t.serie} – ${t.nome_turma} | ${TURNO_LABEL_FULL[t.turno] || t.turno} | ${livres} vaga${livres !== 1 ? 's' : ''}`;
    opt.disabled   = livres <= 0;
    sel.appendChild(opt);
  });

  sel.onchange = () => {
    const t = todasTurmas.find(x => x.id === sel.value);
    const info = document.getElementById('alocar-turma-info');
    if (!t) { info.style.display = 'none'; return; }
    const alocados = t.alocacoes?.length || 0;
    const livres   = t.capacidade - alocados;
    info.style.display = 'block';
    info.innerHTML = `<strong>${t.serie} – ${t.nome_turma}</strong> · ${TURNO_LABEL_FULL[t.turno] || t.turno}<br>
      <span style="color:var(--gray-dark)">${alocados} alunos · ${livres} vagas disponíveis de ${t.capacidade}</span>`;
  };

  document.getElementById('alocar-modal-overlay').classList.add('active');
}

function fecharAlocarModal() { document.getElementById('alocar-modal-overlay').classList.remove('active'); alunoAlocandoId = null; }
function fecharAlocarModalClick(e) { if (e.target === document.getElementById('alocar-modal-overlay')) fecharAlocarModal(); }

async function confirmarAlocacao() {
  if (!alunoAlocandoId) return;
  const btn     = document.getElementById('btn-confirmar-alocacao');
  const turmaId = document.getElementById('alocar-turma-select').value;
  const alertDiv = document.getElementById('alocar-modal-alert');

  if (!turmaId) { alertDiv.innerHTML = '<div class="alert alert-error">Selecione uma turma.</div>'; return; }

  btn.disabled = true; btn.innerHTML = '<span class="loading"></span> Salvando...';

  const { data: { user } } = await cliente.auth.getUser();

  // Remove alocação anterior se existir
  await cliente.from('alocacoes').delete().eq('aluno_id', alunoAlocandoId);

  const { error } = await cliente.from('alocacoes').insert({
    aluno_id: alunoAlocandoId, turma_id: turmaId, colaborador_id: user.id
  });

  btn.disabled = false; btn.innerHTML = '🏫 Confirmar Enturmar';

  if (error) { alertDiv.innerHTML = `<div class="alert alert-error">${error.message}</div>`; return; }

  const aluno = todosAlunosAprovados.find(a => a.id === alunoAlocandoId);
  const turma = todasTurmas.find(t => t.id === turmaId);
  await registrarLog('enturmar', 'alocacoes', alunoAlocandoId,
    `Aluno "${aluno?.nome_aluno}" enturmado em ${turma?.serie} – ${turma?.nome_turma}`);

  fecharAlocarModal();
  showToast(`✅ Aluno enturmado com sucesso!`);
  // Setar filtro ANTES de recarregar para que renderAlocacao já use o valor correto
  document.getElementById('filtro-alocado').value = 'nao';
  await carregarAlocacao();
  await carregarEnturmar();
}

async function removerAlocacao(alunoId, alocacaoId) {
  const { error } = await cliente.from('alocacoes').delete().eq('id', alocacaoId);
  if (error) { showToast('❌ Erro: ' + error.message); return; }
  const aluno = todosAlunosAprovados.find(a => a.id === alunoId);
  await registrarLog('remover_alocacao', 'alocacoes', alunoId, `Aluno "${aluno?.nome_aluno}" removido da turma`);
  showToast('✅ Aluno removido da turma.');
  await carregarAlocacao();
  await carregarEnturmar();
}

// ============================================================
//  LOGS
// ============================================================
let todosLogs = [];

const ACAO_ICON = {
  criar_solicitacao:  { icon: '📝', label: 'Nova solicitação',     cor: '#1e40af', bg: '#eff6ff' },
  editar_solicitacao: { icon: '✏️', label: 'Solicitação editada',  cor: '#b45309', bg: '#fef3c7' },
  alterar_status:     { icon: '🔖', label: 'Status alterado',      cor: '#7c3aed', bg: '#f5f3ff' },
  observacao:         { icon: '💬', label: 'Nota adicionada',      cor: '#0f766e', bg: '#f0fdfa' },
  editar_perfil:      { icon: '👤', label: 'Perfil atualizado',    cor: '#6b7280', bg: '#f9fafb' },
  login:              { icon: '🔐', label: 'Login',                cor: '#15803d', bg: '#f0fdf4' },
  logout:             { icon: '🚪', label: 'Logout',               cor: '#dc2626', bg: '#fff1f2' }
};

// ============================================================
//  RELATÓRIOS ANALÍTICOS
// ============================================================

// Guarda instâncias dos charts para destruir ao recarregar
const _charts = {};

function _destroyChart(id) {
  if (_charts[id]) { _charts[id].destroy(); delete _charts[id]; }
}

// ---- Dados em cache para filtros de motivos ----
let _relSolics = [];
let _relAlunos = [];

const CHIPS_SAIDA_REL  = ['Localização / Proximidade','Qualidade de Ensino','Proposta Pedagógica','Infraestrutura','Clima Escolar','Custo-Benefício','Indicação de Amigos/Família','Mudança de Endereço','Metodologia de Ensino'];
const CHIPS_PLENUS_REL = ['Qualidade Pedagógica','Reputação da Escola','Indicação de Conhecidos','Infraestrutura','Projeto Pedagógico','Localização Favorável','Valores e Cultura da Escola','Atividades Extracurriculares','Clima Escolar'];
const REL_PAL_BLUE  = ['#1e3a8a','#1e40af','#1d4ed8','#2563eb','#3b82f6','#60a5fa','#93c5fd','#bfdbfe','#dbeafe'];
const REL_PAL_GREEN = ['#14532d','#166534','#15803d','#16a34a','#22c55e','#4ade80','#86efac','#bbf7d0'];

function _contarMotivos(arr, campo, chipValues) {
  const contagem = {};
  arr.forEach(item => {
    const texto = item[campo] || '';
    let encontrou = false;
    chipValues.forEach(chip => {
      if (texto.includes(chip)) { contagem[chip] = (contagem[chip] || 0) + 1; encontrou = true; }
    });
    if (!encontrou && texto.trim()) contagem['Outros'] = (contagem['Outros'] || 0) + 1;
  });
  return contagem;
}

function renderMotivosCharts(filtroSeg, filtroTurma) {
  if (!_relSolics.length) return;

  // Filtra solicitações cujos alunos batem com segmento/turma
  const solicFiltradas = _relSolics.filter(s => {
    if (!filtroSeg && !filtroTurma) return true;
    const alunosDaSolic = _relAlunos.filter(a => a.interesse_id === s.id);
    if (!alunosDaSolic.length) return false;
    return alunosDaSolic.some(a =>
      (!filtroSeg   || a.segmento === filtroSeg) &&
      (!filtroTurma || a.turma    === filtroTurma)
    );
  });

  // Atualiza contagem
  const countEl = document.getElementById('motivos-count');
  if (countEl) {
    countEl.textContent = (filtroSeg || filtroTurma)
      ? `${solicFiltradas.length} solicitação${solicFiltradas.length !== 1 ? 'ões' : ''}`
      : '';
  }

  // Chart: motivos de saída
  _destroyChart('motivo-saida');
  const saidaCount = _contarMotivos(solicFiltradas, 'motivo_transferencia', CHIPS_SAIDA_REL);
  const saidaPares = Object.entries(saidaCount).sort((a, b) => b[1] - a[1]);
  const canvasSaida = document.getElementById('chart-motivo-saida');
  if (canvasSaida) {
    _charts['motivo-saida'] = new Chart(canvasSaida, {
      type: 'bar',
      data: {
        labels: saidaPares.map(([k]) => k),
        datasets: [{ label: 'Menções', data: saidaPares.map(([, v]) => v), backgroundColor: REL_PAL_BLUE.slice(0, saidaPares.length), borderRadius: 5 }]
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } },
          y: { grid: { display: false }, ticks: { font: { size: 11 } } }
        }
      }
    });
  }

  // Chart: motivos de escolha do Plenus
  _destroyChart('motivo-plenus');
  const plenusCont = _contarMotivos(solicFiltradas, 'motivo_escolha_plenus', CHIPS_PLENUS_REL);
  const plenusPares = Object.entries(plenusCont).sort((a, b) => b[1] - a[1]);
  const canvasPlenus = document.getElementById('chart-motivo-plenus');
  if (canvasPlenus) {
    _charts['motivo-plenus'] = new Chart(canvasPlenus, {
      type: 'bar',
      data: {
        labels: plenusPares.map(([k]) => k),
        datasets: [{ label: 'Menções', data: plenusPares.map(([, v]) => v), backgroundColor: REL_PAL_GREEN.slice(0, plenusPares.length), borderRadius: 5 }]
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } },
          y: { grid: { display: false }, ticks: { font: { size: 11 } } }
        }
      }
    });
  }
}

function filtrarMotivos(source) {
  const seg = document.getElementById('filtro-motivo-segmento')?.value || '';
  const turmaSelect = document.getElementById('filtro-motivo-turma');

  if (source === 'segmento' && turmaSelect) {
    const opts = seg ? (TURMAS[seg] || []) : [];
    turmaSelect.innerHTML = '<option value="">Todas as turmas</option>' +
      opts.map(t => `<option value="${t}">${t}</option>`).join('');
    turmaSelect.disabled = !seg;
  }

  const turma = turmaSelect?.value || '';
  renderMotivosCharts(seg, turma);
}

async function carregarRelatorios() {
  // 1. Busca dados
  const [{ data: solics }, { data: alunos }, { data: turmas }, { data: alocacoes }] = await Promise.all([
    cliente.from('interesse_vagas').select('id, status, motivo_transferencia, motivo_escolha_plenus, valor_mensalidade_anterior, created_at, usuario_id'),
    cliente.from('alunos').select('id, interesse_id, nome_aluno, segmento, turma, turno, status_aluno'),
    cliente.from('turmas').select('id, serie, nome_turma, segmento, turno, capacidade'),
    cliente.from('alocacoes').select('id, turma_id, aluno_id')
  ]);

  if (!solics || !alunos) return;

  // Persiste para filtros de motivos
  _relSolics = solics;
  _relAlunos = alunos;

  // ---- KPIs linha 1 ----
  const total          = solics.length; // todos os status, incluindo cancelados
  const aprovados      = solics.filter(s => s.status === 'aprovado' || s.status === 'matriculado').length;
  const concluidas     = solics.filter(s => ['aprovado','matriculado','reprovado','cancelado'].includes(s.status)).length;
  const taxa           = concluidas > 0 ? Math.round((aprovados / concluidas) * 100) : 0;
  const tickets        = solics.map(s => s.valor_mensalidade_anterior).filter(v => v > 0);
  const ticketMed      = tickets.length ? (tickets.reduce((a,b) => a+b, 0) / tickets.length) : 0;
  const responsaveis   = new Set(solics.map(s => s.usuario_id).filter(Boolean)).size;

  document.getElementById('rel-kpi-total').textContent        = total;
  document.getElementById('rel-kpi-responsaveis').textContent = responsaveis;
  document.getElementById('rel-kpi-taxa').textContent         = taxa + '%';
  document.getElementById('rel-kpi-alunos').textContent       = alunos.length;
  document.getElementById('rel-kpi-ticket').textContent       = ticketMed > 0
    ? ticketMed.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
    : '–';

  // ---- KPIs linha 2 ----
  const matriculados  = solics.filter(s => s.status === 'matriculado').length;
  const cancelados    = solics.filter(s => s.status === 'cancelado').length;
  const reprovados    = solics.filter(s => s.status === 'reprovado').length;
  const enturmados    = (alocacoes || []).length;
  const alunosAprov   = alunos.filter(a => a.status_aluno === 'aprovado').length;
  const aguardando    = Math.max(0, alunosAprov - enturmados);

  document.getElementById('rel-kpi-matriculados').textContent = matriculados;
  document.getElementById('rel-kpi-enturmados').textContent   = enturmados;
  document.getElementById('rel-kpi-aguardando').textContent   = aguardando;
  document.getElementById('rel-kpi-cancelados').textContent   = cancelados;
  document.getElementById('rel-kpi-reprovados').textContent   = reprovados;

  // Mapa turma_id → contagem de alocados
  const alocPorTurma = {};
  (alocacoes || []).forEach(a => { alocPorTurma[a.turma_id] = (alocPorTurma[a.turma_id] || 0) + 1; });

  // Mapa turma_id → [alunos] para o relatório por turma
  const alunoMap = {};
  (alunos || []).forEach(a => { alunoMap[a.id] = a; });
  const alunosPorTurma = {};
  (alocacoes || []).forEach(a => {
    if (!alunosPorTurma[a.turma_id]) alunosPorTurma[a.turma_id] = [];
    const al = alunoMap[a.aluno_id];
    if (al) alunosPorTurma[a.turma_id].push(al);
  });
  _relTurmasData = { turmas: turmas || [], alunosPorTurma };
  renderRelatorioTurmas(_relTurmasData);

  // ---- helpers ----
  function contarCampo(arr, campo) {
    return arr.reduce((acc, item) => {
      const v = item[campo] || 'Não informado';
      acc[v] = (acc[v] || 0) + 1;
      return acc;
    }, {});
  }

  // ---- Paletas ----
  const CORES_STATUS = {
    pendente:    '#f59e0b',
    em_analise:  '#3b82f6',
    aprovado:    '#22c55e',
    reprovado:   '#ef4444',
    cancelado:   '#7c3aed',
    matriculado: '#0e7490'
  };
  const LABEL_STATUS = { pendente: 'Pendente', em_analise: 'Em Análise', aprovado: 'Aprovada', reprovado: 'Reprovada', cancelado: 'Cancelada', matriculado: 'Confirmada' };

  const PAL_BLUE   = ['#1e3a8a','#1e40af','#1d4ed8','#2563eb','#3b82f6','#60a5fa','#93c5fd','#bfdbfe','#dbeafe'];
  const PAL_ORANGE = ['#7c2d12','#9a3412','#c2410c','#ea580c','#f97316','#fb923c','#fdba74','#fed7aa'];

  // ---- 1. Status (donut) ----
  _destroyChart('status');
  const statusCount = contarCampo(solics, 'status');
  const statusKeys  = Object.keys(statusCount);
  _charts['status'] = new Chart(document.getElementById('chart-status'), {
    type: 'doughnut',
    data: {
      labels: statusKeys.map(k => LABEL_STATUS[k] || k),
      datasets: [{ data: statusKeys.map(k => statusCount[k]), backgroundColor: statusKeys.map(k => CORES_STATUS[k] || '#94a3b8'), borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 14, font: { size: 12 } } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw} (${Math.round(ctx.raw/total*100)}%)` } }
      },
      cutout: '62%'
    }
  });

  // ---- 2. Segmentos (bar) ----
  _destroyChart('segmentos');
  const segCount = contarCampo(alunos, 'segmento');
  const segKeys  = ['educacao_infantil','fundamental1','fundamental2','ensino_medio'].filter(k => segCount[k]);
  _charts['segmentos'] = new Chart(document.getElementById('chart-segmentos'), {
    type: 'bar',
    data: {
      labels: segKeys.map(k => SEGMENTO_LABEL[k] || k),
      datasets: [{ label: 'Alunos', data: segKeys.map(k => segCount[k] || 0), backgroundColor: PAL_BLUE.slice(0, segKeys.length), borderRadius: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } }
    }
  });

  // ---- 3. Séries (bar horizontal, top 10) ----
  _destroyChart('series');
  const serieCount = contarCampo(alunos, 'turma');
  const seriePares = Object.entries(serieCount).sort((a,b) => b[1]-a[1]).slice(0, 12);
  _charts['series'] = new Chart(document.getElementById('chart-series'), {
    type: 'bar',
    data: {
      labels: seriePares.map(([k]) => k),
      datasets: [{ label: 'Alunos', data: seriePares.map(([,v]) => v), backgroundColor: PAL_ORANGE.slice(0, seriePares.length), borderRadius: 5 }]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } }, y: { grid: { display: false } } }
    }
  });

  // ---- 4. Turnos (donut) ----
  _destroyChart('turnos');
  const turnoCount = contarCampo(alunos, 'turno');
  const turnoLabel = { manha: 'Manhã', tarde: 'Tarde', tanto_faz: 'Tanto Faz', integral: 'Integral' };
  const turnoKeys  = Object.keys(turnoCount);
  _charts['turnos'] = new Chart(document.getElementById('chart-turnos'), {
    type: 'doughnut',
    data: {
      labels: turnoKeys.map(k => turnoLabel[k] || k),
      datasets: [{ data: turnoKeys.map(k => turnoCount[k]), backgroundColor: ['#f59e0b','#3b82f6','#94a3b8','#22c55e'], borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { padding: 14, font: { size: 12 } } } },
      cutout: '62%'
    }
  });

  // ---- 5. Evolução mensal (line) ----
  _destroyChart('mensal');
  const porMes = {};
  solics.forEach(s => {
    const d = new Date(s.created_at);
    const chave = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    porMes[chave] = (porMes[chave] || 0) + 1;
  });
  const mesesOrdenados = Object.keys(porMes).sort();
  const mesesLabel = mesesOrdenados.map(m => {
    const [ano, mes] = m.split('-');
    return new Date(ano, mes-1).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
  });
  _charts['mensal'] = new Chart(document.getElementById('chart-mensal'), {
    type: 'line',
    data: {
      labels: mesesLabel,
      datasets: [{
        label: 'Solicitações',
        data: mesesOrdenados.map(m => porMes[m]),
        borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.08)',
        borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: '#3b82f6',
        tension: 0.35, fill: true
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } }
    }
  });

  // ---- 6. Ocupação das turmas (bar agrupada: alocados vs capacidade) ----
  _destroyChart('turmas');
  const turmasFiltradas = (turmas || []).filter(t => t.capacidade > 0);
  if (turmasFiltradas.length) {
    const turmaLabels  = turmasFiltradas.map(t => `${t.serie} – ${t.nome_turma}`);
    const turmaAloc    = turmasFiltradas.map(t => alocPorTurma[t.id] || 0);
    const turmaLivre   = turmasFiltradas.map(t => Math.max(0, t.capacidade - (alocPorTurma[t.id] || 0)));
    _charts['turmas'] = new Chart(document.getElementById('chart-turmas'), {
      type: 'bar',
      data: {
        labels: turmaLabels,
        datasets: [
          { label: 'Enturmados', data: turmaAloc,  backgroundColor: '#22c55e', borderRadius: 4 },
          { label: 'Vagas livres', data: turmaLivre, backgroundColor: '#e2e8f0', borderRadius: 4 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        indexAxis: turmasFiltradas.length > 6 ? 'y' : 'x',
        plugins: { legend: { position: 'bottom', labels: { padding: 14, font: { size: 12 } } } },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } }
        }
      }
    });
  }

  // ---- 7 & 8. Motivos de saída + Motivos de escolha Plenus ----
  // Resetar filtros e renderizar
  const filtroSegEl   = document.getElementById('filtro-motivo-segmento');
  const filtroTurmaEl = document.getElementById('filtro-motivo-turma');
  if (filtroSegEl)   filtroSegEl.value = '';
  if (filtroTurmaEl) { filtroTurmaEl.innerHTML = '<option value="">Todas as turmas</option>'; filtroTurmaEl.disabled = true; }
  renderMotivosCharts('', '');
}

// ============================================================
//  CADASTROS — RESPONSÁVEIS E ALUNOS
// ============================================================
let _todosColaboradores = [];
let _todosResponsaveis  = [];
let _todosAlunosCad     = [];

function carregarCadastros() {
  const tab = document.getElementById('tab-responsaveis');
  if (tab?.style.fontWeight === '700') {
    carregarResponsaveis();
  } else {
    switchCadTab('responsaveis');
  }
}

function switchCadTab(tab) {
  const isResp = tab === 'responsaveis';
  document.getElementById('cad-panel-responsaveis').style.display = isResp ? '' : 'none';
  document.getElementById('cad-panel-alunos').style.display       = isResp ? 'none' : '';

  const tResp  = document.getElementById('tab-responsaveis');
  const tAluno = document.getElementById('tab-alunos');
  tResp.style.fontWeight    = isResp ? '700' : '500';
  tResp.style.color         = isResp ? 'var(--primary)' : '';
  tResp.style.borderBottom  = isResp ? '2px solid var(--primary)' : 'none';
  tResp.style.background    = isResp ? '#fff' : '';
  tAluno.style.fontWeight   = !isResp ? '700' : '500';
  tAluno.style.color        = !isResp ? 'var(--primary)' : '';
  tAluno.style.borderBottom = !isResp ? '2px solid var(--primary)' : 'none';
  tAluno.style.background   = !isResp ? '#fff' : '';

  if (isResp) carregarResponsaveis();
  else        carregarAlunosCad();
}

async function carregarResponsaveis() {
  document.getElementById('cad-resp-lista').innerHTML =
    `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">⏳</span><p>Carregando...</p></div>`;

  const [
    { data: users,  error: errUsers },
    { data: solics },
    { data: alunos }
  ] = await Promise.all([
    cliente.from('usuarios').select('id, nome, email, telefone, criado_em').order('nome'),
    cliente.from('interesse_vagas').select('id, usuario_id'),
    cliente.from('alunos').select('id, nome_aluno, segmento, turma, interesse_id')
  ]);

  if (errUsers) {
    document.getElementById('cad-resp-lista').innerHTML =
      `<div class="alert alert-error">Erro ao carregar responsáveis: ${errUsers.message}</div>`;
    return;
  }

  // mapa interesse_id → usuario_id
  const solicsMap = {};
  (solics || []).forEach(s => { solicsMap[s.id] = s.usuario_id; });

  // mapa usuario_id → [alunos]
  const alunosPorResp = {};
  (alunos || []).forEach(a => {
    const uid = solicsMap[a.interesse_id];
    if (!uid) return;
    if (!alunosPorResp[uid]) alunosPorResp[uid] = [];
    alunosPorResp[uid].push(a);
  });

  _todosResponsaveis = (users || []).map(u => ({
    ...u,
    total_solics: (solics || []).filter(s => s.usuario_id === u.id).length,
    alunos:       alunosPorResp[u.id] || []
  }));

  filtrarResponsaveis();
}

function filtrarResponsaveis() {
  const busca = (document.getElementById('cad-resp-busca')?.value || '').toLowerCase().trim();
  const lista = busca
    ? _todosResponsaveis.filter(u =>
        (u.nome + u.email).toLowerCase().includes(busca) ||
        u.alunos.some(a => a.nome_aluno.toLowerCase().includes(busca))
      )
    : _todosResponsaveis;

  document.getElementById('cad-resp-count').textContent =
    `${lista.length} responsável${lista.length !== 1 ? 'is' : ''} encontrado${lista.length !== 1 ? 's' : ''}`;
  renderResponsaveis(lista);
}

function renderResponsaveis(lista) {
  const container = document.getElementById('cad-resp-lista');
  if (!lista.length) {
    container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">👤</span><p>Nenhum responsável encontrado.</p></div>`;
    return;
  }
  container.innerHTML = lista.map(u => {
    const data     = u.criado_em ? new Date(u.criado_em).toLocaleDateString('pt-BR') : '–';
    const nAlunos  = u.alunos.length;
    const alunosHtml = nAlunos
      ? u.alunos.map(a =>
          `<span style="display:inline-flex;align-items:center;gap:0.3rem;background:#f1f5f9;border-radius:0.4rem;padding:0.2rem 0.5rem;font-size:0.75rem;color:#475569">
            🎒 ${escapeHtml(a.nome_aluno)}${a.turma ? ` · ${escapeHtml(a.turma)}` : ''}
          </span>`
        ).join('')
      : `<span style="font-size:0.75rem;color:#94a3b8">Nenhum aluno cadastrado</span>`;

    return `
      <div style="padding:0.875rem 0;border-bottom:1px solid var(--gray-light)">
        <div style="display:flex;align-items:flex-start;gap:1rem;flex-wrap:wrap">
          <div style="flex:1;min-width:160px">
            <div style="font-weight:600;font-size:0.875rem">${escapeHtml(u.nome || '–')}</div>
            <div style="font-size:0.775rem;color:var(--gray-dark);overflow-wrap:break-word;word-break:break-all">${escapeHtml(u.email || '–')}</div>
            <div style="font-size:0.75rem;color:#94a3b8;margin-top:0.15rem">${escapeHtml(u.telefone || 'Sem telefone')} · Cadastrado em ${data}</div>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;flex-shrink:0">
            <span style="font-size:0.78rem;color:var(--gray-dark)">
              📋 ${u.total_solics} solic. · 🎒 ${nAlunos} aluno${nAlunos !== 1 ? 's' : ''}
            </span>
            <button class="btn btn-secondary btn-sm" onclick="abrirEditarResponsavel('${u.id}')">✏️ Editar</button>
            <button class="btn btn-sm" style="background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5;border-radius:0.5rem;font-size:0.78rem;padding:0.3rem 0.75rem"
              onclick="excluirResponsavel('${u.id}','${escapeHtml(u.nome)}',${u.total_solics},${nAlunos})">🗑️ Excluir</button>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.5rem">${alunosHtml}</div>
      </div>`;
  }).join('');
}

function abrirEditarResponsavel(id) {
  const u = _todosResponsaveis.find(r => r.id === id);
  if (!u) return;
  document.getElementById('cad-resp-id').value             = u.id;
  document.getElementById('cad-resp-email-original').value = u.email || '';
  document.getElementById('cad-resp-nome').value           = u.nome || '';
  document.getElementById('cad-resp-email').value          = u.email || '';
  document.getElementById('cad-resp-telefone').value       = u.telefone || '';
  document.getElementById('cad-resp-alert').innerHTML      = '';
  document.getElementById('cad-resp-link-feedback').style.display = 'none';
  document.getElementById('cad-resp-modal-overlay').classList.add('active');
}

function fecharRespModal() {
  document.getElementById('cad-resp-modal-overlay').classList.remove('active');
}

async function salvarResponsavel() {
  const id            = document.getElementById('cad-resp-id').value;
  const emailOriginal = document.getElementById('cad-resp-email-original').value.trim().toLowerCase();
  const nome          = document.getElementById('cad-resp-nome').value.trim();
  const email         = document.getElementById('cad-resp-email').value.trim().toLowerCase();
  const telefone      = document.getElementById('cad-resp-telefone').value.trim();
  const alertEl       = document.getElementById('cad-resp-alert');
  const btn           = document.getElementById('btn-salvar-resp');

  alertEl.innerHTML = '';
  if (!nome)  { alertEl.innerHTML = `<div class="alert alert-error">Informe o nome.</div>`; return; }
  if (!email) { alertEl.innerHTML = `<div class="alert alert-error">Informe o e-mail.</div>`; return; }
  if (telefone && !validarTelefone(telefone)) {
    alertEl.innerHTML = `<div class="alert alert-error">Telefone inválido. Use o formato (00) 00000-0000.</div>`; return;
  }

  const emailMudou = email !== emailOriginal;

  if (emailMudou) {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: 'Alterar e-mail?',
      html: `<p style="font-size:0.875rem;color:#475569;line-height:1.6">
        O e-mail de login será alterado de<br>
        <strong>${emailOriginal}</strong><br>para<br>
        <strong>${email}</strong><br><br>
        O responsável precisará usar o novo e-mail para acessar o sistema.
      </p>`,
      showCancelButton: true,
      confirmButtonText: 'Sim, alterar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f97316'
    });
    if (!isConfirmed) return;
  }

  btn.disabled = true; btn.textContent = 'Salvando...';

  if (emailMudou) {
    const { error: errEmail } = await cliente.rpc('alterar_email_usuario', {
      p_user_id: id,
      p_novo_email: email
    });
    if (errEmail) {
      btn.disabled = false; btn.textContent = '💾 Salvar';
      alertEl.innerHTML = `<div class="alert alert-error">Erro ao alterar e-mail: ${errEmail.message}</div>`;
      return;
    }
    // Atualiza o campo original para refletir o novo valor salvo
    document.getElementById('cad-resp-email-original').value = email;
  }

  const { error } = await cliente.from('usuarios').update({ nome, email, telefone }).eq('id', id);
  btn.disabled = false; btn.textContent = '💾 Salvar';

  if (error) {
    alertEl.innerHTML = `<div class="alert alert-error">Erro: ${error.message}</div>`;
    return;
  }
  await registrarLog('editar_responsavel', 'usuarios', id,
    emailMudou ? `Responsável ${nome} atualizado — e-mail alterado` : `Responsável ${nome} atualizado`);
  fecharRespModal();
  showToast('✅ Responsável atualizado!');
  carregarResponsaveis();
}

async function enviarResetSenhaResp() {
  const email   = document.getElementById('cad-resp-email').value.trim();
  const feedback = document.getElementById('cad-resp-link-feedback');
  if (!email) { showToast('⚠️ Salve o e-mail antes de enviar o link.'); return; }

  const { error } = await cliente.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/reset-senha.html'
  });

  if (error) { showToast('❌ Erro ao enviar: ' + error.message); return; }

  feedback.textContent = '✅ Link de redefinição enviado para ' + email;
  feedback.style.display = '';
  await registrarLog('reset_senha_responsavel', 'usuarios',
    document.getElementById('cad-resp-id').value,
    `Link de redefinição de senha enviado para ${email}`);
}

async function copiarResetSenhaResp() {
  const email    = document.getElementById('cad-resp-email').value.trim();
  const feedback = document.getElementById('cad-resp-link-feedback');
  if (!email) { showToast('⚠️ Salve o e-mail antes de copiar o link.'); return; }

  // Gera o link sem enviar o e-mail — monta manualmente a URL de reset
  const base = window.location.origin + '/reset-senha.html';
  const { error } = await cliente.auth.resetPasswordForEmail(email, { redirectTo: base });

  if (error) { showToast('❌ Erro ao gerar link: ' + error.message); return; }

  // O link é enviado por e-mail pelo Supabase — copiamos apenas a URL base de redefinição
  await navigator.clipboard.writeText(base);
  feedback.textContent = '🔗 URL de redefinição copiada: ' + base + ' (link foi enviado ao e-mail)';
  feedback.style.display = '';
}

function copiarLinkCadastro() {
  const link     = window.location.origin + '/cadastro.html';
  const feedback = document.getElementById('cad-resp-link-feedback');
  navigator.clipboard.writeText(link).then(() => {
    feedback.textContent = '📋 Link de cadastro copiado: ' + link;
    feedback.style.display = '';
  });
}

async function excluirResponsavel(id, nome, nSolics, nAlunos) {
  const detalhes = [];
  if (nSolics > 0) detalhes.push(`<strong>${nSolics}</strong> solicitaç${nSolics !== 1 ? 'ões' : 'ão'}`);
  if (nAlunos > 0) detalhes.push(`<strong>${nAlunos}</strong> aluno${nAlunos !== 1 ? 's' : ''}`);
  const detalheStr = detalhes.length
    ? `<p style="font-size:0.85rem;color:#475569;margin-top:0.4rem">Serão removidos também: ${detalhes.join(' e ')}.</p>`
    : '';

  const { isConfirmed } = await Swal.fire({
    title: 'Excluir responsável?',
    html: `<p>Excluir <strong>${escapeHtml(nome)}</strong> permanentemente?</p>
           ${detalheStr}
           <p style="color:#b91c1c;font-size:0.82rem;margin-top:0.5rem">Esta ação é irreversível.</p>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir tudo',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626'
  });
  if (!isConfirmed) return;

  // Remove public.usuarios (cascade remove solicitações/alunos) e auth.users via RPC
  const { error } = await cliente.rpc('excluir_usuario_permanente', { user_id: id });
  if (error) { showToast('❌ Erro ao excluir: ' + error.message); return; }

  await registrarLog('excluir_responsavel', 'usuarios', id,
    `Responsável ${nome} excluído permanentemente (${nSolics} solicitações, ${nAlunos} alunos)`);
  showToast('✅ Responsável e todos os dados vinculados excluídos permanentemente.');
  _todosResponsaveis = _todosResponsaveis.filter(r => r.id !== id);
  filtrarResponsaveis();
}

async function carregarAlunosCad() {
  document.getElementById('cad-aluno-lista').innerHTML =
    `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">⏳</span><p>Carregando...</p></div>`;

  // 3 queries separadas para evitar join encadeado bloqueado pelo RLS
  const [{ data: alunos, error }, { data: solics }, { data: users }] = await Promise.all([
    cliente.from('alunos').select('id, nome_aluno, segmento, turma, turno, status_aluno, interesse_id').order('nome_aluno'),
    cliente.from('interesse_vagas').select('id, usuario_id'),
    cliente.from('usuarios').select('id, nome')
  ]);

  if (error) {
    document.getElementById('cad-aluno-lista').innerHTML =
      `<div class="alert alert-error">${error.message}</div>`;
    return;
  }

  const solicsMap = {};
  (solics || []).forEach(s => { solicsMap[s.id] = s.usuario_id; });
  const usersMap = {};
  (users || []).forEach(u => { usersMap[u.id] = u; });

  _todosAlunosCad = (alunos || []).map(a => ({
    ...a,
    _responsavel: usersMap[solicsMap[a.interesse_id]] || null
  }));

  filtrarAlunosCad();
}

function filtrarAlunosCad() {
  const busca = (document.getElementById('cad-aluno-busca')?.value || '').toLowerCase().trim();
  const seg   = document.getElementById('cad-aluno-seg')?.value || '';
  let lista   = _todosAlunosCad;
  if (busca) lista = lista.filter(a => a.nome_aluno.toLowerCase().includes(busca));
  if (seg)   lista = lista.filter(a => a.segmento === seg);

  document.getElementById('cad-aluno-count').textContent =
    `${lista.length} aluno${lista.length !== 1 ? 's' : ''} encontrado${lista.length !== 1 ? 's' : ''}`;
  renderAlunosCad(lista);
}

function renderAlunosCad(lista) {
  const container = document.getElementById('cad-aluno-lista');
  if (!lista.length) {
    container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">🎒</span><p>Nenhum aluno encontrado.</p></div>`;
    return;
  }

  const STATUS_COR = {
    pendente:  'background:#fef9c3;color:#92400e;border-color:#fde68a',
    aprovado:  'background:#dcfce7;color:#15803d;border-color:#bbf7d0',
    reprovado: 'background:#fee2e2;color:#dc2626;border-color:#fecaca'
  };
  const STATUS_L = { pendente: 'Pendente', aprovado: 'Aprovado', reprovado: 'Reprovado' };
  const TURNO_L  = { manha: 'Manhã', tarde: 'Tarde', tanto_faz: 'Tanto faz' };

  container.innerHTML = lista.map(a => {
    const respNome = a._responsavel?.nome || '–';
    const st      = a.status_aluno || 'pendente';
    const cor     = STATUS_COR[st] || '';
    return `
      <div style="display:flex;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--gray-light);gap:1rem;flex-wrap:wrap">
        <div style="flex:1;min-width:160px">
          <div style="font-weight:600;font-size:0.875rem">${escapeHtml(a.nome_aluno)}</div>
          <div style="font-size:0.775rem;color:var(--gray-dark)">
            ${SEGMENTO_LABEL[a.segmento] || a.segmento || '–'} · ${escapeHtml(a.turma || '–')} · ${TURNO_L[a.turno] || a.turno || '–'}
          </div>
          <div style="font-size:0.75rem;color:#94a3b8">👤 ${escapeHtml(respNome)}</div>
        </div>
        <span class="status-badge" style="font-size:0.72rem;${cor}">${STATUS_L[st] || st}</span>
        <div style="display:flex;gap:0.5rem">
          <button class="btn btn-secondary btn-sm" onclick="abrirEditarAluno('${a.id}')">✏️ Editar</button>
          <button class="btn btn-sm" style="background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5;border-radius:0.5rem;font-size:0.78rem;padding:0.3rem 0.75rem"
            onclick="excluirAluno('${a.id}','${escapeHtml(a.nome_aluno)}','${escapeHtml(respNome)}')">🗑️ Excluir</button>
        </div>
      </div>`;
  }).join('');
}

function atualizarSeriesCad() {
  const seg    = document.getElementById('cad-aluno-segmento').value;
  const select = document.getElementById('cad-aluno-serie');
  const series = SERIES_POR_SEGMENTO[seg] || [];
  select.innerHTML = series.map(s => `<option value="${s}">${s}</option>`).join('');
}

function abrirEditarAluno(id) {
  const a = _todosAlunosCad.find(x => x.id === id);
  if (!a) return;
  document.getElementById('cad-aluno-id').value      = a.id;
  document.getElementById('cad-aluno-nome').value    = a.nome_aluno || '';
  document.getElementById('cad-aluno-segmento').value = a.segmento || '';
  atualizarSeriesCad();
  document.getElementById('cad-aluno-serie').value   = a.turma || '';
  document.getElementById('cad-aluno-turno').value   = a.turno || 'manha';
  document.getElementById('cad-aluno-status').value  = a.status_aluno || 'pendente';
  document.getElementById('cad-aluno-alert').innerHTML = '';
  document.getElementById('cad-aluno-modal-overlay').classList.add('active');
}

function fecharAlunoModal() {
  document.getElementById('cad-aluno-modal-overlay').classList.remove('active');
}

async function salvarAluno() {
  const id       = document.getElementById('cad-aluno-id').value;
  const nome     = document.getElementById('cad-aluno-nome').value.trim();
  const segmento = document.getElementById('cad-aluno-segmento').value;
  const turma    = document.getElementById('cad-aluno-serie').value;
  const turno    = document.getElementById('cad-aluno-turno').value;
  const status   = document.getElementById('cad-aluno-status').value;
  const alertEl  = document.getElementById('cad-aluno-alert');
  const btn      = document.getElementById('btn-salvar-aluno');

  alertEl.innerHTML = '';
  if (!nome) { alertEl.innerHTML = `<div class="alert alert-error">Informe o nome do aluno.</div>`; return; }

  btn.disabled = true; btn.textContent = 'Salvando...';
  const { error } = await cliente.from('alunos')
    .update({ nome_aluno: nome, segmento, turma, turno, status_aluno: status })
    .eq('id', id);
  btn.disabled = false; btn.textContent = '💾 Salvar';

  if (error) {
    alertEl.innerHTML = `<div class="alert alert-error">Erro: ${error.message}</div>`;
    return;
  }
  await registrarLog('editar_aluno', 'alunos', id, `Aluno ${nome} atualizado`);
  fecharAlunoModal();
  showToast('✅ Aluno atualizado!');
  carregarAlunosCad();
}

async function excluirAluno(id, nome, respNome) {
  const vinculo = respNome && respNome !== '–'
    ? `<p style="font-size:0.82rem;color:#475569;margin-top:0.4rem">Vinculado ao responsável: <strong>${escapeHtml(respNome)}</strong>. A solicitação desse responsável permanece — apenas este aluno será removido.</p>`
    : '';

  const { isConfirmed } = await Swal.fire({
    title: 'Excluir aluno?',
    html: `<p>Excluir <strong>${escapeHtml(nome)}</strong> permanentemente do banco de dados?</p>
           ${vinculo}
           <p style="font-size:0.82rem;color:#b91c1c;margin-top:0.4rem">A alocação de turma, se existir, também será removida. Esta ação é irreversível.</p>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626'
  });
  if (!isConfirmed) return;

  const { error } = await cliente.from('alunos').delete().eq('id', id);
  if (error) { showToast('❌ Erro ao excluir: ' + error.message); return; }

  await registrarLog('excluir_aluno', 'alunos', id, `Aluno ${nome} excluído`);
  showToast('✅ Aluno excluído.');
  _todosAlunosCad = _todosAlunosCad.filter(a => a.id !== id);
  filtrarAlunosCad();
}

// ============================================================
//  RELATÓRIO POR TURMA
// ============================================================
let _relTurmasData = null;

function renderRelatorioTurmas({ turmas, alunosPorTurma }) {
  const container = document.getElementById('rel-turmas-lista');
  if (!container) return;

  const turmasCom = turmas.filter(t => (alunosPorTurma[t.id] || []).length > 0);
  const turmasSem = turmas.filter(t => !(alunosPorTurma[t.id] || []).length);
  const lista = [...turmasCom, ...turmasSem];

  if (!lista.length) {
    container.innerHTML = `<p style="color:var(--gray-dark);padding:1rem 0;font-size:0.875rem">Nenhuma turma cadastrada.</p>`;
    return;
  }

  const TURNO_L = { manha: 'Manhã', tarde: 'Tarde', tanto_faz: 'Tanto Faz', integral: 'Integral' };

  container.innerHTML = lista.map(t => {
    const alunos  = (alunosPorTurma[t.id] || []).sort((a,b) => a.nome_aluno.localeCompare(b.nome_aluno));
    const total   = alunos.length;
    const cap     = t.capacidade || 0;
    const pct     = cap > 0 ? Math.round((total / cap) * 100) : null;
    const pctCor  = pct === null ? '#94a3b8' : pct >= 100 ? '#ef4444' : pct >= 80 ? '#f59e0b' : '#22c55e';
    const turnoStr = TURNO_L[t.turno] || t.turno || '–';
    const segStr   = SEGMENTO_LABEL[t.segmento] || t.segmento || '–';

    const alunosHtml = total
      ? alunos.map((a, i) => `
          <div style="display:flex;align-items:center;gap:0.5rem;padding:0.35rem 0;border-bottom:1px solid #f1f5f9;font-size:0.82rem">
            <span style="min-width:1.4rem;color:#94a3b8;font-size:0.75rem">${i + 1}.</span>
            <span style="flex:1;font-weight:500">${escapeHtml(a.nome_aluno)}</span>
            <span style="color:var(--gray-dark);font-size:0.75rem">${escapeHtml(a.turma || '–')}</span>
          </div>`).join('')
      : `<p style="font-size:0.82rem;color:#94a3b8;padding:0.5rem 0;margin:0">Nenhum aluno enturmado.</p>`;

    return `
      <div style="border:1px solid var(--gray-light);border-radius:0.75rem;margin-bottom:1rem;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;background:#f8fafc;flex-wrap:wrap;gap:0.5rem">
          <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap">
            <span style="font-weight:700;font-size:0.9rem">${escapeHtml(t.nome_turma)}</span>
            <span style="font-size:0.75rem;color:var(--gray-dark)">${escapeHtml(t.serie)} · ${segStr} · ${turnoStr}</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem">
            <span style="font-size:0.8rem;font-weight:600;color:${pctCor}">
              ${total}${cap > 0 ? `/${cap}` : ''} aluno${total !== 1 ? 's' : ''}${pct !== null ? ` (${pct}%)` : ''}
            </span>
            <button class="btn btn-secondary btn-sm" style="font-size:0.75rem;padding:0.2rem 0.6rem"
              onclick="imprimirTurmaRel('${t.id}')">🖨️ Imprimir</button>
          </div>
        </div>
        <div style="padding:0.5rem 1rem 0.75rem">${alunosHtml}</div>
      </div>`;
  }).join('');
}

function imprimirTurmaRel(turmaId) {
  if (!_relTurmasData) return;
  const t = _relTurmasData.turmas.find(x => x.id === turmaId);
  if (!t) return;
  const alunos = (_relTurmasData.alunosPorTurma[turmaId] || [])
    .sort((a,b) => a.nome_aluno.localeCompare(b.nome_aluno));
  const TURNO_L = { manha: 'Manhã', tarde: 'Tarde', tanto_faz: 'Tanto Faz', integral: 'Integral' };
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html lang="pt-br"><head><meta charset="UTF-8">
    <title>Lista – ${t.nome_turma}</title>
    <style>
      body{font-family:Inter,sans-serif;padding:2rem;color:#0f172a}
      h1{font-size:1.2rem;margin:0 0 0.25rem}
      .sub{font-size:0.85rem;color:#475569;margin-bottom:1.5rem}
      table{width:100%;border-collapse:collapse;font-size:0.9rem}
      th{text-align:left;padding:0.5rem 0.75rem;border-bottom:2px solid #0f172a;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em}
      td{padding:0.5rem 0.75rem;border-bottom:1px solid #e2e8f0}
      tr:nth-child(even) td{background:#f8fafc}
      .footer{margin-top:2rem;font-size:0.75rem;color:#94a3b8}
      @media print{body{padding:1rem}}
    </style></head><body>
    <h1>${escapeHtml(t.nome_turma)}</h1>
    <div class="sub">${SEGMENTO_LABEL[t.segmento]||t.segmento} · ${escapeHtml(t.serie)} · ${TURNO_L[t.turno]||t.turno} · Capacidade: ${t.capacidade||'–'}</div>
    <table>
      <thead><tr><th>#</th><th>Nome do Aluno</th><th>Série / Turma solicitada</th></tr></thead>
      <tbody>
        ${alunos.length
          ? alunos.map((a,i) => `<tr><td>${i+1}</td><td>${escapeHtml(a.nome_aluno)}</td><td>${escapeHtml(a.turma||'–')}</td></tr>`).join('')
          : '<tr><td colspan="3" style="color:#94a3b8;text-align:center;padding:1rem">Nenhum aluno enturmado.</td></tr>'}
      </tbody>
    </table>
    <div class="footer">Impresso em ${new Date().toLocaleString('pt-BR')} · Colégio Plenus</div>
    <script>window.onload=()=>{window.print();}<\/script>
    </body></html>`);
  win.document.close();
}

function imprimirRelatorioTurmas() {
  if (!_relTurmasData) { showToast('⚠️ Carregue o relatório primeiro.'); return; }
  const { turmas, alunosPorTurma } = _relTurmasData;
  const TURNO_L = { manha: 'Manhã', tarde: 'Tarde', tanto_faz: 'Tanto Faz', integral: 'Integral' };
  const blocos = turmas.map(t => {
    const alunos = (alunosPorTurma[t.id] || []).sort((a,b) => a.nome_aluno.localeCompare(b.nome_aluno));
    return `
      <div style="margin-bottom:2rem;page-break-inside:avoid">
        <h2 style="font-size:1rem;margin:0 0 0.2rem">${escapeHtml(t.nome_turma)}</h2>
        <div style="font-size:0.8rem;color:#475569;margin-bottom:0.75rem">${SEGMENTO_LABEL[t.segmento]||t.segmento} · ${escapeHtml(t.serie)} · ${TURNO_L[t.turno]||t.turno} · ${alunos.length}/${t.capacidade||'–'} alunos</div>
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem">
          <thead><tr><th style="text-align:left;padding:0.3rem 0.5rem;border-bottom:1px solid #0f172a">#</th><th style="text-align:left;padding:0.3rem 0.5rem;border-bottom:1px solid #0f172a">Nome</th><th style="text-align:left;padding:0.3rem 0.5rem;border-bottom:1px solid #0f172a">Série solicitada</th></tr></thead>
          <tbody>${alunos.length
            ? alunos.map((a,i) => `<tr><td style="padding:0.3rem 0.5rem;border-bottom:1px solid #e2e8f0">${i+1}</td><td style="padding:0.3rem 0.5rem;border-bottom:1px solid #e2e8f0">${escapeHtml(a.nome_aluno)}</td><td style="padding:0.3rem 0.5rem;border-bottom:1px solid #e2e8f0">${escapeHtml(a.turma||'–')}</td></tr>`).join('')
            : '<tr><td colspan="3" style="padding:0.5rem;color:#94a3b8">Sem alunos enturmados.</td></tr>'
          }</tbody>
        </table>
      </div>`;
  }).join('<hr style="border:none;border-top:1px solid #e2e8f0;margin:1.5rem 0">');

  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html lang="pt-br"><head><meta charset="UTF-8">
    <title>Relatório por Turma – Colégio Plenus</title>
    <style>body{font-family:Inter,sans-serif;padding:2rem;color:#0f172a}h1{font-size:1.3rem;margin-bottom:0.25rem}.sub{font-size:0.85rem;color:#475569;margin-bottom:2rem}@media print{body{padding:1rem}}</style>
    </head><body>
    <h1>Relatório por Turma</h1>
    <div class="sub">Colégio Plenus · Gerado em ${new Date().toLocaleString('pt-BR')}</div>
    ${blocos}
    <script>window.onload=()=>{window.print();}<\/script>
    </body></html>`);
  win.document.close();
}

function exportarCSV() {
  if (!todasSolicitacoes.length) { showToast('⚠️ Carregue as solicitações primeiro.'); return; }

  const STATUS = { pendente: 'Pendente', em_analise: 'Em Análise', aprovado: 'Aprovado', reprovado: 'Reprovado' };
  const SEG    = { educacao_infantil: 'Ed. Infantil', fundamental1: 'Fund. 1', fundamental2: 'Fund. 2', ensino_medio: 'Ensino Médio' };
  const TURNO  = { manha: 'Manhã', tarde: 'Tarde', tanto_faz: 'Tanto Faz' };

  const linhas = [['Responsável','E-mail','Telefone','Status','Data','Aluno','Segmento','Série','Turno','Mensalidade Anterior','Desconto Almejado (%)','Tipo Permuta']];

  todasSolicitacoes.forEach(s => {
    const r    = s.responsavel || {};
    const data = new Date(s.created_at).toLocaleDateString('pt-BR');
    const alunos = s.alunos || [];
    if (!alunos.length) {
      linhas.push([r.nome||'', r.email||'', r.telefone||'', STATUS[s.status]||s.status, data, '', '', '', '', s.valor_mensalidade_anterior||'', s.taxa_desconto_almejada||'', s.tipo_permuta||'']);
    } else {
      alunos.forEach(a => {
        linhas.push([r.nome||'', r.email||'', r.telefone||'', STATUS[s.status]||s.status, data, a.nome_aluno||'', SEG[a.segmento]||a.segmento||'', a.turma||'', TURNO[a.turno]||a.turno||'', s.valor_mensalidade_anterior||'', s.taxa_desconto_almejada||'', s.tipo_permuta||'']);
      });
    }
  });

  const csv = linhas.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `solicitacoes_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('✅ CSV exportado!');
}

async function carregarLogs() {
  const timeline = document.getElementById('logs-timeline');
  timeline.innerHTML = `<div class="empty-state"><span class="empty-icon">⏳</span><p>Carregando...</p></div>`;

  const { data, error } = await cliente
    .from('logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(300);

  if (error) {
    timeline.innerHTML = `<div class="alert alert-error">Erro: ${error.message}</div>`;
    return;
  }

  todosLogs = data || [];

  // Stats
  const hoje = new Date().toDateString();
  const uniqResp  = new Set(todosLogs.filter(l => l.tipo_usuario === 'responsavel').map(l => l.usuario_id)).size;
  const uniqColab = new Set(todosLogs.filter(l => l.tipo_usuario === 'colaborador').map(l => l.usuario_id)).size;

  document.getElementById('log-stat-total').textContent         = todosLogs.length;
  document.getElementById('log-stat-responsaveis').textContent  = uniqResp;
  document.getElementById('log-stat-colaboradores').textContent = uniqColab;
  document.getElementById('log-stat-hoje').textContent          = todosLogs.filter(l => new Date(l.created_at).toDateString() === hoje).length;

  // Preencher select de ações com o que existir nos dados
  filtrarLogs();
}

function filtrarLogs() {
  const busca = document.getElementById('log-busca').value.toLowerCase().trim();
  const tipo  = document.getElementById('log-filtro-tipo').value;
  const acao  = document.getElementById('log-filtro-acao').value;

  let lista = todosLogs;
  if (tipo)  lista = lista.filter(l => l.tipo_usuario === tipo);
  if (acao)  lista = lista.filter(l => l.acao === acao);
  if (busca) lista = lista.filter(l =>
    [l.nome_usuario, l.acao, l.descricao].join(' ').toLowerCase().includes(busca)
  );

  document.getElementById('log-count').textContent =
    `${lista.length} registro${lista.length !== 1 ? 's' : ''} encontrado${lista.length !== 1 ? 's' : ''}`;

  renderLogsTimeline(lista);
}

function renderLogsTimeline(lista) {
  const timeline = document.getElementById('logs-timeline');

  if (!lista.length) {
    timeline.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📭</span>
        <p>Nenhum registro encontrado com os filtros aplicados.</p>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('log-busca').value='';document.getElementById('log-filtro-tipo').value='';document.getElementById('log-filtro-acao').value='';filtrarLogs()">
          Limpar filtros
        </button>
      </div>`;
    return;
  }

  // Agrupar por dia
  const grupos = {};
  lista.forEach(log => {
    const dia = new Date(log.created_at).toLocaleDateString('pt-BR', { weekday:'long', day:'2-digit', month:'long', year:'numeric' });
    if (!grupos[dia]) grupos[dia] = [];
    grupos[dia].push(log);
  });

  const hoje    = new Date().toLocaleDateString('pt-BR', { weekday:'long', day:'2-digit', month:'long', year:'numeric' });
  const ontem   = new Date(Date.now() - 86400000).toLocaleDateString('pt-BR', { weekday:'long', day:'2-digit', month:'long', year:'numeric' });

  timeline.innerHTML = Object.entries(grupos).map(([dia, logs]) => {
    const diaLabel = dia === hoje ? '🗓️ Hoje' : dia === ontem ? '🗓️ Ontem' : `🗓️ ${dia.charAt(0).toUpperCase() + dia.slice(1)}`;
    return `
      <div class="log-grupo">
        <div class="log-grupo-header">${diaLabel} <span class="log-grupo-count">${logs.length}</span></div>
        <div class="card" style="padding:0;overflow:hidden">
          ${logs.map((log, idx) => {
            const cfg       = ACAO_ICON[log.acao] || { icon: '⚡', label: log.acao, cor: '#6b7280', bg: '#f9fafb' };
            const hora      = new Date(log.created_at).toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
            const isColab   = log.tipo_usuario === 'colaborador';
            const tipoCls   = isColab ? 'log-tipo-colaborador' : 'log-tipo-responsavel';
            const tipoLabel = isColab ? '⚙ Colaborador' : '👤 Responsável';
            const border    = idx < logs.length - 1 ? 'border-bottom:1px solid var(--gray-light)' : '';
            return `
              <div class="log-item" style="${border}">
                <div class="log-item-icon" style="background:${cfg.bg};color:${cfg.cor}">${cfg.icon}</div>
                <div class="log-item-body">
                  <div class="log-item-top">
                    <span class="log-item-acao" style="color:${cfg.cor}">${cfg.label}</span>
                    <span class="log-tipo-badge ${tipoCls}">${tipoLabel}</span>
                    <span class="log-item-hora">🕐 ${hora}</span>
                  </div>
                  <div class="log-item-usuario">👤 <strong>${escapeHtml(log.nome_usuario || '–')}</strong></div>
                  ${log.descricao ? `<div class="log-item-desc" style="white-space:pre-wrap;word-break:break-word">${escapeHtml(log.descricao)}</div>` : ''}
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');
}

// ============================================================
//  PERFIL DO COLABORADOR
// ============================================================
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

  btn.disabled  = true;
  btn.innerHTML = '<span class="loading"></span> Salvando...';

  const [{ error: errColab }, { error: errUsuario }] = await Promise.all([
    cliente.from('colaboradores').update({ nome }).eq('id', user.id),
    cliente.from('usuarios').update({ telefone }).eq('id', user.id)
  ]);

  btn.disabled  = false;
  btn.innerHTML = '💾 Salvar Alterações';

  if (errColab)   { alertDiv.innerHTML = `<div class="alert alert-error">${errColab.message}</div>`; return; }
  if (errUsuario) { alertDiv.innerHTML = `<div class="alert alert-error">${errUsuario.message}</div>`; return; }

  document.getElementById('sidebar-nome').textContent         = nome;
  document.getElementById('profile-nome-display').textContent = nome;
  await registrarLog('editar_perfil', 'colaboradores', user.id, 'Perfil do colaborador atualizado');
  showToast('✅ Perfil atualizado!');
}

async function alterarEmailPerfil() {
  const btn      = document.getElementById('btn-alterar-email');
  const alertDiv = document.getElementById('email-alert');
  const novoEmail = document.getElementById('perfil-novo-email').value.trim().toLowerCase();
  alertDiv.innerHTML = '';
  if (!novoEmail) { alertDiv.innerHTML = `<div class="alert alert-error">Informe o novo e-mail.</div>`; return; }

  btn.disabled = true; btn.innerHTML = '<span class="loading"></span> Enviando...';
  const { error } = await cliente.auth.updateUser({ email: novoEmail });
  btn.disabled = false; btn.innerHTML = '📧 Enviar link de confirmação';

  if (error) { alertDiv.innerHTML = `<div class="alert alert-error">${error.message}</div>`; return; }
  alertDiv.innerHTML = `<div class="alert alert-info">Link enviado! Verifique <strong>${novoEmail}</strong> para confirmar a alteração.</div>`;
  document.getElementById('perfil-novo-email').value = '';
}

async function alterarSenhaPerfil() {
  const btn         = document.getElementById('btn-alterar-senha');
  const alertDiv    = document.getElementById('senha-alert');
  const senhaAtual  = document.getElementById('perfil-senha-atual').value;
  const novaSenha   = document.getElementById('perfil-nova-senha').value;
  const confirmar   = document.getElementById('perfil-confirmar-senha').value;
  alertDiv.innerHTML = '';

  if (!senhaAtual) { alertDiv.innerHTML = `<div class="alert alert-error">Informe a senha atual.</div>`; return; }
  if (!novaSenha)  { alertDiv.innerHTML = `<div class="alert alert-error">Informe a nova senha.</div>`; return; }
  if (novaSenha.length < 6) { alertDiv.innerHTML = `<div class="alert alert-error">A nova senha deve ter pelo menos 6 caracteres.</div>`; return; }
  if (novaSenha !== confirmar) { alertDiv.innerHTML = `<div class="alert alert-error">As senhas não coincidem.</div>`; return; }

  btn.disabled = true; btn.innerHTML = '<span class="loading"></span> Verificando...';

  // Verificar senha atual via re-autenticação
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

  document.getElementById('perfil-senha-atual').value   = '';
  document.getElementById('perfil-nova-senha').value    = '';
  document.getElementById('perfil-confirmar-senha').value = '';
  alertDiv.innerHTML = `<div class="alert alert-success">✅ Senha alterada com sucesso!</div>`;
  await registrarLog('alterar_senha', 'colaboradores', user.id, 'Senha alterada pelo colaborador');
}

// ============================================================
//  HELPERS
// ============================================================
function formatarMoedaExibicao(value) {
  if (!value && value !== 0) return '–';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
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
