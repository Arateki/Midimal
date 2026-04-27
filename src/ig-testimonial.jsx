import React from 'react'
import { IgMono, IgEdit, IgLogo, IgRule, IgHeader, IgFooter, IgCanvas, IgArtboard, IG_DIMS } from './ig-common.jsx'

// ig-testimonial.jsx — 6 variações de template "Depoimento"
// Voz real de usuários e parceiros. Layouts intencionalmente distintos das demais seções.

// ─────────── D01 · Inicial tipográfica ──────────────────────────────
// Primeira letra do nome em display massivo como âncora visual. Sem ícones ou fotos.
function IgTestimonial01({ data, onEdit, format = 'square' }) {
  const initSize = format === 'story'
    ? 'calc(320px * var(--ig-size-scale, 1))'
    : 'calc(260px * var(--ig-size-scale, 1))';
  const initial = data.initial || (data.author ? data.author[0].toUpperCase() : 'A');
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Topo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>D · 01  —  D E P O I M E N T O</span>
          <IgLogo size="sm" />
        </div>

        {/* Inicial + citação */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 20 }}>
          <div style={{
            fontSize: initSize,
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.06em',
            lineHeight: 0.82,
            color: 'var(--fg-2)',
            marginBottom: format === 'story' ? 36 : 28,
            userSelect: 'none',
          }}>{initial}</div>
          <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
            fontSize: format === 'story'
              ? 'calc(38px * var(--ig-size-scale, 1))'
              : 'calc(30px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.015em', lineHeight: 1.35,
          }} />
        </div>

        {/* Assinatura */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 28, height: 1, background: 'currentColor', flexShrink: 0 }} />
          <div>
            <IgEdit value={data.author} onChange={onEdit('author')} style={{
              display: 'block', fontWeight: 'var(--ig-weight-small)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              fontSize: 'calc(13px * var(--ig-small-scale, 1))', marginBottom: 6,
            }} />
            <IgEdit value={data.role} onChange={onEdit('role')} style={{
              display: 'block', fontSize: 'calc(12px * var(--ig-small-scale, 1))',
              color: 'var(--fg-2)', letterSpacing: '0.06em',
            }} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── D02 · Pull-quote editorial ──────────────────────────────
// Linha extraída em display enorme — acima. Depoimento completo em texto pequeno — abaixo.
// Hierarquia invertida: o impacto vem primeiro, o contexto confirma.
function IgTestimonial02({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="D · 02" label="D E P O I M E N T O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        paddingBottom: format === 'story' ? 140 : 100,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Linha de destaque */}
        <IgEdit as="p" multiline value={data.highlight} onChange={onEdit('highlight')} style={{
          fontSize: format === 'story'
            ? 'calc(58px * var(--ig-size-scale, 1))'
            : 'calc(46px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.025em', lineHeight: 1.1,
        }} />

        {/* Depoimento completo em pequeno */}
        <div>
          <IgRule strong={false} />
          <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
            fontSize: format === 'story'
              ? 'calc(22px * var(--ig-size-scale, 1))'
              : 'calc(17px * var(--ig-size-scale, 1))',
            letterSpacing: '0.005em', lineHeight: 1.65,
            color: 'var(--fg-2)',
            marginTop: 20, marginBottom: 24,
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <IgEdit value={data.author} onChange={onEdit('author')} style={{
                display: 'block', fontWeight: 'var(--ig-weight-small)',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                fontSize: 'calc(13px * var(--ig-small-scale, 1))', marginBottom: 6,
              }} />
              <IgEdit value={data.role} onChange={onEdit('role')} style={{
                display: 'block', fontSize: 'calc(12px * var(--ig-small-scale, 1))',
                color: 'var(--fg-2)', letterSpacing: '0.06em',
              }} />
            </div>
            <IgLogo size="sm" />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── D03 · Colunas assimétricas ─────────────────────────────
// Coluna estreita à esquerda (autor) separada por régua vertical. Citação à direita.
// Única template do projeto com régua vertical como eixo principal.
function IgTestimonial03({ data, onEdit, format = 'square' }) {
  const leftW = format === 'story' ? '32%' : '29%';
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Topo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: format === 'story' ? 60 : 44 }}>
          <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>D · 03  —  D E P O I M E N T O</span>
          <IgLogo size="sm" />
        </div>

        {/* Colunas */}
        <div style={{ display: 'flex', flex: 1, gap: 0 }}>
          {/* Esquerda: dados do autor */}
          <div style={{
            width: leftW, flexShrink: 0,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            paddingRight: format === 'story' ? 40 : 28,
            borderRight: '1px solid currentColor',
            paddingBottom: 4,
          }}>
            <IgEdit value={data.author} onChange={onEdit('author')} style={{
              display: 'block',
              fontSize: 'calc(16px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 10,
            }} />
            <IgEdit value={data.role} onChange={onEdit('role')} style={{
              display: 'block',
              fontSize: 'calc(13px * var(--ig-small-scale, 1))',
              color: 'var(--fg-2)', letterSpacing: '0.06em', marginBottom: 8,
              lineHeight: 1.4,
            }} />
            <IgEdit value={data.company} onChange={onEdit('company')} style={{
              display: 'block',
              fontSize: 'calc(11px * var(--ig-small-scale, 1))',
              color: 'var(--fg-2)', letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }} />
          </div>

          {/* Direita: citação */}
          <div style={{
            flex: 1,
            paddingLeft: format === 'story' ? 40 : 28,
            display: 'flex', alignItems: 'center',
          }}>
            <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
              fontSize: format === 'story'
                ? 'calc(36px * var(--ig-size-scale, 1))'
                : 'calc(28px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.015em', lineHeight: 1.4,
            }} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── D04 · Carta ─────────────────────────────────────────────
