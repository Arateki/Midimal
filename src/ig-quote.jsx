import React from 'react'
import { IgMono, IgEdit, IgLogo, IgRule, IgHeader, IgFooter, IgCanvas, IgArtboard, IG_DIMS } from './ig-common.jsx'

// ig-quote.jsx — 6 variações de template "Citação externa"
// Curadoria de vozes que reforçam os valores da Arateki.
// Diferente do Manifesto (voz da marca), aqui a voz é de terceiros.

// ─────────── Q01 · Aspas centrais + mini-bio ─────────────────────────
// Aspas tipográficas como decoração dominante. Autor com role abaixo da régua.
function IgQuote01({ data, onEdit, format = 'square' }) {
  const qSize = format === 'story'
    ? 'calc(68px * var(--ig-size-scale, 1))'
    : format === 'portrait'
    ? 'calc(58px * var(--ig-size-scale, 1))'
    : 'calc(50px * var(--ig-size-scale, 1))';
  return (
    <>
      <IgHeader index="Q · 01" label="C I T A Ç Ã O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{
          fontSize: 'calc(200px * var(--ig-size-scale, 1))',
          lineHeight: 0.6, fontWeight: 'var(--ig-weight-light)',
          letterSpacing: '-0.05em', color: 'var(--fg-2)',
          marginBottom: 16, userSelect: 'none',
        }}>"</div>
        <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
          fontSize: qSize, fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.02em', lineHeight: 1.2,
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 52 }}>
          <div style={{ width: 44, height: 1, background: 'currentColor', flexShrink: 0 }} />
          <div>
            <IgEdit value={data.author} onChange={onEdit('author')}
              style={{ display: 'block', fontWeight: 'var(--ig-weight-small)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 'calc(14px * var(--ig-small-scale, 1))', marginBottom: 8 }} />
            <IgEdit value={data.role} onChange={onEdit('role')}
              style={{ display: 'block', fontSize: 'calc(13px * var(--ig-small-scale, 1))', color: 'var(--fg-2)', letterSpacing: '0.06em' }} />
          </div>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.year} />
    </>
  );
}

// ─────────── Q02 · Ano histórico como hero ────────────────────────────
// A data ocupa o centro como elemento tipográfico. Frase menor abaixo.
function IgQuote02({ data, onEdit, format = 'square' }) {
  const dateSize = format === 'story'
    ? 'calc(320px * var(--ig-size-scale, 1))'
    : format === 'portrait'
    ? 'calc(280px * var(--ig-size-scale, 1))'
    : 'calc(240px * var(--ig-size-scale, 1))';
  return (
    <>
      <IgHeader index="Q · 02" label="C O N T E X T O   H I S T Ó R I C O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32,
      }}>
        <IgEdit value={data.date} onChange={onEdit('date')} style={{
          fontSize: dateSize, fontWeight: 'var(--ig-weight-light)',
          letterSpacing: '-0.05em', lineHeight: 0.9,
          color: 'var(--fg-2)',
        }} />
        <IgRule strong />
        <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
          fontSize: format === 'story' ? 'calc(48px * var(--ig-size-scale, 1))' : 'calc(36px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.015em', lineHeight: 1.25,
          maxWidth: '80%',
        }} />
        <IgEdit value={data.author} onChange={onEdit('author')}
          className="ig-meta" style={{ color: 'var(--fg-2)' }} />
      </div>
      <IgFooter
        left={<IgEdit value={data.context} onChange={onEdit('context')} style={{ fontSize: 'calc(11px * var(--ig-small-scale, 1))', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-2)' }} />}
        right="A R A T E K I"
      />
    </>
  );
}

