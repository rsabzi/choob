import React, { useState } from 'react';
import {
  MessageSquare,
  PhoneCall,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  User,
  Phone,
  Mail,
} from 'lucide-react';
import { normalizeIranPhone } from '../data/products';
import type { SiteSettings } from '../store/types';

interface ContactSectionProps {
  settings: SiteSettings;
  onSubmitMessage: (input: {
    name: string;
    phone: string;
    subject: string;
    message: string;
  }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  onSubmitMessage,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('مشاوره خرید و انتخاب چوب');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPhone = normalizeIranPhone(phone);
    if (name.trim().length < 3) {
      setError('لطفاً نام خود را کامل وارد کنید.');
      return;
    }
    if (!normalizedPhone) {
      setError('شماره موبایل معتبر نیست؛ شماره باید ۱۱ رقمی و با ۰۹ شروع شود.');
      return;
    }
    if (message.trim().length < 5) {
      setError('لطفاً متن پیام را بنویسید.');
      return;
    }
    setError('');
    onSubmitMessage({
      name: name.trim(),
      phone: normalizedPhone,
      subject,
      message: message.trim(),
    });
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[420px] h-[300px] rounded-full bg-[#D49B54]/8 blur-[130px]" />
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-bold text-[#D49B54] mb-3 border border-[#D49B54]/30">
            <MessageSquare className="w-4 h-4" />
            <span>گفتگوی مستقیم با کارگاه</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#F7F2EB] tracking-tight">
            سوالی دارید؟ همینجا پیامتان را بنویسید
          </h2>
          <p className="text-sm sm:text-base text-[#C8B9A6] mt-2.5">
            پیام شما مستقیم در پنل مدیریت کارگاه می‌نشیند و حداکثر تا یک روز کاری پاسخ
            می‌گیرید. برای سفارش ساخت، فرم «سفارش طرح دلخواه» در بالای همین صفحه دقیق‌تر است.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="glass-panel rounded-2xl p-5 flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#D49B54]/15 border border-[#D49B54]/35 flex items-center justify-center text-[#D49B54] shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#8A7968] font-bold">تلفن و واتساپ</div>
                <div className="text-sm font-extrabold text-[#F7F2EB] mt-0.5">
                  {settings.phoneDisplay}
                </div>
                <div className="text-[11px] text-[#C8B9A6]">
                  تلگرام <span dir="ltr">@{settings.telegramId}</span> • اینستاگرام{' '}
                  <span dir="ltr">@{settings.instagramId}</span>
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-5 flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#D49B54]/15 border border-[#D49B54]/35 flex items-center justify-center text-[#D49B54] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#8A7968] font-bold">نشانی کارگاه</div>
                <div className="text-xs sm:text-sm font-bold text-[#F7F2EB] mt-0.5 leading-relaxed">
                  {settings.address}
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-5 flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#D49B54]/15 border border-[#D49B54]/35 flex items-center justify-center text-[#D49B54] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#8A7968] font-bold">ساعات پاسخگویی</div>
                <div className="text-sm font-extrabold text-[#F7F2EB] mt-0.5">
                  {settings.workingHours}
                </div>
                <div className="text-[11px] text-[#C8B9A6] flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span dir="ltr">{settings.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 glass-panel-elevated rounded-[24px] p-5 sm:p-7">
            {sent ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#4E9F6E]/20 border-2 border-[#4E9F6E] flex items-center justify-center mx-auto text-[#4E9F6E]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-[#F7F2EB]">
                  پیامتان به دست کارگاه رسید، {name} عزیز
                </h3>
                <p className="text-xs sm:text-sm text-[#C8B9A6] max-w-md mx-auto leading-relaxed">
                  مدیریت کارگاه پیامتان را می‌خواند و از طریق شماره‌ای که ثبت کردید پاسخ
                  می‌دهد. اگر موضوعتان سفارش ساخت است، سریع‌تر است که فرم «سفارش طرح دلخواه»
                  را پر کنید.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setMessage('');
                  }}
                  className="glass-pill px-5 py-2.5 rounded-xl text-xs font-bold text-[#F7F2EB] cursor-pointer"
                >
                  نوشتن پیام دیگری
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-[#D9534F]/20 border border-[#D9534F] text-xs text-[#F7F2EB]">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#C8B9A6] mb-1.5">نام شما *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-3.5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="مثلاً: الهام کریمی"
                        className="w-full glass-input rounded-xl pr-10 pl-3 py-3 text-xs sm:text-sm text-[#F7F2EB]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#C8B9A6] mb-1.5">شماره موبایل *</label>
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
                  <label className="block text-xs text-[#C8B9A6] mb-1.5">موضوع پیام</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-3 text-xs sm:text-sm text-[#F7F2EB] cursor-pointer"
                  >
                    <option>مشاوره خرید و انتخاب چوب</option>
                    <option>سوال درباره یک محصول مشخص</option>
                    <option>هدایای سازمانی و سفارش تعداد بالا</option>
                    <option>پیگیری یا تغییر سفارش قبلی</option>
                    <option>بازسازی و تعمیر وسیله چوبی</option>
                    <option>سایر موضوعات</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#C8B9A6] mb-1.5">متن پیام *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="هر سوالی درباره چوب، ساخت، قیمت یا زمان تحویل دارید بنویسید…"
                    className="w-full glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F7F2EB]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-honey-gold py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  ارسال پیام برای مدیریت کارگاه
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
