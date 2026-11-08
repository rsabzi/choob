import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { toIntlPhone } from '../data/products';
import type { SiteSettings } from '../store/types';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 496 512" fill="currentColor" className={className} aria-hidden="true">
    <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" />
  </svg>
);

interface FloatingContactDockProps {
  settings: SiteSettings;
}

export const FloatingContactDock: React.FC<FloatingContactDockProps> = ({ settings }) => {
  const intlPhone = toIntlPhone(settings.whatsappNumber || settings.phoneDisplay);
  const telegramId = settings.telegramId.replace(/^@+/, '').trim();
  const whatsappText = encodeURIComponent(
    `سلام وقت بخیر، از وب‌سایت ${settings.brandName} پیام می‌دهم و درباره محصولات و ثبت سفارش راهنمایی می‌خواهم.`
  );

  const buttonBase =
    'h-11 min-w-11 px-0 min-[420px]:px-3.5 rounded-full flex items-center justify-center gap-2 text-xs font-extrabold shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70';

  return (
    <aside
      aria-label="تماس سریع با صاحب کارگاه"
      className="fixed z-40 bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 sm:left-5 sm:translate-x-0 animate-fadeIn"
    >
      <div className="glass-panel-elevated rounded-full p-1.5 flex items-center gap-1.5 border-[#D49B54]/40">
        <span className="hidden lg:flex items-center gap-1.5 pl-2 pr-1.5 text-[11px] font-extrabold text-[#E5B26D] whitespace-nowrap">
          <MessageSquare className="w-4 h-4" />
          تماس سریع
        </span>

        {intlPhone && (
          <a
            href={`https://wa.me/${intlPhone}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} bg-[#25D366] text-[#062E16] hover:bg-[#3EE075]`}
            aria-label={`ارسال پیام واتساپ به ${settings.phoneDisplay}`}
            title={`واتساپ: ${settings.phoneDisplay}`}
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            <span className="hidden min-[420px]:inline">واتساپ</span>
          </a>
        )}

        {telegramId && (
          <a
            href={`https://t.me/${telegramId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} bg-[#229ED9] text-white hover:bg-[#3DB4EC]`}
            aria-label={`ارسال پیام تلگرام به ${telegramId}`}
            title={`تلگرام: @${telegramId}`}
          >
            <TelegramIcon className="w-5 h-5 shrink-0" />
            <span className="hidden min-[420px]:inline">تلگرام</span>
          </a>
        )}

        {intlPhone && (
          <a
            href={`tel:+${intlPhone}`}
            className={`${buttonBase} btn-honey-gold`}
            aria-label={`تماس تلفنی با ${settings.phoneDisplay}`}
            title={`تماس: ${settings.phoneDisplay}`}
          >
            <PhoneCall className="w-5 h-5 shrink-0" />
            <span className="hidden min-[420px]:inline">تماس تلفنی</span>
          </a>
        )}
      </div>
    </aside>
  );
};
