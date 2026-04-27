import React from 'react'
import { IgMono, IgEdit, IgLogo, IgRule, IgHeader, IgFooter, IgCanvas, IgArtboard, IG_DIMS } from './ig-common.jsx'

// ig-usecase.jsx — 6 variações de template "Caso de uso"
// Aplicações reais dos produtos Arateki. Diferente do educativo (conceito) e do manifesto (voz da marca).

// ─────────── UC01 · Persona ──────────────────────────────────────────
// Setor + perfil em tipografia larga. Cenário e resultado abaixo da régua.
function IgUseCase01({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="U · 01" label="C A S O   D E   U S O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        paddingBottom: format === 'story' ? 140 : 100,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <IgEdit value={data.sector} onChange={onEdit('sector')}
            className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 16 }} />
          <IgEdit value={data.persona} onChange={onEdit('persona')} style={{
            display: 'block',
            fontSize: format === 'story'
              ? 'calc(72px * var(--ig-size-scale, 1))'
              : 'calc(58px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.03em', lineHeight: 0.95,
            marginBottom: 32,
          }} />
          <IgEdit as="p" multiline value={data.scenario} onChange={onEdit('scenario')} style={{
            fontSize: 'calc(18px * var(--ig-size-scale, 1))',
            letterSpacing: '-0.005em', lineHeight: 1.5,
            color: 'var(--fg-2)',
          }} />
        </div>
        <div>
          <IgRule strong={false} />
          <div style={{ display: 'flex', gap: 48, marginTop: 20 }}>
            <div>
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>F E R R A M E N T A</span>
              <IgEdit value={data.tool} onChange={onEdit('tool')} style={{
                fontSize: 'calc(16px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight-small)', letterSpacing: '0.04em',
              }} />
            </div>
            <div>
              <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>R E S U L T A D O</span>
              <IgEdit value={data.result} onChange={onEdit('result')} style={{
                fontSize: 'calc(16px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight-small)', letterSpacing: '0.04em',
              }} />
            </div>
          </div>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.tag} />
    </>
  );
}

// ─────────── UC02 · Fluxo narrativo ──────────────────────────────────
// Desafio → Solução → Resultado em três blocos com separadores.
function IgUseCase02({ data, onEdit, format = 'square' }) {
  const blocks = [
    { n: '01', label: 'D E S A F I O',   key: 'challengeText' },
    { n: '02', label: 'S O L U Ç Ã O',   key: 'solutionText'  },
    { n: '03', label: 'R E S U L T A D O', key: 'resultText'   },
  ];
  return (
    <>
      <IgHeader index="U · 02" label="F L U X O" showLogo />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        paddingBottom: format === 'story' ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data.eyebrow} onChange={onEdit('eyebrow')} style={{
          fontSize: format === 'story'
            ? 'calc(40px * var(--ig-size-scale, 1))'
            : 'calc(32px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.02em', lineHeight: 1.2,
          marginBottom: 44, maxWidth: '88%',
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          {blocks.map(({ n, label, key }, i) => (
            <div key={key} style={{
              display: 'flex', gap: 24, alignItems: 'flex-start',
              padding: `${format === 'story' ? 22 : 18}px 0`,
              borderTop: '1px solid currentColor',
            }}>
              <span style={{
                fontSize: 'calc(11px * var(--ig-small-scale, 1))',
                fontWeight: 'var(--ig-weight-small)',
                letterSpacing: '0.18em', color: 'var(--fg-2)',
                flexShrink: 0, paddingTop: '0.2em', minWidth: 22,
              }}>{n}</span>
              <div style={{ flex: 1 }}>
                <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>{label}</span>
                <IgEdit as="p" multiline value={data[key]} onChange={onEdit(key)} style={{
                  fontSize: 'calc(17px * var(--ig-size-scale, 1))',
                  letterSpacing: '-0.005em', lineHeight: 1.45,
                  fontWeight: 'var(--ig-weight)',
                }} />
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid currentColor' }} />
        </div>
      </div>
    </>
  );
}

// ─────────── UC03 · Setor como hero ──────────────────────────────────
// Nome do setor em tipografia massiva. Caso de uso editorial abaixo.
function IgUseCase03({ data, onEdit, format = 'square' }) {
  const sectorSize = format === 'story'
    ? 'calc(180px * var(--ig-size-scale, 1))'
    : format === 'portrait'
    ? 'calc(150px * var(--ig-size-scale, 1))'
    : 'calc(120px * var(--ig-size-scale, 1))';
  return (
    <>
      <IgHeader index="U · 03" label="C A S O   D E   U S O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28,
      }}>
        <IgEdit value={data.sector} onChange={onEdit('sector')} style={{
          fontSize: sectorSize,
          fontWeight: 'var(--ig-weight-light)',
          letterSpacing: '-0.04em', lineHeight: 0.9,
          color: 'var(--fg-2)',
        }} />
        <IgRule strong />
        <IgEdit as="p" multiline value={data.description} onChange={onEdit('description')} style={{
          fontSize: format === 'story'
            ? 'calc(42px * var(--ig-size-scale, 1))'
            : 'calc(32px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.015em', lineHeight: 1.3,
          maxWidth: '90%',
        }} />
        <IgEdit value={data.tool} onChange={onEdit('tool')}
          className="ig-meta" style={{ color: 'var(--fg-2)' }} />
      </div>
      <IgFooter
        left={<IgEdit value={data.context} onChange={onEdit('context')} style={{
          fontSize: 'calc(11px * var(--ig-small-scale, 1))',
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-2)',
        }} />}
        right="A R A T E K I"
      />
    </>
  );
}

// ─────────── UC04 · Linha do tempo ───────────────────────────────────
// Antes / Agora em layout vertical. Narrativa de transformação.
function IgUseCase04({ data, onEdit, format = 'square' }) {
  const textSize = format === 'story'
    ? 'calc(30px * var(--ig-size-scale, 1))'
    : 'calc(22px * var(--ig-size-scale, 1))';
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 10 }}>
              U · 04  —  C A S O   D E   U S O
            </span>
            <IgEdit value={data.persona} onChange={onEdit('persona')} style={{
              fontSize: format === 'story'
                ? 'calc(44px * var(--ig-size-scale, 1))'
                : 'calc(36px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.025em',
            }} />
          </div>
          <IgLogo size="sm" />
        </div>
        <div>
          <div style={{ padding: '28px 0', borderTop: '1px solid currentColor' }}>
            <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 12 }}>A N T E S</span>
            <IgEdit as="p" multiline value={data.before} onChange={onEdit('before')} style={{
              fontSize: textSize, letterSpacing: '-0.01em', lineHeight: 1.4, color: 'var(--fg-2)',
            }} />
          </div>
          <div style={{ padding: '28px 0', borderTop: '1px solid currentColor' }}>
            <span className="ig-meta" style={{ display: 'block', marginBottom: 12 }}>A G O R A</span>
            <IgEdit as="p" multiline value={data.now} onChange={onEdit('now')} style={{
              fontSize: textSize, letterSpacing: '-0.01em', lineHeight: 1.4,
              fontWeight: 'var(--ig-weight)',
            }} />
          </div>
        </div>
        <IgFooter
          left={<IgEdit value={data.tool} onChange={onEdit('tool')}
            className="ig-meta" style={{ color: 'var(--fg-2)' }} />}
          right="A R A T E K I"
        />
      </div>
    </>
  );
}

