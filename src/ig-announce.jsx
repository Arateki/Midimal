import React from 'react'
import { IgMono, IgEdit, IgLogo, IgRule, IgHeader, IgFooter, IgCanvas, IgArtboard, IG_DIMS } from './ig-common.jsx'

// ig-announce.jsx — 6 variações "Anúncio de produto / lançamento"

// ── A01 · Anúncio técnico com specs ──────────────────────────────────
function IgAnnounce01({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="A · 01" label="L A N Ç A M E N T O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit className="ig-meta" style={{ marginBottom: 20, color: 'var(--fg-2)' }}
          value={data.kicker} onChange={onEdit('kicker')} />
        <IgEdit as="h1" value={data.name} onChange={onEdit('name')}
          style={{ fontSize: format === 'story' ? 'calc(220px * var(--ig-size-scale, 1))' : 'calc(160px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em', lineHeight: 0.95 }} />
        <div style={{ marginTop: 48, display: 'flex', gap: 64, flexWrap: 'wrap' }}>
          {(data.specs || []).map((s, i) => (
            <div key={i} style={{ minWidth: 180 }}>
              <div style={{ width: 28, height: 1, background: 'currentColor', marginBottom: 12 }} />
              <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 8 }}
                value={s.label} onChange={(v) => { const n = [...data.specs]; n[i] = { ...n[i], label: v }; onEdit('specs')(n); }} />
              <IgEdit style={{ fontSize: format === 'story' ? 'calc(32px * var(--ig-small-scale, 1))' : 'calc(26px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)' }}
                value={s.value} onChange={(v) => { const n = [...data.specs]; n[i] = { ...n[i], value: v }; onEdit('specs')(n); }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left={data.date} right="D I S P O N Í V E L" mono />
    </>
  );
}

// ── A02 · Preto, grande, categoria ───────────────────────────────────
function IgAnnounce02({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IgEdit className="ig-meta" value={data.category} onChange={onEdit('category')} />
          <IgLogo size="sm" />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <IgEdit className="ig-meta" style={{ marginBottom: 32 }}
            value={data.kicker} onChange={onEdit('kicker')} />
          <IgEdit as="h1" multiline value={data.name} onChange={onEdit('name')}
            style={{ fontSize: format === 'story' ? 'calc(260px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(200px * var(--ig-size-scale, 1))' : 'calc(180px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)', letterSpacing: '-0.04em', lineHeight: 0.88 }} />
          <div style={{ width: '100%', height: 1, background: 'currentColor', margin: '48px 0' }} />
          <IgEdit as="p" multiline value={data.tagline} onChange={onEdit('tagline')}
            style={{ fontSize: format === 'story' ? 'calc(34px * var(--ig-small-scale, 1))' : 'calc(26px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', maxWidth: '72%', lineHeight: 1.4, color: 'var(--fg-2)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="ig-footer-rail">{data.date || 'Q 2 · 2 0 2 6'}</span>
          <span className="ig-footer-rail">A · 0 2</span>
        </div>
      </div>
    </>
  );
}

// ── A03 · Produto como ficha técnica — grid rigoroso ─────────────────
function IgAnnounce03({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="A · 03" label="F I C H A   T É C N I C A" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 260 : 200, display: 'flex', flexDirection: 'column' }}>
        <IgEdit as="h1" value={data.name} onChange={onEdit('name')}
          style={{ fontSize: format === 'story' ? 'calc(150px * var(--ig-size-scale, 1))' : 'calc(110px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.03em', lineHeight: 0.95 }} />
        <IgEdit style={{ marginTop: 16, fontSize: format === 'story' ? 'calc(26px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))', color: 'var(--fg-2)', fontWeight: 'var(--ig-weight-light)' }}
          value={data.subtitle} onChange={onEdit('subtitle')} />
        <IgRule style={{ margin: '48px 0 0 0' }} strong />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 48 }}>
          {(data.rows || []).map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 0', borderBottom: '1px solid var(--line-1)' }}>
              <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)' }}
                value={r.label} onChange={(v) => { const n = [...data.rows]; n[i] = { ...n[i], label: v }; onEdit('rows')(n); }} />
              <IgEdit style={{ fontSize: format === 'story' ? 'calc(20px * var(--ig-small-scale, 1))' : 'calc(16px * var(--ig-small-scale, 1))', fontWeight: 500 }}
                value={r.value} onChange={(v) => { const n = [...data.rows]; n[i] = { ...n[i], value: v }; onEdit('rows')(n); }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.date || '2 0 2 6'} mono />
    </>
  );
}

