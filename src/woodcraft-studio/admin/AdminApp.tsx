import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Wand2,
  Package,
  TreePine,
  Layers,
  MessageSquareHeart,
  CircleHelp,
  Settings,
  Globe,
  Mail,
  BadgePercent,
  LogOut,
  Lock,
  TreePine as BrandIcon,
  TrendingUp,
  Clock3,
  Hammer,
  Wallet,
} from 'lucide-react';
import { formatTomans, toPersianDigits } from '../data/products';
import { useStudio } from '../store/StoreContext';
import { ORDER_STATUSES, orderStatusMeta } from '../store/types';
import { AdminOrders } from './AdminOrders';
import { AdminMessages } from './AdminMessages';
import { AdminManage, type ManageSection } from './AdminManage';
import { AdminSettings } from './AdminSettings';
import { formatDateTime } from './ui';

type AdminPage =
  | 'dashboard'
  | 'orders'
  | 'custom-orders'
  | 'messages'
  | ManageSection
  | 'settings';

const NAV: { id: AdminPage; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { id: 'orders', label: 'همه سفارش‌ها', icon: ShoppingBag },
  { id: 'custom-orders', label: 'درخواست‌های طرح سفارشی', icon: Wand2 },
  { id: 'messages', label: 'پیام‌های تماس', icon: Mail },
  { id: 'products', label: 'محصولات و قیمت‌ها', icon: Package },
  { id: 'coupons', label: 'کدهای تخفیف', icon: BadgePercent },
  { id: 'materials', label: 'چوب‌ها، پوشش و ابعاد', icon: TreePine },
  { id: 'services', label: 'خدمات کارگاه', icon: Layers },
  { id: 'testimonials', label: 'نظرات مشتریان', icon: MessageSquareHeart },
  { id: 'faqs', label: 'سوالات متداول', icon: CircleHelp },
  { id: 'settings', label: 'تنظیمات سایت', icon: Settings },
];

const PAGE_TITLES: Record<AdminPage, string> = {
  dashboard: 'داشبورد مدیریت کارگاه',
  orders: 'مدیریت سفارش‌ها',
  'custom-orders': 'درخواست‌های ساخت طرح سفارشی',
  messages: 'پیام‌های تماس مشتریان',
  coupons: 'کدهای تخفیف',
  products: 'محصولات، قیمت‌ها و ویترین',
  materials: 'متریال کارگاه: چوب، پوشش و ابعاد',
  services: 'خدمات کارگاه',
  testimonials: 'نظرات مشتریان',
  faqs: 'سوالات متداول',
  settings: 'تنظیمات کلی سایت',
};

