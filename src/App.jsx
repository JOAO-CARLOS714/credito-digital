import React, { useEffect, useState } from 'react';
import { getStyles } from './styles/theme';
import { fetchSolicitacoesSupabase, supabase } from './services/supabaseService';
import Header from './components/common/Header';
import Footer from './components/common/Footer';


export default function App() {
  const [screen, setScreen] = useState('home');
  const [isLightMode, setIsLightMode] = useState(false);
  const styles = getStyles(isLightMode);

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function carregarDados() {
      try {
        const data = await fetchSolicitacoesSupabase();
        if (Array.isArray(data)) {
          setSolicitacoes(data);
        }
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }
    }
    carregarDados();
  }, []);

    const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      // Faz o login ativo no Supabase gerando a sessão 'authenticated'
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });

      if (error) {
        throw new Error('E-mail ou senha inválidos.');
      }

      setScreen('admin');
      setMessage('');
      
      // Carrega os dados agora com a sessão autenticada ativa
      const dadosAtualizados = await fetchSolicitacoesSupabase();
      setSolicitacoes(dadosAtualizados);
      
    } catch (error) {
      setMessage(error.message || 'Credenciais administrativas inválidas.');
    }
  };


  if (screen === 'home') {
    return (
      <div style={styles.container}>
        <Header 
          onHome={() => setScreen('home')} 
          right={
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={styles.btnOutline} onClick={() => setScreen('adminLogin')}>
                Área Administrativa
              </button>
              <button style={styles.btnGold} onClick={() => setScreen('login')}>
                Acessar
              </button>
            </div>
          } 
          isLightMode={isLightMode} 
          setIsLightMode={setIsLightMode} 
          styles={styles} 
        />
        <main style={styles.main}>
          <div style={styles.card}>
            <h1 style={{ textAlign: 'center', margin: 0 }}>CredDigital Modular</h1>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>O seu sistema está seguro e modularizado!</p>
          </div>
        </main>
        <Footer isLightMode={isLightMode} />
      </div>
    );
  }

  if (screen === 'adminLogin') {
    return (
      <div style={styles.container}>
        <Header onHome={() => setScreen('home')} isLightMode={isLightMode} setIsLightMode={setIsLightMode} styles={styles} />
        <main style={{ ...styles.main, maxWidth: '400px' }}>
          <div style={styles.card}>
            <h2 style={{ textAlign: 'center', marginTop: 0 }}>Painel Administrativo</h2>
            <form onSubmit={handleAdminLogin}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>E-mail</label>
                <input 
                  type="email" 
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                  value={adminEmail} 
                  onChange={(e) => setAdminEmail(e.target.value)} 
                  placeholder="admin@creddigital.com"
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Senha</label>
                <input 
                  type="password" 
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                  value={adminPassword} 
                  onChange={(e) => setAdminPassword(e.target.value)} 
                  placeholder="******"
                />
              </div>
              <button type="submit" style={{ ...styles.btnGold, width: '100%', padding: '12px' }}>Entrar</button>
            </form>
            {message && <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '10px', fontSize: '13px' }}>{message}</p>}
          </div>
        </main>
        <Footer isLightMode={isLightMode} />
      </div>
    );
  }

  if (screen === 'admin') {
    return (
      <div style={styles.container}>
        <Header onHome={() => setScreen('home')} right={<button style={styles.btnOutline} onClick={() => setScreen('home')}>Sair</button>} isLightMode={isLightMode} setIsLightMode={setIsLightMode} styles={styles} />
        <main style={styles.main}>
          <div style={styles.card}>
            <h2>Gerenciamento de Solicitações</h2>
            <p style={{ fontSize: '13px', opacity: 0.8 }}>Total de registros encontrados: {solicitacoes.length}</p>
            
            {solicitacoes.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '20px' }}>Nenhuma solicitação encontrada ou aguardando autenticação da sessão.</p>
            ) : (
              <div style={{ overflowX: 'auto', marginTop: '15px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                      <th style={{ padding: '8px' }}>ID</th>
                      <th style={{ padding: '8px' }}>E-mail</th>
                      <th style={{ padding: '8px' }}>CPF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitacoes.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '8px' }}>{item.id}</td>
                        <td style={{ padding: '8px' }}>{item.cliente?.email || item.email}</td>
                        <td style={{ padding: '8px' }}>{item.cliente?.cpf || item.cpf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
        <Footer isLightMode={isLightMode} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <p style={{ textAlign: 'center', padding: '50px' }}>Carregando telas...</p>
    </div>
  );
}
