import React from 'react';
import { BuildingIcon, SunIcon, MoonIcon } from '../icons/Icons';

export default function Header({ onHome, right, isLightMode, setIsLightMode, styles }) {
  return (
    <header style={styles.headerWrapper}>
      <nav style={styles.nav}>
        <button
          onClick={onHome}
          style={{
            background: 'none',
            border: 'none',
            color: isLightMode ? '#102a43' : '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '18px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <span style={styles.logoBox}>
            <BuildingIcon />
          </span>
          CredDigital
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            style={styles.themeToggleBtn}
          >
            {isLightMode ? <MoonIcon /> : <SunIcon />}
          </button>
          {right}
        </div>
      </nav>
    </header>
  );
}
