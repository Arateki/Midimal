import React from 'react'
import { IgMono, IgEdit, IgLogo, IgRule, IgHeader, IgFooter, IgCanvas, IgArtboard, IG_DIMS } from './ig-common.jsx'

// ig-event.jsx — 6 variações "Evento / Save the date"

function IgEvent01({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="V · 01" label="S A V E   T H E   D A T E" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <IgEdit className="ig-meta" style={{ marginBottom: 28, color: 'var(--fg-2)' }}
          value={data.kicker} onChange={onEdit('kicker')} />
        <IgEdit as="h1" value={data.day} onChange={onEdit('day')}
          style={{ fontSize: format === 'story' ? 'calc(560px * var(--ig-size-scale, 1))' : 'calc(440px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.07em', lineHeight: 0.82, fontVariantNumeric: 'tabular-nums' }} />
        <IgEdit className="ig-meta" style={{ marginTop: 16 }}
          value={data.monthYear} onChange={onEdit('monthYear')} />
        <div style={{ width: 80, height: 1, background: 'currentColor', margin: '48px 0 32px' }} />
        <IgEdit as="h3" multiline value={data.title} onChange={onEdit('title')}
          style={{ fontSize: format === 'story' ? 'calc(44px * var(--ig-small-scale, 1))' : 'calc(34px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.2, maxWidth: '75%' }} />
        <IgEdit className="ig-meta" style={{ marginTop: 20, color: 'var(--fg-2)' }}
          value={data.place} onChange={onEdit('place')} />
      </div>
      <IgFooter left="A R A T E K I" right="2 0 2 6" mono />
    </>
  );
}

function IgEvent02({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="ig-meta"><strong>V · 02</strong>  —  E V E N T O</span>
          <IgLogo size="sm" />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
            style={{ fontSize: format === 'story' ? 'calc(160px * var(--ig-size-scale, 1))' : 'calc(120px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em', lineHeight: 0.98 }} />
          <IgRule style={{ margin: '48px 0 32px' }} strong />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
            {['date', 'time', 'place'].map((k) => (
              <div key={k}>
                <div className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 10 }}>
                  {k === 'date' ? 'D A T A' : k === 'time' ? 'H O R A' : 'L O C A L'}
                </div>
                <IgEdit value={data[k]} onChange={onEdit(k)}
                  style={{ fontSize: format === 'story' ? 'calc(30px * var(--ig-small-scale, 1))' : 'calc(24px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)' }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="ig-footer-rail">{data.url}</span>
          <span className="ig-footer-rail">V · 0 2</span>
        </div>
      </div>
    </>
  );
}

function IgEvent03({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="V · 03" label="P R O G R A M A Ç Ã O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 260 : 180, display: 'flex', flexDirection: 'column' }}>
        <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
          style={{ fontSize: format === 'story' ? 'calc(100px * var(--ig-size-scale, 1))' : 'calc(72px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: 40 }} />
        <IgRule strong />
        {(data.schedule || []).map((s, i) => (
          <div key={i} style={{ display: 'flex', padding: '24px 0', borderBottom: '1px solid var(--line-1)', gap: 40 }}>
            <IgEdit style={{ fontSize: format === 'story' ? 'calc(26px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))', fontWeight: 500, width: 180, fontVariantNumeric: 'tabular-nums' }}
              value={s.time} onChange={(v) => { const n = [...data.schedule]; n[i] = { ...n[i], time: v }; onEdit('schedule')(n); }} />
            <IgEdit multiline style={{ fontSize: format === 'story' ? 'calc(26px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))', flex: 1, lineHeight: 1.35 }}
              value={s.item} onChange={(v) => { const n = [...data.schedule]; n[i] = { ...n[i], item: v }; onEdit('schedule')(n); }} />
          </div>
        ))}
      </div>
      <IgFooter left={data.date} right={data.place} />
    </>
  );
}

function IgEvent04({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="V · 04" label="C O N F I R M A R" showMono />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 20 }}
          value={data.kicker} onChange={onEdit('kicker')} />
        <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
          style={{ fontSize: format === 'story' ? 'calc(130px * var(--ig-size-scale, 1))' : 'calc(100px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.03em', lineHeight: 1.02 }} />
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ padding: 32, border: '1px solid currentColor' }}>
            <div className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 12 }}>Q U A N D O</div>
            <IgEdit style={{ fontSize: format === 'story' ? 'calc(30px * var(--ig-small-scale, 1))' : 'calc(22px * var(--ig-small-scale, 1))', fontWeight: 500 }}
              value={data.when} onChange={onEdit('when')} />
          </div>
          <div style={{ padding: 32, border: '1px solid currentColor' }}>
            <div className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 12 }}>O N D E</div>
            <IgEdit style={{ fontSize: format === 'story' ? 'calc(30px * var(--ig-small-scale, 1))' : 'calc(22px * var(--ig-small-scale, 1))', fontWeight: 500 }}
              value={data.where} onChange={onEdit('where')} />
          </div>
        </div>
        <IgEdit className="ig-meta" style={{ marginTop: 40, letterSpacing: '0.24em' }}
          value={data.url} onChange={onEdit('url')} />
      </div>
      <IgFooter left="A R A T E K I" right="V · 0 4" />
    </>
  );
}

