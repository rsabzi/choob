import React from 'react';
import {
  TreePine,
  PhoneCall,
  MapPin,
  Clock,
  Sparkles,
  Send,
  ShieldCheck,
  Gift,
} from 'lucide-react';
import { toPersianDigits } from '../data/products';

interface GlassFooterProps {
  onOpenCustomOrderDrawer: () => void;
  onJumpToCustomizer: () => void;
}

export const GlassFooter: React.FC<GlassFooterProps> = ({
  onOpenCustomOrderDrawer,
  onJumpToCustomizer,
}) => {
  return (
    <footer className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1360px] mx-auto space-y-12">
        {/* Bespoke Idea & Corporate Gift Callout Banner */}
        <div className="glass-panel-elevated rounded-[30px] p-6 sm:p-10 relative overflow-hidden">
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
                کافیست ابعاد یا تصویر مورد نظرتان را در فرم سفارش ثبت کنید؛ استادکاران ما همان طرح
                را با چوب گردو یا زیتون طبیعی و حکاکی اختصاصی برای شما می‌سازند.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                type="button"
                onClick={onOpenCustomOrderDrawer}
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
        <div className="glass-panel rounded-[26px] p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#FFF0DC]/10">
            {/* Col 1: Studio Bio */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E5B26D] to-[#6E4522] flex items-center justify-center text-[#120E0A]">
                  <TreePine className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-black text-[#F7F2EB] block">
                    استودیو چوب و هنر اُرسی
                  </span>
                  <span className="text-xs text-[#D49B54]">
                    اصالت نجاری سنتی در قالبی مدرن و مینیمال
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#C8B9A6] leading-relaxed">
                ما در آتلیه اُرسی با ترکیب چوب‌های اصیل گردو، بلوط، راش و زیتون با یراق‌آلات
                برنجی دست‌ساز، اشیایی می‌سازیم که هر روز روی میز کار یا دیوار خانه‌تان از تماشا
                و لمس آن‌ها لذت ببرید.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#4E9F6E] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>ضمانت ۵ ساله سلامت چوب و موتور ساعت‌های دیواری</span>
              </div>
            </div>

            {/* Col 2: Quick Categories */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-sm font-extrabold text-[#F7F2EB]">
                محبوب‌ترین دست‌سازه‌ها
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#C8B9A6]">
                <li>
                  <a href="#portfolio" className="hover:text-[#E5B26D] transition-colors">
                    • ساعت دیواری چوب گردو و برنج
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-[#E5B26D] transition-colors">
                    • استند لپ‌تاپ ارگونومیک چوب بلوط
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-[#E5B26D] transition-colors">
                    • داک شارژ گوشی و ساعت هوشمند
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-[#E5B26D] transition-colors">
                    • جاکلیدی دیواری مغناطیسی نوا
                  </a>
                </li>
                <li>
                  <a href="#customizer" className="hover:text-[#E5B26D] transition-colors">
                    • ست رومیزی مدیریتی با حکاکی لیزری
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact & Workshop Info */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-sm font-extrabold text-[#F7F2EB]">
                ارتباط مستقیم با کارگاه نجاری
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-[#C8B9A6]">
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#D49B54] shrink-0" />
                  <span className="tabular-nums-fa">
                    تلفن و واتساپ مشاوره: {toPersianDigits('0912-480-9210')}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D49B54] shrink-0 mt-1" />
                  <span>
                    تهران، شهرک صنعتی چهارصددستگاه (بازدید حضوری از اسلب‌ها با هماهنگی قبلی)
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D49B54] shrink-0" />
                  <span className="tabular-nums-fa">
                    پاسخگویی: شنبه تا پنج‌شنبه ساعت {toPersianDigits(9)} تا {toPersianDigits(21)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7968]">
            <span>
              © {toPersianDigits(1404)} تمامی حقوق برای استودیو چوب و هنر اُرسی محفوظ است.
            </span>
            <span>
              ساخته‌شده با عشق به چوب طبیعی و هنر دست نجاران ایرانی
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
