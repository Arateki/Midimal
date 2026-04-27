import React from 'react'
import { IgMono, IgEdit, IgLogo, IgRule, IgHeader, IgFooter, IgCanvas, IgArtboard, IG_DIMS } from './ig-common.jsx'

// ig-manifesto.jsx — 6 variações de template "Frase / Manifesto"
// Cada componente recebe { data, onEdit, format }. format é apenas uma
// dica — o layout se adapta para square/portrait/story.

// Utility para merge de dados editáveis
function useData(initial) {
  const [d, setD] = React.useState(initial);
  const edit = (k) => (v) => setD((s) => ({ ...s, [k]: v }));
  return [d, edit, setD];
}

// ─────────── M01 · Declaração central ────────────────────────────────
// Tipografia grande, silêncio dominante. Régua inferior.
function IgManifesto01({ data, onEdit, format = 'square' }) {
  const size = format === 'story' ? 'ig-display-xl' : format === 'portrait' ? 'ig-display-lg' : 'ig-display-md';
  return (
    <>
      <IgHeader index="M · 01" label="M A N I F E S T O" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'inherit',
        }}
      >
        <IgEdit
          as="h1"
          className={`ig-display ${size}`}
          multiline
          value={data.quote}
          onChange={onEdit('quote')}
        />
      </div>
      <IgFooter left="V . 1 . 0   —   2 0 2 6" right={data.author} rule />
    </>
  );
}

// ─────────── M02 · Aspas minimais, texto ao pé ────────────────────────
// Régua no topo, aspas gigantes, texto pequeno embaixo.
function IgManifesto02({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 'inherit',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IgRule strong />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
          <span className="ig-meta">
            <strong>M · 02</strong>  —  C I T A Ç Ã O
          </span>
          <IgLogo size="sm" />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div
            style={{
              fontSize: format === 'story' ? 'calc(360px * var(--ig-size-scale, 1))' : 'calc(260px * var(--ig-size-scale, 1))',
              lineHeight: 0.7,
              fontWeight: 'var(--ig-weight-light)',
              letterSpacing: '-0.05em',
              marginBottom: -40,
            }}
          >
            “
          </div>
          <IgEdit
            as="p"
            multiline
            value={data.quote}
            onChange={onEdit('quote')}
            style={{
              fontSize: format === 'story' ? 'calc(58px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(48px * var(--ig-size-scale, 1))' : 'calc(44px * var(--ig-size-scale, 1))',
              lineHeight: 1.25,
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.01em',
              maxWidth: '85%',
              marginTop: 16,
            }}
          />
          <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 1, background: 'currentColor' }} />
            <IgEdit className="ig-meta" value={data.author} onChange={onEdit('author')} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── M03 · Fundo preto, palavra única destacada ──────────────
// Modo inverso. Um termo grande no centro, legenda abaixo.
function IgManifesto03({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="M · 03" label="P R I N C Í P I O" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 'inherit',
        }}
      >
        <div className="ig-meta" style={{ marginBottom: 28 }}>
          <strong>0 1</strong>  /  0 4
        </div>
        <IgEdit
          as="h1"
          className="ig-display"
          value={data.term}
          onChange={onEdit('term')}
          style={{
            fontSize: format === 'story' ? 'calc(280px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(220px * var(--ig-size-scale, 1))' : 'calc(200px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
          }}
        />
        <IgEdit
          as="p"
          multiline
          value={data.definition}
          onChange={onEdit('definition')}
          style={{
            marginTop: 36,
            fontSize: format === 'story' ? 'calc(32px * var(--ig-small-scale, 1))' : 'calc(26px * var(--ig-small-scale, 1))',
            lineHeight: 1.45,
            maxWidth: '72%',
            color: 'var(--fg-2)',
            fontWeight: 'var(--ig-weight-light)',
          }}
        />
      </div>
      <IgFooter left="A R A T E K I  ·  M A N I F E S T O" right="2 0 2 6" mono />
    </>
  );
}

