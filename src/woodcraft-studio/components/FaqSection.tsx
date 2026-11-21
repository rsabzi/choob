import React, { useState } from 'react';
import { CircleHelp, ChevronDown, PhoneCall } from 'lucide-react';
import { toIntlPhone } from '../data/products';
import type { FaqItem } from '../store/types';

interface FaqSectionProps {
  faqs: FaqItem[];
  phoneDisplay: string;
  onOpenTracking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, phoneDisplay, onOpenTracking }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24 overflow-x-clip">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-bold text-[#D49B54] mb-3 border border-[#D49B54]/30">
            <CircleHelp className="w-4 h-4" />
            <span>پاسخ سوال‌های پرتکرار</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#F7F2EB] tracking-tight">
            قبل از سفارش، هرچه لازم است بدانید
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const open = openId === faq.id;
            return (
              <div key={faq.id} className="glass-panel rounded-2xl overflow-hidden">
                <button
                  type="button"
                  id={`faq-button-${faq.id}`}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${faq.id}`}
                  onClick={() => setOpenId(open ? null : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-right cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-extrabold text-[#F7F2EB]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D49B54] shrink-0 transition-transform ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {open && (
                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-button-${faq.id}`}
                    className="px-5 pb-5 text-xs sm:text-sm text-[#C8B9A6] leading-relaxed border-t border-[#FFF0DC]/8 pt-4"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="glass-panel rounded-2xl mt-6 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-[#D49B54]" />
            <p className="text-xs sm:text-sm text-[#C8B9A6]">
              سوال دیگری دارید یا وضعیت سفارشتان را می‌خواهید بدانید؟ با کارگاه در تماس باشید:{' '}
              <a href={`tel:+${toIntlPhone(phoneDisplay)}`} className="font-extrabold text-[#F7F2EB] hover:text-[#E5B26D]">
                {phoneDisplay}
              </a>
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenTracking}
            className="btn-honey-gold px-5 py-2.5 rounded-xl text-xs font-extrabold shrink-0 cursor-pointer"
          >
            پیگیری سفارش من
          </button>
        </div>
      </div>
    </section>
  );
};
