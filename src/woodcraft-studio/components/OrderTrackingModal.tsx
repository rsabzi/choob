import React, { useState } from 'react';
import {
  X,
  PackageSearch,
  CheckCircle2,
  Circle,
  Phone,
  ShoppingBag,
  Wand2,
  SearchX,
} from 'lucide-react';
import { formatTomans, toPersianDigits } from '../data/products';
import {
  ORDER_STATUSES,
  orderStatusMeta,
  type Order,
} from '../store/types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFindOrder: (code: string, phone: string) => Order | undefined;
}

function formatDate(ts: number): string {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(ts));
  } catch {
    return toPersianDigits(new Date(ts).toLocaleDateString('en-GB'));
  }
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  onFindOrder,
}) => {
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<Order | null | undefined>(undefined);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(onFindOrder(code, phone) ?? null);
  };

  const flowStatuses = ORDER_STATUSES.filter((s) => s.id !== 'cancelled');
  const currentIndex = result
    ? flowStatuses.findIndex((s) => s.id === result.status)
    : -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="glass-panel-elevated rounded-[26px] w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-7 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#FFF0DC]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#D49B54]/20 border border-[#D49B54]/40 flex items-center justify-center text-[#D49B54]">
              <PackageSearch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#F7F2EB]">پیگیری سفارش</h3>
              <p className="text-[11px] text-[#C8B9A6]">
                وضعیت ساخت و ارسال سفارشتان را لحظه‌ای ببینید
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-[#C8B9A6] hover:text-[#F7F2EB] cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="py-5 space-y-3">
          <div>
            <label className="block text-xs text-[#C8B9A6] mb-1.5">کد پیگیری سفارش</label>
            <input
              type="text"
              dir="ltr"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="ORSI-12345"
              className="w-full glass-input rounded-xl px-4 py-3 text-sm text-[#F7F2EB] text-left font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-[#C8B9A6] mb-1.5">
              شماره موبایلی که با آن سفارش دادید
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۹۱۲ ـــ ـــ ــ ــ"
                className="w-full glass-input rounded-xl pr-10 pl-3 py-3 text-sm text-[#F7F2EB]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full btn-honey-gold py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer"
          >
            <PackageSearch className="w-4 h-4" />
            مشاهده وضعیت سفارش
          </button>
        </form>

        {result === null && (
          <div className="glass-panel rounded-2xl p-5 text-center space-y-2">
            <SearchX className="w-8 h-8 text-[#E87F7F] mx-auto" />
            <p className="text-sm font-bold text-[#F7F2EB]">سفارشی با این مشخصات پیدا نشد</p>
            <p className="text-xs text-[#C8B9A6]">
              کد پیگیری و شماره موبایل را دقیقاً مثل زمان ثبت سفارش وارد کنید؛ اگر باز هم پیدا
              نشد با کارگاه تماس بگیرید.
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-5">
            <div className="glass-panel rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C8B9A6]">کد پیگیری:</span>
                <span className="font-mono font-black text-sm text-[#D49B54]">{result.code}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C8B9A6]">نوع سفارش:</span>
                <span className="font-bold text-[#F7F2EB] flex items-center gap-1.5">
                  {result.type === 'custom' ? (
                    <>
                      <Wand2 className="w-3.5 h-3.5 text-[#D49B54]" /> سفارش طرح سفارشی
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D49B54]" /> سفارش از ویترین
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C8B9A6]">تاریخ ثبت:</span>
                <span className="font-bold text-[#F7F2EB]">{formatDate(result.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C8B9A6]">وضعیت فعلی:</span>
                <span
                  className="px-2.5 py-1 rounded-full font-bold"
                  style={{
                    color: orderStatusMeta(result.status).color,
                    background: orderStatusMeta(result.status).bg,
                  }}
                >
                  {orderStatusMeta(result.status).customerLabel}
                </span>
              </div>
              {result.total > 0 && (
                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                  <span className="text-[#C8B9A6]">مبلغ سفارش:</span>
                  <span className="font-black text-[#E5B26D]">
                    {formatTomans(result.total)} تومان
                  </span>
                </div>
              )}
            </div>

            {result.type === 'cart' && result.items.length > 0 && (
              <div className="space-y-2">
                {result.items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center gap-3 glass-panel rounded-xl p-2.5"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#F7F2EB] truncate">{item.title}</div>
                      <div className="text-[11px] text-[#C8B9A6]">
                        {item.wood.name} • {toPersianDigits(item.quantity)} عدد
                        {item.engravingText ? ` • حکاکی: «${item.engravingText}»` : ''}
                      </div>
                    </div>
                    <div className="text-xs font-black text-[#F7F2EB]">
                      {formatTomans(item.unitPrice * item.quantity)} ت
                    </div>
                  </div>
                ))}
              </div>
            )}

            {result.type === 'custom' && result.customProject && (
              <div className="glass-panel rounded-2xl p-4 text-xs space-y-1.5">
                <div className="font-extrabold text-[#F7F2EB] text-sm">
                  {result.customProject.title}
                </div>
                <p className="text-[#C8B9A6] leading-relaxed">{result.customProject.description}</p>
                <div className="text-[#C8B9A6]">
                  چوب ترجیحی: <span className="text-[#F7F2EB]">{result.customProject.woodPreference}</span>
                  {result.customProject.dimensions
                    ? ` • ابعاد: ${result.customProject.dimensions}`
                    : ''}
                  {` • بودجه: ${result.customProject.budget}`}
                </div>
              </div>
            )}

            {/* Status Timeline */}
            {result.status === 'cancelled' ? (
              <div className="p-4 rounded-2xl bg-[#E87F7F]/10 border border-[#E87F7F]/40 text-xs text-[#F7F2EB]">
                این سفارش لغو شده است. برای اطلاعات بیشتر با کارگاه در تماس باشید.
              </div>
            ) : (
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold text-[#F7F2EB] mb-3">مسیر سفارش شما</h4>
                {flowStatuses.map((status, idx) => {
                  const done = idx < currentIndex;
                  const current = idx === currentIndex;
                  const historyEntry = result.statusHistory
                    .filter((h) => h.status === status.id)
                    .pop();
                  return (
                    <div key={status.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        {done || current ? (
                          <CheckCircle2
                            className={`w-5 h-5 shrink-0 ${
                              current ? 'text-[#D49B54]' : 'text-[#4E9F6E]'
                            }`}
                          />
                        ) : (
                          <Circle className="w-5 h-5 shrink-0 text-[#8A7968]" />
                        )}
                        {idx < flowStatuses.length - 1 && (
                          <span
                            className={`w-px flex-1 min-h-[18px] ${
                              done ? 'bg-[#4E9F6E]' : 'bg-white/15'
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-4">
                        <div
                          className={`text-xs font-bold ${
                            current
                              ? 'text-[#E5B26D]'
                              : done
                              ? 'text-[#F7F2EB]'
                              : 'text-[#8A7968]'
                          }`}
                        >
                          {status.label}
                          {current && ' — در این مرحله هستید'}
                        </div>
                        {historyEntry && (
                          <div className="text-[11px] text-[#8A7968]">
                            {formatDate(historyEntry.at)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
