const SUPABASE_URL = 'https://smcknyxebqzyqigtbqdg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtY2tueXhlYnF6eXFpZ3RicWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDM4MzEsImV4cCI6MjA5MDYxOTgzMX0.nPXHV3FjXl4E-QTbFz2UJnW6WADBXrbWXJ4Emuuy48Y';

const cliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Telefone ────────────────────────────────────────────────
function formatarTelefone(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 11);
  if (v.length <= 10) {
    v = v.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/, (_, a, b, c) =>
      a ? (b ? `(${a}) ${b}${c ? '-'+c : ''}` : `(${a}`) : '');
  } else {
    v = v.replace(/^(\d{2})(\d{5})(\d{0,4})$/, (_, a, b, c) =>
      `(${a}) ${b}${c ? '-'+c : ''}`);
  }
  input.value = v;
}

function validarTelefone(tel) {
  const d = (tel || '').replace(/\D/g, '');
  return d.length === 10 || d.length === 11;
}