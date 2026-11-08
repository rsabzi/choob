import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { OrderCartItem } from '../data/products';
import { normalizeIranPhone } from '../data/products';
import { createSeedDB } from './seed';
import type {
  CustomProjectInfo,
  CustomerInfo,
  Order,
  StudioDB,
} from './types';

const DB_KEY = 'orsi-studio-db-v1';
const CART_KEY = 'orsi-studio-cart-v1';
const ADMIN_KEY = 'orsi-studio-admin-session';

export function uid(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function loadDB(): StudioDB {
  const seed = createSeedDB();
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as Partial<StudioDB>;
    const mergedSettings = { ...seed.settings, ...(parsed.settings ?? {}) };
    // One-time migration: browsers that visited the demo build still hold the
    // sample contact details. Replace only those exact placeholders with the
    // site owner's real contacts; anything the admin customized stays untouched.
    const legacySampleContacts = {
      phoneDisplay: '۰۹۱۲ - ۴۸۰ - ۹۲۱۰',
      whatsappNumber: '989124809210',
      telegramId: 'orsiwood',
      instagramId: 'orsi.woodstudio',
      email: 'hello@example.com',
    } as const;
    (
      Object.keys(legacySampleContacts) as (keyof typeof legacySampleContacts)[]
    ).forEach((key) => {
      if (mergedSettings[key] === legacySampleContacts[key]) {
        mergedSettings[key] = seed.settings[key];
      }
    });
    return {
      ...seed,
      ...parsed,
      version: Math.max(parsed.version ?? 1, seed.version),
      settings: mergedSettings,
      products: Array.isArray(parsed.products) ? parsed.products : seed.products,
      woods: Array.isArray(parsed.woods) && parsed.woods.length ? parsed.woods : seed.woods,
      finishes:
        Array.isArray(parsed.finishes) && parsed.finishes.length
          ? parsed.finishes
          : seed.finishes,
      sizes: Array.isArray(parsed.sizes) && parsed.sizes.length ? parsed.sizes : seed.sizes,
      services: Array.isArray(parsed.services) ? parsed.services : seed.services,
      testimonials: Array.isArray(parsed.testimonials)
        ? parsed.testimonials
        : seed.testimonials,
      faqs: Array.isArray(parsed.faqs) ? parsed.faqs : seed.faqs,
      orders: Array.isArray(parsed.orders) ? parsed.orders : seed.orders,
      contactMessages: Array.isArray(parsed.contactMessages)
        ? parsed.contactMessages
        : seed.contactMessages,
      coupons: Array.isArray(parsed.coupons) ? parsed.coupons : seed.coupons,
    };
  } catch {
    return seed;
  }
}

function loadCart(): OrderCartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export interface CreateOrderInput {
  type: 'cart' | 'custom';
  customer: CustomerInfo;
  items: OrderCartItem[];
  customProject?: CustomProjectInfo;
  subtotal: number;
  shippingCost: number;
  discountAmount?: number;
  couponCode?: string;
  total: number;
}

interface StudioContextValue {
  db: StudioDB;
  updateDB: (updater: (db: StudioDB) => StudioDB) => void;
  replaceDB: (next: StudioDB) => void;
  resetDB: () => void;
  cartItems: OrderCartItem[];
  cartCount: number;
  addToCart: (item: OrderCartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  createOrder: (input: CreateOrderInput) => Order;
  submitContactMessage: (input: {
    name: string;
    phone: string;
    subject: string;
    message: string;
  }) => void;
  findOrder: (code: string, phone: string) => Order | undefined;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [db, setDb] = useState<StudioDB>(loadDB);
  const dbRef = useRef(db);
  dbRef.current = db;
  const [cartItems, setCartItems] = useState<OrderCartItem[]>(loadCart);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(db));
    } catch {
      // Storage might be full (e.g. large imported data) — keep app running in-memory.
    }
  }, [db]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore persistence errors
    }
  }, [cartItems]);

  const updateDB = useCallback((updater: (db: StudioDB) => StudioDB) => {
    setDb((prev) => updater(prev));
  }, []);

  const replaceDB = useCallback((next: StudioDB) => setDb(next), []);

  const resetDB = useCallback(() => {
    setDb(createSeedDB());
    setCartItems([]);
  }, []);

  const addToCart = useCallback((item: OrderCartItem) => {
    setCartItems((prev) => [item, ...prev]);
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  }, []);

  const updateCartQuantity = useCallback((cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((it) =>
        it.cartItemId === cartItemId
          ? { ...it, quantity: Math.max(1, it.quantity + delta) }
          : it
      )
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const createOrder = useCallback((input: CreateOrderInput): Order => {
    let code = '';
    do {
      code = `ORSI-${Math.floor(10000 + Math.random() * 90000)}`;
    } while (dbRef.current.orders.some((o) => o.code === code));
    const nowTs = Date.now();
    const created: Order = {
      id: uid('order'),
      code,
      type: input.type,
      customer: input.customer,
      items: input.items,
      customProject: input.customProject,
      subtotal: input.subtotal,
      shippingCost: input.shippingCost,
      discountAmount: input.discountAmount ?? 0,
      couponCode: input.couponCode,
      total: input.total,
      status: 'new',
      adminNote: '',
      createdAt: nowTs,
      updatedAt: nowTs,
      statusHistory: [{ status: 'new', at: nowTs }],
    };
    setDb((prev) => ({ ...prev, orders: [created, ...prev.orders] }));
    return created;
  }, []);

  const submitContactMessage = useCallback(
    (input: { name: string; phone: string; subject: string; message: string }) => {
      const msg = {
        id: uid('msg'),
        name: input.name,
        phone: input.phone,
        subject: input.subject,
        message: input.message,
        read: false,
        createdAt: Date.now(),
      };
      setDb((prev) => ({ ...prev, contactMessages: [msg, ...prev.contactMessages] }));
    },
    []
  );

  const findOrder = useCallback(
    (code: string, phone: string): Order | undefined => {
      const normalizedCode = code.trim().toUpperCase();
      const normalizedPhone = normalizeIranPhone(phone) ?? phone.trim();
      return db.orders.find(
        (o) =>
          o.code.toUpperCase() === normalizedCode &&
          (normalizeIranPhone(o.customer.phone) ?? o.customer.phone) === normalizedPhone
      );
    },
    [db.orders]
  );

  const login = useCallback(
    (password: string): boolean => {
      if (password === db.settings.adminPassword) {
        try {
          sessionStorage.setItem(ADMIN_KEY, '1');
        } catch {
          // ignore
        }
        setIsAdmin(true);
        return true;
      }
      return false;
    },
    [db.settings.adminPassword]
  );

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(ADMIN_KEY);
    } catch {
      // ignore
    }
    setIsAdmin(false);
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo<StudioContextValue>(
    () => ({
      db,
      updateDB,
      replaceDB,
      resetDB,
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      createOrder,
      submitContactMessage,
      findOrder,
      isAdmin,
      login,
      logout,
    }),
    [
      db,
      updateDB,
      replaceDB,
      resetDB,
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      createOrder,
      submitContactMessage,
      findOrder,
      isAdmin,
      login,
      logout,
    ]
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
};

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error('useStudio must be used inside <StudioProvider>');
  return ctx;
}