// ─────────── UC05 · Ficha estruturada ────────────────────────────────
// Quatro campos rotulados: QUEM · O QUÊ · COMO · RESULTADO.
function IgUseCase05({ data, onEdit, format = 'square' }) {
  const rows = [
    { label: 'Q U E M',         key: 'who'     },
    { label: 'O   Q U Ê',       key: 'what'    },
    { label: 'C O M O',         key: 'how'     },
    { label: 'R E S U L T A D O', key: 'outcome' },
  ];
  return (
    <>
      <IgHeader index="U · 05" label="F I C H A   D O   C A S O" showLogo />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        paddingBottom: format === 'story' ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data.title} onChange={onEdit('title')} style={{
          fontSize: format === 'story'
            ? 'calc(42px * var(--ig-size-scale, 1))'
            : 'calc(34px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: 36,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          {rows.map(({ label, key }, i) => (
            <div key={key} style={{
              display: 'flex', gap: 28, alignItems: 'flex-start',
              padding: `${format === 'story' ? 18 : 14}px 0`,
              borderTop: '1px solid currentColor',
            }}>
              <span className="ig-meta" style={{
                color: 'var(--fg-2)', flexShrink: 0,
                minWidth: format === 'story' ? 160 : 130,
              }}>{label}</span>
              <IgEdit value={data[key]} onChange={onEdit(key)} style={{
                fontSize: 'calc(16px * var(--ig-size-scale, 1))',
                letterSpacing: '-0.005em', lineHeight: 1.4,
              }} />
            </div>
          ))}
          <div style={{ borderTop: '1px solid currentColor' }} />
        </div>
      </div>
    </>
  );
}

