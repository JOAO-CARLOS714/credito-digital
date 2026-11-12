export const getStyles = (isLightMode) => ({
  container: {
    minHeight: '100vh',
    background: isLightMode
      ? 'radial-gradient(circle at 50% 0%, #f0f4f8 0%, #d9e2ec 48%, #bcccdc 100%)'
      : 'radial-gradient(circle at 50% 0%, #102d5c 0%, #06122b 48%, #030a19 100%)',
    fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    color: isLightMode ? '#102a43' : '#fff',
    overflowX: 'hidden',
    transition: 'background 0.3s ease, color 0.3s ease'
  },
  headerWrapper: {
    padding: '15px 12px 0',
    maxWidth: '1280px',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box'
  },
  nav: {
    background: isLightMode ? 'rgba(255, 255, 255, .86)' : 'rgba(10, 25, 55, .86)',
    backdropFilter: 'blur(16px)',
    border: isLightMode ? '1px solid rgba(116, 146, 177, .35)' : '1px solid rgba(70, 111, 170, .35)',
    borderBottom: isLightMode ? '2px solid #bcccdc' : '2px solid #1e4785',
    borderRadius: '20px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 20px 50px rgba(0,0,0,.15)',
    flexWrap: 'wrap',
    gap: '12px',
    boxSizing: 'border-box'
  },
  logoBox: {
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    background: isLightMode ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.08)',
    color: '#e0ab2b',
    border: isLightMode ? '1px solid rgba(0,0,0,.1)' : '1px solid rgba(255,255,255,.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  themeToggleBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    background: isLightMode ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.08)',
    border: isLightMode ? '1px solid rgba(0,0,0,.1)' : '1px solid rgba(255,255,255,.12)',
    color: '#e0ab2b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0
  },
  btnGold: {
    background: '#e0ab2b',
    color: '#06122b',
    border: 'none',
    borderRadius: '12px',
    padding: '10px 18px',
    fontWeight: 800,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '13px'
  },
  btnOutline: {
    background: 'transparent',
    color: isLightMode ? '#102a43' : '#fff',
    border: isLightMode ? '1px solid #748aa6' : '1px solid #31588f',
    borderRadius: '12px',
    padding: '9px 16px',
    fontWeight: 700,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '13px'
  },
  main: {
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '25px 12px 50px',
    boxSizing: 'border-box'
  },
  card: {
    background: isLightMode
      ? 'linear-gradient(145deg, rgba(255,255,255,.96), rgba(240,244,248,.98))'
      : 'linear-gradient(145deg, rgba(13,33,71,.96), rgba(3,10,25,.98))',
    border: isLightMode ? '1px solid rgba(116,146,177,.4)' : '1px solid rgba(45,91,148,.55)',
    borderRadius: '24px',
    padding: '20px',
    boxShadow: isLightMode ? '0 30px 80px rgba(0,0,0,.08)' : '0 30px 80px rgba(0,0,0,.45)',
    boxSizing: 'border-box',
    width: '100%',
    color: isLightMode ? '#102a43' : '#fff'
  },
  inputGroup: {
    marginBottom: '16px',
    width: '100%',
    boxSizing: 'border-box'
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 800,
    marginBottom: '6px',
    color: isLightMode ? '#334e68' : '#dce5f1'
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    borderRadius: '12px',
    background: isLightMode ? '#ffffff' : 'rgba(2,8,20,.8)',
    border: isLightMode ? '1px solid #bcccdc' : '1px solid #294c7e',
    color: isLightMode ? '#102a43' : '#fff',
    outline: 'none',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    border: 'none',
    borderRadius: '12px',
    background: '#e0ab2b',
    color: '#06122b',
    padding: '14px',
    fontWeight: 900,
    cursor: 'pointer',
    marginTop: '6px',
    boxSizing: 'border-box',
    fontSize: '14px'
  },
  message: {
    marginTop: '15px',
    padding: '12px 14px',
    borderRadius: '10px',
    background: 'rgba(224,171,43,.1)',
    border: '1px solid rgba(224,171,43,.35)',
    color: isLightMode ? '#8a6d0b' : '#f1ce69',
    fontSize: '13px',
    boxSizing: 'border-box'
  }
});
