import React from 'react'
import { IgMono, IgEdit, IgLogo, IgRule, IgHeader, IgFooter, IgCanvas, IgArtboard, IG_DIMS } from './ig-common.jsx'

// ig-educational.jsx — 6 variações "Dica técnica / educativo"

// ── E01 · Pergunta grande + resposta numerada ────────────────────────
function IgEducational01({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="E · 01" label="C O M O   F U N C I O N A" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 200, display: 'flex', flexDirection: 'column' }}>
        <IgEdit as="h1" multiline value={data.question} onChange={onEdit('question')}
          style={{ fontSize: format === 'story' ? 'calc(100px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(86px * var(--ig-size-scale, 1))' : 'calc(72px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.05 }} />
        <IgRule style={{ margin: '56px 0 40px' }} strong />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {(data.steps || []).map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              <span className="ig-meta" style={{ width: 60, paddingTop: 8 }}>0{i + 1}</span>
              <IgEdit multiline value={s} onChange={(v) => { const n = [...data.steps]; n[i] = v; onEdit('steps')(n); }}
                style={{ fontSize: format === 'story' ? 'calc(30px * var(--ig-small-scale, 1))' : 'calc(24px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)', lineHeight: 1.45, flex: 1 }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I  ·  T É C N I C O" right="0 1 / 0 3" mono />
    </>
  );
}

// ── E02 · Termo + definição, estilo glossário ────────────────────────
function IgEducational02({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="E · 02" label="G L O S S Á R I O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit className="ig-meta" style={{ marginBottom: 24, color: 'var(--fg-2)' }}
          value={data.category} onChange={onEdit('category')} />
        <IgEdit as="h1" value={data.term} onChange={onEdit('term')}
          style={{ fontSize: format === 'story' ? 'calc(200px * var(--ig-size-scale, 1))' : 'calc(150px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em', lineHeight: 0.95 }} />
        <IgEdit style={{ marginTop: 24, fontSize: format === 'story' ? 'calc(32px * var(--ig-small-scale, 1))' : 'calc(24px * var(--ig-small-scale, 1))', fontStyle: 'italic', fontWeight: 'var(--ig-weight-light)', color: 'var(--fg-2)' }}
          value={data.pronunciation} onChange={onEdit('pronunciation')} />
        <IgRule style={{ margin: '40px 0' }} />
        <IgEdit as="p" multiline value={data.definition} onChange={onEdit('definition')}
          style={{ fontSize: format === 'story' ? 'calc(30px * var(--ig-small-scale, 1))' : 'calc(24px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)', lineHeight: 1.55, maxWidth: '88%' }} />
      </div>
      <IgFooter left="T É C N I C O" right={data.ref || 'E N T R Y · 0 0 1'} />
    </>
  );
}

// ── E03 · Antes × depois, dois blocos ────────────────────────────────
function IgEducational03({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="E · 03" label="C O M P A R A Ç Ã O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 260 : 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
          style={{ fontSize: format === 'story' ? 'calc(80px * var(--ig-size-scale, 1))' : 'calc(60px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 56 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderTop: '1px solid currentColor', borderBottom: '1px solid currentColor' }}>
          <div style={{ padding: '40px 40px 40px 0', borderRight: '1px solid var(--line-1)' }}>
            <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 20 }}
              value={data.leftLabel} onChange={onEdit('leftLabel')} />
            <IgEdit multiline value={data.leftTitle} onChange={onEdit('leftTitle')}
              style={{ fontSize: format === 'story' ? 'calc(52px * var(--ig-size-scale, 1))' : 'calc(40px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24 }} />
            <IgEdit as="p" multiline value={data.leftText} onChange={onEdit('leftText')}
              style={{ fontSize: format === 'story' ? 'calc(24px * var(--ig-small-scale, 1))' : 'calc(18px * var(--ig-small-scale, 1))', color: 'var(--fg-2)', lineHeight: 1.55 }} />
          </div>
          <div style={{ padding: '40px 0 40px 40px' }}>
            <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 20 }}
              value={data.rightLabel} onChange={onEdit('rightLabel')} />
            <IgEdit multiline value={data.rightTitle} onChange={onEdit('rightTitle')}
              style={{ fontSize: format === 'story' ? 'calc(52px * var(--ig-size-scale, 1))' : 'calc(40px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24 }} />
            <IgEdit as="p" multiline value={data.rightText} onChange={onEdit('rightText')}
              style={{ fontSize: format === 'story' ? 'calc(24px * var(--ig-small-scale, 1))' : 'calc(18px * var(--ig-small-scale, 1))', color: 'var(--fg-2)', lineHeight: 1.55 }} />
          </div>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right="0 3 / 0 6" />
    </>
  );
}

// ── E04 · Dica única, instrução direta ───────────────────────────────
function IgEducational04({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="E · 04" label="D I C A" showMono />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
        <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 24 }}
          value={data.number} onChange={onEdit('number')} />
        <IgEdit as="h1" multiline value={data.tip} onChange={onEdit('tip')}
          style={{ fontSize: format === 'story' ? 'calc(110px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(88px * var(--ig-size-scale, 1))' : 'calc(76px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.05, maxWidth: '95%' }} />
        <div style={{ width: 80, height: 1, background: 'currentColor', margin: '48px 0 32px' }} />
        <IgEdit as="p" multiline value={data.detail} onChange={onEdit('detail')}
          style={{ fontSize: format === 'story' ? 'calc(28px * var(--ig-small-scale, 1))' : 'calc(22px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', lineHeight: 1.55, color: 'var(--fg-2)', maxWidth: '82%' }} />
      </div>
      <IgFooter left={data.category} right={data.ref} />
    </>
  );
}

// ── E05 · Diagrama-texto ( →, |, conectores ) ────────────────────────
function IgEducational05({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="E · 05" label="F L U X O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
          style={{ fontSize: format === 'story' ? 'calc(68px * var(--ig-size-scale, 1))' : 'calc(52px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 56 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {(data.nodes || []).map((n, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                <span className="ig-meta" style={{ width: 48 }}>{String(i + 1).padStart(2, '0')}</span>
                <div style={{ flex: 1, padding: '28px 32px', border: '1px solid currentColor' }}>
                  <IgEdit value={n} onChange={(v) => { const arr = [...data.nodes]; arr[i] = v; onEdit('nodes')(arr); }}
                    style={{ fontSize: format === 'story' ? 'calc(32px * var(--ig-small-scale, 1))' : 'calc(24px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)' }} />
                </div>
              </div>
              {i < data.nodes.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                  <span style={{ width: 48 }} />
                  <div style={{ width: 1, height: 36, background: 'currentColor', marginLeft: 32 }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right="F L U X O" />
    </>
  );
}

// ── E06 · Estatística central + contexto ─────────────────────────────
function IgEducational06({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="E · 06" label="D A D O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 24 }}
          value={data.kicker} onChange={onEdit('kicker')} />
        <IgEdit as="h1" value={data.stat} onChange={onEdit('stat')}
          style={{ fontSize: format === 'story' ? 'calc(520px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(400px * var(--ig-size-scale, 1))' : 'calc(360px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.06em', lineHeight: 0.85, fontVariantNumeric: 'tabular-nums' }} />
        <div style={{ width: 120, height: 1, background: 'currentColor', margin: '40px 0' }} />
        <IgEdit as="p" multiline value={data.context} onChange={onEdit('context')}
          style={{ fontSize: format === 'story' ? 'calc(30px * var(--ig-small-scale, 1))' : 'calc(24px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)', lineHeight: 1.5, maxWidth: '75%' }} />
        <IgEdit className="ig-meta" style={{ marginTop: 28, color: 'var(--fg-2)' }}
          value={data.source} onChange={onEdit('source')} />
      </div>
      <IgFooter left="A R A T E K I" right={data.year || '2 0 2 6'} />
    </>
  );
}

// ── E07 · Mapeamento mito ↔ fato ─────────────────────────────────────
// Duas colunas conectadas por linhas tracejadas horizontais com seta no
// meio. Layout primitivo novo: "Mapping / equivalence pairs". Único
// template do projeto que usa conectores horizontais ponto-a-ponto entre
// duas colunas semânticas.
function IgEducational07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const pairs = [
    { mKey: 'myth1', fKey: 'fact1' },
    { mKey: 'myth2', fKey: 'fact2' },
    { mKey: 'myth3', fKey: 'fact3' },
  ];
  return (
    <>
      <IgHeader index="E · 07" label="M I T O   /   F A T O" />
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
              ? 'calc(50px * var(--ig-size-scale, 1))'
              : 'calc(40px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.025em',
            lineHeight: 1.12,
            marginBottom: 24,
            maxWidth: '90%',
          }}
        />
        {/* Cabeçalhos */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <span className="ig-meta" style={{ flex: 1, color: 'var(--fg-2)' }}>
            O   Q U E   D I Z E M
          </span>
          <span style={{ width: isStory ? 72 : 52, flexShrink: 0 }} />
          <span className="ig-meta" style={{ flex: 1, color: 'var(--fg-2)' }}>
            O   Q U E   É
          </span>
        </div>
        {/* Pares conectados */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {pairs.map((p, i) => (
            <div
              key={p.mKey}
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                borderTop: '1px solid currentColor',
                borderBottom: i === pairs.length - 1 ? '1px solid currentColor' : undefined,
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: `${isStory ? 22 : 16}px 0`,
                }}
              >
                <IgEdit
                  as="p"
                  multiline
                  value={data[p.mKey]}
                  onChange={onEdit(p.mKey)}
                  style={{
                    fontSize: isStory
                      ? 'calc(24px * var(--ig-size-scale, 1))'
                      : 'calc(18px * var(--ig-size-scale, 1))',
                    color: 'var(--fg-2)',
                    fontStyle: 'italic',
                    letterSpacing: '-0.005em',
                    lineHeight: 1.35,
                    fontWeight: 'var(--ig-weight-light)',
                  }}
                />
              </div>
              {/* Conector */}
              <div
                style={{
                  width: isStory ? 72 : 52,
                  flexShrink: 0,
                  position: 'relative',
                  height: 1,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 1,
                    backgroundImage:
                      'repeating-linear-gradient(to right, currentColor 0, currentColor 4px, transparent 4px, transparent 9px)',
                    opacity: 0.5,
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'var(--bg-1)',
                    padding: '0 8px',
                    fontSize: 'calc(15px * var(--ig-size-scale, 1))',
                    fontWeight: 'var(--ig-weight-light)',
                    lineHeight: 1,
                  }}
                >
                  →
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: `${isStory ? 22 : 16}px 0 ${isStory ? 22 : 16}px ${isStory ? 30 : 20}px`,
                }}
              >
                <IgEdit
                  as="p"
                  multiline
                  value={data[p.fKey]}
                  onChange={onEdit(p.fKey)}
                  style={{
                    fontSize: isStory
                      ? 'calc(24px * var(--ig-size-scale, 1))'
                      : 'calc(18px * var(--ig-size-scale, 1))',
                    fontWeight: 'var(--ig-weight)',
                    letterSpacing: '-0.005em',
                    lineHeight: 1.35,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.tag} />
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
        <IgEdit as="p" multiline value={data.title || 'O que torna o Vault, Vault.'}
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
            <IgEdit as="p" multiline value={data.onlyA || 'Criptografia\nforte'}
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
            <IgEdit value={data.both || 'Vault'} onChange={onEdit('both')}
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
            <IgEdit as="p" multiline value={data.onlyB || 'Interface\nacessível'}
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

export { IgEducational01, IgEducational02, IgEducational03, IgEducational04, IgEducational05, IgEducational06, IgEducational07, IgEducational08 };
