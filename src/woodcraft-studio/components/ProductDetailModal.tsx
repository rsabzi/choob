import React, { useState, useEffect } from 'react';
import {
  X,
  Ruler,
  Weight,
  Clock,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Wand2,
  ShoppingBag,
} from 'lucide-react';
import {
  WoodProduct,
  WoodSpecies,
  WoodSpeciesId,
  formatTomans,
  toPersianDigits,
  woodById,
} from '../data/products';

interface ProductDetailModalProps {
  product: WoodProduct | null;
  woods: WoodSpecies[];
  onClose: () => void;
  onLoadIntoCustomizer: (product: WoodProduct) => void;
  onDirectAddToOrder: (product: WoodProduct, chosenWood: WoodSpeciesId) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  woods,
  onClose,
  onLoadIntoCustomizer,
  onDirectAddToOrder,
}) => {
  const [selectedWood, setSelectedWood] = useState<WoodSpeciesId>('walnut');

  useEffect(() => {
    if (product) {
      setSelectedWood(product.defaultWood);
    }
  }, [product]);

  if (!product) return null;

  const woodObj = woodById(woods, selectedWood);
  const calculatedPrice =
    Math.round((product.basePrice * woodObj.priceMultiplier) / 10000) * 10000;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="glass-panel-elevated rounded-[24px] sm:rounded-[28px] max-w-4xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-[#F7F2EB] hover:text-[#D49B54] hover:border-[#D49B54] transition-all cursor-pointer"
          aria-label="بستن پنجره"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-start">
          {/* Right 6 Cols: Visual & Wood Tone Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3.5] bg-[#16100B]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 transition-colors duration-500 pointer-events-none"
                style={{
                  backgroundColor: woodObj.tintOverlay,
                  mixBlendMode: 'soft-light',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120E0A]/80 via-transparent to-transparent" />

              {product.badge && (
                <span className="absolute top-3 right-3 glass-panel px-3 py-1 rounded-full text-xs font-bold text-[#F5D08A]">
                  {product.badge}
                </span>
              )}

              <div className="absolute bottom-3 inset-x-3 glass-panel rounded-xl p-3 flex items-center justify-between gap-2">
                <span className="text-xs text-[#C8B9A6] min-w-0 truncate">
                  بافت پیش‌نمایش: <strong className="text-[#F7F2EB]">{woodObj.name}</strong>
                </span>
                <span className="text-xs text-[#D49B54] font-bold shrink-0">
                  {product.categoryLabel}
                </span>
              </div>
            </div>

            {/* Technical Specs Strip */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="glass-panel rounded-xl p-2 sm:p-3 text-center min-w-0">
                <Ruler className="w-4 h-4 text-[#D49B54] mx-auto mb-1" />
                <span className="text-[10px] text-[#C8B9A6] block">ابعاد</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#F7F2EB] mt-0.5 block leading-snug break-words">
                  {product.dimensions.split('(')[0]}
                </span>
              </div>
              <div className="glass-panel rounded-xl p-2 sm:p-3 text-center min-w-0">
                <Weight className="w-4 h-4 text-[#D49B54] mx-auto mb-1" />
                <span className="text-[10px] text-[#C8B9A6] block">وزن خالص</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#F7F2EB] mt-0.5 block leading-snug break-words">
                  {product.weight}
                </span>
              </div>
              <div className="glass-panel rounded-xl p-2 sm:p-3 text-center min-w-0">
                <Clock className="w-4 h-4 text-[#D49B54] mx-auto mb-1" />
                <span className="text-[10px] text-[#C8B9A6] block">ساعت کار دست</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#F7F2EB] mt-0.5 block leading-snug break-words">
                  {toPersianDigits(product.craftHours)} ساعت
                </span>
              </div>
            </div>
          </div>

          {/* Left 6 Cols: Story, Wood Selection, Highlights & Actions */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-bold text-[#D49B54] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                دست‌سازه تزیینی و کاربردی کارگاه اُرسی
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#F7F2EB] mt-1 leading-snug">
                {product.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#C8B9A6] mt-2 leading-relaxed">
                {product.story}
              </p>
            </div>

            {/* Choose Wood in Modal */}
            <div>
              <label className="block text-xs font-bold text-[#F7F2EB] mb-2">
                انتخاب چوب قابل سفارش برای این اثر:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.availableWoods.map((wId) => {
                  const w = woodById(woods, wId);
                  const active = selectedWood === wId;
                  return (
                    <button
                      key={wId}
                      type="button"
                      onClick={() => setSelectedWood(wId)}
                      className={`p-2.5 rounded-xl border text-right flex items-center gap-2.5 transition-all cursor-pointer ${
                        active
                          ? 'bg-[#FFF4E5]/15 border-[#D49B54]'
                          : 'bg-[#120E0A]/50 border-white/10 hover:border-white/25'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full shrink-0 border border-white/30"
                        style={{ background: w.swatchGradient }}
                      />
                      <span className="text-xs font-bold text-[#F7F2EB] min-w-0 truncate">{w.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Key Craft Highlights */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#F7F2EB] block">
                ویژگی‌های برجسته ساخت:
              </span>
              {product.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#C8B9A6]">
                  <CheckCircle2 className="w-4 h-4 text-[#4E9F6E] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Care Guide Note */}
            <div className="p-3 rounded-xl bg-[#120E0A]/55 border border-[#FFF0DC]/10 text-[11px] text-[#C8B9A6] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D49B54] shrink-0" />
              <span>نگهداری: {product.careGuide}</span>
            </div>

            {/* Price & Dual CTA */}
            <div className="pt-3 border-t border-[#FFF0DC]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-[#8A7968] block">
                  بهای ساخت با {woodObj.name}:
                </span>
                <div className="text-2xl font-black text-[#F7F2EB] tabular-nums-fa">
                  {formatTomans(calculatedPrice)}{' '}
                  <span className="text-xs font-bold text-[#D49B54]">تومان</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    onDirectAddToOrder(product, selectedWood);
                    onClose();
                  }}
                  className="glass-pill hover:border-[#D49B54] px-4 py-3 rounded-xl text-xs font-bold text-[#F7F2EB] flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D49B54]" />
                  <span>افزودن مستقیم</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onLoadIntoCustomizer(product);
                    onClose();
                  }}
                  className="btn-honey-gold px-5 py-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer flex-1 sm:flex-none"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>حکاکی و شخصی‌سازی</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
