import React, { useEffect, useRef, useMemo } from 'react'

// ig-decor.jsx — Camadas decorativas dos posts Instagram Arateki
// Cada efeito recebe `intensity` (0.1–2) para controle individual de força.
// IgDecor recebe um objeto `decor` com shape { grid, gridI, dots, dotsI, ... }

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

// ── Microgranulado ──────────────────────────────────────────────────
function DecorGrain({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.42, 0.18 * intensity), color: 'inherit' }}>
      <defs>
        <pattern id="ig-grain-a" width="19" height="23" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="7" r="0.9" fill="currentColor" />
          <circle cx="15" cy="17" r="0.7" fill="currentColor" />
        </pattern>
        <pattern id="ig-grain-b" width="31" height="29" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="22" r="0.8" fill="currentColor" />
          <circle cx="24" cy="8" r="0.6" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ig-grain-a)" />
      <rect width="100%" height="100%" fill="url(#ig-grain-b)" opacity="0.65" />
    </svg>
  );
}

// ── Contornos topográficos ──────────────────────────────────────────
function DecorTopography({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.28 * intensity, color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M -80 190 C 90 120 200 150 330 235 S 590 360 760 270 S 1030 95 1160 175" />
        <path d="M -120 260 C 60 180 210 210 340 300 S 570 440 760 345 S 1015 180 1160 250" />
        <path d="M -90 625 C 110 520 250 565 390 650 S 645 810 815 705 S 1000 560 1165 625" />
        <path d="M -150 735 C 60 630 235 670 385 755 S 660 900 840 805 S 1025 680 1160 735" />
        <path d="M 650 -70 C 565 105 595 235 710 350 S 875 555 790 720 S 620 930 720 1160" />
        <path d="M 775 -80 C 690 95 720 245 835 365 S 985 560 915 725 S 745 945 835 1160" />
      </g>
    </svg>
  );
}

// ── Eixos técnicos / régua ──────────────────────────────────────────
function DecorAxes({ intensity = 1 }) {
  const ticks = Array.from({ length: 11 }, (_, i) => 90 + i * 90);
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.9, 0.48 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M 80 540 H 1000" opacity="0.22" />
        <path d="M 540 80 V 1000" opacity="0.22" />
        <path d="M 500 540 H 580 M 540 500 V 580" opacity="0.55" />
        {ticks.map((x, i) => <path key={`t-${i}`} d={`M ${x} 72 V ${i % 2 ? 88 : 102} M ${x} 1008 V ${i % 2 ? 992 : 978}`} />)}
        {ticks.map((y, i) => <path key={`l-${i}`} d={`M 72 ${y} H ${i % 2 ? 88 : 102} M 1008 ${y} H ${i % 2 ? 992 : 978}`} />)}
      </g>
      <g fill="currentColor" fontFamily="Montserrat, system-ui, sans-serif" fontSize="18" fontWeight="500" letterSpacing="4" opacity="0.45">
        <text x="92" y="130">X-01</text>
        <text x="905" y="965">Y-08</text>
      </g>
    </svg>
  );
}

// ── Barras de dados ─────────────────────────────────────────────────
function DecorDataBars({ intensity = 1 }) {
  const bars = [44, 78, 31, 112, 56, 92, 38, 128, 68, 48, 104, 84];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.75, 0.42 * intensity), color: 'inherit' }}>
      <g fill="currentColor">
        {bars.map((h, i) => <rect key={`b-${i}`} x={84 + i * 30} y={940 - h} width="10" height={h} rx="1" />)}
        {bars.slice().reverse().map((h, i) => <rect key={`r-${i}`} x={930} y={128 + i * 32} width={Math.round(h * 0.72)} height="8" rx="1" opacity={i % 3 === 0 ? 0.55 : 1} />)}
      </g>
      <path d="M 78 940 H 470 M 930 118 V 520" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}

// ── Malha isométrica ────────────────────────────────────────────────
function DecorIsoMesh({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.18 * intensity, color: 'inherit' }}>
      <defs>
        <pattern id="ig-iso-mesh" width="96" height="84" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 96 28 L 96 84 L 48 56 L 0 84 L 0 28 Z M 48 0 L 48 56 M 0 28 L 48 56 L 96 28" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ig-iso-mesh)" />
    </svg>
  );
}

