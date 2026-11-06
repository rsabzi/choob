import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Award,
  CheckCircle2,
  Flame,
  Eye,
} from 'lucide-react';
import {
  WoodSpecies,
  WoodProduct,
  toPersianDigits,
  formatTomans,
  woodById,
} from '../data/products';
import type { SiteSettings } from '../store/types';
import { LiveWoodenClockSVG } from './ArtisanVisuals';

interface HeroSectionProps {
  products: WoodProduct[];
  woods: WoodSpecies[];
  settings: SiteSettings;
  onSelectProductForCustomizing: (product: WoodProduct) => void;
  onQuickInspect: (product: WoodProduct) => void;
}

const STAT_ICONS = [ShieldCheck, Award, CheckCircle2];

export const HeroSection: React.FC<HeroSectionProps> = ({
  products,
  woods,
  settings,
  onSelectProductForCustomizing,
  onQuickInspect,
}) => {
  const [heroWoodId, setHeroWoodId] = useState<string>(woods[0]?.id ?? 'walnut');
  const activeWood = woodById(woods, heroWoodId);

  const clockProduct = products[0];
  const laptopProduct = products[1];
  const phoneProduct = products[2];

  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient Warm Light Orbs */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 w-[460px] h-[460px] rounded-full blur-[130px] opacity-35 transition-all duration-700"
        style={{ background: activeWood.accentHex }}
      />
      <div className="pointer-events-none absolute bottom-0 left-10 w-[380px] h-[380px] rounded-full bg-[#B86B35]/20 blur-[120px]" />

      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-right space-y-6">
            <div className="glass-pill px-4 py-2 rounded-full inline-flex items-center gap-2.5 border border-[#D49B54]/35">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D49B54] animate-ping" />
              <span className="text-xs sm:text-sm font-semibold text-[#F7F2EB]">
                {settings.heroBadge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl xl:text-[54px] font-black leading-[1.22] tracking-tight text-[#F7F2EB]">
              {settings.heroTitleLead}{' '}
              <span className="bg-gradient-to-l from-[#F5D08A] via-[#D49B54] to-[#B86B35] bg-clip-text text-transparent">
                {settings.heroTitleAccent}
              </span>{' '}
              {settings.heroTitleTail}
            </h1>

            <p className="text-base sm:text-lg text-[#C8B9A6] leading-relaxed max-w-[64ch]">
              {settings.heroSubtitle}
            </p>

            {/* Wood Palette Switcher */}
            <div className="glass-panel rounded-2xl p-4 w-full max-w-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="text-xs sm:text-sm font-bold text-[#F7F2EB] flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#D49B54]" />
                  پالت چوب طبیعی کارگاه را امتحان کنید:
                </span>
                <span className="text-xs text-[#D49B54] font-medium">
                  {activeWood.name} — {activeWood.subtitle}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {woods.map((wood) => {
                  const isSelected = wood.id === heroWoodId;
                  return (
                    <button
                      key={wood.id}
                      type="button"
                      onClick={() => setHeroWoodId(wood.id)}
                      className={`px-3 py-2.5 rounded-xl flex items-center gap-2.5 text-right transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#FFF4E5]/15 border-[#D49B54] shadow-lg shadow-[#D49B54]/15 scale-[1.02]'
                          : 'bg-[#120E0A]/45 border-[#FFF0DC]/10 hover:border-[#FFF0DC]/25'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full shrink-0 border border-white/25 shadow-inner"
                        style={{ background: wood.swatchGradient }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#F7F2EB] truncate">
                          {wood.name.replace('چوب ', '')}
                        </span>
                        <span className="text-[10px] text-[#C8B9A6] truncate">
                          ضریب {toPersianDigits(Math.round(wood.priceMultiplier * 100))}٪
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#customizer"
                className="btn-honey-gold px-7 py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <Sparkles className="w-5 h-5" />
                <span>طراحی و ثبت سفارش اختصاصی</span>
                <ArrowLeft className="w-4 h-4" />
              </a>

              <a
                href="#portfolio"
                className="glass-panel hover:border-[#D49B54]/50 text-[#F7F2EB] px-6 py-4 rounded-full text-sm sm:text-base font-semibold flex items-center justify-center gap-2.5 transition-all w-full sm:w-auto"
              >
                <Eye className="w-4 h-4 text-[#D49B54]" />
                <span>مشاهده {toPersianDigits(products.length)} نمونه‌کار برگزیده</span>
              </a>
            </div>

            {/* Trust Metrics (editable from admin) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-5 pt-3 w-full border-t border-[#FFF0DC]/10">
              {settings.heroStats.slice(0, 3).map((stat, idx) => {
                const Icon = STAT_ICONS[idx % STAT_ICONS.length];
                return (
                  <div key={idx} className="flex items-start gap-2.5">
                    <Icon
                      className={`w-5 h-5 shrink-0 mt-1 hidden min-[420px]:block ${
                        idx === 0 ? 'text-[#4E9F6E]' : 'text-[#D49B54]'
                      }`}
                    />
                    <div>
                      <div className="text-[13px] sm:text-base font-extrabold text-[#F7F2EB] leading-snug">
                        {stat.value}
                      </div>
                      <p className="text-[10px] sm:text-xs text-[#C8B9A6] leading-snug">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Stage Column */}
          <div className="lg:col-span-5 relative w-full max-w-[560px] mx-auto lg:max-w-none">
            <div className="relative glass-panel-elevated rounded-[28px] p-3.5 sm:p-5 overflow-hidden group">
              <div
                className="pointer-events-none absolute inset-0 transition-colors duration-700 z-10 rounded-[24px]"
                style={{ backgroundColor: activeWood.tintOverlay, mixBlendMode: 'soft-light' }}
              />

              <div className="relative rounded-[22px] overflow-hidden aspect-[4/3.4] sm:aspect-[4/3.6] lg:aspect-[4/4.3] bg-[#18120C]">
                <img
                  src={settings.heroImage}
                  alt="مجموعه دست‌سازه‌های چوبی کارگاه"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120E0A] via-[#120E0A]/25 to-transparent" />

                {clockProduct && (
                  <button
                    type="button"
                    onClick={() => onQuickInspect(clockProduct)}
                    className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 glass-panel hover:border-[#D49B54] px-3 py-2 sm:px-3.5 rounded-2xl text-right transition-all cursor-pointer group/spot max-w-[172px] min-[420px]:max-w-[230px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D49B54] ring-4 ring-[#D49B54]/25 shrink-0" />
                      <span className="text-xs font-bold text-[#F7F2EB] group-hover/spot:text-[#D49B54] transition-colors truncate">
                        {clockProduct.title}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#C8B9A6] mt-0.5 tabular-nums-fa">
                      {formatTomans(clockProduct.basePrice)} تومان • مشاهده
                    </div>
                  </button>
                )}

                {laptopProduct && (
                  <button
                    type="button"
                    onClick={() => onQuickInspect(laptopProduct)}
                    className="absolute bottom-24 sm:bottom-28 right-3.5 sm:right-5 z-20 glass-panel hover:border-[#D49B54] px-3 py-2 sm:px-3.5 rounded-2xl text-right transition-all cursor-pointer group/spot max-w-[172px] min-[420px]:max-w-[230px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4E9F6E] ring-4 ring-[#4E9F6E]/25 shrink-0" />
                      <span className="text-xs font-bold text-[#F7F2EB] group-hover/spot:text-[#D49B54] transition-colors truncate">
                        {laptopProduct.title}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#C8B9A6] mt-0.5 tabular-nums-fa">
                      {formatTomans(laptopProduct.basePrice)} تومان • سفارشی‌سازی
                    </div>
                  </button>
                )}

                <div className="absolute top-4 left-4 z-20 hidden sm:flex flex-col items-center glass-panel rounded-2xl p-2.5 animate-float-slow">
                  <LiveWoodenClockSVG wood={activeWood} size={112} />
                </div>

                <div className="absolute bottom-3 inset-x-3 z-20 glass-panel-elevated rounded-2xl p-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[11px] text-[#D49B54] font-bold block">
                      بافت انتخابی فعلی: {activeWood.name}
                    </span>
                    <p className="text-xs text-[#F7F2EB] line-clamp-1 mt-0.5">
                      {activeWood.grainDescription}
                    </p>
                  </div>
                  {phoneProduct && (
                    <button
                      type="button"
                      onClick={() => onSelectProductForCustomizing(phoneProduct)}
                      className="btn-honey-gold px-3.5 py-2 rounded-xl text-xs shrink-0 cursor-pointer"
                    >
                      سفارش این ست
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
