// ig-product.jsx — 6 variações de template "Produto"
// Catálogo e specs dos produtos Arateki. Layouts inéditos no projeto.

// ─────────── P01 · Grade de especificações ───────────────────────────
// CSS grid 2×3 para specs. Único template do projeto com display:grid real.
function IgProduct01({ data, onEdit, format = 'square' }) {
  const cells = [
    ['spec1l','spec1v'], ['spec2l','spec2v'],
    ['spec3l','spec3v'], ['spec4l','spec4v'],
    ['spec5l','spec5v'], ['spec6l','spec6v'],
  ];
  return (
    <>
      <IgHeader index="P · 01" label="P R O D U T O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        paddingBottom: format === 'story' ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ marginBottom: 32 }}>
          <IgEdit value={data.kicker} onChange={onEdit('kicker')}
            className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 10 }} />
          <IgEdit value={data.name} onChange={onEdit('name')} style={{
            fontSize: format === 'story'
              ? 'calc(100px * var(--ig-size-scale, 1))'
              : 'calc(80px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.04em', lineHeight: 0.9,
          }} />
        </div>

        {/* Grade 2×3 de specs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          flex: 1,
          border: '1px solid currentColor',
          borderRight: 'none',
          borderBottom: 'none',
        }}>
          {cells.map(([lKey, vKey]) => (
            <div key={lKey} style={{
              borderRight: '1px solid currentColor',
              borderBottom: '1px solid currentColor',
              padding: format === 'story' ? '20px 18px' : '14px 14px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              gap: 8,
            }}>
              <IgEdit value={data[lKey]} onChange={onEdit(lKey)} style={{
                fontSize: 'calc(10px * var(--ig-small-scale, 1))',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--fg-2)', display: 'block',
              }} />
              <IgEdit value={data[vKey]} onChange={onEdit(vKey)} style={{
                fontSize: 'calc(16px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                letterSpacing: '-0.01em', lineHeight: 1.2,
              }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─────────── P02 · Número hero ────────────────────────────────────────
// Um único valor técnico em escala extrema. Produto e contexto ao redor.
// Stat massivo diferenciado da versão educativa (educational06) pela moldura de produto.
function IgProduct02({ data, onEdit, format = 'square' }) {
  const statSize = format === 'story'
    ? 'calc(380px * var(--ig-size-scale, 1))'
    : 'calc(300px * var(--ig-size-scale, 1))';
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Produto */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
              P · 02  —  D E S T A Q U E
            </span>
            <IgEdit value={data.product} onChange={onEdit('product')} style={{
              fontSize: format === 'story'
                ? 'calc(42px * var(--ig-size-scale, 1))'
                : 'calc(34px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em',
            }} />
          </div>
          <IgLogo size="sm" />
        </div>

        {/* Número */}
        <div>
          <IgEdit value={data.stat} onChange={onEdit('stat')} style={{
            display: 'block',
            fontSize: statSize,
            fontWeight: 'var(--ig-weight-light)',
            letterSpacing: '-0.06em', lineHeight: 0.85,
            color: 'var(--fg-2)',
          }} />
          <IgEdit value={data.unit} onChange={onEdit('unit')} style={{
            display: 'block',
            fontSize: format === 'story'
              ? 'calc(56px * var(--ig-size-scale, 1))'
              : 'calc(44px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.02em', lineHeight: 1,
          }} />
        </div>

        {/* Contexto */}
        <div>
          <IgRule strong={false} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 }}>
            <IgEdit as="p" multiline value={data.context} onChange={onEdit('context')} style={{
              fontSize: 'calc(15px * var(--ig-size-scale, 1))',
              letterSpacing: '0.01em', lineHeight: 1.55,
              color: 'var(--fg-2)', maxWidth: '68%',
            }} />
            <IgEdit value={data.tag} onChange={onEdit('tag')}
              className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── P03 · Linha do tempo horizontal ─────────────────────────
