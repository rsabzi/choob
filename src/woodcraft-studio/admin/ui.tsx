import React from 'react';
import { X } from 'lucide-react';

export const inputCls =
  'w-full glass-input rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F7F2EB] placeholder-[#8A7968]';

export const labelCls = 'block text-xs font-bold text-[#C8B9A6] mb-1.5';

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

function toEnglishNumberDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)));
}

function toPersianNumberDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

function cleanNumberInput(raw: string, decimal: boolean, allowNegative: boolean): string {
  let text = raw.replace(/[,،٬\s\u00A0]/g, '');
  const negative = allowNegative && text.trimStart().startsWith('-');
  text = text.replace(/-/g, '');

  if (decimal) {
    text = text.replace(/[٫/]/g, '.');
    const firstDot = text.indexOf('.');
    if (firstDot >= 0) {
      text = text.slice(0, firstDot + 1) + text.slice(firstDot + 1).replace(/\./g, '');
    }
    text = text.replace(/[^0-9۰-۹٠-٩.]/g, '');
  } else {
    text = text.replace(/[^0-9۰-۹٠-٩]/g, '');
  }

  return `${negative ? '-' : ''}${text}`;
}

function parseNumberInput(text: string): number {
  const normalized = toEnglishNumberDigits(text);
  if (!normalized || normalized === '-' || normalized === '.' || normalized === '-.') {
    return Number.NaN;
  }
  return Number(normalized);
}

function clampNumberInput(value: number, min?: number, max?: number): number {
  let next = value;
  if (min !== undefined) next = Math.max(min, next);
  if (max !== undefined) next = Math.min(max, next);
  return next;
}

function formatNumberInput(value: number, decimal: boolean, groupThousands: boolean): string {
  if (!Number.isFinite(value)) return '';
  if (!groupThousands) return toPersianNumberDigits(decimal ? String(value) : String(Math.trunc(value)));

  const sign = value < 0 ? '-' : '';
  const absolute = Math.abs(value);
  const [integerPart, fractionPart] = String(absolute).split('.');
  const groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return toPersianNumberDigits(
    `${sign}${groupedInteger}${fractionPart ? `.${fractionPart}` : ''}`
  );
}

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'type' | 'defaultValue'
  > {
  value: number;
  onChange: (value: number) => void;
  fallback?: number;
  decimal?: boolean;
  groupThousands?: boolean;
  min?: number;
  max?: number;
}

/**
 * Numeric input designed for the Persian admin panel.
 *
 * Unlike <input type="number">, this keeps the text being typed untouched:
 * the admin can clear the field completely, type Persian/Arabic/Latin digits,
 * paste amounts with thousand separators, and enter decimal multipliers.
 * The numeric value is clamped and formatted when the field loses focus.
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  fallback = 0,
  decimal = false,
  groupThousands = false,
  min,
  max,
  className = '',
  onFocus,
  onBlur,
  ...props
}) => {
  const [text, setText] = React.useState(() =>
    formatNumberInput(value, decimal, groupThousands)
  );
  const [isFocused, setIsFocused] = React.useState(false);
  const lastValueRef = React.useRef(value);

  React.useEffect(() => {
    if (isFocused || value === lastValueRef.current) return;
    lastValueRef.current = value;
    setText(formatNumberInput(value, decimal, groupThousands));
  }, [value, isFocused, decimal, groupThousands]);

  const emit = (next: number) => {
    lastValueRef.current = next;
    onChange(next);
  };

  return (
    <input
      {...props}
      type="text"
      dir="ltr"
      inputMode={decimal ? 'decimal' : 'numeric'}
      autoComplete="off"
      className={`${className} text-left`}
      value={text}
      onFocus={(event) => {
        setIsFocused(true);
        setText((current) => current.replace(/,/g, ''));
        onFocus?.(event);
      }}
      onChange={(event) => {
        const allowNegative = min === undefined || min < 0;
        const cleaned = cleanNumberInput(event.target.value, decimal, allowNegative);
        setText(cleaned);

        const parsed = parseNumberInput(cleaned);
        if (Number.isFinite(parsed)) {
          emit(decimal ? parsed : Math.trunc(parsed));
        }
      }}
      onBlur={(event) => {
        setIsFocused(false);
        const parsed = parseNumberInput(text);
        const normalized = Number.isFinite(parsed)
          ? clampNumberInput(decimal ? parsed : Math.trunc(parsed), min, max)
          : clampNumberInput(fallback, min, max);
        emit(normalized);
        setText(formatNumberInput(normalized, decimal, groupThousands));
        onBlur?.(event);
      }}
    />
  );
};

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
