// ig-common.jsx — Primitivos compartilhados para posts Instagram Arateki
// Todos os templates usam estes blocos para manter consistência.

// Monograma SVG inline (herda currentColor)
function IgMono({ size = 32, color }) {
  return (
    <span className="ig-mono" style={{ width: size, height: size, color: color || 'currentColor' }}>
      <svg viewBox="0 0 400 400" width={size} height={size} fill="currentColor" aria-hidden="true">
        <path d="M 60,340 L 200,60 L 200,71.3 L 65.8,340 Z" />
        <path d="M 340,340 L 200,60 L 200,71.3 L 334.2,340 Z" />
      </svg>
    </span>
  );
}

// Texto editável inline — contentEditable controlado
function IgEdit({ value, onChange, as = 'span', className = '', style, multiline = false, ...rest }) {
  const Tag = as;
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value]);
  return (
    <Tag
      ref={ref}
      className={`ig-edit ${className}`}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e) => onChange && onChange(e.currentTarget.innerText)}
      onKeyDown={(e) => {
        if (!multiline && e.key === 'Enter') {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      style={style}
      {...rest}
    />
  );
}

// Logotipo em tracking largo
function IgLogo({ size = 'md', className = '' }) {
  const cls = size === 'sm' ? 'ig-logo ig-logo-sm' : 'ig-logo';
  return <span className={`${cls} ${className}`}>A R A T E K I</span>;
}

// Régua horizontal
function IgRule({ strong = true, style }) {
  return <div className={strong ? 'ig-rule' : 'ig-rule-thin'} style={style} />;
}

// Cabeçalho padrão "0X — LABEL" + logo à direita
function IgHeader({ index, label, showLogo = true, showMono = false, inverse = false, children }) {
  return (
    <div className="ig-chrome-top" style={{ position: 'absolute' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, pointerEvents: 'auto' }}>
        {showMono && <IgMono size={28} />}
        {label !== undefined && (
          <span className="ig-meta">
            {index && <strong>{index}</strong>}
            {index && label && <span>{'  —  '}</span>}
            {label}
          </span>
        )}
        {children}
      </div>
      {showLogo && <IgLogo size="sm" />}
    </div>
  );
}

// Rodapé padrão: versão / ano / monograma
function IgFooter({ left, right, mono = false, rule = false }) {
  return (
    <>
      {rule && (
        <div
          style={{
            position: 'absolute',
            left: 'inherit',
            right: 'inherit',
            bottom: 120,
          }}
        />
      )}
      <div className="ig-chrome-bottom" style={{ position: 'absolute' }}>
        <div className="ig-footer-rail">{left || ''}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {mono && <IgMono size={20} />}
          <div className="ig-footer-rail">{right || ''}</div>
        </div>
      </div>
    </>
  );
}

// Canvas base — aplica tema, tamanho, fonte
function IgCanvas({ format = 'square', theme = 'light', weight = 400, className = '', style, children }) {
  const sizeCls =
    format === 'story' ? 'ig-size-story' : format === 'portrait' ? 'ig-size-portrait' : 'ig-size-square';
  return (
    <div
      className={`ig-canvas ${sizeCls} ${theme === 'dark' ? 'inverse' : ''} ${className}`}
      style={{ fontWeight: weight, ...style }}
      data-theme={theme}
    >
      {children}
    </div>
  );
}

// Dimensões nativas por formato
const IG_DIMS = {
  square:    { w: 1080, h: 1080 },
  portrait:  { w: 1080, h: 1350 },
  story:     { w: 1080, h: 1920 },
  landscape: { w: 1920, h: 1080 },
  banner:    { w: 1920, h: 640 },
};

// Wrapper que renderiza um IgCanvas em seu tamanho nativo e escala para
// o tamanho do artboard via transform. `artboardW` vem do DCArtboard.
function IgArtboard({ format = 'square', artboardW, children }) {
  const d = IG_DIMS[format];
  const scale = artboardW / d.w;
  return (
    <div className="ig-scale-wrap" style={{ width: artboardW, height: d.h * scale }}>
      <div
        style={{
          width: d.w,
          height: d.h,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { IgMono, IgEdit, IgLogo, IgRule, IgHeader, IgFooter, IgCanvas, IgArtboard, IG_DIMS });