// ── Órbitas editoriais ──────────────────────────────────────────────
function DecorOrbits({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.68, 0.36 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <ellipse cx="790" cy="305" rx="230" ry="82" strokeWidth="1.5" transform="rotate(-18 790 305)" />
        <ellipse cx="790" cy="305" rx="310" ry="116" strokeWidth="1" transform="rotate(-18 790 305)" opacity="0.6" />
        <ellipse cx="248" cy="795" rx="210" ry="72" strokeWidth="1.3" transform="rotate(-18 248 795)" opacity="0.75" />
        <path d="M 620 190 A 286 286 0 0 1 970 420" strokeWidth="6" strokeDasharray="1 22" />
        <path d="M 90 760 A 230 230 0 0 0 410 905" strokeWidth="5" strokeDasharray="1 18" opacity="0.8" />
      </g>
      <circle cx="928" cy="230" r="5" fill="currentColor" />
      <circle cx="126" cy="858" r="4" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

// ── Onda de sinal ───────────────────────────────────────────────────
function DecorSignal({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.72, 0.38 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -40 585 C 25 585 35 515 96 515 S 168 655 234 655 S 310 472 382 472 S 456 610 525 610 S 606 538 682 538 S 754 662 830 662 S 904 492 980 492 S 1048 584 1120 584" strokeWidth="2" />
        <path d="M -40 640 C 42 640 74 602 138 602 S 240 707 315 707 S 430 590 505 590 S 612 646 690 646 S 805 552 880 552 S 1012 618 1120 618" strokeWidth="1.2" opacity="0.48" />
      </g>
      <g fill="currentColor">
        <rect x="72" y="782" width="94" height="3" />
        <rect x="180" y="782" width="36" height="3" opacity="0.55" />
        <rect x="232" y="782" width="132" height="3" opacity="0.8" />
        <rect x="880" y="320" width="128" height="3" />
        <rect x="828" y="320" width="34" height="3" opacity="0.55" />
      </g>
    </svg>
  );
}

// ── Circuito linear ─────────────────────────────────────────────────
function DecorCircuit({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.7, 0.34 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M 86 204 H 228 V 312 H 360 V 256 H 486" />
        <path d="M 996 842 H 840 V 724 H 682 V 786 H 548" />
        <path d="M 124 886 V 724 H 242 V 632 H 388" opacity="0.72" />
        <path d="M 930 126 V 272 H 792 V 378 H 642" opacity="0.72" />
      </g>
      <g fill="currentColor">
        {[86, 228, 360, 486].map((x, i) => <circle key={`c-a-${i}`} cx={x} cy={i === 0 ? 204 : i === 1 ? 312 : i === 2 ? 256 : 256} r="5" />)}
        {[996, 840, 682, 548].map((x, i) => <circle key={`c-b-${i}`} cx={x} cy={i === 0 ? 842 : i === 1 ? 724 : i === 2 ? 786 : 786} r="5" />)}
        <rect x="226" y="622" width="34" height="20" rx="2" />
        <rect x="776" y="368" width="34" height="20" rx="2" />
      </g>
    </svg>
  );
}

// ── Blocos modulares ────────────────────────────────────────────────
function DecorModules({ intensity = 1 }) {
  const blocks = [
    [84, 116, 118, 34, 1], [224, 116, 52, 34, 0.55], [304, 116, 172, 34, 0.3],
    [824, 852, 172, 36, 1], [740, 852, 58, 36, 0.5], [598, 852, 116, 36, 0.28],
    [872, 154, 38, 164, 0.55], [928, 154, 38, 74, 0.28],
    [128, 786, 34, 132, 0.45], [180, 846, 34, 72, 0.28],
  ];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.78, 0.42 * intensity), color: 'inherit' }}>
      <g fill="currentColor">
        {blocks.map(([x, y, w, h, o], i) => <rect key={`m-${i}`} x={x} y={y} width={w} height={h} opacity={o} />)}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55">
        <rect x="70" y="102" width="424" height="62" />
        <rect x="584" y="838" width="426" height="64" />
      </g>
    </svg>
  );
}

// ── Código marginal ─────────────────────────────────────────────────
function DecorBarcode({ intensity = 1 }) {
  const widths = [3, 8, 2, 14, 5, 2, 10, 3, 18, 4, 7, 2, 12, 3, 5, 16, 2, 8, 4];
  let x = 0;
  const bars = widths.map((w) => {
    const item = { x, w };
    x += w + 6;
    return item;
  });
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.86, 0.46 * intensity), color: 'inherit' }}>
      <g fill="currentColor">
        {bars.map((b, i) => <rect key={`bc-a-${i}`} x={72 + b.x} y="74" width={b.w} height={i % 3 === 0 ? 118 : 82} />)}
        {bars.slice().reverse().map((b, i) => <rect key={`bc-b-${i}`} x={884 + b.x * 0.44} y="872" width={Math.max(2, b.w * 0.44)} height={i % 2 ? 64 : 116} />)}
      </g>
      <g fill="currentColor" fontFamily="Montserrat, system-ui, sans-serif" fontSize="18" fontWeight="600" letterSpacing="5" opacity="0.55">
        <text x="72" y="220">ARK-04 / SYS</text>
        <text x="802" y="1018">1080-POST</text>
      </g>
    </svg>
  );
}

// ── Recorte editorial ───────────────────────────────────────────────
function DecorCropMarks({ intensity = 1 }) {
  const i = Math.min(0.8, 0.42 * intensity);
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: i, color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <path d="M 118 72 V 154 M 72 118 H 154" />
        <path d="M 962 72 V 154 M 1008 118 H 926" />
        <path d="M 118 1008 V 926 M 72 962 H 154" />
        <path d="M 962 1008 V 926 M 1008 962 H 926" />
        <path d="M 250 132 H 830 M 250 948 H 830" opacity="0.35" />
        <path d="M 132 250 V 830 M 948 250 V 830" opacity="0.35" />
      </g>
      <g fill="currentColor" fontFamily="Montserrat, system-ui, sans-serif" fontSize="16" fontWeight="600" letterSpacing="4" opacity="0.55">
        <text x="72" y="188">CROP / 01</text>
        <text x="820" y="908">SAFE AREA</text>
      </g>
    </svg>
  );
}

// ── Colunas de leitura ──────────────────────────────────────────────
function DecorColumns({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.45, 0.23 * intensity), color: 'inherit' }}>
      <g fill="currentColor">
        {[0, 1, 2, 3, 4].map((n) => <rect key={`col-${n}`} x={114 + n * 176} y="86" width="1.5" height="908" />)}
        {[0, 1, 2].map((n) => <rect key={`rule-${n}`} x="114" y={218 + n * 214} width="704" height="1.5" />)}
      </g>
      <g fill="currentColor" opacity="0.5">
        <rect x="874" y="176" width="72" height="1.5" />
        <rect x="874" y="204" width="132" height="1.5" />
        <rect x="874" y="232" width="94" height="1.5" />
        <rect x="874" y="260" width="118" height="1.5" />
      </g>
    </svg>
  );
}

// ── Janela de foco ──────────────────────────────────────────────────
function DecorFocusWindow({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.72, 0.38 * intensity), color: 'inherit' }}>
      <defs>
        <mask id="ig-focus-window-mask">
          <rect width="1080" height="1080" fill="white" />
          <rect x="238" y="286" width="604" height="426" rx="0" fill="black" />
        </mask>
      </defs>
      <rect width="1080" height="1080" fill="currentColor" opacity="0.10" mask="url(#ig-focus-window-mask)" />
      <rect x="238" y="286" width="604" height="426" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 238 252 V 286 M 842 252 V 286 M 238 712 V 746 M 842 712 V 746" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="238" cy="286" r="4" fill="currentColor" />
      <circle cx="842" cy="712" r="4" fill="currentColor" />
    </svg>
  );
}

