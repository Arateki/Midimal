// ig-08-drafts.jsx — 12 esboços de layout (oitava variação por seção).
// Foco em estrutura visual + texto principal. Sem registro em IG_DEFAULTS,
// window, ou Instagram Posts.html — integração fica a cargo do mantenedor.
//
// Cada componente segue a assinatura padrão { data, onEdit, format } e usa
// `data?.X ?? 'fallback'` para que o esboço renderize mesmo sem entrada
// correspondente em IG_DEFAULTS. Substitua pelos defaults reais ao integrar.

// ─── M08 · Frase em escada · indentação progressiva ──────────────────
// Cada linha desce um degrau à direita, formando uma diagonal tipográfica.
// Layout primitivo novo: "Staircase / staggered baseline".
function IgManifesto08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const lines = data?.lines ?? [
    'Construímos',
    'ferramentas',
    'que servem',
    'a quem',
    'as usa.',
  ];
  const stepX = isStory ? 56 : 44;
  return (
    <>
      <IgHeader index="M · 08" label="D E C L A R A Ç Ã O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        {lines.map((ln, i) => (
          <IgEdit
            key={i}
            value={ln}
            onChange={(v) => {
              const next = lines.slice(); next[i] = v;
              onEdit('lines')(next);
            }}
            style={{
              paddingLeft: i * stepX,
              fontSize: isStory
                ? 'calc(120px * var(--ig-size-scale, 1))'
                : 'calc(92px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              display: 'block',
            }}
          />
        ))}
      </div>
      <IgFooter left="A R A T E K I" right="M · 0 8" />
    </>
  );
}

// ─── A08 · Diagrama de calltouts · vista explodida ───────────────────
// Produto retangular ao centro com linhas SVG saindo até quatro labels
// nos cantos (estilo blueprint / vista explodida industrial).
// Layout primitivo novo: "Exploded callout diagram".
function IgAnnounce08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const callouts = data?.callouts ?? [
    { pos: 'tl', label: 'M A T E R I A L',  spec: 'Alumínio anodizado' },
    { pos: 'tr', label: 'C H I P',          spec: 'Secure Element EAL6+' },
    { pos: 'bl', label: 'F I R M W A R E', spec: 'Código aberto' },
    { pos: 'br', label: 'C O N E X Ã O',   spec: 'USB-C · NFC' },
  ];
  return (
    <>
      <IgHeader index="A · 08" label="V I S T A   E X P L O D I D A" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          {/* Linhas de chamada (atrás) */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <line x1="14" y1="14" x2="42" y2="42" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <line x1="86" y1="14" x2="58" y2="42" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <line x1="14" y1="86" x2="42" y2="58" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <line x1="86" y1="86" x2="58" y2="58" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          {/* Produto central */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: isStory ? '52%' : '40%',
            aspectRatio: '7 / 4',
            border: '1.5px solid currentColor',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-1)', zIndex: 2,
          }}>
            <IgEdit value={data?.name ?? 'Shield'} onChange={onEdit('name')} style={{
              fontSize: isStory
                ? 'calc(80px * var(--ig-size-scale, 1))'
                : 'calc(60px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em',
            }} />
          </div>
          {/* Callouts nos cantos */}
          {callouts.map((c, i) => {
            const corner = {
              tl: { top: 0,    left: 0,  textAlign: 'left'  },
              tr: { top: 0,    right: 0, textAlign: 'right' },
              bl: { bottom: 0, left: 0,  textAlign: 'left'  },
              br: { bottom: 0, right: 0, textAlign: 'right' },
            }[c.pos];
            return (
              <div key={i} style={{
                position: 'absolute', ...corner, zIndex: 3,
                background: 'var(--bg-1)', padding: '6px 10px',
                maxWidth: '38%',
              }}>
                <IgEdit value={c.label} onChange={(v) => {
                  const next = callouts.slice(); next[i] = { ...next[i], label: v };
                  onEdit('callouts')(next);
                }} className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 6 }} />
                <IgEdit value={c.spec} onChange={(v) => {
                  const next = callouts.slice(); next[i] = { ...next[i], spec: v };
                  onEdit('callouts')(next);
                }} style={{
                  fontSize: isStory
                    ? 'calc(22px * var(--ig-size-scale, 1))'
                    : 'calc(17px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)', letterSpacing: '-0.01em',
                }} />
              </div>
            );
          })}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data?.tag ?? '2 0 2 6'} />
    </>
  );
}