// ─────────── Q03 · Punch card · frase curtíssima, tipo enorme ─────────
// Uma linha. Máximo impacto. Zero ruído.
function IgQuote03({ data, onEdit, format = 'square' }) {
  const qSize = format === 'story'
    ? 'calc(120px * var(--ig-size-scale, 1))'
    : format === 'portrait'
    ? 'calc(108px * var(--ig-size-scale, 1))'
    : 'calc(96px * var(--ig-size-scale, 1))';
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div className="ig-meta" style={{ color: 'var(--fg-2)' }}>
          Q · 03  —  C I T A Ç Ã O
        </div>
        <div>
          <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
            fontSize: qSize, fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.03em', lineHeight: 1.0,
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 40 }}>
            <div style={{ width: 32, height: 1, background: 'currentColor' }} />
            <IgEdit value={data.author} onChange={onEdit('author')}
              style={{ fontWeight: 'var(--ig-weight-small)', letterSpacing: '0.24em', textTransform: 'uppercase', fontSize: 'calc(14px * var(--ig-small-scale, 1))' }} />
            <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>·</span>
            <IgEdit value={data.year} onChange={onEdit('year')} className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          </div>
        </div>
        <IgLogo size="sm" />
      </div>
    </>
  );
}

// ─────────── Q04 · Split · autor no topo, citação no corpo ───────────
// Bloco superior com eyebrow + autor. Bloco inferior com a citação longa.
function IgQuote04({ data, onEdit, format = 'square' }) {
  const splitH = format === 'story' ? 480 : format === 'portrait' ? 400 : 300;
  const pad = format === 'story' ? '100px' : '80px';
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-1)' }}>
      {/* Topo — contexto/eyebrow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: splitH,
        borderBottom: '1px solid currentColor',
        paddingTop: pad, paddingRight: pad, paddingBottom: 40, paddingLeft: pad,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <IgEdit value={data.eyebrow} onChange={onEdit('eyebrow')}
            className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          <IgLogo size="sm" />
        </div>
        <div>
          <IgEdit value={data.author} onChange={onEdit('author')} style={{
            display: 'block',
            fontSize: format === 'story' ? 'calc(72px * var(--ig-size-scale, 1))' : 'calc(60px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.03em', lineHeight: 0.95,
          }} />
          <IgEdit value={data.source} onChange={onEdit('source')}
            className="ig-meta" style={{ color: 'var(--fg-2)', marginTop: 16, display: 'block' }} />
        </div>
      </div>
      {/* Corpo — citação */}
      <div style={{
        position: 'absolute', top: splitH, left: 0, right: 0, bottom: 0,
        paddingTop: 40, paddingRight: pad, paddingBottom: pad, paddingLeft: pad,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{
          fontSize: 'calc(80px * var(--ig-size-scale, 1))',
          lineHeight: 0.7, fontWeight: 'var(--ig-weight-light)',
          color: 'var(--fg-2)', marginBottom: 8, userSelect: 'none',
        }}>"</div>
        <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
          fontSize: format === 'story' ? 'calc(44px * var(--ig-size-scale, 1))' : 'calc(34px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.015em', lineHeight: 1.3,
        }} />
      </div>
    </div>
  );
}

// ─────────── Q05 · Duas vozes em contraste ───────────────────────────
// Régua horizontal divide duas citações. Tensão intencional entre perspectivas.
function IgQuote05({ data, onEdit, format = 'square' }) {
  const qSize = format === 'story'
    ? 'calc(48px * var(--ig-size-scale, 1))'
    : 'calc(38px * var(--ig-size-scale, 1))';
  const Voice = ({ quote, onQ, author, onA, role, onR, index }) => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
      <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>{index}</span>
      <IgEdit as="p" multiline value={quote} onChange={onQ} style={{
        fontSize: qSize, fontWeight: 'var(--ig-weight)',
        letterSpacing: '-0.015em', lineHeight: 1.2,
      }} />
      <div>
        <IgEdit value={author} onChange={onA} style={{
          display: 'block', fontWeight: 'var(--ig-weight-small)',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          fontSize: 'calc(13px * var(--ig-small-scale, 1))', marginBottom: 6,
        }} />
        <IgEdit value={role} onChange={onR}
          style={{ display: 'block', fontSize: 'calc(12px * var(--ig-small-scale, 1))', color: 'var(--fg-2)', letterSpacing: '0.06em' }} />
      </div>
    </div>
  );
  return (
    <>
      <IgHeader index="Q · 05" label="C O N T R A S T E" showLogo />
      <div style={{
        position: 'absolute', inset: 0,
        paddingTop: format === 'story' ? 260 : 200,
        paddingRight: 'inherit',
        paddingBottom: format === 'story' ? 160 : 120,
        paddingLeft: 'inherit',
        display: 'flex', flexDirection: 'column',
      }}>
        <Voice
          index="0 1"
          quote={data.quoteA} onQ={onEdit('quoteA')}
          author={data.authorA} onA={onEdit('authorA')}
          role={data.roleA} onR={onEdit('roleA')}
        />
        <IgRule strong={false} />
        <Voice
          index="0 2"
          quote={data.quoteB} onQ={onEdit('quoteB')}
          author={data.authorB} onA={onEdit('authorB')}
          role={data.roleB} onR={onEdit('roleB')}
        />
      </div>
    </>
  );
}

