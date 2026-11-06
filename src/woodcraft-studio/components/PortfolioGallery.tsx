import React, { useState, useMemo } from 'react';
import {
  Clock,
  Laptop,
  Smartphone,
  Key,
  Layers,
  Sparkles,
  Eye,
  SlidersHorizontal,
  Ruler,
  Check,
} from 'lucide-react';
import {
  CATEGORIES,
  ProductCategory,
  WoodProduct,
  WOOD_SPECIES,
  WoodSpeciesId,
  formatTomans,
  toPersianDigits,
} from '../data/products';

interface PortfolioGalleryProps {
  products: WoodProduct[];
  onInspectProduct: (product: WoodProduct) => void;
  onCustomizeProduct: (product: WoodProduct) => void;
  onQuickAddToOrder: (product: WoodProduct) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  products,
  onInspectProduct,
  onCustomizeProduct,
  onQuickAddToOrder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedWoodFilter, setSelectedWoodFilter] = useState<WoodSpeciesId | 'all'>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesWood =
        selectedWoodFilter === 'all' || item.availableWoods.includes(selectedWoodFilter);
      return matchesCategory && matchesWood;
    });
  }, [products, selectedCategory, selectedWoodFilter]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-4 h-4" />;
      case 'Laptop':
        return <Laptop className="w-4 h-4" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4" />;
      case 'Key':
        return <Key className="w-4 h-4" />;
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const handleQuickAdd = (product: WoodProduct) => {
    onQuickAddToOrder(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((prev) => (prev === product.id ? null : prev));
    }, 1800);
  };

  return (
    <section
      id="portfolio"
      className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24"
    >
      {/* Background Warm Amber Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[620px] h-[340px] rounded-full bg-[#D49B54]/10 blur-[140px]" />

      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-[#D49B54] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>کلکسیون دست‌سازه‌های تزیینی و کاربردی</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#F7F2EB] tracking-tight">
              ویترین نمونه‌کارهای چوبی کارگاه
            </h2>
            <p className="text-sm sm:text-base text-[#C8B9A6] mt-2 max-w-[62ch]">
              هر اثر با انتخاب دقیق رگه‌های چوب طبیعی و پرداخت دست‌ساز تولید می‌شود. می‌توانید
              هر نمونه‌کار را دقیقاً با چوب، ابعاد و حکاکی دلخواه خودتان سفارش دهید.
            </p>
          </div>

          {/* Wood Filter Pills */}
          <div className="glass-panel rounded-2xl p-2.5 flex items-center gap-2 flex-wrap self-start md:self-auto">
            <span className="text-xs text-[#C8B9A6] px-2 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D49B54]" />
              فیلتر نوع چوب:
            </span>
            <button
              type="button"
              onClick={() => setSelectedWoodFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedWoodFilter === 'all'
                  ? 'bg-[#D49B54] text-[#120E0A] font-bold shadow'
                  : 'text-[#C8B9A6] hover:text-[#F7F2EB]'
              }`}
            >
              همه چوب‌ها
            </button>
            {(Object.keys(WOOD_SPECIES) as WoodSpeciesId[]).map((wId) => {
              const wood = WOOD_SPECIES[wId];
              const active = selectedWoodFilter === wId;
              return (
                <button
                  key={wId}
                  type="button"
                  onClick={() => setSelectedWoodFilter(wId)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#FFF4E5]/20 text-[#F7F2EB] border border-[#D49B54]'
                      : 'text-[#C8B9A6] hover:text-[#F7F2EB]'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ background: wood.swatchGradient }}
                  />
                  <span>{wood.name.replace('چوب ', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="glass-panel rounded-2xl p-2 mb-10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'btn-honey-gold shadow-lg'
                    : 'text-[#C8B9A6] hover:text-[#F7F2EB] hover:bg-[#FFF4E5]/8'
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] tabular-nums-fa ${
                    isActive
                      ? 'bg-[#120E0A]/20 text-[#120E0A]'
                      : 'bg-[#FFF4E5]/10 text-[#C8B9A6]'
                  }`}
                >
                  {toPersianDigits(cat.count)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid (3 Columns Desktop, 2 Tablet, 1 Mobile, 24px gap) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const defaultWoodObj = WOOD_SPECIES[product.defaultWood];
            const isAdded = justAddedId === product.id;

            return (
              <article
                key={product.id}
                className="glass-card-interactive rounded-[22px] p-5 flex flex-col justify-between group"
              >
                <div>
                  {/* 1. Product Visual Thumbnail with Wood Swatches & Category Badge */}
                  <div
                    onClick={() => onInspectProduct(product)}
                    className="relative rounded-2xl overflow-hidden aspect-[4/3.2] bg-[#16100B] mb-4 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120E0A]/85 via-transparent to-black/20" />

                    {/* Top Right Badge */}
                    {product.badge && (
                      <span className="absolute top-3 right-3 glass-panel px-3 py-1 rounded-full text-[11px] font-bold text-[#F5D08A] border border-[#D49B54]/40">
                        {product.badge}
                      </span>
                    )}

                    {/* Top Left Quick Inspect Icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectProduct(product);
                      }}
                      className="absolute top-3 left-3 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-[#F7F2EB] hover:text-[#D49B54] hover:border-[#D49B54] transition-all cursor-pointer"
                      aria-label={`مشاهده جزئیات ${product.title}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Bottom Available Wood Swatches Overlay */}
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[#F7F2EB]/90 bg-[#120E0A]/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                        {product.categoryLabel}
                      </span>

                      <div className="flex items-center gap-1.5 bg-[#120E0A]/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        <span className="text-[10px] text-[#C8B9A6] ml-1">چوب‌ها:</span>
                        {product.availableWoods.map((wId) => (
                          <span
                            key={wId}
                            title={WOOD_SPECIES[wId].name}
                            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                            style={{ background: WOOD_SPECIES[wId].swatchGradient }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. Product Title & Subtitle */}
                  <h3
                    onClick={() => onInspectProduct(product)}
                    className="text-lg font-extrabold text-[#F7F2EB] group-hover:text-[#E5B26D] transition-colors cursor-pointer leading-snug"
                  >
                    {product.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C8B9A6] mt-1.5 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>

                  {/* 3. Material & Dimensions Pill */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFF4E5]/6 border border-[#FFF0DC]/10 text-xs text-[#E5B26D]">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: defaultWoodObj.swatchGradient }}
                      />
                      {defaultWoodObj.name}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFF4E5]/5 border border-[#FFF0DC]/10 text-[11px] text-[#C8B9A6] tabular-nums-fa">
                      <Ruler className="w-3.5 h-3.5 text-[#D49B54]" />
                      {product.dimensions.split('(')[0]}
                    </span>
                  </div>
                </div>

                {/* 4. Price + Quick Custom Order Trigger */}
                <div className="mt-5 pt-4 border-t border-[#FFF0DC]/12 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-[#8A7968] block">
                      شروع قیمت ساخت:
                    </span>
                    <div className="text-base sm:text-lg font-black text-[#F7F2EB] tabular-nums-fa">
                      {formatTomans(product.basePrice)}{' '}
                      <span className="text-xs font-medium text-[#D49B54]">تومان</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(product)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isAdded
                          ? 'bg-[#4E9F6E]/25 border-[#4E9F6E] text-[#F7F2EB]'
                          : 'glass-pill hover:border-[#D49B54]/50 text-[#F7F2EB]'
                      }`}
                      title="افزودن سریع با مشخصات پیش‌فرض"
                    >
                      {isAdded ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-[#4E9F6E]" />
                          افزوده شد
                        </span>
                      ) : (
                        'افزودن سریع'
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onCustomizeProduct(product)}
                      className="btn-honey-gold px-4 py-2.5 rounded-xl text-xs font-extrabold cursor-pointer"
                    >
                      سفارش و حکاکی
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