// ── A04 · Anúncio com CTA forte ──────────────────────────────────────
function IgAnnounce04({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="A · 04" label="D I S P O N Í V E L" showMono />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit as="h1" multiline value={data.headline} onChange={onEdit('headline')}
          style={{ fontSize: format === 'story' ? 'calc(120px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(100px * var(--ig-size-scale, 1))' : 'calc(90px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.02, maxWidth: '92%' }} />
        <div style={{ marginTop: 56, display: 'inline-flex', alignItems: 'center', gap: 18,
          border: '1px solid currentColor', padding: '24px 36px', alignSelf: 'flex-start' }}>
          <IgEdit className="ig-meta" style={{ letterSpacing: '0.28em' }}
            value={data.cta} onChange={onEdit('cta')} />
          <span style={{ fontSize: 'calc(22px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)' }}>→</span>
        </div>
      </div>
      <IgFooter left={data.url} right={data.date} />
    </>
  );
}

// ── A05 · Inverso · produto como declaração ──────────────────────────
function IgAnnounce05({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="A · 05" label="A N Ú N C I O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ marginTop: format === 'story' ? 160 : 120 }}>
          <IgEdit className="ig-meta" style={{ marginBottom: 24 }}
            value={data.kicker} onChange={onEdit('kicker')} />
          <IgEdit as="h1" value={data.name} onChange={onEdit('name')}
            style={{ fontSize: format === 'story' ? 'calc(300px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(240px * var(--ig-size-scale, 1))' : 'calc(200px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.04em', lineHeight: 0.92 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 48 }}>
          <IgEdit as="p" multiline value={data.tagline} onChange={onEdit('tagline')}
            style={{ fontSize: format === 'story' ? 'calc(32px * var(--ig-small-scale, 1))' : 'calc(24px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', lineHeight: 1.45, maxWidth: 500, color: 'var(--fg-2)' }} />
          <div style={{ textAlign: 'right' }}>
            <div className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 6 }}>D I S P O N Í V E L</div>
            <IgEdit style={{ fontSize: format === 'story' ? 'calc(32px * var(--ig-small-scale, 1))' : 'calc(24px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)' }}
              value={data.date} onChange={onEdit('date')} />
          </div>
        </div>
      </div>
    </>
  );
}

// ── A06 · Categoria + número de versão dominando ─────────────────────
function IgAnnounce06({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IgLogo size="sm" />
          <span className="ig-meta"><strong>A · 06</strong>  —  V E R S Ã O</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 28 }}
            value={data.name} onChange={onEdit('name')} />
          <IgEdit as="h1" value={data.version} onChange={onEdit('version')}
            style={{ fontSize: format === 'story' ? 'calc(460px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(360px * var(--ig-size-scale, 1))' : 'calc(320px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.06em', lineHeight: 0.85, fontVariantNumeric: 'tabular-nums' }} />
          <div style={{ width: 80, height: 1, background: 'currentColor', margin: '48px 0 36px' }} />
          <IgEdit as="p" multiline value={data.notes} onChange={onEdit('notes')}
            style={{ fontSize: format === 'story' ? 'calc(26px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)', lineHeight: 1.55, maxWidth: '72%', textAlign: 'center', color: 'var(--fg-2)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="ig-footer-rail">{data.date || '2 0 2 6'}</span>
          <span className="ig-footer-rail">A R A T E K I</span>
        </div>
      </div>
    </>
  );
}

