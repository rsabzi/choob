import React, { useRef, useState } from 'react';
import {
  Save,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  Store,
  PhoneCall,
  Truck,
  Type,
  KeyRound,
  Database,
} from 'lucide-react';
import type { SiteSettings, StudioDB } from '../store/types';
import { Field, downloadFile, inputCls } from './ui';

interface AdminSettingsProps {
  settings: SiteSettings;
  db: StudioDB;
  onSaveSettings: (s: SiteSettings) => void;
  onImportDB: (db: StudioDB) => void;
  onResetDB: () => void;
  onClearOrders: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  db,
  onSaveSettings,
  onImportDB,
  onResetDB,
  onClearOrders,
}) => {
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [savedFlash, setSavedFlash] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const save = () => {
    onSaveSettings(draft);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };

  const changePassword = () => {
    if (newPassword.trim().length < 6) {
      setPasswordMsg('رمز عبور جدید باید حداقل ۶ نویسه باشد.');
      return;
    }
    onSaveSettings({ ...draft, adminPassword: newPassword.trim() });
    setDraft((prev) => ({ ...prev, adminPassword: newPassword.trim() }));
    setNewPassword('');
    setPasswordMsg('رمز عبور مدیریت با موفقیت تغییر کرد. در ورود بعدی از رمز جدید استفاده کنید.');
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as StudioDB;
        if (!parsed.settings || !Array.isArray(parsed.products)) {
          window.alert('فایل پشتیبان معتبر نیست.');
          return;
        }
        if (window.confirm('داده‌های فعلی با فایل پشتیبان جایگزین شود؟')) {
          onImportDB(parsed);
          setDraft(parsed.settings);
          window.alert('پشتیبان با موفقیت بازیابی شد.');
        }
      } catch {
        window.alert('خواندن فایل پشتیبان ممکن نشد.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Brand & Hero */}
      <section className="glass-panel rounded-2xl p-5">
        <h3 className="text-sm font-black text-[#F7F2EB] flex items-center gap-2 mb-4">
          <Type className="w-4 h-4 text-[#D49B54]" /> برند و متن‌های بخش اصلی (Hero)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="نام برند / کارگاه"><input className={inputCls} value={draft.brandName} onChange={(e) => set('brandName', e.target.value)} /></Field>
          <Field label="شعار زیر نام برند"><input className={inputCls} value={draft.brandTagline} onChange={(e) => set('brandTagline', e.target.value)} /></Field>
          <Field label="متن نشان بالای تیتر (Badge)" className="md:col-span-2"><input className={inputCls} value={draft.heroBadge} onChange={(e) => set('heroBadge', e.target.value)} /></Field>
          <Field label="تیتر اصلی — بخش اول"><input className={inputCls} value={draft.heroTitleLead} onChange={(e) => set('heroTitleLead', e.target.value)} /></Field>
          <Field label="تیتر اصلی — بخش طلایی"><input className={inputCls} value={draft.heroTitleAccent} onChange={(e) => set('heroTitleAccent', e.target.value)} /></Field>
          <Field label="تیتر اصلی — بخش پایانی" className="md:col-span-2"><input className={inputCls} value={draft.heroTitleTail} onChange={(e) => set('heroTitleTail', e.target.value)} /></Field>
          <Field label="زیرعنوان معرفی" className="md:col-span-2"><textarea rows={3} className={inputCls} value={draft.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} /></Field>
          <Field label="تصویر اصلی Hero (آدرس عکس)"><input dir="ltr" className={`${inputCls} text-left`} value={draft.heroImage} onChange={(e) => set('heroImage', e.target.value)} /></Field>
          <Field label="متن خلاصه امتیاز نظرات"><input className={inputCls} value={draft.ratingSummary} onChange={(e) => set('ratingSummary', e.target.value)} /></Field>
        </div>

        <h4 className="text-xs font-black text-[#C8B9A6] mt-6 mb-3">سه آمار اعتماد زیر تیتر اصلی</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {draft.heroStats.map((stat, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-2">
              <Field label={`مقدار ${idx + 1}`}>
                <input className={inputCls} value={stat.value} onChange={(e) => {
                  const next = [...draft.heroStats];
                  next[idx] = { ...next[idx], value: e.target.value };
                  set('heroStats', next);
                }} />
              </Field>
              <Field label={`توضیح ${idx + 1}`}>
                <input className={inputCls} value={stat.label} onChange={(e) => {
                  const next = [...draft.heroStats];
                  next[idx] = { ...next[idx], label: e.target.value };
                  set('heroStats', next);
                }} />
              </Field>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Field label="متن معرفی کارگاه (فوتر)"><textarea rows={3} className={inputCls} value={draft.aboutText} onChange={(e) => set('aboutText', e.target.value)} /></Field>
          <Field label="متن پایانی فوتر"><textarea rows={3} className={inputCls} value={draft.footerNote} onChange={(e) => set('footerNote', e.target.value)} /></Field>
        </div>
      </section>

      {/* Contact */}
      <section className="glass-panel rounded-2xl p-5">
        <h3 className="text-sm font-black text-[#F7F2EB] flex items-center gap-2 mb-4">
          <PhoneCall className="w-4 h-4 text-[#D49B54]" /> اطلاعات تماس و شبکه‌های اجتماعی
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="شماره تماس نمایشی (فوتر)"><input className={inputCls} value={draft.phoneDisplay} onChange={(e) => set('phoneDisplay', e.target.value)} /></Field>
          <Field label="شماره واتساپ بین‌المللی (بدون +)"><input dir="ltr" className={`${inputCls} text-left`} value={draft.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)} placeholder="989124809210" /></Field>
          <Field label="آیدی تلگرام (بدون @)"><input dir="ltr" className={`${inputCls} text-left`} value={draft.telegramId} onChange={(e) => set('telegramId', e.target.value)} /></Field>
          <Field label="آیدی اینستاگرام (بدون @)"><input dir="ltr" className={`${inputCls} text-left`} value={draft.instagramId} onChange={(e) => set('instagramId', e.target.value)} /></Field>
          <Field label="ایمیل"><input dir="ltr" className={`${inputCls} text-left`} value={draft.email} onChange={(e) => set('email', e.target.value)} /></Field>
          <Field label="ساعات پاسخگویی"><input className={inputCls} value={draft.workingHours} onChange={(e) => set('workingHours', e.target.value)} /></Field>
          <Field label="نشانی کارگاه" className="md:col-span-2"><input className={inputCls} value={draft.address} onChange={(e) => set('address', e.target.value)} /></Field>
        </div>
      </section>

      {/* Shipping & Prices */}
      <section className="glass-panel rounded-2xl p-5">
        <h3 className="text-sm font-black text-[#F7F2EB] flex items-center gap-2 mb-4">
          <Truck className="w-4 h-4 text-[#D49B54]" /> ارسال و مبالغ عمومی
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="هزینه ارسال (تومان)"><input type="number" className={inputCls} value={draft.shippingCost} onChange={(e) => set('shippingCost', Number(e.target.value) || 0)} /></Field>
          <Field label="سقف ارسال رایگان (تومان)"><input type="number" className={inputCls} value={draft.freeShippingThreshold} onChange={(e) => set('freeShippingThreshold', Number(e.target.value) || 0)} /></Field>
          <Field label="قیمت بسته‌بندی کادویی (تومان)"><input type="number" className={inputCls} value={draft.giftBoxPrice} onChange={(e) => set('giftBoxPrice', Number(e.target.value) || 0)} /></Field>
        </div>
        <button type="button" onClick={save} className="mt-5 btn-honey-gold px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer">
          <Save className="w-4 h-4" />
          {savedFlash ? 'ذخیره شد ✓' : 'ذخیره همه تنظیمات سایت'}
        </button>
      </section>

      {/* Security */}
      <section className="glass-panel rounded-2xl p-5">
        <h3 className="text-sm font-black text-[#F7F2EB] flex items-center gap-2 mb-4">
          <KeyRound className="w-4 h-4 text-[#D49B54]" /> امنیت پنل مدیریت
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <Field label="رمز عبور جدید مدیریت" className="flex-1">
            <input type="password" dir="ltr" className={`${inputCls} text-left`} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" />
          </Field>
          <button type="button" onClick={changePassword} className="glass-pill px-5 py-2.5 rounded-xl text-xs font-bold text-[#F7F2EB] flex items-center gap-2 cursor-pointer hover:border-[#D49B54]/50">
            <ShieldCheck className="w-4 h-4 text-[#4E9F6E]" /> تغییر رمز عبور
          </button>
        </div>
        {passwordMsg && <p className="text-xs text-[#7FCB9B] mt-3">{passwordMsg}</p>}
        <p className="text-[11px] text-[#8A7968] mt-3 flex items-center gap-1.5">
          <Store className="w-3.5 h-3.5" />
          رمز پیش‌فرض اولیه «admin123» است؛ پس از اولین ورود حتماً آن را تغییر دهید.
        </p>
      </section>

      {/* Data management */}
      <section className="glass-panel rounded-2xl p-5 border-[#E87F7F]/25">
        <h3 className="text-sm font-black text-[#F7F2EB] flex items-center gap-2 mb-2">
          <Database className="w-4 h-4 text-[#D49B54]" /> مدیریت داده‌ها و پشتیبان‌گیری
        </h3>
        <p className="text-[11px] text-[#8A7968] leading-relaxed mb-4">
          همه داده‌های سایت (محصولات، سفارش‌ها، تنظیمات و…) در حافظه همین مرورگر ذخیره می‌شود.
          برای انتقال به سیستم دیگر یا نگهداری نسخه پشتیبان، خروجی بگیرید و در مقصد بازیابی
          کنید.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => downloadFile(`orsi-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(db, null, 2))}
            className="glass-pill px-4 py-2.5 rounded-xl text-xs font-bold text-[#F7F2EB] flex items-center gap-2 cursor-pointer hover:border-[#D49B54]/50"
          >
            <Download className="w-4 h-4 text-[#D49B54]" /> دانلود پشتیبان کامل (JSON)
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="glass-pill px-4 py-2.5 rounded-xl text-xs font-bold text-[#F7F2EB] flex items-center gap-2 cursor-pointer hover:border-[#D49B54]/50"
          >
            <Upload className="w-4 h-4 text-[#D49B54]" /> بازیابی از فایل پشتیبان
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleImport(f);
            e.target.value = '';
          }} />
          <button
            type="button"
            onClick={() => window.confirm('همه سفارش‌ها حذف شوند؟ محصولات و تنظیمات باقی می‌مانند.') && onClearOrders()}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#D9534F]/10 border border-[#D9534F]/35 text-[#E87F7F] flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> حذف همه سفارش‌ها
          </button>
          <button
            type="button"
            onClick={() => window.confirm('کل سایت به داده‌های پیش‌فرض اولیه برگردد؟ همه تغییرات و سفارش‌ها پاک می‌شود.') && onResetDB()}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#D9534F]/15 border border-[#D9534F]/50 text-[#E87F7F] flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> بازنشانی کامل کارخانه‌ای
          </button>
        </div>
      </section>
    </div>
  );
};
