import React from 'react';

export default function Footer({ isLightMode }) {
  return (
    <footer style={{
      padding: '30px 12px',
      textAlign: 'center',
      color: isLightMode ? '#486581' : '#71839d',
      fontSize: '12px'
    }}>
      <p>© {new Date().getFullYear()} CredDigital S.A. • Todos os direitos reservados.</p>
    </footer>
  );
}