// ── A07 · Etiqueta de envio · estrutura formal de embalagem ──────────
// Bloco com bordas sólidas dividido em zonas tipográficas (DE / PARA /
// CONTEÚDO / DATA / SELO / TRACKING). Layout primitivo novo: "Postal label
// / shipping form". Único template do projeto que usa moldura externa
// fechada com subdivisões internas.
function IgAnnounce07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const cellPadH = isStory ? 32 : 22;
  const cellPadV = isStory ? 28 : 20;
  return (
    <>
      <IgHeader index="A · 07" label="A V I S O   D E   E N V I O" showMono />
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
        <div
          style={{
            border: '1.5px solid currentColor',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          {/* Linha 1: De / Para */}
          <div style={{ display: 'flex', borderBottom: '1.5px solid currentColor' }}>
            <div
              style={{
                flex: 1,
                padding: `${cellPadV}px ${cellPadH}px`,
                borderRight: '1.5px solid currentColor',
              }}
            >
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 12 }}>
                D E S T I N A T Á R I O
              </span>
              <IgEdit
                value={data.recipient}
                onChange={onEdit('recipient')}
                style={{
                  fontSize: isStory
                    ? 'calc(34px * var(--ig-size-scale, 1))'
                    : 'calc(26px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  display: 'block',
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                padding: `${cellPadV}px ${cellPadH}px`,
              }}
            >
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 12 }}>
                R E M E T E N T E
              </span>
              <IgEdit
                value={data.sender}
                onChange={onEdit('sender')}
                style={{
                  fontSize: isStory
                    ? 'calc(34px * var(--ig-size-scale, 1))'
                    : 'calc(26px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  display: 'block',
                }}
              />
            </div>
          </div>
          {/* Linha 2: Conteúdo do pacote */}
          <div
            style={{
              flex: 1,
              padding: `${cellPadV}px ${cellPadH}px`,
              borderBottom: '1.5px solid currentColor',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 16 }}>
              C O N T E Ú D O
            </span>
            <IgEdit
              value={data.product}
              onChange={onEdit('product')}
              style={{
                fontSize: isStory
                  ? 'calc(160px * var(--ig-size-scale, 1))'
                  : format === 'portrait'
                  ? 'calc(130px * var(--ig-size-scale, 1))'
                  : 'calc(110px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                letterSpacing: '-0.045em',
                lineHeight: 0.92,
                display: 'block',
                marginBottom: 14,
              }}
            />
            <IgEdit
              as="p"
              multiline
              value={data.description}
              onChange={onEdit('description')}
              style={{
                fontSize: isStory
                  ? 'calc(22px * var(--ig-size-scale, 1))'
                  : 'calc(16px * var(--ig-size-scale, 1))',
                color: 'var(--fg-2)',
                letterSpacing: '0.005em',
                lineHeight: 1.5,
                maxWidth: '85%',
              }}
            />
          </div>
          {/* Linha 3: Data + Selo + Tracking */}
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                flex: 1,
                padding: `${cellPadV}px ${cellPadH}px`,
                borderRight: '1.5px solid currentColor',
              }}
            >
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
                D A T A   D E   E N V I O
              </span>
              <IgEdit
                value={data.shipDate}
                onChange={onEdit('shipDate')}
                style={{
                  fontSize: isStory
                    ? 'calc(22px * var(--ig-size-scale, 1))'
                    : 'calc(17px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  letterSpacing: '0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              />
            </div>
            {/* Selo central com rotação */}
            <div
              style={{
                padding: `${cellPadV}px ${cellPadH}px`,
                borderRight: '1.5px solid currentColor',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: isStory ? 200 : 150,
              }}
            >
              <div
                style={{
                  border: '1.5px solid currentColor',
                  padding: `${isStory ? 14 : 10}px ${isStory ? 22 : 16}px`,
                  transform: 'rotate(-8deg)',
                  textAlign: 'center',
                  fontSize: 'calc(11px * var(--ig-small-scale, 1))',
                  fontWeight: 'var(--ig-weight-small)',
                  letterSpacing: '0.22em',
                  lineHeight: 1.5,
                }}
              >
                <IgEdit value={data.stamp} onChange={onEdit('stamp')} multiline />
              </div>
            </div>
            <div
              style={{
                flex: 1,
                padding: `${cellPadV}px ${cellPadH}px`,
                textAlign: 'right',
              }}
            >
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
                P A C K A G E
              </span>
              <IgEdit
                value={data.tracking}
                onChange={onEdit('tracking')}
                style={{
                  fontSize: isStory
                    ? 'calc(20px * var(--ig-size-scale, 1))'
                    : 'calc(15px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  fontFamily: '"Courier New", Courier, monospace',
                  letterSpacing: '0.04em',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── A08 · Diagrama de calltouts · vista explodida ───────────────────
// Produto retangular ao centro com linhas SVG saindo até quatro labels
// nos cantos (estilo blueprint / vista explodida industrial).
// Layout primitivo novo: "Exploded callout diagram".
function IgAnnounce08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const callouts = data.callouts || [
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
            <IgEdit value={data.name || 'Shield'} onChange={onEdit('name')} style={{
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
      <IgFooter left="A R A T E K I" right={data.tag || '2 0 2 6'} />
    </>
  );
}

export { IgAnnounce01, IgAnnounce02, IgAnnounce03, IgAnnounce04, IgAnnounce05, IgAnnounce06, IgAnnounce07, IgAnnounce08 };
