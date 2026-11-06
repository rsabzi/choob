import React, { useState } from 'react';
import {
  Wand2,
  CheckCircle2,
  Send,
  User,
  Phone,
  Ruler,
  Wallet,
  CalendarClock,
  Link2,
  MessageSquare,
} from 'lucide-react';
import { normalizeIranPhone, WoodSpecies } from '../data/products';
import type { CreateOrderInput } from '../store/StoreContext';
import type { Order } from '../store/types';

interface CustomProjectSectionProps {
  woods: WoodSpecies[];
  whatsappNumber: string;
  onCreateOrder: (input: CreateOrderInput) => Order;
  onOpenTracking: () => void;
}

const BUDGET_OPTIONS = [
  'زیر ۲ میلیون تومان',
  '۲ تا ۵ میلیون تومان',
  '۵ تا ۱۰ میلیون تومان',
  '۱۰ تا ۳۰ میلیون تومان',
  'بالای ۳۰ میلیون تومان (پروژه سازمانی/دکور)',
  'هنوز نمی‌دانم؛ مشاوره می‌خواهم',
];

export const CustomProjectSection: React.FC<CustomProjectSectionProps> = ({
  woods,
  whatsappNumber,
  onCreateOrder,
  onOpenTracking,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [woodPreference, setWoodPreference] = useState('مشاوره کارگاه');
  const [dimensions, setDimensions] = useState('');
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [deadline, setDeadline] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  const [error, setError] = useState('');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPhone = normalizeIranPhone(phone);
    if (fullName.trim().length < 3) {
      setError('لطفاً نام و نام خانوادگی کامل خود را وارد کنید.');
      return;
    }
    if (!normalizedPhone) {
      setError('شماره موبایل معتبر نیست؛ شماره باید ۱۱ رقمی و با ۰۹ شروع شود.');
      return;
    }
    if (title.trim().length < 4 || description.trim().length < 10) {
      setError('لطفاً عنوان ایده و توضیحات طرح را کامل‌تر بنویسید تا استادکار دقیق بررسی کند.');
      return;
    }
    setError('');

    const order = onCreateOrder({
      type: 'custom',
      customer: {
        fullName: fullName.trim(),
        phone: normalizedPhone,
        city: '',
        address: '',
        contactChannel: 'whatsapp',
        note: '',
      },
      items: [],
      customProject: {
        title: title.trim(),
        description: description.trim(),
        woodPreference,
        dimensions: dimensions.trim(),
        budget,
        deadline: deadline.trim(),
        referenceLink: referenceLink.trim(),
      },
      subtotal: 0,
      shippingCost: 0,
      total: 0,
    });
    setCreatedOrder(order);
  };

  const whatsappText = createdOrder
    ? encodeURIComponent(
        `سلام، درخواست ساخت سفارشی من با کد ${createdOrder.code} در سایت ثبت شد.\nایده: ${createdOrder.customProject?.title}\nنام: ${createdOrder.customer.fullName}\nاگر عکس مرجع لازم است همینجا می‌فرستم.`
      )
    : '';

  return (
    <section id="custom-project" className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="pointer-events-none absolute top-1/4 left-10 w-[420px] h-[420px] rounded-full bg-[#B86B35]/15 blur-[130px]" />
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-bold text-[#D49B54] mb-3 border border-[#D49B54]/30">
            <Wand2 className="w-4 h-4" />
            <span>سفارش ساخت کاملاً سفارشی</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#F7F2EB] tracking-tight">
            ایده‌ای در ذهن دارید که در ویترین نیست؟
          </h2>
          <p className="text-sm sm:text-base text-[#C8B9A6] mt-2.5">
            همین فرم را پر کنید؛ درخواست شما مستقیم در پنل مدیریت کارگاه ثبت می‌شود، کد پیگیری
            می‌گیرید و استادکار برای بررسی طرح، انتخاب چوب و اعلام قیمت دقیق با شما تماس می‌گیرد.
          </p>
        </div>

        <div className="glass-panel-elevated rounded-[28px] p-5 sm:p-8">
          {createdOrder ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 rounded-full bg-[#4E9F6E]/20 border-2 border-[#4E9F6E] flex items-center justify-center mx-auto text-[#4E9F6E]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#F7F2EB]">
                  درخواست شما برای کارگاه ارسال شد، {createdOrder.customer.fullName} عزیز
                </h3>
                <p className="text-xs sm:text-sm text-[#C8B9A6] mt-2 max-w-xl mx-auto leading-relaxed">
                  کد پیگیری درخواست شما{' '}
                  <strong className="text-[#E5B26D] font-mono">{createdOrder.code}</strong>{' '}
                  است. با همین کد و شماره موبایلتان از بخش «پیگیری سفارش» در هر لحظه وضعیت
                  بررسی را ببینید. استادکار حداکثر تا یک روز کاری برای هماهنگی تماس می‌گیرد.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-honey-gold px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  ارسال عکس ایده در واتساپ کارگاه
                </a>
                <button
                  type="button"
                  onClick={onOpenTracking}
                  className="glass-pill px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-[#F7F2EB] cursor-pointer"
                >
                  پیگیری همین درخواست
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreatedOrder(null);
                    setTitle('');
                    setDescription('');
                  }}
                  className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-[#C8B9A6] hover:text-[#F7F2EB] cursor-pointer"
                >
                  ثبت ایده‌ای دیگر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-[#D9534F]/20 border border-[#D9534F] text-xs sm:text-sm text-[#F7F2EB]">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1.5">نام و نام خانوادگی *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثلاً: سارا محمدی"
                      className="w-full glass-input rounded-xl pr-10 pl-3 py-3 text-xs sm:text-sm text-[#F7F2EB]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1.5">شماره موبایل (واتساپ) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="۰۹۱۲ ـــ ـــ ــ ــ"
                      className="w-full glass-input rounded-xl pr-10 pl-3 py-3 text-xs sm:text-sm text-[#F7F2EB]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#C8B9A6] mb-1.5">عنوان ایده یا طرح شما *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً: کتابخانه دیواری کوچک برای اتاق کودک، یا استند گلدان سه‌طبقه"
                  className="w-full glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F7F2EB]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#C8B9A6] mb-1.5">
                  توضیحات کامل طرح * (کاربرد، سبک، جزییاتی که دوست دارید)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="هرچه دقیق‌تر بنویسید، برآورد قیمت دقیق‌تر می‌شود؛ مثلاً: برای کنار مبل می‌خواهم، دو طبقه داشته باشد، رنگ چوب روشن باشد و لبه‌ها گرد باشند…"
                    className="w-full glass-input rounded-xl pr-10 pl-3 py-3 text-xs sm:text-sm text-[#F7F2EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1.5">چوب مورد علاقه</label>
                  <select
                    value={woodPreference}
                    onChange={(e) => setWoodPreference(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-3 text-xs sm:text-sm text-[#F7F2EB] cursor-pointer"
                  >
                    <option value="مشاوره کارگاه">مشاوره کارگاه</option>
                    {woods.map((wood) => (
                      <option key={wood.id} value={wood.name}>
                        {wood.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1.5">ابعاد تقریبی</label>
                  <div className="relative">
                    <Ruler className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="مثلاً: ۸۰ × ۳۰ سانتی‌متر"
                      className="w-full glass-input rounded-xl pr-10 pl-3 py-3 text-xs sm:text-sm text-[#F7F2EB]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1.5">بودجه مدنظر</label>
                  <div className="relative">
                    <Wallet className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full glass-input rounded-xl pr-10 pl-3 py-3 text-xs sm:text-sm text-[#F7F2EB] cursor-pointer"
                    >
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1.5">مهلت تحویل (اختیاری)</label>
                  <div className="relative">
                    <CalendarClock className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                    <input
                      type="text"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      placeholder="مثلاً: تا آخر ماه"
                      className="w-full glass-input rounded-xl pr-10 pl-3 py-3 text-xs sm:text-sm text-[#F7F2EB]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#C8B9A6] mb-1.5">
                  لینک عکس مرجع (اختیاری — یا بعداً در واتساپ بفرستید)
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    dir="ltr"
                    value={referenceLink}
                    onChange={(e) => setReferenceLink(e.target.value)}
                    placeholder="https://…"
                    className="w-full glass-input rounded-xl pr-10 pl-3 py-3 text-xs sm:text-sm text-[#F7F2EB] text-left"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-honey-gold py-4 rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>ثبت درخواست و ارسال مستقیم برای مدیریت کارگاه</span>
              </button>
              <p className="text-[11px] text-[#8A7968] text-center">
                با ثبت این فرم، درخواست شما با کد پیگیری در سیستم کارگاه ذخیره می‌شود و مدیر
                کارگاه آن را در پنل سفارش‌ها می‌بیند.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
