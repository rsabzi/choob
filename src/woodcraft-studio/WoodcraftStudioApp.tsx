import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import {
  WoodProduct,
  WoodSpeciesId,
  OrderCartItem,
  woodById,
} from './data/products';
import { useStudio } from './store/StoreContext';
import { GlassHeader } from './components/GlassHeader';
import { HeroSection } from './components/HeroSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ServicesSection } from './components/ServicesSection';
import { CustomOrderStudio } from './components/CustomOrderStudio';
import { CustomProjectSection } from './components/CustomProjectSection';
import { CraftsmanshipAndReviews } from './components/CraftsmanshipAndReviews';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderCheckoutDrawer } from './components/OrderCheckoutDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { GlassFooter } from './components/GlassFooter';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export const WoodcraftStudioApp: React.FC = () => {
  const {
    db,
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    createOrder,
    submitContactMessage,
    findOrder,
  } = useStudio();

  const settings = db.settings;
  const activeProducts = useMemo(
    () => db.products.filter((p) => p.isActive !== false),
    [db.products]
  );
  const activeServices = useMemo(
    () => db.services.filter((s) => s.active),
    [db.services]
  );
  const activeTestimonials = useMemo(
    () => db.testimonials.filter((t) => t.active),
    [db.testimonials]
  );
  const activeFaqs = useMemo(() => db.faqs.filter((f) => f.active), [db.faqs]);

  const [selectedProductId, setSelectedProductId] = useState<string>(
    activeProducts[0]?.id ?? ''
  );
  const selectedCustomizerProduct =
    activeProducts.find((p) => p.id === selectedProductId) ?? activeProducts[0];

  const [inspectedModalProduct, setInspectedModalProduct] = useState<WoodProduct | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${settings.brandName} | دست‌سازه‌های چوبی سفارشی`;
  }, [settings.brandName]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3400);
  };

  const jumpToCustomizerWithProduct = (product: WoodProduct) => {
    setSelectedProductId(product.id);
    setInspectedModalProduct(null);
    scrollToId('customizer');
  };

  const handleQuickAddToOrder = (product: WoodProduct, chosenWoodId?: WoodSpeciesId) => {
    const woodObj = woodById(db.woods, chosenWoodId || product.defaultWood);
    const finish = db.finishes[0];
    const size = db.sizes[0];
    if (!finish || !size) return;
    const unitPrice =
      Math.round((product.basePrice * woodObj.priceMultiplier) / 10000) * 10000;

    addToCart({
      cartItemId: `${product.id}-${woodObj.id}-${Date.now()}`,
      productId: product.id,
      title: product.title,
      categoryLabel: product.categoryLabel,
      image: product.image,
      wood: woodObj,
      finish,
      size,
      engravingText: '',
      engravingFont: 'nastaaliq',
      giftPackaging: false,
      quantity: 1,
      unitPrice,
    });
    showToast(`«${product.title}» با ${woodObj.name} به سبد سفارش افزوده شد.`);
  };

  const handleAddConfiguredOrder = (item: OrderCartItem, openDrawerImmediately: boolean) => {
    addToCart(item);
    if (openDrawerImmediately) {
      setIsDrawerOpen(true);
    } else {
      showToast(`«${item.title}» با حکاکی اختصاصی شما به سبد سفارش اضافه شد.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#120E0A] text-[#F7F2EB] wood-grain-pattern relative selection:bg-[#D49B54]/30 overflow-x-clip">
      <GlassHeader
        brandName={settings.brandName}
        brandTagline={settings.brandTagline}
        cartCount={cartCount}
        onOpenCart={() => setIsDrawerOpen(true)}
        onJumpToCustomizer={() => scrollToId('customizer')}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      <main>
        <HeroSection
          products={activeProducts}
          woods={db.woods}
          settings={settings}
          onSelectProductForCustomizing={jumpToCustomizerWithProduct}
          onQuickInspect={(prod) => setInspectedModalProduct(prod)}
        />

        <PortfolioGallery
          products={activeProducts}
          woods={db.woods}
          onInspectProduct={(prod) => setInspectedModalProduct(prod)}
          onCustomizeProduct={jumpToCustomizerWithProduct}
          onQuickAddToOrder={(prod) => handleQuickAddToOrder(prod)}
        />

        <ServicesSection
          services={activeServices}
          onStartCustomProject={() => scrollToId('custom-project')}
          onJumpToCustomizer={() => scrollToId('customizer')}
        />

        {selectedCustomizerProduct && (
          <CustomOrderStudio
            products={activeProducts}
            woods={db.woods}
            finishes={db.finishes}
            sizes={db.sizes}
            giftBoxPrice={settings.giftBoxPrice}
            selectedProduct={selectedCustomizerProduct}
            onSelectProduct={(p) => setSelectedProductId(p.id)}
            onAddConfiguredOrder={handleAddConfiguredOrder}
          />
        )}

        <CustomProjectSection
          woods={db.woods}
          whatsappNumber={settings.whatsappNumber}
          onCreateOrder={createOrder}
          onOpenTracking={() => setIsTrackingOpen(true)}
        />

        <CraftsmanshipAndReviews
          woods={db.woods}
          testimonials={activeTestimonials}
          ratingSummary={settings.ratingSummary}
          onJumpToCustomizer={() => scrollToId('customizer')}
        />

        <FaqSection
          faqs={activeFaqs}
          phoneDisplay={settings.phoneDisplay}
          onOpenTracking={() => setIsTrackingOpen(true)}
        />

        <ContactSection settings={settings} onSubmitMessage={submitContactMessage} />
      </main>

      <GlassFooter
        settings={settings}
        onOpenCustomProject={() => scrollToId('custom-project')}
        onJumpToCustomizer={() => scrollToId('customizer')}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      <ProductDetailModal
        product={inspectedModalProduct}
        woods={db.woods}
        onClose={() => setInspectedModalProduct(null)}
        onLoadIntoCustomizer={jumpToCustomizerWithProduct}
        onDirectAddToOrder={(prod, chosenWood) => handleQuickAddToOrder(prod, chosenWood)}
      />

      <OrderCheckoutDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={cartItems}
        settings={settings}
        coupons={db.coupons}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onClearCart={clearCart}
        onGoCustomProject={() => scrollToId('custom-project')}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onSubmitOrder={(customer, totals) => {
          const order = createOrder({
            type: 'cart',
            customer,
            items: cartItems,
            subtotal: totals.subtotal,
            shippingCost: totals.shippingCost,
            discountAmount: totals.discountAmount,
            couponCode: totals.couponCode,
            total: totals.total,
          });
          return order.code;
        }}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        onFindOrder={findOrder}
      />

      {toastMessage && (
        <div className="fixed bottom-safe right-4 left-4 sm:right-6 sm:left-auto z-50 glass-panel-elevated rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-2xl border border-[#D49B54] max-w-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#4E9F6E] shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-[#F7F2EB] flex-1">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="px-2.5 py-1 rounded-lg bg-[#D49B54] text-[#120E0A] text-xs font-black shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            مشاهده سبد
          </button>
        </div>
      )}
    </div>
  );
};
