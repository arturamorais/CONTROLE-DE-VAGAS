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
  aprovado:    'Aprovado',
  reprovado:   'Reprovado',
  cancelado:   'Cancelado',
  matriculado: 'Matriculado'
};

const CARGO_LABEL = {
  admin:        'Administrador',
  colaborador:  'Colaborador'
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
  aprovado:    'Aprovado. O aluno(a) será dirigido(a) para efetivação de matrícula.',
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

  if (colab.cargo === 'admin') {
    document.getElementById('nav-colaboradores').style.display = '';
    document.getElementById('nav-dados').style.display = '';
  }

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

  if (!lista?.length) {
    container.innerHTML = `<div class="empty-state" style="padding:1.5rem"><span class="empty-icon">👥</span><p>Nenhum colaborador cadastrado.</p></div>`;
    return;
  }

  const isAdmin = cargoAtual === 'admin';

  container.innerHTML = lista.map(c => {
    const email    = emailMap[c.id] || '—';
    const cargoLbl = CARGO_LABEL[c.cargo] || c.cargo;
    const ativoClr = c.ativo ? '#22c55e' : '#94a3b8';
    const ativoTxt = c.ativo ? 'Ativo' : 'Inativo';

    const controles = isAdmin ? `
      <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap">
        <select style="font-size:0.78rem;padding:0.3rem 0.5rem;border:1px solid var(--gray-light);border-radius:0.5rem;background:var(--white);color:var(--navy-mid)"
          onchange="alterarCargoColaborador('${c.id}', this.value)">
          <option value="colaborador" ${c.cargo === 'colaborador' ? 'selected' : ''}>Colaborador</option>
          <option value="admin"       ${c.cargo === 'admin'       ? 'selected' : ''}>Administrador</option>
        </select>
        <button class="btn btn-sm" style="font-size:0.78rem;padding:0.3rem 0.75rem;background:${c.ativo ? '#fee2e2' : '#dcfce7'};color:${c.ativo ? '#b91c1c' : '#15803d'};border:1px solid ${c.ativo ? '#fca5a5' : '#86efac'};border-radius:0.5rem"
          onclick="toggleColaboradorAtivo('${c.id}', ${c.ativo})">
          ${c.ativo ? '🔴 Desativar' : '🟢 Ativar'}
        </button>
      </div>` : '';

    return `
      <div style="display:flex;align-items:center;padding:0.875rem 0;border-bottom:1px solid var(--gray-light);gap:1rem;flex-wrap:wrap">
        <div style="flex:1;min-width:150px">
          <div style="font-weight:600;font-size:0.875rem">${c.nome}</div>
          <div style="font-size:0.78rem;color:var(--gray-dark)">${email}</div>
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
  const email = document.getElementById('colab-email-input').value.trim().toLowerCase();
  const cargo = document.getElementById('colab-cargo-select').value;
  const alert = document.getElementById('colab-modal-alert');
  const btn   = document.getElementById('btn-salvar-colab');

  alert.innerHTML = '';
  if (!email) {
    alert.innerHTML = `<div class="alert alert-error">Informe o e-mail do usuário.</div>`;
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Buscando...';

  const { data: usuario } = await cliente
    .from('usuarios')
    .select('id, nome')
    .eq('email', email)
    .single();

  if (!usuario) {
    alert.innerHTML = `<div class="alert alert-error">Usuário não encontrado. O usuário precisa se cadastrar no sistema primeiro.</div>`;
    btn.disabled = false;
    btn.innerHTML = '➕ Adicionar';
    return;
  }

  // Verificar se já é colaborador
  const { data: jaExiste } = await cliente
    .from('colaboradores')
    .select('id, ativo')
    .eq('id', usuario.id)
    .single();

  if (jaExiste) {
    alert.innerHTML = `<div class="alert alert-error">Este usuário já é um colaborador.</div>`;
    btn.disabled = false;
    btn.innerHTML = '➕ Adicionar';
    return;
  }

  const { error } = await cliente.from('colaboradores').insert({
    id:    usuario.id,
    nome:  usuario.nome,
    cargo,
    ativo: true
  });

  if (error) {
    alert.innerHTML = `<div class="alert alert-error">Erro ao adicionar: ${error.message}</div>`;
    btn.disabled = false;
    btn.innerHTML = '➕ Adicionar';
    return;
  }

  await registrarLog('adicionar_colaborador', 'colaboradores', usuario.id,
    `Colaborador ${usuario.nome} (${email}) adicionado com cargo ${CARGO_LABEL[cargo]}`);

  fecharColabModal();
  showToast('✅ Colaborador adicionado com sucesso!');
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
  document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  const nav = document.querySelector(`[data-section="${name}"]`);
  if (nav) nav.classList.add('active');
  const titles = {
    'overview':       'Início',
    'solicitacoes':   'Solicitações',
    'enturmar':       'Enturmar',
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

  const { data: solicitacoes, error } = await cliente
    .from('interesse_vagas')
    .select('*, alunos(*, alocacoes(id, turmas(nome_turma, serie, segmento, turno)))')
    .order('created_at', { ascending: false });

  if (error) {
    container.innerHTML = `<div class="alert alert-error">Erro: ${error.message}</div>`;
    return;
  }

  // Buscar perfis dos responsáveis
  const ids = [...new Set((solicitacoes || []).map(s => s.usuario_id))];
  const { data: perfis } = ids.length
    ? await cliente.from('usuarios').select('id, nome, telefone, email').in('id', ids)
    : { data: [] };
  const pm = Object.fromEntries((perfis || []).map(p => [p.id, p]));

  todasSolicitacoes = (solicitacoes || []).map(s => ({
    ...s,
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
      ? `<span style="font-size:0.68rem;font-weight:700;padding:0.2rem 0.55rem;border-radius:9999px;background:${slaBg};color:${slaCor};border:1px solid ${slaBorder};white-space:nowrap">⏱ ${dias === 0 ? 'Hoje' : dias === 1 ? '1 dia' : dias + ' dias'}</span>`
      : '';

    const totalAlunos  = alunos.length;
    const aprov        = alunos.filter(a => (a.status_aluno || 'pendente') === 'aprovado').length;
    const reprov       = alunos.filter(a => (a.status_aluno || 'pendente') === 'reprovado').length;
    const temRessalva  = (s.status === 'aprovado' || s.status === 'matriculado') && totalAlunos > 0 && aprov < totalAlunos;
    const badgeLabel   = temRessalva ? 'Aprovado com ressalvas' : STATUS_LABEL[s.status];

    const alunosTags = alunos.map(a => {
      const st = a.status_aluno || 'pendente';
      const cor = st === 'aprovado' ? 'background:#dcfce7;color:#15803d;border-color:#bbf7d0'
                : st === 'reprovado' ? 'background:#fee2e2;color:#dc2626;border-color:#fecaca'
                : '';
      return `<span class="aluno-tag" style="${cor}">🎒 ${a.nome_aluno} · ${SEGMENTO_LABEL[a.segmento] || a.segmento} · ${a.turma}</span>`;
    }).join('');

    const guiaBtn = GUIA_BTN[s.status]
      ? `<button class="btn ${GUIA_BTN[s.status].cls} btn-sm" onclick="event.stopPropagation(); abrirGuiaModal('${s.id}')">${GUIA_BTN[s.status].label}</button>`
      : '';

    const ressalvaHtml = temRessalva ? `
      <div style="background:#fef3c7;border:1px solid #fde68a;border-left:3px solid #f59e0b;border-radius:0 0.5rem 0.5rem 0;padding:0.5rem 0.75rem;font-size:0.78rem;color:#92400e;line-height:1.5">
        ⚠️ <strong>Aprovado com ressalvas:</strong> ${aprov} de ${totalAlunos} aluno${totalAlunos !== 1 ? 's' : ''} aprovado${aprov !== 1 ? 's' : ''}${reprov > 0 ? ` · ${reprov} reprovado${reprov !== 1 ? 's' : ''}` : ''}.
      </div>` : '';

    return `
      <div class="solicitacao-admin-card border-${s.status}" onclick="abrirDetalhe('${s.id}')">
        <div class="card-row-top">
          <div class="meta">
            <span class="status-badge status-${s.status}">${badgeLabel}</span>
            ${slaHtml}
            <span class="card-data">📅 ${dataFmt}</span>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
            ${guiaBtn}
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); abrirDetalhe('${s.id}')">
              Ver Detalhes →
            </button>
          </div>
        </div>

        <div class="info-items">
          <div class="info-item">
            <span class="info-label">Responsável</span>
            <span class="info-value">${resp.nome || '–'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Telefone</span>
            <span class="info-value">${resp.telefone || '–'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">E-mail</span>
            <span class="info-value">${resp.email || '–'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Mensalidade Atual</span>
            <span class="info-value">${s.valor_mensalidade_anterior ? formatarMoedaExibicao(s.valor_mensalidade_anterior) : '–'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Desconto Almejado</span>
            <span class="info-value">${s.taxa_desconto_almejada ? s.taxa_desconto_almejada + '%' : '–'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Permuta</span>
            <span class="info-value">${PERMUTA_LABEL[s.tipo_permuta] || '–'}</span>
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
  const temRessalva = (s.status === 'aprovado' || s.status === 'matriculado') && totalAlunos > 0 && aprov < totalAlunos;
  const badgeLabel  = temRessalva ? 'Aprovado com ressalvas' : STATUS_LABEL[s.status];

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-header">
      <div>
        <h2>${resp.nome || 'Responsável sem nome'}</h2>
        <div class="contato">
          ${resp.email    ? `<span>📧 ${resp.email}</span>` : ''}
          ${resp.telefone ? `<span>📞 ${resp.telefone}</span>` : ''}
          <span>🗓️ ${dataFmt}</span>
        </div>
      </div>
      <button class="btn-modal-close" onclick="fecharModal()">✕</button>
    </div>

    <div class="modal-body">

      <!-- Status -->
      <div class="detalhe-section">
        <div class="detalhe-section-title" style="justify-content:space-between">
          🔖 Status da Solicitação
          ${GUIAS[s.status] ? `<button class="btn btn-secondary btn-sm" style="font-size:0.7rem;padding:0.25rem 0.625rem;text-transform:none;letter-spacing:0" onclick="abrirGuiaModal('${id}')">${{ pendente:'📋 Como Avaliar', em_analise:'🔍 Como Prosseguir', aprovado:'🎓 Próximos Passos' }[s.status]}</button>` : ''}
        </div>
        <div class="detalhe-section-body" style="gap:0.875rem">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.625rem">
            <span class="status-badge status-${s.status}" style="font-size:0.8rem;padding:0.4rem 1rem">${badgeLabel}</span>
            ${gerarBotoesStatus(s.status, id)}
          </div>
          ${temRessalva ? `
          <div style="background:#fef3c7;border:1px solid #fde68a;border-left:3px solid #f59e0b;border-radius:0 0.5rem 0.5rem 0;padding:0.625rem 0.875rem;font-size:0.82rem;color:#92400e;line-height:1.5">
            ⚠️ <strong>Aprovado com ressalvas:</strong> ${aprov} de ${totalAlunos} aluno${totalAlunos !== 1 ? 's' : ''} aprovado${aprov !== 1 ? 's' : ''}${reprov > 0 ? ` · ${reprov} reprovado${reprov !== 1 ? 's' : ''}` : ''}.
            Verifique o status individual de cada aluno abaixo.
          </div>` : ''}
          <div id="ultima-nota-display" style="display:none;background:var(--white-smoke);border:1px solid var(--gray-light);border-left:3px solid var(--blue);border-radius:0 var(--radius-sm) var(--radius-sm) 0;padding:0.625rem 0.875rem">
            <div style="font-size:0.63rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--gray);margin-bottom:0.25rem">💬 Última nota</div>
            <div id="ultima-nota-texto" style="font-size:0.82rem;color:var(--navy-mid);line-height:1.55;white-space:pre-wrap"></div>
            <div id="ultima-nota-meta" style="font-size:0.7rem;color:var(--gray);margin-top:0.25rem"></div>
          </div>
        </div>
      </div>

      <!-- Motivos -->
      <div class="detalhe-section">
        <div class="detalhe-section-title">📋 Motivos</div>
        <div class="detalhe-section-body">
          <div class="detalhe-row">
            <span class="detalhe-label">Motivo da Transferência</span>
            <span class="detalhe-value">${s.motivo_transferencia || '–'}</span>
          </div>
          <div class="detalhe-row">
            <span class="detalhe-label">Por que escolheu o Colégio Plenus</span>
            <span class="detalhe-value">${s.motivo_escolha_plenus || '–'}</span>
          </div>
        </div>
      </div>

      <!-- Financeiro -->
      <div class="detalhe-section">
        <div class="detalhe-section-title">💰 Financeiro</div>
        <div class="detalhe-section-body">
          <div class="detalhe-grid">
            <div class="detalhe-row">
              <span class="detalhe-label">Mensalidade Atual</span>
              <span class="detalhe-value">${s.valor_mensalidade_anterior ? formatarMoedaExibicao(s.valor_mensalidade_anterior) : '–'}</span>
            </div>
            <div class="detalhe-row">
              <span class="detalhe-label">Desconto Almejado</span>
              <span class="detalhe-value">${s.taxa_desconto_almejada ? s.taxa_desconto_almejada + '%' : '–'}</span>
            </div>
            <div class="detalhe-row">
              <span class="detalhe-label">Tem Desconto Atual</span>
              <span class="detalhe-value">${s.tem_desconto ? 'Sim' : 'Não'}</span>
            </div>
            <div class="detalhe-row">
              <span class="detalhe-label">Permuta</span>
              <span class="detalhe-value">${PERMUTA_LABEL[s.tipo_permuta] || '–'}</span>
            </div>
          </div>
          ${s.tem_desconto && s.descricao_desconto ? `
            <div class="detalhe-row">
              <span class="detalhe-label">Descrição do Desconto</span>
              <span class="detalhe-value">${s.descricao_desconto}</span>
            </div>` : ''}
          ${s.tipo_permuta !== 'nao' && s.descricao_permuta ? `
            <div class="detalhe-row">
              <span class="detalhe-label">Descrição da Permuta</span>
              <span class="detalhe-value">${s.descricao_permuta}</span>
            </div>` : ''}
        </div>
      </div>

      <!-- Alunos -->
      <div class="detalhe-section">
        <div class="detalhe-section-title">🎒 Alunos (${alunos.length})</div>
        <div class="detalhe-section-body" id="alunos-detalhe-lista" style="${alunos.length ? 'gap:0;padding:0' : ''}">
          ${renderAlunosDetalhe(alunos, id)}
        </div>
      </div>

      <!-- Histórico -->
      <div class="detalhe-section">
        <div class="detalhe-section-title" style="justify-content:space-between">
          🕐 Histórico de Alterações
          <button class="btn btn-secondary btn-sm" style="font-size:0.7rem;padding:0.25rem 0.625rem;text-transform:none;letter-spacing:0" onclick="abrirObsModal('')">
            + Adicionar Nota
          </button>
        </div>
        <div class="detalhe-section-body" id="historico-lista">
          <div style="display:flex;align-items:center;gap:0.5rem;color:var(--gray);font-size:0.82rem">
            <span class="loading" style="border-color:rgba(0,0,0,0.1);border-top-color:var(--gray)"></span>
            Carregando histórico...
          </div>
        </div>
      </div>

      <p style="text-align:center;font-size:0.72rem;color:var(--gray);margin-top:-0.5rem">
        Criado em ${dataFmt} · Atualizado em ${updFmt}
      </p>
    </div>`;

  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  carregarHistoricoModal(id);
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
const STATUS_ALUNO_LABEL = { pendente: 'Pendente', aprovado: 'Aprovado', reprovado: 'Reprovado' };
const STATUS_ALUNO_CLS   = { pendente: 'status-pendente', aprovado: 'status-aprovado', reprovado: 'status-reprovado' };

function renderAlunosDetalhe(alunos, interesseId) {
  if (!alunos.length) return '<p style="padding:1rem;color:var(--gray);font-size:0.85rem">Nenhum aluno cadastrado.</p>';
  return alunos.map((a, i) => {
    const statusAluno = a.status_aluno || 'pendente';
    const aprovado    = statusAluno === 'aprovado';
    const reprovado   = statusAluno === 'reprovado';
    const alocacao    = a.alocacoes?.[0];
    const turmaInfo   = alocacao?.turmas
      ? `${alocacao.turmas.serie} – ${alocacao.turmas.nome_turma} (${TURNO_LABEL_FULL[alocacao.turmas.turno] || alocacao.turmas.turno})`
      : null;
    return `
      <div class="aluno-detalhe-item" id="aluno-row-${a.id}" style="flex-direction:column;align-items:stretch;padding:0.875rem 1rem;gap:0.625rem">
        <div style="display:flex;align-items:center;gap:0.625rem;flex-wrap:wrap">
          <div class="aluno-badge" style="width:28px;height:28px;font-size:0.75rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--blue),#60a5fa);border-radius:50%;color:white;font-weight:800">${i+1}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:0.875rem;color:var(--navy-mid)">${escapeHtml(a.nome_aluno)}</div>
            <div style="font-size:0.78rem;color:var(--gray-dark)">${SEGMENTO_LABEL[a.segmento] || a.segmento} · ${a.turma} · ${TURNO_LABEL[a.turno] || a.turno}</div>
          </div>
          <span class="status-badge ${STATUS_ALUNO_CLS[statusAluno]}" id="aluno-badge-${a.id}">${STATUS_ALUNO_LABEL[statusAluno]}</span>
        </div>

        ${reprovado && a.motivo_reprovacao ? `
          <div style="background:#fee2e2;border:1px solid #fecaca;border-radius:0.5rem;padding:0.5rem 0.75rem;font-size:0.78rem;color:#dc2626">
            <strong>Motivo:</strong> ${escapeHtml(a.motivo_reprovacao)}
          </div>` : ''}

        ${aprovado ? `
          <div id="aluno-enturma-${a.id}" style="background:${turmaInfo ? '#f0fdf4' : '#fefce8'};border:1px solid ${turmaInfo ? '#bbf7d0' : '#fde68a'};border-radius:0.5rem;padding:0.5rem 0.75rem;font-size:0.78rem;color:${turmaInfo ? '#15803d' : '#92400e'}">
            ${turmaInfo
              ? `🏫 <strong>Enturmado:</strong> ${escapeHtml(turmaInfo)}`
              : `⏳ <strong>Aguardando enturmação</strong> — aprovado mas ainda não alocado em nenhuma turma`}
          </div>` : ''}

        <div id="aluno-acoes-${a.id}" style="display:flex;gap:0.5rem;flex-wrap:wrap">
          ${!aprovado ? `<button class="btn btn-success btn-sm" onclick="aprovarAluno('${a.id}','${interesseId}')">✅ Aprovar</button>` : ''}
          ${!reprovado ? `<button class="btn btn-danger btn-sm" onclick="abrirReprovacaoAluno('${a.id}','${interesseId}')">✕ Reprovar</button>` : ''}
          ${(aprovado || reprovado) ? `<button class="btn btn-secondary btn-sm" onclick="resetarAluno('${a.id}','${interesseId}')">↩ Desfazer</button>` : ''}
        </div>

        <div id="form-reprovacao-${a.id}" style="display:none;flex-direction:column;gap:0.5rem">
          <textarea id="motivo-reprovacao-${a.id}" rows="2" placeholder="Descreva o motivo da reprovação deste aluno..." style="font-size:0.82rem"></textarea>
          <div style="display:flex;gap:0.5rem;justify-content:flex-end">
            <button class="btn btn-secondary btn-sm" onclick="cancelarReprovacaoAluno('${a.id}')">Cancelar</button>
            <button class="btn btn-danger btn-sm" onclick="confirmarReprovacaoAluno('${a.id}','${interesseId}')">✕ Confirmar Reprovação</button>
          </div>
        </div>
      </div>`;
  }).join('');
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
  const { data: upd, error } = await cliente.from('alunos')
    .update({ status_aluno: 'pendente', motivo_reprovacao: null })
    .eq('id', alunoId)
    .select('id');
  if (error) { showToast('❌ Erro: ' + error.message); return; }
  if (!upd?.length) { showToast('❌ Sem permissão para atualizar este aluno. Verifique as políticas RLS.'); return; }

  const s    = todasSolicitacoes.find(x => x.id === interesseId);
  const aluno = s?.alunos?.find(a => a.id === alunoId);
  if (aluno) { aluno.status_aluno = 'pendente'; aluno.motivo_reprovacao = null; }

  const nome = aluno?.nome_aluno || 'Aluno';
  const nomeColab = document.getElementById('sidebar-nome').textContent.trim() || 'Colaborador';
  await registrarHistorico(interesseId, `Status do aluno "${nome}" revertido para Pendente.`, nomeColab);
  await atualizarStatusGeral(interesseId);

  recarregarAlunosDetalhe(interesseId);
  showToast(`↩ ${nome} voltou para Pendente.`);
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
  const acoes = {
    pendente:   [
      { s: 'em_analise', label: '🔍 Em Análise', cls: 'btn-secondary' },
      { s: 'aprovado',   label: '✅ Aprovar',    cls: 'btn-success'   }
    ],
    em_analise: [
      { s: 'pendente',   label: '↩ Pendente',   cls: 'btn-secondary' },
      { s: 'aprovado',   label: '✅ Aprovar',    cls: 'btn-success'   },
      { s: 'reprovado',  label: '✕ Reprovar',   cls: 'btn-danger'    }
    ],
    aprovado:    [
      { s: 'matriculado', label: '🎓 Matricular', cls: 'btn-primary'   },
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
  aprovado:    { titulo: '✅ Aprovar solicitação',        cor: '#15803d', bg: '#dcfce7', border: '#bbf7d0', texto: 'Ao confirmar, o status será alterado para Aprovado e a nota abaixo será registrada no histórico.' },
  reprovado:   { titulo: '✕ Reprovar solicitação',       cor: '#dc2626', bg: '#fee2e2', border: '#fecaca', texto: 'Ao confirmar, o status será alterado para Reprovado e a nota abaixo será registrada no histórico.' },
  em_analise:  { titulo: '🔍 Colocar em Análise',        cor: '#1e40af', bg: '#eff6ff', border: '#bfdbfe', texto: 'Ao confirmar, o status será alterado para Em Análise e a nota abaixo será registrada no histórico.' },
  pendente:    { titulo: '↩ Voltar para Pendente',       cor: '#b45309', bg: '#fef3c7', border: '#fde68a', texto: 'Ao confirmar, o status será alterado para Pendente e a nota abaixo será registrada no histórico.' },
  cancelado:   { titulo: '🚫 Cancelar solicitação',      cor: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', texto: 'Atenção: esta ação cancela uma solicitação já aprovada. A nota abaixo será registrada no histórico.' },
  matriculado: { titulo: '🎓 Confirmar Matrícula',       cor: '#0e7490', bg: '#ecfeff', border: '#a5f3fc', texto: 'Ao confirmar, a matrícula será registrada. O responsável será informado sobre a turma e a possibilidade de ajuste pedagógico.' }
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

async function executarStatusDireto(id, novoStatus) {
  const solAtual       = todasSolicitacoes.find(s => s.id === id);
  const statusAnterior = STATUS_LABEL[solAtual?.status] || '–';
  const alunos         = solAtual?.alunos || [];

  const statusAluno = novoStatus === 'aprovado' ? 'aprovado'
                    : novoStatus === 'reprovado' ? 'reprovado'
                    : 'pendente';

  // Confirmação de atualização em massa dos alunos
  if (alunos.length > 0) {
    const confirmar = await pedirConfirmacaoAlunos(alunos, statusAluno);
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

  await cliente.from('alunos').update({ status_aluno: statusAluno, motivo_reprovacao: null }).eq('interesse_id', id);
  if (solAtual?.alunos) solAtual.alunos.forEach(a => { a.status_aluno = statusAluno; a.motivo_reprovacao = null; });

  await registrarHistorico(id, `Status alterado de "${statusAnterior}" para "${STATUS_LABEL[novoStatus]}"`, nomeColaborador);

  const notaFinal = FRASES_STATUS[novoStatus] || '';
  if (notaFinal) await registrarHistorico(id, notaFinal, nomeColaborador);

  await registrarLog('alterar_status', 'interesse_vagas', id, `Status alterado para "${STATUS_LABEL[novoStatus]}"`);

  if (solAtual) solAtual.status = novoStatus;
  fecharModal();
  showToast(`✅ Solicitação aprovada!`);
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

  const solAtual       = todasSolicitacoes.find(s => s.id === id);
  const statusAnterior = STATUS_LABEL[solAtual?.status] || '–';
  const alunos         = solAtual?.alunos || [];

  const statusAluno = novoStatus === 'aprovado' ? 'aprovado'
                    : novoStatus === 'reprovado' ? 'reprovado'
                    : 'pendente';

  // Confirmação de atualização em massa dos alunos (antes de salvar)
  if (alunos.length > 0) {
    const confirmar = await pedirConfirmacaoAlunos(alunos, statusAluno);
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

  // Propaga o novo status para todos os alunos da solicitação
  await cliente.from('alunos').update({ status_aluno: statusAluno, motivo_reprovacao: null }).eq('interesse_id', id);
  if (solAtual?.alunos) solAtual.alunos.forEach(a => { a.status_aluno = statusAluno; a.motivo_reprovacao = null; });

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
  if (tab === 'alocacao') carregarAlocacao();
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

  // Alunos aprovados com dados da solicitação
  const { data: alunos, error } = await cliente
    .from('alunos')
    .select('*, interesse_vagas(usuario_id, status), alocacoes(id, turma_id, turmas(serie, nome_turma, segmento, turno))')
    .eq('status_aluno', 'aprovado');

  if (error) { container.innerHTML = `<div class="alert alert-error">${error.message}</div>`; return; }

  // Buscar responsáveis
  const ids = [...new Set((alunos || []).map(a => a.interesse_vagas?.usuario_id).filter(Boolean))];
  const { data: perfis } = ids.length
    ? await cliente.from('usuarios').select('id, nome').in('id', ids)
    : { data: [] };
  const pm = Object.fromEntries((perfis || []).map(p => [p.id, p]));

  todosAlunosAprovados = (alunos || []).map(a => ({
    ...a,
    responsavel: pm[a.interesse_vagas?.usuario_id] || {}
  }));

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

async function carregarRelatorios() {
  // 1. Busca dados
  const [{ data: solics }, { data: alunos }] = await Promise.all([
    cliente.from('interesse_vagas').select('id, status, motivo_transferencia, motivo_escolha_plenus, valor_mensalidade_anterior, created_at, usuario_id'),
    cliente.from('alunos').select('interesse_id, segmento, turma, turno')
  ]);

  if (!solics || !alunos) return;

  // ---- KPIs ----
  const total          = solics.length;
  const aprovados      = solics.filter(s => s.status === 'aprovado').length;
  const taxa           = total > 0 ? Math.round((aprovados / total) * 100) : 0;
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

  // ---- helpers ----
  function contarCampo(arr, campo) {
    return arr.reduce((acc, item) => {
      const v = item[campo] || 'Não informado';
      acc[v] = (acc[v] || 0) + 1;
      return acc;
    }, {});
  }

  function contarMotivos(arr, campo, chipValues) {
    const contagem = {};
    arr.forEach(item => {
      const texto = item[campo] || '';
      // Tenta bater com chips conhecidos
      let encontrou = false;
      chipValues.forEach(chip => {
        if (texto.includes(chip)) {
          contagem[chip] = (contagem[chip] || 0) + 1;
          encontrou = true;
        }
      });
      // Texto livre
      if (!encontrou && texto.trim()) {
        contagem['Outros'] = (contagem['Outros'] || 0) + 1;
      }
    });
    return contagem;
  }

  // ---- Paletas ----
  const CORES_STATUS = {
    pendente:   '#f59e0b',
    em_analise: '#3b82f6',
    aprovado:   '#22c55e',
    reprovado:  '#ef4444'
  };
  const LABEL_STATUS = { pendente: 'Pendente', em_analise: 'Em Análise', aprovado: 'Aprovado', reprovado: 'Reprovado' };

  const PAL_BLUE   = ['#1e3a8a','#1e40af','#1d4ed8','#2563eb','#3b82f6','#60a5fa','#93c5fd','#bfdbfe','#dbeafe'];
  const PAL_GREEN  = ['#14532d','#166534','#15803d','#16a34a','#22c55e','#4ade80','#86efac','#bbf7d0'];
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

  // ---- 6. Motivos de saída (bar horizontal) ----
  _destroyChart('motivo-saida');
  const CHIPS_SAIDA = ['Localização / Proximidade','Qualidade de Ensino','Proposta Pedagógica','Infraestrutura','Clima Escolar','Custo-Benefício','Indicação de Amigos/Família','Mudança de Endereço','Metodologia de Ensino'];
  const saidaCount = contarMotivos(solics, 'motivo_transferencia', CHIPS_SAIDA);
  const saidaPares = Object.entries(saidaCount).sort((a,b) => b[1]-a[1]);
  _charts['motivo-saida'] = new Chart(document.getElementById('chart-motivo-saida'), {
    type: 'bar',
    data: {
      labels: saidaPares.map(([k]) => k),
      datasets: [{ label: 'Menções', data: saidaPares.map(([,v]) => v), backgroundColor: PAL_BLUE.slice(0, saidaPares.length), borderRadius: 5 }]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } }, y: { grid: { display: false }, ticks: { font: { size: 11 } } } }
    }
  });

  // ---- 7. Motivos escolha Plenus (bar horizontal) ----
  _destroyChart('motivo-plenus');
  const CHIPS_PLENUS = ['Qualidade Pedagógica','Reputação da Escola','Indicação de Conhecidos','Infraestrutura','Projeto Pedagógico','Localização Favorável','Valores e Cultura da Escola','Atividades Extracurriculares','Clima Escolar'];
  const plenusCont = contarMotivos(solics, 'motivo_escolha_plenus', CHIPS_PLENUS);
  const plenusPares = Object.entries(plenusCont).sort((a,b) => b[1]-a[1]);
  _charts['motivo-plenus'] = new Chart(document.getElementById('chart-motivo-plenus'), {
    type: 'bar',
    data: {
      labels: plenusPares.map(([k]) => k),
      datasets: [{ label: 'Menções', data: plenusPares.map(([,v]) => v), backgroundColor: PAL_GREEN.slice(0, plenusPares.length), borderRadius: 5 }]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } }, y: { grid: { display: false }, ticks: { font: { size: 11 } } } }
    }
  });
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
  btn.disabled  = true;
  btn.innerHTML = '<span class="loading"></span> Salvando...';

  const { error } = await cliente
    .from('colaboradores')
    .update({ nome, telefone })
    .eq('id', user.id);

  btn.disabled  = false;
  btn.innerHTML = '💾 Salvar Alterações';

  if (error) { alertDiv.innerHTML = `<div class="alert alert-error">${error.message}</div>`; return; }

  document.getElementById('sidebar-nome').textContent         = nome;
  document.getElementById('profile-nome-display').textContent = nome;
  await registrarLog('editar_perfil', 'colaboradores', user.id, 'Perfil do colaborador atualizado');
  showToast('✅ Perfil atualizado!');
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
