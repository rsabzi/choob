import React, { useState, useEffect } from 'react';
import {
  Hammer,
  Gift,
  CheckCircle2,
  Ruler,
  Wand2,
  Clock,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import {
  WoodProduct,
  WoodSpecies,
  WoodSpeciesId,
  FinishOption,
  SizeOption,
  OrderCartItem,
  formatTomans,
  toPersianDigits,
  woodById,
} from '../data/products';
import { LiveWoodenClockSVG, WoodEngravingPreview } from './ArtisanVisuals';

interface CustomOrderStudioProps {
  products: WoodProduct[];
  woods: WoodSpecies[];
  finishes: FinishOption[];
  sizes: SizeOption[];
  giftBoxPrice: number;
  selectedProduct: WoodProduct;
  onSelectProduct: (product: WoodProduct) => void;
  onAddConfiguredOrder: (item: OrderCartItem, openDrawerImmediately: boolean) => void;
}

export const CustomOrderStudio: React.FC<CustomOrderStudioProps> = ({
  products,
  woods,
  finishes,
  sizes,
  giftBoxPrice,
  selectedProduct,
  onSelectProduct,
  onAddConfiguredOrder,
}) => {
  const [woodId, setWoodId] = useState<WoodSpeciesId>(selectedProduct.defaultWood);
  const [finish, setFinish] = useState<FinishOption>(finishes[0]);
  const [size, setSize] = useState<SizeOption>(sizes[0]);

  // Keep selected finish/size valid if admin edits the material lists
  useEffect(() => {
    if (!finishes.some((f) => f.id === finish.id) && finishes[0]) setFinish(finishes[0]);
  }, [finishes, finish.id]);
  useEffect(() => {
    if (!sizes.some((sz) => sz.id === size.id) && sizes[0]) setSize(sizes[0]);
  }, [sizes, size.id]);
  const [customDimensionsText, setCustomDimensionsText] = useState('');
  const [engravingText, setEngravingText] = useState('به یادگار برای روزهای روشن');
  const [engravingFont, setEngravingFont] = useState<'nastaaliq' | 'modern' | 'minimal-latin'>('nastaaliq');
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Sync default wood when selected product changes
  useEffect(() => {
    setWoodId(selectedProduct.defaultWood);
  }, [selectedProduct]);

  const activeWood = woodById(woods, woodId);

  // Dynamic Price Calculation
  const woodAdjustedBase = Math.round(
    (selectedProduct.basePrice * activeWood.priceMultiplier) / 10000
  ) * 10000;
  const unitPrice =
    woodAdjustedBase +
    finish.extraCost +
    size.priceDelta +
    (giftPackaging ? giftBoxPrice : 0);
  const totalPrice = unitPrice * quantity;

  const handleBuildOrder = (openDrawer: boolean) => {
    const newItem: OrderCartItem = {
      cartItemId: `${selectedProduct.id}-${woodId}-${finish.id}-${Date.now()}`,
      productId: selectedProduct.id,
      title: selectedProduct.title,
      categoryLabel: selectedProduct.categoryLabel,
      image: selectedProduct.image,
      wood: activeWood,
      finish,
      size,
      customDimensionsText: size.id === 'custom' ? customDimensionsText : undefined,
      engravingText: engravingText.trim(),
      engravingFont,
      giftPackaging,
      quantity,
      unitPrice,
    };
    onAddConfiguredOrder(newItem, openDrawer);
  };

  return (
    <section
      id="customizer"
      className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      {/* Ambient Workshop Backlight */}
      <div
        className="pointer-events-none absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full blur-[150px] opacity-25 transition-colors duration-700"
        style={{ background: activeWood.accentHex }}
      />

      <div className="max-w-[1360px] mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-bold text-[#D49B54] mb-3 border border-[#D49B54]/30">
            <Wand2 className="w-4 h-4" />
            <span>استودیو طراحی و شخصی‌سازی آنلاین</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#F7F2EB] tracking-tight">
            اثر چوبی اختصاصی خودتان را بسازید
          </h2>
          <p className="text-sm sm:text-base text-[#C8B9A6] mt-2.5">
            نوع چوب، پوشش گیاهی، ابعاد و متن حکاکی لیزری را انتخاب کنید؛ قیمت و پیش‌نمایش
            حکاکی در لحظه برای شما محاسبه و نمایش داده می‌شود.
          </p>
        </div>

        {/* Main 12-Col Customizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right 7 Columns: Step-by-Step Interactive Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Base Product */}
            <div className="glass-panel rounded-[24px] p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-extrabold text-[#F7F2EB] flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#D49B54] text-[#120E0A] text-xs font-black flex items-center justify-center tabular-nums-fa">
                    {toPersianDigits(1)}
                  </span>
                  <span>انتخاب دست‌سازه چوبی</span>
                </h3>
                <span className="text-xs text-[#D49B54] font-semibold">
                  {selectedProduct.categoryLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {products.map((prod) => {
                  const active = prod.id === selectedProduct.id;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => onSelectProduct(prod)}
                      className={`p-2.5 rounded-2xl text-right transition-all cursor-pointer border flex flex-col gap-2 ${
                        active
                          ? 'bg-[#FFF4E5]/15 border-[#D49B54] shadow-lg shadow-[#D49B54]/15'
                          : 'bg-[#120E0A]/50 border-[#FFF0DC]/10 hover:border-[#FFF0DC]/25'
                      }`}
                    >
                      <div className="w-full h-16 rounded-xl overflow-hidden bg-[#18120C]">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#F7F2EB] line-clamp-1">
                          {prod.title.replace('ساعت دیواری ', '').replace('استند لپ‌تاپ ', '')}
                        </div>
                        <div className="text-[10px] text-[#D49B54] font-semibold mt-0.5 tabular-nums-fa">
                          {formatTomans(prod.basePrice)} ت
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Natural Wood Species */}
            <div className="glass-panel rounded-[24px] p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-extrabold text-[#F7F2EB] flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#D49B54] text-[#120E0A] text-xs font-black flex items-center justify-center tabular-nums-fa">
                    {toPersianDigits(2)}
                  </span>
                  <span>انتخاب گونه چوب طبیعی</span>
                </h3>
                <span className="text-xs text-[#C8B9A6]">
                  تضمین ۱۰۰٪ چوب طبیعی خشک‌شده در کوره
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {woods.map((wood) => {
                  const isSelected = woodId === wood.id;
                  return (
                    <button
                      key={wood.id}
                      type="button"
                      onClick={() => setWoodId(wood.id)}
                      className={`p-4 rounded-2xl text-right transition-all cursor-pointer border flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-[#FFF4E5]/14 border-[#D49B54] shadow-lg shadow-[#D49B54]/10'
                          : 'bg-[#120E0A]/50 border-[#FFF0DC]/10 hover:border-[#FFF0DC]/25'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl shrink-0 border border-white/30 shadow-md flex items-center justify-center"
                        style={{ background: wood.swatchGradient }}
                      >
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-[#F7F2EB] drop-shadow" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-extrabold text-[#F7F2EB]">
                            {wood.name}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#D49B54]/15 text-[#E5B26D] font-bold tabular-nums-fa">
                            {wood.priceMultiplier === 1
                              ? 'قیمت پایه'
                              : wood.priceMultiplier > 1
                              ? `+${toPersianDigits(Math.round((wood.priceMultiplier - 1) * 100))}٪`
                              : `-${toPersianDigits(Math.round((1 - wood.priceMultiplier) * 100))}٪`}
                          </span>
                        </div>
                        <p className="text-xs text-[#C8B9A6] mt-1 leading-relaxed">
                          {wood.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Select Protective Finish & Dimensions */}
            <div className="glass-panel rounded-[24px] p-5 sm:p-6 space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#F7F2EB] flex items-center gap-2.5 mb-4">
                  <span className="w-7 h-7 rounded-full bg-[#D49B54] text-[#120E0A] text-xs font-black flex items-center justify-center tabular-nums-fa">
                    {toPersianDigits(3)}
                  </span>
                  <span>پوشش محافظ و ابعاد ساخت</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {finishes.map((opt) => {
                    const active = finish.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFinish(opt)}
                        className={`p-3.5 rounded-2xl text-right transition-all cursor-pointer border flex flex-col justify-between ${
                          active
                            ? 'bg-[#FFF4E5]/14 border-[#D49B54]'
                            : 'bg-[#120E0A]/50 border-[#FFF0DC]/10 hover:border-[#FFF0DC]/25'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-extrabold text-[#F7F2EB]">
                              {opt.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#C8B9A6] leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[10px] text-[#E5B26D] font-semibold">
                            {opt.badge}
                          </span>
                          <span className="text-xs font-bold text-[#F7F2EB] tabular-nums-fa">
                            {opt.extraCost === 0
                              ? 'رایگان'
                              : `+${formatTomans(opt.extraCost)} ت`}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dimensions Selection */}
              <div className="pt-4 border-t border-[#FFF0DC]/10">
                <label className="text-xs sm:text-sm font-bold text-[#F7F2EB] flex items-center gap-2 mb-3">
                  <Ruler className="w-4 h-4 text-[#D49B54]" />
                  <span>انتخاب ابعاد سازه (ابعاد استاندارد این اثر: {selectedProduct.dimensions})</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {sizes.map((sz) => {
                    const active = size.id === sz.id;
                    return (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => setSize(sz)}
                        className={`p-3 rounded-xl text-right transition-all cursor-pointer border ${
                          active
                            ? 'bg-[#FFF4E5]/15 border-[#D49B54]'
                            : 'bg-[#120E0A]/45 border-[#FFF0DC]/10 hover:border-[#FFF0DC]/25'
                        }`}
                      >
                        <div className="text-xs font-bold text-[#F7F2EB]">{sz.name}</div>
                        <div className="text-[11px] text-[#C8B9A6] mt-0.5">
                          {sz.dimensionsLabel}
                        </div>
                        <div className="text-[11px] font-bold text-[#D49B54] mt-1 tabular-nums-fa">
                          {sz.priceDelta === 0
                            ? 'بدون هزینه اضافه'
                            : `+${formatTomans(sz.priceDelta)} تومان`}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {size.id === 'custom' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={customDimensionsText}
                      onChange={(e) => setCustomDimensionsText(e.target.value)}
                      placeholder="مثلاً: طول ۳۵ سانتی‌متر، عرض ۱۵ سانتی‌متر (مناسب لپ‌تاپ ۱۶ اینچ)"
                      className="w-full glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F7F2EB] placeholder-[#8A7968]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Laser Engraving & Gift Box */}
            <div className="glass-panel rounded-[24px] p-5 sm:p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-[#F7F2EB] flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#D49B54] text-[#120E0A] text-xs font-black flex items-center justify-center tabular-nums-fa">
                    {toPersianDigits(4)}
                  </span>
                  <span>حکاکی لیزری اختصاصی روی چوب (رایگان)</span>
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#4E9F6E]/20 text-[#4E9F6E] font-bold border border-[#4E9F6E]/30">
                  هدیه ویژه کارگاه اُرسی
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7">
                  <label className="block text-xs text-[#C8B9A6] mb-1.5">
                    متن دلخواه برای حکاکی (نام، تاریخ، شعر کوتاه یا نام برند):
                  </label>
                  <input
                    type="text"
                    maxLength={45}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="متن حکاکی روی چوب را بنویسید..."
                    className="w-full glass-input rounded-xl px-4 py-3 text-sm text-[#F7F2EB] placeholder-[#8A7968]"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs text-[#C8B9A6] mb-1.5">
                    سبک خط حکاکی:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'nastaaliq', label: 'کلاسیک هنری' },
                      { id: 'modern', label: 'مدرن ضخیم' },
                      { id: 'minimal-latin', label: 'مینیمال ظریف' },
                    ].map((fontItem) => (
                      <button
                        key={fontItem.id}
                        type="button"
                        onClick={() =>
                          setEngravingFont(
                            fontItem.id as 'nastaaliq' | 'modern' | 'minimal-latin'
                          )
                        }
                        className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          engravingFont === fontItem.id
                            ? 'bg-[#D49B54] text-[#120E0A] border-[#D49B54]'
                            : 'bg-[#120E0A]/50 text-[#C8B9A6] border-white/10 hover:text-white'
                        }`}
                      >
                        {fontItem.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live SVG Pyrography Wood Engraving Preview Plate */}
              <WoodEngravingPreview
                wood={activeWood}
                text={engravingText}
                fontStyle={engravingFont}
              />

              {/* Luxury Gift Box Option */}
              <div
                onClick={() => setGiftPackaging(!giftPackaging)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  giftPackaging
                    ? 'bg-[#D49B54]/15 border-[#D49B54]'
                    : 'bg-[#120E0A]/45 border-[#FFF0DC]/12 hover:border-[#FFF0DC]/25'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D49B54]/20 flex items-center justify-center text-[#D49B54]">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#F7F2EB]">
                      بسته‌بندی کادویی لوکس با پوشال چوب طبیعی و کارت اصالت موم‌مهر شده
                    </div>
                    <div className="text-[11px] text-[#C8B9A6]">
                      مناسب هدیه تولد، سالگرد، روز مهندس و هدایای مدیریتی
                    </div>
                  </div>
                </div>
                <div className="text-xs font-extrabold text-[#E5B26D] shrink-0 tabular-nums-fa">
                  +{formatTomans(giftBoxPrice)} تومان
                </div>
              </div>
            </div>
          </div>

          {/* Left 5 Columns: Sticky Glassmorphic Live Preview & Instant Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="glass-panel-elevated rounded-[28px] p-5 sm:p-6 space-y-5">
              {/* Live Visual Preview Box */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#16100B]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {/* Dynamic Wood Tint Layer */}
                <div
                  className="absolute inset-0 transition-colors duration-500 pointer-events-none"
                  style={{
                    backgroundColor: activeWood.tintOverlay,
                    mixBlendMode: 'soft-light',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120E0A] via-transparent to-black/25" />

                {/* If Wall Clock category is selected, show Live Interactive Clock Overlay */}
                {selectedProduct.category === 'wall-clock' && (
                  <div className="absolute top-3 left-3 glass-panel rounded-2xl p-2">
                    <LiveWoodenClockSVG
                      wood={activeWood}
                      engravingText={engravingText}
                      size={96}
                    />
                  </div>
                )}

                <div className="absolute bottom-3 inset-x-3 flex items-end justify-between gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D49B54] text-[#120E0A]">
                      پیش‌نمایش سفارش شما
                    </span>
                    <h4 className="text-base font-extrabold text-[#F7F2EB] mt-1">
                      {selectedProduct.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Configured Specs Summary */}
              <div className="space-y-2.5 text-xs sm:text-sm border-b border-[#FFF0DC]/12 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#C8B9A6]">جنس چوب انتخابی:</span>
                  <span className="font-bold text-[#F7F2EB] flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ background: activeWood.swatchGradient }}
                    />
                    {activeWood.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#C8B9A6]">پوشش و پرداخت سطح:</span>
                  <span className="font-bold text-[#F7F2EB]">{finish.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#C8B9A6]">ابعاد ساخت:</span>
                  <span className="font-bold text-[#F7F2EB]">
                    {size.id === 'custom' && customDimensionsText
                      ? customDimensionsText
                      : size.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#C8B9A6]">حکاکی لیزری:</span>
                  <span className="font-bold text-[#E5B26D] truncate max-w-[200px]">
                    {engravingText.trim() ? `«${engravingText}»` : 'بدون حکاکی'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#C8B9A6]">زمان آماده‌سازی در کارگاه:</span>
                  <span className="font-bold text-[#4E9F6E] flex items-center gap-1 tabular-nums-fa">
                    <Clock className="w-3.5 h-3.5" />
                    {toPersianDigits(selectedProduct.craftHours)} ساعت کار دست (ارسال ۳ روزه)
                  </span>
                </div>
              </div>

              {/* Quantity & Total Price */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 glass-pill rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-white/10 text-[#F7F2EB] font-bold cursor-pointer"
                  >
                    −
                  </button>
                  <span className="px-2 text-sm font-extrabold text-[#F7F2EB] tabular-nums-fa">
                    {toPersianDigits(quantity)} عدد
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg hover:bg-white/10 text-[#F7F2EB] font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="text-left">
                  <span className="text-[11px] text-[#C8B9A6] block">
                    مبلغ نهایی با احتساب حکاکی:
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#F7F2EB] tabular-nums-fa">
                    {formatTomans(totalPrice)}{' '}
                    <span className="text-xs font-bold text-[#D49B54]">تومان</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleBuildOrder(true)}
                  className="w-full btn-honey-gold py-4 rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>ثبت سفارش این دست‌سازه اختصاصی</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleBuildOrder(false)}
                  className="w-full glass-pill hover:border-[#D49B54]/50 py-3 rounded-2xl text-xs sm:text-sm font-bold text-[#C8B9A6] hover:text-[#F7F2EB] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Hammer className="w-4 h-4 text-[#D49B54]" />
                  <span>افزودن به سبد و طراحی یک قطعه دیگر</span>
                </button>
              </div>

              {/* Guarantee Footer Note */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#C8B9A6] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#4E9F6E] shrink-0" />
                <span>ارسال عکس قطعه چوب جهت تایید شما پیش از ارسال نهایی</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
