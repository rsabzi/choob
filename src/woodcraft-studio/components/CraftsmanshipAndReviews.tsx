import React, { useState } from 'react';
import {
  TreePine,
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  Droplets,
  Compass,
  PackageCheck,
} from 'lucide-react';
import {
  WOOD_SPECIES,
  WoodSpeciesId,
  toPersianDigits,
} from '../data/products';

const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    name: 'مهندس آرش کامرانی',
    city: 'تهران — الهیه',
    productOrdered: 'ساعت دیواری آوروم (چوب گردو سیاه) + استند لپ‌تاپ آرک',
    rating: 5,
    date: '۲ هفته پیش',
    comment:
      'کیفیت پرداخت چوب گردو واقعاً در حد برندهای لوکس اروپایی است. وقتی بسته را باز کردم بوی ملایم موم طبیعی و چوب کل اتاق کارم را پر کرد. قبل از ارسال هم عکس سه تا اسلب گردو را در واتساپ برایم فرستادند تا خودم نقش چوب ساعتم را انتخاب کنم.',
  },
  {
    id: 'rev-2',
    name: 'دکتر نیلوفر ستوده',
    city: 'اصفهان — چهارباغ بالا',
    productOrdered: 'داک گوشی و ساعت مونولیت با حکاکی اختصاصی',
    rating: 5,
    date: 'ماه گذشته',
    comment:
      'برای هدیه تولد همسرم داک رومیزی چوب زیتون را با حکاکی تاریخ آشنایی‌مان سفارش دادم. ظرافت حکاکی لیزری و جعبه کادویی موم‌مهر شده آن‌قدر شیک بود که همسرم فکر می‌کرد یک اثر کلکسیونی وارداتی است. ممنون از دقت و خوش‌قولی‌تان.',
  },
  {
    id: 'rev-3',
    name: 'سروش مجد (مدیر استودیو معماری)',
    city: 'شیراز — قصرالدشت',
    productOrdered: '۱۲ عدد ست رومیزی آتلیه و جاکلیدی دیواری نوا (هدایای پایان سال)',
    rating: 5,
    date: '۳ هفته پیش',
    comment:
      'برای هدیه به کارفرماهای VIP دفتر معماری دنبال کاری بودیم که تبلیغاتیِ تکراری نباشد و حس اصالت چوب طبیعی را منتقل کند. جاکلیدی‌های مغناطیسی نوا با لوگوی ظریف استودیو ما فوق‌العاده از آب درآمدند و بازخورد بی‌نظیری گرفتیم.',
  },
];

