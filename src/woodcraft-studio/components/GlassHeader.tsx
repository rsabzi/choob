import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Compass,
  Hammer,
  TreePine,
  MessageSquareHeart,
  PackageSearch,
  Layers,
  CircleHelp,
  PhoneCall,
  Menu,
  X,
} from 'lucide-react';
import { toPersianDigits } from '../data/products';

interface GlassHeaderProps {
  brandName: string;
  brandTagline: string;
  cartCount: number;
  onOpenCart: () => void;
  onJumpToCustomizer: () => void;
  onOpenTracking: () => void;
}

const NAV_LINKS = [
  { href: '#portfolio', label: 'ویترین نمونه‌کارها', icon: Compass },
  { href: '#services', label: 'خدمات کارگاه', icon: Layers },
  { href: '#customizer', label: 'شخصی‌سازی و حکاکی', icon: Hammer },
  { href: '#woods', label: 'شناخت چوب‌ها', icon: TreePine },
  { href: '#faq', label: 'سوالات متداول', icon: CircleHelp },
  { href: '#reviews', label: 'تجربه خریداران', icon: MessageSquareHeart },
  { href: '#contact', label: 'تماس با کارگاه', icon: PhoneCall },
];

export const GlassHeader: React.FC<GlassHeaderProps> = ({
  brandName,
  brandTagline,
  cartCount,
  onOpenCart,
  onJumpToCustomizer,
  onOpenTracking,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1360px] mx-auto">
        <nav
          aria-label="منوی اصلی"
          className="glass-panel-elevated rounded-[26px] lg:rounded-full px-4 sm:px-7 py-3 transition-all duration-300"
        >
          <div className="flex items-center justify-between gap-3">
            {/* Studio Brand Emblem */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E5B26D] via-[#B86B35] to-[#4A2F1D] p-[1.5px] shadow-lg shadow-[#D49B54]/20 shrink-0">
                <div className="w-full h-full rounded-full bg-[#16100B] flex items-center justify-center group-hover:bg-[#1E150E] transition-colors">
                  <TreePine className="w-5 h-5 text-[#D49B54] group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#F7F2EB] truncate">
                    {brandName}
                  </span>
                  <span className="hidden xl:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[#D49B54]/15 text-[#D49B54] border border-[#D49B54]/30 shrink-0">
                    دست‌ساز و سفارشی
                  </span>
                </div>
                <span className="text-[11px] text-[#C8B9A6] hidden sm:block truncate">
                  {brandTagline}
                </span>
              </div>
            </a>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 rounded-full text-[13px] font-medium text-[#C8B9A6] hover:text-[#F7F2EB] hover:bg-[#FFF4E5]/8 transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <link.icon className="w-4 h-4 text-[#D49B54]" />
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={onOpenTracking}
                className="glass-pill hover:border-[#D49B54]/50 text-[#F7F2EB] px-3.5 py-2.5 rounded-full hidden md:flex items-center gap-2 transition-all cursor-pointer"
              >
                <PackageSearch className="w-4 h-4 text-[#D49B54]" />
                <span className="text-xs sm:text-sm font-semibold">پیگیری سفارش</span>
              </button>

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
                className="btn-honey-gold px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm hidden sm:flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>ثبت سفارش اختصاصی</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden w-10 h-10 rounded-full glass-pill flex items-center justify-center text-[#F7F2EB] cursor-pointer"
                aria-label="باز کردن منو"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-[#FFF0DC]/10 grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-xs font-semibold text-[#C8B9A6] hover:text-[#F7F2EB] bg-[#FFF4E5]/5 flex items-center gap-2"
                >
                  <link.icon className="w-4 h-4 text-[#D49B54]" />
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenTracking();
                }}
                className="px-3 py-2.5 rounded-xl text-xs font-semibold text-[#120E0A] bg-[#D49B54] flex items-center gap-2 cursor-pointer"
              >
                <PackageSearch className="w-4 h-4" />
                پیگیری سفارش
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onJumpToCustomizer();
                }}
                className="px-3 py-2.5 rounded-xl text-xs font-semibold text-[#F7F2EB] bg-[#FFF4E5]/8 border border-[#D49B54]/40 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D49B54]" />
                ثبت سفارش اختصاصی
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