// ─── E08 · Diagrama de Venn · interseção ─────────────────────────────
// Dois círculos sobrepostos com três zonas rotuladas. Único uso semântico
// de circulares no projeto além do donut chart de TR07.
// Layout primitivo novo: "Venn diagram / set intersection".
function IgEducational08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const r = isStory ? 220 : 170;
  return (
    <>
      <IgHeader index="E · 08" label="I N T E R S E C Ç Ã O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data?.title ?? 'O que torna o Vault, Vault.'}
          onChange={onEdit('title')}
          style={{
            fontSize: isStory
              ? 'calc(48px * var(--ig-size-scale, 1))'
              : 'calc(38px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.12,
            marginBottom: 24,
          }} />
        <div style={{
          flex: 1, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute',
            width: r * 2, height: r * 2,
            borderRadius: '50%',
            border: '1.5px solid currentColor',
            transform: `translateX(-${r * 0.55}px)`,
          }} />
          <div style={{
            position: 'absolute',
            width: r * 2, height: r * 2,
            borderRadius: '50%',
            border: '1.5px solid currentColor',
            transform: `translateX(${r * 0.55}px)`,
          }} />
          {/* Label A (esquerda) */}
          <div style={{
            position: 'absolute', left: '8%', top: '50%',
            transform: 'translateY(-50%)',
            textAlign: 'center', maxWidth: 200,
          }}>
            <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 10 }}>
              S Ó   A
            </span>
            <IgEdit as="p" multiline value={data?.onlyA ?? 'Criptografia\nforte'}
              onChange={onEdit('onlyA')}
              style={{
                fontSize: isStory
                  ? 'calc(28px * var(--ig-size-scale, 1))'
                  : 'calc(22px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.15,
              }} />
          </div>
          {/* Interseção (centro) */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center', maxWidth: 220, zIndex: 2,
            background: 'var(--bg-1)', padding: '10px 14px',
          }}>
            <span className="ig-meta" style={{ display: 'block', marginBottom: 10 }}>
              I N T E R S E C Ç Ã O
            </span>
            <IgEdit value={data?.both ?? 'Vault'} onChange={onEdit('both')}
              style={{
                fontSize: isStory
                  ? 'calc(56px * var(--ig-size-scale, 1))'
                  : 'calc(42px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em',
              }} />
          </div>
          {/* Label B (direita) */}
          <div style={{
            position: 'absolute', right: '8%', top: '50%',
            transform: 'translateY(-50%)',
            textAlign: 'center', maxWidth: 200,
          }}>
            <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 10 }}>
              S Ó   B
            </span>
            <IgEdit as="p" multiline value={data?.onlyB ?? 'Interface\nacessível'}
              onChange={onEdit('onlyB')}
              style={{
                fontSize: isStory
                  ? 'calc(28px * var(--ig-size-scale, 1))'
                  : 'calc(22px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.15,
              }} />
          </div>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right="E · 0 8" />
    </>
  );
}