// ── Notas marginais ─────────────────────────────────────────────────
function DecorMarginNotes({ intensity = 1 }) {
  const notes = [
    ['01', 112, 272, 118], ['02', 112, 576, 82], ['03', 850, 350, 142], ['04', 850, 706, 96],
  ];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.76, 0.40 * intensity), color: 'inherit' }}>
      <g fill="currentColor" fontFamily="Montserrat, system-ui, sans-serif" fontSize="16" fontWeight="600" letterSpacing="4">
        {notes.map(([label, x, y, w]) => (
          <g key={label}>
            <text x={x} y={y}>{label}</text>
            <rect x={x} y={y + 18} width={w} height="2" />
            <rect x={x} y={y + 38} width={Math.round(w * 0.68)} height="2" opacity="0.55" />
          </g>
        ))}
      </g>
      <path d="M 188 274 H 258 M 188 578 H 258 M 822 352 H 752 M 822 708 H 752" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
    </svg>
  );
}

// ── Faixa fantasma ──────────────────────────────────────────────────
function DecorGhostBand({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.5, 0.26 * intensity), color: 'inherit' }}>
      <g transform="rotate(-14 540 540)">
        <rect x="-120" y="390" width="1320" height="138" fill="currentColor" opacity="0.12" />
        <rect x="-120" y="548" width="1320" height="2" fill="currentColor" opacity="0.9" />
        <text x="88" y="488" fill="currentColor" fontFamily="Montserrat, system-ui, sans-serif" fontSize="82" fontWeight="700" letterSpacing="24" opacity="0.34">ARATEKI</text>
      </g>
    </svg>
  );
}

// ── Mancha suave ────────────────────────────────────────────────────
function DecorSoftBlob({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.5, 0.24 * intensity), color: 'inherit' }}>
      <path d="M 795 136 C 928 168 1018 264 1002 386 C 986 512 842 560 722 520 C 602 480 530 344 588 238 C 628 164 706 114 795 136 Z" fill="currentColor" opacity="0.16" />
      <path d="M 218 710 C 326 640 484 670 522 790 C 558 904 456 1000 324 994 C 190 988 84 884 116 792 C 130 750 166 734 218 710 Z" fill="currentColor" opacity="0.12" />
      <path d="M 724 178 C 846 210 924 304 884 416 C 846 522 698 518 624 430 C 552 344 600 204 724 178 Z" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.34" />
    </svg>
  );
}

// ── Dobra de papel ──────────────────────────────────────────────────
function DecorPaperFold({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.62, 0.32 * intensity), color: 'inherit' }}>
      <path d="M 804 0 L 1080 276 V 0 Z" fill="currentColor" opacity="0.08" />
      <path d="M 804 0 L 1080 276" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.38" />
      <path d="M 0 856 L 224 1080 H 0 Z" fill="currentColor" opacity="0.06" />
      <path d="M 0 856 L 224 1080" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.26" />
    </svg>
  );
}

// ── Tinta difusa ────────────────────────────────────────────────────
function DecorInkSpread({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.58, 0.30 * intensity), color: 'inherit' }}>
      <g fill="currentColor">
        <circle cx="902" cy="792" r="72" opacity="0.08" />
        <circle cx="858" cy="742" r="28" opacity="0.12" />
        <circle cx="966" cy="710" r="18" opacity="0.16" />
        <circle cx="828" cy="842" r="13" opacity="0.18" />
        <circle cx="178" cy="210" r="46" opacity="0.10" />
        <circle cx="232" cy="178" r="17" opacity="0.15" />
        <circle cx="128" cy="278" r="10" opacity="0.18" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.22">
        <circle cx="902" cy="792" r="104" />
        <circle cx="178" cy="210" r="72" />
      </g>
    </svg>
  );
}

// ── Faixa diagonal ──────────────────────────────────────────────────
function DecorRibbon({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.6, 0.30 * intensity), color: 'inherit' }}>
      <g transform="rotate(-32 540 540)">
        <rect x="-150" y="456" width="1380" height="72" fill="currentColor" opacity="0.12" />
        <rect x="-150" y="544" width="1380" height="14" fill="currentColor" opacity="0.28" />
        <rect x="-150" y="586" width="1380" height="2" fill="currentColor" opacity="0.65" />
      </g>
    </svg>
  );
}

// ── Fio social ──────────────────────────────────────────────────────
function DecorThread({ intensity = 1 }) {
  const nodes = [[160, 225], [302, 172], [448, 260], [620, 198], [790, 292], [924, 230]];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.72, 0.38 * intensity), color: 'inherit' }}>
      <path d={`M ${nodes.map(([x, y]) => `${x} ${y}`).join(' L ')}`} fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.52" />
      <g fill="currentColor">
        {nodes.map(([x, y], i) => <circle key={`thread-${i}`} cx={x} cy={y} r={i % 2 ? 5 : 8} opacity={i % 2 ? 0.7 : 1} />)}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.28">
        <path d="M 210 825 C 330 730 486 772 602 858 S 824 958 980 828" />
        <path d="M 210 882 C 342 792 484 842 594 906 S 832 996 980 890" />
      </g>
    </svg>
  );
}

// ── Calendário ──────────────────────────────────────────────────────
function DecorCalendar({ intensity = 1 }) {
  const cells = Array.from({ length: 35 }, (_, i) => ({ x: 728 + (i % 7) * 36, y: 120 + Math.floor(i / 7) * 34, on: [3, 8, 14, 22, 29].includes(i) }));
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.78, 0.42 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="704" y="76" width="304" height="232" />
        <path d="M 704 124 H 1008" />
      </g>
      <g fill="currentColor">
        {cells.map((c, i) => <rect key={`cal-${i}`} x={c.x} y={c.y} width="14" height="14" opacity={c.on ? 0.9 : 0.22} />)}
        <rect x="110" y="828" width="226" height="3" />
        <rect x="110" y="858" width="142" height="3" opacity="0.55" />
      </g>
    </svg>
  );
}

