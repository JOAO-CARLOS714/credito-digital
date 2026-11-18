import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/supabase';

// Inicializa o client oficial do Supabase para gerenciar sessões e banco
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function fetchSolicitacoesSupabase() {
  try {
    // 1. Garante que a sessão atual foi carregada/verificada antes de buscar
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.warn('Nenhum usuário logado detectado no momento da busca.');
      return [];
    }

    // 2. Com a sessão ativa, executa a busca respeitando o RLS
    const { data, error } = await supabase
      .from('solicitacoes')
      .select('*');

    if (error) {
      console.error('Erro do Supabase ao buscar solicitações:', error.message);
      return [];
    }

    return data || [];
  } catch (erro) {
    console.error('Erro de conexão ao buscar dados:', erro);
    return [];
  }
}


export async function createSolicitacaoSupabase(dadosSupabase) {
  try {
    const { data, error } = await supabase
      .from('solicitacoes')
      .insert([dadosSupabase]);

    if (error) {
      console.error('Erro ao inserir no Supabase:', error.message);
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  } catch (erro) {
    console.error('Erro de conexão ao criar solicitação:', erro);
    return { ok: false, error: erro.message };
  }
}
