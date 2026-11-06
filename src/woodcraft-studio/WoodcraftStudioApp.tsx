import React, { useState } from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import {
  PRODUCTS,
  WoodProduct,
  WOOD_SPECIES,
  WoodSpeciesId,
  FINISH_OPTIONS,
  SIZE_OPTIONS,
  OrderCartItem,
} from './data/products';
import { GlassHeader } from './components/GlassHeader';
import { HeroSection } from './components/HeroSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { CustomOrderStudio } from './components/CustomOrderStudio';
import { CraftsmanshipAndReviews } from './components/CraftsmanshipAndReviews';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderCheckoutDrawer } from './components/OrderCheckoutDrawer';
import { GlassFooter } from './components/GlassFooter';

export const WoodcraftStudioApp: React.FC = () => {
  const [selectedCustomizerProduct, setSelectedCustomizerProduct] = useState<WoodProduct>(
    PRODUCTS[0]
  );
  const [inspectedModalProduct, setInspectedModalProduct] = useState<WoodProduct | null>(
    null
  );
  const [cartItems, setCartItems] = useState<OrderCartItem[]>([
    {
      cartItemId: 'initial-sample-1',
      productId: PRODUCTS[0].id,
      title: PRODUCTS[0].title,
      categoryLabel: PRODUCTS[0].categoryLabel,
      image: PRODUCTS[0].image,
      wood: WOOD_SPECIES[PRODUCTS[0].defaultWood],
      finish: FINISH_OPTIONS[0],
      size: SIZE_OPTIONS[0],
      engravingText: 'خانواده مهرآور',
      engravingFont: 'nastaaliq',
      giftPackaging: false,
      quantity: 1,
      unitPrice:
        Math.round(
          (PRODUCTS[0].basePrice * WOOD_SPECIES[PRODUCTS[0].defaultWood].priceMultiplier) /
            10000
        ) * 10000,
    },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const jumpToCustomizerWithProduct = (product: WoodProduct) => {
    setSelectedCustomizerProduct(product);
    const el = document.getElementById('customizer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickAddToOrder = (
    product: WoodProduct,
    chosenWoodId?: WoodSpeciesId
  ) => {
    const woodObj = WOOD_SPECIES[chosenWoodId || product.defaultWood];
    const unitPrice =
      Math.round((product.basePrice * woodObj.priceMultiplier) / 10000) * 10000;

    const newItem: OrderCartItem = {
      cartItemId: `${product.id}-${woodObj.id}-${Date.now()}`,
      productId: product.id,
      title: product.title,
      categoryLabel: product.categoryLabel,
      image: product.image,
      wood: woodObj,
      finish: FINISH_OPTIONS[0],
      size: SIZE_OPTIONS[0],
      engravingText: '',
      engravingFont: 'nastaaliq',
      giftPackaging: false,
      quantity: 1,
      unitPrice,
    };

    setCartItems((prev) => [newItem, ...prev]);
    showToast(`«${product.title}» با ${woodObj.name} به لیست سفارش افزوده شد.`);
  };

  const handleAddConfiguredOrder = (
    item: OrderCartItem,
    openDrawerImmediately: boolean
  ) => {
    setCartItems((prev) => [item, ...prev]);
    if (openDrawerImmediately) {
      setIsDrawerOpen(true);
    } else {
      showToast(`«${item.title}» با حکاکی اختصاصی شما به سبد سفارش اضافه شد.`);
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((it) => {
        if (it.cartItemId !== cartItemId) return it;
        const nextQ = Math.max(1, it.quantity + delta);
        return { ...it, quantity: nextQ };
      })
    );
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#120E0A] text-[#F7F2EB] wood-grain-pattern relative selection:bg-[#D49B54]/30">
      {/* Floating Glass Header */}
      <GlassHeader
        cartCount={totalItemsCount}
        onOpenCart={() => setIsDrawerOpen(true)}
        onJumpToCustomizer={() => {
          const el = document.getElementById('customizer');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content */}
      <main>
        <HeroSection
          products={PRODUCTS}
          onSelectProductForCustomizing={jumpToCustomizerWithProduct}
          onQuickInspect={(prod) => setInspectedModalProduct(prod)}
        />

        <PortfolioGallery
          products={PRODUCTS}
          onInspectProduct={(prod) => setInspectedModalProduct(prod)}
          onCustomizeProduct={jumpToCustomizerWithProduct}
          onQuickAddToOrder={(prod) => handleQuickAddToOrder(prod)}
        />

        <CustomOrderStudio
          products={PRODUCTS}
          selectedProduct={selectedCustomizerProduct}
          onSelectProduct={setSelectedCustomizerProduct}
          onAddConfiguredOrder={handleAddConfiguredOrder}
        />

        <CraftsmanshipAndReviews
          onJumpToCustomizer={() => {
            const el = document.getElementById('customizer');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* Footer & Custom Sketch Inquiry Banner */}
      <GlassFooter
        onOpenCustomOrderDrawer={() => setIsDrawerOpen(true)}
        onJumpToCustomizer={() => {
          const el = document.getElementById('customizer');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Product Detail Inspection Modal */}
      <ProductDetailModal
        product={inspectedModalProduct}
        onClose={() => setInspectedModalProduct(null)}
        onLoadIntoCustomizer={jumpToCustomizerWithProduct}
        onDirectAddToOrder={(prod, chosenWood) =>
          handleQuickAddToOrder(prod, chosenWood)
        }
      />

      {/* Order Checkout Drawer */}
      <OrderCheckoutDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={() => setCartItems([])}
      />

      {/* Floating Glass Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 glass-panel-elevated rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-2xl border border-[#D49B54] max-w-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#4E9F6E] shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-[#F7F2EB]">
            {toastMessage}
          </span>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="px-2.5 py-1 rounded-lg bg-[#D49B54] text-[#120E0A] text-xs font-black shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            مشاهده
          </button>
        </div>
      )}
    </div>
  );
};
