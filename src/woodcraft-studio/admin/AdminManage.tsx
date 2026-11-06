import React, { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  TreePine,
  Layers,
  Star,
  CircleHelp,
  MessageSquareHeart,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  CATEGORIES,
  formatTomans,
  toPersianDigits,
  type FinishOption,
  type SizeOption,
  type WoodProduct,
  type WoodSpecies,
} from '../data/products';
import { uid } from '../store/StoreContext';
import type { FaqItem, ServiceItem, Testimonial } from '../store/types';
import { SERVICE_ICON_OPTIONS, ServiceIcon } from '../components/ServicesSection';
import { AdminModal, Field, Toggle, inputCls } from './ui';

const IMAGE_PRESETS = [
  '/images/clock-walnut-brass.jpg',
  '/images/clock-epox-olive.jpg',
  '/images/laptop-stand-oak.jpg',
  '/images/phone-watch-dock.jpg',
  '/images/key-holder-wall.jpg',
  '/images/desk-organizer-set.jpg',
  '/images/headphone-stand-walnut.jpg',
  '/images/hero-desk-setup.jpg',
];

function linesToArray(text: string): string[] {
  return text.split('\n').map((l) => l.trim()).filter(Boolean);
}

/* ---------------------------------- Products --------------------------------- */

const emptyProduct = (woods: WoodSpecies[]): WoodProduct => ({
  id: uid('product'),
  title: '',
  subtitle: '',
  category: 'desk-accessories',
  categoryLabel: 'اکسسوری رومیزی',
  basePrice: 1500000,
  defaultWood: woods[0]?.id ?? 'walnut',
  availableWoods: woods.map((w) => w.id),
  dimensions: '',
  weight: '',
  craftHours: 8,
  finishType: '',
  image: IMAGE_PRESETS[0],
  badge: '',
  isBestseller: false,
  isActive: true,
  story: '',
  highlights: [],
  careGuide: '',
});

