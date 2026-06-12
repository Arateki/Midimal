import React from 'react'
import ReactDOM from 'react-dom'

// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:36px;height:36px;border-radius:10px;cursor:default;font-size:18px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-tabs{position:sticky;top:-2px;z-index:2;display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));
    gap:3px;margin:-2px -2px 2px;padding:4px 2px 6px;
    background:linear-gradient(to bottom,rgba(250,249,247,.96),rgba(250,249,247,.86))}
  .twk-tab{appearance:none;border:0;border-radius:7px;height:24px;padding:0 6px;
    background:rgba(0,0,0,.055);color:rgba(41,38,27,.66);
    font:inherit;font-weight:600;cursor:default;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .twk-tab:hover{background:rgba(0,0,0,.08);color:#29261b}
  .twk-tab[data-on="1"]{background:rgba(41,38,27,.88);color:#fff;
    box-shadow:0 1px 2px rgba(0,0,0,.14)}
  .twk-tab-panel{display:flex;flex-direction:column;gap:10px}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  textarea.twk-field{height:86px;resize:vertical;padding:7px 8px;line-height:1.35}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider-line{display:flex;align-items:center;gap:8px}
  .twk-slider-line .twk-slider{flex:1;min-width:0}
  .twk-slider-input{width:52px;height:24px;border:.5px solid rgba(0,0,0,.1);
    border-radius:7px;background:rgba(255,255,255,.62);font:inherit;
    font-variant-numeric:tabular-nums;text-align:right;padding:0 6px;
    color:inherit;outline:none;-moz-appearance:textfield}
  .twk-slider-input:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.88)}
  .twk-slider-input::-webkit-inner-spin-button,.twk-slider-input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;height:22px;
    border-radius:6px;cursor:default;padding:0}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-color-pop{position:fixed;z-index:2147483647;width:224px;padding:10px;
    border:.5px solid rgba(0,0,0,.12);border-radius:12px;
    background:rgba(250,249,247,.96);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    box-shadow:0 12px 42px rgba(0,0,0,.22),0 1px 0 rgba(255,255,255,.65) inset}
  .twk-color-area{position:relative;height:132px;border-radius:8px;overflow:hidden;
    box-shadow:inset 0 0 0 .5px rgba(0,0,0,.16);cursor:crosshair}
  .twk-color-dot{position:absolute;width:12px;height:12px;border:2px solid #fff;border-radius:50%;
    box-shadow:0 0 0 1px rgba(0,0,0,.35),0 1px 4px rgba(0,0,0,.35);
    transform:translate(-6px,-6px);pointer-events:none}
  .twk-hue{appearance:none;-webkit-appearance:none;width:100%;height:10px;margin:10px 0 8px;
    border-radius:999px;outline:none;background:linear-gradient(to right,red,#ff0,#0f0,#0ff,#00f,#f0f,red)}
  .twk-hue::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;
    border-radius:50%;background:#fff;border:.5px solid rgba(0,0,0,.2);box-shadow:0 1px 4px rgba(0,0,0,.25)}
  .twk-hue::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.2);box-shadow:0 1px 4px rgba(0,0,0,.25)}
  .twk-color-line{display:flex;align-items:center;gap:8px}
  .twk-color-preview{width:26px;height:26px;border-radius:7px;border:.5px solid rgba(0,0,0,.14);flex-shrink:0}
  .twk-color-hex{height:26px;flex:1;min-width:0;border:.5px solid rgba(0,0,0,.1);
    border-radius:7px;background:rgba(255,255,255,.72);font:inherit;text-transform:uppercase;
    padding:0 8px;color:inherit;outline:none}
  .twk-color-presets{display:grid;grid-template-columns:repeat(8,1fr);gap:5px;margin-top:10px}
  .twk-color-preset{appearance:none;border:.5px solid rgba(0,0,0,.14);border-radius:5px;
    height:18px;padding:0;cursor:default}
  .twk-ball{position:fixed;z-index:2147483646;width:40px;height:40px;
    border-radius:50%;background:rgba(250,249,247,.82);color:#29261b;
    -webkit-backdrop-filter:blur(16px) saturate(160%);backdrop-filter:blur(16px) saturate(160%);
    border:.5px solid rgba(255,255,255,.55);
    box-shadow:0 2px 12px rgba(0,0,0,.16),0 1px 0 rgba(255,255,255,.5) inset;
    display:flex;align-items:center;justify-content:center;
    cursor:grab;user-select:none;transition:transform .15s,box-shadow .15s}
  .twk-ball:hover{transform:scale(1.07);box-shadow:0 4px 20px rgba(0,0,0,.22),0 1px 0 rgba(255,255,255,.5) inset}
  .twk-ball:active{cursor:grabbing}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  const setTweak = React.useCallback((key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [mode, setMode] = React.useState('panel'); // 'panel' | 'ball'
  const panelRef = React.useRef(null);
  const ballRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const dragHappened = React.useRef(false);
  const PAD = 16;

  const activeRef = () => (mode === 'panel' ? panelRef : ballRef);

  const clampToViewport = React.useCallback(() => {
    const el = activeRef().current;
    if (!el) return;
    const w = el.offsetWidth, h = el.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    el.style.right = offsetRef.current.x + 'px';
    el.style.bottom = offsetRef.current.y + 'px';
  }, [mode]);

  React.useEffect(() => {
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [mode, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setMode('panel');
      else if (t === '__deactivate_edit_mode') setMode('ball');
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const startDrag = (e, el) => {
    if (!el) return;
    dragHappened.current = false;
    const r = el.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragHappened.current = true;
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const onPanelDrag = (e) => startDrag(e, panelRef.current);
  const onBallDrag = (e) => { e.preventDefault(); startDrag(e, ballRef.current); };
  const restore = () => { if (!dragHappened.current) setMode('panel'); };

  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      {mode === 'panel' ? (
        <div ref={panelRef} className="twk-panel"
             style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
          <div className="twk-hd" onPointerDown={onPanelDrag}>
            <b>{title}</b>
            <button className="twk-x" aria-label="Minimize tweaks"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => setMode('ball')}>✕</button>
          </div>
          <div className="twk-body">{children}</div>
        </div>
      ) : (
        <div ref={ballRef} className="twk-ball"
             style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}
             onPointerDown={onBallDrag}
             onClick={restore}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
               strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
               style={{ pointerEvents: 'none' }}>
            <circle cx="8" cy="8" r="2.5"/>
            <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3 3l1.4 1.4M11.6 11.6l1.4 1.4M11.6 4.4L13 3M3 13l1.4-1.4"/>
          </svg>
        </div>
      )}
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function TweakTabs({ value, options, onChange, children }) {
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const panels = React.Children.toArray(children).filter(React.isValidElement);
  const active = panels.find((child) => child?.props?.value === value) || panels[0];
  return (
    <>
      <div className="twk-tabs" role="tablist">
        {opts.map((o) => (
          <button
            key={o.value}
            type="button"
            className="twk-tab"
            role="tab"
            data-on={o.value === value ? '1' : '0'}
            aria-selected={o.value === value}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
      {active}
    </>
  );
}

function TweakTab({ children }) {
  return <div className="twk-tab-panel" role="tabpanel">{children}</div>;
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  const [draft, setDraft] = React.useState(String(value));
  React.useEffect(() => setDraft(String(value)), [value]);
  const commit = (next) => {
    const n = Number(next);
    if (Number.isNaN(n)) {
      setDraft(String(value));
      return;
    }
    onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <div className="twk-slider-line">
        <input type="range" className="twk-slider" min={min} max={max} step={step}
               value={value} onChange={(e) => onChange(Number(e.target.value))} />
        <input type="text" className="twk-slider-input" inputMode="decimal"
               value={draft}
               onChange={(e) => setDraft(e.target.value)}
               onBlur={() => commit(draft)}
               onKeyDown={(e) => {
                 if (e.key === 'Enter') e.currentTarget.blur();
                 if (e.key === 'Escape') setDraft(String(value));
               }} />
      </div>
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, type = 'text', onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type={type} value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakTextarea({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <textarea className="twk-field" value={value} placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

function hexToRgb(hex) {
  const raw = String(hex || '').replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function rgbToHsv({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

function hsvToRgb({ h, s, v }) {
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

function positionColorPopover(anchor) {
  const PAD = 12, W = 224, H = 244;
  const r = anchor.getBoundingClientRect();
  const fitsRight = window.innerWidth - r.right >= W + PAD;
  const fitsLeft = r.left >= W + PAD;
  const left = fitsRight ? r.right + 8 : fitsLeft ? r.left - W - 8 : Math.max(PAD, window.innerWidth - W - PAD);
  const preferredTop = r.top + r.height / 2 - H / 2;
  const top = Math.max(PAD, Math.min(window.innerHeight - H - PAD, preferredTop));
  return { left, top };
}

function TweakColor({ label, value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState({ left: 0, top: 0 });
  const btnRef = React.useRef(null);
  const areaRef = React.useRef(null);
  const hsv = rgbToHsv(hexToRgb(value));
  const presets = ['#000000', '#ffffff', '#1f2937', '#6b7280', '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#7c3aed', '#b45309', '#0f172a'];

  const openPicker = () => {
    if (btnRef.current) setPos(positionColorPopover(btnRef.current));
    setOpen(true);
  };

  React.useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (btnRef.current && btnRef.current.contains(e.target)) return;
      if (e.target.closest?.('.twk-color-pop')) return;
      setOpen(false);
    };
    const reposition = () => btnRef.current && setPos(positionColorPopover(btnRef.current));
    window.addEventListener('pointerdown', close, true);
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    return () => {
      window.removeEventListener('pointerdown', close, true);
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    };
  }, [open]);

  const setHsv = (next) => onChange(rgbToHex(hsvToRgb(next)));
  const pickArea = (e) => {
    const r = areaRef.current.getBoundingClientRect();
    setHsv({ h: hsv.h, s: clamp01((e.clientX - r.left) / r.width), v: 1 - clamp01((e.clientY - r.top) / r.height) });
  };
  const startArea = (e) => {
    e.preventDefault();
    pickArea(e);
    const move = (ev) => pickArea(ev);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button ref={btnRef} type="button" className="twk-swatch" aria-label={label}
              style={{ background: value }} onClick={openPicker} />
      {open && ReactDOM.createPortal(
        <div className="twk-color-pop" style={{ left: pos.left, top: pos.top }}>
          <div ref={areaRef} className="twk-color-area" onPointerDown={startArea}
               style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsv.h}, 100%, 50%))` }}>
            <i className="twk-color-dot" style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }} />
          </div>
          <input className="twk-hue" type="range" min="0" max="360" step="1" value={Math.round(hsv.h)}
                 onChange={(e) => setHsv({ ...hsv, h: Number(e.target.value) })} />
          <div className="twk-color-line">
            <div className="twk-color-preview" style={{ background: value }} />
            <input className="twk-color-hex" value={value}
                   onChange={(e) => /^#[0-9a-fA-F]{6}$/.test(e.target.value) && onChange(e.target.value)} />
          </div>
          <div className="twk-color-presets">
            {presets.map((c) => <button key={c} type="button" className="twk-color-preset" style={{ background: c }} onClick={() => onChange(c)} />)}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

function TweakFile({ label, accept, multiple = false, onChange }) {
  const inputRef = React.useRef(null);
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) onChange(files);
          e.target.value = '';
        }}
      />
      <button type="button" className="twk-btn secondary" onClick={() => inputRef.current?.click()}>
        Upload
      </button>
    </div>
  );
}

export {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakTabs, TweakTab,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakTextarea, TweakNumber, TweakColor, TweakButton, TweakFile,
};
