import React, { useEffect, useState } from 'react';

// =====================================================
// CREDENCIAIS DO SUPABASE
// =====================================================
const SUPABASE_URL = 'https://czruohoudodrnyaoukkf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_WVpfLhbdbLXweYsy8eeUnQ_NRsxIqSe';

export default function App() {

  // =====================================================
  // NAVEGAÇÃO & TEMA
  // =====================================================

  const [screen, setScreen] = useState('home');
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLightMode, setIsLightMode] = useState(false);

  const [message, setMessage] = useState('');

  // =====================================================
  // ESTADOS DE RECUPERAÇÃO DE SENHA (ESQUECEU A SENHA)
  // =====================================================
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: Solicitar Código, 2: Digitar Código e Nova Senha
  const [resetCode, setResetCode] = useState('');
  const [sentResetCode, setSentResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOldAccountRecovery, setIsOldAccountRecovery] = useState(false);

  // =====================================================
  // FORMULÁRIO
  // =====================================================

  const emptyForm = {
    email: '',
    password: '',
    cpf: '',
    renda: '',
    valorCredito: '',
    comprovante: null,
    banco: '',
    agencia: '',
    conta: '',
    tipoConta: ''
  };

  const [form, setForm] = useState(emptyForm);

  const [status, setStatus] = useState({
    cpf: 'pending',
    renda: 'pending',
    facial: 'pending',
    conta: 'pending'
  });

  // =====================================================
  // ADMIN & DADOS DO SUPABASE
  // =====================================================

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [solicitacoes, setSolicitacoes] = useState([]);

  // Carregar solicitações direto do Supabase ao iniciar
  useEffect(() => {
    async function carregarDadosSupabase() {
      try {
        const resposta = await fetch(`${SUPABASE_URL}/rest/v1/solicitacoes?select=*`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });

        const data = await resposta.json();

        if (Array.isArray(data)) {
          const formatados = data.map(item => ({
            id: item.id,
            cliente: { 
              email: item.email || item.Email || 'Não informado', 
              cpf: item.cpf || item.Cpf || '' 
            },
            renda: {
              valor: item.valor_renda,
              valorCredito: item.valor_credito,
              comprovante: item.comprovante,
              status: item.status_renda
            },
            facial: { status: item.status_facial },
            conta: {
              banco: item.banco,
              agencia: item.agencia,
              conta: item.conta,
              tipoConta: item.tipo_conta,
              status: item.status_conta
            },
            status: {
              cpf: item.status_cpf || 'completed',
              renda: item.status_renda || 'completed',
              facial: item.status_facial || 'completed',
              conta: item.status_conta || 'completed'
            },
            criadoEm: item.criado_em || new Date().toISOString()
          }));
          setSolicitacoes(formatados);
        }
      } catch (erro) {
        console.error('Erro ao buscar dados do Supabase:', erro);
      }
    }

    carregarDadosSupabase();
  }, []);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  // =====================================================
  // CARROSSEL
  // =====================================================

  const slides = [
    {
      id: 1,
      badge: 'TECNOLOGIA DE PONTA',
      title: 'Crédito Digital Inteligente',
      description:
        'Uma experiência digital para acompanhar sua solicitação de crédito de forma simples e organizada.',
      bgImage:
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=80'
    },
    {
      id: 2,
      badge: 'ECOSSISTEMA INTEGRADO',
      title: 'Gestão Financeira Digital',
      description:
        'Acompanhe seus dados e etapas em uma plataforma digital centralizada.',
      bgImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80'
    },
    {
      id: 3,
      badge: 'EXPANSÃO EMPRESARIAL',
      title: 'Soluções para Negócios',
      description:
        'Organize suas informações financeiras e acompanhe sua solicitação em um só lugar.',
      bgImage:
        'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1400&q=80'
    }
  ];

  useEffect(() => {
    if (screen !== 'home') return;

    const timer = setInterval(() => {
      setCurrentSlide(prev =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [screen, slides.length]);

  // =====================================================
  // ESTILOS
  // =====================================================

  const styles = {
    container: {
      minHeight: '100vh',
      background: isLightMode
        ? 'radial-gradient(circle at 50% 0%, #f0f4f8 0%, #d9e2ec 48%, #bcccdc 100%)'
        : 'radial-gradient(circle at 50% 0%, #102d5c 0%, #06122b 48%, #030a19 100%)',
      fontFamily:
        '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
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

    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 800,
      fontSize: '18px',
      color: isLightMode ? '#102a43' : '#fff'
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

    navActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap'
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

    hero: {
      textAlign: 'center',
      marginBottom: '30px'
    },

    heroTriangle: {
      width: '100%',
      maxWidth: '320px',
      height: '130px',
      margin: '0 auto 20px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box'
    },

    triangle: {
      position: 'absolute',
      inset: 0,
      background: isLightMode
        ? 'linear-gradient(160deg, #c4d1e1, #8fa3be)'
        : 'linear-gradient(160deg, #12376d, #06122b)',
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      borderBottom: '4px solid #e0ab2b',
      filter: 'drop-shadow(0 30px 25px rgba(0,0,0,.15))'
    },

    heroLogo: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '35px',
      color: isLightMode ? '#102a43' : '#fff'
    },

    carousel: {
      width: '100%',
      maxWidth: '1000px',
      height: '340px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '24px',
      border: isLightMode ? '1px solid rgba(116,146,177,.5)' : '1px solid rgba(45,91,148,.6)',
      boxShadow: '0 30px 70px rgba(0,0,0,.25)',
      boxSizing: 'border-box'
    },

    slide: {
      position: 'absolute',
      inset: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'opacity .7s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxSizing: 'border-box'
    },

    slideOverlay: {
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(180deg, rgba(6,18,43,.55), rgba(3,10,25,.95))'
    },

    slideContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '700px',
      padding: '20px',
      boxSizing: 'border-box'
    },

    badge: {
      display: 'inline-block',
      color: '#e0ab2b',
      background: 'rgba(224,171,43,.13)',
      border: '1px solid rgba(224,171,43,.4)',
      borderRadius: '999px',
      padding: '6px 12px',
      fontSize: '10px',
      fontWeight: 800,
      letterSpacing: '.1em',
      marginBottom: '12px'
    },

    arrow: {
      position: 'absolute',
      zIndex: 5,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '1px solid #31588f',
      background: 'rgba(3,10,25,.8)',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    dots: {
      position: 'absolute',
      bottom: '15px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 5,
      display: 'flex',
      gap: '6px'
    },

    dot: {
      border: 'none',
      height: '8px',
      borderRadius: '8px',
      cursor: 'pointer'
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

    select: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '12px 14px',
      borderRadius: '12px',
      background: isLightMode ? '#ffffff' : '#07162f',
      border: isLightMode ? '1px solid #bcccdc' : '1px solid #294c7e',
      color: isLightMode ? '#102a43' : '#fff',
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

    grid2: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '14px',
      width: '100%',
      boxSizing: 'border-box'
    },

    info: {
      padding: '15px',
      borderRadius: '14px',
      background: isLightMode ? 'rgba(188,204,220,.25)' : 'rgba(30,71,133,.16)',
      border: isLightMode ? '1px solid rgba(116,146,177,.35)' : '1px solid rgba(60,111,178,.35)',
      color: isLightMode ? '#243b53' : '#c6d3e4',
      lineHeight: 1.5,
      fontSize: '13px',
      marginBottom: '18px',
      boxSizing: 'border-box'
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
    },

    processGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
      gap: '8px',
      margin: '25px 0 35px',
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box'
    },

    processItem: {
      textAlign: 'center',
      position: 'relative',
      zIndex: 2
    },

    processCircle: {
      width: '44px',
      height: '44px',
      margin: '0 auto 8px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isLightMode ? 'linear-gradient(145deg, rgba(200,215,230,0.8), rgba(230,240,250,0.95))' : 'linear-gradient(145deg, rgba(25,50,90,0.8), rgba(8,20,40,0.95))',
      border: isLightMode ? '1px solid rgba(116,146,177,0.4)' : '1px solid rgba(70,111,170,0.4)',
      boxShadow: '0 6px 14px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.1)',
      color: isLightMode ? '#486581' : '#71839d',
      fontWeight: 900,
      fontSize: '14px'
    },

    success: {
      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
      border: '1px solid #4ade80',
      boxShadow: '0 8px 20px rgba(34,197,94,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
      color: '#fff'
    },

    active: {
      background: 'linear-gradient(135deg, #e0ab2b, #b8860b)',
      border: '1px solid #f2c653',
      boxShadow: '0 8px 20px rgba(224,171,43,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
      color: '#06122b'
    },

    adminTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '22px',
      flexWrap: 'wrap',
      boxSizing: 'border-box'
    },

    statGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '12px',
      marginBottom: '20px',
      boxSizing: 'border-box'
    },

    statCard: {
      background: isLightMode ? 'rgba(255,255,255,.8)' : 'rgba(7,22,47,.8)',
      border: isLightMode ? '1px solid #bcccdc' : '1px solid #244873',
      borderRadius: '16px',
      padding: '16px',
      boxSizing: 'border-box'
    },

    tableWrap: {
      overflowX: 'auto',
      borderRadius: '16px',
      border: isLightMode ? '1px solid #bcccdc' : '1px solid #244873',
      width: '100%',
      boxSizing: 'border-box'
    },

    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '700px'
    },

    th: {
      padding: '12px 14px',
      textAlign: 'left',
      background: isLightMode ? '#e2e8f0' : '#07162f',
      color: isLightMode ? '#334e68' : '#8ea2bd',
      fontSize: '11px',
      textTransform: 'uppercase'
    },

    td: {
      padding: '12px 14px',
      borderTop: isLightMode ? '1px solid rgba(188,204,220,.4)' : '1px solid rgba(41,76,126,.4)',
      fontSize: '12px'
    },

    footer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '20px 12px 30px',
      color: isLightMode ? '#486581' : '#71839d',
      textAlign: 'center',
      fontSize: '12px',
      boxSizing: 'border-box'
    }
  };

  // =====================================================
  // HELPERS DE FORMATAÇÃO E VALIDAÇÃO DE INPUTS
  // =====================================================

  const formatMoneyInput = (value) => {
    // Remove tudo que não for dígito
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    const number = Number(digits) / 100;
    // Formata com separador de milhar (.) e decimal (,) se >= 1000
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleMoneyBlur = (field) => {
    let val = form[field];
    if (val && !val.startsWith('R$')) {
      updateForm(field, `R$ ${val}`);
    }
  };

  const handleMoneyFocus = (field) => {
    let val = form[field];
    if (val && val.startsWith('R$')) {
      updateForm(field, val.replace('R$', '').trim());
    }
  };

  const updateForm = (field, value) => {
    if (field === 'comprovante' && value) {
      const nomeOriginal = value.name || 'comprovante.pdf';
      const nomeLimpo = `${Date.now()}_${nomeOriginal
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      const arquivoSanitizado = new File([value], nomeLimpo, { type: value.type });
      
      setForm(prev => ({
        ...prev,
        comprovante: arquivoSanitizado
      }));
      return;
    }

    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCPF = value => {
    value = value.replace(/\D/g, '').slice(0, 11);

    if (value.length <= 3) return value;

    if (value.length <= 6) {
      return `${value.slice(0, 3)}.${value.slice(3)}`;
    }

    if (value.length <= 9) {
      return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    }

    return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
      6,
      9
    )}-${value.slice(9)}`;
  };

  const generateId = () => {
    return `CD-${String(solicitacoes.length + 1).padStart(6, '0')}`;
  };

  // =====================================================
  // VALIDAÇÕES DA SENHA
  // =====================================================
  const passwordLength = form.password.length >= 7;
  const passwordUpper = /[A-Z]/.test(form.password);
  const passwordSpecial = /[!@#$%^&*(),.?":{}|<>\-_/+\\~`'[\];=]/.test(form.password);
  const passwordNumber = /[0-9.,]/.test(form.password);

  const allPasswordValid = passwordLength && passwordUpper && passwordSpecial && passwordNumber;

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const showPasswordErrors = !allPasswordValid && (form.password.length > 0 || hasAttemptedSubmit);

  // =====================================================
  // VALIDAÇÕES DA NOVA SENHA (RECUPERAÇÃO)
  // =====================================================
  const newPasswordLength = newPassword.length >= 7;
  const newPasswordUpper = /[A-Z]/.test(newPassword);
  const newPasswordSpecial = /[!@#$%^&*(),.?":{}|<>\-_/+\\~`'[\];=]/.test(newPassword);
  const newPasswordNumber = /[0-9.,]/.test(newPassword);
  const allNewPasswordValid = newPasswordLength && newPasswordUpper && newPasswordSpecial && newPasswordNumber;

  // =====================================================
  // CRIAR SOLICITAÇÃO (SALVANDO NO SUPABASE)
  // =====================================================

  const createRequest = async () => {
    const novaId = generateId();

    const dadosSupabase = {
      id: novaId,
      email: form.email,
      cpf: form.cpf,
      valor_renda: parseFloat(String(form.renda).replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0,
      valor_credito: parseFloat(String(form.valorCredito).replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0,
      comprovante: form.comprovante?.name || null,
      banco: form.banco,
      agencia: form.agencia,
      conta: form.conta,
      tipo_conta: form.tipoConta,
      status_cpf: 'completed',
      status_renda: 'completed',
      status_facial: 'completed',
      status_conta: 'completed'
    };

    try {
      const resposta = await fetch(`${SUPABASE_URL}/rest/v1/solicitacoes`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(dadosSupabase)
      });

      if (resposta.ok) {
        const novaState = {
          id: novaId,
          cliente: { email: form.email, cpf: form.cpf },
          renda: { valor: form.renda, valorCredito: form.valorCredito, comprovante: form.comprovante?.name || null, status: 'completed' },
          facial: { status: 'completed' },
          conta: { banco: form.banco, agencia: form.agencia, conta: form.conta, tipoConta: form.tipoConta, status: 'completed' },
          status: { cpf: 'completed', renda: 'completed', facial: 'completed', conta: 'completed' },
          criadoEm: new Date().toISOString()
        };
        setSolicitacoes(prev => [...prev, novaState]);
        setCurrentStep(5);
        setMessage(''); // Limpa mensagem ao concluir
      } else {
        const erroCorpo = await resposta.text();
        console.error('Erro ao salvar no Supabase:', erroCorpo);
        setMessage(`Erro ao salvar: ${erroCorpo}`);
      }
    } catch (erro) {
      console.error('Erro de conexão:', erro);
      setMessage('Erro de conexão com o Supabase.');
    }
  };

  // =====================================================
  // LOGIN & TRATAMENTO DE EXCEÇÃO
  // =====================================================

  const handleLogin = e => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    try {
      if (!form.email || /\s/.test(form.email)) {
        throw new Error('Informe um e-mail válido (sem espaços ou caracteres inadequados).');
      }

      if (!form.password) {
        throw new Error('Informe sua senha.');
      }

      if (!allPasswordValid) {
        throw new Error('A senha não atende a todos os requisitos obrigatórios.');
      }

      setMessage('');
      
      setForm(prev => ({ ...prev, password: '' }));
      setHasAttemptedSubmit(false);
      setIsOldAccountRecovery(false);

      setCurrentStep(1);

      setStatus({
        cpf: 'pending',
        renda: 'pending',
        facial: 'pending',
        conta: 'pending'
      });

      setScreen('processos');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // =====================================================
  // FUNÇÕES DE ESQUECEU A SENHA (CÓDIGO DE 7 CARACTERES + EXCEÇÕES)
  // =====================================================
  const handleRequestResetCode = () => {
    try {
      if (!form.email || /\s/.test(form.email)) {
        throw new Error('Informe um e-mail válido para recuperar a senha (sem espaços).');
      }

      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let codigoGerado = '';
      for (let i = 0; i < 7; i++) {
        codigoGerado += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      setSentResetCode(codigoGerado);
      setResetStep(2);
      setMessage(`Código de recuperação enviado para ${form.email}. (Código gerado para testes: ${codigoGerado})`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleVerifyResetCodeAndChangePassword = () => {
    try {
      if (!resetCode || resetCode.length !== 7 || /\s/.test(resetCode)) {
        throw new Error('Informe um código de recuperação válido com exatamente 7 caracteres e sem espaços.');
      }

      if (resetCode.trim() !== sentResetCode.trim()) {
        throw new Error('Código de recuperação inválido ou incorreto.');
      }

      if (!newPassword || !allNewPasswordValid) {
        throw new Error('A nova senha deve atender a todos os requisitos obrigatórios.');
      }

      setIsOldAccountRecovery(true);
      setStatus(prev => ({
        ...prev,
        cpf: 'completed'
      }));
      setCurrentStep(2);
      setScreen('processos');
      setMessage('Conta antiga reconhecida: iniciando direto na Etapa 2 (comprovante de renda facultativo).');
      
      setIsForgotPassword(false);
      setResetStep(1);
      setResetCode('');
      setNewPassword('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // =====================================================
  // PROCESSO CPF
  // =====================================================

  const processCPF = () => {
    try {
      if (form.cpf.replace(/\D/g, '').length !== 11) {
        throw new Error('Informe um CPF válido com 11 dígitos numéricos.');
      }

      setMessage('CPF enviado para verificação segura.');

      setTimeout(() => {
        setStatus(prev => ({
          ...prev,
          cpf: 'completed'
        }));

        setMessage('Verificação concluída.');

        setTimeout(() => {
          setCurrentStep(2);
          setMessage(''); // Limpa a mensagem ao avançar de etapa
        }, 900);
      }, 900);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // =====================================================
  // PROCESSO RENDA (COM VERIFICAÇÃO CONDICIONAL DE COMPROVANTE)
  // =====================================================

  const processRenda = async () => {
    try {
      const rendaVal = String(form.renda).replace('R$', '').replace(/\./g, '').replace(',', '.');
      const creditoVal = String(form.valorCredito).replace('R$', '').replace(/\./g, '').replace(',', '.');

      const renda = Number(rendaVal);
      const credito = Number(creditoVal);

      if (!renda || isNaN(renda) || renda <= 0) {
        throw new Error('Informe uma renda mensal numérica válida.');
      }

      // Só exige o comprovante se não for recuperação de conta antiga E o campo estiver vazio
      if (!isOldAccountRecovery && !form.comprovante) {
        throw new Error('Necessário que seja enviado o comprovante.');
      }

      if (!credito || isNaN(credito) || credito <= 0) {
        throw new Error('Informe um valor de crédito numérico válido.');
      }

      const limite = renda * 0.5;

      if (credito > limite) {
        throw new Error('O valor solicitado ultrapassa o limite operacional de 50% da renda informada.');
      }

      if (form.comprovante) {
        setMessage('Enviando comprovante para o storage...');

        const nomeArquivoLimpo = form.comprovante.name;

        const respostaUpload = await fetch(`${SUPABASE_URL}/storage/v1/object/comprovantes/${nomeArquivoLimpo}`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': form.comprovante.type || 'application/octet-stream'
          },
          body: form.comprovante
        });

        if (!respostaUpload.ok) {
          const erroStorage = await respostaUpload.text();
          console.error('Erro no upload do storage:', erroStorage);
          throw new Error('Erro ao enviar o arquivo para o storage.');
        }
      }

      setMessage('Dados enviados para análise.');

      setTimeout(() => {
        setStatus(prev => ({
          ...prev,
          renda: 'completed'
        }));

        setTimeout(() => {
          setCurrentStep(3);
          setMessage(''); // Limpa a mensagem ao avançar de etapa
        }, 800);
      }, 900);

    } catch (erro) {
      setMessage(erro.message || 'Erro ao processar a renda.');
    }
  };

  // =====================================================
  // PROCESSO FACIAL
  // =====================================================

  const processFacial = () => {
    try {
      setMessage('Iniciando verificação facial...');

      setTimeout(() => {
        setStatus(prev => ({
          ...prev,
          facial: 'completed'
        }));

        setMessage('Verificação facial concluída.');

        setTimeout(() => {
          if (isOldAccountRecovery) {
            setStatus(prev => ({
              ...prev,
              conta: 'completed'
            }));
            createRequest();
          } else {
            setCurrentStep(4);
            setMessage(''); // Limpa a mensagem ao avançar de etapa
          }
        }, 900);
      }, 1200);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // =====================================================
  // PROCESSO CONTA
  // =====================================================

  const processConta = () => {
    try {
      if (!form.banco || /[^a-zA-ZÀ-ÿ0-9\s]/.test(form.banco)) {
        throw new Error('Informe um nome de banco válido (apenas letras e números, sem caracteres especiais inadequados).');
      }

      if (!form.agencia || !/^\d+$/.test(form.agencia)) {
        throw new Error('A agência deve conter apenas valores numéricos.');
      }

      if (!form.conta || !/^[\d-]+$/.test(form.conta)) {
        throw new Error('A conta bancária deve conter apenas números e hífen.');
      }

      if (!form.tipoConta) {
        throw new Error('Selecione o tipo de conta.');
      }

      setMessage('Dados bancários registrados.');

      setTimeout(() => {
        setStatus(prev => ({
          ...prev,
          conta: 'completed'
        }));

        createRequest();
      }, 900);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // =====================================================
  // LOGIN ADMIN
  // =====================================================

  const handleAdminLogin = e => {
    e.preventDefault();

    try {
      if (
        adminEmail === 'admin@creddigital.com' &&
        adminPassword === '123456'
      ) {
        setScreen('admin');
        setMessage('');
      } else {
        throw new Error('Credenciais administrativas inválidas.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  // =====================================================
  // HOME
  // =====================================================

  if (screen === 'home') {
    return (
      <div style={styles.container}>
        <Header
          onHome={() => {
            setMessage(''); // Limpa mensagem ao voltar para o início
            setScreen('home');
          }}
          isLightMode={isLightMode}
          setIsLightMode={setIsLightMode}
          styles={styles}
          right={
            <>
              <button
                style={styles.btnOutline}
                onClick={() => {
                  setMessage('');
                  setScreen('adminLogin');
                }}
              >
                Área administrativa
              </button>

              <button
                style={styles.btnGold}
                onClick={() => {
                  setMessage(''); // Limpa mensagem ao voltar para o início/cadastro
                  setIsForgotPassword(false);
                  setResetStep(1);
                  setForm(emptyForm);
                  setIsOldAccountRecovery(false);
                  setScreen('login');
                }}
              >
                Cadastrar
              </button>
            </>
          }
        />

        <main style={styles.main}>
          <section style={styles.hero}>
            <div style={styles.heroTriangle}>
              <div style={styles.triangle} />

              <div style={styles.heroLogo}>
                <BuildingIcon />

                <h1
                  style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: 900
                  }}
                >
                  CredDigital
                </h1>
              </div>
            </div>

            <h2
              style={{
                fontSize: 'clamp(28px, 5vw, 42px)',
                margin: '0 0 12px',
                fontWeight: 900,
                letterSpacing: '-.04em'
              }}
            >
              Sua experiência de crédito,
              <br />
              agora digital.
            </h2>

            <p
              style={{
                color: isLightMode ? '#486581' : '#9eabc0',
                maxWidth: '650px',
                margin: '0 auto',
                lineHeight: 1.7,
                fontSize: '14px',
                padding: '0 10px',
                boxSizing: 'border-box'
              }}
            >
              Uma plataforma para acompanhar sua solicitação,
              enviar informações e consultar o andamento de cada
              etapa.
            </p>
          </section>

          <section style={styles.carousel}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                style={{
                  ...styles.slide,
                  backgroundImage: `url(${slide.bgImage})`,
                  opacity:
                    index === currentSlide ? 1 : 0,
                  zIndex:
                    index === currentSlide ? 2 : 1
                }}
              >
                <div style={styles.slideOverlay} />

                <div style={styles.slideContent}>
                  <div style={styles.badge}>
                    {slide.badge}
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(24px, 4vw, 38px)',
                      margin: '0 0 12px',
                      fontWeight: 900
                    }}
                  >
                    {slide.title}
                  </h2>

                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#d0dbe8',
                      margin: 0
                    }}
                  >
                    {slide.description}
                  </p>

                  <button
                    style={{
                      ...styles.btnGold,
                      marginTop: '20px'
                    }}
                    onClick={() => {
                      setMessage(''); // Limpa mensagem ao iniciar
                      setIsForgotPassword(false);
                      setResetStep(1);
                      setForm(emptyForm);
                      setIsOldAccountRecovery(false);
                      setScreen('login');
                    }}
                  >
                    Começar solicitação
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() =>
                setCurrentSlide(prev =>
                  prev === 0
                    ? slides.length - 1
                    : prev - 1
                )
              }
              style={{
                ...styles.arrow,
                left: '12px'
              }}
            >
              ‹
            </button>

            <button
              onClick={() =>
                setCurrentSlide(prev =>
                  prev === slides.length - 1
                    ? 0
                    : prev + 1
                )
              }
              style={{
                ...styles.arrow,
                right: '12px'
              }}
            >
              ›
            </button>

            <div style={styles.dots}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    ...styles.dot,
                    width:
                      index === currentSlide
                        ? '24px'
                        : '8px',
                    background:
                      index === currentSlide
                        ? '#e0ab2b'
                        : '#fff',
                    opacity:
                      index === currentSlide ? 1 : .35
                  }}
                />
              ))}
            </div>
          </section>
        </main>

        <Footer isLightMode={isLightMode} />
      </div>
    );
  }

  // =====================================================
  // LOGIN CLIENTE (COM FLUXO DE "ESQUECEU A SENHA" E CÓDIGO DE 7 CARACTERES)
  // =====================================================

  if (screen === 'login') {
    return (
      <div style={styles.container}>
        <Header
          onHome={() => {
            setMessage('');
            setScreen('home');
          }}
          isLightMode={isLightMode}
          setIsLightMode={setIsLightMode}
          styles={styles}
          right={
            <button
              style={styles.btnOutline}
              onClick={() => {
                setMessage('');
                setScreen('adminLogin');
              }}
            >
              Administrador
            </button>
          }
        />

        <main
          style={{
            ...styles.main,
            maxWidth: '500px'
          }}
        >
          <div style={styles.card}>
            <div
              style={{
                textAlign: 'center',
                marginBottom: '25px'
              }}
            >
              <div
                style={{
                  ...styles.logoBox,
                  margin: '0 auto 15px'
                }}
              >
                <ShieldIcon />
              </div>

              <h1 style={{ margin: 0, fontSize: '26px' }}>
                {isForgotPassword ? 'Recuperar Senha' : 'Acesse sua conta'}
              </h1>

              <p style={{ color: isLightMode ? '#486581' : '#9eabc0', fontSize: '13px', marginTop: '6px' }}>
                {isForgotPassword ? 'Insira seu e-mail para receber o código de 7 caracteres.' : 'Entre para iniciar sua solicitação ou acessar sua conta antiga.'}
              </p>
            </div>

            {!isForgotPassword ? (
              <form onSubmit={handleLogin}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    E-mail
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    placeholder="seu@email.com"
                    style={styles.input}
                    onChange={e =>
                      updateForm('email', e.target.value.trim())
                    }
                  />
                </div>

                <div style={styles.inputGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ ...styles.label, marginBottom: 0 }}>
                      Senha
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setResetStep(1);
                        setResetCode('');
                        setNewPassword('');
                        setMessage('');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#e0ab2b',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Esqueceu a senha?
                    </button>
                  </div>

                  <input
                    type="password"
                    value={form.password}
                    placeholder="Digite sua senha"
                    style={styles.input}
                    onChange={e => {
                      updateForm('password', e.target.value);
                      if (hasAttemptedSubmit) setHasAttemptedSubmit(false);
                    }}
                  />

                  {showPasswordErrors && (
                    <div style={{ marginTop: '8px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ color: passwordLength ? '#22c55e' : '#ef4444' }}>
                        {passwordLength ? '✓' : '✗'} Mínimo de 7 caracteres
                      </span>
                      <span style={{ color: passwordUpper ? '#22c55e' : '#ef4444' }}>
                        {passwordUpper ? '✓' : '✗'} 1 letra maiúscula
                      </span>
                      <span style={{ color: passwordSpecial ? '#22c55e' : '#ef4444' }}>
                        {passwordSpecial ? '✓' : '✗'} 1 caractere especial
                      </span>
                      <span style={{ color: passwordNumber ? '#22c55e' : '#ef4444' }}>
                        {passwordNumber ? '✓' : '✗'} 1 número ou ponto ou vírgula
                      </span>
                    </div>
                  )}
                </div>

                <button style={styles.button}>
                  Continuar
                </button>
              </form>
            ) : (
              <div>
                {resetStep === 1 && (
                  <div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>
                        E-mail cadastrado
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        placeholder="seu@email.com"
                        style={styles.input}
                        onChange={e => updateForm('email', e.target.value.trim())}
                      />
                    </div>
                    <button
                      style={styles.button}
                      onClick={handleRequestResetCode}
                    >
                      Enviar código de 7 caracteres
                    </button>
                  </div>
                )}

                {resetStep === 2 && (
                  <div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>
                        Código de recuperação (7 caracteres)
                      </label>
                      <input
                        type="text"
                        maxLength={7}
                        value={resetCode}
                        placeholder="Ex: A7b9X2k"
                        style={styles.input}
                        onChange={e => setResetCode(e.target.value.trim())}
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>
                        Nova senha
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        placeholder="Digite sua nova senha"
                        style={styles.input}
                        onChange={e => setNewPassword(e.target.value)}
                      />

                      {newPassword.length > 0 && (
                        <div style={{ marginTop: '8px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <span style={{ color: newPasswordLength ? '#22c55e' : '#ef4444' }}>
                            {newPasswordLength ? '✓' : '✗'} Mínimo de 7 caracteres
                          </span>
                          <span style={{ color: newPasswordUpper ? '#22c55e' : '#ef4444' }}>
                            {newPasswordUpper ? '✓' : '✗'} 1 letra maiúscula
                          </span>
                          <span style={{ color: newPasswordSpecial ? '#22c55e' : '#ef4444' }}>
                            {newPasswordSpecial ? '✓' : '✗'} 1 caractere especial
                          </span>
                          <span style={{ color: newPasswordNumber ? '#22c55e' : '#ef4444' }}>
                            {newPasswordNumber ? '✓' : '✗'} 1 número ou ponto ou vírgula
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      style={styles.button}
                      onClick={handleVerifyResetCodeAndChangePassword}
                    >
                      Confirmar e Entrar com Conta Antiga
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  style={{
                    ...styles.btnOutline,
                    width: '100%',
                    marginTop: '10px'
                  }}
                  onClick={() => {
                    setIsForgotPassword(false);
                    setResetStep(1);
                    setResetCode('');
                    setNewPassword('');
                    setMessage('');
                  }}
                >
                  Voltar ao Login
                </button>
              </div>
            )}

            {message && (
              <div style={styles.message}>
                {message}
              </div>
            )}
          </div>
        </main>

        <Footer isLightMode={isLightMode} />
      </div>
    );
  }

  // =====================================================
  // LOGIN ADMIN
  // =====================================================

  if (screen === 'adminLogin') {
    return (
      <div style={styles.container}>
        <Header
          onHome={() => {
            setMessage('');
            setScreen('home');
          }}
          isLightMode={isLightMode}
          setIsLightMode={setIsLightMode}
          styles={styles}
          right={
            <button
              style={styles.btnOutline}
              onClick={() => {
                setMessage('');
                setIsForgotPassword(false);
                setResetStep(1);
                setForm(emptyForm);
                setIsOldAccountRecovery(false);
                setScreen('login');
              }}
            >
              Área do cliente
            </button>
          }
        />

        <main
          style={{
            ...styles.main,
            maxWidth: '500px'
          }}
        >
          <div style={styles.card}>
            <div
              style={{
                textAlign: 'center',
                marginBottom: '25px'
              }}
            >
              <div
                style={{
                  ...styles.logoBox,
                  margin: '0 auto 15px'
                }}
              >
                <ShieldIcon />
              </div>

              <h1 style={{ margin: 0, fontSize: '26px' }}>
                Área administrativa
              </h1>

              <p style={{ color: isLightMode ? '#486581' : '#9eabc0', fontSize: '13px', marginTop: '6px' }}>
                Acesso restrito aos administradores.
              </p>
            </div>

            <form onSubmit={handleAdminLogin}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  E-mail administrativo
                </label>

                <input
                  type="email"
                  value={adminEmail}
                  placeholder="admin@creddigital.com"
                  style={styles.input}
                  onChange={e =>
                    setAdminEmail(e.target.value.trim())
                  }
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Senha
                </label>

                <input
                  type="password"
                  value={adminPassword}
                  placeholder="Senha"
                  style={styles.input}
                  onChange={e =>
                    setAdminPassword(e.target.value)
                  }
                />
              </div>

              <button style={styles.button}>
                Entrar no painel
              </button>
            </form>

            <div
              style={{
                ...styles.info,
                marginTop: '15px',
                marginBottom: 0
              }}
            >
              <strong>Login demonstrativo</strong>
              <br />
              E-mail: admin@creddigital.com
              <br />
              Senha: 123456
            </div>

            {message && (
              <div style={styles.message}>
                {message}
              </div>
            )}
          </div>
        </main>

        <Footer isLightMode={isLightMode} />
      </div>
    );
  }

  // =====================================================
  // ADMIN
  // =====================================================

  if (screen === 'admin') {
    const total = solicitacoes.length;

    const concluidas = solicitacoes.filter(
      item =>
        item.status.cpf === 'completed' &&
        item.status.renda === 'completed' &&
        item.status.facial === 'completed' &&
        item.status.conta === 'completed'
    ).length;

    const analise = total - concluidas;

    const filtradas = solicitacoes.filter(item => {
      const searchLower = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(searchLower) ||
        (item.cliente.email || '').toLowerCase().includes(searchLower) ||
        item.cliente.cpf.includes(search);

      const matchesStatus =
        statusFilter === 'todos' ||
        (
          statusFilter === 'concluido' &&
          item.status.conta === 'completed'
        ) ||
        (
          statusFilter === 'pendente' &&
          item.status.conta !== 'completed'
        );

      return matchesSearch && matchesStatus;
    });

    return (
      <div style={styles.container}>
        <Header
          onHome={() => {
            setMessage('');
            setScreen('home');
          }}
          isLightMode={isLightMode}
          setIsLightMode={setIsLightMode}
          styles={styles}
          right={
            <button
              style={styles.btnOutline}
              onClick={() => {
                setMessage('');
                setScreen('home');
              }}
            >
              Sair
            </button>
          }
        />

        <main style={styles.main}>
          <div style={styles.adminTop}>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: '28px'
                }}
              >
                Dados dos clientes
              </h1>

              <p
                style={{
                  color: isLightMode ? '#486581' : '#8e9eb5',
                  margin: '6px 0 0',
                  fontSize: '13px'
                }}
              >
                Gerenciamento das solicitações de crédito
              </p>
            </div>

            <div
              style={{
                color: '#e0ab2b',
                fontWeight: 800,
                fontSize: '13px'
              }}
            >
              CredDigital Admin
            </div>
          </div>

          <div style={styles.statGrid}>
            <Stat
              title="Solicitações"
              value={total}
              color="#e0ab2b"
              isLightMode={isLightMode}
            />

            <Stat
              title="Em análise"
              value={analise}
              color="#60a5fa"
              isLightMode={isLightMode}
            />

            <Stat
              title="Concluídas"
              value={concluidas}
              color="#4ade80"
              isLightMode={isLightMode}
            />

            <Stat
              title="Etapas"
              value={total * 4}
              color="#c084fc"
              isLightMode={isLightMode}
            />
          </div>

          <div style={styles.card}>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '18px',
                flexWrap: 'wrap',
                boxSizing: 'border-box'
              }}
            >
              <input
                style={{
                  ...styles.input,
                  maxWidth: '100%',
                  flex: '1 1 240px'
                }}
                placeholder="Buscar por ID, e-mail ou CPF..."
                value={search}
                onChange={e =>
                  setSearch(e.target.value)
                }
              />

              <select
                style={{
                  ...styles.select,
                  maxWidth: '100%',
                  flex: '1 1 160px'
                }}
                value={statusFilter}
                onChange={e =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="todos">
                  Todos os status
                </option>

                <option value="concluido">
                  Concluídos
                </option>

                <option value="pendente">
                  Pendentes
                </option>
              </select>
            </div>

            {filtradas.length === 0 ? (
              <div
                style={{
                  padding: '40px 15px',
                  textAlign: 'center',
                  color: isLightMode ? '#486581' : '#8291a7',
                  fontSize: '13px'
                }}
              >
                Nenhuma solicitação encontrada no Supabase.
              </div>
            ) : (
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Cliente</th>
                      <th style={styles.th}>CPF</th>
                      <th style={styles.th}>Crédito</th>
                      <th style={styles.th}>CPF</th>
                      <th style={styles.th}>Renda</th>
                      <th style={styles.th}>Facial</th>
                      <th style={styles.th}>Conta</th>
                      <th style={styles.th}>Ação</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtradas.map(item => (
                      <tr key={item.id}>
                        <td style={styles.td}>
                          <strong>
                            {item.id}
                          </strong>
                        </td>

                        <td style={styles.td}>
                          {item.cliente.email}
                        </td>

                        <td style={styles.td}>
                          {item.cliente.cpf}
                        </td>

                        <td style={styles.td}>
                          {String(item.renda.valorCredito).startsWith('R$') ? item.renda.valorCredito : `R$ ${item.renda.valorCredito}`}
                        </td>

                        <td style={styles.td}>
                          <Status
                            value={item.status.cpf}
                          />
                        </td>

                        <td style={styles.td}>
                          <Status
                            value={item.status.renda}
                          />
                        </td>

                        <td style={styles.td}>
                          <Status
                            value={item.status.facial}
                          />
                        </td>

                        <td style={styles.td}>
                          <Status
                            value={item.status.conta}
                          />
                        </td>

                        <td style={styles.td}>
                          <button
                            style={{
                              ...styles.btnOutline,
                              padding: '6px 10px',
                              fontSize: '11px'
                            }}
                            onClick={() =>
                              setSelectedRequest(item)
                            }
                          >
                            Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>

        {selectedRequest && (
          <AdminModal
            request={selectedRequest}
            onClose={() =>
              setSelectedRequest(null)
            }
            isLightMode={isLightMode}
          />
        )}

        <Footer isLightMode={isLightMode} />
      </div>
    );
  }

  // =====================================================
  // PROCESSOS CLIENTE
  // =====================================================

  if (screen === 'processos') {
    const processes = isOldAccountRecovery
      ? [
          { id: 1, title: 'CPF', key: 'cpf' },
          { id: 2, title: 'Renda', key: 'renda' },
          { id: 3, title: 'Facial', key: 'facial' }
        ]
      : [
          { id: 1, title: 'CPF', key: 'cpf' },
          { id: 2, title: 'Renda', key: 'renda' },
          { id: 3, title: 'Facial', key: 'facial' },
          { id: 4, title: 'Conta', key: 'conta' }
        ];

    return (
      <div style={styles.container}>
        <Header
          onHome={() => {
            setMessage('');
            setScreen('home');
          }}
          isLightMode={isLightMode}
          setIsLightMode={setIsLightMode}
          styles={styles}
          right={
            <span
              style={{
                color: isLightMode ? '#486581' : '#8e9eb5',
                fontSize: '12px',
                wordBreak: 'break-all'
              }}
            >
              {form.email}
            </span>
          }
        />

        <main style={styles.main}>
          <div style={styles.card}>
            <h1
              style={{
                margin: 0,
                fontSize: '26px'
              }}
            >
              Solicitação de crédito {isOldAccountRecovery ? '(Conta Antiga)' : ''}
            </h1>

            <p
              style={{
                color: isLightMode ? '#486581' : '#9eabc0',
                lineHeight: 1.5,
                fontSize: '13px',
                marginTop: '6px'
              }}
            >
              {isOldAccountRecovery
                ? 'Complete as etapas de renda e biometria facial para finalizar.'
                : 'Complete as etapas abaixo para enviar sua solicitação.'}
            </p>

            <div style={styles.processGrid}>
              {processes.map(process => {
                const completed =
                  status[process.key] === 'completed';

                const active =
                  currentStep === process.id;

                return (
                  <div
                    style={styles.processItem}
                    key={process.id}
                  >
                    <div
                      style={{
                        ...styles.processCircle,
                        ...(completed
                          ? styles.success
                          : {}),
                        ...(active && !completed
                          ? styles.active
                          : {})
                      }}
                    >
                      {completed
                        ? '✓'
                        : process.id}
                    </div>

                    <div
                      style={{
                        fontSize: '11px',
                        color: completed
                          ? '#4ade80'
                          : active
                          ? '#e0ab2b'
                          : (isLightMode ? '#486581' : '#8e9eb5'),
                        fontWeight:
                          completed || active
                            ? 800
                            : 500
                      }}
                    >
                      Etapa {process.id}
                      <br />
                      {process.title}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PROCESSO 1 */}

            {currentStep === 1 && (
              <section>
                <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>
                  Processo 1 — Verificação de CPF
                </h2>

                <div style={styles.info}>
                  Informe seu CPF para iniciar a
                  verificação cadastral.
                  <br />
                  <br />
                  Esta tela representa um ambiente de
                  demonstração.
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    CPF
                  </label>

                  <input
                    style={styles.input}
                    inputMode="numeric"
                    placeholder="000.000.000-00"
                    value={form.cpf}
                    onChange={e =>
                      updateForm(
                        'cpf',
                        formatCPF(e.target.value)
                      )
                    }
                  />
                </div>

                <button
                  style={styles.button}
                  onClick={processCPF}
                >
                  Verificar CPF
                </button>
              </section>
            )}

            {/* PROCESSO 2 */}

            {currentStep === 2 && (
              <section>
                <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>
                  Processo 2 — Comprovante de renda {isOldAccountRecovery ? '(Facultativo)' : ''}
                </h2>

                <div style={styles.info}>
                  Informe sua renda e o valor solicitado.
                  {isOldAccountRecovery && ' O comprovante de renda é facultativo para contas antigas.'}
                  <br />
                  <br />
                  O protótipo utiliza um limite operacional
                  de até 50% da renda informada.
                </div>

                <div style={styles.grid2}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      Renda mensal
                    </label>

                    <input
                      style={styles.input}
                      placeholder="5.000,00"
                      value={form.renda}
                      onChange={e =>
                        updateForm('renda', formatMoneyInput(e.target.value))
                      }
                      onBlur={() => handleMoneyBlur('renda')}
                      onFocus={() => handleMoneyFocus('renda')}
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      Valor solicitado
                    </label>

                    <input
                      style={styles.input}
                      placeholder="2.500,00"
                      value={form.valorCredito}
                      onChange={e =>
                        updateForm('valorCredito', formatMoneyInput(e.target.value))
                      }
                      onBlur={() => handleMoneyBlur('valorCredito')}
                      onFocus={() => handleMoneyFocus('valorCredito')}
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Comprovante de renda {isOldAccountRecovery ? '(Opcional)' : ''}
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{
                      ...styles.input,
                      padding: '10px'
                    }}
                    onChange={e =>
                      updateForm(
                        'comprovante',
                        e.target.files[0]
                      )
                    }
                  />
                </div>

                <button
                  style={styles.button}
                  onClick={processRenda}
                >
                  Continuar
                </button>
              </section>
            )}

            {/* PROCESSO 3 */}

            {currentStep === 3 && (
              <section>
                <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>
                  Processo 3 — Verificação facial
                </h2>

                <div style={styles.info}>
                  Para esta etapa, um sistema real deverá
                  utilizar um provedor especializado em
                  biometria facial e prova de vida.
                  <br />
                  <br />
                  Neste protótipo, nenhuma imagem é enviada
                  para um servidor.
                </div>

                <div
                  style={{
                    height: '200px',
                    borderRadius: '16px',
                    border: isLightMode ? '1px dashed #748aa6' : '1px dashed #41699e',
                    background: isLightMode ? 'linear-gradient(145deg,#e2e8f0,#cbd5e1)' : 'linear-gradient(145deg,#081a38,#030a19)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '16px'
                  }}
                >
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      border: '3px solid #e0ab2b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <UserIcon />
                  </div>

                  <span
                    style={{
                      color: isLightMode ? '#486581' : '#8291a7',
                      fontSize: '12px'
                    }}
                  >
                    Área reservada para câmera
                  </span>
                </div>

                <button
                  style={styles.button}
                  onClick={processFacial}
                >
                  Iniciar verificação facial
                </button>
              </section>
            )}

            {/* PROCESSO 4 */}

            {!isOldAccountRecovery && currentStep === 4 && (
              <section>
                <h2 style={{ fontSize: '18px', marginBottom: '6px' }}>
                  Processo 4 — Dados da conta
                </h2>

                <p
                  style={{
                    color: isLightMode ? '#486581' : '#9eabc0',
                    fontSize: '13px',
                    marginBottom: '16px'
                  }}
                >
                  Informe os dados da conta relacionada
                  à solicitação.
                </p>

                <div style={styles.grid2}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      Banco
                    </label>

                    <input
                      style={styles.input}
                      placeholder="Nome ou código"
                      value={form.banco}
                      onChange={e =>
                        updateForm(
                          'banco',
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      Tipo de conta
                    </label>

                    <select
                      style={styles.select}
                      value={form.tipoConta}
                      onChange={e =>
                        updateForm(
                          'tipoConta',
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option value="corrente">
                        Conta corrente
                      </option>

                      <option value="poupanca">
                        Conta poupança
                      </option>
                    </select>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      Agência
                    </label>

                    <input
                      style={styles.input}
                      inputMode="numeric"
                      placeholder="0000"
                      value={form.agencia}
                      onChange={e =>
                        updateForm(
                          'agencia',
                          e.target.value.replace(/\D/g, '')
                        )
                      }
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      Conta
                    </label>

                    <input
                      style={styles.input}
                      placeholder="00000-0"
                      value={form.conta}
                      onChange={e =>
                        updateForm(
                          'conta',
                          e.target.value.replace(/[^0-9-]/g, '')
                        )
                      }
                    />
                  </div>
                </div>

                <button
                  style={styles.button}
                  onClick={processConta}
                >
                  Finalizar solicitação
                </button>
              </section>
            )}

            {/* FINAL */}

            {currentStep === 5 && (
              <section
                style={{
                  textAlign: 'center',
                  padding: '15px'
                }}
              >
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    margin: '0 auto 15px',
                    borderRadius: '50%',
                    background: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px'
                  }}
                >
                  ✓
                </div>

                <h2 style={{ fontSize: '22px' }}>
                  Processo concluído com sucesso!
                </h2>

                <p
                  style={{
                    color: isLightMode ? '#334e68' : '#b9c8da',
                    lineHeight: 1.6,
                    fontSize: '13px'
                  }}
                >
                  Seu processo foi recebido e registrado com sucesso.
                  <br />
                  O resultado será comunicado através
                  do e-mail cadastrado.
                </p>

                <div
                  style={{
                    marginTop: '20px',
                    padding: '15px',
                    borderRadius: '12px',
                    background:
                      'rgba(22,163,74,.08)',
                    color: '#4ade80',
                    lineHeight: 1.7,
                    fontSize: '13px'
                  }}
                >
                  ✓ CPF
                  <br />
                  ✓ Renda {isOldAccountRecovery ? '(Dispensado / Opcional)' : ''}
                  <br />
                  ✓ Verificação facial
                  {!isOldAccountRecovery && <><br />✓ Conta</>}
                </div>

                <button
                  style={{
                    ...styles.btnOutline,
                    marginTop: '20px'
                  }}
                  onClick={() => {
                    setMessage('');
                    setScreen('home');
                  }}
                >
                  Voltar para início
                </button>
              </section>
            )}

            {message && (
              <div style={styles.message}>
                {message}
              </div>
            )}
          </div>
        </main>

        <Footer isLightMode={isLightMode} />
      </div>
    );
  }

  return null;

}

// =====================================================
// COMPONENTES
// =====================================================

function Header({ onHome, right, isLightMode, setIsLightMode, styles }) {
  return (
    <header
      style={{
        padding: '15px 12px 0',
        maxWidth: '1280px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      <nav
        style={{
          background: isLightMode ? 'rgba(255,255,255,.86)' : 'rgba(10,25,55,.86)',
          border: isLightMode ? '1px solid rgba(116,146,177,.35)' : '1px solid rgba(70,111,170,.35)',
          borderBottom: isLightMode ? '2px solid #bcccdc' : '2px solid #1e4785',
          borderRadius: '20px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxSizing: 'border-box'
        }}
      >
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
          <span
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: isLightMode ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.08)',
              color: '#e0ab2b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <BuildingIcon />
          </span>

          CredDigital
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            style={styles.themeToggleBtn}
            title={isLightMode ? "Mudar para modo escuro" : "Mudar para cores claras"}
          >
            {isLightMode ? <MoonIcon /> : <SunIcon />}
          </button>
          {right}
        </div>
      </nav>
    </header>
  );
}

function Stat({ title, value, color, isLightMode }) {
  return (
    <div
      style={{
        background: isLightMode ? 'rgba(255,255,255,.8)' : 'rgba(7,22,47,.8)',
        border: isLightMode ? '1px solid #bcccdc' : '1px solid #244873',
        borderRadius: '16px',
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          color: isLightMode ? '#486581' : '#8291a7',
          fontSize: '11px',
          marginBottom: '6px'
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: '24px',
          fontWeight: 900
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Status({ value }) {
  const completed = value === 'completed';

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '999px',
        background: completed
          ? 'rgba(34,197,94,.13)'
          : 'rgba(224,171,43,.13)',
        color: completed
          ? '#4ade80'
          : '#f1ce69',
        fontSize: '10px',
        fontWeight: 800
      }}
    >
      {completed ? 'CONCLUÍDO' : 'PENDENTE'}
    </span>
  );
}

function AdminModal({ request, onClose, isLightMode }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,.72)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px',
        boxSizing: 'border-box'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: isLightMode
            ? 'linear-gradient(145deg,#ffffff,#f0f4f8)'
            : 'linear-gradient(145deg,#0d2147,#030a19)',
          border: isLightMode ? '1px solid #bcccdc' : '1px solid #31588f',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 30px 100px rgba(0,0,0,.7)',
          boxSizing: 'border-box',
          color: isLightMode ? '#102a43' : '#fff'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: '20px' }}>
              Solicitação {request.id}
            </h2>

            <small
              style={{
                color: isLightMode ? '#486581' : '#8291a7',
                fontSize: '11px'
              }}
            >
              {new Date(
                request.criadoEm
              ).toLocaleString('pt-BR')}
            </small>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: isLightMode ? '#e2e8f0' : '#07162f',
              border: isLightMode ? '1px solid #bcccdc' : '1px solid #31588f',
              color: isLightMode ? '#102a43' : '#fff',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        <AdminSection title="Cliente" isLightMode={isLightMode}>
          <InfoRow
            label="E-mail"
            value={request.cliente.email}
            isLightMode={isLightMode}
          />

          <InfoRow
            label="CPF"
            value={request.cliente.cpf}
            isLightMode={isLightMode}
          />
        </AdminSection>

        <AdminSection title="Processo 1 — CPF" isLightMode={isLightMode}>
          <Status value={request.status.cpf} />
        </AdminSection>

        <AdminSection title="Processo 2 — Renda" isLightMode={isLightMode}>
          <InfoRow
            label="Renda mensal"
            value={String(request.renda.valor).startsWith('R$') ? request.renda.valor : `R$ ${request.renda.valor}`}
            isLightMode={isLightMode}
          />

          <InfoRow
            label="Crédito solicitado"
            value={String(request.renda.valorCredito).startsWith('R$') ? request.renda.valorCredito : `R$ ${request.renda.valorCredito}`}
            isLightMode={isLightMode}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '15px',
              padding: '6px 0',
              borderBottom: isLightMode ? '1px solid rgba(0,0,0,.05)' : '1px solid rgba(255,255,255,.05)',
              boxSizing: 'border-box'
            }}
          >
            <span
              style={{
                color: isLightMode ? '#486581' : '#8291a7',
                fontSize: '12px'
              }}
            >
              Comprovante
            </span>

            <div style={{ textAlign: 'right' }}>
              <strong
                style={{
                  color: isLightMode ? '#102a43' : '#fff',
                  fontSize: '12px',
                  wordBreak: 'break-all',
                  display: 'block'
                }}
              >
                {request.renda.comprovante || 'Não informado'}
              </strong>

              {request.renda.comprovante && (
                <a
                  href={
                    request.renda.comprovante.startsWith('http')
                      ? request.renda.comprovante
                      : `${SUPABASE_URL}/storage/v1/object/public/comprovantes/${encodeURIComponent(request.renda.comprovante)}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '4px',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#e0ab2b',
                    textDecoration: 'underline'
                  }}
                >
                  Visualizar PDF ou Imagem ↗
                </a>
              )}
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <Status value={request.status.renda} />
          </div>
        </AdminSection>

        <AdminSection title="Processo 3 — Facial" isLightMode={isLightMode}>
          <Status value={request.status.facial} />
        </AdminSection>

        <AdminSection title="Processo 4 — Conta" isLightMode={isLightMode}>
          <InfoRow
            label="Banco"
            value={request.conta.banco}
            isLightMode={isLightMode}
          />

          <InfoRow
            label="Agência"
            value={request.conta.agencia}
            isLightMode={isLightMode}
          />

          <InfoRow
            label="Conta"
            value={request.conta.conta}
            isLightMode={isLightMode}
          />

          <InfoRow
            label="Tipo"
            value={request.conta.tipoConta}
            isLightMode={isLightMode}
          />

          <Status value={request.status.conta} />
        </AdminSection>
      </div>
    </div>
  );
}

function AdminSection({ title, children, isLightMode }) {
  return (
    <div
      style={{
        padding: '14px',
        marginBottom: '12px',
        borderRadius: '14px',
        background: isLightMode ? 'rgba(240,244,248,.8)' : 'rgba(7,22,47,.75)',
        border: isLightMode ? '1px solid #bcccdc' : '1px solid #244873',
        boxSizing: 'border-box'
      }}
    >
      <h3
        style={{
          margin: '0 0 12px',
          color: '#e0ab2b',
          fontSize: '13px'
        }}
      >
        {title}
      </h3>

      {children}
    </div>
  );
}

function InfoRow({ label, value, isLightMode }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '15px',
        padding: '6px 0',
        borderBottom: isLightMode ? '1px solid rgba(0,0,0,.05)' : '1px solid rgba(255,255,255,.05)',
        boxSizing: 'border-box'
      }}
    >
      <span
        style={{
          color: isLightMode ? '#486581' : '#8291a7',
          fontSize: '12px'
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color: isLightMode ? '#102a43' : '#fff',
          fontSize: '12px',
          textAlign: 'right',
          wordBreak: 'break-all'
        }}
      >
        {value}
      </strong>
    </div>
  );
}

function Footer({ isLightMode }) {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    { 
      name: 'Instagram', 
      color: '#E1306C', 
      icon: <InstagramIcon />, 
      url: 'https://www.instagram.com/explore/tags/emprestimodigital/' 
    },
    { 
      name: 'LinkedIn', 
      color: '#0A66C2', 
      icon: <LinkedInIcon />, 
      url: 'https://www.linkedin.com/feed/hashtag/?keywords=fintech' 
    },
    { 
      name: 'YouTube', 
      color: '#FF0000', 
      icon: <YouTubeIcon />, 
      url: 'https://www.youtube.com/results?search_query=analise+de+credito+digital+opiniao' 
    },
    { 
      name: 'Twitter', 
      color: '#1DA1F2', 
      icon: <TwitterIcon />, 
      url: 'https://twitter.com/search?q=fintech%20credito%20opiniao' 
    }
  ];

  return (
    <footer style={{
      width: '100%',
      background: isLightMode ? 'linear-gradient(180deg, rgba(200,215,230,0) 0%, rgba(220,230,242,0.95) 25%, #cbd5e1 100%)' : 'linear-gradient(180deg, rgba(3,10,25,0) 0%, rgba(3,10,25,0.95) 25%, #020712 100%)',
      borderTop: isLightMode ? '1px solid rgba(116,146,177,0.3)' : '1px solid rgba(45,91,148,0.3)',
      padding: '60px 24px 35px',
      boxSizing: 'border-box',
      fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      color: isLightMode ? '#486581' : '#8e9eb5',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '400px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #e0ab2b, transparent)',
        boxShadow: '0 0 20px #e0ab2b',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        position: 'relative',
        zIndex: 1,
        marginBottom: '45px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(224,171,43,0.2), rgba(224,171,43,0.05))',
              color: '#e0ab2b',
              border: '1px solid rgba(224,171,43,0.4)',
              boxShadow: '0 6px 15px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <BuildingIcon />
            </div>
            <span style={{ fontWeight: 800, fontSize: '18px', color: isLightMode ? '#102a43' : '#fff', letterSpacing: '-0.02em' }}>
              CredDigital
            </span>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: isLightMode ? '#486581' : '#8e9eb5', margin: 0 }}>
            Revolucionando a experiência de crédito com tecnologia de ponta, segurança avançada e transparência total em cada etapa.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
            {socialLinks.map((social) => {
              const isHovered = hoveredSocial === social.name;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: isHovered 
                      ? `linear-gradient(135deg, ${social.color}, #030a19)` 
                      : (isLightMode ? 'linear-gradient(145deg, rgba(200,215,230,0.8), rgba(230,240,250,0.95))' : 'linear-gradient(145deg, rgba(25,50,90,0.8), rgba(8,20,40,0.95))'),
                    border: `1px solid ${isHovered ? social.color : (isLightMode ? 'rgba(116,146,177,0.4)' : 'rgba(70,111,170,0.4)')}`,
                    boxShadow: isHovered 
                      ? `0 8px 20px ${social.color}55, inset 0 2px 4px rgba(255,255,255,0.3)` 
                      : '0 6px 14px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateY(-4px) scale(1.08)' : 'translateY(0) scale(1)',
                    color: isHovered ? '#ffffff' : (isLightMode ? '#486581' : '#ffffff'),
                    textDecoration: 'none'
                  }}
                  title={`${social.name} - Opiniões e avaliações de clientes`}
                >
                  {social.icon}
                </a>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: isLightMode ? '#102a43' : '#fff', fontSize: '14px', fontWeight: 800, margin: '0 0 6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Plataforma
          </h4>
          <span style={{ fontSize: '13px', color: isLightMode ? '#486581' : '#8e9eb5', cursor: 'pointer' }}>Início</span>
          <span style={{ fontSize: '13px', color: isLightMode ? '#486581' : '#8e9eb5', cursor: 'pointer' }}>Solicitação de Crédito</span>
          <span style={{ fontSize: '13px', color: isLightMode ? '#486581' : '#8e9eb5', cursor: 'pointer' }}>Área do Cliente</span>
          <span style={{ fontSize: '13px', color: isLightMode ? '#486581' : '#8e9eb5', cursor: 'pointer' }}>Painel Administrativo</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: isLightMode ? '#102a43' : '#fff', fontSize: '14px', fontWeight: 800, margin: '0 0 6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Segurança
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: isLightMode ? '#486581' : '#8e9eb5' }}>
            <span style={{ color: '#4ade80', fontWeight: 900 }}>✓</span> Criptografia de Ponta a Ponta
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: isLightMode ? '#486581' : '#8e9eb5' }}>
            <span style={{ color: '#4ade80', fontWeight: 900 }}>✓</span> Conformidade LGPD
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: isLightMode ? '#486581' : '#8e9eb5' }}>
            <span style={{ color: '#4ade80', fontWeight: 900 }}>✓</span> Biometria Certificada
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: isLightMode ? '#102a43' : '#fff', fontSize: '14px', fontWeight: 800, margin: '0 0 6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Status
          </h4>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '999px',
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.25)',
            width: 'fit-content'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 10px #4ade80'
            }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#4ade80' }}>Sistemas Operacionais</span>
          </div>
          <span style={{ fontSize: '12px', color: isLightMode ? '#627d98' : '#64748b' }}>Conectado ao Supabase</span>
        </div>
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingTop: '25px',
        borderTop: isLightMode ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        fontSize: '12px'
      }}>
        <span>© {new Date().getFullYear()} CredDigital S.A. • Conectado ao Supabase.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ cursor: 'pointer' }}>Termos de Uso</span>
          <span style={{ cursor: 'pointer' }}>Política de Privacidade</span>
          <span style={{ cursor: 'pointer' }}>Suporte</span>
        </div>
      </div>
    </footer>
  );
}

// =====================================================
// ÍCONES DE REDES SOCIAIS E SISTEMA
// =====================================================

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"></polygon>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="M5 6l7-3 7 3" />
      <path d="M4 10v11" />
      <path d="M20 10v11" />
      <path d="M8 14v3" />
      <path d="M12 14v3" />
      <path d="M16 14v3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e0ab2b"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}