// Marcos de produto ao longo de uma linha. Marcadores em diamante.
// Única timeline horizontal no projeto.
function IgProduct03({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const milestones = [
    { dKey: 'date1', pKey: 'product1', nKey: 'note1' },
    { dKey: 'date2', pKey: 'product2', nKey: 'note2' },
    { dKey: 'date3', pKey: 'product3', nKey: 'note3' },
  ];
  return (
    <>
      <IgHeader index="P · 03" label="R O A D M A P" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data.title} onChange={onEdit('title')} style={{
          fontSize: isStory
            ? 'calc(44px * var(--ig-size-scale, 1))'
            : 'calc(36px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: isStory ? 64 : 52,
        }} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Linha + marcadores */}
          <div style={{ position: 'relative', height: 1, background: 'currentColor', marginBottom: isStory ? 36 : 28 }}>
            {milestones.map((_, i) => (
              <div key={i} style={{
                position: 'absolute', top: '50%',
                left: `${(i / (milestones.length - 1)) * 100}%`,
                width: 8, height: 8,
                border: '1px solid currentColor',
                background: 'var(--bg-1)',
                transform: 'translate(-50%, -50%) rotate(45deg)',
              }} />
            ))}
          </div>

          {/* Labels */}
          <div style={{ display: 'flex' }}>
            {milestones.map(({ dKey, pKey, nKey }, i) => (
              <div key={dKey} style={{
                flex: 1,
                paddingRight: i < milestones.length - 1 ? (isStory ? 32 : 24) : 0,
              }}>
                <IgEdit value={data[dKey]} onChange={onEdit(dKey)}
                  className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 10 }} />
                <IgEdit value={data[pKey]} onChange={onEdit(pKey)} style={{
                  display: 'block',
                  fontSize: isStory
                    ? 'calc(32px * var(--ig-size-scale, 1))'
                    : 'calc(26px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 10,
                }} />
                <IgEdit value={data[nKey]} onChange={onEdit(nKey)} style={{
                  display: 'block',
                  fontSize: 'calc(14px * var(--ig-size-scale, 1))',
                  color: 'var(--fg-2)', letterSpacing: '0.02em', lineHeight: 1.5,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── P04 · Nome em escrita vertical ───────────────────────────
// Produto em writing-mode vertical na margem esquerda. Único no projeto.
// Referência: revistas técnicas japonesas e europeias.
function IgProduct04({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'row', gap: 0,
      }}>
        {/* Esquerda: produto em vertical */}
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          paddingRight: isStory ? 40 : 28,
          borderRight: '1px solid currentColor',
          flexShrink: 0,
        }}>
          <IgEdit value={data.name} onChange={onEdit('name')} style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            fontSize: isStory
              ? 'calc(96px * var(--ig-size-scale, 1))'
              : 'calc(76px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.03em', lineHeight: 0.88,
          }} />
        </div>

        {/* Direita: conteúdo */}
        <div style={{
          flex: 1,
          paddingLeft: isStory ? 40 : 28,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IgLogo size="sm" />
          </div>

          <div>
            <IgEdit value={data.version} onChange={onEdit('version')}
              className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 16 }} />
            <IgEdit as="p" multiline value={data.description} onChange={onEdit('description')} style={{
              fontSize: isStory
                ? 'calc(36px * var(--ig-size-scale, 1))'
                : 'calc(28px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.015em', lineHeight: 1.35,
              marginBottom: 28,
            }} />
            <IgEdit as="p" multiline value={data.specs} onChange={onEdit('specs')} style={{
              fontSize: 'calc(14px * var(--ig-small-scale, 1))',
              color: 'var(--fg-2)', letterSpacing: '0.06em', lineHeight: 2,
            }} />
          </div>

          <IgEdit value={data.tag} onChange={onEdit('tag')}
            className="ig-meta" style={{ color: 'var(--fg-2)' }} />
        </div>
      </div>
    </>
  );
}

// ─────────── P05 · Histórico de versões ──────────────────────────────
// Changelog estilo: versão + data à esquerda, notas de lançamento à direita.
function IgProduct05({ data, onEdit, format = 'square' }) {
  const versions = ['1', '2', '3'];
  return (
    <>
      <IgHeader index="P · 05" label="V E R S Õ E S" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        paddingBottom: format === 'story' ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 36 }}>
          <IgEdit value={data.product} onChange={onEdit('product')} style={{
            fontSize: format === 'story'
              ? 'calc(52px * var(--ig-size-scale, 1))'
              : 'calc(42px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em',
          }} />
          <IgLogo size="sm" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          {versions.map((n) => (
            <div key={n} style={{
              display: 'flex', gap: 24,
              padding: `${format === 'story' ? 24 : 18}px 0`,
              borderTop: '1px solid currentColor',
            }}>
              <IgEdit value={data['rel' + n]} onChange={onEdit('rel' + n)} style={{
                fontSize: 'calc(11px * var(--ig-small-scale, 1))',
                fontWeight: 'var(--ig-weight-small)', letterSpacing: '0.14em',
                color: 'var(--fg-2)', flexShrink: 0, paddingTop: '0.2em',
                minWidth: format === 'story' ? 160 : 130,
              }} />
              <IgEdit as="p" multiline value={data['notes' + n]} onChange={onEdit('notes' + n)} style={{
                fontSize: 'calc(17px * var(--ig-size-scale, 1))',
                letterSpacing: '-0.005em', lineHeight: 1.45,
                fontWeight: 'var(--ig-weight)',
              }} />
            </div>
          ))}
          <div style={{ borderTop: '1px solid currentColor' }} />
        </div>
      </div>
    </>
  );
}

