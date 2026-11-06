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
} from 'lucide-react';
import {
  OrderCartItem,
  formatTomans,
  toPersianDigits,
} from '../data/products';

interface OrderCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderCartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onClearCart: () => void;
}

export const OrderCheckoutDrawer: React.FC<OrderCheckoutDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [cityAndAddress, setCityAndAddress] = useState('');
  const [carpenterNote, setCarpenterNote] = useState('');
  const [contactChannel, setContactChannel] = useState<'whatsapp' | 'telegram' | 'call'>('whatsapp');
  const [formError, setFormError] = useState('');
  const [submittedOrderCode, setSubmittedOrderCode] = useState<string | null>(null);
  const [submittedSummaryText, setSubmittedSummaryText] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const shippingCost = subtotal > 3000000 || subtotal === 0 ? 0 : 120000;
  const grandTotal = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setFormError('لطفاً نام و شماره همراه خود را برای هماهنگی ارسال عکس چوب وارد فرمایید.');
      return;
    }
    setFormError('');

    const randomCode = `ORSI-${Math.floor(10000 + Math.random() * 90000)}`;
    const itemsSummary = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.title} (${it.wood.name} - ${it.finish.name}) × ${it.quantity} عدد${
            it.engravingText ? ` | حکاکی: «${it.engravingText}»` : ''
          }`
      )
      .join('\n');

    const summary = `سلام وقت بخیر، سفارش جدید از وب‌سایت آتلیه چوب اُرسی:\nکد سفارش: ${randomCode}\nنام مشتری: ${fullName}\nشماره تماس: ${phone}\nآدرس: ${
      cityAndAddress || 'هماهنگی تلفنی'
    }\n---\nاقلام سفارش:\n${itemsSummary || 'مشاوره سفارش طرح اختصاصی'}\nمبلغ کل: ${formatTomans(
      grandTotal
    )} تومان\nتوضیحات استادکار: ${carpenterNote || 'ندارد'}`;

    setSubmittedSummaryText(summary);
    setSubmittedOrderCode(randomCode);
    onClearCart();
  };

  const handleResetAndClose = () => {
    setSubmittedOrderCode(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md"
      onClick={handleResetAndClose}
    >
      <div
        className="glass-panel-elevated w-full max-w-xl h-full overflow-y-auto p-5 sm:p-7 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#FFF0DC]/15">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#D49B54]/20 border border-[#D49B54]/40 flex items-center justify-center text-[#D49B54]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#F7F2EB]">
                  سبد سفارش اختصاصی کارگاه
                </h3>
                <p className="text-xs text-[#C8B9A6]">
                  تایید مشخصات چوب، حکاکی لیزری و ثبت سفارش مستقیم
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-[#C8B9A6] hover:text-[#F7F2EB] cursor-pointer"
              aria-label="بستن سبد سفارش"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success State After Order Submission */}
          {submittedOrderCode ? (
            <div className="py-8 space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#4E9F6E]/20 border-2 border-[#4E9F6E] flex items-center justify-center mx-auto text-[#4E9F6E]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-[#D49B54]/20 text-[#E5B26D] text-xs font-extrabold">
                  سفارش شما در نوبت کارگاه ثبت شد
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
                  ارسال خواهد کرد تا نقش چوب اثر خود را تایید کنید.
                </p>
              </div>

              <div className="glass-panel rounded-2xl p-4 text-right space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#C8B9A6]">کد پیگیری کارگاه:</span>
                  <span className="font-mono font-black text-sm text-[#D49B54]">
                    {submittedOrderCode}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#C8B9A6]">وضعیت فعلی:</span>
                  <span className="text-[#4E9F6E] font-bold">
                    در انتظار انتخاب رگه اسلب چوب توسط مشتری
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/989120000000?text=${encodeURIComponent(
                    submittedSummaryText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-honey-gold py-3.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>ارسال مستقیم جزئیات سفارش در واتساپ کارگاه</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full glass-pill py-3 rounded-2xl text-xs font-bold text-[#F7F2EB] cursor-pointer"
                >
                  بازگشت به گالری آثار چوبی
                </button>
              </div>
            </div>
          ) : (
            /* Active Cart Items + Commission Form */
            <div className="py-5 space-y-6">
              {/* Items List */}
              {items.length === 0 ? (
                <div className="glass-panel rounded-2xl p-5 text-center space-y-2">
                  <Sparkles className="w-7 h-7 text-[#D49B54] mx-auto" />
                  <div className="text-sm font-bold text-[#F7F2EB]">
                    هنوز قطعه‌ای از کاتالوگ انتخاب نکرده‌اید
                  </div>
                  <p className="text-xs text-[#C8B9A6]">
                    می‌توانید از گالری یک نمونه‌کار اضافه کنید و یا در فرم زیر، طرح دلخواه خودتان
                    را مستقیم برای ساخت سفارشی ثبت نمایید.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="glass-panel rounded-2xl p-3.5 flex items-start gap-3.5"
                    >
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
                            <span className="text-xs font-bold tabular-nums-fa">
                              {toPersianDigits(item.quantity)}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                              className="w-6 h-6 rounded-md bg-white/10 text-xs font-bold text-[#F7F2EB] cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-xs sm:text-sm font-black text-[#F7F2EB] tabular-nums-fa">
                            {formatTomans(item.unitPrice * item.quantity)}{' '}
                            <span className="text-[10px] text-[#D49B54]">تومان</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Details & Direct Order Form */}
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
                    <label className="block text-xs text-[#C8B9A6] mb-1">
                      نام و نام خانوادگی *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="مثلاً: علیرضا راد"
                        className="w-full glass-input rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-[#F7F2EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#C8B9A6] mb-1">
                      شماره موبایل (واتساپ / تماس) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="۰۹۱۲..."
                        className="w-full glass-input rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-[#F7F2EB] tabular-nums-fa"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1">
                    شهر و نشانی ارسال (اختیاری در مرحله اول)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                    <input
                      type="text"
                      value={cityAndAddress}
                      onChange={(e) => setCityAndAddress(e.target.value)}
                      placeholder="مثلاً: تهران، سعادت‌آباد، خیابان..."
                      className="w-full glass-input rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-[#F7F2EB]"
                    />
                  </div>
                </div>

                {/* Preferred Messenger for Wood Slab Photo Approval */}
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
                        onClick={() =>
                          setContactChannel(ch.id as 'whatsapp' | 'telegram' | 'call')
                        }
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
                    توضیحات تکمیلی برای استادکار (یا شرح ایده طرح سفارشی شما)
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                    <textarea
                      rows={2}
                      value={carpenterNote}
                      onChange={(e) => setCarpenterNote(e.target.value)}
                      placeholder="اگر رنگ چوب تیره‌تر دوست دارید یا ابعاد خاصی مدنظرتان است بنویسید..."
                      className="w-full glass-input rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-[#F7F2EB]"
                    />
                  </div>
                </div>

                {/* Total Breakdown */}
                <div className="glass-panel rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#C8B9A6]">
                    <span>جمع دست‌سازه‌ها و حکاکی لیزری:</span>
                    <span className="font-bold text-[#F7F2EB] tabular-nums-fa">
                      {formatTomans(subtotal)} تومان
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#C8B9A6]">
                    <span>بسته‌بندی ضدضربه و ارسال (بالای ۳ میلیون رایگان):</span>
                    <span className="font-bold text-[#4E9F6E] tabular-nums-fa">
                      {shippingCost === 0
                        ? 'رایگان'
                        : `${formatTomans(shippingCost)} تومان`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm sm:text-base font-black text-[#F7F2EB]">
                    <span>مبلغ قابل پرداخت:</span>
                    <span className="text-[#E5B26D] tabular-nums-fa">
                      {formatTomans(grandTotal)} تومان
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-honey-gold py-4 rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>ثبت نهایی سفارش و دریافت کد پیگیری کارگاه</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#C8B9A6]">
                  <ShieldCheck className="w-4 h-4 text-[#4E9F6E]" />
                  <span>پرداخت بیعانه پس از تایید عکس اسلب چوب توسط شما انجام می‌شود</span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
