// ig-job.jsx — 6 variações "Vaga / Oportunidade"

function IgJob01({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="J · 01" label="E S T A M O S   C O N T R A T A N D O" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 20 }}
          value={data.department} onChange={onEdit('department')} />
        <IgEdit as="h1" multiline value={data.role} onChange={onEdit('role')}
          style={{ fontSize: format === 'story' ? 'calc(160px * var(--ig-size-scale, 1))' : 'calc(120px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em', lineHeight: 0.98 }} />
        <IgRule style={{ margin: '40px 0' }} strong />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
          {[['type', 'T I P O'], ['location', 'L O C A L'], ['level', 'N Í V E L']].map(([k, l]) => (
            <div key={k}>
              <div className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 10 }}>{l}</div>
              <IgEdit style={{ fontSize: format === 'story' ? 'calc(26px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))', fontWeight: 500 }}
                value={data[k]} onChange={onEdit(k)} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left={data.url} right="J · 0 1" mono />
    </>
  );
}

function IgJob02({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="J · 02" label="V A G A" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 20 }}
          value={data.kicker} onChange={onEdit('kicker')} />
        <IgEdit as="h1" multiline value={data.role} onChange={onEdit('role')}
          style={{ fontSize: format === 'story' ? 'calc(140px * var(--ig-size-scale, 1))' : 'calc(100px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 40 }} />
        <IgEdit as="p" multiline value={data.summary} onChange={onEdit('summary')}
          style={{ fontSize: format === 'story' ? 'calc(28px * var(--ig-small-scale, 1))' : 'calc(22px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', lineHeight: 1.55, maxWidth: '78%', color: 'var(--fg-2)' }} />
        <div style={{ marginTop: 48, display: 'inline-flex', alignItems: 'center', gap: 18,
          alignSelf: 'flex-start', padding: '24px 36px', border: '1px solid currentColor' }}>
          <IgEdit className="ig-meta" style={{ letterSpacing: '0.28em' }}
            value={data.cta} onChange={onEdit('cta')} />
          <span style={{ fontSize: 'calc(20px * var(--ig-small-scale, 1))' }}>→</span>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.deadline} />
    </>
  );
}

function IgJob03({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="J · 03" label="R E Q U I S I T O S" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 260 : 180, display: 'flex', flexDirection: 'column' }}>
        <IgEdit as="h1" value={data.role} onChange={onEdit('role')}
          style={{ fontSize: format === 'story' ? 'calc(90px * var(--ig-size-scale, 1))' : 'calc(68px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 12 }} />
        <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 40 }}
          value={data.department} onChange={onEdit('department')} />
        <IgRule strong />
        {(data.requirements || []).map((r, i) => (
          <div key={i} style={{ display: 'flex', padding: '20px 0', borderBottom: '1px solid var(--line-1)', gap: 32 }}>
            <span className="ig-meta" style={{ width: 48, paddingTop: 6 }}>0{i + 1}</span>
            <IgEdit multiline value={r} onChange={(v) => { const n = [...data.requirements]; n[i] = v; onEdit('requirements')(n); }}
              style={{ fontSize: format === 'story' ? 'calc(26px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))', flex: 1, lineHeight: 1.45 }} />
          </div>
        ))}
      </div>
      <IgFooter left={data.url} right="C A N D I D A T E - S E" />
    </>
  );
}

function IgJob04({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="J · 04" label="O P O R T U N I D A D E" showMono />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 28 }}
          value={data.kicker} onChange={onEdit('kicker')} />
        <IgEdit as="h1" multiline value={data.role} onChange={onEdit('role')}
          style={{ fontSize: format === 'story' ? 'calc(200px * var(--ig-size-scale, 1))' : 'calc(150px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.04em', lineHeight: 0.92, maxWidth: '92%' }} />
        <IgRule style={{ width: 80, margin: '40px auto 32px' }} strong />
        <IgEdit style={{ fontSize: format === 'story' ? 'calc(30px * var(--ig-small-scale, 1))' : 'calc(22px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          value={data.location} onChange={onEdit('location')} />
      </div>
      <IgFooter left="A R A T E K I" right="C A R R E I R A S" />
    </>
  );
}

function IgJob05({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="J · 05" label="P R O C U R A - S E" />
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IgEdit style={{ fontSize: format === 'story' ? 'calc(36px * var(--ig-small-scale, 1))' : 'calc(28px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight-light)', color: 'var(--fg-2)', marginBottom: 12 }}
          value={data.intro} onChange={onEdit('intro')} />
        <IgEdit as="h1" value={data.role} onChange={onEdit('role')}
          style={{ fontSize: format === 'story' ? 'calc(170px * var(--ig-size-scale, 1))' : 'calc(130px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em', lineHeight: 0.95 }} />
        <IgRule style={{ margin: '40px 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <div className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 10 }}>M O D E L O</div>
            <IgEdit style={{ fontSize: format === 'story' ? 'calc(26px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))', fontWeight: 500 }}
              value={data.model} onChange={onEdit('model')} />
          </div>
          <div>
            <div className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 10 }}>I N Í C I O</div>
            <IgEdit style={{ fontSize: format === 'story' ? 'calc(26px * var(--ig-small-scale, 1))' : 'calc(20px * var(--ig-small-scale, 1))', fontWeight: 500 }}
              value={data.start} onChange={onEdit('start')} />
          </div>
        </div>
      </div>
      <IgFooter left={data.url} right="J · 0 5" mono />
    </>
  );
}

