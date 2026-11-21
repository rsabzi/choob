import React, { useEffect, useMemo, useState } from 'react';
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
  Search,
  SearchX,
  X,
} from 'lucide-react';
import {
  CATEGORIES,
  ProductCategory,
  WoodProduct,
  WoodSpecies,
  formatTomans,
  toPersianDigits,
  woodById,
} from '../data/products';

interface PortfolioGalleryProps {
  products: WoodProduct[];
  woods: WoodSpecies[];
  onInspectProduct: (product: WoodProduct) => void;
  onCustomizeProduct: (product: WoodProduct) => void;
  onQuickAddToOrder: (product: WoodProduct) => void;
  categoryRequest?: { category: ProductCategory; nonce: number } | null;
}

type SortMode = 'featured' | 'cheapest' | 'expensive' | 'fastest';

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  products,
  woods,
  onInspectProduct,
  onCustomizeProduct,
  onQuickAddToOrder,
  categoryRequest,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedWoodFilter, setSelectedWoodFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('featured');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryRequest) return;
    setSelectedCategory(categoryRequest.category);
    setSelectedWoodFilter('all');
    setSearchQuery('');
  }, [categoryRequest]);

  const categoriesWithCount = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        ...cat,
        count:
          cat.id === 'all'
            ? products.length
            : products.filter((p) => p.category === cat.id).length,
      })).filter((cat) => cat.id === 'all' || cat.count > 0),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim();
    const filtered = products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesWood =
        selectedWoodFilter === 'all' || item.availableWoods.includes(selectedWoodFilter);
      const matchesSearch =
        !query ||
        item.title.includes(query) ||
        item.subtitle.includes(query) ||
        item.categoryLabel.includes(query);
      return matchesCategory && matchesWood && matchesSearch;
    });
    switch (sortMode) {
      case 'cheapest':
        return [...filtered].sort((a, b) => a.basePrice - b.basePrice);
      case 'expensive':
        return [...filtered].sort((a, b) => b.basePrice - a.basePrice);
      case 'fastest':
        return [...filtered].sort((a, b) => a.craftHours - b.craftHours);
      default:
        return filtered;
    }
  }, [products, selectedCategory, selectedWoodFilter, searchQuery, sortMode]);

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

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedWoodFilter('all');
    setSearchQuery('');
    setSortMode('featured');
  };

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24 overflow-x-clip">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[620px] h-[340px] rounded-full bg-[#D49B54]/10 blur-[140px]" />

      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-[#D49B54] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>کلکسیون دست‌سازه‌های تزیینی و کاربردی</span>
            </div>
            <h2 id="portfolio-title" className="text-2xl sm:text-4xl font-black text-[#F7F2EB] tracking-tight">
              خرید دست‌سازه‌های چوبی سفارشی و نمونه‌کارهای کارگاه
            </h2>
            <p className="text-sm sm:text-base text-[#C8B9A6] mt-2 max-w-[62ch]">
              هر اثر با انتخاب دقیق رگه‌های چوب طبیعی و پرداخت دست‌ساز تولید می‌شود. می‌توانید
              هر نمونه‌کار را دقیقاً با چوب، ابعاد و حکاکی دلخواه خودتان سفارش دهید.
            </p>
          </div>

          {/* Wood Filter Pills */}
          <div className="glass-panel rounded-2xl p-2.5 flex items-center gap-2 flex-wrap self-start md:self-auto max-w-full">
            <span className="text-xs text-[#C8B9A6] px-2 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D49B54]" />
              فیلتر نوع چوب:
            </span>
            <button
              type="button"
              onClick={() => setSelectedWoodFilter('all')}
              aria-pressed={selectedWoodFilter === 'all'}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedWoodFilter === 'all'
                  ? 'bg-[#D49B54] text-[#120E0A] font-bold shadow'
                  : 'text-[#C8B9A6] hover:text-[#F7F2EB]'
              }`}
            >
              همه چوب‌ها
            </button>
            {woods.map((wood) => {
              const active = selectedWoodFilter === wood.id;
              return (
                <button
                  key={wood.id}
                  type="button"
                  onClick={() => setSelectedWoodFilter(wood.id)}
                  aria-pressed={active}
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

        {/* Search + Sort Bar */}
        <div className="glass-panel rounded-2xl p-3 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-1/2 -translate-y-1/2" />
            <label htmlFor="portfolio-search" className="sr-only">جستجوی محصول چوبی</label>
            <input
              id="portfolio-search"
              type="text"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در نمونه‌کارها؛ مثلاً: ساعت، استند، گردو…"
              className="w-full glass-input rounded-xl pr-10 pl-10 py-2.5 text-xs sm:text-sm text-[#F7F2EB]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/8 flex items-center justify-center text-[#C8B9A6] hover:text-[#F7F2EB] cursor-pointer"
                aria-label="پاک کردن جستجو"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="glass-input rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#F7F2EB] cursor-pointer"
            aria-label="مرتب‌سازی نمونه‌کارها"
          >
            <option value="featured">مرتب‌سازی: منتخب کارگاه</option>
            <option value="cheapest">ارزان‌ترین اول</option>
            <option value="expensive">گران‌ترین اول</option>
            <option value="fastest">سریع‌ترین ساخت</option>
          </select>
          <span className="text-xs text-[#C8B9A6] px-1 whitespace-nowrap" role="status" aria-live="polite">
            {toPersianDigits(filteredProducts.length)} اثر پیدا شد
          </span>
        </div>

        {/* Category Filter Bar */}
        <div className="glass-panel rounded-2xl p-2 mb-10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categoriesWithCount.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={isActive}
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

        {/* Grid / Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="glass-panel rounded-[24px] p-10 text-center space-y-3">
            <SearchX className="w-10 h-10 text-[#D49B54] mx-auto" />
            <h3 className="text-base font-extrabold text-[#F7F2EB]">
              اثری با این فیلترها پیدا نشد
            </h3>
            <p className="text-xs sm:text-sm text-[#C8B9A6] max-w-md mx-auto">
              فیلترها را تغییر دهید؛ یا اگر طرح خاصی در ذهن دارید، از بخش «ثبت سفارش طرح
              دلخواه» همان ایده را برای ساخت سفارشی ثبت کنید.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-honey-gold px-5 py-2.5 rounded-xl text-xs font-extrabold cursor-pointer"
            >
              حذف همه فیلترها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const defaultWoodObj = woodById(woods, product.defaultWood);
              const isAdded = justAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="glass-card-interactive rounded-[22px] p-5 flex flex-col justify-between group"
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <div>
                    <div
                      onClick={() => onInspectProduct(product)}
                      className="relative rounded-2xl overflow-hidden aspect-[4/3.2] bg-[#16100B] mb-4 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={`${product.title}؛ دست‌سازه چوب طبیعی سفارشی`} itemProp="image"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                        width={960}
                        height={768}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120E0A]/85 via-transparent to-black/20" />

                      {product.badge && (
                        <span className="absolute top-3 right-3 glass-panel px-3 py-1 rounded-full text-[11px] font-bold text-[#F5D08A] border border-[#D49B54]/40">
                          {product.badge}
                        </span>
                      )}

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

                      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-[#F7F2EB]/90 bg-[#120E0A]/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                          {product.categoryLabel}
                        </span>

                        <div className="flex items-center gap-1.5 bg-[#120E0A]/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                          <span className="text-[10px] text-[#C8B9A6] ml-1">چوب‌ها:</span>
                          {product.availableWoods.map((wId) => {
                            const wood = woodById(woods, wId);
                            return (
                              <span
                                key={wId}
                                title={wood.name}
                                className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                                style={{ background: wood.swatchGradient }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#F7F2EB] group-hover:text-[#E5B26D] transition-colors leading-snug">
                      <button
                        type="button"
                        onClick={() => onInspectProduct(product)}
                        className="text-right cursor-pointer"
                        itemProp="name"
                      >
                        {product.title}
                      </button>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C8B9A6] mt-1.5 line-clamp-2 leading-relaxed" itemProp="description">
                      {product.subtitle}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFF4E5]/6 border border-[#FFF0DC]/10 text-xs text-[#E5B26D]">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: defaultWoodObj.swatchGradient }}
                        />
                        {defaultWoodObj.name}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFF4E5]/5 border border-[#FFF0DC]/10 text-[11px] text-[#C8B9A6]">
                        <Ruler className="w-3.5 h-3.5 text-[#D49B54]" />
                        {product.dimensions.split('(')[0]}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFF4E5]/5 border border-[#FFF0DC]/10 text-[11px] text-[#C8B9A6]">
                        <Clock className="w-3.5 h-3.5 text-[#D49B54]" />
                        ساخت: {toPersianDigits(product.craftHours)} ساعت دست
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#FFF0DC]/12 flex flex-wrap items-end justify-between gap-x-2 gap-y-3">
                    <div>
                      <span className="text-[11px] text-[#8A7968] block">شروع قیمت ساخت:</span>
                      <div className="text-base sm:text-lg font-black text-[#F7F2EB] tabular-nums-fa">
                        {formatTomans(product.basePrice)}{' '}
                        <span className="text-xs font-medium text-[#D49B54]">تومان</span>
                      </div>
                      <span className="text-[10px] text-[#8A7968]">قیمت شروع؛ نهایی در شخصی‌سازی مشخص می‌شود</span>
                      <span itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
                        <meta itemProp="priceCurrency" content="IRR" />
                        <meta itemProp="price" content={String(product.basePrice * 10)} />
                        <meta itemProp="availability" content="https://schema.org/MadeToOrder" />
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(product)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          isAdded
                            ? 'bg-[#4E9F6E]/25 border-[#4E9F6E] text-[#F7F2EB]'
                            : 'glass-pill hover:border-[#D49B54]/50 text-[#F7F2EB]'
                        }`}
                        title="افزودن سریع با مشخصات پیش‌فرض"
                        aria-label={`افزودن سریع ${product.title} به سبد سفارش`}
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
                        aria-label={`شخصی‌سازی و سفارش ${product.title}`}
                      >
                        سفارش و حکاکی
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