// Formato epistolar: data, saudação, corpo, assinatura. Único no projeto.
function IgTestimonial04({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Cabeçalho */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <IgEdit value={data.date} onChange={onEdit('date')}
            className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          <IgLogo size="sm" />
        </div>

        {/* Corpo da carta */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: format === 'story' ? 36 : 28 }}>
          <IgEdit value={data.salutation} onChange={onEdit('salutation')} style={{
            fontSize: 'calc(16px * var(--ig-size-scale, 1))',
            color: 'var(--fg-2)', letterSpacing: '0.04em',
          }} />
          <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
            fontSize: format === 'story'
              ? 'calc(36px * var(--ig-size-scale, 1))'
              : 'calc(27px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.01em', lineHeight: 1.45,
          }} />
          <div>
            <div style={{ width: 36, height: 1, background: 'currentColor', marginBottom: 14, opacity: 0.35 }} />
            <IgEdit value={data.author} onChange={onEdit('author')} style={{
              display: 'block', fontWeight: 'var(--ig-weight-small)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              fontSize: 'calc(13px * var(--ig-small-scale, 1))', marginBottom: 6,
            }} />
            <IgEdit value={data.role} onChange={onEdit('role')} style={{
              display: 'block', fontSize: 'calc(12px * var(--ig-small-scale, 1))',
              color: 'var(--fg-2)', letterSpacing: '0.06em',
            }} />
          </div>
        </div>

        {/* Rodapé */}
        <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>D · 04  —  D E P O I M E N T O</span>
      </div>
    </>
  );
}

// ─────────── D05 · Sobre o produto ───────────────────────────────────
// Produto / funcionalidade como cabeçalho com borda. Depoimento vinculado ao recurso.
function IgTestimonial05({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Produto em destaque */}
        <div style={{ borderBottom: '1px solid currentColor', paddingBottom: format === 'story' ? 36 : 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>D · 05  —  S O B R E   O   P R O D U T O</span>
            <IgLogo size="sm" />
          </div>
          <IgEdit value={data.product} onChange={onEdit('product')} style={{
            fontSize: format === 'story'
              ? 'calc(88px * var(--ig-size-scale, 1))'
              : 'calc(70px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.04em', lineHeight: 0.9,
          }} />
          <IgEdit value={data.feature} onChange={onEdit('feature')} style={{
            display: 'block', marginTop: 12,
            fontSize: 'calc(12px * var(--ig-small-scale, 1))',
            color: 'var(--fg-2)', letterSpacing: '0.16em', textTransform: 'uppercase',
          }} />
        </div>

        {/* Citação */}
        <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
          fontSize: format === 'story'
            ? 'calc(36px * var(--ig-size-scale, 1))'
            : 'calc(28px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.015em', lineHeight: 1.4,
        }} />

        {/* Autor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 28, height: 1, background: 'currentColor', flexShrink: 0 }} />
          <div>
            <IgEdit value={data.author} onChange={onEdit('author')} style={{
              display: 'block', fontWeight: 'var(--ig-weight-small)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              fontSize: 'calc(13px * var(--ig-small-scale, 1))', marginBottom: 6,
            }} />
            <IgEdit value={data.role} onChange={onEdit('role')} style={{
              display: 'block', fontSize: 'calc(12px * var(--ig-small-scale, 1))',
              color: 'var(--fg-2)', letterSpacing: '0.06em',
            }} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── D06 · Credencial ─────────────────────────────────────────
// Quem fala vem primeiro: empresa e cargo em display. A frase é o que segue.
// Estrutura invertida — autoridade antes da mensagem.
function IgTestimonial06({ data, onEdit, format = 'square' }) {
  const splitH = format === 'story' ? '52%' : '48%';
  const pad = 'inherit';
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-1)' }}>
      {/* Credencial */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: splitH,
        padding: pad, paddingBottom: 36,
        borderBottom: '1px solid currentColor',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>D · 06  —  C R E D E N C I A L</span>
          <IgLogo size="sm" />
        </div>
        <div>
          <IgEdit value={data.company} onChange={onEdit('company')} style={{
            display: 'block',
            fontSize: format === 'story'
              ? 'calc(72px * var(--ig-size-scale, 1))'
              : 'calc(58px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: 14,
          }} />
          <IgEdit value={data.author} onChange={onEdit('author')} style={{
            display: 'block', fontWeight: 'var(--ig-weight-small)',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            fontSize: 'calc(13px * var(--ig-small-scale, 1))', marginBottom: 4,
          }} />
          <IgEdit value={data.role} onChange={onEdit('role')} style={{
            display: 'block', fontSize: 'calc(13px * var(--ig-small-scale, 1))',
            color: 'var(--fg-2)', letterSpacing: '0.06em',
          }} />
        </div>
      </div>

      {/* Citação */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: `calc(100% - ${splitH})`,
        padding: pad, paddingTop: 36,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{
          fontSize: 'calc(68px * var(--ig-size-scale, 1))',
          lineHeight: 0.7, fontWeight: 'var(--ig-weight-light)',
          color: 'var(--fg-2)', marginBottom: 10, userSelect: 'none',
        }}>"</div>
        <IgEdit as="p" multiline value={data.quote} onChange={onEdit('quote')} style={{
          fontSize: format === 'story'
            ? 'calc(32px * var(--ig-size-scale, 1))'
            : 'calc(25px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.01em', lineHeight: 1.4,
        }} />
      </div>
    </div>
  );
}