// ── Stack de cards ──────────────────────────────────────────────────
function DecorStack({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.68, 0.34 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="728" y="672" width="224" height="148" transform="rotate(-7 840 746)" opacity="0.34" />
        <rect x="706" y="642" width="224" height="148" transform="rotate(-3 818 716)" opacity="0.55" />
        <rect x="684" y="612" width="224" height="148" />
        <rect x="116" y="146" width="186" height="118" transform="rotate(5 209 205)" opacity="0.42" />
        <rect x="142" y="176" width="186" height="118" opacity="0.62" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <rect x="718" y="646" width="104" height="4" />
        <rect x="718" y="674" width="154" height="4" />
        <rect x="718" y="702" width="72" height="4" />
      </g>
    </svg>
  );
}

// ── Aspas gigantes ──────────────────────────────────────────────────
function DecorQuoteMarks({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.48, 0.24 * intensity), color: 'inherit' }}>
      <g fill="currentColor" fontFamily="Georgia, serif" fontSize="330" fontWeight="700">
        <text x="72" y="342" opacity="0.18">“</text>
        <text x="808" y="928" opacity="0.18">”</text>
      </g>
      <g fill="currentColor" opacity="0.42">
        <rect x="164" y="382" width="192" height="2" />
        <rect x="724" y="704" width="192" height="2" />
      </g>
    </svg>
  );
}

// ── Passos numerados ────────────────────────────────────────────────
function DecorSteps({ intensity = 1 }) {
  const steps = [[136, 824, '01'], [296, 760, '02'], [456, 824, '03'], [616, 760, '04'], [776, 824, '05']];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.76, 0.40 * intensity), color: 'inherit' }}>
      <path d="M 136 824 L 296 760 L 456 824 L 616 760 L 776 824" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.38" />
      <g fontFamily="Montserrat, system-ui, sans-serif" fontSize="18" fontWeight="700" letterSpacing="2">
        {steps.map(([x, y, label]) => (
          <g key={label}>
            <circle cx={x} cy={y} r="28" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x={x - 15} y={y + 7} fill="currentColor">{label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

// ── Moldura fina ────────────────────────────────────────────────────
function DecorFineFrame({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.82, 0.42 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor">
        <rect x="62" y="62" width="956" height="956" strokeWidth="1.4" />
        <rect x="92" y="92" width="896" height="896" strokeWidth="0.8" opacity="0.55" />
        <path d="M 62 162 H 92 M 62 918 H 92 M 988 162 H 1018 M 988 918 H 1018 M 162 62 V 92 M 918 62 V 92 M 162 988 V 1018 M 918 988 V 1018" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

// ── Filete editorial ────────────────────────────────────────────────
function DecorHairline({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.72, 0.36 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeLinecap="square">
        <path d="M 126 182 H 954" strokeWidth="1" />
        <path d="M 126 898 H 954" strokeWidth="1" />
        <path d="M 540 118 V 238 M 540 842 V 962" strokeWidth="1" opacity="0.55" />
        <path d="M 276 182 C 350 218 430 218 504 182 S 658 146 734 182" strokeWidth="0.8" opacity="0.45" />
        <path d="M 276 898 C 350 862 430 862 504 898 S 658 934 734 898" strokeWidth="0.8" opacity="0.45" />
      </g>
    </svg>
  );
}

// ── Medalhão ────────────────────────────────────────────────────────
function DecorMedallion({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.7, 0.36 * intensity), color: 'inherit' }}>
      <g transform="translate(540 540)" fill="none" stroke="currentColor">
        <circle r="176" strokeWidth="1.4" />
        <circle r="144" strokeWidth="0.9" opacity="0.55" />
        <circle r="104" strokeWidth="0.9" opacity="0.34" />
        {Array.from({ length: 36 }, (_, i) => (
          <line key={`med-${i}`} x1="158" y1="0" x2={i % 3 === 0 ? 188 : 176} y2="0" strokeWidth="1" opacity="0.65" transform={`rotate(${i * 10})`} />
        ))}
      </g>
    </svg>
  );
}

// ── Guilloché ───────────────────────────────────────────────────────
function DecorGuilloche({ intensity = 1 }) {
  const waves = Array.from({ length: 7 }, (_, i) => 196 + i * 106);
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.48, 0.24 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.85">
        {waves.map((y, i) => (
          <path key={`g-a-${i}`} d={`M -40 ${y} C 120 ${y - 96} 240 ${y + 96} 400 ${y} S 680 ${y - 96} 840 ${y} S 1080 ${y + 96} 1220 ${y}`} />
        ))}
        {waves.map((y, i) => (
          <path key={`g-b-${i}`} d={`M -40 ${y + 42} C 120 ${y + 138} 240 ${y - 54} 400 ${y + 42} S 680 ${y + 138} 840 ${y + 42} S 1080 ${y - 54} 1220 ${y + 42}`} opacity="0.62" />
        ))}
      </g>
    </svg>
  );
}

// ── Textura linho ───────────────────────────────────────────────────
function DecorLinen({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.34, 0.18 * intensity), color: 'inherit' }}>
      <defs>
        <pattern id="ig-linen" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M 0 5 H 18 M 0 13 H 18 M 5 0 V 18 M 13 0 V 18" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ig-linen)" />
    </svg>
  );
}

// ── Passe-partout ───────────────────────────────────────────────────
function DecorMatte({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.58, 0.30 * intensity), color: 'inherit' }}>
      <defs>
        <mask id="ig-matte-mask">
          <rect width="1080" height="1080" fill="white" />
          <rect x="148" y="148" width="784" height="784" fill="black" />
        </mask>
      </defs>
      <rect width="1080" height="1080" fill="currentColor" opacity="0.10" mask="url(#ig-matte-mask)" />
      <rect x="148" y="148" width="784" height="784" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <rect x="128" y="128" width="824" height="824" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.28" />
    </svg>
  );
}

