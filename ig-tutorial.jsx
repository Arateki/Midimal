// ig-tutorial.jsx — 6 variações de template "Tutorial / Como fazer"
// Conteúdo instrucional: passos numerados, comparações, CLI, dica única, checklist, fluxo.

// ─────────── T01 · Passos numerados ─────────────────────────────────
// Título editorial + 4 passos com número como elemento tipográfico secundário.
function IgTutorial01({ data, onEdit, format = 'square' }) {
  const steps = [
    { key: 'step1', n: '01' },
    { key: 'step2', n: '02' },
    { key: 'step3', n: '03' },
    { key: 'step4', n: '04' },
  ];
  return (
    <>
      <IgHeader index="T · 01" label="T U T O R I A L" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <IgEdit value={data.category} onChange={onEdit('category')}
          className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 20 }} />
        <IgEdit as="p" multiline value={data.title} onChange={onEdit('title')} style={{
          fontSize: format === 'story'
            ? 'calc(52px * var(--ig-size-scale, 1))'
            : 'calc(42px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: 44,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {steps.map(({ key, n }) => (
            <div key={key} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <span style={{
                fontSize: 'calc(11px * var(--ig-small-scale, 1))',
                fontWeight: 'var(--ig-weight-small)',
                letterSpacing: '0.2em', color: 'var(--fg-2)',
                flexShrink: 0, paddingTop: '0.25em', minWidth: 22,
              }}>{n}</span>
              <IgEdit value={data[key]} onChange={onEdit(key)} style={{
                fontSize: 'calc(19px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                letterSpacing: '-0.01em', lineHeight: 1.3,
              }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.tag} />
    </>
  );
}

// ─────────── T02 · Antes × Depois ────────────────────────────────────
// Dois painéis separados por divisor vertical. Problema vs. solução.
function IgTutorial02({ data, onEdit, format = 'square' }) {
  return (
    <>
      <IgHeader index="T · 02" label="C O M P A R A Ç Ã O" showLogo />
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
          marginBottom: 40,
        }} />
        <div style={{ display: 'flex', gap: 40, flex: 1, alignItems: 'stretch' }}>
          {/* Antes */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
            <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>A N T E S</span>
            <IgEdit as="p" multiline value={data.before} onChange={onEdit('before')} style={{
              fontSize: 'calc(17px * var(--ig-size-scale, 1))',
              letterSpacing: '-0.005em', lineHeight: 1.55,
              color: 'var(--fg-2)',
            }} />
          </div>
          {/* Divisor */}
          <div style={{ width: 1, background: 'currentColor', opacity: 0.2, flexShrink: 0 }} />
          {/* Depois */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
            <span className="ig-meta">D E P O I S</span>
            <IgEdit as="p" multiline value={data.after} onChange={onEdit('after')} style={{
              fontSize: 'calc(17px * var(--ig-size-scale, 1))',
              letterSpacing: '-0.005em', lineHeight: 1.55,
            }} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── T03 · Terminal / CLI ────────────────────────────────────
// Bloco de comandos em fonte mono com prompt "$". Estilo técnico direto.
function IgTutorial03({ data, onEdit, format = 'square' }) {
  const fontSize = format === 'story'
    ? 'calc(26px * var(--ig-size-scale, 1))'
    : 'calc(21px * var(--ig-size-scale, 1))';
  const lineH = format === 'story' ? 52 : 44;
  const lines = ['line1', 'line2', 'line3', 'line4', 'line5'];
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Topo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 10 }}>
              T · 03  —  T E R M I N A L
            </span>
            <IgEdit value={data.context} onChange={onEdit('context')} style={{
              fontSize: format === 'story'
                ? 'calc(36px * var(--ig-size-scale, 1))'
                : 'calc(28px * var(--ig-size-scale, 1))',
              fontWeight: 'var(--ig-weight)',
              letterSpacing: '-0.02em',
            }} />
          </div>
          <IgLogo size="sm" />
        </div>

        {/* Bloco de código */}
        <div style={{
          fontFamily: '"Courier New", Courier, monospace',
          borderTop: '1px solid currentColor',
          borderBottom: '1px solid currentColor',
          padding: `${format === 'story' ? 40 : 28}px 0`,
        }}>
          {lines.map((key) => data[key] ? (
            <div key={key} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              height: lineH,
            }}>
              <span style={{ color: 'var(--fg-2)', fontSize, userSelect: 'none', flexShrink: 0 }}>$</span>
              <IgEdit value={data[key]} onChange={onEdit(key)} style={{ fontSize, letterSpacing: '0.01em' }} />
            </div>
          ) : null)}
        </div>

        <IgFooter left={data.tag} right="A R A T E K I" />
      </div>
    </>
  );
}

