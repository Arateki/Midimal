// ig-transparency.jsx — 6 variações de template "Transparência"
// Dados reais sobre as práticas da Arateki. Cada layout usa um mecanismo visual inédito.

// ─────────── TR01 · Barras de progresso ──────────────────────────────
// Barra proporcional por métrica. Track + fill com opacidade independente via siblings.
// Primeiro chart visual quantitativo do projeto.
function IgTransp01({ data, onEdit, format = 'square' }) {
  const bars = [
    { lKey: 'label1', vKey: 'val1' },
    { lKey: 'label2', vKey: 'val2' },
    { lKey: 'label3', vKey: 'val3' },
    { lKey: 'label4', vKey: 'val4' },
  ];
  return (
    <>
      <IgHeader index="TR · 01" label="T R A N S P A R Ê N C I A" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        paddingBottom: format === 'story' ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data.title} onChange={onEdit('title')} style={{
          fontSize: format === 'story'
            ? 'calc(44px * var(--ig-size-scale, 1))'
            : 'calc(36px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: 44,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: format === 'story' ? 36 : 28, flex: 1, justifyContent: 'center' }}>
          {bars.map(({ lKey, vKey }) => {
            const pct = Math.min(100, Math.max(0, parseInt(data[vKey]) || 0));
            return (
              <div key={lKey}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <IgEdit value={data[lKey]} onChange={onEdit(lKey)} style={{
                    fontSize: 'calc(17px * var(--ig-size-scale, 1))',
                    fontWeight: 'var(--ig-weight)', letterSpacing: '-0.01em',
                  }} />
                  <IgEdit value={data[vKey]} onChange={onEdit(vKey)} style={{
                    fontSize: 'calc(13px * var(--ig-small-scale, 1))',
                    fontWeight: 'var(--ig-weight-small)', letterSpacing: '0.12em',
                    color: 'var(--fg-2)',
                  }} />
                </div>
                {/* Track + fill como siblings para opacidade independente */}
                <div style={{ height: 2, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'currentColor', opacity: 0.14 }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: pct + '%', background: 'currentColor' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.tag} />
    </>
  );
}

// ─────────── TR02 · Mosaico irregular ────────────────────────────────
// CSS grid 2×3 com célula hero (gridColumn: 1/3). Colspan no projeto.
// Estrutura de mosaico nunca usada nas outras seções.
function IgTransp02({ data, onEdit, format = 'square' }) {
  const cells = ['cell1', 'cell2', 'cell3', 'cell4'];
  return (
    <>
      <IgHeader index="TR · 02" label="T R A N S P A R Ê N C I A" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        paddingBottom: format === 'story' ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          flex: 1,
          border: '1px solid currentColor',
          borderRight: 'none', borderBottom: 'none',
        }}>
          {/* Célula hero — ocupa as 2 colunas */}
          <div style={{
            gridColumn: '1 / 3',
            borderRight: '1px solid currentColor',
            borderBottom: '1px solid currentColor',
            padding: format === 'story' ? '28px 24px' : '20px 18px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          }}>
            <IgEdit value={data.heroLabel} onChange={onEdit('heroLabel')}
              className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 10 }} />
            <IgEdit as="p" multiline value={data.hero} onChange={onEdit('hero')} style={{
              fontSize: format === 'story'
                ? 'calc(40px * var(--ig-size-scale, 1))'
                : 'calc(30px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.02em', lineHeight: 1.2,
            }} />
          </div>
          {/* 4 células menores */}
          {cells.map((key) => (
            <div key={key} style={{
              borderRight: '1px solid currentColor',
              borderBottom: '1px solid currentColor',
              padding: format === 'story' ? '20px 18px' : '14px 14px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <IgEdit value={data[key + 'l']} onChange={onEdit(key + 'l')} style={{
                fontSize: 'calc(10px * var(--ig-small-scale, 1))',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--fg-2)', display: 'block',
              }} />
              <IgEdit value={data[key + 'v']} onChange={onEdit(key + 'v')} style={{
                fontSize: format === 'story'
                  ? 'calc(24px * var(--ig-size-scale, 1))'
                  : 'calc(19px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                letterSpacing: '-0.01em', lineHeight: 1.2,
              }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─────────── TR03 · Linha do tempo vertical ──────────────────────────
// Eixo vertical com marcadores em diamante conectados por linha tracejada.
// Complementa a timeline horizontal de P03 — eixos opostos.
function IgTransp03({ data, onEdit, format = 'square' }) {
  const entries = ['1', '2', '3'];
  const isStory = format === 'story';
  return (
    <>
      <IgHeader index="TR · 03" label="H I S T Ó R I C O" showLogo />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data.title} onChange={onEdit('title')} style={{
          fontSize: isStory ? 'calc(44px * var(--ig-size-scale, 1))' : 'calc(36px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: isStory ? 52 : 40,
        }} />

        <div style={{ display: 'flex', flex: 1, gap: isStory ? 32 : 24 }}>
          {/* Eixo vertical: marcadores + conectores */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 2 }}>
            {entries.map((n, i) => (
              <React.Fragment key={n}>
                <div style={{
                  width: 8, height: 8, flexShrink: 0,
                  border: '1px solid currentColor',
                  background: 'var(--bg-1)',
                  transform: 'rotate(45deg)',
                }} />
                {i < entries.length - 1 && (
                  <div style={{
                    width: 1, flex: 1,
                    backgroundImage: 'repeating-linear-gradient(to bottom, currentColor 0, currentColor 4px, transparent 4px, transparent 9px)',
                    opacity: 0.35, margin: '8px 0',
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Entradas */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {entries.map((n, i) => (
              <div key={n} style={{ flex: 1, paddingBottom: i < entries.length - 1 ? (isStory ? 32 : 24) : 0 }}>
                <IgEdit value={data['year' + n]} onChange={onEdit('year' + n)} style={{
                  display: 'block',
                  fontSize: 'calc(11px * var(--ig-small-scale, 1))',
                  fontWeight: 'var(--ig-weight-small)', letterSpacing: '0.18em',
                  color: 'var(--fg-2)', marginBottom: 10, marginTop: -1,
                }} />
                <IgEdit as="p" multiline value={data['event' + n]} onChange={onEdit('event' + n)} style={{
                  fontSize: isStory ? 'calc(28px * var(--ig-size-scale, 1))' : 'calc(22px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)', letterSpacing: '-0.01em', lineHeight: 1.35,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── TR04 · Faixa diagonal ────────────────────────────────────
// Elemento central em faixa ligeiramente rotacionada atravessa o canvas.
// Conteúdo contextual acima e detalhe abaixo. Único elemento estrutural rotacionado.
function IgTransp04({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const pad = 'var(--ig-chrome-pad, 80px)';
  const bandH = isStory ? 80 : 64;
  const bandTop = isStory ? '46%' : '43%';
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg-1)' }}>
      {/* Faixa diagonal */}
      <div style={{
        position: 'absolute',
        top: bandTop, left: 0, right: 0,
        transform: 'translateY(-50%) rotate(-2.5deg)',
        borderTop: '1px solid currentColor',
        borderBottom: '1px solid currentColor',
        height: bandH,
        display: 'flex', alignItems: 'center',
        padding: `0 ${pad}`,
        background: 'var(--bg-1)',
        zIndex: 1,
      }}>
        <IgEdit value={data.band} onChange={onEdit('band')} style={{
          fontSize: isStory ? 'calc(38px * var(--ig-size-scale, 1))' : 'calc(30px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)', letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
        }} />
      </div>

      {/* Seção superior */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: `calc(${bandTop} - ${bandH / 2}px)`,
        padding: pad,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>T R · 04  —  T R A N S P A R Ê N C I A</span>
          <IgLogo size="sm" />
        </div>
        <IgEdit as="p" multiline value={data.above} onChange={onEdit('above')} style={{
          fontSize: isStory ? 'calc(34px * var(--ig-size-scale, 1))' : 'calc(26px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)', letterSpacing: '-0.01em', lineHeight: 1.3,
        }} />
      </div>

      {/* Seção inferior */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: isStory ? '47%' : '50%',
        padding: pad,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        paddingTop: `calc(${pad} + ${bandH / 2}px)`,
      }}>
        <IgEdit as="p" multiline value={data.below} onChange={onEdit('below')} style={{
          fontSize: isStory ? 'calc(24px * var(--ig-size-scale, 1))' : 'calc(17px * var(--ig-size-scale, 1))',
          color: 'var(--fg-2)', letterSpacing: '0.005em', lineHeight: 1.65,
        }} />
        <IgEdit value={data.source} onChange={onEdit('source')}
          className="ig-meta" style={{ color: 'var(--fg-2)' }} />
      </div>
    </div>
  );
}

// ─────────── TR05 · Declaração + notas de rodapé ─────────────────────
// Afirmação principal em display. Após régua: notas numeradas em corpo pequeno.
// Referência visual: relatórios técnicos, documentos de auditoria.
function IgTransp05({ data, onEdit, format = 'square' }) {
  const notes = ['1', '2', '3'];
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>T R · 05  —  T R A N S P A R Ê N C I A</span>
          <IgLogo size="sm" />
        </div>

        {/* Declaração principal */}
        <IgEdit as="p" multiline value={data.statement} onChange={onEdit('statement')} style={{
          fontSize: format === 'story'
            ? 'calc(56px * var(--ig-size-scale, 1))'
            : 'calc(44px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.025em', lineHeight: 1.1,
        }} />

        {/* Notas numeradas */}
        <div>
          <IgRule strong={false} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: format === 'story' ? 16 : 12, marginTop: 16 }}>
            {notes.map((n) => (
              <div key={n} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: 'calc(11px * var(--ig-small-scale, 1))',
                  color: 'var(--fg-2)', flexShrink: 0,
                  fontWeight: 'var(--ig-weight-small)', letterSpacing: '0.1em',
                  paddingTop: '0.15em', minWidth: 14,
                }}>{n}.</span>
                <IgEdit value={data['note' + n]} onChange={onEdit('note' + n)} style={{
                  fontSize: format === 'story' ? 'calc(18px * var(--ig-size-scale, 1))' : 'calc(14px * var(--ig-size-scale, 1))',
                  color: 'var(--fg-2)', letterSpacing: '0.01em', lineHeight: 1.6,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── TR06 · Linhas alternadas invertidas ──────────────────────
// Linhas pares: background=currentColor, texto=var(--bg-1). Inversão real de cor.
// Efeito de tabela editorial com alto contraste. Inédito no projeto.
function IgTransp06({ data, onEdit, format = 'square' }) {
  const rows = ['1', '2', '3', '4', '5'];
  return (
    <>
      <IgHeader index="TR · 06" label="P O L Í T I C A S" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        paddingBottom: format === 'story' ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data.title} onChange={onEdit('title')} style={{
          fontSize: format === 'story' ? 'calc(42px * var(--ig-size-scale, 1))' : 'calc(34px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: 32,
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          {rows.map((n, i) => {
            const inv = i % 2 === 1;
            return (
              <div key={n} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: 16,
                padding: format === 'story' ? '18px 14px' : '13px 10px',
                background: inv ? 'currentColor' : 'transparent',
              }}>
                <IgEdit value={data['label' + n]} onChange={onEdit('label' + n)} style={{
                  fontSize: 'calc(13px * var(--ig-small-scale, 1))',
                  letterSpacing: '0.08em',
                  color: inv ? 'var(--bg-1)' : 'var(--fg-2)',
                }} />
                <IgEdit value={data['value' + n]} onChange={onEdit('value' + n)} style={{
                  fontSize: 'calc(17px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)', letterSpacing: '-0.01em',
                  color: inv ? 'var(--bg-1)' : 'currentColor',
                  textAlign: 'right', flexShrink: 0,
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─────────── TR07 · Gráfico em donut · SVG ────────────────────────────
// Donut chart com strokes parciais via stroke-dasharray e três opacidades
// para diferenciar segmentos. Centro tipográfico com total + label.
// Layout primitivo novo: "SVG donut chart" — primeiro gráfico circular do
// projeto. Complementa as barras horizontais de TR01.
function IgTransp07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const segments = [
    { vKey: 'val1', lKey: 'label1' },
    { vKey: 'val2', lKey: 'label2' },
    { vKey: 'val3', lKey: 'label3' },
  ];
  const opacities = [1, 0.55, 0.22];
  const total = segments.reduce((acc, s) => acc + (parseFloat(data[s.vKey]) || 0), 0);
  const r = isStory ? 130 : 100;
  const sw = isStory ? 30 : 24;
  const size = (r + sw) * 2 + 8;
  const c = 2 * Math.PI * r;
  let cumulative = 0;
  return (
    <>
      <IgHeader index="TR · 07" label="D I S T R I B U I Ç Ã O" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 'inherit',
          paddingTop: isStory ? 280 : 220,
          paddingBottom: isStory ? 140 : 100,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IgEdit
          as="p"
          multiline
          value={data.title}
          onChange={onEdit('title')}
          style={{
            fontSize: isStory
              ? 'calc(44px * var(--ig-size-scale, 1))'
              : 'calc(36px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: 32,
          }}
        />
        <div style={{ display: 'flex', flex: 1, gap: isStory ? 60 : 44, alignItems: 'center' }}>
          {/* Donut SVG */}
          <div style={{ flexShrink: 0, position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              {segments.map((s, i) => {
                const v = parseFloat(data[s.vKey]) || 0;
                const frac = total > 0 ? v / total : 0;
                const dash = c * frac;
                const offset = -cumulative * c;
                cumulative += frac;
                return (
                  <circle
                    key={s.vKey}
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={sw}
                    strokeDasharray={`${dash} ${c}`}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{ opacity: opacities[i] || 0.4 }}
                  />
                );
              })}
            </svg>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <IgEdit
                value={data.totalLabel}
                onChange={onEdit('totalLabel')}
                style={{
                  fontSize: isStory
                    ? 'calc(64px * var(--ig-size-scale, 1))'
                    : 'calc(50px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight-light)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  display: 'block',
                  fontVariantNumeric: 'tabular-nums',
                }}
              />
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginTop: 8 }}>
                T O T A L
              </span>
            </div>
          </div>
          {/* Legenda */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: isStory ? 26 : 20 }}>
            {segments.map((s, i) => (
              <div key={s.vKey} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    flexShrink: 0,
                    background: 'currentColor',
                    opacity: opacities[i] || 0.4,
                    transform: 'translateY(2px)',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <IgEdit
                    value={data[s.lKey]}
                    onChange={onEdit(s.lKey)}
                    style={{
                      fontSize: isStory
                        ? 'calc(22px * var(--ig-size-scale, 1))'
                        : 'calc(17px * var(--ig-size-scale, 1))',
                      fontWeight: 'var(--ig-weight)',
                      letterSpacing: '-0.01em',
                      display: 'block',
                      marginBottom: 4,
                    }}
                  />
                  <IgEdit
                    value={data[s.vKey]}
                    onChange={onEdit(s.vKey)}
                    className="ig-meta"
                    style={{ color: 'var(--fg-2)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.tag} />
    </>
  );
}

// ─── TR08 · Mapa de calor · grade de opacidades ──────────────────────
// Matriz NxM em que cada célula tem opacidade proporcional ao valor.
// Legenda escalar abaixo. Layout primitivo novo: "Heatmap grid /
// density visualization".
function IgTransp08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const matrix = data.matrix || [
    [0.2, 0.4, 0.6, 0.3, 0.7, 0.9, 0.8],
    [0.5, 0.6, 0.8, 0.9, 0.7, 0.4, 0.3],
    [0.7, 0.5, 0.4, 0.6, 0.5, 0.8, 0.6],
    [0.9, 0.8, 0.6, 0.5, 0.7, 0.6, 0.5],
  ];
  const rowLabels = data.rowLabels || ['S e m   1', 'S e m   2', 'S e m   3', 'S e m   4'];
  const cols = matrix[0].length;
  const dow = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].slice(0, cols);
  const labelW = isStory ? 130 : 100;
  return (
    <>
      <IgHeader index="TR · 08" label="A T I V I D A D E" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline
          value={data.title || 'Commits no repositório do Vault — últimas 4 semanas.'}
          onChange={onEdit('title')}
          style={{
            fontSize: isStory
              ? 'calc(40px * var(--ig-size-scale, 1))'
              : 'calc(32px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.15,
            marginBottom: 28,
          }} />
        <div style={{
          display: 'grid', gridTemplateColumns: `${labelW}px repeat(${cols}, 1fr)`,
          gap: 4, marginBottom: 6,
        }}>
          <span />
          {dow.map((l, i) => (
            <span key={i} className="ig-meta"
              style={{ color: 'var(--fg-2)', textAlign: 'center' }}>
              {l}
            </span>
          ))}
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 4,
          flex: 1, justifyContent: 'center',
        }}>
          {matrix.map((row, ri) => (
            <div key={ri} style={{
              display: 'grid',
              gridTemplateColumns: `${labelW}px repeat(${cols}, 1fr)`,
              gap: 4,
            }}>
              <span style={{
                fontSize: 'calc(11px * var(--ig-small-scale, 1))',
                color: 'var(--fg-2)', letterSpacing: '0.16em',
                alignSelf: 'center', fontWeight: 'var(--ig-weight-small)',
              }}>
                {rowLabels[ri]}
              </span>
              {row.map((val, ci) => (
                <div key={ci} style={{
                  aspectRatio: '1 / 1',
                  background: 'currentColor',
                  opacity: 0.06 + Math.max(0, Math.min(1, val)) * 0.94,
                }} />
              ))}
            </div>
          ))}
        </div>
        {/* Legenda da escala */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 12, marginTop: 22,
        }}>
          <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>M E N O S</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((v, i) => (
              <div key={i} style={{
                width: isStory ? 24 : 18,
                height: isStory ? 24 : 18,
                background: 'currentColor', opacity: v,
              }} />
            ))}
          </div>
          <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>M A I S</span>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.tag || '2 0 2 6'} />
    </>
  );
}

Object.assign(window, {
  IgTransp01, IgTransp02, IgTransp03, IgTransp04, IgTransp05, IgTransp06, IgTransp07, IgTransp08,
});
