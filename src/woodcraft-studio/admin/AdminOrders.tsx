import React, { useMemo, useState } from 'react';
import {
  Search,
  Trash2,
  Phone,
  Send,
  ShoppingBag,
  Wand2,
  Eye,
  Download,
  Save,
  Printer,
  BadgePercent,
} from 'lucide-react';
import { formatTomans, toIntlPhone, toPersianDigits } from '../data/products';
import {
  ORDER_STATUSES,
  orderStatusMeta,
  type Order,
  type OrderStatus,
} from '../store/types';
import { AdminModal, Field, NumberInput, downloadFile, formatDateTime, inputCls } from './ui';

interface AdminOrdersProps {
  orders: Order[];
  brandName?: string;
  defaultTypeFilter?: 'all' | 'cart' | 'custom';
  onUpdateOrder: (orderId: string, patch: Partial<Order>) => void;
  onDeleteOrder: (orderId: string) => void;
}

function printInvoice(order: Order, brandName: string) {
  const meta = orderStatusMeta(order.status);
  const itemsRows =
    order.type === 'custom' && order.customProject
      ? `<tr><td>۱</td><td>${order.customProject.title}<br><small>${order.customProject.description}</small></td><td>۱</td><td>${order.total ? order.total.toLocaleString('en-US') : 'توافقی'}</td></tr>`
      : order.items
          .map(
            (it, i) =>
              `<tr><td>${i + 1}</td><td>${it.title}<br><small>${it.wood.name} • ${it.finish.name} • ${it.size.name}${it.engravingText ? ` • حکاکی: «${it.engravingText}»` : ''}</small></td><td>${it.quantity}</td><td>${(it.unitPrice * it.quantity).toLocaleString('en-US')}</td></tr>`
          )
          .join('');
  const html = `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><title>فاکتور ${order.code}</title>
<style>body{font-family:Tahoma,sans-serif;color:#222;padding:32px;max-width:760px;margin:auto}h1{font-size:19px;margin:0}table{width:100%;border-collapse:collapse;margin-top:16px}th,td{border:1px solid #bbb;padding:8px;font-size:12px;text-align:right}th{background:#f3e7d7}.row{display:flex;justify-content:space-between;font-size:12px;padding:4px 0}.total{font-weight:bold;font-size:14px;border-top:2px solid #333;margin-top:8px;padding-top:8px}small{color:#666}</style></head>
<body><h1>${brandName}</h1><p style="font-size:12px;color:#555">فاکتور سفارش ${order.code} — وضعیت: ${meta.label}</p>
<div class="row"><span>مشتری: ${order.customer.fullName}</span><span>موبایل: ${order.customer.phone}</span></div>
<div class="row"><span>شهر: ${order.customer.city || '—'}</span><span>نشانی: ${order.customer.address || '—'}</span></div>
<table><thead><tr><th>ردیف</th><th>شرح</th><th>تعداد</th><th>مبلغ (تومان)</th></tr></thead><tbody>${itemsRows}</tbody></table>
<div class="row"><span>جمع اقلام</span><span>${order.subtotal.toLocaleString('en-US')} تومان</span></div>
${(order.discountAmount ?? 0) > 0 ? `<div class="row"><span>تخفیف ${order.couponCode ? `(کد ${order.couponCode})` : ''}</span><span>− ${(order.discountAmount ?? 0).toLocaleString('en-US')} تومان</span></div>` : ''}
<div class="row"><span>هزینه ارسال</span><span>${order.shippingCost === 0 ? 'رایگان' : `${order.shippingCost.toLocaleString('en-US')} تومان`}</span></div>
<div class="row total"><span>مبلغ قابل پرداخت</span><span>${order.total.toLocaleString('en-US')} تومان</span></div>
<p style="font-size:11px;color:#666;margin-top:20px">این فاکتور توسط سامانه فروش ${brandName} صادر شده است.</p>
<script>window.onload=()=>window.print()</script></body></html>`;
  const win = window.open('', '_blank', 'width=820,height=900');
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({
  orders,
  brandName = 'کارگاه اُرسی',
  defaultTypeFilter = 'all',
  onUpdateOrder,
  onDeleteOrder,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'cart' | 'custom'>(defaultTypeFilter);
  const [selected, setSelected] = useState<Order | null>(null);
  const [adminNoteDraft, setAdminNoteDraft] = useState('');
  const [quotedPrice, setQuotedPrice] = useState(0);

  const filtered = useMemo(() => {
    const q = search.trim();
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (typeFilter !== 'all' && o.type !== typeFilter) return false;
      if (!q) return true;
      return (
        o.code.includes(q) ||
        o.customer.fullName.includes(q) ||
        o.customer.phone.includes(q) ||
        (o.customProject?.title.includes(q) ?? false)
      );
    });
  }, [orders, search, statusFilter, typeFilter]);

  const openDetail = (order: Order) => {
    setSelected(order);
    setAdminNoteDraft(order.adminNote);
    setQuotedPrice(order.total > 0 ? order.total : 0);
  };

  const changeStatus = (order: Order, status: OrderStatus) => {
    const updated: Order = {
      ...order,
      status,
      updatedAt: Date.now(),
      statusHistory: [...order.statusHistory, { status, at: Date.now() }],
    };
    onUpdateOrder(order.id, updated);
    setSelected(updated);
  };

  const exportCsv = () => {
    const header = 'کد سفارش,نوع,نام مشتری,موبایل,شهر,مبلغ کل (تومان),وضعیت,تاریخ ثبت\n';
    const rows = filtered
      .map((o) =>
        [
          o.code,
          o.type === 'custom' ? 'طرح سفارشی' : 'ویترین',
          o.customer.fullName,
          o.customer.phone,
          o.customer.city,
          o.total,
          orderStatusMeta(o.status).label,
          new Date(o.createdAt).toISOString(),
        ]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');
    downloadFile('orsi-orders.csv', `﻿${header}${rows}`, 'text/csv');
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="glass-panel rounded-2xl p-3.5 flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو با کد سفارش، نام مشتری یا شماره موبایل…"
            className={`${inputCls} pr-10`}
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
          className={`${inputCls} lg:w-44 cursor-pointer`}
        >
          <option value="all">همه انواع سفارش</option>
          <option value="cart">سفارش از ویترین</option>
          <option value="custom">درخواست طرح سفارشی</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className={`${inputCls} lg:w-48 cursor-pointer`}
        >
          <option value="all">همه وضعیت‌ها</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={exportCsv}
          className="glass-pill px-4 py-2.5 rounded-xl text-xs font-bold text-[#F7F2EB] flex items-center justify-center gap-2 cursor-pointer hover:border-[#D49B54]/50"
        >
          <Download className="w-4 h-4 text-[#D49B54]" />
          خروجی Excel (CSV)
        </button>
      </div>

      <div className="text-xs text-[#C8B9A6]">
        {toPersianDigits(filtered.length)} سفارش نمایش داده می‌شود
      </div>

      {/* Orders Table */}
      <div className="glass-panel rounded-2xl overflow-hidden max-w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[820px]">
            <thead>
              <tr className="bg-[#FFF4E5]/5 text-[#C8B9A6] text-right">
                <th className="px-4 py-3 font-bold">کد سفارش</th>
                <th className="px-4 py-3 font-bold">مشتری</th>
                <th className="px-4 py-3 font-bold">نوع</th>
                <th className="px-4 py-3 font-bold">اقلام / ایده</th>
                <th className="px-4 py-3 font-bold">مبلغ</th>
                <th className="px-4 py-3 font-bold">وضعیت</th>
                <th className="px-4 py-3 font-bold">تاریخ</th>
                <th className="px-4 py-3 font-bold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const meta = orderStatusMeta(order.status);
                return (
                  <tr
                    key={order.id}
                    className="border-t border-white/8 hover:bg-[#FFF4E5]/4 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-[#E5B26D]" dir="ltr">
                      {order.code}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-[#F7F2EB]">{order.customer.fullName}</div>
                      <div className="text-[11px] text-[#8A7968]">{order.customer.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-[11px] font-bold text-[#F7F2EB]">
                        {order.type === 'custom' ? (
                          <>
                            <Wand2 className="w-3 h-3 text-[#D49B54]" /> طرح سفارشی
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3 h-3 text-[#D49B54]" /> ویترین
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#C8B9A6] max-w-[220px]">
                      <span className="line-clamp-1">
                        {order.type === 'custom'
                          ? order.customProject?.title
                          : `${toPersianDigits(
                              order.items.reduce((s, i) => s + i.quantity, 0)
                            )} قلم — ${order.items[0]?.title ?? ''}`}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-black text-[#F7F2EB] whitespace-nowrap">
                      {order.total > 0 ? `${formatTomans(order.total)} ت` : 'پس از بررسی'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap"
                        style={{ color: meta.color, background: meta.bg }}
                      >
                        {meta.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#C8B9A6] whitespace-nowrap text-[11px]">
                      {formatDateTime(order.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openDetail(order)}
                          className="w-8 h-8 rounded-lg bg-[#D49B54]/15 border border-[#D49B54]/40 flex items-center justify-center text-[#E5B26D] cursor-pointer"
                          title="مشاهده و مدیریت سفارش"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={`tel:${order.customer.phone}`}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C8B9A6] cursor-pointer"
                          title="تماس با مشتری"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`سفارش ${order.code} حذف شود؟ این کار قابل بازگشت نیست.`)) {
                              onDeleteOrder(order.id);
                              if (selected?.id === order.id) setSelected(null);
                            }
                          }}
                          className="w-8 h-8 rounded-lg bg-[#D9534F]/10 border border-[#D9534F]/30 flex items-center justify-center text-[#E87F7F] cursor-pointer"
                          title="حذف سفارش"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-[#8A7968]">
                    سفارشی با این فیلترها پیدا نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selected && (
        <AdminModal
          title={`سفارش ${selected.code}`}
          subtitle={`ثبت‌شده در ${formatDateTime(selected.createdAt)} • آخرین بروزرسانی ${formatDateTime(selected.updatedAt)}`}
          onClose={() => setSelected(null)}
          wide
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Customer + Items */}
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-4 space-y-2 text-xs">
                <h4 className="text-sm font-extrabold text-[#F7F2EB]">مشخصات مشتری</h4>
                <div className="flex justify-between gap-3"><span className="text-[#8A7968] shrink-0">نام:</span><span className="font-bold text-[#F7F2EB]">{selected.customer.fullName}</span></div>
                <div className="flex justify-between gap-3"><span className="text-[#8A7968] shrink-0">موبایل:</span><span className="font-bold text-[#F7F2EB]" dir="ltr">{selected.customer.phone}</span></div>
                <div className="flex justify-between gap-3"><span className="text-[#8A7968] shrink-0">شهر:</span><span className="font-bold text-[#F7F2EB]">{selected.customer.city || '—'}</span></div>
                <div className="flex justify-between gap-4"><span className="text-[#8A7968] shrink-0">نشانی:</span><span className="font-bold text-[#F7F2EB] text-left">{selected.customer.address || '—'}</span></div>
                <div className="flex justify-between gap-3"><span className="text-[#8A7968] shrink-0">کانال ارسال عکس چوب:</span><span className="font-bold text-[#F7F2EB]">{selected.customer.contactChannel === 'whatsapp' ? 'واتساپ' : selected.customer.contactChannel === 'telegram' ? 'تلگرام' : 'تماس تلفنی'}</span></div>
                {selected.customer.note && (
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[#8A7968] block mb-1">توضیحات مشتری:</span>
                    <p className="text-[#F7F2EB] leading-relaxed">{selected.customer.note}</p>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <a
                    href={`https://wa.me/${toIntlPhone(selected.customer.phone)}?text=${encodeURIComponent(`سلام ${selected.customer.fullName} عزیز، درباره سفارش ${selected.code} شما از کارگاه اُرسی پیام می‌دهم.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-[#4E9F6E]/20 border border-[#4E9F6E]/50 text-[#7FCB9B] text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> پیام در واتساپ
                  </a>
                  <a
                    href={`tel:${selected.customer.phone}`}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F7F2EB] text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" /> تماس تلفنی
                  </a>
                </div>
              </div>

              {selected.type === 'custom' && selected.customProject ? (
                <div className="glass-panel rounded-2xl p-4 space-y-2 text-xs">
                  <h4 className="text-sm font-extrabold text-[#F7F2EB]">شرح ایده سفارشی مشتری</h4>
                  <div className="font-bold text-[#E5B26D] text-sm">{selected.customProject.title}</div>
                  <p className="text-[#C8B9A6] leading-relaxed">{selected.customProject.description}</p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-[#120E0A]/50 rounded-lg p-2.5"><span className="text-[#8A7968] block">چوب ترجیحی</span><strong className="text-[#F7F2EB]">{selected.customProject.woodPreference}</strong></div>
                    <div className="bg-[#120E0A]/50 rounded-lg p-2.5"><span className="text-[#8A7968] block">ابعاد</span><strong className="text-[#F7F2EB]">{selected.customProject.dimensions || '—'}</strong></div>
                    <div className="bg-[#120E0A]/50 rounded-lg p-2.5"><span className="text-[#8A7968] block">بودجه مشتری</span><strong className="text-[#F7F2EB]">{selected.customProject.budget}</strong></div>
                    <div className="bg-[#120E0A]/50 rounded-lg p-2.5"><span className="text-[#8A7968] block">مهلت تحویل</span><strong className="text-[#F7F2EB]">{selected.customProject.deadline || '—'}</strong></div>
                  </div>
                  {selected.customProject.referenceLink && (
                    <a href={selected.customProject.referenceLink} target="_blank" rel="noopener noreferrer" className="text-[#7FB3E8] underline break-all" dir="ltr">
                      {selected.customProject.referenceLink}
                    </a>
                  )}
                  <p className="text-[11px] text-[#8A7968]">مبلغ نهایی را اینجا ثبت کنید تا مشتری در بخش «پیگیری سفارش» آن را ببیند؛ وضعیت را هم از ستون روبه‌رو جلو ببرید.</p>
                  <div className="pt-2 border-t border-white/10">
                    <Field label="مبلغ نهایی اعلامی به مشتری (تومان)">
                      <div className="flex gap-2">
                        <NumberInput
                          value={quotedPrice}
                          onChange={setQuotedPrice}
                          min={0}
                          groupThousands
                          placeholder="مثلاً: ۱۸,۵۰۰,۰۰۰"
                          className={inputCls}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const price = Math.max(0, Math.round(quotedPrice) || 0);
                            if (price <= 0) {
                              window.alert('مبلغ نهایی معتبر را وارد کنید.');
                              return;
                            }
                            const updated = {
                              ...selected,
                              subtotal: price,
                              total: price,
                              updatedAt: Date.now(),
                            };
                            onUpdateOrder(selected.id, updated);
                            setSelected(updated);
                          }}
                          className="btn-honey-gold px-4 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer"
                        >
                          ثبت مبلغ
                        </button>
                      </div>
                    </Field>
                    {selected.total > 0 && (
                      <div className="text-[11px] text-[#7FCB9B] mt-1.5">
                        مبلغ فعلی اعلام‌شده: {formatTomans(selected.total)} تومان — مشتری در پیگیری سفارش همین مبلغ را می‌بیند.
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => printInvoice(selected, brandName)}
                    className="w-full py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F7F2EB] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:border-[#D49B54]/50"
                  >
                    <Printer className="w-4 h-4 text-[#D49B54]" /> چاپ پیش‌فاکتور
                  </button>
                </div>
              ) : (
                <div className="glass-panel rounded-2xl p-4 space-y-2.5">
                  <h4 className="text-sm font-extrabold text-[#F7F2EB]">اقلام سفارش</h4>
                  {selected.items.map((item) => (
                    <div key={item.cartItemId} className="flex gap-3 bg-[#120E0A]/50 rounded-xl p-2.5">
                      <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover border border-white/10" />
                      <div className="flex-1 min-w-0 text-[11px] space-y-0.5">
                        <div className="text-xs font-bold text-[#F7F2EB]">{item.title}</div>
                        <div className="text-[#C8B9A6]">{item.wood.name} • {item.finish.name}</div>
                        <div className="text-[#C8B9A6]">{item.size.name}{item.customDimensionsText ? ` (${item.customDimensionsText})` : ''}</div>
                        {item.engravingText && <div className="text-[#D49B54]">حکاکی: «{item.engravingText}»</div>}
                        {item.giftPackaging && <div className="text-[#4E9F6E]">+ بسته‌بندی کادویی</div>}
                      </div>
                      <div className="text-left text-[11px] shrink-0">
                        <div className="text-[#8A7968]">× {toPersianDigits(item.quantity)}</div>
                        <div className="font-black text-[#F7F2EB] whitespace-nowrap">{formatTomans(item.unitPrice * item.quantity)} ت</div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-white/10 space-y-1 text-xs">
                    <div className="flex justify-between text-[#C8B9A6]"><span>جمع اقلام:</span><span>{formatTomans(selected.subtotal)} تومان</span></div>
                    {(selected.discountAmount ?? 0) > 0 && (
                      <div className="flex justify-between text-[#7FCB9B]"><span className="flex items-center gap-1"><BadgePercent className="w-3.5 h-3.5" />تخفیف{selected.couponCode ? ` (کد ${selected.couponCode})` : ''}:</span><span>− {formatTomans(selected.discountAmount ?? 0)} تومان</span></div>
                    )}
                    <div className="flex justify-between text-[#C8B9A6]"><span>هزینه ارسال:</span><span>{selected.shippingCost === 0 ? 'رایگان' : `${formatTomans(selected.shippingCost)} تومان`}</span></div>
                    <div className="flex justify-between font-black text-sm text-[#E5B26D]"><span>مبلغ کل:</span><span>{formatTomans(selected.total)} تومان</span></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => printInvoice(selected, brandName)}
                    className="w-full py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F7F2EB] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:border-[#D49B54]/50"
                  >
                    <Printer className="w-4 h-4 text-[#D49B54]" /> چاپ فاکتور این سفارش
                  </button>
                </div>
              )}
            </div>

            {/* Status + Admin Note */}
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-4">
                <h4 className="text-sm font-extrabold text-[#F7F2EB] mb-3">تغییر وضعیت سفارش</h4>
                <div className="grid grid-cols-2 gap-2">
                  {ORDER_STATUSES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => changeStatus(selected, s.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selected.status === s.id
                          ? 'border-transparent text-[#120E0A]'
                          : 'border-white/12 text-[#C8B9A6] hover:text-[#F7F2EB]'
                      }`}
                      style={
                        selected.status === s.id
                          ? { background: s.color }
                          : { background: 'rgba(18,14,10,.5)' }
                      }
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <span className="text-[11px] font-bold text-[#8A7968]">سابقه وضعیت‌ها:</span>
                  {[...selected.statusHistory].reverse().map((h, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px]">
                      <span style={{ color: orderStatusMeta(h.status).color }} className="font-bold">
                        {orderStatusMeta(h.status).label}
                      </span>
                      <span className="text-[#8A7968]">{formatDateTime(h.at)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-4">
                <Field label="یادداشت داخلی مدیریت (مشتری این را نمی‌بیند)">
                  <textarea
                    rows={4}
                    value={adminNoteDraft}
                    onChange={(e) => setAdminNoteDraft(e.target.value)}
                    placeholder="مثلاً: اسلب گردو تایید شد، بیعانه دریافت شد، نوبت حکاکی پنج‌شنبه…"
                    className={inputCls}
                  />
                </Field>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateOrder(selected.id, {
                      ...selected,
                      adminNote: adminNoteDraft,
                      updatedAt: Date.now(),
                    });
                    setSelected({ ...selected, adminNote: adminNoteDraft });
                  }}
                  className="mt-3 w-full btn-honey-gold py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  ذخیره یادداشت
                </button>
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
};
