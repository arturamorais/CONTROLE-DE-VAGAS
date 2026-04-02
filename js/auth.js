async function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const { data, error } = await cliente.auth.signInWithPassword({ email, password: senha });
  if (error) {
    Swal.fire({ icon: 'error', title: 'Erro ao entrar', text: error.message, confirmButtonColor: '#1a56db' });
    return;
  }

  // Verifica se é colaborador → redireciona ao painel admin
  const { data: colab } = await cliente
    .from('colaboradores')
    .select('id, ativo')
    .eq('id', data.user.id)
    .single();

  if (colab && colab.ativo) {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'dashboard.html';
  }
}

async function cadastrar() {
  const nome     = document.getElementById('nomeCadastro').value.trim();
  const email    = document.getElementById('emailCadastro').value.trim();
  const telefone = document.getElementById('telefoneCadastro').value.trim();
  const senha    = document.getElementById('senhaCadastro').value;

  const { data, error } = await cliente.auth.signUp({ email, password: senha });
  if (error) {
    Swal.fire({ icon: 'error', title: 'Erro no cadastro', text: error.message, confirmButtonColor: '#1a56db' });
    return;
  }

  const user = data.user;

  // Tenta inserir com email; se falhar por coluna inexistente, insere sem email
  let erroPerfil;
  ({ error: erroPerfil } = await cliente
    .from('usuarios')
    .insert([{ id: user.id, nome, telefone, email }]));

  if (erroPerfil && erroPerfil.message && erroPerfil.message.includes('email')) {
    ({ error: erroPerfil } = await cliente
      .from('usuarios')
      .insert([{ id: user.id, nome, telefone }]));
  }

  if (erroPerfil) {
    Swal.fire({ icon: 'error', title: 'Erro ao salvar perfil', text: erroPerfil.message, confirmButtonColor: '#1a56db' });
    return;
  }

  await Swal.fire({
    icon: 'success',
    title: 'Conta criada!',
    text: 'Verifique seu e-mail para confirmar o cadastro.',
    confirmButtonColor: '#1a56db'
  });
  window.location.href = 'index.html';
}
