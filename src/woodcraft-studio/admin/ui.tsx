import React from 'react';
import { X } from 'lucide-react';

export const inputCls =
  'w-full glass-input rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F7F2EB] placeholder-[#8A7968]';

export const labelCls = 'block text-xs font-bold text-[#C8B9A6] mb-1.5';

export const Field: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className }) => (
  <div className={className}>
    <label className={labelCls}>{label}</label>
    {children}
  </div>
);

export const AdminModal: React.FC<{
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}> = ({ title, subtitle, onClose, children, wide }) => (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
    onClick={onClose}
  >
    <div
      className={`glass-panel-elevated rounded-[24px] w-full ${
        wide ? 'max-w-4xl' : 'max-w-2xl'
      } max-h-[92vh] overflow-y-auto p-5 sm:p-7 animate-fadeIn`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-3 pb-4 mb-5 border-b border-[#FFF0DC]/15">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#F7F2EB]">{title}</h3>
          {subtitle && <p className="text-[11px] text-[#C8B9A6] mt-0.5">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-[#C8B9A6] hover:text-[#F7F2EB] cursor-pointer shrink-0"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export const Toggle: React.FC<{
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}> = ({ checked, onChange, label }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="flex items-center gap-2.5 cursor-pointer"
  >
    <span
      className={`w-11 h-6 rounded-full p-1 transition-colors ${
        checked ? 'bg-[#4E9F6E]' : 'bg-white/15'
      }`}
    >
      <span
        className={`block w-4 h-4 rounded-full bg-white transition-transform ${
          checked ? '-translate-x-5' : ''
        }`}
      />
    </span>
    <span className="text-xs font-bold text-[#F7F2EB]">{label}</span>
  </button>
);

export function formatDateTime(ts: number): string {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toLocaleString('en-GB');
  }
}

export function downloadFile(filename: string, content: string, mime = 'application/json') {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
