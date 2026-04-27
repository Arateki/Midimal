import React from 'react'
import { IgMono, IgEdit, IgLogo, IgRule, IgHeader, IgFooter, IgCanvas, IgArtboard, IG_DIMS } from './ig-common.jsx'

// ig-blog.jsx — 6 variações "Novidade do blog / Artigo"

function IgBlog01({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="B · 01" label="N O   B L O G" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 24 }}
          value={data.category} onChange={onEdit('category')} />
        <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
          style={{ fontSize: format === 'story' ? 'calc(120px * var(--ig-size-scale, 1))' : format === 'portrait' ? 'calc(100px * var(--ig-size-scale, 1))' : 'calc(88px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)', letterSpacing: '-0.03em', lineHeight: 1.02, maxWidth: '95%' }} />
        <IgRule style={{ margin: '40px 0' }} />
        <IgEdit as="p" multiline value={data.excerpt} onChange={onEdit('excerpt')}
          style={{ fontSize: format === 'story' ? 'calc(28px * var(--ig-small-scale, 1))' : 'calc(22px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', lineHeight: 1.55, color: 'var(--fg-2)', maxWidth: '85%' }} />
      </div>
      <IgFooter left={data.readTime} right={data.url} />
    </>
  );
}

function IgBlog02({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="B · 02" label="A R T I G O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 260 : 180, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          {(data.tags || []).map((t, i) => (
            <IgEdit key={i} className="ig-meta" style={{ padding: '10px 20px', border: '1px solid currentColor', color: 'var(--fg-1)' }}
              value={t} onChange={(v) => { const n = [...data.tags]; n[i] = v; onEdit('tags')(n); }} />
          ))}
        </div>
        <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
          style={{ fontSize: format === 'story' ? 'calc(130px * var(--ig-size-scale, 1))' : 'calc(96px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.03em', lineHeight: 1.02 }} />
        <IgRule style={{ margin: '40px 0' }} strong />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IgEdit className="ig-meta" value={data.author} onChange={onEdit('author')} />
          <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)' }}
            value={data.date} onChange={onEdit('date')} />
        </div>
      </div>
      <IgFooter left="A R A T E K I  ·  B L O G" right={data.url} mono />
    </>
  );
}

function IgBlog03({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="B · 03" label="L E I T U R A" showMono />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit style={{ fontSize: format === 'story' ? 'calc(34px * var(--ig-small-scale, 1))' : 'calc(26px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', color: 'var(--fg-2)', marginBottom: 20, letterSpacing: '0.04em' }}
          value={data.kicker} onChange={onEdit('kicker')} />
        <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
          style={{ fontSize: format === 'story' ? 'calc(150px * var(--ig-size-scale, 1))' : 'calc(110px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em', lineHeight: 0.98 }} />
        <IgEdit as="p" multiline value={data.subtitle} onChange={onEdit('subtitle')}
          style={{ marginTop: 36, fontSize: format === 'story' ? 'calc(28px * var(--ig-small-scale, 1))' : 'calc(22px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', lineHeight: 1.5, maxWidth: '78%' }} />
      </div>
      <IgFooter left={data.readTime} right={data.author} />
    </>
  );
}

function IgBlog04({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="B · 04" label="S É R I E" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 32, marginBottom: 40 }}>
          <IgEdit style={{ fontSize: format === 'story' ? 'calc(260px * var(--ig-size-scale, 1))' : 'calc(200px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.05em', lineHeight: 0.85, fontVariantNumeric: 'tabular-nums' }}
            value={data.number} onChange={onEdit('number')} />
          <div style={{ flex: 1 }}>
            <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 12 }}
              value={data.series} onChange={onEdit('series')} />
            <IgEdit as="h2" multiline value={data.title} onChange={onEdit('title')}
              style={{ fontSize: format === 'story' ? 'calc(54px * var(--ig-size-scale, 1))' : 'calc(40px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.12 }} />
          </div>
        </div>
        <IgRule strong />
        <IgEdit as="p" multiline value={data.excerpt} onChange={onEdit('excerpt')}
          style={{ marginTop: 32, fontSize: format === 'story' ? 'calc(26px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)', lineHeight: 1.55, color: 'var(--fg-2)', maxWidth: '90%' }} />
      </div>
      <IgFooter left={data.url} right="B · 0 4" />
    </>
  );
}

function IgBlog05({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="B · 05" label="E N S A I O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
            style={{ fontSize: format === 'story' ? 'calc(96px * var(--ig-size-scale, 1))' : 'calc(70px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '90%' }} />
        </div>
        <IgRule strong />
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 32 }}>
          <div>
            <div className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 8 }}>P O R</div>
            <IgEdit style={{ fontSize: format === 'story' ? 'calc(24px * var(--ig-small-scale, 1))' : 'calc(18px * var(--ig-small-scale, 1))', fontWeight: 500 }}
              value={data.author} onChange={onEdit('author')} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 8 }}>L E I T U R A</div>
            <IgEdit style={{ fontSize: format === 'story' ? 'calc(24px * var(--ig-small-scale, 1))' : 'calc(18px * var(--ig-small-scale, 1))', fontWeight: 500 }}
              value={data.readTime} onChange={onEdit('readTime')} />
          </div>
        </div>
      </div>
      <IgFooter left={data.url} right={data.date} />
    </>
  );
}