function IgJob06({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, padding: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IgLogo size="sm" />
          <span className="ig-meta"><strong>J · 06</strong>  —  J U N T E - S E</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <IgEdit as="p" multiline value={data.tagline} onChange={onEdit('tagline')}
            style={{ fontSize: format === 'story' ? 'calc(64px * var(--ig-size-scale, 1))' : 'calc(48px * var(--ig-size-scale, 1))', fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 48, maxWidth: '90%' }} />
          <IgRule strong />
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(data.roles || []).map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid var(--line-1)' }}>
                <IgEdit style={{ fontSize: format === 'story' ? 'calc(32px * var(--ig-small-scale, 1))' : 'calc(26px * var(--ig-small-scale, 1))', fontWeight: 'var(--ig-weight)' }}
                  value={r.title} onChange={(v) => { const n = [...data.roles]; n[i] = { ...n[i], title: v }; onEdit('roles')(n); }} />
                <IgEdit className="ig-meta" style={{ color: 'var(--fg-2)' }}
                  value={r.team} onChange={(v) => { const n = [...data.roles]; n[i] = { ...n[i], team: v }; onEdit('roles')(n); }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="ig-footer-rail">{data.url}</span>
          <span className="ig-footer-rail">A R A T E K I</span>
        </div>
      </div>
    </>
  );
}

// ── J07 · Benefícios em grade · símbolos como ícones ─────────────────
// Quatro cards 2×2 com símbolo unicode em escala display funcionando como
// ícone tipográfico. Layout primitivo novo: "Symbol-card grid" — primeiro
// uso do projeto de glifos em escala como elementos icônicos.
function IgJob07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const cards = [
    { symKey: 'sym1', titleKey: 'title1', descKey: 'desc1' },
    { symKey: 'sym2', titleKey: 'title2', descKey: 'desc2' },
    { symKey: 'sym3', titleKey: 'title3', descKey: 'desc3' },
    { symKey: 'sym4', titleKey: 'title4', descKey: 'desc4' },
  ];
  return (
    <>
      <IgHeader index="J · 07" label="O   Q U E   O F E R E C E M O S" />
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
          value={data.headline}
          onChange={onEdit('headline')}
          style={{
            fontSize: isStory
              ? 'calc(54px * var(--ig-size-scale, 1))'
              : 'calc(42px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 30,
            maxWidth: '88%',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            flex: 1,
            border: '1px solid currentColor',
            borderRight: 'none',
            borderBottom: 'none',
          }}
        >
          {cards.map(({ symKey, titleKey, descKey }) => (
            <div
              key={symKey}
              style={{
                borderRight: '1px solid currentColor',
                borderBottom: '1px solid currentColor',
                padding: isStory ? '32px 28px' : '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 18,
                minHeight: 0,
              }}
            >
              <IgEdit
                value={data[symKey]}
                onChange={onEdit(symKey)}
                style={{
                  fontSize: isStory
                    ? 'calc(96px * var(--ig-size-scale, 1))'
                    : 'calc(72px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight-light)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: 'var(--fg-2)',
                  display: 'block',
                }}
              />
              <div>
                <IgEdit
                  value={data[titleKey]}
                  onChange={onEdit(titleKey)}
                  style={{
                    fontSize: isStory
                      ? 'calc(28px * var(--ig-size-scale, 1))'
                      : 'calc(22px * var(--ig-size-scale, 1))',
                    fontWeight: 'var(--ig-weight)',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.15,
                    display: 'block',
                    marginBottom: 10,
                  }}
                />
                <IgEdit
                  as="p"
                  multiline
                  value={data[descKey]}
                  onChange={onEdit(descKey)}
                  style={{
                    fontSize: isStory
                      ? 'calc(16px * var(--ig-size-scale, 1))'
                      : 'calc(13px * var(--ig-size-scale, 1))',
                    color: 'var(--fg-2)',
                    letterSpacing: '0.005em',
                    lineHeight: 1.5,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <IgFooter left={data.url} right="J · 0 7" mono />
    </>
  );
}

// ─── J08 · Pirâmide de carreira · níveis trapezoidais ────────────────
// Três blocos centralizados de larguras crescentes. Quanto mais largo,
// mais entrada (júnior). Layout primitivo novo: "Pyramid / hierarchy
// stack".
function IgJob08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const levels = data.levels || [
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
        <IgEdit as="p" multiline value={data.headline || 'Como crescemos juntos.'}
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
      <IgFooter left={data.url || 'A R A T E K I . O R G / V A G A S'} right="J · 0 8" />
    </>
  );
}

Object.assign(window, { IgJob01, IgJob02, IgJob03, IgJob04, IgJob05, IgJob06, IgJob07, IgJob08 });
