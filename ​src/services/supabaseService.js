import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/supabase';

export async function fetchSolicitacoesSupabase() {
  const resposta = await fetch(`${SUPABASE_URL}/rest/v1/solicitacoes?select=*`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });
  return await resposta.json();
}

export async function createSolicitacaoSupabase(dadosSupabase) {
  return await fetch(`${SUPABASE_URL}/rest/v1/solicitacoes`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(dadosSupabase)
  });
}
