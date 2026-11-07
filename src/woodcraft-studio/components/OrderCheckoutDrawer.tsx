import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Phone,
  MapPin,
  User,
  MessageSquare,
  Gift,
  Send,
  ShieldCheck,
  PackageSearch,
} from 'lucide-react';
import {
  OrderCartItem,
  formatTomans,
  normalizeIranPhone,
  toPersianDigits,
} from '../data/products';
import type { Coupon, SiteSettings } from '../store/types';

export interface CheckoutCustomerInput {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  contactChannel: 'whatsapp' | 'telegram' | 'call';
  note: string;
}

interface OrderCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderCartItem[];
  settings: SiteSettings;
  coupons: Coupon[];
  onRemoveItem: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onClearCart: () => void;
  onSubmitOrder: (
    customer: CheckoutCustomerInput,
    totals: {
      subtotal: number;
      shippingCost: number;
      discountAmount: number;
      couponCode?: string;
      total: number;
    }
  ) => string;
  onOpenTracking: () => void;
  onGoCustomProject: () => void;
}

export const OrderCheckoutDrawer: React.FC<OrderCheckoutDrawerProps> = ({
  isOpen,
  onClose,
  items,
  settings,
  coupons,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onSubmitOrder,
  onOpenTracking,
  onGoCustomProject,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [carpenterNote, setCarpenterNote] = useState('');
  const [contactChannel, setContactChannel] = useState<'whatsapp' | 'telegram' | 'call'>('whatsapp');
  const [formError, setFormError] = useState('');
  const [submittedOrderCode, setSubmittedOrderCode] = useState<string | null>(null);
  const [submittedSummaryText, setSubmittedSummaryText] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponMsg, setCouponMsg] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount =
    appliedCoupon && subtotal >= appliedCoupon.minTotal
      ? Math.round((subtotal * appliedCoupon.percent) / 100)
      : 0;
  const shippingCost =
    subtotal === 0 || subtotal - discountAmount >= settings.freeShippingThreshold
      ? 0
      : settings.shippingCost;
  const grandTotal = subtotal - discountAmount + shippingCost;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    const found = coupons.find((c) => c.active && c.code.toUpperCase() === code);
    if (!found) {
      setAppliedCoupon(null);
      setCouponMsg('این کد تخفیف معتبر یا فعال نیست.');
      return;
    }
    if (subtotal < found.minTotal) {
      setAppliedCoupon(null);
      setCouponMsg(
        `این کد برای سفارش‌های بالای ${formatTomans(found.minTotal)} تومان است.`
      );
      return;
    }
    setAppliedCoupon(found);
    setCouponMsg(`کد «${found.code}» اعمال شد؛ ${toPersianDigits(found.percent)}٪ تخفیف گرفتید.`);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setFormError('سبد سفارش شما خالی است؛ ابتدا از ویترین یک اثر انتخاب کنید.');
      return;
    }
    if (fullName.trim().length < 3) {
      setFormError('لطفاً نام و نام خانوادگی کامل خود را وارد کنید.');
      return;
    }
    const normalizedPhone = normalizeIranPhone(phone);
    if (!normalizedPhone) {
      setFormError('شماره موبایل معتبر نیست؛ شماره باید ۱۱ رقمی و با ۰۹ شروع شود (مثل ۰۹۱۲۳۴۵۶۷۸۹).');
      return;
    }
    setFormError('');

    const code = onSubmitOrder(
      {
        fullName: fullName.trim(),
        phone: normalizedPhone,
        city: city.trim(),
        address: address.trim(),
        contactChannel,
        note: carpenterNote.trim(),
      },
      {
        subtotal,
        shippingCost,
        discountAmount,
        couponCode: appliedCoupon && discountAmount > 0 ? appliedCoupon.code : undefined,
        total: grandTotal,
      }
    );

    const itemsSummary = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.title} (${it.wood.name} - ${it.finish.name}) × ${it.quantity} عدد${
            it.engravingText ? ` | حکاکی: «${it.engravingText}»` : ''
          }`
      )
      .join('\n');

    setSubmittedSummaryText(
      `سلام وقت بخیر، سفارش جدید من از وب‌سایت ${settings.brandName}:\nکد سفارش: ${code}\nنام مشتری: ${fullName}\nشماره تماس: ${normalizedPhone}\nآدرس: ${address || city || 'هماهنگی تلفنی'}\n---\nاقلام سفارش:\n${itemsSummary}\nمبلغ کل: ${formatTomans(grandTotal)} تومان\nتوضیحات: ${carpenterNote || 'ندارد'}`
    );
    setSubmittedOrderCode(code);
    onClearCart();
  };

  const handleResetAndClose = () => {
    setSubmittedOrderCode(null);
    setFormError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md"
      onClick={handleResetAndClose}
    >
      <div
        className="glass-panel-elevated w-full max-w-xl h-full overflow-y-auto p-4 pb-safe sm:p-7 flex flex-col animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#FFF0DC]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#D49B54]/20 border border-[#D49B54]/40 flex items-center justify-center text-[#D49B54]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-black text-[#F7F2EB]">سبد سفارش اختصاصی کارگاه</h3>
              <p className="text-xs text-[#C8B9A6]">
                تایید مشخصات چوب، حکاکی لیزری و ثبت سفارش مستقیم برای مدیریت
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-[#C8B9A6] hover:text-[#F7F2EB] cursor-pointer shrink-0"
            aria-label="بستن سبد سفارش"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedOrderCode ? (
          <div className="py-8 space-y-6 text-center">
            <div className="w-20 h-20 rounded-full bg-[#4E9F6E]/20 border-2 border-[#4E9F6E] flex items-center justify-center mx-auto text-[#4E9F6E]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-[#D49B54]/20 text-[#E5B26D] text-xs font-extrabold">
                سفارش شما ثبت و برای مدیریت کارگاه ارسال شد
              </span>
              <h4 className="text-2xl font-black text-[#F7F2EB]">
                سپاس از اعتماد شما، {fullName} عزیز!
              </h4>
              <p className="text-xs sm:text-sm text-[#C8B9A6] leading-relaxed max-w-md mx-auto">
                استادکار ما ظرف کمتر از ۲ ساعت کاری، تصویر اسلب‌های چوب طبیعی موجود را از طریق{' '}
                <strong className="text-[#F7F2EB]">
                  {contactChannel === 'whatsapp'
                    ? 'واتساپ'
                    : contactChannel === 'telegram'
                    ? 'تلگرام'
                    : 'تماس تلفنی'}
                </strong>{' '}
                برای شماره <span className="text-[#E5B26D] font-bold">{toPersianDigits(phone)}</span>{' '}
                ارسال می‌کند تا نقش چوب اثر خود را تایید کنید.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-4 text-right space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C8B9A6]">کد پیگیری سفارش:</span>
                <span className="font-mono font-black text-sm text-[#D49B54]">
                  {submittedOrderCode}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C8B9A6]">وضعیت فعلی:</span>
                <span className="text-[#E5B26D] font-bold">جدید — در انتظار بررسی کارگاه</span>
              </div>
              <p className="text-[11px] text-[#8A7968] leading-relaxed">
                این کد را نگه دارید؛ با دکمه «پیگیری سفارش» در بالای سایت و همین شماره موبایل،
                وضعیت ساخت اثرتان را هر لحظه می‌بینید.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(submittedSummaryText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-honey-gold py-3.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>ارسال مستقیم جزئیات سفارش در واتساپ کارگاه</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  handleResetAndClose();
                  onOpenTracking();
                }}
                className="w-full glass-pill py-3 rounded-2xl text-xs font-bold text-[#F7F2EB] flex items-center justify-center gap-2 cursor-pointer"
              >
                <PackageSearch className="w-4 h-4 text-[#D49B54]" />
                پیگیری وضعیت سفارشم
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-2 text-xs font-bold text-[#C8B9A6] hover:text-[#F7F2EB] cursor-pointer"
              >
                بازگشت به گالری آثار چوبی
              </button>
            </div>
          </div>
        ) : (
          <div className="py-5 space-y-6">
            {items.length === 0 ? (
              <div className="glass-panel rounded-2xl p-5 text-center space-y-3">
                <Sparkles className="w-7 h-7 text-[#D49B54] mx-auto" />
                <div className="text-sm font-bold text-[#F7F2EB]">
                  سبد سفارش شما در حال حاضر خالی است
                </div>
                <p className="text-xs text-[#C8B9A6] leading-relaxed">
                  از ویترین نمونه‌کارها یک اثر انتخاب کنید و آن را با چوب و حکاکی دلخواهتان
                  شخصی‌سازی کنید؛ یا اگر ایده‌ای کاملاً تازه دارید، فرم سفارش طرح دلخواه را پر
                  کنید.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onGoCustomProject();
                  }}
                  className="btn-honey-gold px-5 py-2.5 rounded-xl text-xs font-extrabold cursor-pointer"
                >
                  ثبت سفارش طرح دلخواه من
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.cartItemId} className="glass-panel rounded-2xl p-3.5 flex items-start gap-3.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#F7F2EB] truncate">
                          {item.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#8A7968] hover:text-[#D9534F] transition-colors cursor-pointer"
                          aria-label="حذف از سبد"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-[#C8B9A6]">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-[#E5B26D] font-semibold">
                          {item.wood.name}
                        </span>
                        <span>•</span>
                        <span>{item.size.name}</span>
                        {item.customDimensionsText && (
                          <>
                            <span>•</span>
                            <span>{item.customDimensionsText}</span>
                          </>
                        )}
                      </div>
                      {item.engravingText && (
                        <div className="text-[11px] text-[#D49B54] mt-1 truncate">
                          حکاکی: «{item.engravingText}»
                        </div>
                      )}
                      {item.giftPackaging && (
                        <div className="inline-flex items-center gap-1 text-[10px] text-[#4E9F6E] mt-1">
                          <Gift className="w-3 h-3" />
                          <span>همراه با جعبه کادویی موم‌مهر شده</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                            className="w-6 h-6 rounded-md bg-white/10 text-xs font-bold text-[#F7F2EB] cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-xs font-bold">{toPersianDigits(item.quantity)}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                            className="w-6 h-6 rounded-md bg-white/10 text-xs font-bold text-[#F7F2EB] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-xs sm:text-sm font-black text-[#F7F2EB]">
                          {formatTomans(item.unitPrice * item.quantity)}{' '}
                          <span className="text-[10px] text-[#D49B54]">تومان</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-4 pt-2">
              <div className="text-xs sm:text-sm font-extrabold text-[#F7F2EB] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D49B54]" />
                <span>مشخصات تحویل‌گیرنده و هماهنگی نقش چوب</span>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-[#D9534F]/20 border border-[#D9534F] text-xs text-[#F7F2EB]">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1">نام و نام خانوادگی *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثلاً: علیرضا راد"
                      className="w-full glass-input rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-[#F7F2EB]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1">شماره موبایل (واتساپ / تماس) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="۰۹۱۲ ـــ ـــ ــ ــ"
                      className="w-full glass-input rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-[#F7F2EB]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1">شهر</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مثلاً: تهران"
                    className="w-full glass-input rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#F7F2EB]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#C8B9A6] mb-1">نشانی ارسال (اختیاری در مرحله اول)</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="مثلاً: سعادت‌آباد، خیابان…، پلاک…"
                      className="w-full glass-input rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-[#F7F2EB]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#C8B9A6] mb-1.5">
                  عکس رگه‌های چوب قبل از برش کجا برایتان ارسال شود؟
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'whatsapp', label: 'واتساپ' },
                    { id: 'telegram', label: 'تلگرام' },
                    { id: 'call', label: 'تماس تلفنی' },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setContactChannel(ch.id as 'whatsapp' | 'telegram' | 'call')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        contactChannel === ch.id
                          ? 'bg-[#D49B54] text-[#120E0A] border-[#D49B54]'
                          : 'bg-[#120E0A]/50 text-[#C8B9A6] border-white/10'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#C8B9A6] mb-1">
                  توضیحات تکمیلی برای استادکار
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                  <textarea
                    rows={2}
                    value={carpenterNote}
                    onChange={(e) => setCarpenterNote(e.target.value)}
                    placeholder="اگر رنگ چوب تیره‌تر دوست دارید یا نکته خاصی مدنظرتان است بنویسید…"
                    className="w-full glass-input rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-[#F7F2EB]"
                  />
                </div>
              </div>

              {/* Discount coupon */}
              <div>
                <label className="block text-xs text-[#C8B9A6] mb-1.5">کد تخفیف (اگر دارید)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="ORSI10"
                    className="flex-1 glass-input rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F7F2EB] text-left font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="glass-pill px-4 py-2.5 rounded-xl text-xs font-bold text-[#F7F2EB] hover:border-[#D49B54]/60 cursor-pointer"
                  >
                    اعمال کد
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-[11px] mt-1.5 ${appliedCoupon ? 'text-[#7FCB9B]' : 'text-[#E87F7F]'}`}>
                    {couponMsg}
                  </p>
                )}
              </div>

              <div className="glass-panel rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-3 text-[#C8B9A6]">
                  <span className="min-w-0">جمع دست‌سازه‌ها و حکاکی لیزری:</span>
                  <span className="font-bold text-[#F7F2EB] whitespace-nowrap">{formatTomans(subtotal)} تومان</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between gap-3 text-[#7FCB9B]">
                    <span>تخفیف کد «{appliedCoupon?.code}»:</span>
                    <span className="font-bold whitespace-nowrap">− {formatTomans(discountAmount)} تومان</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3 text-[#C8B9A6]">
                  <span className="min-w-0">
                    بسته‌بندی ضدضربه و ارسال (بالای {formatTomans(settings.freeShippingThreshold)}{' '}
                    تومان رایگان):
                  </span>
                  <span className="font-bold text-[#4E9F6E] whitespace-nowrap">
                    {shippingCost === 0 ? 'رایگان' : `${formatTomans(shippingCost)} تومان`}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3 text-sm sm:text-base font-black text-[#F7F2EB]">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-[#E5B26D] whitespace-nowrap">{formatTomans(grandTotal)} تومان</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-honey-gold py-4 rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>ثبت نهایی سفارش و دریافت کد پیگیری</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#C8B9A6]">
                <ShieldCheck className="w-4 h-4 text-[#4E9F6E]" />
                <span>پرداخت بیعانه پس از تایید عکس اسلب چوب توسط شما انجام می‌شود؛ همین حالا پولی پرداخت نمی‌کنید.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