const ProductsManager: React.FC<{
  products: WoodProduct[];
  woods: WoodSpecies[];
  onSave: (p: WoodProduct) => void;
  onDelete: (id: string) => void;
}> = ({ products, woods, onSave, onDelete }) => {
  const [editing, setEditing] = useState<WoodProduct | null>(null);
  const [highlightsText, setHighlightsText] = useState('');

  const openEdit = (p: WoodProduct) => {
    setEditing({ ...p, availableWoods: [...p.availableWoods], highlights: [...p.highlights] });
    setHighlightsText(p.highlights.join('\n'));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-[#C8B9A6]">
          {toPersianDigits(products.length)} محصول در کاتالوگ — تغییرات بلافاصله در سایت اعمال
          می‌شود.
        </p>
        <button
          type="button"
          onClick={() => {
            const p = emptyProduct(woods);
            setEditing(p);
            setHighlightsText('');
          }}
          className="btn-honey-gold px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> افزودن محصول جدید
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="glass-panel rounded-2xl p-3.5 flex gap-3.5">
            <img
              src={p.image}
              alt={p.title}
              className="w-24 h-24 rounded-xl object-cover border border-white/10 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-extrabold text-[#F7F2EB] line-clamp-2">
                  {p.title}
                </h4>
                {p.isActive === false ? (
                  <EyeOff className="w-4 h-4 text-[#E87F7F] shrink-0" />
                ) : (
                  <Eye className="w-4 h-4 text-[#4E9F6E] shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-[#8A7968] mt-1">
                {p.categoryLabel} • {formatTomans(p.basePrice)} تومان
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <button
                  type="button"
                  onClick={() => openEdit(p)}
                  className="px-3 py-1.5 rounded-lg bg-[#D49B54]/15 border border-[#D49B54]/40 text-[#E5B26D] text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Pencil className="w-3 h-3" /> ویرایش
                </button>
                <button
                  type="button"
                  onClick={() => onSave({ ...p, isActive: p.isActive === false ? true : false })}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/12 text-[#C8B9A6] text-[11px] font-bold cursor-pointer"
                >
                  {p.isActive === false ? 'نمایش در سایت' : 'مخفی کردن'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`محصول «${p.title}» حذف شود؟`)) onDelete(p.id);
                  }}
                  className="w-7 h-7 rounded-lg bg-[#D9534F]/10 border border-[#D9534F]/30 flex items-center justify-center text-[#E87F7F] cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <AdminModal
          title={products.some((p) => p.id === editing.id) ? 'ویرایش محصول' : 'محصول جدید'}
          subtitle="همه این اطلاعات در ویترین سایت نمایش داده می‌شود."
          onClose={() => setEditing(null)}
          wide
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="عنوان محصول" className="md:col-span-2">
              <input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="مثلاً: ساعت دیواری «آوروم» چوب گردو و برنج" />
            </Field>
            <Field label="زیرعنوان / توضیح کوتاه" className="md:col-span-2">
              <input className={inputCls} value={editing.subtitle} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} />
            </Field>
            <Field label="دسته‌بندی">
              <select
                className={`${inputCls} cursor-pointer`}
                value={editing.category}
                onChange={(e) => {
                  const cat = CATEGORIES.find((c) => c.id === e.target.value);
                  setEditing({
                    ...editing,
                    category: e.target.value as WoodProduct['category'],
                    categoryLabel: cat && cat.id !== 'all' ? cat.label : editing.categoryLabel,
                  });
                }}
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </Field>
            <Field label="برچسب نمایشی دسته (Label)">
              <input className={inputCls} value={editing.categoryLabel} onChange={(e) => setEditing({ ...editing, categoryLabel: e.target.value })} />
            </Field>
            <Field label="قیمت پایه (تومان)">
              <input type="number" className={inputCls} value={editing.basePrice} onChange={(e) => setEditing({ ...editing, basePrice: Number(e.target.value) || 0 })} />
            </Field>
            <Field label="زمان ساخت (ساعت کار دست)">
              <input type="number" className={inputCls} value={editing.craftHours} onChange={(e) => setEditing({ ...editing, craftHours: Number(e.target.value) || 0 })} />
            </Field>
            <Field label="ابعاد محصول">
              <input className={inputCls} value={editing.dimensions} onChange={(e) => setEditing({ ...editing, dimensions: e.target.value })} placeholder="مثلاً: قطر ۳۸ سانتی‌متر × ضخامت ۲.۸" />
            </Field>
            <Field label="وزن">
              <input className={inputCls} value={editing.weight} onChange={(e) => setEditing({ ...editing, weight: e.target.value })} placeholder="مثلاً: ۱.۶ کیلوگرم" />
            </Field>
            <Field label="نوع پرداخت پیش‌فرض (متن نمایشی)">
              <input className={inputCls} value={editing.finishType} onChange={(e) => setEditing({ ...editing, finishType: e.target.value })} />
            </Field>
            <Field label="نشان روی کارت (Badge) — اختیاری">
              <input className={inputCls} value={editing.badge ?? ''} onChange={(e) => setEditing({ ...editing, badge: e.target.value })} placeholder="مثلاً: پرفروش‌ترین اثر دیواری" />
            </Field>
            <Field label="چوب پیش‌فرض">
              <select className={`${inputCls} cursor-pointer`} value={editing.defaultWood} onChange={(e) => setEditing({ ...editing, defaultWood: e.target.value })}>
                {woods.map((w) => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </Field>
            <Field label="گزینه‌های نمایش">
              <div className="flex items-center gap-5 pt-1.5">
                <Toggle checked={editing.isActive !== false} onChange={(v) => setEditing({ ...editing, isActive: v })} label="فعال در سایت" />
                <Toggle checked={!!editing.isBestseller} onChange={(v) => setEditing({ ...editing, isBestseller: v })} label="پرفروش" />
              </div>
            </Field>
            <Field label="چوب‌های قابل سفارش برای این محصول" className="md:col-span-2">
              <div className="flex flex-wrap gap-2">
                {woods.map((w) => {
                  const active = editing.availableWoods.includes(w.id);
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() =>
                        setEditing({
                          ...editing,
                          availableWoods: active
                            ? editing.availableWoods.filter((id) => id !== w.id)
                            : [...editing.availableWoods, w.id],
                        })
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 cursor-pointer ${
                        active ? 'bg-[#D49B54]/20 border-[#D49B54] text-[#F7F2EB]' : 'bg-[#120E0A]/50 border-white/10 text-[#8A7968]'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ background: w.swatchGradient }} />
                      {w.name}
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field label="تصویر محصول (آدرس عکس)" className="md:col-span-2">
              <input dir="ltr" className={`${inputCls} text-left`} value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
              <div className="flex gap-2 mt-2 flex-wrap">
                {IMAGE_PRESETS.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setEditing({ ...editing, image: src })}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer ${
                      editing.image === src ? 'border-[#D49B54]' : 'border-white/10'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </Field>
            <Field label="داستان ساخت محصول" className="md:col-span-2">
              <textarea rows={3} className={inputCls} value={editing.story} onChange={(e) => setEditing({ ...editing, story: e.target.value })} />
            </Field>
            <Field label="ویژگی‌های برجسته (هر ویژگی در یک خط)" className="md:col-span-2">
              <textarea rows={4} className={inputCls} value={highlightsText} onChange={(e) => setHighlightsText(e.target.value)} placeholder={'موتور بی‌صدا با ضمانت تعویض\nامکان حکاکی نام روی لبه ساعت'} />
            </Field>
            <Field label="راهنمای نگهداری" className="md:col-span-2">
              <input className={inputCls} value={editing.careGuide} onChange={(e) => setEditing({ ...editing, careGuide: e.target.value })} />
            </Field>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!editing.title.trim()) {
                window.alert('عنوان محصول را وارد کنید.');
                return;
              }
              onSave({ ...editing, highlights: linesToArray(highlightsText) });
              setEditing(null);
            }}
            className="mt-5 w-full btn-honey-gold py-3.5 rounded-xl text-sm font-black cursor-pointer"
          >
            ذخیره محصول
          </button>
        </AdminModal>
      )}
    </div>
  );
};