// ── Comercial / produto ─────────────────────────────────────────────
function DecorPriceSeal({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.78, 0.40 * intensity), color: 'inherit' }}>
      <g transform="translate(858 204)" fill="none" stroke="currentColor">
        <path d="M 0 -92 L 26 -36 L 88 -30 L 42 12 L 56 74 L 0 42 L -56 74 L -42 12 L -88 -30 L -26 -36 Z" strokeWidth="2" />
        <circle r="62" strokeWidth="1.2" opacity="0.55" />
        <path d="M -34 0 H 34 M 0 -34 V 34" strokeWidth="1.4" opacity="0.5" />
      </g>
    </svg>
  );
}

function DecorShelf({ intensity = 1 }) {
  const items = [[130, 710, 120, 150], [286, 654, 168, 206], [492, 742, 138, 118], [668, 604, 196, 256]];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.7, 0.36 * intensity), color: 'inherit' }}>
      <path d="M 88 880 H 992 M 118 906 H 962" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <g fill="none" stroke="currentColor" strokeWidth="1.7">
        {items.map(([x, y, w, h], i) => <rect key={`shelf-${i}`} x={x} y={y} width={w} height={h} opacity={i % 2 ? 0.7 : 0.46} />)}
      </g>
    </svg>
  );
}

function DecorHangTag({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.76, 0.40 * intensity), color: 'inherit' }}>
      <path d="M 828 92 V 236" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 752 236 L 904 236 L 942 382 L 828 504 L 714 382 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="828" cy="278" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 768 382 H 888 M 790 418 H 866" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.54" />
    </svg>
  );
}

function DecorCatalog({ intensity = 1 }) {
  const cells = Array.from({ length: 12 }, (_, i) => ({ x: 96 + (i % 4) * 102, y: 112 + Math.floor(i / 4) * 122 }));
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.54, 0.28 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        {cells.map((c, i) => <rect key={`cat-${i}`} x={c.x} y={c.y} width="72" height="88" opacity={i % 3 === 0 ? 0.8 : 0.42} />)}
      </g>
      <path d="M 96 526 H 474" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

function DecorPlinth({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.56, 0.30 * intensity), color: 'inherit' }}>
      <ellipse cx="540" cy="846" rx="264" ry="58" fill="currentColor" opacity="0.08" />
      <ellipse cx="540" cy="820" rx="220" ry="38" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <path d="M 320 820 V 872 C 402 924 678 924 760 872 V 820" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.38" />
    </svg>
  );
}

// ── Educação / conteúdo ─────────────────────────────────────────────
function DecorMindMap({ intensity = 1 }) {
  const pts = [[540, 290], [346, 180], [746, 188], [244, 388], [824, 420], [470, 512], [636, 542]];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.72, 0.38 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5">{pts.slice(1).map(([x, y], i) => <path key={`mm-l-${i}`} d={`M 540 290 C 520 350 ${x - 20} ${y + 40} ${x} ${y}`} />)}</g>
      <g fill="none" stroke="currentColor" strokeWidth="1.8">{pts.map(([x, y], i) => <rect key={`mm-${i}`} x={x - 44} y={y - 20} width="88" height="40" rx="20" opacity={i ? 0.66 : 1} />)}</g>
    </svg>
  );
}

function DecorChalk({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.58, 0.30 * intensity), color: 'inherit' }}>
      <path d="M 102 150 H 404 M 102 188 H 336 M 102 226 H 464" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2 8" />
      <path d="M 736 804 C 790 748 856 748 910 804 M 760 842 H 936" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.65" />
      <circle cx="808" cy="250" r="54" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 10" opacity="0.55" />
    </svg>
  );
}

function DecorMarker({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.62, 0.32 * intensity), color: 'inherit' }}>
      <g transform="rotate(-4 540 540)" fill="currentColor">
        <rect x="154" y="346" width="760" height="54" opacity="0.10" />
        <rect x="214" y="696" width="504" height="42" opacity="0.12" />
        <rect x="114" y="820" width="286" height="34" opacity="0.10" />
      </g>
    </svg>
  );
}

function DecorDecision({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.72, 0.38 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M 536 150 L 638 252 L 536 354 L 434 252 Z" />
        <path d="M 536 354 V 498 M 536 498 H 314 V 640 M 536 498 H 758 V 640" opacity="0.55" />
        <rect x="236" y="640" width="156" height="72" />
        <rect x="680" y="640" width="156" height="72" />
      </g>
    </svg>
  );
}

function DecorLayers({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.64, 0.34 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        {[0, 1, 2, 3].map((n) => <path key={`layer-${n}`} d={`M ${246 + n * 36} ${284 + n * 44} L 540 ${164 + n * 44} L ${834 - n * 36} ${284 + n * 44} L 540 ${404 + n * 44} Z`} opacity={1 - n * 0.16} />)}
      </g>
    </svg>
  );
}

// ── Evento / comunidade ─────────────────────────────────────────────
function DecorTicket({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.78, 0.42 * intensity), color: 'inherit' }}>
      <path d="M 112 792 H 626 V 914 H 112 Z M 496 792 V 914" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 496 808 V 898" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 12" opacity="0.55" />
      <g fill="currentColor" opacity="0.5"><rect x="148" y="830" width="164" height="4" /><rect x="148" y="866" width="96" height="4" /></g>
    </svg>
  );
}

function DecorSeatMap({ intensity = 1 }) {
  const seats = Array.from({ length: 48 }, (_, i) => ({ x: 740 + (i % 8) * 28, y: 626 + Math.floor(i / 8) * 28, on: i % 7 !== 0 }));
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.7, 0.36 * intensity), color: 'inherit' }}>
      <path d="M 714 580 H 982 V 820 H 714 Z M 756 540 H 940" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g fill="currentColor">{seats.map((s, i) => <circle key={`seat-${i}`} cx={s.x} cy={s.y} r="6" opacity={s.on ? 0.7 : 0.18} />)}</g>
    </svg>
  );
}

function DecorWristband({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.68, 0.34 * intensity), color: 'inherit' }}>
      <g transform="rotate(18 540 540)" fill="none" stroke="currentColor">
        <rect x="-80" y="486" width="1240" height="108" rx="54" strokeWidth="2" />
        <path d="M 266 486 V 594 M 814 486 V 594" strokeWidth="1.5" strokeDasharray="6 12" opacity="0.6" />
        <rect x="430" y="514" width="220" height="52" rx="26" strokeWidth="1.4" opacity="0.62" />
      </g>
    </svg>
  );
}