export const CraftsmanshipAndReviews: React.FC<{
  onJumpToCustomizer: () => void;
}> = ({ onJumpToCustomizer }) => {
  const [inspectedWood, setInspectedWood] = useState<WoodSpeciesId>('walnut');
  const wood = WOOD_SPECIES[inspectedWood];

  return (
    <>
      {/* Wood Species & Workshop Process Section */}
      <section
        id="woods"
        className="relative py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20"
      >
        <div className="max-w-[1360px] mx-auto space-y-16">
          {/* Interactive Wood Guide */}
          <div className="glass-panel-elevated rounded-[30px] p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-[#D49B54]">
                  <TreePine className="w-4 h-4" />
                  <span>اصالت متریال کارگاه اُرسی</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#F7F2EB] leading-snug">
                  چرا دست‌سازه‌های چوب طبیعی ما هرگز تکراری نمی‌شوند؟
                </h2>
                <p className="text-sm text-[#C8B9A6] leading-relaxed">
                  ما در هیچ‌یک از محصولاتمان از ام‌دی‌اف، روکش مصنوعی یا رنگ‌های شیمیایی پوشاننده
                  استفاده نمی‌کنیم. هر قطعه از دل چوب‌های ماسیو (Solid Wood) خشک‌شده تراش می‌خورد و
                  رگه‌های طبیعی آن مانند اثر انگشت، منحصربه‌فرد است.
                </p>

                {/* Wood Species Tabs */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {(Object.keys(WOOD_SPECIES) as WoodSpeciesId[]).map((wId) => {
                    const item = WOOD_SPECIES[wId];
                    const active = inspectedWood === wId;
                    return (
                      <button
                        key={wId}
                        type="button"
                        onClick={() => setInspectedWood(wId)}
                        className={`p-3 rounded-2xl text-right flex items-center gap-2.5 transition-all cursor-pointer border ${
                          active
                            ? 'bg-[#FFF4E5]/15 border-[#D49B54] shadow-md'
                            : 'bg-[#120E0A]/45 border-[#FFF0DC]/10 hover:border-[#FFF0DC]/25'
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full shrink-0 border border-white/30"
                          style={{ background: item.swatchGradient }}
                        />
                        <span className="text-xs sm:text-sm font-bold text-[#F7F2EB]">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Wood Macro Spec Card */}
              <div className="lg:col-span-7">
                <div className="glass-panel rounded-[24px] p-6 sm:p-8 relative overflow-hidden">
                  <div
                    className="w-full h-28 sm:h-36 rounded-2xl mb-6 border border-white/20 shadow-inner relative overflow-hidden flex items-end p-4"
                    style={{ background: wood.swatchGradient }}
                  >
                    <svg
                      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
                      viewBox="0 0 500 160"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,30 Q140,5 280,38 T500,24 M0,75 Q180,48 320,85 T500,65 M0,125 Q120,148 290,115 T500,130"
                        fill="none"
                        style={{ stroke: '#120804' }}
                        strokeWidth="2.5"
                      />
                    </svg>
                    <div className="relative z-10 glass-panel px-4 py-1.5 rounded-full text-xs font-extrabold text-[#F7F2EB]">
                      نمونه بافت طبیعی: {wood.name}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                    <div className="p-4 rounded-2xl bg-[#120E0A]/50 border border-[#FFF0DC]/10">
                      <span className="text-xs text-[#D49B54] font-bold block mb-1">
                        خاستگاه و فرآوری:
                      </span>
                      <p className="text-xs sm:text-sm text-[#F7F2EB] font-medium">
                        {wood.origin}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#120E0A]/50 border border-[#FFF0DC]/10">
                      <span className="text-xs text-[#D49B54] font-bold block mb-1">
                        مقاومت و ماندگاری:
                      </span>
                      <p className="text-xs sm:text-sm text-[#F7F2EB] font-medium">
                        {wood.durability}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-[#120E0A]/40 border border-[#FFF0DC]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-[#C8B9A6] block">
                        ویژگی ظاهری رگه‌ها:
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#F5D08A]">
                        {wood.grainDescription}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={onJumpToCustomizer}
                      className="btn-honey-gold px-4 py-2.5 rounded-xl text-xs font-extrabold shrink-0 cursor-pointer"
                    >
                      سفارش با {wood.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Step Artisanal Process Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-[22px] p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D49B54]/15 border border-[#D49B54]/35 flex items-center justify-center text-[#D49B54] shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#D49B54]">
                  گام اول • انتخاب اسلب
                </span>
                <h3 className="text-base font-extrabold text-[#F7F2EB] mt-1">
                  تایید نقش چوب توسط شما
                </h3>
                <p className="text-xs text-[#C8B9A6] mt-1.5 leading-relaxed">
                  پس از ثبت سفارش، تصویر قطعات چوب آماده برش در واتساپ یا تلگرام برای شما ارسال
                  می‌شود تا زیباترین موج چوب را به سلیقه خود انتخاب کنید.
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-[22px] p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D49B54]/15 border border-[#D49B54]/35 flex items-center justify-center text-[#D49B54] shrink-0">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#D49B54]">
                  گام دوم • پرداخت ابریشمی
                </span>
                <h3 className="text-base font-extrabold text-[#F7F2EB] mt-1">
                  سنباده‌زنی ۶ مرحله‌ای و روغن گیاهی
                </h3>
                <p className="text-xs text-[#C8B9A6] mt-1.5 leading-relaxed">
                  لبه‌ها با دست پخ خورده و تا گریت ۳۰۰۰ صیقل داده می‌شوند؛ سپس با روغن‌های گیاهی
                  خوراکی و ضدآب مونوکوت بلژیک پوشش داده می‌شوند.
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-[22px] p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D49B54]/15 border border-[#D49B54]/35 flex items-center justify-center text-[#D49B54] shrink-0">
                <PackageCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#D49B54]">
                  گام سوم • حکاکی و ارسال ایمن
                </span>
                <h3 className="text-base font-extrabold text-[#F7F2EB] mt-1">
                  تضمین سلامت فیزیکی تا درب منزل
                </h3>
                <p className="text-xs text-[#C8B9A6] mt-1.5 leading-relaxed">
                  سفارش شما با حکاکی اختصاصی، شناسنامه اصالت اثر و بسته‌بندی ضدضربه فوم‌دار به سراسر
                  ایران ارسال می‌شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Social Proof Section */}
      <section
        id="reviews"
        className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20"
      >
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-[#D49B54] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>اعتماد خریداران و مجموعه‌داران</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#F7F2EB]">
                مشتریان درباره دست‌سازه‌های اُرسی چه می‌گویند؟
              </h2>
            </div>

            <div className="glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 self-start">
              <div className="flex items-center gap-0.5 text-[#E5B26D]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E5B26D]" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[#F7F2EB] tabular-nums-fa">
                امتیاز {toPersianDigits('4.9')} از {toPersianDigits(5)} (بر اساس +{toPersianDigits(340)} نظر ثبت‌شده)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="glass-card-interactive rounded-[24px] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-[#E5B26D]">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-[#E5B26D]" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#4E9F6E] font-bold bg-[#4E9F6E]/15 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      خریدار تاییدشده
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F7F2EB]/90 leading-relaxed">
                    «{rev.comment}»
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#FFF0DC]/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#F7F2EB]">
                      {rev.name}
                    </span>
                    <span className="text-[11px] text-[#8A7968]">{rev.city}</span>
                  </div>
                  <div className="text-[11px] text-[#D49B54] font-semibold mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{rev.productOrdered}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