// ─────────── D07 · Cartão de identidade ───────────────────────────────
// Estrutura formal de carteira institucional com moldura, quadro de
// inicial, identificação numérica e data de emissão. Layout primitivo
// novo: "ID card / member badge" — primeira moldura externa fechada com
// múltiplas seções rotuladas no projeto.
function IgTestimonial07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            border: '1.5px solid currentColor',
            padding: isStory ? '40px 36px' : '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: isStory ? 24 : 20,
          }}
        >
          {/* Cabeçalho institucional */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 18,
              borderBottom: '1px solid currentColor',
            }}
          >
            <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>
              D E P O I M E N T O   ·   M E M B R O
            </span>
            <IgMono size={28} />
          </div>
          {/* Identidade */}
          <div style={{ display: 'flex', gap: isStory ? 32 : 24, alignItems: 'flex-start' }}>
            <div
              style={{
                width: isStory ? 150 : 120,
                height: isStory ? 150 : 120,
                border: '1.5px solid currentColor',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: isStory
                  ? 'calc(96px * var(--ig-size-scale, 1))'
                  : 'calc(76px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {data.initial || (data.author ? data.author[0] : 'A')}
            </div>
            <div style={{ flex: 1, paddingTop: 6 }}>
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
                N O M E
              </span>
              <IgEdit
                value={data.author}
                onChange={onEdit('author')}
                style={{
                  fontSize: isStory
                    ? 'calc(40px * var(--ig-size-scale, 1))'
                    : 'calc(30px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                  display: 'block',
                  marginBottom: 14,
                }}
              />
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 6 }}>
                F U N Ç Ã O
              </span>
              <IgEdit
                value={data.role}
                onChange={onEdit('role')}
                style={{
                  fontSize: isStory
                    ? 'calc(20px * var(--ig-size-scale, 1))'
                    : 'calc(15px * var(--ig-size-scale, 1))',
                  letterSpacing: '0.005em',
                  display: 'block',
                  fontWeight: 'var(--ig-weight)',
                }}
              />
            </div>
          </div>
          {/* Citação */}
          <div style={{ borderTop: '1px solid currentColor', paddingTop: 20 }}>
            <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 12 }}>
              D E P O I M E N T O
            </span>
            <IgEdit
              as="p"
              multiline
              value={data.quote}
              onChange={onEdit('quote')}
              style={{
                fontSize: isStory
                  ? 'calc(28px * var(--ig-size-scale, 1))'
                  : 'calc(21px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                letterSpacing: '-0.01em',
                lineHeight: 1.4,
              }}
            />
          </div>
          {/* Rodapé do cartão */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: 18,
              borderTop: '1px solid currentColor',
            }}
          >
            <div>
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 4 }}>
                I D
              </span>
              <IgEdit
                value={data.memberId}
                onChange={onEdit('memberId')}
                style={{
                  fontSize: 'calc(13px * var(--ig-small-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  letterSpacing: '0.04em',
                  fontFamily: '"Courier New", Courier, monospace',
                }}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 4 }}>
                D E S D E
              </span>
              <IgEdit
                value={data.since}
                onChange={onEdit('since')}
                style={{
                  fontSize: 'calc(13px * var(--ig-small-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  letterSpacing: '0.04em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── D08 · Constelação de mini-citações ──────────────────────────────
// Quatro mini-quotes em posições absolutas distintas (não-grid),
// formando uma constelação. Cada qual com mini-traço + autor compacto.
// Layout primitivo novo: "Constellation / scattered mini-quotes".
function IgTestimonial08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const quotes = data.quotes || [
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

export { IgTestimonial01, IgTestimonial02, IgTestimonial03, IgTestimonial04, IgTestimonial05, IgTestimonial06, IgTestimonial07, IgTestimonial08 };