function DecorAgenda({ intensity = 1 }) {
  const rows = [[180, '09'], [300, '11'], [420, '14'], [540, '17'], [660, '20']];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.74, 0.38 * intensity), color: 'inherit' }}>
      <path d="M 184 148 V 718" fill="none" stroke="currentColor" strokeWidth="2" />
      <g fill="currentColor" fontFamily="Montserrat, system-ui, sans-serif" fontSize="18" fontWeight="700">{rows.map(([y, t]) => <text key={t} x="104" y={y + 6}>{t}:00</text>)}</g>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">{rows.map(([y], i) => <path key={`ag-${i}`} d={`M 172 ${y} H ${i % 2 ? 482 : 392}`} />)}</g>
    </svg>
  );
}

function DecorConstellation({ intensity = 1 }) {
  const pts = [[172, 178], [248, 310], [398, 232], [506, 358], [664, 250], [778, 372], [900, 198], [842, 612], [666, 714], [486, 632], [314, 748], [178, 638]];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.72, 0.38 * intensity), color: 'inherit' }}>
      <path d={`M ${pts.map(([x, y]) => `${x} ${y}`).join(' L ')}`} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.28" />
      <g fill="currentColor">{pts.map(([x, y], i) => <circle key={`co-${i}`} cx={x} cy={y} r={i % 3 === 0 ? 7 : 4} opacity={i % 2 ? 0.55 : 0.9} />)}</g>
    </svg>
  );
}

// ── Institucional / confiança ───────────────────────────────────────
function DecorCertSeal({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.76, 0.40 * intensity), color: 'inherit' }}>
      <g transform="translate(840 820)" fill="none" stroke="currentColor"><circle r="86" strokeWidth="2" /><circle r="62" strokeWidth="1" opacity="0.55" />{Array.from({ length: 24 }, (_, i) => <line key={`cert-${i}`} x1="78" y1="0" x2="98" y2="0" transform={`rotate(${i * 15})`} />)}</g>
    </svg>
  );
}

function DecorSignature({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.68, 0.34 * intensity), color: 'inherit' }}>
      <path d="M 122 864 C 206 786 250 942 326 854 S 424 802 462 868 S 562 884 628 820 S 740 788 846 850" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M 128 910 H 868" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.38" />
    </svg>
  );
}

function DecorStamp({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.78, 0.42 * intensity), color: 'inherit' }}>
      <g transform="rotate(-12 812 264)" fill="none" stroke="currentColor"><rect x="680" y="190" width="264" height="148" strokeWidth="2" /><rect x="706" y="216" width="212" height="96" strokeWidth="1" opacity="0.55" /><path d="M 724 264 H 900" strokeWidth="2" strokeDasharray="6 10" /></g>
    </svg>
  );
}

function DecorArchive({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.66, 0.34 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.8">{[0, 1, 2].map((n) => <path key={`ar-${n}`} d={`M ${126 + n * 34} ${188 + n * 44} H ${434 + n * 34} V ${418 + n * 44} H ${126 + n * 34} Z M ${126 + n * 34} ${238 + n * 44} H ${434 + n * 34}`} opacity={1 - n * 0.18} />)}</g>
    </svg>
  );
}

function DecorAudit({ intensity = 1 }) {
  const rows = [196, 286, 376, 466, 556, 646];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.72, 0.38 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">{rows.map((y, i) => <path key={`au-${i}`} d={`M 646 ${y} H 940 M 646 ${y} l22 22 l42 -48`} opacity={i % 2 ? 0.45 : 0.78} />)}</g>
    </svg>
  );
}

// ── Creator / social ────────────────────────────────────────────────
function DecorReactions({ intensity = 1 }) {
  const pts = [[142, 730, '♡'], [226, 626, '+'], [842, 186, '↗'], [918, 306, '•'], [760, 832, '♡']];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.72, 0.38 * intensity), color: 'inherit' }}>
      <g fill="currentColor" fontFamily="Montserrat, system-ui, sans-serif" fontSize="52" fontWeight="500">{pts.map(([x, y, t], i) => <text key={`re-${i}`} x={x} y={y} opacity={i % 2 ? 0.45 : 0.74}>{t}</text>)}</g>
    </svg>
  );
}

function DecorBubbles({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.68, 0.34 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M 102 182 H 334 Q 366 182 366 214 V 286 Q 366 318 334 318 H 190 L 140 366 V 318 H 102 Q 70 318 70 286 V 214 Q 70 182 102 182 Z" /><path d="M 746 742 H 980 Q 1010 742 1010 772 V 844 Q 1010 874 980 874 H 900 L 850 922 V 874 H 746 Q 716 874 716 844 V 772 Q 716 742 746 742 Z" opacity="0.62" /></g>
    </svg>
  );
}

function DecorStoryFrame({ intensity = 1 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.76, 0.40 * intensity), color: 'inherit' }}>
      <rect x="86" y="74" width="908" height="932" rx="44" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 154 128 H 414 M 154 948 H 286 M 794 948 H 926" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function DecorComments({ intensity = 1 }) {
  const rows = [[118, 672, 260], [118, 738, 190], [118, 804, 310], [118, 870, 228]];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.68, 0.34 * intensity), color: 'inherit' }}>
      <g fill="currentColor">{rows.map(([x, y, w], i) => <g key={`cm-${i}`} opacity={1 - i * 0.12}><circle cx={x} cy={y} r="17" /><rect x={x + 44} y={y - 11} width={w} height="6" /><rect x={x + 44} y={y + 11} width={Math.round(w * 0.62)} height="6" opacity="0.55" /></g>)}</g>
    </svg>
  );
}

function DecorSocialStats({ intensity = 1 }) {
  const stats = [[728, 146, 120], [728, 222, 82], [728, 298, 156], [728, 374, 104]];
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.72, 0.38 * intensity), color: 'inherit' }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">{stats.map(([x, y, w], i) => <g key={`ss-${i}`}><circle cx={x} cy={y} r="18" /><path d={`M ${x + 38} ${y} H ${x + 38 + w}`} opacity={i % 2 ? 0.48 : 0.8} /></g>)}</g>
    </svg>
  );
}

