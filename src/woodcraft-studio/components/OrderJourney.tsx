import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Compass,
  Hammer,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react';
import { CATEGORIES, toPersianDigits, type ProductCategory } from '../data/products';

interface OrderJourneyProps {
  onBrowseCategory: (category: Exclude<ProductCategory, 'all'>) => void;
  onJumpToCustomizer: () => void;
  onStartCustomProject: () => void;
}

const STEPS = [
  {
    icon: Compass,
    title: 'مدل یا ایده را انتخاب کنید',
    text: 'از ویترین یک اثر آماده را بردارید یا عکس و ایده خودتان را برای ساخت تک‌نسخه بفرستید.',
  },
  {
    icon: Hammer,
    title: 'چوب و حکاکی را شخصی‌سازی کنید',
    text: 'گونه چوب، ابعاد، پوشش و متن حکاکی را آنلاین انتخاب کنید و قیمت را همان لحظه ببینید.',
  },
  {
    icon: ShieldCheck,
    title: 'رگه چوب را تایید کنید',
    text: 'قبل از برش، عکس اسلب واقعی در واتساپ یا تلگرام ارسال می‌شود؛ ساخت فقط با تایید شما شروع می‌شود.',
  },
  {
    icon: PackageCheck,
    title: 'تحویل و پیگیری شفاف',
    text: 'اثر پس از کنترل کیفیت با بسته‌بندی ضدضربه ارسال می‌شود و با کد پیگیری همیشه قابل ردیابی است.',
  },
];

export const OrderJourney: React.FC<OrderJourneyProps> = ({
  onBrowseCategory,
  onJumpToCustomizer,
  onStartCustomProject,
}) => {
  const shopCategories = CATEGORIES.filter(
    (category) => category.id !== 'all'
  ) as { id: Exclude<ProductCategory, 'all'>; label: string }[];

  return (
    <section aria-labelledby="order-journey-title" className="relative px-4 sm:px-6 lg:px-8 pb-6 -mt-2">
      <div className="max-w-[1360px] mx-auto">
        <div className="glass-panel rounded-[26px] p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5">
            <div>
              <span className="text-xs font-black text-[#D49B54]">مسیر ساده سفارش</span>
              <h2 id="order-journey-title" className="text-xl sm:text-2xl font-black text-[#F7F2EB] mt-1">
                سفارش دست‌سازه چوبی در ۴ قدم، بدون سردرگمی
              </h2>
              <p className="text-xs sm:text-sm text-[#C8B9A6] mt-1.5">
                در این مرحله هیچ پرداخت آنلاینی انجام نمی‌دهید؛ اول طرح و چوب را تایید می‌کنید، بعد ساخت شروع می‌شود.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onJumpToCustomizer}
                className="btn-honey-gold px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer"
              >
                شروع شخصی‌سازی <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onStartCustomProject}
                className="glass-pill px-4 py-2.5 rounded-xl text-xs font-bold text-[#F7F2EB] cursor-pointer"
              >
                ساخت از روی عکس یا ایده
              </button>
            </div>
          </div>

          <nav aria-label="خرید سریع بر اساس نوع محصول" className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-5">
            {shopCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onBrowseCategory(category.id)}
                className="shrink-0 px-3.5 py-2 rounded-full bg-[#FFF4E5]/7 border border-[#FFF0DC]/12 text-xs font-bold text-[#C8B9A6] hover:text-[#F7F2EB] hover:border-[#D49B54]/60 transition-colors cursor-pointer"
              >
                خرید {category.label} چوبی
              </button>
            ))}
          </nav>

          <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 list-none">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative rounded-2xl bg-[#120E0A]/48 border border-[#FFF0DC]/10 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-[#D49B54]/15 border border-[#D49B54]/35 flex items-center justify-center text-[#D49B54]">
                    <step.icon className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-black text-[#8A7968]">قدم {toPersianDigits(index + 1)}</span>
                </div>
                <h3 className="text-sm font-extrabold text-[#F7F2EB]">{step.title}</h3>
                <p className="text-[11px] sm:text-xs text-[#C8B9A6] leading-relaxed mt-1.5">{step.text}</p>
                {index === 3 && (
                  <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-bold text-[#7FCB9B]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ارسال به سراسر ایران
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