/* --------------------------------- Materials --------------------------------- */

const MaterialsManager: React.FC<{
  woods: WoodSpecies[];
  finishes: FinishOption[];
  sizes: SizeOption[];
  onSaveWood: (w: WoodSpecies) => void;
  onDeleteWood: (id: string) => void;
  onSaveFinish: (f: FinishOption) => void;
  onDeleteFinish: (id: string) => void;
  onSaveSize: (s: SizeOption) => void;
  onDeleteSize: (id: string) => void;
}> = (props) => {
  const [woodEdit, setWoodEdit] = useState<WoodSpecies | null>(null);
  const [finishEdit, setFinishEdit] = useState<FinishOption | null>(null);
  const [sizeEdit, setSizeEdit] = useState<SizeOption | null>(null);

  return (
    <div className="space-y-8">
      {/* Woods */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black text-[#F7F2EB] flex items-center gap-2">
            <TreePine className="w-4 h-4 text-[#D49B54]" /> گونه‌های چوب و ضریب قیمت
          </h3>
          <button
            type="button"
            onClick={() =>
              setWoodEdit({
                id: uid('wood'),
                name: '',
                subtitle: '',
                origin: '',
                durability: '',
                priceMultiplier: 1,
                swatchGradient: 'linear-gradient(135deg, #7C4E27, #3A2412)',
                tintOverlay: 'rgba(180,120,60,.16)',
                accentHex: '#C88A4B',
                grainDescription: '',
              })
            }
            className="btn-honey-gold px-3.5 py-2 rounded-lg text-[11px] font-black flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> چوب جدید
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {props.woods.map((w) => (
            <div key={w.id} className="glass-panel rounded-2xl p-4 flex items-start gap-3.5">
              <span className="w-12 h-12 rounded-2xl border border-white/25 shrink-0" style={{ background: w.swatchGradient }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-[#F7F2EB]">{w.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#D49B54]/15 text-[#E5B26D] font-bold">
                    ضریب {toPersianDigits(Math.round(w.priceMultiplier * 100))}٪
                  </span>
                </div>
                <p className="text-[11px] text-[#8A7968] mt-0.5 line-clamp-1">{w.subtitle}</p>
                <div className="flex gap-1.5 mt-2.5">
                  <button type="button" onClick={() => setWoodEdit({ ...w })} className="px-3 py-1.5 rounded-lg bg-[#D49B54]/15 border border-[#D49B54]/40 text-[#E5B26D] text-[11px] font-bold flex items-center gap-1 cursor-pointer">
                    <Pencil className="w-3 h-3" /> ویرایش
                  </button>
                  <button
                    type="button"
                    onClick={() => window.confirm(`چوب «${w.name}» حذف شود؟`) && props.onDeleteWood(w.id)}
                    className="w-7 h-7 rounded-lg bg-[#D9534F]/10 border border-[#D9534F]/30 flex items-center justify-center text-[#E87F7F] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Finishes */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black text-[#F7F2EB] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#D49B54]" /> پوشش‌ها و پرداخت‌ها
          </h3>
          <button
            type="button"
            onClick={() => setFinishEdit({ id: uid('finish'), name: '', description: '', extraCost: 0, badge: '' })}
            className="btn-honey-gold px-3.5 py-2 rounded-lg text-[11px] font-black flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> پوشش جدید
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {props.finishes.map((f) => (
            <div key={f.id} className="glass-panel rounded-2xl p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-[#F7F2EB]">{f.name}</span>
                <span className="text-[11px] font-bold text-[#E5B26D] whitespace-nowrap">
                  {f.extraCost === 0 ? 'رایگان' : `+${formatTomans(f.extraCost)} ت`}
                </span>
              </div>
              <p className="text-[11px] text-[#8A7968] mt-1 line-clamp-2">{f.description}</p>
              <div className="flex gap-1.5 mt-3">
                <button type="button" onClick={() => setFinishEdit({ ...f })} className="px-3 py-1.5 rounded-lg bg-[#D49B54]/15 border border-[#D49B54]/40 text-[#E5B26D] text-[11px] font-bold flex items-center gap-1 cursor-pointer">
                  <Pencil className="w-3 h-3" /> ویرایش
                </button>
                <button
                  type="button"
                  onClick={() => window.confirm(`پوشش «${f.name}» حذف شود؟`) && props.onDeleteFinish(f.id)}
                  className="w-7 h-7 rounded-lg bg-[#D9534F]/10 border border-[#D9534F]/30 flex items-center justify-center text-[#E87F7F] cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black text-[#F7F2EB] flex items-center gap-2">
            <Package className="w-4 h-4 text-[#D49B54]" /> گزینه‌های ابعاد ساخت
          </h3>
          <button
            type="button"
            onClick={() => setSizeEdit({ id: uid('size'), name: '', dimensionsLabel: '', priceDelta: 0 })}
            className="btn-honey-gold px-3.5 py-2 rounded-lg text-[11px] font-black flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> ابعاد جدید
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {props.sizes.map((s) => (
            <div key={s.id} className="glass-panel rounded-2xl p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-[#F7F2EB]">{s.name}</span>
                <span className="text-[11px] font-bold text-[#E5B26D] whitespace-nowrap">
                  {s.priceDelta === 0 ? 'بدون هزینه' : `+${formatTomans(s.priceDelta)} ت`}
                </span>
              </div>
              <p className="text-[11px] text-[#8A7968] mt-1">{s.dimensionsLabel}</p>
              {s.id === 'custom' && (
                <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-[#7FB3E8]/15 text-[#7FB3E8] font-bold">
                  این گزینه فیلد «ابعاد دلخواه مشتری» را فعال می‌کند
                </span>
              )}
              <div className="flex gap-1.5 mt-3">
                <button type="button" onClick={() => setSizeEdit({ ...s })} className="px-3 py-1.5 rounded-lg bg-[#D49B54]/15 border border-[#D49B54]/40 text-[#E5B26D] text-[11px] font-bold flex items-center gap-1 cursor-pointer">
                  <Pencil className="w-3 h-3" /> ویرایش
                </button>
                <button
                  type="button"
                  onClick={() => window.confirm(`گزینه ابعاد «${s.name}» حذف شود؟`) && props.onDeleteSize(s.id)}
                  className="w-7 h-7 rounded-lg bg-[#D9534F]/10 border border-[#D9534F]/30 flex items-center justify-center text-[#E87F7F] cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {woodEdit && (
        <AdminModal title="ویرایش گونه چوب" onClose={() => setWoodEdit(null)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="نام چوب"><input className={inputCls} value={woodEdit.name} onChange={(e) => setWoodEdit({ ...woodEdit, name: e.target.value })} /></Field>
            <Field label="ضریب قیمت (۱ = قیمت پایه)"><input type="number" step="0.01" className={inputCls} value={woodEdit.priceMultiplier} onChange={(e) => setWoodEdit({ ...woodEdit, priceMultiplier: Number(e.target.value) || 1 })} /></Field>
            <Field label="زیرعنوان" className="sm:col-span-2"><input className={inputCls} value={woodEdit.subtitle} onChange={(e) => setWoodEdit({ ...woodEdit, subtitle: e.target.value })} /></Field>
            <Field label="خاستگاه و فرآوری"><input className={inputCls} value={woodEdit.origin} onChange={(e) => setWoodEdit({ ...woodEdit, origin: e.target.value })} /></Field>
            <Field label="مقاومت و ماندگاری"><input className={inputCls} value={woodEdit.durability} onChange={(e) => setWoodEdit({ ...woodEdit, durability: e.target.value })} /></Field>
            <Field label="توضیح رگه‌ها" className="sm:col-span-2"><input className={inputCls} value={woodEdit.grainDescription} onChange={(e) => setWoodEdit({ ...woodEdit, grainDescription: e.target.value })} /></Field>
            <Field label="گرادیان نمونه رنگ (CSS)"><input dir="ltr" className={`${inputCls} text-left`} value={woodEdit.swatchGradient} onChange={(e) => setWoodEdit({ ...woodEdit, swatchGradient: e.target.value })} /></Field>
            <Field label="رنگ لهجه (Hex)"><input dir="ltr" className={`${inputCls} text-left`} value={woodEdit.accentHex} onChange={(e) => setWoodEdit({ ...woodEdit, accentHex: e.target.value })} /></Field>
          </div>
          <div className="mt-4 h-14 rounded-xl border border-white/20" style={{ background: woodEdit.swatchGradient }} />
          <button type="button" onClick={() => { props.onSaveWood(woodEdit); setWoodEdit(null); }} className="mt-5 w-full btn-honey-gold py-3 rounded-xl text-xs font-black cursor-pointer">ذخیره چوب</button>
        </AdminModal>
      )}

      {finishEdit && (
        <AdminModal title="ویرایش پوشش" onClose={() => setFinishEdit(null)}>
          <div className="space-y-4">
            <Field label="نام پوشش"><input className={inputCls} value={finishEdit.name} onChange={(e) => setFinishEdit({ ...finishEdit, name: e.target.value })} /></Field>
            <Field label="توضیح"><textarea rows={2} className={inputCls} value={finishEdit.description} onChange={(e) => setFinishEdit({ ...finishEdit, description: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="هزینه اضافه (تومان)"><input type="number" className={inputCls} value={finishEdit.extraCost} onChange={(e) => setFinishEdit({ ...finishEdit, extraCost: Number(e.target.value) || 0 })} /></Field>
              <Field label="برچسب (Badge)"><input className={inputCls} value={finishEdit.badge} onChange={(e) => setFinishEdit({ ...finishEdit, badge: e.target.value })} /></Field>
            </div>
          </div>
          <button type="button" onClick={() => { props.onSaveFinish(finishEdit); setFinishEdit(null); }} className="mt-5 w-full btn-honey-gold py-3 rounded-xl text-xs font-black cursor-pointer">ذخیره پوشش</button>
        </AdminModal>
      )}

      {sizeEdit && (
        <AdminModal title="ویرایش گزینه ابعاد" onClose={() => setSizeEdit(null)}>
          <div className="space-y-4">
            <Field label="نام گزینه"><input className={inputCls} value={sizeEdit.name} onChange={(e) => setSizeEdit({ ...sizeEdit, name: e.target.value })} /></Field>
            <Field label="توضیح ابعاد"><input className={inputCls} value={sizeEdit.dimensionsLabel} onChange={(e) => setSizeEdit({ ...sizeEdit, dimensionsLabel: e.target.value })} /></Field>
            <Field label="مبلغ اضافه (تومان)"><input type="number" className={inputCls} value={sizeEdit.priceDelta} onChange={(e) => setSizeEdit({ ...sizeEdit, priceDelta: Number(e.target.value) || 0 })} /></Field>
          </div>
          <button type="button" onClick={() => { props.onSaveSize(sizeEdit); setSizeEdit(null); }} className="mt-5 w-full btn-honey-gold py-3 rounded-xl text-xs font-black cursor-pointer">ذخیره ابعاد</button>
        </AdminModal>
      )}
    </div>
  );
};

/* ------------------------- Services / Reviews / FAQs ------------------------- */

const ServicesManager: React.FC<{
  services: ServiceItem[];
  onSave: (s: ServiceItem) => void;
  onDelete: (id: string) => void;
}> = ({ services, onSave, onDelete }) => {
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [featuresText, setFeaturesText] = useState('');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#C8B9A6]">خدمات در بخش «خدمات کارگاه» سایت نمایش داده می‌شوند.</p>
        <button type="button" onClick={() => { setEditing({ id: uid('service'), icon: 'Hammer', title: '', description: '', priceLabel: '', features: [], active: true }); setFeaturesText(''); }} className="btn-honey-gold px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" /> خدمت جدید
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map((s) => (
          <div key={s.id} className="glass-panel rounded-2xl p-4 flex gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#D49B54]/15 border border-[#D49B54]/35 flex items-center justify-center text-[#D49B54] shrink-0">
              <ServiceIcon name={s.icon} className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-extrabold text-[#F7F2EB]">{s.title}</span>
                {!s.active && <span className="text-[10px] text-[#E87F7F] font-bold">مخفی</span>}
              </div>
              <p className="text-[11px] text-[#8A7968] line-clamp-2 mt-0.5">{s.description}</p>
              <div className="flex gap-1.5 mt-2.5">
                <button type="button" onClick={() => { setEditing({ ...s }); setFeaturesText(s.features.join('\n')); }} className="px-3 py-1.5 rounded-lg bg-[#D49B54]/15 border border-[#D49B54]/40 text-[#E5B26D] text-[11px] font-bold flex items-center gap-1 cursor-pointer"><Pencil className="w-3 h-3" /> ویرایش</button>
                <button type="button" onClick={() => window.confirm(`خدمت «${s.title}» حذف شود؟`) && onDelete(s.id)} className="w-7 h-7 rounded-lg bg-[#D9534F]/10 border border-[#D9534F]/30 flex items-center justify-center text-[#E87F7F] cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <AdminModal title="ویرایش خدمت" onClose={() => setEditing(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="عنوان خدمت"><input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
              <Field label="آیکون">
                <select className={`${inputCls} cursor-pointer`} value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}>
                  {SERVICE_ICON_OPTIONS.map((o) => (<option key={o.id} value={o.id}>{o.label}</option>))}
                </select>
              </Field>
            </div>
            <Field label="توضیح خدمت"><textarea rows={3} className={inputCls} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></Field>
            <Field label="برچسب قیمت"><input className={inputCls} value={editing.priceLabel} onChange={(e) => setEditing({ ...editing, priceLabel: e.target.value })} placeholder="مثلاً: رایگان روی تمام سفارش‌ها" /></Field>
            <Field label="ویژگی‌ها (هر ویژگی در یک خط)"><textarea rows={4} className={inputCls} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} /></Field>
            <Toggle checked={editing.active} onChange={(v) => setEditing({ ...editing, active: v })} label="نمایش در سایت" />
          </div>
          <button type="button" onClick={() => { onSave({ ...editing, features: linesToArray(featuresText) }); setEditing(null); }} className="mt-5 w-full btn-honey-gold py-3 rounded-xl text-xs font-black cursor-pointer">ذخیره خدمت</button>
        </AdminModal>
      )}
    </div>
  );
};

const TestimonialsManager: React.FC<{
  testimonials: Testimonial[];
  onSave: (t: Testimonial) => void;
  onDelete: (id: string) => void;
}> = ({ testimonials, onSave, onDelete }) => {
  const [editing, setEditing] = useState<Testimonial | null>(null);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#C8B9A6] flex items-center gap-2"><MessageSquareHeart className="w-4 h-4 text-[#D49B54]" /> نظرات در بخش «تجربه خریداران» سایت نمایش داده می‌شوند.</p>
        <button type="button" onClick={() => setEditing({ id: uid('rev'), name: '', city: '', productOrdered: '', rating: 5, dateLabel: 'به‌تازگی', comment: '', active: true })} className="btn-honey-gold px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" /> نظر جدید
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {testimonials.map((t) => (
          <div key={t.id} className="glass-panel rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#F7F2EB]">{t.name}</span>
              <span className="flex items-center gap-0.5 text-[#E5B26D]">
                {Array.from({ length: t.rating }).map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-[#E5B26D]" />))}
              </span>
            </div>
            <p className="text-[11px] text-[#8A7968] mt-1 line-clamp-3">«{t.comment}»</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[11px] text-[#C8B9A6]">{t.city} • {t.dateLabel}{!t.active && ' • مخفی'}</span>
              <div className="flex gap-1.5">
                <button type="button" onClick={() => setEditing({ ...t })} className="px-3 py-1.5 rounded-lg bg-[#D49B54]/15 border border-[#D49B54]/40 text-[#E5B26D] text-[11px] font-bold flex items-center gap-1 cursor-pointer"><Pencil className="w-3 h-3" /> ویرایش</button>
                <button type="button" onClick={() => window.confirm('این نظر حذف شود؟') && onDelete(t.id)} className="w-7 h-7 rounded-lg bg-[#D9534F]/10 border border-[#D9534F]/30 flex items-center justify-center text-[#E87F7F] cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <AdminModal title="ویرایش نظر مشتری" onClose={() => setEditing(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="نام مشتری"><input className={inputCls} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
              <Field label="شهر / محله"><input className={inputCls} value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="محصول خریداری‌شده"><input className={inputCls} value={editing.productOrdered} onChange={(e) => setEditing({ ...editing, productOrdered: e.target.value })} /></Field>
              <Field label="برچسب تاریخ"><input className={inputCls} value={editing.dateLabel} onChange={(e) => setEditing({ ...editing, dateLabel: e.target.value })} /></Field>
            </div>
            <Field label="امتیاز (۱ تا ۵)">
              <select className={`${inputCls} cursor-pointer`} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((n) => (<option key={n} value={n}>{toPersianDigits(n)} ستاره</option>))}
              </select>
            </Field>
            <Field label="متن نظر"><textarea rows={4} className={inputCls} value={editing.comment} onChange={(e) => setEditing({ ...editing, comment: e.target.value })} /></Field>
            <Toggle checked={editing.active} onChange={(v) => setEditing({ ...editing, active: v })} label="نمایش در سایت" />
          </div>
          <button type="button" onClick={() => { onSave(editing); setEditing(null); }} className="mt-5 w-full btn-honey-gold py-3 rounded-xl text-xs font-black cursor-pointer">ذخیره نظر</button>
        </AdminModal>
      )}
    </div>
  );
};

const FaqsManager: React.FC<{
  faqs: FaqItem[];
  onSave: (f: FaqItem) => void;
  onDelete: (id: string) => void;
}> = ({ faqs, onSave, onDelete }) => {
  const [editing, setEditing] = useState<FaqItem | null>(null);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#C8B9A6] flex items-center gap-2"><CircleHelp className="w-4 h-4 text-[#D49B54]" /> سوالات در بخش «سوالات متداول» سایت نمایش داده می‌شوند.</p>
        <button type="button" onClick={() => setEditing({ id: uid('faq'), question: '', answer: '', active: true })} className="btn-honey-gold px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" /> سوال جدید
        </button>
      </div>
      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="glass-panel rounded-2xl p-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-extrabold text-[#F7F2EB]">{f.question} {!f.active && <span className="text-[10px] text-[#E87F7F]">(مخفی)</span>}</div>
              <p className="text-[11px] text-[#8A7968] mt-1 line-clamp-2">{f.answer}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button type="button" onClick={() => setEditing({ ...f })} className="px-3 py-1.5 rounded-lg bg-[#D49B54]/15 border border-[#D49B54]/40 text-[#E5B26D] text-[11px] font-bold flex items-center gap-1 cursor-pointer"><Pencil className="w-3 h-3" /> ویرایش</button>
              <button type="button" onClick={() => window.confirm('این سوال حذف شود؟') && onDelete(f.id)} className="w-7 h-7 rounded-lg bg-[#D9534F]/10 border border-[#D9534F]/30 flex items-center justify-center text-[#E87F7F] cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <AdminModal title="ویرایش سوال متداول" onClose={() => setEditing(null)}>
          <div className="space-y-4">
            <Field label="سوال"><input className={inputCls} value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} /></Field>
            <Field label="پاسخ"><textarea rows={5} className={inputCls} value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} /></Field>
            <Toggle checked={editing.active} onChange={(v) => setEditing({ ...editing, active: v })} label="نمایش در سایت" />
          </div>
          <button type="button" onClick={() => { onSave(editing); setEditing(null); }} className="mt-5 w-full btn-honey-gold py-3 rounded-xl text-xs font-black cursor-pointer">ذخیره سوال</button>
        </AdminModal>
      )}
    </div>
  );
};

/* --------------------------------- Export ------------------------------------ */

export type ManageSection = 'products' | 'materials' | 'services' | 'testimonials' | 'faqs';

interface AdminManageProps {
  section: ManageSection;
  products: WoodProduct[];
  woods: WoodSpecies[];
  finishes: FinishOption[];
  sizes: SizeOption[];
  services: ServiceItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  onSaveProduct: (p: WoodProduct) => void;
  onDeleteProduct: (id: string) => void;
  onSaveWood: (w: WoodSpecies) => void;
  onDeleteWood: (id: string) => void;
  onSaveFinish: (f: FinishOption) => void;
  onDeleteFinish: (id: string) => void;
  onSaveSize: (s: SizeOption) => void;
  onDeleteSize: (id: string) => void;
  onSaveService: (s: ServiceItem) => void;
  onDeleteService: (id: string) => void;
  onSaveTestimonial: (t: Testimonial) => void;
  onDeleteTestimonial: (id: string) => void;
  onSaveFaq: (f: FaqItem) => void;
  onDeleteFaq: (id: string) => void;
}

export const AdminManage: React.FC<AdminManageProps> = (props) => {
  switch (props.section) {
    case 'materials':
      return (
        <MaterialsManager
          woods={props.woods}
          finishes={props.finishes}
          sizes={props.sizes}
          onSaveWood={props.onSaveWood}
          onDeleteWood={props.onDeleteWood}
          onSaveFinish={props.onSaveFinish}
          onDeleteFinish={props.onDeleteFinish}
          onSaveSize={props.onSaveSize}
          onDeleteSize={props.onDeleteSize}
        />
      );
    case 'services':
      return <ServicesManager services={props.services} onSave={props.onSaveService} onDelete={props.onDeleteService} />;
    case 'testimonials':
      return <TestimonialsManager testimonials={props.testimonials} onSave={props.onSaveTestimonial} onDelete={props.onDeleteTestimonial} />;
    case 'faqs':
      return <FaqsManager faqs={props.faqs} onSave={props.onSaveFaq} onDelete={props.onDeleteFaq} />;
    default:
      return <ProductsManager products={props.products} woods={props.woods} onSave={props.onSaveProduct} onDelete={props.onDeleteProduct} />;
  }
};