// ─────────── P06 · Ficha com selo rotacionado ─────────────────────────
// Ficha técnica com elemento `OPEN SOURCE` rotacionado no canto.
// Único elemento com transform:rotate como recurso de design no projeto.
function IgProduct06({ data, onEdit, format = 'square' }) {
  const rows = ['1','2','3','4','5','6'];
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Topo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <IgEdit value={data.kicker} onChange={onEdit('kicker')}
              className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 10 }} />
            <IgEdit value={data.name} onChange={onEdit('name')} style={{
              fontSize: format === 'story'
                ? 'calc(68px * var(--ig-size-scale, 1))'
                : 'calc(54px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.03em', lineHeight: 0.92,
            }} />
          </div>
          {/* Selo */}
          <div style={{
            border: '1.5px solid currentColor',
            padding: '9px 13px',
            transform: 'rotate(-13deg)',
            textAlign: 'center',
            flexShrink: 0, marginTop: 6,
            fontSize: 'calc(10px * var(--ig-small-scale, 1))',
            fontWeight: 'var(--ig-weight-small)',
            letterSpacing: '0.2em',
            lineHeight: 1.7,
            userSelect: 'none',
          }}>
            O P E N<br />S O U R C E
          </div>
        </div>

        {/* Grade de specs */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {rows.map((n) => (
            <div key={n} style={{
              display: 'flex', gap: 24, alignItems: 'center',
              padding: `${format === 'story' ? 14 : 10}px 0`,
              borderBottom: '1px solid currentColor',
              borderTop: n === '1' ? '1px solid currentColor' : undefined,
            }}>
              <IgEdit value={data['r' + n + 'l']} onChange={onEdit('r' + n + 'l')} style={{
                fontSize: 'calc(10px * var(--ig-small-scale, 1))',
                letterSpacing: '0.18em', color: 'var(--fg-2)',
                flexShrink: 0, minWidth: format === 'story' ? 190 : 150,
              }} />
              <IgEdit value={data['r' + n + 'v']} onChange={onEdit('r' + n + 'v')} style={{
                fontSize: 'calc(16px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.005em',
              }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─────────── P07 · Matriz comparativa ────────────────────────────────
// Tabela 3 colunas (atributo + 2 produtos) com indicadores simbólicos
// (✓ / — / ×). Layout primitivo novo: "Comparison matrix / diff table" —
// primeira tabela tabular real do projeto, com legenda dos símbolos.
function IgProduct07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const rows = ['1', '2', '3', '4', '5'];
  const colW = isStory ? '140px' : '110px';
  return (
    <>
      <IgHeader index="P · 07" label="C O M P A R A T I V O" />
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
              ? 'calc(44px * var(--ig-size-scale, 1))'
              : 'calc(36px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: 30,
          }}
        />
        {/* Cabeçalho */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `1fr ${colW} ${colW}`,
            padding: '0 0 14px 0',
            borderBottom: '1.5px solid currentColor',
            alignItems: 'baseline',
            gap: 24,
          }}
        >
          <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>
            A T R I B U T O
          </span>
          <IgEdit
            value={data.colA}
            onChange={onEdit('colA')}
            style={{
              fontSize: isStory
                ? 'calc(26px * var(--ig-size-scale, 1))'
                : 'calc(20px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.015em',
              textAlign: 'center',
            }}
          />
          <IgEdit
            value={data.colB}
            onChange={onEdit('colB')}
            style={{
              fontSize: isStory
                ? 'calc(26px * var(--ig-size-scale, 1))'
                : 'calc(20px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.015em',
              textAlign: 'center',
            }}
          />
        </div>
        {/* Linhas */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {rows.map((n) => (
            <div
              key={n}
              style={{
                display: 'grid',
                gridTemplateColumns: `1fr ${colW} ${colW}`,
                alignItems: 'center',
                gap: 24,
                padding: `${isStory ? 18 : 14}px 0`,
                borderBottom: '1px solid currentColor',
              }}
            >
              <IgEdit
                value={data['attr' + n]}
                onChange={onEdit('attr' + n)}
                style={{
                  fontSize: isStory
                    ? 'calc(20px * var(--ig-size-scale, 1))'
                    : 'calc(16px * var(--ig-size-scale, 1))',
                  fontWeight: 'var(--ig-weight)',
                  letterSpacing: '-0.005em',
                  lineHeight: 1.35,
                }}
              />
              <IgEdit
                value={data['a' + n]}
                onChange={onEdit('a' + n)}
                style={{
                  fontSize: isStory
                    ? 'calc(28px * var(--ig-size-scale, 1))'
                    : 'calc(22px * var(--ig-size-scale, 1))',
                  textAlign: 'center',
                  fontWeight: 'var(--ig-weight-light)',
                  lineHeight: 1,
                }}
              />
              <IgEdit
                value={data['b' + n]}
                onChange={onEdit('b' + n)}
                style={{
                  fontSize: isStory
                    ? 'calc(28px * var(--ig-size-scale, 1))'
                    : 'calc(22px * var(--ig-size-scale, 1))',
                  textAlign: 'center',
                  fontWeight: 'var(--ig-weight-light)',
                  lineHeight: 1,
                }}
              />
            </div>
          ))}
        </div>
        {/* Legenda */}
        <div
          style={{
            marginTop: 18,
            display: 'flex',
            gap: isStory ? 32 : 24,
            fontSize: 'calc(11px * var(--ig-small-scale, 1))',
            letterSpacing: '0.16em',
            color: 'var(--fg-2)',
            fontWeight: 'var(--ig-weight-small)',
          }}
        >
          <span>✓  S U P O R T A D O</span>
          <span>—  P A R C I A L</span>
          <span>×  N Ã O</span>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.tag} />
    </>
  );
}

// ─── PRD08 · Pilha de camadas · arquitetura ──────────────────────────
// Quatro camadas horizontais empilhadas representando a stack do
// produto. Opacidade decresce nas camadas inferiores (efeito de
// profundidade). Layout primitivo novo: "Layered stack / system
// architecture".
function IgProduct08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const layers = data.layers || [
    { level: 'L4', name: 'Interface',    desc: 'CLI · Desktop Tauri · Web (futuro)' },
    { level: 'L3', name: 'Domínio',      desc: 'Lógica de chaves · assinaturas · backup' },
    { level: 'L2', name: 'Criptografia', desc: 'Ed25519 · AES-256-GCM · Argon2id' },
    { level: 'L1', name: 'Hardware',     desc: 'Secure Element opcional · Shield (NFC + USB-C)' },
  ];
  return (
    <>
      <IgHeader index="P · 08" label="A R Q U I T E T U R A" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ marginBottom: 30 }}>
          <IgEdit value={data.product || 'Vault'} onChange={onEdit('product')}
            style={{
              fontSize: isStory
                ? 'calc(80px * var(--ig-size-scale, 1))'
                : 'calc(64px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)', letterSpacing: '-0.035em',
              display: 'block',
            }} />
          <IgEdit value={data.subtitle || 'Quatro camadas — do hardware à interface.'}
            onChange={onEdit('subtitle')}
            style={{
              display: 'block', marginTop: 8,
              fontSize: 'calc(17px * var(--ig-size-scale, 1))',
              color: 'var(--fg-2)', fontWeight: 'var(--ig-weight-light)',
            }} />
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {layers.map((ly, i) => (
            <div key={i} style={{
              borderTop: '1.5px solid currentColor',
              borderBottom: i === layers.length - 1 ? '1.5px solid currentColor' : 'none',
              padding: isStory ? '22px 28px' : '18px 22px',
              display: 'flex', alignItems: 'center', gap: 24,
              opacity: 1 - i * 0.12,
            }}>
              <IgEdit value={ly.level} onChange={(v) => {
                const next = layers.slice(); next[i] = { ...next[i], level: v };
                onEdit('layers')(next);
              }} style={{
                fontSize: isStory
                  ? 'calc(48px * var(--ig-size-scale, 1))'
                  : 'calc(36px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight-light)', letterSpacing: '-0.04em',
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--fg-2)', flexShrink: 0, minWidth: isStory ? 80 : 60,
              }} />
              <IgEdit value={ly.name} onChange={(v) => {
                const next = layers.slice(); next[i] = { ...next[i], name: v };
                onEdit('layers')(next);
              }} style={{
                fontSize: isStory
                  ? 'calc(30px * var(--ig-size-scale, 1))'
                  : 'calc(24px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)', letterSpacing: '-0.02em',
                flexShrink: 0, minWidth: isStory ? 220 : 170,
              }} />
              <IgEdit value={ly.desc} onChange={(v) => {
                const next = layers.slice(); next[i] = { ...next[i], desc: v };
                onEdit('layers')(next);
              }} style={{
                fontSize: 'calc(15px * var(--ig-size-scale, 1))',
                color: 'var(--fg-2)', flex: 1,
                fontWeight: 'var(--ig-weight-light)',
              }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right="P · 0 8" />
    </>
  );
}

Object.assign(window, {
  IgProduct01, IgProduct02, IgProduct03, IgProduct04, IgProduct05, IgProduct06, IgProduct07, IgProduct08,
});