const LoginScreen: React.FC = () => {
  const { login, db } = useStudio();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError('رمز عبور اشتباه است. دوباره تلاش کنید.');
    }
  };

  return (
    <div className="min-h-screen bg-[#120E0A] text-[#F7F2EB] wood-grain-pattern flex items-center justify-center p-4">
      <div className="glass-panel-elevated rounded-[28px] w-full max-w-md p-7 sm:p-9 animate-fadeIn">
        <div className="flex flex-col items-center text-center space-y-3 mb-7">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E5B26D] via-[#B86B35] to-[#4A2F1D] p-[1.5px]">
            <div className="w-full h-full rounded-full bg-[#16100B] flex items-center justify-center">
              <BrandIcon className="w-7 h-7 text-[#D49B54]" />
            </div>
          </div>
          <h1 className="text-xl font-black">پنل مدیریت {db.settings.brandName}</h1>
          <p className="text-xs text-[#C8B9A6] leading-relaxed">
            برای مدیریت محصولات، قیمت‌ها، متن‌های سایت و سفارش‌های مشتریان وارد شوید.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-[#D9534F]/20 border border-[#D9534F] text-xs">{error}</div>
          )}
          <div>
            <label className="block text-xs font-bold text-[#C8B9A6] mb-1.5">رمز عبور مدیریت</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
              <input
                type="password"
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full glass-input rounded-xl pr-10 pl-3 py-3 text-sm text-[#F7F2EB] text-left"
                autoFocus
              />
            </div>
          </div>
          <button type="submit" className="w-full btn-honey-gold py-3.5 rounded-2xl text-sm font-black cursor-pointer">
            ورود به پنل مدیریت
          </button>
          <a href="#/" className="block text-center text-xs text-[#C8B9A6] hover:text-[#E5B26D]">
            بازگشت به مشاهده سایت
          </a>
        </form>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ onGoOrders: () => void }> = ({ onGoOrders }) => {
  const { db } = useStudio();
  const orders = db.orders;

  const stats = useMemo(() => {
    const active = orders.filter((o) => o.status !== 'cancelled');
    return {
      total: orders.length,
      newCount: orders.filter((o) => o.status === 'new').length,
      customCount: orders.filter((o) => o.type === 'custom').length,
      inProgress: orders.filter((o) =>
        ['in-progress', 'quality-check', 'reviewing'].includes(o.status)
      ).length,
      revenue: active.reduce((sum, o) => sum + o.total, 0),
      deliveredRevenue: orders
        .filter((o) => o.status === 'delivered')
        .reduce((sum, o) => sum + o.total, 0),
      products: db.products.filter((p) => p.isActive !== false).length,
    };
  }, [orders, db.products]);

  const cards = [
    { label: 'سفارش‌های جدید منتظر بررسی', value: toPersianDigits(stats.newCount), icon: Clock3, color: '#E5B26D' },
    { label: 'کل سفارش‌های ثبت‌شده', value: toPersianDigits(stats.total), icon: ShoppingBag, color: '#7FB3E8' },
    { label: 'درخواست طرح سفارشی', value: toPersianDigits(stats.customCount), icon: Wand2, color: '#C99BE8' },
    { label: 'در حال ساخت / بررسی', value: toPersianDigits(stats.inProgress), icon: Hammer, color: '#7FE8D4' },
    { label: 'مجموع مبلغ سفارش‌های فعال', value: `${formatTomans(stats.revenue)} تومان`, icon: TrendingUp, color: '#9BE87F' },
    { label: 'درآمد تحویل‌شده‌ها', value: `${formatTomans(stats.deliveredRevenue)} تومان`, icon: Wallet, color: '#4E9F6E' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((card) => (
          <div key={card.label} className="glass-panel rounded-2xl p-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${card.color}22`, border: `1px solid ${card.color}55` }}
            >
              <card.icon className="w-5 h-5" style={{ color: card.color }} />
            </div>
            <div className="text-[15px] min-[420px]:text-lg sm:text-xl font-black text-[#F7F2EB] leading-snug break-words">{card.value}</div>
            <div className="text-[11px] text-[#8A7968] mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Status distribution */}
        <div className="glass-panel rounded-2xl p-5 lg:col-span-2">
          <h3 className="text-sm font-black text-[#F7F2EB] mb-4">توزیع وضعیت سفارش‌ها</h3>
          <div className="space-y-3">
            {ORDER_STATUSES.map((s) => {
              const count = orders.filter((o) => o.status === s.id).length;
              const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
              return (
                <div key={s.id}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-bold" style={{ color: s.color }}>{s.label}</span>
                    <span className="text-[#8A7968]">{toPersianDigits(count)} سفارش</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: s.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-white/10 text-[11px] text-[#8A7968]">
            {toPersianDigits(stats.products)} محصول فعال در ویترین سایت دارید.
          </div>
        </div>

        {/* Recent orders */}
        <div className="glass-panel rounded-2xl p-5 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-[#F7F2EB]">آخرین سفارش‌ها</h3>
            <button type="button" onClick={onGoOrders} className="text-[11px] font-bold text-[#E5B26D] cursor-pointer">
              مشاهده همه سفارش‌ها ←
            </button>
          </div>
          <div className="space-y-2.5">
            {orders.slice(0, 6).map((o) => {
              const meta = orderStatusMeta(o.status);
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={onGoOrders}
                  className="w-full flex flex-wrap sm:flex-nowrap items-center gap-x-3 gap-y-1.5 bg-[#120E0A]/50 hover:bg-[#120E0A]/80 border border-white/8 rounded-xl p-3 text-right transition-colors cursor-pointer"
                >
                  <span className="font-mono text-[11px] font-bold text-[#E5B26D]" dir="ltr">{o.code}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-[#F7F2EB] truncate">
                      {o.customer.fullName}
                      {o.type === 'custom' ? ` — ${o.customProject?.title ?? ''}` : ` — ${o.items[0]?.title ?? ''}`}
                    </span>
                    <span className="block text-[11px] text-[#8A7968]">{formatDateTime(o.createdAt)}</span>
                  </span>
                  <span className="text-[11px] font-black text-[#F7F2EB] whitespace-nowrap">
                    {o.total > 0 ? `${formatTomans(o.total)} ت` : 'بررسی قیمت'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap" style={{ color: meta.color, background: meta.bg }}>
                    {meta.label}
                  </span>
                </button>
              );
            })}
            {orders.length === 0 && (
              <p className="text-xs text-[#8A7968] text-center py-6">هنوز سفارشی ثبت نشده است.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminApp: React.FC = () => {
  const { db, updateDB, replaceDB, resetDB, isAdmin, logout } = useStudio();
  const [page, setPage] = useState<AdminPage>('dashboard');

  const newOrdersCount = db.orders.filter((o) => o.status === 'new').length;
  const unreadMessagesCount = db.contactMessages.filter((m) => !m.read).length;

  if (!isAdmin) return <LoginScreen />;

  const upsert = <T extends { id: string }>(
    key: 'products' | 'woods' | 'finishes' | 'sizes' | 'services' | 'testimonials' | 'faqs' | 'coupons',
    item: T
  ) =>
    updateDB((prev) => {
      const list = prev[key] as unknown as T[];
      return {
        ...prev,
        [key]: list.some((x) => x.id === item.id)
          ? list.map((x) => (x.id === item.id ? item : x))
          : [item, ...list],
      };
    });

  const remove = (
    key: 'products' | 'woods' | 'finishes' | 'sizes' | 'services' | 'testimonials' | 'faqs' | 'coupons',
    id: string
  ) =>
    updateDB((prev) => ({
      ...prev,
      [key]: (prev[key] as unknown as { id: string }[]).filter((x) => x.id !== id),
    }));

  return (
    <div className="min-h-screen bg-[#0D0A07] text-[#F7F2EB]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="lg:w-72 shrink-0 lg:sticky lg:top-0 lg:h-screen p-3 sm:p-4">
          <div className="glass-panel-elevated rounded-[24px] p-4 sm:p-5 lg:h-full flex flex-col">
            <div className="flex items-center gap-3 pb-5 border-b border-[#FFF0DC]/10">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E5B26D] via-[#B86B35] to-[#4A2F1D] p-[1.5px] shrink-0">
                <div className="w-full h-full rounded-full bg-[#16100B] flex items-center justify-center">
                  <BrandIcon className="w-5 h-5 text-[#D49B54]" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black truncate max-w-[170px] sm:max-w-none">{db.settings.brandName}</div>
                <div className="text-[11px] text-[#D49B54]">پنل مدیریت کارگاه</div>
              </div>
            </div>

            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto no-scrollbar py-4 flex-1 content-start">
              {NAV.map((item) => {
                const active = page === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPage(item.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? 'bg-[#D49B54] text-[#120E0A]'
                        : 'text-[#C8B9A6] hover:text-[#F7F2EB] hover:bg-[#FFF4E5]/6'
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                    {item.id === 'orders' && newOrdersCount > 0 && (
                      <span className={`mr-auto min-w-[20px] h-5 px-1 rounded-full text-[10px] font-black flex items-center justify-center ${active ? 'bg-[#120E0A] text-[#D49B54]' : 'bg-[#D9534F] text-white'}`}>
                        {toPersianDigits(newOrdersCount)}
                      </span>
                    )}
                    {item.id === 'messages' && unreadMessagesCount > 0 && (
                      <span className={`mr-auto min-w-[20px] h-5 px-1 rounded-full text-[10px] font-black flex items-center justify-center ${active ? 'bg-[#120E0A] text-[#D49B54]' : 'bg-[#D9534F] text-white'}`}>
                        {toPersianDigits(unreadMessagesCount)}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#FFF0DC]/10 flex lg:flex-col gap-2">
              <a
                href="#/"
                className="flex-1 glass-pill px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#F7F2EB] flex items-center justify-center gap-2 hover:border-[#D49B54]/50"
              >
                <Globe className="w-4 h-4 text-[#D49B54]" /> مشاهده سایت
              </a>
              <button
                type="button"
                onClick={logout}
                className="flex-1 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#D9534F]/10 border border-[#D9534F]/35 text-[#E87F7F] flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> خروج از پنل
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6 lg:pl-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-end justify-between gap-3 mb-6 flex-wrap">
              <div>
                <h1 className="text-xl sm:text-2xl font-black">{PAGE_TITLES[page]}</h1>
                <p className="text-xs text-[#8A7968] mt-1">
                  هر تغییری که اینجا ذخیره کنید، بلافاصله در سایت برای مشتریان نمایش داده می‌شود.
                </p>
              </div>
              {newOrdersCount > 0 && page !== 'orders' && (
                <button
                  type="button"
                  onClick={() => setPage('orders')}
                  className="px-4 py-2.5 rounded-xl bg-[#D9534F]/15 border border-[#D9534F]/45 text-[#E87F7F] text-xs font-bold cursor-pointer"
                >
                  {toPersianDigits(newOrdersCount)} سفارش جدید منتظر بررسی است
                </button>
              )}
            </div>

            {page === 'dashboard' && <Dashboard onGoOrders={() => setPage('orders')} />}

            {(page === 'orders' || page === 'custom-orders') && (
              <AdminOrders
                key={page}
                orders={db.orders}
                brandName={db.settings.brandName}
                defaultTypeFilter={page === 'custom-orders' ? 'custom' : 'all'}
                onUpdateOrder={(orderId, patch) =>
                  updateDB((prev) => ({
                    ...prev,
                    orders: prev.orders.map((o) => (o.id === orderId ? { ...o, ...patch } : o)),
                  }))
                }
                onDeleteOrder={(orderId) =>
                  updateDB((prev) => ({
                    ...prev,
                    orders: prev.orders.filter((o) => o.id !== orderId),
                  }))
                }
              />
            )}

            {page === 'messages' && (
              <AdminMessages
                messages={db.contactMessages}
                onMarkRead={(id, read) =>
                  updateDB((prev) => ({
                    ...prev,
                    contactMessages: prev.contactMessages.map((m) =>
                      m.id === id ? { ...m, read } : m
                    ),
                  }))
                }
                onDelete={(id) =>
                  updateDB((prev) => ({
                    ...prev,
                    contactMessages: prev.contactMessages.filter((m) => m.id !== id),
                  }))
                }
              />
            )}

            {(page === 'products' ||
              page === 'materials' ||
              page === 'services' ||
              page === 'testimonials' ||
              page === 'coupons' ||
              page === 'faqs') && (
              <AdminManage
                section={page}
                products={db.products}
                woods={db.woods}
                finishes={db.finishes}
                sizes={db.sizes}
                services={db.services}
                testimonials={db.testimonials}
                faqs={db.faqs}
                coupons={db.coupons}
                onSaveProduct={(p) => upsert('products', p)}
                onDeleteProduct={(id) => remove('products', id)}
                onSaveWood={(w) => upsert('woods', w)}
                onDeleteWood={(id) => remove('woods', id)}
                onSaveFinish={(f) => upsert('finishes', f)}
                onDeleteFinish={(id) => remove('finishes', id)}
                onSaveSize={(s) => upsert('sizes', s)}
                onDeleteSize={(id) => remove('sizes', id)}
                onSaveService={(s) => upsert('services', s)}
                onDeleteService={(id) => remove('services', id)}
                onSaveTestimonial={(t) => upsert('testimonials', t)}
                onDeleteTestimonial={(id) => remove('testimonials', id)}
                onSaveFaq={(f) => upsert('faqs', f)}
                onDeleteFaq={(id) => remove('faqs', id)}
                onSaveCoupon={(c) => upsert('coupons', c)}
                onDeleteCoupon={(id) => remove('coupons', id)}
              />
            )}

            {page === 'settings' && (
              <AdminSettings
                settings={db.settings}
                db={db}
                onSaveSettings={(s) =>
                  updateDB((prev) => ({ ...prev, settings: s }))
                }
                onImportDB={replaceDB}
                onResetDB={resetDB}
                onClearOrders={() => updateDB((prev) => ({ ...prev, orders: [] }))}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
