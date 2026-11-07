import React, { useMemo, useState } from 'react';
import { Mail, MailOpen, Phone, Search, Send, Trash2 } from 'lucide-react';
import { toIntlPhone, toPersianDigits } from '../data/products';
import type { ContactMessage } from '../store/types';
import { formatDateTime, inputCls } from './ui';

interface AdminMessagesProps {
  messages: ContactMessage[];
  onMarkRead: (id: string, read: boolean) => void;
  onDelete: (id: string) => void;
}

export const AdminMessages: React.FC<AdminMessagesProps> = ({
  messages,
  onMarkRead,
  onDelete,
}) => {
  const [search, setSearch] = useState('');
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim();
    return messages.filter((m) => {
      if (onlyUnread && m.read) return false;
      if (!q) return true;
      return m.name.includes(q) || m.phone.includes(q) || m.subject.includes(q) || m.message.includes(q);
    });
  }, [messages, search, onlyUnread]);

  const selected = messages.find((m) => m.id === selectedId) ?? null;
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-4">
      <div className="glass-panel rounded-2xl p-3.5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8A7968] absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در پیام‌ها…"
            className={`${inputCls} pr-10`}
          />
        </div>
        <button
          type="button"
          onClick={() => setOnlyUnread((v) => !v)}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
            onlyUnread
              ? 'bg-[#D49B54] text-[#120E0A] border-[#D49B54]'
              : 'glass-pill text-[#F7F2EB]'
          }`}
        >
          فقط خوانده‌نشده‌ها ({toPersianDigits(unreadCount)})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
        {/* List */}
        <div className="lg:col-span-2 space-y-2.5">
          {filtered.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelectedId(m.id);
                if (!m.read) onMarkRead(m.id, true);
              }}
              className={`w-full text-right glass-panel rounded-2xl p-4 transition-all cursor-pointer ${
                selectedId === m.id ? 'border-[#D49B54]/70' : ''
              } ${!m.read ? 'bg-[#D49B54]/6' : ''}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-[#F7F2EB] flex items-center gap-2">
                  {m.read ? (
                    <MailOpen className="w-4 h-4 text-[#8A7968]" />
                  ) : (
                    <Mail className="w-4 h-4 text-[#D49B54]" />
                  )}
                  {m.name}
                </span>
                {!m.read && (
                  <span className="px-2 py-0.5 rounded-full bg-[#D9534F] text-white text-[10px] font-black">
                    جدید
                  </span>
                )}
              </div>
              <div className="text-[11px] text-[#E5B26D] font-bold mt-1">{m.subject}</div>
              <p className="text-[11px] text-[#8A7968] line-clamp-2 mt-1">{m.message}</p>
              <div className="text-[11px] text-[#8A7968] mt-2">{formatDateTime(m.createdAt)}</div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="glass-panel rounded-2xl p-8 text-center text-xs text-[#8A7968]">
              پیامی با این فیلتر پیدا نشد.
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="glass-panel-elevated rounded-[22px] p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#FFF0DC]/12">
                <div>
                  <h3 className="text-base font-black text-[#F7F2EB]">{selected.subject}</h3>
                  <div className="text-[11px] text-[#8A7968] mt-1">
                    از {selected.name} • <span dir="ltr">{selected.phone}</span> •{' '}
                    {formatDateTime(selected.createdAt)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('این پیام حذف شود؟')) {
                      onDelete(selected.id);
                      setSelectedId(null);
                    }
                  }}
                  className="w-9 h-9 rounded-lg bg-[#D9534F]/10 border border-[#D9534F]/30 flex items-center justify-center text-[#E87F7F] cursor-pointer shrink-0"
                  title="حذف پیام"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-[#F7F2EB]/90 leading-loose whitespace-pre-line">
                {selected.message}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={`https://wa.me/${toIntlPhone(selected.phone)}?text=${encodeURIComponent(`سلام ${selected.name} عزیز، درباره پیامتان با موضوع «${selected.subject}» از کارگاه اُرسی پاسخ می‌دهم.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#4E9F6E]/20 border border-[#4E9F6E]/50 text-[#7FCB9B] text-xs font-bold flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> پاسخ در واتساپ
                </a>
                <a
                  href={`tel:${selected.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#F7F2EB] text-xs font-bold flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> تماس تلفنی
                </a>
                <button
                  type="button"
                  onClick={() => onMarkRead(selected.id, !selected.read)}
                  className="glass-pill px-4 py-2.5 rounded-xl text-xs font-bold text-[#F7F2EB] cursor-pointer"
                >
                  {selected.read ? 'علامت‌گذاری به‌عنوان خوانده‌نشده' : 'علامت‌گذاری به‌عنوان خوانده‌شده'}
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-[22px] p-10 text-center text-xs text-[#8A7968]">
              یک پیام را از فهرست انتخاب کنید تا متن کامل و راه‌های پاسخ نمایش داده شود.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