function IgBlog06({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="ig-meta"><strong>B · 0 6</strong></div>
            <div className="ig-meta" style={{ color: 'var(--fg-2)', marginTop: 4 }}>Í N D I C E</div>
          </div>
          <IgLogo size="sm" />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <IgEdit as="h1" multiline value={data.headline} onChange={onEdit('headline')}
            style={{ fontSize: format === 'story' ? 'calc(72px * var(--ig-size-scale, 1))' : 'calc(52px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 40 }} />
          <IgRule strong />
          {(data.articles || []).map((a, i) => (
            <div key={i} style={{ display: 'flex', padding: '24px 0', borderBottom: '1px solid var(--line-1)', gap: 32, alignItems: 'baseline' }}>
              <span className="ig-meta" style={{ width: 50 }}>0{i + 1}</span>
              <IgEdit multiline style={{ fontSize: format === 'story' ? 'calc(30px * var(--ig-small-scale, 1))' : 'calc(22px * var(--ig-small-scale, 1))', flex: 1, fontWeight: 'var(--ig-weight)', lineHeight: 1.35 }}
                value={a.title} onChange={(v) => { const n = [...data.articles]; n[i] = { ...n[i], title: v }; onEdit('articles')(n); }} />
              <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', width: 90, textAlign: 'right' }}
                value={a.time} onChange={(v) => { const n = [...data.articles]; n[i] = { ...n[i], time: v }; onEdit('articles')(n); }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="ig-footer-rail">{data.url}</span>
          <span className="ig-footer-rail">2 0 2 6</span>
        </div>
      </div>
    </>
  );
}

// ── B07 · Página de jornal · 3 colunas justificadas ──────────────────
// Cabeçalho editorial completo (seção, data, manchete, lead, byline) +
// corpo do artigo em fluxo multi-coluna justificado. Layout primitivo
// novo: "Newspaper / 3-column editorial flow". Único template do projeto
// com columnCount aplicado a corpo de texto contínuo.
function IgBlog07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  return (
    <>
      <IgHeader index="B · 07" label="P U B L I C A D O" />
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
        {/* Cabeçalho editorial */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 14,
          }}
        >
          <IgEdit
            value={data.section}
            onChange={onEdit('section')}
            className="ig-meta"
            style={{ color: 'var(--fg-2)' }}
          />
          <IgEdit
            value={data.date}
            onChange={onEdit('date')}
            className="ig-meta"
            style={{ color: 'var(--fg-2)' }}
          />
        </div>
        <IgEdit
          as="p"
          multiline
          value={data.title}
          onChange={onEdit('title')}
          style={{
            fontSize: isStory
              ? 'calc(80px * var(--ig-size-scale, 1))'
              : format === 'portrait'
              ? 'calc(70px * var(--ig-size-scale, 1))'
              : 'calc(60px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            marginBottom: 18,
            maxWidth: '95%',
          }}
        />
        <IgEdit
          as="p"
          multiline
          value={data.dek}
          onChange={onEdit('dek')}
          style={{
            fontSize: isStory
              ? 'calc(28px * var(--ig-size-scale, 1))'
              : 'calc(22px * var(--ig-size-scale, 1))',
            color: 'var(--fg-2)',
            letterSpacing: '-0.005em',
            lineHeight: 1.35,
            fontWeight: 'var(--ig-weight-light)',
            fontStyle: 'italic',
            marginBottom: 22,
            maxWidth: '90%',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 16,
          }}
        >
          <IgEdit
            value={data.byline}
            onChange={onEdit('byline')}
            style={{
              fontSize: 'calc(13px * var(--ig-small-scale, 1))',
              fontWeight: 'var(--ig-weight-small)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          />
          <IgEdit
            value={data.readTime}
            onChange={onEdit('readTime')}
            className="ig-meta"
            style={{ color: 'var(--fg-2)' }}
          />
        </div>
        <IgRule strong />
        {/* Texto em colunas */}
        <div
          style={{
            flex: 1,
            columnCount: isStory ? 2 : 3,
            columnGap: isStory ? 28 : 22,
            marginTop: 22,
          }}
        >
          <IgEdit
            as="p"
            multiline
            value={data.body}
            onChange={onEdit('body')}
            style={{
              fontSize: isStory
                ? 'calc(17px * var(--ig-size-scale, 1))'
                : 'calc(13px * var(--ig-size-scale, 1))',
              letterSpacing: '0.005em',
              lineHeight: 1.55,
              textAlign: 'justify',
              hyphens: 'auto',
              fontWeight: 'var(--ig-weight)',
            }}
          />
        </div>
      </div>
      <IgFooter left={data.url} right="A R A T E K I  ·  B L O G" />
    </>
  );
}

// ─── B08 · Sumário com leader dots ───────────────────────────────────
// Lista numerada com pontilhado horizontal entre título e número da
// página, em fonte mono. Layout primitivo novo: "Table of contents /
// leader dots".
function IgBlog08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const chapters = data.chapters || [
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
          <IgEdit value={data.kicker || 'A R A T E K I  ·  P U B L I C A Ç Ã O   T R I M E S T R A L'}
            onChange={onEdit('kicker')}
            className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          <IgEdit value={data.title || 'Sumário · Edição 02'}
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
      <IgFooter left={data.url || 'A R A T E K I . O R G / B L O G'} right="B · 0 8" />
    </>
  );
}

export { IgBlog01, IgBlog02, IgBlog03, IgBlog04, IgBlog05, IgBlog06, IgBlog07, IgBlog08 };
