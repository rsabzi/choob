import React from 'react';
import {
  TreePine,
  PhoneCall,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  Send,
  ShieldCheck,
  Gift,
  Mail,
  PackageSearch,
  Lock,
} from 'lucide-react';
import { CATEGORIES, type ProductCategory } from '../data/products';
import type { SiteSettings } from '../store/types';

interface GlassFooterProps {
  settings: SiteSettings;
  onOpenCustomProject: () => void;
  onJumpToCustomizer: () => void;
  onOpenTracking: () => void;
  onBrowseCategory?: (category: ProductCategory) => void;
}

export const GlassFooter: React.FC<GlassFooterProps> = ({
  settings,
  onOpenCustomProject,
  onJumpToCustomizer,
  onOpenTracking,
  onBrowseCategory,
}) => {
  const intlPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const telegramId = settings.telegramId.replace(/^@+/, '').trim();

  return (
    <footer className="relative pt-10 pb-32 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1360px] mx-auto space-y-12">
        {/* Bespoke Idea Callout Banner */}
        <div className="glass-panel-elevated rounded-[30px] p-5 sm:p-10 relative overflow-hidden">
          <div className="pointer-events-none absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-[#D49B54]/20 blur-[90px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-bold text-[#E5B26D]">
                <Gift className="w-4 h-4" />
                <span>سفارش تک‌نسخه از روی عکس + هدایای سازمانی لوکس</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-[#F7F2EB] leading-snug">
                طرح خاصی در ذهن دارید یا عکس یک اکسسوری چوبی را در پینترست دیده‌اید؟
              </h3>
              <p className="text-xs sm:text-base text-[#C8B9A6] leading-relaxed max-w-2xl">
                کافیست ایده، ابعاد یا تصویر مورد نظرتان را در فرم سفارش طرح دلخواه ثبت کنید؛
                استادکاران ما همان طرح را با چوب طبیعی و حکاکی اختصاصی برای شما می‌سازند و
                سفارش مستقیم به دست مدیریت کارگاه می‌رسد.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                type="button"
                onClick={onOpenCustomProject}
                className="btn-honey-gold px-6 py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>ثبت سفارش طرح دلخواه شما</span>
              </button>
              <button
                type="button"
                onClick={onJumpToCustomizer}
                className="glass-pill hover:border-[#D49B54] px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-[#F7F2EB] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#D49B54]" />
                <span>ورود به بخش حکاکی آنلاین</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="glass-panel rounded-[26px] p-4 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#FFF0DC]/10">
            {/* Studio Bio */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E5B26D] to-[#6E4522] flex items-center justify-center text-[#120E0A]">
                  <TreePine className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-black text-[#F7F2EB] block">
                    {settings.brandName}
                  </span>
                  <span className="text-xs text-[#D49B54]">
                    اصالت نجاری سنتی در قالبی مدرن و مینیمال
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#C8B9A6] leading-relaxed">
                {settings.aboutText}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#4E9F6E] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>ضمانت سلامت چوب و موتور ساعت‌های دیواری</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-sm font-extrabold text-[#F7F2EB]">دسترسی سریع</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#C8B9A6]">
                <li><a href="#portfolio" className="hover:text-[#E5B26D] transition-colors">• ویترین نمونه‌کارها</a></li>
                <li><a href="#services" className="hover:text-[#E5B26D] transition-colors">• خدمات کارگاه</a></li>
                <li><a href="#customizer" className="hover:text-[#E5B26D] transition-colors">• شخصی‌سازی و حکاکی آنلاین</a></li>
                <li><a href="#custom-project" className="hover:text-[#E5B26D] transition-colors">• سفارش طرح دلخواه از روی عکس</a></li>
                <li><a href="#faq" className="hover:text-[#E5B26D] transition-colors">• سوالات متداول</a></li>
                <li><a href="#contact" className="hover:text-[#E5B26D] transition-colors">• تماس با کارگاه و ارسال پیام</a></li>
                <li>
                  <button type="button" onClick={onOpenTracking} className="hover:text-[#E5B26D] transition-colors cursor-pointer inline-flex items-center gap-1.5">
                    <PackageSearch className="w-3.5 h-3.5" /> پیگیری سفارش با کد رهگیری
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info (from admin settings) */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-sm font-extrabold text-[#F7F2EB]">
                ارتباط مستقیم با کارگاه نجاری
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-[#C8B9A6]">
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#D49B54] shrink-0" />
                  <span>
                    تلفن و واتساپ صاحب کارگاه:{' '}
                    <a href={intlPhone ? `tel:+${intlPhone}` : '#contact'} className="font-extrabold text-[#F7F2EB] hover:text-[#E5B26D] transition-colors">
                      {settings.phoneDisplay}
                    </a>
                  </span>
                </div>
                {telegramId && (
                  <div className="flex items-center gap-2.5">
                    <Send className="w-4 h-4 text-[#D49B54] shrink-0" />
                    <span>
                      تلگرام:{' '}
                      <a href={`https://t.me/${telegramId}`} target="_blank" rel="noopener noreferrer" className="font-bold text-[#8ED8FF] hover:underline" dir="ltr">
                        @{telegramId}
                      </a>
                      {settings.instagramId && (
                        <span> • اینستاگرام: <span dir="ltr">@{settings.instagramId}</span></span>
                      )}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D49B54] shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-[#E5B26D] transition-colors" dir="ltr">
                    {settings.email}
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 pt-1.5">
                  {intlPhone && (
                    <a
                      href={`https://wa.me/${intlPhone}?text=${encodeURIComponent('سلام وقت بخیر، درباره محصولات و سفارش راهنمایی می‌خواهم.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/45 text-[#7CFFB2] text-[11px] font-extrabold flex items-center gap-1.5 hover:bg-[#25D366]/25 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> واتساپ
                    </a>
                  )}
                  {telegramId && (
                    <a
                      href={`https://t.me/${telegramId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-[#229ED9]/15 border border-[#229ED9]/45 text-[#8ED8FF] text-[11px] font-extrabold flex items-center gap-1.5 hover:bg-[#229ED9]/25 transition-colors"
                    >
                      <Send className="w-4 h-4" /> تلگرام
                    </a>
                  )}
                  {intlPhone && (
                    <a
                      href={`tel:+${intlPhone}`}
                      className="px-3.5 py-2.5 rounded-xl bg-[#D49B54]/15 border border-[#D49B54]/45 text-[#E5B26D] text-[11px] font-extrabold flex items-center gap-1.5 hover:bg-[#D49B54]/25 transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" /> تماس تلفنی
                    </a>
                  )}
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D49B54] shrink-0 mt-1" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D49B54] shrink-0" />
                  <span>پاسخگویی: {settings.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-5 border-b border-[#FFF0DC]/10">
            <nav aria-label="خرید دست‌سازه چوبی بر اساس نوع محصول" className="lg:col-span-7">
              <h4 className="text-sm font-extrabold text-[#F7F2EB] mb-3">خرید بر اساس نوع محصول</h4>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter((category) => category.id !== 'all').map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => onBrowseCategory?.(category.id)}
                    className="px-3 py-2 rounded-full bg-[#FFF4E5]/7 border border-[#FFF0DC]/12 text-[11px] font-bold text-[#C8B9A6] hover:text-[#F7F2EB] hover:border-[#D49B54]/60 cursor-pointer"
                  >
                    {category.label} چوبی دست‌ساز
                  </button>
                ))}
                <a href="#customizer" className="px-3 py-2 rounded-full bg-[#FFF4E5]/7 border border-[#FFF0DC]/12 text-[11px] font-bold text-[#C8B9A6] hover:text-[#F7F2EB] hover:border-[#D49B54]/60">حکاکی لیزری روی چوب</a>
                <a href="#buying-guide" className="px-3 py-2 rounded-full bg-[#FFF4E5]/7 border border-[#FFF0DC]/12 text-[11px] font-bold text-[#C8B9A6] hover:text-[#F7F2EB] hover:border-[#D49B54]/60">راهنمای خرید دست‌سازه چوبی</a>
              </div>
            </nav>
            <div className="lg:col-span-5">
              <h4 className="text-sm font-extrabold text-[#F7F2EB] mb-2">چرا خرید از کارگاه اُرسی؟</h4>
              <p className="text-[11px] sm:text-xs text-[#C8B9A6] leading-relaxed">
                هر محصول از چوب طبیعی و پس از تایید رگه توسط مشتری ساخته می‌شود؛ حکاکی اختصاصی رایگان،
                بسته‌بندی ضدضربه، ضمانت سلامت چوب و ارسال به سراسر ایران مسیر خرید را شفاف و مطمئن می‌کند.
              </p>
              <a href="#top" className="inline-flex mt-3 text-[11px] font-black text-[#E5B26D] hover:text-[#F5D08A]">بازگشت به بالای صفحه ↑</a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7968]">
            <span>© تمامی حقوق برای {settings.brandName} محفوظ است.</span>
            <span>{settings.footerNote}</span>
            <a
              href="#/admin"
              className="inline-flex items-center gap-1.5 hover:text-[#E5B26D] transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              ورود مدیریت کارگاه
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
