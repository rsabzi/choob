import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Compass,
  Hammer,
  TreePine,
  MessageSquareHeart,
  PackageSearch,
  Search,
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
  onSearchProducts?: () => void;
}

const NAV_LINKS = [
  { href: '#portfolio', label: 'نمونه‌کارها', icon: Compass },
  { href: '#services', label: 'خدمات کارگاه', icon: Layers },
  { href: '#customizer', label: 'شخصی‌سازی', icon: Hammer },
  { href: '#woods', label: 'گونه‌های چوب', icon: TreePine },
  { href: '#faq', label: 'سوالات متداول', icon: CircleHelp },
  { href: '#reviews', label: 'نظرات مشتریان', icon: MessageSquareHeart },
  { href: '#contact', label: 'تماس با کارگاه', icon: PhoneCall },
];

// Desktop shows a compact subset so the bar always fits without overflowing
const DESKTOP_LINKS = NAV_LINKS.filter((l) => l.href !== '#reviews');

export const GlassHeader: React.FC<GlassHeaderProps> = ({
  brandName,
  brandTagline,
  cartCount,
  onOpenCart,
  onJumpToCustomizer,
  onOpenTracking,
  onSearchProducts,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-3 sm:top-4 z-40 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1360px] mx-auto">
        <nav
          aria-label="منوی اصلی"
          className="glass-panel-elevated rounded-[26px] xl:rounded-full px-3.5 sm:px-5 py-3 transition-all duration-300"
        >
          <div className="flex items-center justify-between gap-2">
            {/* Studio Brand — never collapses */}
            <a
              href="#top"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0 xl:shrink-0"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#E5B26D] via-[#B86B35] to-[#4A2F1D] p-[1.5px] shadow-lg shadow-[#D49B54]/20 shrink-0">
                <div className="w-full h-full rounded-full bg-[#16100B] flex items-center justify-center group-hover:bg-[#1E150E] transition-colors">
                  <TreePine className="w-5 h-5 text-[#D49B54] group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] sm:text-base font-extrabold tracking-tight text-[#F7F2EB] truncate max-w-[128px] min-[420px]:max-w-[190px] xl:max-w-none xl:whitespace-nowrap">
                  {brandName}
                </span>
                <span className="text-[11px] text-[#C8B9A6] hidden sm:block truncate max-w-[190px]">
                  {brandTagline}
                </span>
              </div>
            </a>

            {/* Desktop Navigation — compact labels, only when there is room */}
            <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-center min-w-0">
              {DESKTOP_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-2 rounded-full text-[13px] font-medium text-[#C8B9A6] hover:text-[#F7F2EB] hover:bg-[#FFF4E5]/8 transition-all whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {onSearchProducts && (
                <button
                  type="button"
                  onClick={onSearchProducts}
                  className="glass-pill hover:border-[#D49B54]/50 text-[#F7F2EB] w-10 h-10 rounded-full hidden md:flex items-center justify-center transition-all cursor-pointer"
                  title="جستجوی محصول چوبی"
                  aria-label="جستجوی محصول در ویترین"
                >
                  <Search className="w-4 h-4 text-[#D49B54]" />
                </button>
              )}
              {/* Order tracking: icon-only on xl, full label on 2xl+ */}
              <button
                type="button"
                onClick={onOpenTracking}
                className="glass-pill hover:border-[#D49B54]/50 text-[#F7F2EB] px-3 py-2.5 rounded-full hidden xl:flex items-center gap-2 transition-all cursor-pointer"
                title="پیگیری سفارش"
              >
                <PackageSearch className="w-4 h-4 text-[#D49B54]" />
              </button>

              <button
                type="button"
                onClick={onOpenCart}
                className="relative glass-pill hover:border-[#D49B54]/50 text-[#F7F2EB] px-3 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer"
                aria-label={`مشاهده سبد سفارش، ${toPersianDigits(cartCount)} کالا`}
              >
                <ShoppingBag className="w-4 h-4 text-[#D49B54]" />
                <span className="text-sm font-semibold hidden sm:inline xl:hidden">
                  سبد سفارش
                </span>
                <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#D49B54] text-[#120E0A] text-xs font-extrabold flex items-center justify-center tabular-nums-fa">
                  {toPersianDigits(cartCount)}
                </span>
              </button>

              <button
                type="button"
                onClick={onJumpToCustomizer}
                className="btn-honey-gold px-3.5 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm hidden sm:flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>سفارش اختصاصی</span>
              </button>

              {/* Hamburger — below xl the full menu lives here */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="xl:hidden w-10 h-10 rounded-full glass-pill flex items-center justify-center text-[#F7F2EB] cursor-pointer shrink-0"
                aria-label="باز کردن منو"
                aria-expanded={mobileOpen}
                aria-controls="mobile-store-menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile / Tablet Menu */}
          {mobileOpen && (
            <div id="mobile-store-menu" className="xl:hidden mt-3 pt-3 border-t border-[#FFF0DC]/10 grid grid-cols-1 min-[420px]:grid-cols-2 gap-2 animate-fadeIn">
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
              {onSearchProducts && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onSearchProducts();
                  }}
                  className="px-3 py-2.5 rounded-xl text-xs font-semibold text-[#F7F2EB] bg-[#FFF4E5]/8 border border-[#D49B54]/40 flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#D49B54]" />
                  جستجوی سریع محصول
                </button>
              )}
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
