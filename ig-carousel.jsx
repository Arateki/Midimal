// ig-carousel.jsx — Carrossel explicativo (capa + 3 conteúdos + CTA) × 2 variações de estilo

// VARIAÇÃO A — minimalista tipográfico
function IgCarouselA_Cover({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="C · A" label="C A R R O S S E L" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit className="ig-meta" style={{ marginBottom: 28, color: 'var(--fg-2)' }}
          value={data.kicker} onChange={onEdit('kicker')} />
        <IgEdit as="h1" multiline value={data.title} onChange={onEdit('title')}
          style={{ fontSize: format === 'story' ? 'calc(180px * var(--ig-size-scale, 1))' : 'calc(130px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em', lineHeight: 0.95, maxWidth: '95%' }} />
        <IgEdit as="p" multiline value={data.subtitle} onChange={onEdit('subtitle')}
          style={{ marginTop: 40, fontSize: format === 'story' ? 'calc(30px * var(--ig-small-scale, 1))' : 'calc(24px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', lineHeight: 1.5, maxWidth: '75%', color: 'var(--fg-2)' }} />
        <div style={{ marginTop: 64, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span className="ig-meta">D E S L I Z E</span>
          <span style={{ fontSize: 'calc(20px * var(--ig-small-scale, 1))' }}>→</span>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={`1 / ${data.total || 5}`} />
    </>
  );
}

function IgCarouselA_Page({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index={data.num} label={data.label} />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 200, display: 'flex', flexDirection: 'column' }}>
        <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 20 }}
          value={data.eyebrow} onChange={onEdit('eyebrow')} />
        <IgEdit as="h2" multiline value={data.heading} onChange={onEdit('heading')}
          style={{ fontSize: format === 'story' ? 'calc(80px * var(--ig-size-scale, 1))' : 'calc(64px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 32 }} />
        <IgRule strong />
        <IgEdit as="p" multiline value={data.body} onChange={onEdit('body')}
          style={{ marginTop: 32, fontSize: format === 'story' ? 'calc(28px * var(--ig-small-scale, 1))' : 'calc(22px * var(--ig-small-scale, 1))', lineHeight: 1.55, fontWeight: 'var(--ig-weight)', maxWidth: '92%' }} />
      </div>
      <IgFooter left="A R A T E K I" right={data.counter} />
    </>
  );
}

function IgCarouselA_CTA({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="C · A" label="F I M" showMono />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit as="h1" multiline value={data.headline} onChange={onEdit('headline')}
          style={{ fontSize: format === 'story' ? 'calc(130px * var(--ig-size-scale, 1))' : 'calc(100px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.03em', lineHeight: 1.05 }} />
        <div style={{ marginTop: 56, display: 'inline-flex', alignItems: 'center', gap: 20,
          alignSelf: 'flex-start', padding: '28px 40px', border: '1px solid currentColor' }}>
          <IgEdit className="ig-meta" style={{ letterSpacing: '0.28em' }}
            value={data.cta} onChange={onEdit('cta')} />
          <span style={{ fontSize: 'calc(22px * var(--ig-small-scale, 1))' }}>→</span>
        </div>
        <IgEdit as="p" multiline value={data.note} onChange={onEdit('note')}
          style={{ marginTop: 48, fontSize: format === 'story' ? 'calc(24px * var(--ig-small-scale, 1))' : 'calc(18px * var(--ig-small-scale, 1))', color: 'var(--fg-2)', maxWidth: '70%', lineHeight: 1.5 }} />
      </div>
      <IgFooter left={data.url} right={data.counter} mono />
    </>
  );
}

Object.assign(window, { IgCarouselA_Cover, IgCarouselA_Page, IgCarouselA_CTA });