// ─── V08 · Calendário do mês · célula destacada ──────────────────────
// Grade 7×N com a data do evento marcada por boxShadow inset (preserva
// alinhamento das bordas da grade). Layout primitivo novo: "Calendar
// grid / month view".
function IgEvent08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const startWeekday = data?.startWeekday ?? 0; // 0 = domingo
  const monthDays    = data?.daysInMonth ?? 30;
  const eventDay     = parseInt(data?.day ?? '12', 10);
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= monthDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const dow = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  return (
    <>
      <IgHeader index="V · 08" label="A G E N D A" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ marginBottom: 28 }}>
          <IgEdit value={data?.month ?? 'J U N H O   ·   2 0 2 6'}
            onChange={onEdit('month')}
            className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          <IgEdit value={data?.title ?? 'Encontro Arateki'}
            onChange={onEdit('title')}
            style={{
              display: 'block', marginTop: 10,
              fontSize: isStory
                ? 'calc(60px * var(--ig-size-scale, 1))'
                : 'calc(46px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)', letterSpacing: '-0.03em', lineHeight: 1.05,
            }} />
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          marginBottom: 6,
        }}>
          {dow.map((h, i) => (
            <span key={i} className="ig-meta"
              style={{ color: 'var(--fg-2)', textAlign: 'center', padding: '6px 0' }}>
              {h}
            </span>
          ))}
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          borderTop: '1px solid currentColor',
          borderLeft: '1px solid currentColor',
          flex: 1,
        }}>
          {cells.map((d, i) => {
            const isEvent = d === eventDay;
            return (
              <div key={i} style={{
                borderRight: '1px solid currentColor',
                borderBottom: '1px solid currentColor',
                aspectRatio: '1 / 1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                boxShadow: isEvent ? 'inset 0 0 0 2.5px currentColor' : undefined,
                zIndex: isEvent ? 2 : 1,
              }}>
                <span style={{
                  fontSize: isEvent
                    ? (isStory ? 'calc(40px * var(--ig-size-scale, 1))' : 'calc(28px * var(--ig-size-scale, 1))')
                    : (isStory ? 'calc(20px * var(--ig-size-scale, 1))' : 'calc(15px * var(--ig-size-scale, 1))'),
                  fontWeight: isEvent ? 'var(--ig-weight)' : 'var(--ig-weight-light)',
                  color: d ? 'currentColor' : 'transparent',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: isEvent ? '-0.02em' : 0,
                }}>
                  {d || '·'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <IgFooter left={data?.location ?? 'S Ã O   P A U L O  ·  S P'} right="V · 0 8" />
    </>
  );
}

// ─── J08 · Pirâmide de carreira · níveis trapezoidais ────────────────
// Três blocos centralizados de larguras crescentes. Quanto mais largo,
// mais entrada (júnior). Layout primitivo novo: "Pyramid / hierarchy
// stack".
function IgJob08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const levels = data?.levels ?? [
    { title: 'Sênior', desc: 'Define direção técnica · mentora · responde por arquitetura',  width: 44 },
    { title: 'Pleno',  desc: 'Conduz projetos · decisões autônomas · revisa código',         width: 68 },
    { title: 'Júnior', desc: 'Aprende fazendo · suporte direto da equipe · pareamento diário', width: 92 },
  ];
  return (
    <>
      <IgHeader index="J · 08" label="N Í V E I S   D E   C A R R E I R A" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data?.headline ?? 'Como crescemos juntos.'}
          onChange={onEdit('headline')}
          style={{
            fontSize: isStory
              ? 'calc(54px * var(--ig-size-scale, 1))'
              : 'calc(42px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.1,
            marginBottom: 32,
          }} />
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 0,
        }}>
          {levels.map((lv, i) => (
            <div key={i} style={{
              width: lv.width + '%',
              borderTop: '1.5px solid currentColor',
              borderLeft: '1.5px solid currentColor',
              borderRight: '1.5px solid currentColor',
              borderBottom: i === levels.length - 1 ? '1.5px solid currentColor' : 'none',
              padding: isStory ? '24px 32px' : '18px 24px',
              display: 'flex', alignItems: 'baseline', gap: 24,
              background: 'var(--bg-1)',
            }}>
              <span className="ig-meta" style={{ color: 'var(--fg-2)', flexShrink: 0 }}>
                0{i + 1}
              </span>
              <IgEdit value={lv.title} onChange={(v) => {
                const next = levels.slice(); next[i] = { ...next[i], title: v };
                onEdit('levels')(next);
              }} style={{
                fontSize: isStory
                  ? 'calc(36px * var(--ig-size-scale, 1))'
                  : 'calc(28px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em',
                flexShrink: 0,
              }} />
              <IgEdit value={lv.desc} onChange={(v) => {
                const next = levels.slice(); next[i] = { ...next[i], desc: v };
                onEdit('levels')(next);
              }} style={{
                fontSize: 'calc(14px * var(--ig-size-scale, 1))',
                color: 'var(--fg-2)', flex: 1, textAlign: 'right',
                lineHeight: 1.4,
              }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left={data?.url ?? 'A R A T E K I . O R G / V A G A S'} right="J · 0 8" />
    </>
  );
}

// ─── B08 · Sumário com leader dots ───────────────────────────────────
// Lista numerada com pontilhado horizontal entre título e número da
// página, em fonte mono. Layout primitivo novo: "Table of contents /
// leader dots".
function IgBlog08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const chapters = data?.chapters ?? [
    { title: 'Sobre identidade soberana',         page: '0 0 4' },
    { title: 'Por que rejeitamos a custódia',     page: '0 1 8' },
    { title: 'Anatomia de um par de chaves',      page: '0 3 6' },
    { title: 'Vault em campo · 6 meses',          page: '0 5 4' },
    { title: 'O que vem depois',                  page: '0 8 2' },
  ];
  return (
    <>
      <IgHeader index="B · 08" label="S U M Á R I O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ marginBottom: 30 }}>
          <IgEdit value={data?.kicker ?? 'A R A T E K I  ·  P U B L I C A Ç Ã O   T R I M E S T R A L'}
            onChange={onEdit('kicker')}
            className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          <IgEdit value={data?.title ?? 'Sumário · Edição 02'}
            onChange={onEdit('title')}
            style={{
              display: 'block', marginTop: 12,
              fontSize: isStory
                ? 'calc(96px * var(--ig-size-scale, 1))'
                : 'calc(72px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.04em',
            }} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {chapters.map((ch, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'baseline', gap: 16,
              padding: `${isStory ? 18 : 14}px 0`,
            }}>
              <span style={{
                fontSize: 'calc(11px * var(--ig-small-scale, 1))',
                fontWeight: 'var(--ig-weight-small)',
                letterSpacing: '0.18em', color: 'var(--fg-2)',
                flexShrink: 0, minWidth: 36,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <IgEdit value={ch.title} onChange={(v) => {
                const next = chapters.slice(); next[i] = { ...next[i], title: v };
                onEdit('chapters')(next);
              }} style={{
                fontSize: isStory
                  ? 'calc(26px * var(--ig-size-scale, 1))'
                  : 'calc(20px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.01em',
                flexShrink: 0,
              }} />
              <div style={{
                flex: 1, height: '1.2em',
                borderBottom: '1px dotted currentColor',
                margin: '0 8px',
                opacity: 0.45,
                alignSelf: 'flex-end',
                marginBottom: 6,
              }} />
              <IgEdit value={ch.page} onChange={(v) => {
                const next = chapters.slice(); next[i] = { ...next[i], page: v };
                onEdit('chapters')(next);
              }} style={{
                fontSize: 'calc(15px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                fontVariantNumeric: 'tabular-nums',
                fontFamily: '"Courier New", Courier, monospace',
                flexShrink: 0, color: 'var(--fg-2)',
              }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left={data?.url ?? 'A R A T E K I . O R G / B L O G'} right="B · 0 8" />
    </>
  );
}

// ─── TR08 · Mapa de calor · grade de opacidades ──────────────────────
// Matriz NxM em que cada célula tem opacidade proporcional ao valor.
// Legenda escalar abaixo. Layout primitivo novo: "Heatmap grid /
// density visualization".
function IgTransp08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const matrix = data?.matrix ?? [
    [0.2, 0.4, 0.6, 0.3, 0.7, 0.9, 0.8],
    [0.5, 0.6, 0.8, 0.9, 0.7, 0.4, 0.3],
    [0.7, 0.5, 0.4, 0.6, 0.5, 0.8, 0.6],
    [0.9, 0.8, 0.6, 0.5, 0.7, 0.6, 0.5],
  ];
  const rowLabels = data?.rowLabels ?? ['S e m   1', 'S e m   2', 'S e m   3', 'S e m   4'];
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
          value={data?.title ?? 'Commits no repositório do Vault — últimas 4 semanas.'}
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
      <IgFooter left="A R A T E K I" right={data?.tag ?? '2 0 2 6'} />
    </>
  );
}

// ─── PRD08 · Pilha de camadas · arquitetura ──────────────────────────
// Quatro camadas horizontais empilhadas representando a stack do
// produto. Opacidade decresce nas camadas inferiores (efeito de
// profundidade). Layout primitivo novo: "Layered stack / system
// architecture".
function IgProduct08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const layers = data?.layers ?? [
    { level: 'L4', name: 'Interface',    desc: 'CLI · Desktop Tauri · Web (futuro)' },
    { level: 'L3', name: 'Domínio',      desc: 'Lógica de chaves · assinaturas · backup' },
    { level: 'L2', name: 'Criptografia', desc: 'Ed25519 · AES-256-GCM · Argon2id' },
    { level: 'L1', name: 'Hardware',     desc: 'Secure Element opcional · Shield (NFC + USB-C)' },
  ];
  return (
    <>
      <IgHeader index="P · 08" label="A R Q U I T E T U R A" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ marginBottom: 30 }}>
          <IgEdit value={data?.product ?? 'Vault'} onChange={onEdit('product')}
            style={{
              fontSize: isStory
                ? 'calc(80px * var(--ig-size-scale, 1))'
                : 'calc(64px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em',
              display: 'block',
            }} />
          <IgEdit value={data?.subtitle ?? 'Quatro camadas — do hardware à interface.'}
            onChange={onEdit('subtitle')}
            style={{
              display: 'block', marginTop: 8,
              fontSize: 'calc(17px * var(--ig-size-scale, 1))',
              color: 'var(--fg-2)', fontWeight: 'var(--ig-weight-light)',
            }} />
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {layers.map((ly, i) => (
            <div key={i} style={{
              borderTop: '1.5px solid currentColor',
              borderBottom: i === layers.length - 1 ? '1.5px solid currentColor' : 'none',
              padding: isStory ? '22px 28px' : '18px 22px',
              display: 'flex', alignItems: 'center', gap: 24,
              opacity: 1 - i * 0.12,
            }}>
              <IgEdit value={ly.level} onChange={(v) => {
                const next = layers.slice(); next[i] = { ...next[i], level: v };
                onEdit('layers')(next);
              }} style={{
                fontSize: isStory
                  ? 'calc(48px * var(--ig-size-scale, 1))'
                  : 'calc(36px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.04em',
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--fg-2)', flexShrink: 0, minWidth: isStory ? 80 : 60,
              }} />
              <IgEdit value={ly.name} onChange={(v) => {
                const next = layers.slice(); next[i] = { ...next[i], name: v };
                onEdit('layers')(next);
              }} style={{
                fontSize: isStory
                  ? 'calc(30px * var(--ig-size-scale, 1))'
                  : 'calc(24px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em',
                flexShrink: 0, minWidth: isStory ? 220 : 170,
              }} />
              <IgEdit value={ly.desc} onChange={(v) => {
                const next = layers.slice(); next[i] = { ...next[i], desc: v };
                onEdit('layers')(next);
              }} style={{
                fontSize: 'calc(15px * var(--ig-size-scale, 1))',
                color: 'var(--fg-2)', flex: 1,
                fontWeight: 'var(--ig-weight-light)',
              }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right="P · 0 8" />
    </>
  );
}

// ─── D08 · Constelação de mini-citações ──────────────────────────────
// Quatro mini-quotes em posições absolutas distintas (não-grid),
// formando uma constelação. Cada qual com mini-traço + autor compacto.
// Layout primitivo novo: "Constellation / scattered mini-quotes".
function IgTestimonial08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const quotes = data?.quotes ?? [
    { text: '"Soberania na prática."',
      author: 'A n a   B .   ·   D e v',
      pos: { top: '14%',    left: '6%'   } },
    { text: '"Finalmente sem servidores intermediários."',
      author: 'C a r l o s   M .   ·   G O',
      pos: { top: '32%',    right: '5%'  } },
    { text: '"O Vault devolve o controle a quem usa."',
      author: 'R i c a r d o   A .   ·   S P',
      pos: { top: '58%',    left: '10%'  } },
    { text: '"Privacidade não é recurso — é ponto de partida."',
      author: 'F e r n a n d a   L .   ·   P E',
      pos: { top: '76%',    right: '8%'  } },
  ];
  return (
    <>
      <IgHeader index="D · 08" label="V O Z E S" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit' }}>
        {quotes.map((q, i) => (
          <div key={i} style={{
            position: 'absolute', ...q.pos,
            maxWidth: isStory ? '54%' : '46%',
          }}>
            <IgEdit as="p" multiline value={q.text} onChange={(v) => {
              const next = quotes.slice(); next[i] = { ...next[i], text: v };
              onEdit('quotes')(next);
            }} style={{
              fontSize: isStory
                ? 'calc(28px * var(--ig-size-scale, 1))'
                : 'calc(22px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)', letterSpacing: '-0.015em', lineHeight: 1.3,
              marginBottom: 10,
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 20, height: 1, background: 'currentColor', opacity: 0.55 }} />
              <IgEdit value={q.author} onChange={(v) => {
                const next = quotes.slice(); next[i] = { ...next[i], author: v };
                onEdit('quotes')(next);
              }} className="ig-meta" style={{ color: 'var(--fg-2)' }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── UC08 · Feed de atividade ao vivo ────────────────────────────────
// Lista cronológica reversa com timestamps em fonte mono e indicador
// "ao vivo" com quadrado pulsante (sem usar border-radius). Layout
// primitivo novo: "Activity feed / live log".
function IgUseCase08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const events = data?.events ?? [
    { time: '0 4 : 1 2', loc: 'Curitiba · PR',
      action: 'Sensor T-03 reportou pH 6.4 — alerta normal.' },
    { time: '0 3 : 4 7', loc: 'Goiânia · GO',
      action: 'Nova safra registrada na cooperativa AgroLivre.' },
    { time: '0 2 : 5 1', loc: 'Joinville · SC',
      action: 'Bloco assinado por chave Ed25519 do produtor.' },
    { time: '0 2 : 0 4', loc: 'Recife · PE',
      action: 'Telemetria de 12 sensores sincronizada via Hyperswarm.' },
    { time: '0 1 : 3 8', loc: 'São Paulo · SP',
      action: 'Onboarding de novo nó no gateway público.' },
  ];
  return (
    <>
      <IgHeader index="U · 08" label="E M   T E M P O   R E A L" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 30,
        }}>
          <div>
            <IgEdit value={data?.title ?? 'Atividade da rede Raiznet'}
              onChange={onEdit('title')}
              style={{
                fontSize: isStory
                  ? 'calc(52px * var(--ig-size-scale, 1))'
                  : 'calc(40px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em',
                display: 'block', lineHeight: 1.05,
              }} />
            <IgEdit value={data?.window ?? 'Últimas 4 horas · 25 abr 2026'}
              onChange={onEdit('window')}
              style={{
                fontSize: 'calc(15px * var(--ig-size-scale, 1))',
                color: 'var(--fg-2)', marginTop: 8, display: 'block',
                fontWeight: 'var(--ig-weight-light)',
              }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, background: 'currentColor' }} />
            <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>A O   V I V O</span>
          </div>
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {events.map((ev, i) => (
            <div key={i} style={{
              display: 'flex', gap: 20, alignItems: 'flex-start',
              padding: `${isStory ? 18 : 14}px 0`,
              borderTop: '1px solid currentColor',
              borderBottom: i === events.length - 1 ? '1px solid currentColor' : 'none',
            }}>
              <IgEdit value={ev.time} onChange={(v) => {
                const next = events.slice(); next[i] = { ...next[i], time: v };
                onEdit('events')(next);
              }} style={{
                fontSize: 'calc(15px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '0.06em',
                fontFamily: '"Courier New", Courier, monospace',
                fontVariantNumeric: 'tabular-nums',
                flexShrink: 0, minWidth: isStory ? 130 : 100,
                paddingTop: 2,
              }} />
              <div style={{ flex: 1 }}>
                <IgEdit value={ev.action} onChange={(v) => {
                  const next = events.slice(); next[i] = { ...next[i], action: v };
                  onEdit('events')(next);
                }} style={{
                  fontSize: isStory
                    ? 'calc(20px * var(--ig-size-scale, 1))'
                    : 'calc(16px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)', letterSpacing: '-0.005em', lineHeight: 1.4,
                  display: 'block', marginBottom: 6,
                }} />
                <IgEdit value={ev.loc} onChange={(v) => {
                  const next = events.slice(); next[i] = { ...next[i], loc: v };
                  onEdit('events')(next);
                }} className="ig-meta" style={{ color: 'var(--fg-2)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right="U · 0 8" />
    </>
  );
}

// ─── T08 · Árvore de diretórios · estilo `tree` ──────────────────────
// Hierarquia com box-drawing chars (├ └ │) em fonte mono, anotações
// laterais em sans-serif itálico. Layout primitivo novo: "File tree /
// directory listing".
function IgTutorial08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const tree = data?.tree ?? [
    { prefix: '',         name: '~/.vault/',     annot: 'raiz do Vault' },
    { prefix: '├──',      name: 'id.key',        annot: 'chave privada · 0600' },
    { prefix: '├──',      name: 'id.pub',        annot: 'chave pública · 0644' },
    { prefix: '├──',      name: 'config.toml',   annot: 'preferências locais' },
    { prefix: '└──',      name: 'backup/',       annot: 'cópia offline' },
    { prefix: '    ├──',  name: 'seed.bip39',    annot: 'frase-semente · ler offline' },
    { prefix: '    └──',  name: 'shield.fw',     annot: 'firmware do Shield' },
  ];
  return (
    <>
      <IgHeader index="T · 08" label="E S T R U T U R A" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data?.title ?? 'Anatomia da pasta do Vault.'}
          onChange={onEdit('title')}
          style={{
            fontSize: isStory
              ? 'calc(44px * var(--ig-size-scale, 1))'
              : 'calc(36px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.12,
            marginBottom: 32,
          }} />
        <div style={{
          flex: 1,
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: isStory
            ? 'calc(22px * var(--ig-size-scale, 1))'
            : 'calc(17px * var(--ig-size-scale, 1))',
          lineHeight: 1.7,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {tree.map((node, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'baseline', gap: 18,
            }}>
              <span style={{
                whiteSpace: 'pre',
                color: 'var(--fg-2)',
                flexShrink: 0,
              }}>
                {node.prefix}
              </span>
              <IgEdit value={node.name} onChange={(v) => {
                const next = tree.slice(); next[i] = { ...next[i], name: v };
                onEdit('tree')(next);
              }} style={{
                fontWeight: 'var(--ig-weight)',
                flexShrink: 0,
              }} />
              <IgEdit value={node.annot} onChange={(v) => {
                const next = tree.slice(); next[i] = { ...next[i], annot: v };
                onEdit('tree')(next);
              }} style={{
                color: 'var(--fg-2)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-sans)',
                fontSize: isStory
                  ? 'calc(16px * var(--ig-size-scale, 1))'
                  : 'calc(13px * var(--ig-size-scale, 1))',
                flex: 1, textAlign: 'right',
              }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right="T · 0 8" />
    </>
  );
}

// ─── Q08 · Citação em selo circular · SVG textPath ───────────────────
// Citação curta no centro com texto curvo seguindo o perímetro de um
// círculo via <textPath>. Dois círculos concêntricos demarcam o selo.
// Layout primitivo novo: "Circular text / SVG textPath stamp".
function IgQuote08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const r = isStory ? 280 : 220;
  // Caminho do texto curvo: círculo um pouco interno ao anel externo
  const textR = r - 40;
  const cx = r, cy = r;
  const arcD =
    `M ${cx},${cy} m -${textR},0 ` +
    `a ${textR},${textR} 0 1,1 ${textR * 2},0 ` +
    `a ${textR},${textR} 0 1,1 -${textR * 2},0`;
  return (
    <>
      <IgHeader index="Q · 08" label="S E L O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
      }}>
        <div style={{ position: 'relative', width: r * 2, height: r * 2 }}>
          <svg width={r * 2} height={r * 2} viewBox={`0 0 ${r * 2} ${r * 2}`}
            style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <path id="q08-arc" d={arcD} />
            </defs>
            <circle cx={cx} cy={cy} r={r - 6} fill="none"
              stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle cx={cx} cy={cy} r={r - 70} fill="none"
              stroke="currentColor" strokeWidth="1" opacity="0.4"
              vectorEffect="non-scaling-stroke" />
            <text style={{
              fontSize: isStory ? 22 : 17,
              letterSpacing: '0.5em',
              fontWeight: 600,
              fill: 'currentColor',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)',
            }}>
              <textPath href="#q08-arc" startOffset="0%">
                {data?.curved
                  ?? '· A R A T E K I · 2 0 2 6 · S E L O · M A N I F E S T O '
                   + '· A R A T E K I · 2 0 2 6 ·'}
              </textPath>
            </text>
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center', maxWidth: r * 1.4,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          }}>
            <IgMono size={isStory ? 36 : 28} />
            <IgEdit as="p" multiline
              value={data?.quote ?? 'Privacidade é\nautonomia,\nnão segredo.'}
              onChange={onEdit('quote')}
              style={{
                fontSize: isStory
                  ? 'calc(40px * var(--ig-size-scale, 1))'
                  : 'calc(30px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.1,
              }} />
            <div style={{ width: 28, height: 1, background: 'currentColor', opacity: 0.5 }} />
            <IgEdit value={data?.author ?? 'P H I L   Z I M M E R M A N N'}
              onChange={onEdit('author')}
              className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          </div>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right="Q · 0 8" />
    </>
  );
}
