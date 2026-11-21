import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Gift,
  Laptop,
  Layers,
  PenTool,
  Search,
} from 'lucide-react';
import type { ProductCategory } from '../data/products';

type ShopCategory = Exclude<ProductCategory, 'all'>;

interface SeoGuideSectionProps {
  onBrowseCategory: (category: ShopCategory) => void;
  onJumpToCustomizer: () => void;
  onStartCustomProject: () => void;
}

const GUIDES: {
  category?: ShopCategory;
  icon: React.ElementType;
  title: string;
  text: string;
  action: string;
}[] = [
  {
    category: 'wall-clock',
    icon: Clock,
    title: 'ساعت دیواری چوبی دست‌ساز',
    text: 'ساعت‌های گردو، بلوط و زیتون با موتور آرام‌گرد، عقربه‌های دست‌ساز و امکان حکاکی نام یا تاریخ؛ مناسب خانه، دفتر و هدیه ماندگار.',
    action: 'مشاهده ساعت‌های چوبی',
  },
  {
    category: 'laptop-stand',
    icon: Laptop,
    title: 'استند لپ‌تاپ چوبی ارگونومیک',
    text: 'استندهای چوب طبیعی برای میز کار سالم‌تر و خلوت‌تر؛ با ابعاد سفارشی، گردش هوای بهتر و حکاکی لوگو یا نام شما.',
    action: 'مشاهده استندهای لپ‌تاپ',
  },
  {
    category: 'desk-accessories',
    icon: Layers,
    title: 'اکسسوری رومیزی و نظم‌دهنده چوبی',
    text: 'داک گوشی و ساعت، ست نظم‌دهنده، استند هدفون و جاکلیدی دیواری از چوب طبیعی؛ کوچک، کاربردی و متفاوت از محصولات آماده بازاری.',
    action: 'مشاهده اکسسوری‌های چوبی',
  },
  {
    icon: Gift,
    title: 'هدیه چوبی اختصاصی و سازمانی',
    text: 'برای تولد، سالگرد، روز مهندس و هدایای مدیریتی؛ حکاکی اسم یا لوگو، کارت اصالت و بسته‌بندی کادویی موم‌مهر شده آماده ارسال است.',
    action: 'ساخت هدیه اختصاصی',
  },
];

const POPULAR_SEARCHES: { label: string; category?: ShopCategory; target?: 'customizer' | 'custom-project' }[] = [
  { label: 'خرید ساعت دیواری چوب گردو', category: 'wall-clock' },
  { label: 'خرید استند لپ‌تاپ چوبی', category: 'laptop-stand' },
  { label: 'داک گوشی و ساعت چوبی', category: 'phone-dock' },
  { label: 'جاکلیدی دیواری چوبی', category: 'key-holder' },
  { label: 'اکسسوری میز کار چوبی', category: 'desk-accessories' },
  { label: 'حکاکی لیزری اسم روی چوب', target: 'customizer' },
  { label: 'ساخت محصول چوبی از روی عکس', target: 'custom-project' },
  { label: 'هدیه سازمانی چوبی با لوگو', target: 'customizer' },
];