// ── Explosão radial ─────────────────────────────────────────────────
function DecorBurst({ intensity = 1 }) {
  const rays = Array.from({ length: 28 }, (_, i) => i * (360 / 28));
  return (
    <svg aria-hidden="true" viewBox="0 0 1080 1080" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: Math.min(0.74, 0.38 * intensity), color: 'inherit' }}>
      <g transform="translate(880 220)" stroke="currentColor" strokeLinecap="round">
        {rays.map((a, i) => (
          <line key={`ray-${i}`} x1="76" y1="0" x2={i % 3 === 0 ? 160 : 124} y2="0"
            strokeWidth={i % 4 === 0 ? 3 : 1.5} opacity={i % 2 ? 0.42 : 0.8}
            transform={`rotate(${a})`} />
        ))}
      </g>
      <circle cx="880" cy="220" r="46" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.46" />
    </svg>
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

function DecorTransform({ size = 100, x = 0, y = 0, children }) {
  const scale = Math.max(0.2, Number(size || 100) / 100);
  const tx = Number(x || 0);
  const ty = Number(y || 0);
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
      transform: `translate(${tx}%, ${ty}%) scale(${scale})`,
      transformOrigin: '50% 50%',
    }}>
      {children}
    </div>
  );
}

// ── Wrapper público ──────────────────────────────────────────────────
// `decor` = { grid, gridI, dots, dotsI, diagonals, diagonalsI,
//             scanlines, scanlinesI, corners, cornersI, vignette, vignetteI,
//             watermark, watermarkI, particles, particlesI, glow, glowI,
//             grain, grainI, topography, topographyI, axes, axesI,
//             dataBars, dataBarsI, isoMesh, isoMeshI, orbits, orbitsI,
//             signal, signalI, circuit, circuitI, modules, modulesI,
//             barcode, barcodeI, cropMarks, cropMarksI, columns, columnsI,
//             focusWindow, focusWindowI, marginNotes, marginNotesI,
//             ghostBand, ghostBandI, softBlob, softBlobI, paperFold, paperFoldI,
//             inkSpread, inkSpreadI, ribbon, ribbonI, burst, burstI,
//             thread, threadI, calendar, calendarI, stack, stackI,
//             quoteMarks, quoteMarksI, steps, stepsI,
//             fineFrame, fineFrameI, hairline, hairlineI, medallion, medallionI,
//             guilloche, guillocheI, linen, linenI, matte, matteI,
//             priceSeal, priceSealI, shelf, shelfI, hangTag, hangTagI,
//             catalog, catalogI, plinth, plinthI, mindMap, mindMapI,
//             chalk, chalkI, marker, markerI, decision, decisionI,
//             layers, layersI, ticket, ticketI, seatMap, seatMapI,
//             wristband, wristbandI, agenda, agendaI,
//             constellation, constellationI, certSeal, certSealI,
//             signature, signatureI, stamp, stampI, archive, archiveI,
//             audit, auditI, reactions, reactionsI, bubbles, bubblesI,
//             storyFrame, storyFrameI, comments, commentsI,
//             socialStats, socialStatsI }
function IgDecor({ decor = {}, theme = 'light', seed = 7 }) {
  const {
    grid, gridI = 1, dots, dotsI = 1, diagonals, diagonalsI = 1,
    scanlines, scanlinesI = 1, corners, cornersI = 1,
    vignette, vignetteI = 1, watermark, watermarkI = 1,
    particles, particlesI = 1, glow, glowI = 1,
    grain, grainI = 1, topography, topographyI = 1,
    axes, axesI = 1, dataBars, dataBarsI = 1,
    isoMesh, isoMeshI = 1, orbits, orbitsI = 1,
    signal, signalI = 1, circuit, circuitI = 1,
    modules, modulesI = 1, barcode, barcodeI = 1,
    cropMarks, cropMarksI = 1, columns, columnsI = 1,
    focusWindow, focusWindowI = 1, marginNotes, marginNotesI = 1,
    ghostBand, ghostBandI = 1,
    softBlob, softBlobI = 1, paperFold, paperFoldI = 1,
    inkSpread, inkSpreadI = 1, ribbon, ribbonI = 1,
    burst, burstI = 1, thread, threadI = 1,
    calendar, calendarI = 1, stack, stackI = 1,
    quoteMarks, quoteMarksI = 1, steps, stepsI = 1,
    fineFrame, fineFrameI = 1, hairline, hairlineI = 1,
    medallion, medallionI = 1, guilloche, guillocheI = 1,
    linen, linenI = 1, matte, matteI = 1,
    priceSeal, priceSealI = 1, shelf, shelfI = 1,
    hangTag, hangTagI = 1, catalog, catalogI = 1,
    plinth, plinthI = 1, mindMap, mindMapI = 1,
    chalk, chalkI = 1, marker, markerI = 1,
    decision, decisionI = 1, layers, layersI = 1,
    ticket, ticketI = 1, seatMap, seatMapI = 1,
    wristband, wristbandI = 1, agenda, agendaI = 1,
    constellation, constellationI = 1, certSeal, certSealI = 1,
    signature, signatureI = 1, stamp, stampI = 1,
    archive, archiveI = 1, audit, auditI = 1,
    reactions, reactionsI = 1, bubbles, bubblesI = 1,
    storyFrame, storyFrameI = 1, comments, commentsI = 1,
    socialStats, socialStatsI = 1,
  } = decor;

  if (!grid && !dots && !diagonals && !scanlines && !corners && !vignette && !watermark && !particles && !glow && !grain && !topography && !axes && !dataBars && !isoMesh && !orbits && !signal && !circuit && !modules && !barcode && !cropMarks && !columns && !focusWindow && !marginNotes && !ghostBand && !softBlob && !paperFold && !inkSpread && !ribbon && !burst && !thread && !calendar && !stack && !quoteMarks && !steps && !fineFrame && !hairline && !medallion && !guilloche && !linen && !matte && !priceSeal && !shelf && !hangTag && !catalog && !plinth && !mindMap && !chalk && !marker && !decision && !layers && !ticket && !seatMap && !wristband && !agenda && !constellation && !certSeal && !signature && !stamp && !archive && !audit && !reactions && !bubbles && !storyFrame && !comments && !socialStats) return null;

  const transform = (key, child) => (
    <DecorTransform
      size={decor[key + 'Size']}
      x={decor[key + 'X']}
      y={decor[key + 'Y']}>
      {child}
    </DecorTransform>
  );

  return (
    <>
      {watermark  && <DecorWatermark intensity={watermarkI} />}
      {grain      && <DecorGrain intensity={grainI} />}
      {grid       && <DecorGrid intensity={gridI} />}
      {dots       && <DecorDots intensity={dotsI} />}
      {diagonals  && <DecorDiagonals intensity={diagonalsI} />}
      {scanlines  && <DecorScanlines intensity={scanlinesI} />}
      {topography && <DecorTopography intensity={topographyI} />}
      {isoMesh    && <DecorIsoMesh intensity={isoMeshI} />}
      {orbits     && transform('orbits', <DecorOrbits intensity={orbitsI} />)}
      {signal     && transform('signal', <DecorSignal intensity={signalI} />)}
      {circuit    && transform('circuit', <DecorCircuit intensity={circuitI} />)}
      {modules    && transform('modules', <DecorModules intensity={modulesI} />)}
      {columns    && <DecorColumns intensity={columnsI} />}
      {ghostBand  && transform('ghostBand', <DecorGhostBand intensity={ghostBandI} />)}
      {softBlob   && transform('softBlob', <DecorSoftBlob intensity={softBlobI} />)}
      {paperFold  && <DecorPaperFold intensity={paperFoldI} />}
      {inkSpread  && transform('inkSpread', <DecorInkSpread intensity={inkSpreadI} />)}
      {ribbon     && transform('ribbon', <DecorRibbon intensity={ribbonI} />)}
      {thread     && transform('thread', <DecorThread intensity={threadI} />)}
      {calendar   && transform('calendar', <DecorCalendar intensity={calendarI} />)}
      {stack      && transform('stack', <DecorStack intensity={stackI} />)}
      {quoteMarks && transform('quoteMarks', <DecorQuoteMarks intensity={quoteMarksI} />)}
      {steps      && transform('steps', <DecorSteps intensity={stepsI} />)}
      {linen      && <DecorLinen intensity={linenI} />}
      {guilloche  && <DecorGuilloche intensity={guillocheI} />}
      {matte      && <DecorMatte intensity={matteI} />}
      {medallion  && transform('medallion', <DecorMedallion intensity={medallionI} />)}
      {hairline   && <DecorHairline intensity={hairlineI} />}
      {fineFrame  && <DecorFineFrame intensity={fineFrameI} />}
      {priceSeal  && transform('priceSeal', <DecorPriceSeal intensity={priceSealI} />)}
      {shelf      && transform('shelf', <DecorShelf intensity={shelfI} />)}
      {hangTag    && transform('hangTag', <DecorHangTag intensity={hangTagI} />)}
      {catalog    && transform('catalog', <DecorCatalog intensity={catalogI} />)}
      {plinth     && transform('plinth', <DecorPlinth intensity={plinthI} />)}
      {mindMap    && transform('mindMap', <DecorMindMap intensity={mindMapI} />)}
      {chalk      && transform('chalk', <DecorChalk intensity={chalkI} />)}
      {marker     && transform('marker', <DecorMarker intensity={markerI} />)}
      {decision   && transform('decision', <DecorDecision intensity={decisionI} />)}
      {layers     && transform('layers', <DecorLayers intensity={layersI} />)}
      {ticket     && transform('ticket', <DecorTicket intensity={ticketI} />)}
      {seatMap    && transform('seatMap', <DecorSeatMap intensity={seatMapI} />)}
      {wristband  && transform('wristband', <DecorWristband intensity={wristbandI} />)}
      {agenda     && transform('agenda', <DecorAgenda intensity={agendaI} />)}
      {constellation && transform('constellation', <DecorConstellation intensity={constellationI} />)}
      {certSeal   && transform('certSeal', <DecorCertSeal intensity={certSealI} />)}
      {signature  && transform('signature', <DecorSignature intensity={signatureI} />)}
      {stamp      && transform('stamp', <DecorStamp intensity={stampI} />)}
      {archive    && transform('archive', <DecorArchive intensity={archiveI} />)}
      {audit      && transform('audit', <DecorAudit intensity={auditI} />)}
      {reactions  && transform('reactions', <DecorReactions intensity={reactionsI} />)}
      {bubbles    && transform('bubbles', <DecorBubbles intensity={bubblesI} />)}
      {storyFrame && <DecorStoryFrame intensity={storyFrameI} />}
      {comments   && transform('comments', <DecorComments intensity={commentsI} />)}
      {socialStats && transform('socialStats', <DecorSocialStats intensity={socialStatsI} />)}
      {burst      && transform('burst', <DecorBurst intensity={burstI} />)}
      {cropMarks  && <DecorCropMarks intensity={cropMarksI} />}
      {focusWindow && transform('focusWindow', <DecorFocusWindow intensity={focusWindowI} />)}
      {marginNotes && transform('marginNotes', <DecorMarginNotes intensity={marginNotesI} />)}
      {barcode    && transform('barcode', <DecorBarcode intensity={barcodeI} />)}
      {dataBars   && transform('dataBars', <DecorDataBars intensity={dataBarsI} />)}
      {axes       && <DecorAxes intensity={axesI} />}
      {corners    && <DecorCorners intensity={cornersI} />}
      {vignette   && <DecorVignette theme={theme} intensity={vignetteI} />}
      {particles  && <DecorParticles theme={theme} animated={!!glow} seed={seed} intensity={particlesI} />}
      {glow       && <DecorGlow theme={theme} intensity={glowI} />}
    </>
  );
}

export { IgDecor };