function IgEvent05({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="V · 05" label="E N C O N T R O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit as="h1" value={data.dateLine} onChange={onEdit('dateLine')}
          style={{ fontSize: format === 'story' ? 'calc(220px * var(--ig-size-scale, 1))' : 'calc(170px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.045em', lineHeight: 0.92, fontVariantNumeric: 'tabular-nums' }} />
        <IgRule style={{ margin: '48px 0 40px' }} strong />
        <IgEdit as="h3" multiline value={data.title} onChange={onEdit('title')}
          style={{ fontSize: format === 'story' ? 'calc(56px * var(--ig-size-scale, 1))' : 'calc(42px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 24 }} />
        <IgEdit as="p" multiline value={data.body} onChange={onEdit('body')}
          style={{ fontSize: format === 'story' ? 'calc(26px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', color: 'var(--fg-2)', lineHeight: 1.55, maxWidth: '72%' }} />
      </div>
      <IgFooter left={data.place} right={data.url} mono />
    </>
  );
}

function IgEvent06({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div className="ig-grid-bg" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <IgMono size={56} />
          <div style={{ textAlign: 'right' }}>
            <div className="ig-meta"><strong>V · 0 6</strong></div>
            <div className="ig-meta" style={{ color: 'var(--fg-2)' }}>S A V E   T H E   D A T E</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
            style={{ fontSize: format === 'story' ? 'calc(120px * var(--ig-size-scale, 1))' : 'calc(90px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: 40, maxWidth: '85%' }} />
          <IgRule style={{ width: 120, margin: '16px auto 32px' }} strong />
          <IgEdit style={{ fontSize: format === 'story' ? 'calc(44px * var(--ig-small-scale, 1))' : 'calc(32px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            value={data.date} onChange={onEdit('date')} />
          <IgEdit className="ig-meta" style={{ marginTop: 20, color: 'var(--fg-2)' }}
            value={data.place} onChange={onEdit('place')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="ig-footer-rail">A R A T E K I</span>
          <span className="ig-footer-rail">2 0 2 6</span>
        </div>
      </div>
    </>
  );
}

// ── V07 · Bilhete / boarding pass ────────────────────────────────────
// Formato de ingresso com stub destacável separado por perfuração vertical
// pontilhada. Layout primitivo novo: "Ticket / boarding pass". Único
// template do projeto que usa estrutura de dois corpos com perfuração.
function IgEvent07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  return (
    <>
      <IgHeader index="V · 07" label="I N G R E S S O" />
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
            alignItems: 'stretch',
            flex: 1,
          }}
        >
          {/* Corpo principal do bilhete */}
          <div
            style={{
              flex: 3,
              padding: isStory ? '40px 36px' : '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: isStory ? 36 : 26,
                }}
              >
                <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>
                  A R A T E K I  ·  E N C O N T R O
                </span>
                <IgMono size={isStory ? 32 : 26} />
              </div>
              <IgEdit
                as="p"
                multiline
                value={data.title}
                onChange={onEdit('title')}
                style={{
                  fontSize: isStory
                    ? 'calc(72px * var(--ig-size-scale, 1))'
                    : format === 'portrait'
                    ? 'calc(60px * var(--ig-size-scale, 1))'
                    : 'calc(50px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.0,
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: isStory ? 36 : 24, marginTop: 28 }}>
              <div style={{ flex: 1 }}>
                <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
                  D A T A
                </span>
                <IgEdit
                  value={data.date}
                  onChange={onEdit('date')}
                  style={{
                    fontSize: isStory
                      ? 'calc(28px * var(--ig-size-scale, 1))'
                      : 'calc(22px * var(--ig-size-scale, 1))',
                    fontWeight: 'var(--ig-weight)',
                    letterSpacing: '-0.01em',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
                  P O R T Ã O
                </span>
                <IgEdit
                  value={data.gate}
                  onChange={onEdit('gate')}
                  style={{
                    fontSize: isStory
                      ? 'calc(28px * var(--ig-size-scale, 1))'
                      : 'calc(22px * var(--ig-size-scale, 1))',
                    fontWeight: 'var(--ig-weight)',
                    letterSpacing: '-0.01em',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
                  C I D A D E
                </span>
                <IgEdit
                  value={data.city}
                  onChange={onEdit('city')}
                  style={{
                    fontSize: isStory
                      ? 'calc(28px * var(--ig-size-scale, 1))'
                      : 'calc(22px * var(--ig-size-scale, 1))',
                    fontWeight: 'var(--ig-weight)',
                    letterSpacing: '-0.01em',
                  }}
                />
              </div>
            </div>
          </div>
          {/* Perfuração vertical */}
          <div
            style={{
              width: 1,
              flexShrink: 0,
              backgroundImage:
                'repeating-linear-gradient(to bottom, currentColor 0, currentColor 6px, transparent 6px, transparent 12px)',
              opacity: 0.55,
            }}
          />
          {/* Stub */}
          <div
            style={{
              flex: 1,
              flexShrink: 0,
              padding: isStory ? '40px 28px' : '32px 22px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              className="ig-meta"
              style={{
                color: 'var(--fg-2)',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                alignSelf: 'flex-start',
              }}
            >
              S T U B
            </span>
            <div>
              <IgEdit
                value={data.passNum}
                onChange={onEdit('passNum')}
                style={{
                  fontSize: isStory
                    ? 'calc(48px * var(--ig-size-scale, 1))'
                    : 'calc(38px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight-light)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  fontFamily: '"Courier New", Courier, monospace',
                  display: 'block',
                  marginBottom: 10,
                }}
              />
              <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>
                P A S S
              </span>
            </div>
          </div>
        </div>
      </div>
      <IgFooter left={data.url} right="V · 0 7" />
    </>
  );
}

// ─── V08 · Calendário do mês · célula destacada ──────────────────────
// Grade 7×N com a data do evento marcada por boxShadow inset (preserva
// alinhamento das bordas da grade). Layout primitivo novo: "Calendar
// grid / month view".
function IgEvent08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const startWeekday = data.startWeekday || 0; // 0 = domingo
  const monthDays    = data.daysInMonth || 30;
  const eventDay     = parseInt(data.day || '12', 10);
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
          <IgEdit value={data.month || 'J U N H O   ·   2 0 2 6'}
            onChange={onEdit('month')}
            className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          <IgEdit value={data.title || 'Encontro Arateki'}
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
      <IgFooter left={data.location || 'S Ã O   P A U L O  ·  S P'} right="V · 0 8" />
    </>
  );
}

export { IgEvent01, IgEvent02, IgEvent03, IgEvent04, IgEvent05, IgEvent06, IgEvent07, IgEvent08 };