// ─────────── UC06 · Três cenários ────────────────────────────────────
// Grade compacta com três casos curtos. Setor + situação + ferramenta.
function IgUseCase06({ data, onEdit, format = 'square' }) {
  const cases = [
    { sKey: 'sector1', tKey: 'case1', lKey: 'tool1' },
    { sKey: 'sector2', tKey: 'case2', lKey: 'tool2' },
    { sKey: 'sector3', tKey: 'case3', lKey: 'tool3' },
  ];
  return (
    <>
      <IgHeader index="U · 06" label="C E N Á R I O S" showLogo />
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
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: 36,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {cases.map(({ sKey, tKey, lKey }) => (
            <div key={tKey} style={{
              flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: `${format === 'story' ? 20 : 16}px 0`,
              borderTop: '1px solid currentColor', gap: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IgEdit value={data[sKey]} onChange={onEdit(sKey)}
                  className="ig-meta" style={{ color: 'var(--fg-2)' }} />
                <IgEdit value={data[lKey]} onChange={onEdit(lKey)}
                  className="ig-meta" style={{ color: 'var(--fg-2)' }} />
              </div>
              <IgEdit as="p" multiline value={data[tKey]} onChange={onEdit(tKey)} style={{
                fontSize: 'calc(19px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                letterSpacing: '-0.01em', lineHeight: 1.35,
              }} />
            </div>
          ))}
          <div style={{ borderTop: '1px solid currentColor' }} />
        </div>
      </div>
    </>
  );
}

// ─────────── UC07 · Painel de KPIs ───────────────────────────────────
// Grade 2×2 com quatro métricas distintas em escala display, cada uma com
// rótulo + valor + unidade. Layout primitivo novo: "KPI dashboard /
// multi-stat panel" — múltiplos números heroicos coexistindo em grade,
// distinto do número único central de Product02 e Educational06.
function IgUseCase07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const stats = [
    { vKey: 'val1', uKey: 'unit1', lKey: 'label1' },
    { vKey: 'val2', uKey: 'unit2', lKey: 'label2' },
    { vKey: 'val3', uKey: 'unit3', lKey: 'label3' },
    { vKey: 'val4', uKey: 'unit4', lKey: 'label4' },
  ];
  return (
    <>
      <IgHeader index="U · 07" label="I M P A C T O" />
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
            lineHeight: 1.1,
            marginBottom: 14,
          }}
        />
        <IgEdit
          as="p"
          multiline
          value={data.subtitle}
          onChange={onEdit('subtitle')}
          style={{
            fontSize: isStory
              ? 'calc(22px * var(--ig-size-scale, 1))'
              : 'calc(17px * var(--ig-size-scale, 1))',
            color: 'var(--fg-2)',
            letterSpacing: '0.005em',
            lineHeight: 1.5,
            marginBottom: 32,
            maxWidth: '88%',
            fontWeight: 'var(--ig-weight-light)',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            flex: 1,
            borderTop: '1px solid currentColor',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.vKey}
              style={{
                padding: isStory ? '32px 28px' : '24px 22px',
                borderRight: i % 2 === 0 ? '1px solid currentColor' : undefined,
                borderBottom: i < 2 ? '1px solid currentColor' : undefined,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16,
                minHeight: 0,
              }}
            >
              <IgEdit
                value={data[s.lKey]}
                onChange={onEdit(s.lKey)}
                className="ig-meta"
                style={{ color: 'var(--fg-2)' }}
              />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <IgEdit
                  value={data[s.vKey]}
                  onChange={onEdit(s.vKey)}
                  style={{
                    fontSize: isStory
                      ? 'calc(180px * var(--ig-size-scale, 1))'
                      : 'calc(130px * var(--ig-size-scale, 1))',
                    fontWeight: 'var(--ig-weight-light)',
                    letterSpacing: '-0.05em',
                    lineHeight: 0.85,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                />
                <IgEdit
                  value={data[s.uKey]}
                  onChange={onEdit(s.uKey)}
                  style={{
                    fontSize: isStory
                      ? 'calc(28px * var(--ig-size-scale, 1))'
                      : 'calc(20px * var(--ig-size-scale, 1))',
                    fontWeight: 'var(--ig-weight)',
                    letterSpacing: '-0.01em',
                    color: 'var(--fg-2)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <IgFooter left={data.context} right={data.year} />
    </>
  );
}

// ─── UC08 · Feed de atividade ao vivo ────────────────────────────────
// Lista cronológica reversa com timestamps em fonte mono e indicador
// "ao vivo" com quadrado pulsante (sem usar border-radius). Layout
// primitivo novo: "Activity feed / live log".
function IgUseCase08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const events = data.events || [
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
            <IgEdit value={data.title || 'Atividade da rede Raiznet'}
              onChange={onEdit('title')}
              style={{
                fontSize: isStory
                  ? 'calc(52px * var(--ig-size-scale, 1))'
                  : 'calc(40px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em',
                display: 'block', lineHeight: 1.05,
              }} />
            <IgEdit value={data.window || 'Últimas 4 horas · 25 abr 2026'}
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

export { IgUseCase01, IgUseCase02, IgUseCase03, IgUseCase04, IgUseCase05, IgUseCase06, IgUseCase07, IgUseCase08 };