// ─────────── T04 · Destaque único ────────────────────────────────────
// Uma só dica em escala máxima. Zero ruído, máximo impacto.
function IgTutorial04({ data, onEdit, format = 'square' }) {
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Topo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IgEdit value={data.category} onChange={onEdit('category')}
            className="ig-meta" style={{ color: 'var(--fg-2)' }} />
          <IgLogo size="sm" />
        </div>

        {/* Dica */}
        <div>
          <IgEdit value={data.label} onChange={onEdit('label')} style={{
            display: 'block',
            fontSize: 'calc(11px * var(--ig-small-scale, 1))',
            fontWeight: 'var(--ig-weight-small)',
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'var(--fg-2)', marginBottom: 20,
          }} />
          <IgEdit as="p" multiline value={data.tip} onChange={onEdit('tip')} style={{
            fontSize: format === 'story'
              ? 'calc(68px * var(--ig-size-scale, 1))'
              : format === 'portrait'
              ? 'calc(58px * var(--ig-size-scale, 1))'
              : 'calc(52px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
          }} />
        </div>

        {/* Rodapé */}
        <div>
          <IgRule strong={false} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
            <IgEdit value={data.context} onChange={onEdit('context')}
              style={{ fontSize: 'calc(13px * var(--ig-small-scale, 1))', color: 'var(--fg-2)', letterSpacing: '0.06em' }} />
            <span className="ig-meta" style={{ color: 'var(--fg-2)' }}>A R A T E K I</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────── T05 · Checklist ─────────────────────────────────────────
// Lista de verificação com caixas quadradas. Pré-flight antes de publicar ou lançar.
function IgTutorial05({ data, onEdit, format = 'square' }) {
  const items = ['item1', 'item2', 'item3', 'item4', 'item5'];
  return (
    <>
      <IgHeader index="T · 05" label="C H E C K L I S T" showLogo />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: format === 'story' ? 280 : 220,
        paddingBottom: format === 'story' ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data.title} onChange={onEdit('title')} style={{
          fontSize: format === 'story'
            ? 'calc(48px * var(--ig-size-scale, 1))'
            : 'calc(38px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: 40,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {items.map((key) => data[key] ? (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                width: 18, height: 18,
                border: '1px solid currentColor',
                flexShrink: 0, opacity: 0.5,
              }} />
              <IgEdit value={data[key]} onChange={onEdit(key)} style={{
                fontSize: 'calc(18px * var(--ig-size-scale, 1))',
                letterSpacing: '-0.01em', lineHeight: 1.3,
              }} />
            </div>
          ) : null)}
        </div>
      </div>
      <IgFooter left={data.tag} right="A R A T E K I" />
    </>
  );
}