// ─────────── Q06 · Editorial longo · coluna de texto ─────────────────
// Citação longa em coluna estreita, estilo revista técnica. Fonte pequena.
function IgQuote06({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Topo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <IgEdit value={data.eyebrow} onChange={onEdit('eyebrow')}
              className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 12 }} />
            <IgMono size={28} />
          </div>
          <IgLogo size="sm" />
        </div>

        {/* Citação */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: `${format === 'story' ? 60 : 32}px 0` }}>
          <div style={{
            fontSize: 'calc(120px * var(--ig-size-scale, 1))',
            lineHeight: 0.65, fontWeight: 'var(--ig-weight-light)',
            color: 'var(--fg-2)', marginBottom: 8, userSelect: 'none',
          }}>"</div>
          <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
            fontSize: format === 'story'
              ? 'calc(40px * var(--ig-size-scale, 1))'
              : 'calc(32px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.01em', lineHeight: 1.4,
          }} />
        </div>

        {/* Rodapé com autor e fonte */}
        <div>
          <IgRule strong={false} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20 }}>
            <div>
              <IgEdit value={data.author} onChange={onEdit('author')} style={{
                display: 'block', fontWeight: 'var(--ig-weight-small)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                fontSize: 'calc(14px * var(--ig-small-scale, 1))', marginBottom: 8,
              }} />
              <IgEdit value={data.role} onChange={onEdit('role')}
                style={{ display: 'block', fontSize: 'calc(12px * var(--ig-small-scale, 1))', color: 'var(--fg-2)', letterSpacing: '0.06em' }} />
            </div>
            <IgEdit value={data.detail} onChange={onEdit('detail')}
              className="ig-meta" style={{ color: 'var(--fg-2)', textAlign: 'right' }} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── Q07 · Anotações marginais ───────────────────────────────
