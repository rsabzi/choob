import React from 'react';
import { Sparkles, ShoppingBag, Compass, Hammer, TreePine, MessageSquareHeart } from 'lucide-react';
import { toPersianDigits } from '../data/products';

interface GlassHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onJumpToCustomizer: () => void;
}

export const GlassHeader: React.FC<GlassHeaderProps> = ({
  cartCount,
  onOpenCart,
  onJumpToCustomizer,
}) => {
  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1360px] mx-auto">
        <nav
          aria-label="منوی اصلی"
          className="glass-panel-elevated rounded-full px-4 sm:px-7 py-3 flex items-center justify-between gap-3 transition-all duration-300"
        >
          {/* Studio Brand Emblem */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E5B26D] via-[#B86B35] to-[#4A2F1D] p-[1.5px] shadow-lg shadow-[#D49B54]/20">
              <div className="w-full h-full rounded-full bg-[#16100B] flex items-center justify-center group-hover:bg-[#1E150E] transition-colors">
                <TreePine className="w-5 h-5 text-[#D49B54] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#F7F2EB]">
                  آتلیه چوب اُرسی
                </span>
                <span className="hidden xl:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[#D49B54]/15 text-[#D49B54] border border-[#D49B54]/30">
                  دست‌ساز و سفارشی
                </span>
              </div>
              <span className="text-[11px] text-[#C8B9A6] hidden sm:block">
                ساعت دیواری، استند لپ‌تاپ و اکسسوری‌های تزیینی چوب طبیعی
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <a
              href="#portfolio"
              className="px-4 py-2 rounded-full text-sm font-medium text-[#C8B9A6] hover:text-[#F7F2EB] hover:bg-[#FFF4E5]/8 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-[#D49B54]" />
              ویترین نمونه‌کارها
            </a>
            <a
              href="#customizer"
              className="px-4 py-2 rounded-full text-sm font-medium text-[#C8B9A6] hover:text-[#F7F2EB] hover:bg-[#FFF4E5]/8 transition-all flex items-center gap-1.5"
            >
              <Hammer className="w-4 h-4 text-[#D49B54]" />
              شخصی‌سازی و حکاکی
            </a>
            <a
              href="#woods"
              className="px-4 py-2 rounded-full text-sm font-medium text-[#C8B9A6] hover:text-[#F7F2EB] hover:bg-[#FFF4E5]/8 transition-all flex items-center gap-1.5"
            >
              <TreePine className="w-4 h-4 text-[#D49B54]" />
              شناخت چوب‌ها
            </a>
            <a
              href="#reviews"
              className="px-4 py-2 rounded-full text-sm font-medium text-[#C8B9A6] hover:text-[#F7F2EB] hover:bg-[#FFF4E5]/8 transition-all flex items-center gap-1.5"
            >
              <MessageSquareHeart className="w-4 h-4 text-[#D49B54]" />
              تجربه خریداران
            </a>
          </div>

          {/* Right Actions: Order Cart + Bespoke CTA */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenCart}
              className="relative glass-pill hover:border-[#D49B54]/50 text-[#F7F2EB] px-3.5 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer"
              aria-label="مشاهده لیست سفارش‌ها"
            >
              <ShoppingBag className="w-4 h-4 text-[#D49B54]" />
              <span className="text-xs sm:text-sm font-semibold hidden sm:inline">
                سبد سفارش
              </span>
              <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#D49B54] text-[#120E0A] text-xs font-extrabold flex items-center justify-center tabular-nums-fa">
                {toPersianDigits(cartCount)}
              </span>
            </button>

            <button
              type="button"
              onClick={onJumpToCustomizer}
              className="btn-honey-gold px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>ثبت سفارش اختصاصی</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
