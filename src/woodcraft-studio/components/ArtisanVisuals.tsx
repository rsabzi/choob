import React, { useEffect, useState } from 'react';
import { WoodSpecies, toPersianDigits } from '../data/products';

export const LiveWoodenClockSVG: React.FC<{
  wood: WoodSpecies;
  engravingText?: string;
  size?: number;
}> = ({ wood, engravingText, size = 148 }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6;
  const hourAngle = hours * 30;

  const fillMap: Record<string, { outer: string; inner: string; ring: string }> = {
    walnut: { outer: '#2B1A10', inner: '#3E2617', ring: '#593722' },
    oak: { outer: '#6E4522', inner: '#8C5A32', ring: '#B07645' },
    beech: { outer: '#8E5E37', inner: '#B67E4E', ring: '#CF996B' },
    olive: { outer: '#593D1E', inner: '#7A552C', ring: '#A67843' },
  };

  const palette = fillMap[wood.id] || fillMap.walnut;

  return (
    <div className="relative inline-flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_16px_28px_rgba(0,0,0,0.75)]"
        aria-label="ساعت دیواری چوبی دست‌ساز"
      >
        <defs>
          <radialGradient id={`clockWoodGrad-${wood.id}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={palette.ring} />
            <stop offset="55%" stopColor={palette.inner} />
            <stop offset="100%" stopColor={palette.outer} />
          </radialGradient>
          <linearGradient id="brassBezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D08A" />
            <stop offset="50%" stopColor="#D49B54" />
            <stop offset="100%" stopColor="#8E5B23" />
          </linearGradient>
        </defs>

        {/* Outer Brushed Brass & Wood Rim */}
        <circle cx="100" cy="100" r="94" fill={`url(#clockWoodGrad-${wood.id})`} stroke="url(#brassBezel)" strokeWidth="3.5" />
        <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(255, 240, 220, 0.14)" strokeWidth="1" />

        {/* Organic Wood Grain Rings */}
        <path
          d="M32,95 C45,50 85,32 128,42 C164,51 174,98 158,136 C140,170 76,174 46,142 Z"
          fill="none"
          stroke="rgba(20, 10, 4, 0.28)"
          strokeWidth="1.6"
        />
        <path
          d="M48,100 C56,64 90,48 122,56 C150,64 156,102 142,128 C126,154 78,156 56,130 Z"
          fill="none"
          stroke="rgba(255, 236, 209, 0.1)"
          strokeWidth="1.2"
        />

        {/* 12 Brass Hour Indices */}
        {Array.from({ length: 12 }).map((_, i) => {
          const deg = i * 30;
          const isMajor = i % 3 === 0;
          return (
            <g key={i} transform={`rotate(${deg} 100 100)`}>
              <line
                x1="100"
                y1={isMajor ? '14' : '16'}
                x2="100"
                y2={isMajor ? '28' : '24'}
                stroke="url(#brassBezel)"
                strokeWidth={isMajor ? '3.2' : '1.8'}
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* Custom Engraving Text on Clock Dial */}
        {engravingText ? (
          <text
            x="100"
            y="142"
            textAnchor="middle"
            fill="rgba(245, 214, 167, 0.85)"
            fontSize="10"
            fontWeight="600"
            style={{ letterSpacing: '0.02em' }}
          >
            {engravingText.slice(0, 18)}
          </text>
        ) : (
          <text
            x="100"
            y="140"
            textAnchor="middle"
            fill="rgba(212, 155, 84, 0.65)"
            fontSize="8.5"
            fontWeight="700"
          >
            آتلیه چوب اُرسی
          </text>
        )}

        {/* Hour Hand */}
        <g transform={`rotate(${hourAngle} 100 100)`}>
          <line
            x1="100"
            y1="108"
            x2="100"
            y2="52"
            stroke="url(#brassBezel)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </g>

        {/* Minute Hand */}
        <g transform={`rotate(${minuteAngle} 100 100)`}>
          <line
            x1="100"
            y1="112"
            x2="100"
            y2="34"
            stroke="#F3D39C"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Sweeping Second Hand */}
        <g transform={`rotate(${secondAngle} 100 100)`}>
          <line
            x1="100"
            y1="118"
            x2="100"
            y2="26"
            stroke="#D49B54"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="5" fill="#D49B54" />
          <circle cx="100" cy="100" r="2" fill="#120E0A" />
        </g>
      </svg>

      {/* Subtle Live Time Pill */}
      <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass-pill text-[#F7F2EB] border border-[#D49B54]/30 tabular-nums-fa">
        {toPersianDigits(
          `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(
            now.getSeconds()
          ).padStart(2, '0')}`
        )}
      </span>
    </div>
  );
};

export const WoodEngravingPreview: React.FC<{
  wood: WoodSpecies;
  text: string;
  fontStyle: 'nastaaliq' | 'modern' | 'minimal-latin';
}> = ({ wood, text, fontStyle }) => {
  const displayText = text.trim() || 'یادگاری ماندگار شما روی چوب طبیعی...';

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 border border-[#FFF0DC]/20 shadow-inner transition-all duration-500"
      style={{ background: wood.swatchGradient }}
    >
      {/* SVG Organic Wood Grain Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,25 Q110,5 220,28 T400,20 M0,60 Q140,42 260,68 T400,55 M0,95 Q95,112 230,88 T400,98"
          fill="none"
          style={{ stroke: '#120804' }}
          strokeWidth="2"
        />
        <path
          d="M0,42 Q160,22 290,46 T400,38 M0,78 Q120,64 250,82 T400,74"
          fill="none"
          style={{ stroke: '#FFF2DF' }}
          strokeWidth="0.9"
        />
      </svg>

      {/* Four Brass Corner Pins */}
      <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#F7D794] to-[#9B6424] shadow" />
      <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#F7D794] to-[#9B6424] shadow" />
      <span className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#F7D794] to-[#9B6424] shadow" />
      <span className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#F7D794] to-[#9B6424] shadow" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[68px] text-center px-3">
        <span className="text-[11px] uppercase tracking-wider text-[#F7F2EB]/70 mb-1.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D49B54] animate-pulse" />
          پیش‌نمایش حکاکی لیزری روی {wood.name}
        </span>
        <p
          className={`text-lg md:text-xl transition-all duration-300 ${
            fontStyle === 'nastaaliq'
              ? 'font-lalezar tracking-wide text-[#221208]'
              : fontStyle === 'modern'
              ? 'font-extrabold text-[#1E1007]'
              : 'font-semibold tracking-widest text-[#231309]'
          }`}
          style={{
            textShadow: '0 1px 0 rgba(255, 232, 198, 0.42), 0 -1px 1px rgba(0, 0, 0, 0.85)',
          }}
        >
          {displayText}
        </p>
      </div>
    </div>
  );
};