// Coluna lateral estreita com duas notas escolásticas em itálico
// (numeradas com superscript) separada por régua vertical da citação
// central. Layout primitivo novo: "Marginal annotations / scholarly note"
// — referência a edições anotadas de manuscritos clássicos.
function IgQuote07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const margW = isStory ? 220 : 170;
  return (
    <>
      <IgHeader index="Q · 07" label="A N O T A Ç Ã O" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          paddingTop: isStory ? 280 : 220,
          paddingRight: 'inherit',
          paddingBottom: isStory ? 140 : 100,
          paddingLeft: 'inherit',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IgEdit
          value={data.eyebrow}
          onChange={onEdit('eyebrow')}
          className="ig-meta"
          style={{ color: 'var(--fg-2)', marginBottom: 28 }}
        />
        <div style={{ display: 'flex', flex: 1, gap: isStory ? 36 : 26 }}>
          {/* Margem lateral com notas */}
          <div
            style={{
              width: margW,
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '18%',
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 'calc(15px * var(--ig-small-scale, 1))',
                  color: 'var(--fg-2)',
                  fontWeight: 'var(--ig-weight)',
                  flexShrink: 0,
                  lineHeight: 1.4,
                }}
              >
                ¹
              </span>
              <IgEdit
                as="p"
                multiline
                value={data.note1}
                onChange={onEdit('note1')}
                style={{
                  fontSize: 'calc(13px * var(--ig-small-scale, 1))',
                  color: 'var(--fg-2)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.55,
                  fontStyle: 'italic',
                  textAlign: 'right',
                  flex: 1,
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: '60%',
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 'calc(15px * var(--ig-small-scale, 1))',
                  color: 'var(--fg-2)',
                  fontWeight: 'var(--ig-weight)',
                  flexShrink: 0,
                  lineHeight: 1.4,
                }}
              >
                ²
              </span>
              <IgEdit
                as="p"
                multiline
                value={data.note2}
                onChange={onEdit('note2')}
                style={{
                  fontSize: 'calc(13px * var(--ig-small-scale, 1))',
                  color: 'var(--fg-2)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.55,
                  fontStyle: 'italic',
                  textAlign: 'right',
                  flex: 1,
                }}
              />
            </div>
          </div>
          {/* Régua vertical separadora */}
          <div
            style={{
              width: 1,
              background: 'currentColor',
              flexShrink: 0,
              opacity: 0.3,
            }}
          />
          {/* Citação central */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <IgEdit
              as="p"
              multiline
              value={data.quote}
              onChange={onEdit('quote')}
              style={{
                fontSize: isStory
                  ? 'calc(46px * var(--ig-size-scale, 1))'
                  : 'calc(36px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            />
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: 'currentColor',
                  flexShrink: 0,
                }}
              />
              <div>
                <IgEdit
                  value={data.author}
                  onChange={onEdit('author')}
                  style={{
                    fontSize: 'calc(14px * var(--ig-small-scale, 1))',
                    fontWeight: 'var(--ig-weight-small)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 6,
                  }}
                />
                <IgEdit
                  value={data.source}
                  onChange={onEdit('source')}
                  style={{
                    fontSize: 'calc(12px * var(--ig-small-scale, 1))',
                    color: 'var(--fg-2)',
                    letterSpacing: '0.06em',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.tag} />
    </>
  );
}

// ─── Q08 · Selo circular curvo · citação central ─────────────────────
// Texto curvo (SVG path) formando um selo circular ao redor da citação
// central. Layout primitivo novo: "Circular seal / curved type". Primeiro
// uso de tipografia curva no projeto.
function IgQuote08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const sealSize = isStory ? 380 : 320;
  return (
    <>
      <IgHeader index="Q · 08" label="S E L O   M A N I F E S T O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'relative', width: sealSize, height: sealSize }}>
          {/* Texto Curvo (Selo) */}
          <svg viewBox="0 0 100 100" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            animation: 'ig-spin 40s linear infinite',
          }}>
            <path id="circlePath" d="M 50, 50 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" fill="none" />
            <text fill="currentColor" style={{
              fontSize: 6.8, letterSpacing: '0.45em',
              fontWeight: 'var(--ig-weight-small)', textTransform: 'uppercase',
            }}>
              <textPath href="#circlePath">
                {data.curved || '· A R A T E K I · 2 0 2 6 · S E L O · M A N I F E S T O · A R A T E K I · 2 0 2 6 ·'}
              </textPath>
            </text>
          </svg>
          <style>{`
            @keyframes ig-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
          {/* Citação Central */}
          <div style={{
            position: 'absolute', inset: '15%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center',
          }}>
            <IgEdit as="p" multiline value={data.quote || 'Privacidade é\nautonomia,\nnão segredo.'}
              onChange={onEdit('quote')}
              style={{
                fontSize: isStory
                  ? 'calc(44px * var(--ig-size-scale, 1))'
                  : 'calc(34px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.15,
                marginBottom: 20,
              }} />
            <div style={{ width: 24, height: 1, background: 'currentColor', marginBottom: 12, opacity: 0.4 }} />
            <IgEdit value={data.author || 'P H I L   Z I M M E R M A N N'}
              onChange={onEdit('author')}
              className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          </div>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right="Q · 0 8" />
    </>
  );
}

export { IgQuote01, IgQuote02, IgQuote03, IgQuote04, IgQuote05, IgQuote06, IgQuote07, IgQuote08 };
