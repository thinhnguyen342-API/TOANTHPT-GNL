import React from 'react';

interface VisualizerProps {
  svgType: string;
  name: string;
}

export default function GeometryVisualizer({ svgType, name }: VisualizerProps) {
  // Common visual styles
  const activeColor = '#2454FF'; // brand-blue-light
  const secondaryColor = '#10B981'; // brand-emerald
  const outlineColor = '#0F172A'; // brand-slate
  const fillColor = '#F1F5F9'; // light slate fill
  const dashedFill = '#E2E8F0';
  
  switch (svgType) {
    // 2D Shape Drawings
    case 'triangle':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          {/* Base shape */}
          <polygon points="30,110 170,110 100,30" fill={fillColor} stroke={outlineColor} strokeWidth="2" strokeLinejoin="round" />
          {/* Height line */}
          <line x1="100" y1="30" x2="100" y2="110" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Side annotations */}
          <text x="100" y="20" className="text-[10px] font-bold fill-slate-850 text-center" textAnchor="middle">A</text>
          <text x="20" y="115" className="text-[10px] font-bold fill-slate-850" textAnchor="middle">B</text>
          <text x="180" y="115" className="text-[10px] font-bold fill-slate-850" textAnchor="middle">C</text>
          <text x="100" y="123" className="text-[10px] font-medium fill-slate-500" textAnchor="middle">a</text>
          <text x="55" y="70" className="text-[10px] font-medium fill-slate-500" textAnchor="middle">c</text>
          <text x="145" y="70" className="text-[10px] font-medium fill-slate-500" textAnchor="middle">b</text>
          <text x="108" y="75" className="text-[9px] font-bold fill-emerald-600" textAnchor="start">ha</text>
          {/* Right-angle square for height */}
          <rect x="100" y="103" width="7" height="7" fill="none" stroke={secondaryColor} strokeWidth="1" />
        </svg>
      );

    case 'right_triangle':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <polygon points="40,110 160,110 40,30" fill={fillColor} stroke={outlineColor} strokeWidth="2" strokeLinejoin="round" />
          {/* Altitude down from A to hypotenuse */}
          {/* A=(40,30), B=(40,110), C=(160,110) */}
          {/* Let's draw height from A down to BC at H */}
          <line x1="40" y1="110" x2="80" y2="60" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Right-angle square at A (40,110) */}
          <rect x="40" y="100" width="10" height="10" fill="none" stroke={outlineColor} strokeWidth="1.5" />
          {/* Labels */}
          <text x="32" y="115" className="text-[10px] font-bold fill-slate-850">A</text>
          <text x="32" y="32" className="text-[10px] font-bold fill-slate-850">B</text>
          <text x="168" y="115" className="text-[10px] font-bold fill-slate-850">C</text>
          <text x="86" y="55" className="text-[10px] font-semibold fill-emerald-600">H</text>
        </svg>
      );

    case 'equilateral_triangle':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <polygon points="40,110 160,110 100,15" fill={fillColor} stroke={outlineColor} strokeWidth="2" strokeLinejoin="round" />
          <line x1="100" y1="15" x2="100" y2="110" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Labels */}
          <text x="100" y="122" className="text-[10px] font-semibold text-slate-500" textAnchor="middle">a</text>
          <text x="60" y="65" className="text-[10px] font-semibold text-slate-500" textAnchor="middle">a</text>
          <text x="140" y="65" className="text-[10px] font-semibold text-slate-500" textAnchor="middle">a</text>
          <text x="108" y="60" className="text-[10px] font-bold fill-emerald-600">AH</text>
          {/* Side tick marks */}
          <line x1="68" y1="60" x2="72" y2="65" stroke={outlineColor} strokeWidth="1" />
          <line x1="128" y1="65" x2="132" y2="60" stroke={outlineColor} strokeWidth="1" />
          <line x1="97" y1="110" x2="100" y2="103" stroke={secondaryColor} strokeWidth="1" />
        </svg>
      );

    case 'square':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <rect x="50" y="20" width="100" height="100" fill={fillColor} stroke={outlineColor} strokeWidth="2" rx="2" />
          <text x="100" y="132" className="text-[10px] font-semibold text-slate-500" textAnchor="middle">a</text>
          <text x="38" y="75" className="text-[10px] font-semibold text-slate-500" textAnchor="middle">a</text>
          {/* Corner right angle */}
          <rect x="50" y="110" width="10" height="10" fill="none" stroke={outlineColor} strokeWidth="1" />
        </svg>
      );

    case 'rectangle':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <rect x="40" y="30" width="120" height="80" fill={fillColor} stroke={outlineColor} strokeWidth="2" rx="2" />
          <text x="100" y="122" className="text-[10px] font-semibold text-slate-500" textAnchor="middle">Chiều dài a</text>
          <text x="28" y="75" className="text-[10px] font-semibold text-slate-500" textAnchor="middle">b</text>
          <rect x="40" y="100" width="10" height="10" fill="none" stroke={outlineColor} strokeWidth="1" />
        </svg>
      );

    case 'parallelogram':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <polygon points="50,110 160,110 150,30 40,30" fill={fillColor} stroke={outlineColor} strokeWidth="2" strokeLinejoin="round" />
          {/* Height line */}
          <line x1="40" y1="30" x2="40" y2="110" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="40" y1="110" x2="50" y2="110" stroke={outlineColor} strokeWidth="1.5" />
          {/* Labels */}
          <text x="100" y="122" className="text-[10px] font-semibold text-slate-500" textAnchor="middle">đáy a</text>
          <text x="160" y="70" className="text-[10px] font-semibold text-slate-500">cạnh b</text>
          <text x="32" y="75" className="text-[10px] font-bold fill-emerald-600" textAnchor="end">h</text>
          <rect x="40" y="102" width="8" height="8" fill="none" stroke={secondaryColor} strokeWidth="1" />
        </svg>
      );

    case 'rhombus':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <polygon points="100,15 165,70 100,125 35,70" fill={fillColor} stroke={outlineColor} strokeWidth="2" strokeLinejoin="round" />
          {/* Diagonals */}
          <line x1="35" y1="70" x2="165" y2="70" stroke={activeColor} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="100" y1="15" x2="100" y2="125" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Labels */}
          <text x="100" y="65" className="text-[10px] font-bold fill-blue-600" textAnchor="middle">d1</text>
          <text x="106" y="90" className="text-[10px] font-bold fill-emerald-600">d2</text>
          <text x="145" y="45" className="text-[10px] font-medium text-slate-500">a</text>
        </svg>
      );

    case 'trapezoid':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <polygon points="30,110 170,110 130,30 60,30" fill={fillColor} stroke={outlineColor} strokeWidth="2" strokeLinejoin="round" />
          {/* Height */}
          <line x1="60" y1="30" x2="60" y2="110" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Labels */}
          <text x="95" y="24" className="text-[10px] font-semibold text-slate-500" textAnchor="middle">đáy bé a</text>
          <text x="100" y="122" className="text-[10px] font-semibold text-slate-500" textAnchor="middle">đáy lớn b</text>
          <text x="52" y="75" className="text-[10px] font-bold fill-emerald-600" textAnchor="end">h</text>
          <text x="40" y="70" className="text-[9px] text-slate-400">c</text>
          <text x="156" y="70" className="text-[9px] text-slate-400">d</text>
          <rect x="60" y="102" width="8" height="8" fill="none" stroke={secondaryColor} strokeWidth="1" />
        </svg>
      );

    case 'orthogonal_quadrilateral':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <polygon points="40,50 100,15 160,60 90,120" fill={fillColor} stroke={outlineColor} strokeWidth="2" strokeLinejoin="round" />
          <line x1="40" y1="50" x2="160" y2="60" stroke={activeColor} strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
          <line x1="100" y1="15" x2="90" y2="120" stroke={activeColor} strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
          <text x="32" y="54" className="text-[9px] font-bold">A</text>
          <text x="100" y="11" className="text-[9px] font-bold">B</text>
          <text x="168" y="64" className="text-[9px] font-bold">C</text>
          <text x="90" y="130" className="text-[9px] font-bold">D</text>
          <text x="98" y="73" className="text-[10px] font-bold fill-blue-600">O</text>
        </svg>
      );

    case 'ellipse':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <ellipse cx="100" cy="70" rx="70" ry="40" fill={fillColor} stroke={outlineColor} strokeWidth="2" />
          {/* Axis */}
          <line x1="30" y1="70" x2="170" y2="70" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="100" y1="30" x2="100" y2="110" stroke="#CBD5E1" strokeWidth="1" />
          {/* Markers */}
          <line x1="100" y1="70" x2="170" y2="70" stroke={activeColor} strokeWidth="2" />
          <line x1="100" y1="70" x2="100" y2="30" stroke={secondaryColor} strokeWidth="2" />
          <text x="135" y="82" className="text-[10px] font-bold fill-blue-600" textAnchor="middle">a</text>
          <text x="92" y="50" className="text-[10px] font-bold fill-emerald-600" textAnchor="middle">b</text>
        </svg>
      );

    case 'circle':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <circle cx="100" cy="70" r="50" fill={fillColor} stroke={outlineColor} strokeWidth="2" />
          {/* Radius */}
          <line x1="100" y1="70" x2="148" y2="86" stroke={activeColor} strokeWidth="2" />
          <circle cx="100" cy="70" r="3" fill={outlineColor} />
          <text x="100" y="65" className="text-[10px] font-medium" textAnchor="middle">O</text>
          <text x="126" y="75" className="text-[10px] font-bold fill-blue-600">r</text>
        </svg>
      );

    // 3D Shapes Drawings
    case 'prism_variable':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          {/* Top base */}
          <polygon points="60,20 140,15 150,40 70,45" fill={dashedFill} stroke={outlineColor} strokeWidth="1.5" />
          {/* Bottom base */}
          <polygon points="60,100 140,95 150,120 70,125" fill={fillColor} stroke={outlineColor} strokeWidth="1.5" />
          {/* Connecting vertical lines */}
          <line x1="60" y1="20" x2="60" y2="100" stroke={outlineColor} strokeWidth="2" />
          <line x1="140" y1="15" x2="140" y2="95" stroke={outlineColor} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="150" y1="40" x2="150" y2="120" stroke={outlineColor} strokeWidth="2" />
          <line x1="70" y1="45" x2="70" y2="125" stroke={outlineColor} strokeWidth="2" />
          {/* Simpson height mark */}
          <line x1="45" y1="20" x2="45" y2="100" stroke={secondaryColor} strokeWidth="1.5" />
          <line x1="40" y1="20" x2="50" y2="20" stroke={secondaryColor} strokeWidth="1.5" />
          <line x1="40" y1="100" x2="50" y2="100" stroke={secondaryColor} strokeWidth="1.5" />
          <text x="36" y="65" className="text-[10px] font-bold fill-emerald-600" textAnchor="end">h</text>
          <text x="105" y="32" className="text-[9px] fill-slate-500">A1</text>
          <text x="110" y="112" className="text-[9px] fill-slate-500">A2</text>
        </svg>
      );

    case 'roof_prism':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          {/* Base plane */}
          <polygon points="40,110 130,95 160,115 70,130" fill={fillColor} stroke={outlineColor} strokeWidth="1.5" />
          {/* Top linear ridge */}
          <line x1="70" y1="35" x2="135" y2="25" stroke={outlineColor} strokeWidth="2.5" />
          {/* Side walls */}
          <line x1="70" y1="35" x2="40" y2="110" stroke={outlineColor} strokeWidth="2" />
          <line x1="70" y1="35" x2="70" y2="130" stroke={outlineColor} strokeWidth="2" />
          <line x1="135" y1="25" x2="130" y2="95" stroke={outlineColor} strokeWidth="1" strokeDasharray="3 3" />
          <line x1="135" y1="25" x2="160" y2="115" stroke={outlineColor} strokeWidth="2" />
          {/* Labels */}
          <text x="100" y="22" className="text-[10px] font-bold" textAnchor="middle">a1</text>
          <text x="50" y="125" className="text-[10px] font-bold text-slate-400">a</text>
          <text x="115" y="122" className="text-[10px] font-bold text-slate-500">L</text>
        </svg>
      );

    case 'sphere':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <defs>
            <radialGradient id="sphereGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="70" r="50" fill="url(#sphereGrad)" stroke={outlineColor} strokeWidth="2" />
          {/* 3D Ellipse belt */}
          <ellipse cx="100" cy="70" rx="50" ry="15" fill="none" stroke={outlineColor} strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="100" y1="70" x2="150" y2="70" stroke={activeColor} strokeWidth="2.5" />
          <circle cx="100" cy="70" r="3" fill={outlineColor} />
          <text x="125" y="64" className="text-[11px] font-extrabold fill-blue-600" textAnchor="middle">R</text>
        </svg>
      );

    case 'spherical_cap':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          {/* Truncated circle (cap only) */}
          <path d="M 58,50 A 50,50 0 0,1 142,50 Z" fill={fillColor} stroke={outlineColor} strokeWidth="2" />
          {/* Rest of sphere in faint dots */}
          <path d="M 142,50 A 50,50 0 0,1 58,50" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
          <ellipse cx="100" cy="50" rx="42" ry="10" fill="none" stroke={outlineColor} strokeWidth="1.5" />
          {/* Height marker */}
          <line x1="100" y1="50" x2="100" y2="20" stroke={secondaryColor} strokeWidth="2" />
          <line x1="100" y1="70" x2="100" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="100" cy="70" r="2.5" fill={outlineColor} />
          {/* Labels */}
          <text x="104" y="38" className="text-[10px] font-bold fill-emerald-600">h</text>
          <text x="125" y="47" className="text-[10px] font-bold" textAnchor="middle">r</text>
          <line x1="100" y1="50" x2="142" y2="50" stroke={outlineColor} strokeWidth="1.5" />
        </svg>
      );

    case 'spherical_segment':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <path d="M 58,45 A 50,50 0 0,1 142,45 L 148,85 A 50,50 0 0,1 52,85 Z" fill={fillColor} stroke={outlineColor} strokeWidth="2" />
          <ellipse cx="100" cy="45" rx="42" ry="10" fill="none" stroke={outlineColor} strokeWidth="1.5" />
          <ellipse cx="100" cy="85" rx="48" ry="12" fill="none" stroke={outlineColor} strokeWidth="1.5" />
          {/* Height */}
          <line x1="100" y1="45" x2="100" y2="85" stroke={secondaryColor} strokeWidth="2" strokeDasharray="2 1" />
          <text x="94" y="68" className="text-[10px] font-bold fill-emerald-600">h</text>
          <text x="120" y="40" className="text-[9px] text-slate-500">r1</text>
          <text x="125" y="94" className="text-[9px] text-slate-500">r2</text>
        </svg>
      );

    case 'cone':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          {/* Bottom ellipse */}
          <ellipse cx="100" cy="115" rx="50" ry="15" fill={dashedFill} stroke={outlineColor} strokeWidth="1.5" />
          {/* Cone walls */}
          <line x1="100" y1="20" x2="50" y2="115" stroke={outlineColor} strokeWidth="2" />
          <line x1="100" y1="20" x2="150" y2="115" stroke={outlineColor} strokeWidth="2" />
          {/* Height and Radius inside */}
          <line x1="100" y1="20" x2="100" y2="115" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="100" y1="115" x2="150" y2="115" stroke={activeColor} strokeWidth="1.5" />
          {/* Labels */}
          <text x="125" y="125" className="text-[10px] font-bold fill-blue-600" textAnchor="middle">r</text>
          <text x="92" y="70" className="text-[10px] font-bold fill-emerald-600" textAnchor="end">h</text>
          <text x="135" y="65" className="text-[10px] font-bold">l</text>
        </svg>
      );

    case 'cylinder':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <ellipse cx="100" cy="115" rx="50" ry="15" fill={fillColor} stroke={outlineColor} strokeWidth="1.5" />
          <rect x="50" y="30" width="100" height="85" fill={fillColor} fillOpacity="0.1" stroke="none" />
          <ellipse cx="100" cy="30" rx="50" ry="15" fill={dashedFill} stroke={outlineColor} strokeWidth="1.5" />
          {/* Vertical edges */}
          <line x1="50" y1="30" x2="50" y2="115" stroke={outlineColor} strokeWidth="2" />
          <line x1="150" y1="30" x2="150" y2="115" stroke={outlineColor} strokeWidth="2" />
          {/* Measurements */}
          <line x1="100" y1="30" x2="150" y2="30" stroke={activeColor} strokeWidth="2" />
          <line x1="162" y1="30" x2="162" y2="115" stroke={secondaryColor} strokeWidth="1.5" />
          <text x="125" y="25" className="text-[10px] font-bold fill-blue-600" textAnchor="middle">r</text>
          <text x="172" y="75" className="text-[10px] font-bold fill-emerald-600">h = l</text>
        </svg>
      );

    case 'cylinder_truncated':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <ellipse cx="120" cy="115" rx="40" ry="12" fill={fillColor} stroke={outlineColor} strokeWidth="1.5" />
          {/* Slanted top */}
          <ellipse cx="120" cy="45" rx="40" ry="15" transform="rotate(-15 120 45)" fill={dashedFill} stroke={outlineColor} strokeWidth="1.5" />
          {/* Connecting sides */}
          <line x1="80" y1="55" x2="80" y2="115" stroke={outlineColor} strokeWidth="2" />
          <line x1="160" y1="35" x2="160" y2="115" stroke={outlineColor} strokeWidth="2" />
          {/* Labels */}
          <text x="72" y="90" className="text-[9px] font-bold fill-emerald-600">h1</text>
          <text x="168" y="75" className="text-[9px] font-bold fill-emerald-600">h2</text>
          <text x="120" y="130" className="text-[9px] font-bold fill-blue-600" textAnchor="middle">R</text>
        </svg>
      );

    case 'cone_truncated':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <ellipse cx="100" cy="115" rx="55" ry="15" fill={fillColor} stroke={outlineColor} strokeWidth="1.5" />
          <ellipse cx="100" cy="35" rx="25" ry="8" fill={dashedFill} stroke={outlineColor} strokeWidth="1.5" />
          <line x1="45" y1="115" x2="75" y2="35" stroke={outlineColor} strokeWidth="2" />
          <line x1="155" y1="115" x2="125" y2="35" stroke={outlineColor} strokeWidth="2" />
          {/* Annotations */}
          <line x1="100" y1="35" x2="100" y2="115" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="94" y="75" className="text-[10px] font-bold fill-emerald-600">h</text>
          <text x="115" y="30" className="text-[9px] font-bold fill-blue-600">r</text>
          <text x="125" y="125" className="text-[9px] font-bold fill-blue-600">R</text>
          <text x="150" y="75" className="text-[9px] font-bold">l</text>
        </svg>
      );

    // Advanced / Calculus Shapes
    case 'viviani':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <circle cx="100" cy="70" r="50" fill={fillColor} fillOpacity="0.4" stroke={outlineColor} strokeWidth="1" strokeDasharray="3 3" />
          {/* Cylindrical cutout on the side */}
          <ellipse cx="120" cy="70" rx="20" ry="46" fill="none" stroke={activeColor} strokeWidth="2" />
          <line x1="120" y1="24" x2="120" y2="116" stroke={activeColor} strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Sphere outline Solid segments */}
          <path d="M 50,70 A 50,50 0 0,1 150,70" fill="none" stroke={outlineColor} strokeWidth="2" />
          <circle cx="100" cy="70" r="3" fill={outlineColor} />
          {/* Radius label */}
          <line x1="100" y1="70" x2="50" y2="70" stroke={outlineColor} strokeWidth="2" />
          <text x="75" y="65" className="text-[10px] font-bold">R</text>
        </svg>
      );

    case 'ellipsoid':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <ellipse cx="100" cy="70" rx="65" ry="40" fill={fillColor} stroke={outlineColor} strokeWidth="2" />
          {/* Horizontal belt */}
          <ellipse cx="100" cy="70" rx="65" ry="12" fill="none" stroke={secondaryColor} strokeWidth="1" strokeDasharray="3 3" />
          {/* Vertical belt */}
          <ellipse cx="100" cy="70" rx="20" ry="40" fill="none" stroke={activeColor} strokeWidth="1" strokeDasharray="3 3" />
          {/* Center */}
          <circle cx="100" cy="70" r="2.5" fill={outlineColor} />
          <text x="135" y="65" className="text-[10px] font-bold fill-emerald-600">a</text>
          <text x="105" y="45" className="text-[10px] font-bold text-slate-500">c</text>
          <text x="110" y="85" className="text-[10px] font-bold fill-blue-600">b</text>
        </svg>
      );

    case 'hyperboloid_segment':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          {/* Hyperbola profiles */}
          <path d="M 60,25 C 90,60 90,80 60,115" fill="none" stroke={outlineColor} strokeWidth="2" />
          <path d="M 140,25 C 110,60 110,80 140,115" fill="none" stroke={outlineColor} strokeWidth="2" />
          {/* Ellipses */}
          <ellipse cx="100" cy="25" rx="40" ry="10" fill={dashedFill} stroke={outlineColor} strokeWidth="1" />
          <ellipse cx="100" cy="115" rx="40" ry="10" fill={fillColor} stroke={outlineColor} strokeWidth="1.5" />
          {/* Center belt */}
          <ellipse cx="100" cy="70" rx="20" ry="6" fill="none" stroke={secondaryColor} strokeWidth="1.5" />
          {/* Labels */}
          <text x="100" y="62" className="text-[9px] font-bold fill-emerald-600" textAnchor="middle">a (eo)</text>
          <text x="100" y="95" className="text-[9px] text-slate-500" textAnchor="middle">h + k</text>
        </svg>
      );

    case 'torus':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <ellipse cx="100" cy="70" rx="72" ry="38" fill={fillColor} stroke={outlineColor} strokeWidth="2" />
          {/* Inside cutout hole */}
          <ellipse cx="100" cy="66" rx="30" ry="14" fill="#FFFFFF" stroke={outlineColor} strokeWidth="1.5" />
          <path d="M 66,66 C 70,76 130,76 134,66" fill="none" stroke={outlineColor} strokeWidth="1.5" />
          {/* Radii and arrows */}
          <line x1="100" y1="66" x2="162" y2="70" stroke={activeColor} strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="100" cy="66" r="2.5" fill={outlineColor} />
          <text x="135" y="62" className="text-[10px] font-bold fill-blue-600">R</text>
          <circle cx="152" cy="71" r="10" fill="none" stroke={secondaryColor} strokeWidth="1" />
          <text x="152" y="86" className="text-[9px] font-extrabold fill-emerald-600" textAnchor="middle">r</text>
        </svg>
      );

    case 'drop_piriform':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          {/* Piriform drop curve */}
          <path d="M 160,70 C 130,50 80,42 50,70 C 80,98 130,90 160,70 Z" fill={fillColor} stroke={outlineColor} strokeWidth="2" strokeLinejoin="round" />
          {/* Center axis */}
          <line x1="50" y1="70" x2="160" y2="70" stroke={activeColor} strokeWidth="1" strokeDasharray="3 3" />
          <text x="105" y="65" className="text-[10px] font-bold fill-blue-600" textAnchor="middle">h</text>
          <text x="90" y="40" className="text-[9px] font-bold fill-emerald-600">a (béo bụng)</text>
        </svg>
      );

    // Fallback general polygon drawing displaying neat math formula indicator
    default:
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-40 mx-auto" aria-label={name}>
          <rect x="30" y="20" width="140" height="100" fill={fillColor} stroke={outlineColor} strokeWidth="1.5" rx="12" />
          <circle cx="100" cy="65" r="32" fill="#E2E8F0" stroke={activeColor} strokeWidth="1" strokeDasharray="3 3" />
          <text x="100" y="69" className="text-xl font-bold fill-blue-600 font-display" textAnchor="middle">∑</text>
          <text x="100" y="112" className="text-[10px] font-medium fill-slate-500" textAnchor="middle">Khối 3D Chuyên Sâu</text>
        </svg>
      );
  }
}
