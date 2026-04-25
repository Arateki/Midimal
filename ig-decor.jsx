// ig-decor.jsx — Camadas decorativas dos posts Instagram Arateki
// Cada efeito recebe `intensity` (0.1–2) para controle individual de força.
// IgDecor recebe um objeto `decor` com shape { grid, gridI, dots, dotsI, ... }

const { useEffect, useRef, useMemo } = React;

// ── Grid tracejado ──────────────────────────────────────────────────
function DecorGrid({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.18 * intensity, color: 'inherit' }}>
      <defs>
        <pattern id="ig-grid" width="135" height="135" patternUnits="userSpaceOnUse">
          <path d="M 135 0 L 0 0 0 135" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="2 4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ig-grid)" />
    </svg>
  );
}

// ── Grade de pontos ──────────────────────────────────────────────────
function DecorDots({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.22 * intensity, color: 'inherit' }}>
      <defs>
        <pattern id="ig-dots" width="54" height="54" patternUnits="userSpaceOnUse">
          <circle cx="27" cy="27" r="1.8" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ig-dots)" />
    </svg>
  );
}

// ── Diagonais (hachura técnica 45°) ─────────────────────────────────
function DecorDiagonals({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.09 * intensity, color: 'inherit' }}>
      <defs>
        <pattern id="ig-diag" width="24" height="24" patternUnits="userSpaceOnUse">
          <line x1="-4" y1="28" x2="28" y2="-4" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ig-diag)" />
    </svg>
  );
}

// ── Scan lines ───────────────────────────────────────────────────────
function DecorScanlines({ intensity = 1 }) {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'repeating-linear-gradient(to bottom, currentColor 0, currentColor 1px, transparent 1px, transparent 5px)',
      opacity: 0.07 * intensity,
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
}

// ── Marcas de canto ──────────────────────────────────────────────────
function DecorCorners({ intensity = 1 }) {
  const o = 80, s = 52, W = 1080, H = 1080;
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.4 * intensity, color: 'inherit' }}>
      <path d={`M ${o+s} ${o} L ${o} ${o} L ${o} ${o+s}`}             fill="none" stroke="currentColor" strokeWidth="2" />
      <path d={`M ${W-o-s} ${o} L ${W-o} ${o} L ${W-o} ${o+s}`}       fill="none" stroke="currentColor" strokeWidth="2" />
      <path d={`M ${o+s} ${H-o} L ${o} ${H-o} L ${o} ${H-o-s}`}       fill="none" stroke="currentColor" strokeWidth="2" />
      <path d={`M ${W-o-s} ${H-o} L ${W-o} ${H-o} L ${W-o} ${H-o-s}`} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// ── Vinheta ──────────────────────────────────────────────────────────
function DecorVignette({ theme, intensity = 1 }) {
  const c = theme === 'dark' ? '255,255,255' : '0,0,0';
  const a = Math.min(1, 0.55 * intensity);
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(${c},${a}) 100%)`,
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
}

// ── Marca d'água ─────────────────────────────────────────────────────
function DecorWatermark({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.045 * intensity, color: 'inherit' }}>
      <defs>
        <pattern id="ig-wm" width="360" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(-22)">
          <text x="20" y="82" fontFamily="Montserrat, system-ui, sans-serif" fontSize="52"
            fontWeight="600" letterSpacing="14" fill="currentColor">ARATEKI</text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ig-wm)" />
    </svg>
  );
}

// ── Rede neural / partículas ────────────────────────────────────────
function seededPoints(seed, count, W, H) {
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const pts = [];
  for (let i = 0; i < count; i++) {
    pts.push({ x: rand() * W, y: rand() * H, r: 0.8 + rand() * 1.6,
               vx: (rand() - 0.5) * 0.18, vy: (rand() - 0.5) * 0.18 });
  }
  return pts;
}

function DecorParticles({ theme, animated, seed = 7, intensity = 1 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const W = 1080, H = 1080;
  const count = Math.round(36 * Math.max(0.2, intensity));
  const maxDist = 220;

  const pointsRef = useRef(null);
  if (pointsRef.current === null) pointsRef.current = seededPoints(seed, count, W, H);

  useEffect(() => {
    if (pointsRef.current.length !== count) pointsRef.current = seededPoints(seed, count, W, H);
  }, [count, seed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = W; canvas.height = H;
    const dotColor = theme === 'dark' ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.72)';
    const lineBase = theme === 'dark' ? '255,255,255' : '0,0,0';

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const pts = pointsRef.current;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            ctx.strokeStyle = `rgba(${lineBase},${(1 - d / maxDist) * 0.35})`;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = dotColor;
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
    };

    if (!animated) { draw(); return () => {}; }
    const tick = () => {
      const pts = pointsRef.current;
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
      }
      draw(); rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [theme, animated, count]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
      mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
      opacity: Math.min(1, 0.75 * intensity),
    }} />
  );
}

// ── Glow radial ──────────────────────────────────────────────────────
function DecorGlow({ theme, intensity = 1 }) {
  const i = intensity;
  const color = theme === 'dark'
    ? `radial-gradient(circle at 78% 22%, rgba(255,255,255,${0.10*i}), transparent 55%), radial-gradient(circle at 22% 82%, rgba(255,255,255,${0.08*i}), transparent 55%)`
    : `radial-gradient(circle at 78% 22%, rgba(0,0,0,${0.06*i}), transparent 55%), radial-gradient(circle at 22% 82%, rgba(0,0,0,${0.05*i}), transparent 55%)`;
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, background: color, pointerEvents: 'none', zIndex: 0,
    }} />
  );
}

// ── Wrapper público ──────────────────────────────────────────────────
// `decor` = { grid, gridI, dots, dotsI, diagonals, diagonalsI,
//             scanlines, scanlinesI, corners, cornersI, vignette, vignetteI,
//             watermark, watermarkI, particles, particlesI, glow, glowI }
function IgDecor({ decor = {}, theme = 'light', seed = 7 }) {
  const {
    grid, gridI = 1, dots, dotsI = 1, diagonals, diagonalsI = 1,
    scanlines, scanlinesI = 1, corners, cornersI = 1,
    vignette, vignetteI = 1, watermark, watermarkI = 1,
    particles, particlesI = 1, glow, glowI = 1,
  } = decor;

  if (!grid && !dots && !diagonals && !scanlines && !corners && !vignette && !watermark && !particles && !glow) return null;

  return (
    <>
      {watermark  && <DecorWatermark intensity={watermarkI} />}
      {grid       && <DecorGrid intensity={gridI} />}
      {dots       && <DecorDots intensity={dotsI} />}
      {diagonals  && <DecorDiagonals intensity={diagonalsI} />}
      {scanlines  && <DecorScanlines intensity={scanlinesI} />}
      {corners    && <DecorCorners intensity={cornersI} />}
      {vignette   && <DecorVignette theme={theme} intensity={vignetteI} />}
      {particles  && <DecorParticles theme={theme} animated={!!glow} seed={seed} intensity={particlesI} />}
      {glow       && <DecorGlow theme={theme} intensity={glowI} />}
    </>
  );
}

Object.assign(window, { IgDecor });