// ─────────── T06 · Fluxo em 3 nós ────────────────────────────────────
// Processo dividido em 3 etapas com separadores e numeração. Diagrama tipográfico.
function IgTutorial06({ data, onEdit, format = 'square' }) {
  const nodes = ['node1', 'node2', 'node3'];
  const isStory = format === 'story';
  return (
    <>
      <IgHeader index="T · 06" label="F L U X O" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit value={data.category} onChange={onEdit('category')}
          className="ig-meta" style={{ color: 'var(--fg-2)', marginBottom: 14 }} />
        <IgEdit as="p" multiline value={data.title} onChange={onEdit('title')} style={{
          fontSize: isStory
            ? 'calc(50px * var(--ig-size-scale, 1))'
            : 'calc(40px * var(--ig-size-scale, 1))',
          fontWeight: 'var(--ig-weight)',
          letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: 52,
        }} />
        {/* Nós */}
        <div style={{
          display: 'flex',
          flexDirection: isStory ? 'column' : 'row',
          flex: 1, alignItems: 'stretch',
        }}>
          {nodes.map((key, i) => (
            <div key={key} style={{
              flex: 1,
              display: 'flex', flexDirection: 'column',
              padding: isStory ? '24px 0' : `0 ${i === 0 ? '0' : '28px'} 0 ${i === 0 ? '0' : '28px'}`,
              borderLeft: !isStory && i > 0 ? '1px solid currentColor' : undefined,
              borderTop: isStory && i > 0 ? '1px solid currentColor' : undefined,
            }}>
              <span style={{
                fontSize: 'calc(11px * var(--ig-small-scale, 1))',
                fontWeight: 'var(--ig-weight-small)',
                letterSpacing: '0.2em', color: 'var(--fg-2)',
                marginBottom: 18,
              }}>0{i + 1}</span>
              <IgEdit as="p" multiline value={data[key]} onChange={onEdit(key)} style={{
                fontSize: 'calc(18px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                letterSpacing: '-0.01em', lineHeight: 1.45,
              }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.tag} />
    </>
  );
}

// ─────────── T07 · Árvore de decisão ──────────────────────────────────
// Pergunta-raiz em moldura. Ramos SIM/NÃO indentados à direita com borda
// vertical contínua e pequenos conectores horizontais. Layout primitivo
// novo: "Decision tree / branching flowchart" — primeira hierarquia em
// árvore vertical do projeto, distinta do fluxo linear de E05/T06.
function IgTutorial07({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const indent = isStory ? 36 : 28;
  const branchPad = isStory ? 26 : 20;
  return (
    <>
      <IgHeader index="T · 07" label="D E C I S Ã O" />
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
              ? 'calc(48px * var(--ig-size-scale, 1))'
              : 'calc(38px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)',
            letterSpacing: '-0.025em',
            lineHeight: 1.12,
            marginBottom: 32,
          }}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Pergunta-raiz */}
          <div
            style={{
              padding: isStory ? '28px 32px' : '22px 26px',
              border: '1.5px solid currentColor',
              display: 'flex',
              alignItems: 'baseline',
              gap: 18,
            }}
          >
            <span className="ig-meta" style={{ color: 'var(--fg-2)', flexShrink: 0 }}>
              S E
            </span>
            <IgEdit
              as="p"
              multiline
              value={data.q1}
              onChange={onEdit('q1')}
              style={{
                fontSize: isStory
                  ? 'calc(28px * var(--ig-size-scale, 1))'
                  : 'calc(22px * var(--ig-size-scale, 1))',
                fontWeight: 'var(--ig-weight)',
                letterSpacing: '-0.015em',
                lineHeight: 1.3,
                flex: 1,
              }}
            />
          </div>
          {/* Eixo vertical descendo da raiz para os ramos */}
          <div style={{ paddingLeft: indent, marginTop: -1 }}>
            <div
              style={{
                borderLeft: '1.5px solid currentColor',
                paddingLeft: 0,
              }}
            >
              {/* Ramo SIM */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: branchPad,
                  padding: `${isStory ? 22 : 16}px 0 ${isStory ? 22 : 16}px ${branchPad}px`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: isStory ? 38 : 30,
                    width: branchPad - 4,
                    height: 1,
                    background: 'currentColor',
                  }}
                />
                <span
                  className="ig-meta"
                  style={{
                    flexShrink: 0,
                    paddingTop: isStory ? 6 : 4,
                    minWidth: isStory ? 90 : 70,
                  }}
                >
                  S I M  →
                </span>
                <div style={{ flex: 1 }}>
                  <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
                    R E S U L T A D O
                  </span>
                  <IgEdit
                    as="p"
                    multiline
                    value={data.yes}
                    onChange={onEdit('yes')}
                    style={{
                      fontSize: isStory
                        ? 'calc(28px * var(--ig-size-scale, 1))'
                        : 'calc(22px * var(--ig-size-scale, 1))',
                      fontWeight: 'var(--ig-weight)',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.3,
                    }}
                  />
                </div>
              </div>
              {/* Ramo NÃO */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: branchPad,
                  padding: `${isStory ? 22 : 16}px 0 ${isStory ? 22 : 16}px ${branchPad}px`,
                  position: 'relative',
                  borderTop: '1px solid currentColor',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: isStory ? 38 : 30,
                    width: branchPad - 4,
                    height: 1,
                    background: 'currentColor',
                  }}
                />
                <span
                  className="ig-meta"
                  style={{
                    flexShrink: 0,
                    paddingTop: isStory ? 6 : 4,
                    minWidth: isStory ? 90 : 70,
                  }}
                >
                  N Ã O  →
                </span>
                <div style={{ flex: 1 }}>
                  <span className="ig-meta" style={{ color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
                    R E S U L T A D O
                  </span>
                  <IgEdit
                    as="p"
                    multiline
                    value={data.no}
                    onChange={onEdit('no')}
                    style={{
                      fontSize: isStory
                        ? 'calc(28px * var(--ig-size-scale, 1))'
                        : 'calc(22px * var(--ig-size-scale, 1))',
                      fontWeight: 'var(--ig-weight)',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.3,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <IgFooter left="A R A T E K I" right={data.tag} />
    </>
  );
}

// ─── T08 · Árvore de diretórios · estilo `tree` ──────────────────────
// Hierarquia com box-drawing chars (├ └ │) em fonte mono, anotações
// laterais em sans-serif itálico. Layout primitivo novo: "File tree /
// directory listing".
function IgTutorial08({ data, onEdit, format = 'square' }) {
  const isStory = format === 'story';
  const tree = data.tree || [
    { prefix: '',         name: '~/.vault/',     annot: 'raiz do Vault' },
    { prefix: '├──',      name: 'id.key',        annot: 'chave privada · 0600' },
    { prefix: '├──',      name: 'id.pub',        annot: 'chave pública · 0644' },
    { prefix: '├──',      name: 'config.toml',   annot: 'preferências locais' },
    { prefix: '└──',      name: 'backup/',       annot: 'cópia offline' },
    { prefix: '    ├──',  name: 'seed.bip39',    annot: 'frase-semente · ler offline' },
    { prefix: '    └──',  name: 'shield.fw',     annot: 'firmware do Shield' },
  ];
  return (
    <>
      <IgHeader index="T · 08" label="E S T R U T U R A" />
      <div style={{
        position: 'absolute', inset: 0, padding: 'inherit',
        paddingTop: isStory ? 280 : 220,
        paddingBottom: isStory ? 140 : 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <IgEdit as="p" multiline value={data.title || 'Anatomia da pasta do Vault.'}
          onChange={onEdit('title')}
          style={{
            fontSize: isStory
              ? 'calc(44px * var(--ig-size-scale, 1))'
              : 'calc(36px * var(--ig-size-scale, 1))',
            fontWeight: 'var(--ig-weight)', letterSpacing: '-0.025em', lineHeight: 1.12,
            marginBottom: 32,
          }} />
        <div style={{
          flex: 1,
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: isStory
            ? 'calc(22px * var(--ig-size-scale, 1))'
            : 'calc(17px * var(--ig-size-scale, 1))',
          lineHeight: 1.7,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {tree.map((node, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'baseline', gap: 18,
            }}>
              <span style={{
                whiteSpace: 'pre',
                color: 'var(--fg-2)',
                flexShrink: 0,
              }}>
                {node.prefix}
              </span>
              <IgEdit value={node.name} onChange={(v) => {
                const next = tree.slice(); next[i] = { ...next[i], name: v };
                onEdit('tree')(next);
              }} style={{
                fontWeight: 'var(--ig-weight)',
                flexShrink: 0,
              }} />
              <IgEdit value={node.annot} onChange={(v) => {
                const next = tree.slice(); next[i] = { ...next[i], annot: v };
                onEdit('tree')(next);
              }} style={{
                color: 'var(--fg-2)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-sans)',
                fontSize: isStory
                  ? 'calc(16px * var(--ig-size-scale, 1))'
                  : 'calc(13px * var(--ig-size-scale, 1))',
                flex: 1, textAlign: 'right',
              }} />
            </div>
          ))}
        </div>
      </div>
      <IgFooter left="A R A T E K I" right="T · 0 8" />
    </>
  );
}

Object.assign(window, {
  IgTutorial01, IgTutorial02, IgTutorial03, IgTutorial04, IgTutorial05, IgTutorial06, IgTutorial07, IgTutorial08,
});
