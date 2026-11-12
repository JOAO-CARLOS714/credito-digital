import React, { useEffect, useState } from 'react';
import { getStyles } from './styles/theme';
import { fetchSolicitacoesSupabase } from './services/supabaseService';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [isLightMode, setIsLightMode] = useState(false);
  const styles = getStyles(isLightMode);

  useEffect(() => {
    async function carregarDados() {
      try {
        const data = await fetchSolicitacoesSupabase();
        console.log('Dados carregados do Supabase:', data);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }
    }
    carregarDados();
  }, []);

  if (screen === 'home') {
    return (
      <div style={styles.container}>
        <Header 
          onHome={() => setScreen('home')} 
          right={<button style={styles.btnGold} onClick={() => setScreen('login')}>Acessar</button>} 
          isLightMode={isLightMode} 
          setIsLightMode={setIsLightMode} 
          styles={styles} 
        />
        <main style={styles.main}>
          <div style={styles.card}>
            <h1 style={{ textAlign: 'center', margin: 0 }}>CredDigital Modular</h1>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>O seu código agora está totalmente organizado em pastas e arquivos separados!</p>
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
