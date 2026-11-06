import type {
  FinishOption,
  OrderCartItem,
  SizeOption,
  WoodProduct,
  WoodSpecies,
} from '../data/products';

export type OrderStatus =
  | 'new'
  | 'reviewing'
  | 'awaiting-deposit'
  | 'in-progress'
  | 'quality-check'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export const ORDER_STATUSES: {
  id: OrderStatus;
  label: string;
  customerLabel: string;
  color: string;
  bg: string;
}[] = [
  { id: 'new', label: 'جدید', customerLabel: 'ثبت شده و در انتظار بررسی کارگاه', color: '#E5B26D', bg: 'rgba(212,155,84,.16)' },
  { id: 'reviewing', label: 'در حال بررسی', customerLabel: 'در حال بررسی و انتخاب اسلب چوب', color: '#7FB3E8', bg: 'rgba(127,179,232,.16)' },
  { id: 'awaiting-deposit', label: 'منتظر بیعانه', customerLabel: 'منتظر پرداخت بیعانه برای شروع ساخت', color: '#E8A87F', bg: 'rgba(232,168,127,.16)' },
  { id: 'in-progress', label: 'در حال ساخت', customerLabel: 'اثر شما در کارگاه در حال ساخت است', color: '#C99BE8', bg: 'rgba(201,155,232,.16)' },
  { id: 'quality-check', label: 'کنترل کیفیت و حکاکی', customerLabel: 'در مرحله حکاکی و کنترل کیفیت نهایی', color: '#7FE8D4', bg: 'rgba(127,232,212,.16)' },
  { id: 'shipped', label: 'ارسال شده', customerLabel: 'بسته ارسال شده و در مسیر تحویل است', color: '#9BE87F', bg: 'rgba(155,232,127,.16)' },
  { id: 'delivered', label: 'تحویل شده', customerLabel: 'سفارش با موفقیت تحویل داده شد', color: '#4E9F6E', bg: 'rgba(78,159,110,.2)' },
  { id: 'cancelled', label: 'لغو شده', customerLabel: 'این سفارش لغو شده است', color: '#E87F7F', bg: 'rgba(232,127,127,.16)' },
];

export function orderStatusMeta(status: OrderStatus) {
  return ORDER_STATUSES.find((s) => s.id === status) ?? ORDER_STATUSES[0];
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  contactChannel: 'whatsapp' | 'telegram' | 'call';
  note: string;
}

export interface CustomProjectInfo {
  title: string;
  description: string;
  woodPreference: string;
  dimensions: string;
  budget: string;
  deadline: string;
  referenceLink: string;
}

export interface Order {
  id: string;
  code: string;
  type: 'cart' | 'custom';
  customer: CustomerInfo;
  items: OrderCartItem[];
  customProject?: CustomProjectInfo;
  subtotal: number;
  shippingCost: number;
  discountAmount?: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  adminNote: string;
  createdAt: number;
  updatedAt: number;
  statusHistory: { status: OrderStatus; at: number }[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface SiteSettings {
  brandName: string;
  brandTagline: string;
  heroBadge: string;
  heroTitleLead: string;
  heroTitleAccent: string;
  heroTitleTail: string;
  heroSubtitle: string;
  heroImage: string;
  heroStats: HeroStat[];
  aboutText: string;
  footerNote: string;
  phoneDisplay: string;
  whatsappNumber: string;
  telegramId: string;
  instagramId: string;
  email: string;
  address: string;
  workingHours: string;
  shippingCost: number;
  freeShippingThreshold: number;
  giftBoxPrice: number;
  ratingSummary: string;
  adminPassword: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  priceLabel: string;
  features: string[];
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  productOrdered: string;
  rating: number;
  dateLabel: string;
  comment: string;
  active: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: number;
}

export interface Coupon {
  id: string;
  code: string;
  percent: number;
  minTotal: number;
  active: boolean;
  description: string;
}

export interface StudioDB {
  version: number;
  settings: SiteSettings;
  products: WoodProduct[];
  woods: WoodSpecies[];
  finishes: FinishOption[];
  sizes: SizeOption[];
  services: ServiceItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  orders: Order[];
  contactMessages: ContactMessage[];
  coupons: Coupon[];
}