// ─────────── M04 · Lista numerada — 4 princípios ─────────────────────
// Estilo manual técnico: numeração, réguas, linhas curtas.
function IgManifesto04({ data, onEdit, format = 'square' }) {
  const items = data.items || [];
  return (
    <>
      <IgHeader index="M · 04" label="V A L O R E S   D A   M A R C A" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 'inherit',
          paddingTop: format === 'story' ? 260 : 200,
          paddingBottom: format === 'story' ? 180 : 140,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        {items.map((it, i) => (
          <div key={i}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 40, padding: '28px 0' }}>
              <span
                className="ig-meta"
                style={{ width: 60, flexShrink: 0, color: 'var(--fg-2)' }}
              >
                0{i + 1}
              </span>
              <IgEdit
                value={it.title}
                onChange={(v) => {
                  const next = items.slice();
                  next[i] = { ...next[i], title: v };
                  onEdit('items')(next);
                }}
                style={{
                  fontSize: format === 'story' ? 'calc(72px * var(--ig-size-scale, 1))' : 'calc(60px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  letterSpacing: '-0.02em',
                  flex: '0 0 auto',
                  minWidth: 280,
                }}
              />
              <IgEdit
                value={it.desc}
                onChange={(v) => {
                  const next = items.slice();
                  next[i] = { ...next[i], desc: v };
                  onEdit('items')(next);
                }}
                style={{
                  fontSize: format === 'story' ? 'calc(24px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))',
                  fontWeight: 'var(--ig-weight-light)',
                  color: 'var(--fg-2)',
                  letterSpacing: '0.02em',
                  flex: 1,
                  textAlign: 'right',
                  marginTop: 18,
                }}
              />
            </div>
            {i < items.length - 1 && <IgRule strong={false} />}
          </div>
        ))}
      </div>
      <IgFooter left="V . 1 . 0" right="A R A T E K I" />
    </>
  );
}

