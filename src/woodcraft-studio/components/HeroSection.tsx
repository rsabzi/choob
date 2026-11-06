import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Award,
  Flame,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import {
  WOOD_SPECIES,
  WoodSpeciesId,
  WoodProduct,
  toPersianDigits,
  formatTomans,
} from '../data/products';
import { LiveWoodenClockSVG } from './ArtisanVisuals';

interface HeroSectionProps {
  products: WoodProduct[];
  onSelectProductForCustomizing: (product: WoodProduct) => void;
  onQuickInspect: (product: WoodProduct) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  products,
  onSelectProductForCustomizing,
  onQuickInspect,
}) => {
  const [heroWoodId, setHeroWoodId] = useState<WoodSpeciesId>('walnut');
  const activeWood = WOOD_SPECIES[heroWoodId];

  const clockProduct = products[0];
  const laptopProduct = products[1];
  const phoneProduct = products[2];

  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient Warm Light Orbs Behind Frosted Glass */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 w-[460px] h-[460px] rounded-full blur-[130px] opacity-35 transition-all duration-700"
        style={{ background: activeWood.accentHex }}
      />
      <div className="pointer-events-none absolute bottom-0 left-10 w-[380px] h-[380px] rounded-full bg-[#B86B35]/20 blur-[120px]" />

      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Right Column (7 cols in RTL): Emotional Hook & Conversion CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-right space-y-6">
            {/* Frosted Craft Badge */}
            <div className="glass-pill px-4 py-2 rounded-full inline-flex items-center gap-2.5 border border-[#D49B54]/35">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D49B54] animate-ping" />
              <span className="text-xs sm:text-sm font-semibold text-[#F7F2EB]">
                دست‌سازه‌های تزیینی چوب طبیعی با حکاکی اختصاصی نام شما
              </span>
            </div>

            {/* Hero Display Title */}
            <h1 className="text-3xl sm:text-5xl xl:text-[54px] font-black leading-[1.22] tracking-tight text-[#F7F2EB]">
              گرمای اصیل چوب،{' '}
              <span className="bg-gradient-to-l from-[#F5D08A] via-[#D49B54] to-[#B86B35] bg-clip-text text-transparent">
                تراش‌خورده با دست
              </span>{' '}
              برای میز کار و دیوارهای خاص شما
            </h1>

            {/* Persuasive Subtitle */}
            <p className="text-base sm:text-lg text-[#C8B9A6] leading-relaxed max-w-[64ch]">
              در آتلیه نجاری <strong className="text-[#F7F2EB]">اُرسی</strong>، هر تکه چوب گردو، بلوط و زیتون با
              ظرافت ساعت‌سازی به <span className="text-[#F7F2EB] font-medium">ساعت‌های دیواری مدرن</span>،{' '}
              <span className="text-[#F7F2EB] font-medium">استند لپ‌تاپ و موبایل</span>،{' '}
              <span className="text-[#F7F2EB] font-medium">جاکلیدی‌های مغناطیسی</span> و اکسسوری‌های دکوراتیو
              تبدیل می‌شود؛ آثاری که با دیدن و لمس رگه‌های طبیعی‌شان، فضای شما را متمایز می‌کنند.
            </p>

            {/* Interactive Wood Tone Switcher Bar inside Glass Pill */}
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
                {(Object.keys(WOOD_SPECIES) as WoodSpeciesId[]).map((woodKey) => {
                  const wood = WOOD_SPECIES[woodKey];
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

            {/* Dual Action CTAs */}
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
                <span>مشاهده ۸ نمونه‌کار برگزیده</span>
              </a>
            </div>

            {/* 3 Concrete Trust & Craftsmanship Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 pt-3 w-full border-t border-[#FFF0DC]/10">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#4E9F6E] shrink-0 mt-1" />
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-[#F7F2EB] tabular-nums-fa">
                    {toPersianDigits(5)} سال ضمانت
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#C8B9A6]">
                    سلامت بافت چوب و موتور ساعت
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Award className="w-5 h-5 text-[#D49B54] shrink-0 mt-1" />
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-[#F7F2EB] tabular-nums-fa">
                    +{toPersianDigits(1480)} سفارش موفق
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#C8B9A6]">
                    ارسال ایمن به سراسر ایران
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#E5B26D] shrink-0 mt-1" />
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-[#F7F2EB]">
                    حکاکی رایگان لیزری
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#C8B9A6]">
                    نام، تاریخ یا لوگوی دلخواه شما
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column (5 cols in RTL): Layered Glassmorphic Product Stage */}
          <div className="lg:col-span-5 relative">
            <div className="relative glass-panel-elevated rounded-[28px] p-3.5 sm:p-5 overflow-hidden group">
              {/* Dynamic Wood Tint Atmosphere */}
              <div
                className="pointer-events-none absolute inset-0 transition-colors duration-700 z-10 rounded-[24px]"
                style={{ backgroundColor: activeWood.tintOverlay, mixBlendMode: 'soft-light' }}
              />

              {/* Main Hero Studio Photography */}
              <div className="relative rounded-[22px] overflow-hidden aspect-[4/4.3] bg-[#18120C]">
                <img
                  src="/images/hero-desk-setup.jpg"
                  alt="مجموعه دست‌سازه‌های چوبی استند لپ‌تاپ، استند گوشی، ساعت دیواری و جاکلیدی"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120E0A] via-[#120E0A]/25 to-transparent" />

                {/* Interactive Hotspot 1: Wall Clock */}
                {clockProduct && (
                  <button
                    type="button"
                    onClick={() => onQuickInspect(clockProduct)}
                    className="absolute top-5 right-5 z-20 glass-panel hover:border-[#D49B54] px-3.5 py-2 rounded-2xl text-right transition-all cursor-pointer group/spot max-w-[215px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D49B54] ring-4 ring-[#D49B54]/25" />
                      <span className="text-xs font-bold text-[#F7F2EB] group-hover/spot:text-[#D49B54] transition-colors">
                        ساعت دیواری آوروم
                      </span>
                    </div>
                    <div className="text-[11px] text-[#C8B9A6] mt-0.5 tabular-nums-fa">
                      {formatTomans(clockProduct.basePrice)} تومان • مشاهده
                    </div>
                  </button>
                )}

                {/* Interactive Hotspot 2: Laptop Stand */}
                {laptopProduct && (
                  <button
                    type="button"
                    onClick={() => onQuickInspect(laptopProduct)}
                    className="absolute bottom-28 right-5 z-20 glass-panel hover:border-[#D49B54] px-3.5 py-2 rounded-2xl text-right transition-all cursor-pointer group/spot"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4E9F6E] ring-4 ring-[#4E9F6E]/25" />
                      <span className="text-xs font-bold text-[#F7F2EB] group-hover/spot:text-[#D49B54] transition-colors">
                        استند لپ‌تاپ معلق آرک
                      </span>
                    </div>
                    <div className="text-[11px] text-[#C8B9A6] mt-0.5 tabular-nums-fa">
                      {formatTomans(laptopProduct.basePrice)} تومان • سفارشی‌سازی
                    </div>
                  </button>
                )}

                {/* Live Interactive Wooden Wall Clock Floating Widget (Top-Left) */}
                <div className="absolute top-4 left-4 z-20 hidden sm:flex flex-col items-center glass-panel rounded-2xl p-2.5 animate-float-slow">
                  <LiveWoodenClockSVG wood={activeWood} size={112} />
                </div>

                {/* Bottom Glassmorphic Featured Bar inside Hero Stage */}
                <div className="absolute bottom-3 inset-x-3 z-20 glass-panel-elevated rounded-2xl p-3.5 flex items-center justify-between gap-3">
                  <div>
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
