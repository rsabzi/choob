import React from 'react';
import {
  Hammer,
  PenTool,
  Gift,
  Store,
  Wrench,
  TreePine,
  Sparkles,
  Check,
  ArrowLeft,
  Layers,
} from 'lucide-react';
import type { ServiceItem } from '../store/types';

export const SERVICE_ICON_OPTIONS = [
  { id: 'Hammer', label: 'چکش (ساخت سفارشی)' },
  { id: 'PenTool', label: 'قلم (حکاکی)' },
  { id: 'Gift', label: 'هدیه (سازمانی)' },
  { id: 'Store', label: 'فروشگاه (دکور تجاری)' },
  { id: 'Wrench', label: 'آچار (تعمیر و بازسازی)' },
  { id: 'TreePine', label: 'درخت (مشاوره چوب)' },
  { id: 'Layers', label: 'لایه‌ها (عمومی)' },
  { id: 'Sparkles', label: 'درخشش (ویژه)' },
];

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const cls = className ?? 'w-6 h-6';
  switch (name) {
    case 'PenTool':
      return <PenTool className={cls} />;
    case 'Gift':
      return <Gift className={cls} />;
    case 'Store':
      return <Store className={cls} />;
    case 'Wrench':
      return <Wrench className={cls} />;
    case 'TreePine':
      return <TreePine className={cls} />;
    case 'Layers':
      return <Layers className={cls} />;
    case 'Sparkles':
      return <Sparkles className={cls} />;
    default:
      return <Hammer className={cls} />;
  }
}

interface ServicesSectionProps {
  services: ServiceItem[];
  onStartCustomProject: () => void;
  onJumpToCustomizer: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onStartCustomProject,
  onJumpToCustomizer,
}) => {
  if (services.length === 0) return null;
  return (
    <section id="services" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24 overflow-x-clip">
      <div className="pointer-events-none absolute top-0 right-1/3 w-[480px] h-[300px] rounded-full bg-[#D49B54]/8 blur-[130px]" />
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-bold text-[#D49B54] mb-3 border border-[#D49B54]/30">
            <Layers className="w-4 h-4" />
            <span>خدمات تخصصی کارگاه اُرسی</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#F7F2EB] tracking-tight">
            فراتر از یک فروشگاه؛ یک کارگاه تمام‌عیار چوب
          </h2>
          <p className="text-sm sm:text-base text-[#C8B9A6] mt-2.5">
            از ساخت تک‌نسخه روی عکس تا هدایای سازمانی و دکور فضای تجاری — هر آنچه با چوب طبیعی
            می‌شود ساخت، اینجا با دست ساخته می‌شود.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="glass-card-interactive rounded-[24px] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#D49B54]/15 border border-[#D49B54]/35 flex items-center justify-center text-[#D49B54]">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#4E9F6E]/15 border border-[#4E9F6E]/30 text-[11px] font-bold text-[#7FCB9B] min-w-0 text-center leading-relaxed">
                    {service.priceLabel}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#F7F2EB]">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#C8B9A6] mt-2 leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#F7F2EB]/85">
                      <Check className="w-4 h-4 text-[#4E9F6E] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={service.id.includes('engraving') ? onJumpToCustomizer : onStartCustomProject}
                className="mt-6 w-full glass-pill hover:border-[#D49B54]/60 py-3 rounded-xl text-xs font-bold text-[#F7F2EB] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>شروع این خدمت</span>
                <ArrowLeft className="w-4 h-4 text-[#D49B54]" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