// ─────────── M05 · Dividido ao meio · assimétrico ────────────────────
// Metade superior usa a cor de fundo atual (com eyebrow), metade inferior branca (frase).
function IgManifesto05({ data, onEdit, format = 'square' }) {
  const halfH = format === 'story' ? 960 : format === 'portrait' ? 675 : 540;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-1)' }}>
      {/* Bloco superior com a cor de fundo atual */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: halfH,
          background: 'var(--bg-1)',
          color: '#fff',
          padding: format === 'story' ? '100px' : '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="ig-meta" style={{ color: '#B3B3B3' }}>
            <strong style={{ color: '#fff' }}>M · 05</strong>  —  F I L O S O F I A
          </span>
          <span className="ig-logo ig-logo-sm" style={{ color: '#fff' }}>
            A R A T E K I
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
          <IgMono size={80} color="#fff" />
          <IgEdit
            as="h1"
            multiline
            value={data.intro}
            onChange={onEdit('intro')}
            style={{
              fontSize: format === 'story' ? 'calc(56px * var(--ig-size-scale, 1))' : 'calc(44px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight-light)',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              color: '#fff',
              flex: 1,
            }}
          />
        </div>
      </div>
      {/* Bloco inferior branco */}
      <div
        style={{
          position: 'absolute',
          top: halfH,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          color: '#000',
          padding: format === 'story' ? '100px' : '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <IgEdit
          as="p"
          multiline
          value={data.statement}
          onChange={onEdit('statement')}
          style={{
            fontSize: format === 'story' ? 'calc(88px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(76px * var(--ig-size-scale, 1))' : 'calc(68px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: '#000',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="ig-footer-rail">V . 1 . 0   —   2 0 2 6</span>
          <span className="ig-footer-rail">0 5  /  0 6</span>
        </div>
      </div>
    </div>
  );
}

// ─────────── M06 · Expressivo · palavra única gigante ────────────────
// Monograma acima, palavra única gigante, régua, subtítulo, grid técnico sutil.
function IgManifesto06({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div className="ig-grid-bg" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 'inherit',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <IgMono size={56} />
          <div style={{ textAlign: 'right' }}>
            <div className="ig-meta" style={{ marginBottom: 6 }}>
              <strong>M · 06</strong>
            </div>
            <div className="ig-meta" style={{ color: 'var(--fg-2)' }}>
              E S S E N C I A L I S M O
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <IgEdit
            as="h1"
            value={data.word}
            onChange={onEdit('word')}
            style={{
              fontSize: format === 'story' ? 'calc(340px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(260px * var(--ig-size-scale, 1))' : 'calc(220px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight-light)',
              letterSpacing: '-0.05em',
              lineHeight: 0.9,
            }}
          />
          <div style={{ width: 120, height: 1, background: 'currentColor', margin: '48px 0' }} />
          <IgEdit
            as="p"
            multiline
            value={data.subtitle}
            onChange={onEdit('subtitle')}
            style={{
              fontSize: format === 'story' ? 'calc(28px * var(--ig-small-scale, 1))' : 'calc(22px * var(--ig-small-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--fg-2)',
              maxWidth: '70%',
              lineHeight: 1.7,
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="ig-footer-rail">A R A T E K I</span>
          <span className="ig-footer-rail">2 0 2 6</span>
        </div>
      </div>
    </>
  );
}

// ─────────── M07 · Spread editorial · drop cap + colunas ──────────────
// Letra capitular em escala extrema + corpo de texto em multi-coluna
// justificada. Layout primitivo novo: "Editorial book spread / drop cap".
function IgManifesto07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  return (
    <>
      <IgHeader index="M · 07" label="E N S A I O" />
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
          value={data.eyebrow}
          onChange={onEdit('eyebrow')}
          className="ig-meta"
          style={{ color: 'var(--fg-2)', marginBottom: 24 }}
        />
        <div style={{ display: 'flex', flex: 1, gap: isStory ? 32 : 24, alignItems: 'flex-start' }}>
          {/* Drop cap */}
          <span
            style={{
              fontSize: isStory
                ? 'calc(440px * var(--ig-size-scale, 1))'
                : format === 'portrait'
                ? 'calc(380px * var(--ig-size-scale, 1))'
                : 'calc(320px * var(--ig-size-scale, 1))',
              lineHeight: 0.78,
              fontWeight: 'var(--ig-weight-light)',
              letterSpacing: '-0.07em',
              flexShrink: 0,
              marginTop: '-0.06em',
              userSelect: 'none',
              color: 'var(--fg-2)',
            }}
          >
            {data.dropCap || 'A'}
          </span>
          {/* Corpo em colunas justificadas */}
          <div
            style={{
              flex: 1,
              columnCount: isStory ? 1 : 2,
              columnGap: isStory ? 0 : 28,
              alignSelf: 'stretch',
              display: 'block',
            }}
          >
            <IgEdit
              as="p"
              multiline
              value={data.body}
              onChange={onEdit('body')}
              style={{
                fontSize: isStory
                  ? 'calc(22px * var(--ig-size-scale, 1))'
                  : 'calc(15px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                lineHeight: 1.6,
                letterSpacing: '0.005em',
                textAlign: 'justify',
                hyphens: 'auto',
              }}
            />
          </div>
        </div>
      </div>
      <IgFooter left={data.attribution} right="A R A T E K I" />
    </>
  );
}

// ─── M08 · Frase em escada · indentação progressiva ──────────────────
// Cada linha desce um degrau à direita, formando uma diagonal tipográfica.
// Layout primitivo novo: "Staircase / staggered baseline".
function IgManifesto08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const lines = data.lines || [
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

export { IgManifesto01, IgManifesto02, IgManifesto03, IgManifesto04, IgManifesto05, IgManifesto06, IgManifesto07, IgManifesto08 };