export const SeoGuideSection: React.FC<SeoGuideSectionProps> = ({
  onBrowseCategory,
  onJumpToCustomizer,
  onStartCustomProject,
}) => {
  const handlePopularSearch = (item: (typeof POPULAR_SEARCHES)[number]) => {
    if (item.category) onBrowseCategory(item.category);
    else if (item.target === 'custom-project') onStartCustomProject();
    else onJumpToCustomizer();
  };

  return (
    <section id="buying-guide" aria-labelledby="buying-guide-title" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24 overflow-x-clip">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-bold text-[#D49B54] mb-3 border border-[#D49B54]/30">
            <PenTool className="w-4 h-4" />
            <span>راهنمای خرید دست‌سازه چوبی</span>
          </div>
          <h2 id="buying-guide-title" className="text-2xl sm:text-4xl font-black text-[#F7F2EB] tracking-tight">
            خرید دست‌سازه چوبی سفارشی برای خانه، میز کار و هدیه
          </h2>
          <p className="text-sm sm:text-base text-[#C8B9A6] mt-3 leading-relaxed">
            اگر به‌دنبال محصولی آماده و تکراری نیستید، اینجا می‌توانید ساعت دیواری، استند لپ‌تاپ و
            اکسسوری چوبی را با چوب طبیعی، ابعاد دلخواه و حکاکی اختصاصی سفارش دهید؛ هر قطعه پس از
            تایید رگه چوب توسط شما، دست‌ساز و تک‌نسخه ساخته می‌شود.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {GUIDES.map((guide) => (
            <article key={guide.title} className="glass-card-interactive rounded-[24px] p-5 flex flex-col">
              <span className="w-11 h-11 rounded-2xl bg-[#D49B54]/15 border border-[#D49B54]/35 flex items-center justify-center text-[#D49B54] mb-4">
                <guide.icon className="w-5 h-5" />
              </span>
              <h3 className="text-base font-extrabold text-[#F7F2EB] leading-snug">{guide.title}</h3>
              <p className="text-xs sm:text-sm text-[#C8B9A6] leading-relaxed mt-2 flex-1">{guide.text}</p>
              <button
                type="button"
                onClick={() =>
                  guide.category ? onBrowseCategory(guide.category) : onJumpToCustomizer()
                }
                className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#E5B26D] hover:text-[#F5D08A] cursor-pointer self-start"
                aria-label={guide.action}
              >
                {guide.action} <ArrowLeft className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
          <article className="lg:col-span-7 glass-panel rounded-[24px] p-5 sm:p-7">
            <h3 className="text-lg font-black text-[#F7F2EB]">چطور چوب مناسب محصول سفارشی را انتخاب کنیم؟</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs sm:text-sm text-[#C8B9A6] leading-relaxed">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#4E9F6E] shrink-0 mt-1" /><span><strong className="text-[#F7F2EB]">گردو سیاه:</strong> گرم، لوکس و پرکنتراست؛ انتخاب محبوب ساعت دیواری و هدیه مدیریتی.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#4E9F6E] shrink-0 mt-1" /><span><strong className="text-[#F7F2EB]">بلوط طلایی:</strong> محکم و مهندسی‌شده؛ مناسب استند لپ‌تاپ و سازه‌های پرفشار.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#4E9F6E] shrink-0 mt-1" /><span><strong className="text-[#F7F2EB]">راش ممتاز:</strong> روشن، مینیمال و ابریشمی؛ عالی برای حکاکی ظریف و دکور روشن.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#4E9F6E] shrink-0 mt-1" /><span><strong className="text-[#F7F2EB]">زیتون رگه‌دار:</strong> کمیاب و هنری؛ هر قطعه‌اش مثل یک تابلوی طبیعی بی‌تکرار است.</span></li>
            </ul>
          </article>

          <nav aria-label="جستجوهای پرطرفدار خرید محصولات چوبی" className="lg:col-span-5 glass-panel rounded-[24px] p-5 sm:p-7">
            <h3 className="text-base font-black text-[#F7F2EB] flex items-center gap-2">
              <Search className="w-4 h-4 text-[#D49B54]" /> جستجوهای پرطرفدار مشتریان
            </h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {POPULAR_SEARCHES.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handlePopularSearch(item)}
                  className="px-3 py-2 rounded-full bg-[#FFF4E5]/7 border border-[#FFF0DC]/12 text-[11px] sm:text-xs font-bold text-[#C8B9A6] hover:text-[#F7F2EB] hover:border-[#D49B54]/60 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#8A7968] leading-relaxed mt-4">
              طرحی خارج از این فهرست می‌خواهید؟ از بخش سفارش طرح دلخواه، عکس یا توضیح ایده را بفرستید تا امکان ساخت و قیمت دقیق بررسی شود.
            </p>
          </nav>
        </div>
      </div>
    </section>
  );
};
