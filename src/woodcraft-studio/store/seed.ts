import {
  FINISH_OPTIONS,
  PRODUCTS,
  SIZE_OPTIONS,
  WOOD_SPECIES,
} from '../data/products';
import type { Order, StudioDB } from './types';

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

function seedOrders(): Order[] {
  const walnut = WOOD_SPECIES.walnut;
  const oak = WOOD_SPECIES.oak;
  const olive = WOOD_SPECIES.olive;
  const clock = PRODUCTS[0];
  const dock = PRODUCTS[2];
  const stand = PRODUCTS[1];

  const item = (
    cartItemId: string,
    product: typeof clock,
    wood: typeof walnut,
    unitPrice: number,
    engravingText = ''
  ) => ({
    cartItemId,
    productId: product.id,
    title: product.title,
    categoryLabel: product.categoryLabel,
    image: product.image,
    wood,
    finish: FINISH_OPTIONS[0],
    size: SIZE_OPTIONS[0],
    engravingText,
    engravingFont: 'nastaaliq' as const,
    giftPackaging: false,
    quantity: 1,
    unitPrice,
  });

  return [
    {
      id: 'seed-order-1',
      code: 'ORSI-10482',
      type: 'cart',
      customer: {
        fullName: 'آرش کامرانی',
        phone: '09123456789',
        city: 'تهران',
        address: 'الهیه، خیابان فرشته، پلاک ۱۲',
        contactChannel: 'whatsapp',
        note: 'لطفاً رگه‌های چوب تیره‌تر انتخاب شود.',
      },
      items: [
        item('seed-item-1', clock, walnut, 3190000, 'خانواده کامرانی'),
        item('seed-item-2', stand, oak, 2190000),
      ],
      subtotal: 5380000,
      shippingCost: 0,
      total: 5380000,
      status: 'in-progress',
      adminNote: 'اسلب گردو تایید شد؛ برش اولیه انجام شده است.',
      createdAt: now - 3 * day,
      updatedAt: now - 6 * 60 * 60 * 1000,
      statusHistory: [
        { status: 'new', at: now - 3 * day },
        { status: 'reviewing', at: now - 3 * day + 3600000 },
        { status: 'awaiting-deposit', at: now - 2 * day },
        { status: 'in-progress', at: now - 1 * day },
      ],
    },
    {
      id: 'seed-order-2',
      code: 'ORSI-10491',
      type: 'cart',
      customer: {
        fullName: 'نیلوفر ستوده',
        phone: '09133124567',
        city: 'اصفهان',
        address: 'چهارباغ بالا، مجتمع پارک، واحد ۸',
        contactChannel: 'telegram',
        note: 'برای هدیه تولد است؛ بسته‌بندی کادویی مهم است.',
      },
      items: [item('seed-item-3', dock, olive, 1730000, '۱۴۰۰/۰۹/۱۴')],
      subtotal: 1730000,
      shippingCost: 120000,
      total: 1850000,
      status: 'new',
      adminNote: '',
      createdAt: now - 5 * 60 * 60 * 1000,
      updatedAt: now - 5 * 60 * 60 * 1000,
      statusHistory: [{ status: 'new', at: now - 5 * 60 * 60 * 1000 }],
    },
    {
      id: 'seed-order-3',
      code: 'ORSI-10477',
      type: 'custom',
      customer: {
        fullName: 'سروش مجد',
        phone: '09171112233',
        city: 'شیراز',
        address: 'قصرالدشت، دفتر استودیو معماری مجد',
        contactChannel: 'call',
        note: 'برای هدایای پایان سال شرکت؛ فاکتور رسمی لازم است.',
      },
      items: [],
      customProject: {
        title: '۱۲ عدد ست رومیزی سازمانی با لوگوی استودیو',
        description:
          'ست نظم‌دهنده رومیزی چوب گردو با حکاکی لوگوی استودیو معماری روی قطعه اصلی؛ مشابه ست آتلیه سایت ولی با ابعاد کمی بزرگ‌تر.',
        woodPreference: 'چوب گردو سیاه',
        dimensions: '۴۰ × ۱۸ سانتی‌متر',
        budget: 'بین ۲۰ تا ۳۰ میلیون تومان',
        deadline: 'تا پایان اسفند',
        referenceLink: '',
      },
      subtotal: 0,
      shippingCost: 0,
      total: 0,
      status: 'reviewing',
      adminNote: 'پیش‌فاکتور در حال آماده‌سازی است.',
      createdAt: now - 1 * day,
      updatedAt: now - 2 * 60 * 60 * 1000,
      statusHistory: [
        { status: 'new', at: now - 1 * day },
        { status: 'reviewing', at: now - 2 * 60 * 60 * 1000 },
      ],
    },
    {
      id: 'seed-order-4',
      code: 'ORSI-10455',
      type: 'cart',
      customer: {
        fullName: 'مریم رضایی',
        phone: '09359874521',
        city: 'مشهد',
        address: 'بلوار سجاد، خیابان بهار، پلاک ۳',
        contactChannel: 'whatsapp',
        note: '',
      },
      items: [item('seed-item-4', PRODUCTS[4], olive, 4560000)],
      subtotal: 4560000,
      shippingCost: 0,
      total: 4560000,
      status: 'delivered',
      adminNote: 'تحویل داده شد؛ مشتری از رگه چوب بسیار راضی بود.',
      createdAt: now - 12 * day,
      updatedAt: now - 8 * day,
      statusHistory: [
        { status: 'new', at: now - 12 * day },
        { status: 'reviewing', at: now - 11 * day },
        { status: 'in-progress', at: now - 10 * day },
        { status: 'shipped', at: now - 9 * day },
        { status: 'delivered', at: now - 8 * day },
      ],
    },
  ];
}

export function createSeedDB(): StudioDB {
  return {
    version: 1,
    settings: {
      brandName: 'استودیو چوب و هنر اُرسی',
      brandTagline: 'ساعت دیواری، استند لپ‌تاپ و اکسسوری‌های تزیینی چوب طبیعی',
      heroBadge: 'دست‌سازه‌های تزیینی چوب طبیعی با حکاکی اختصاصی نام شما',
      heroTitleLead: 'گرمای اصیل چوب،',
      heroTitleAccent: 'تراش‌خورده با دست',
      heroTitleTail: 'برای میز کار و دیوارهای خاص شما',
      heroSubtitle:
        'در آتلیه نجاری اُرسی، هر تکه چوب گردو، بلوط و زیتون با ظرافت ساعت‌سازی به ساعت‌های دیواری مدرن، استند لپ‌تاپ و موبایل، جاکلیدی‌های مغناطیسی و اکسسوری‌های دکوراتیو تبدیل می‌شود؛ آثاری که با دیدن و لمس رگه‌های طبیعی‌شان، فضای شما را متمایز می‌کنند.',
      heroImage: '/images/hero-desk-setup.jpg',
      heroStats: [
        { value: '۵ سال ضمانت', label: 'سلامت بافت چوب و موتور ساعت' },
        { value: '+۱۴۸۰ سفارش موفق', label: 'ارسال ایمن به سراسر ایران' },
        { value: 'حکاکی رایگان لیزری', label: 'نام، تاریخ یا لوگوی دلخواه شما' },
      ],
      aboutText:
        'ما در آتلیه اُرسی با ترکیب چوب‌های اصیل گردو، بلوط، راش و زیتون با یراق‌آلات برنجی دست‌ساز، اشیایی می‌سازیم که هر روز روی میز کار یا دیوار خانه‌تان از تماشا و لمس آن‌ها لذت ببرید.',
      footerNote: 'ساخته‌شده با عشق به چوب طبیعی و هنر دست نجاران ایرانی',
      phoneDisplay: '۰۹۱۲ - ۴۸۰ - ۹۲۱۰',
      whatsappNumber: '989124809210',
      telegramId: 'orsiwood',
      instagramId: 'orsi.woodstudio',
      email: 'hello@example.com',
      address: 'تهران، شهرک صنعتی چهارصددستگاه (بازدید حضوری از اسلب‌ها با هماهنگی قبلی)',
      workingHours: 'شنبه تا پنج‌شنبه ساعت ۹ تا ۲۱',
      shippingCost: 120000,
      freeShippingThreshold: 3000000,
      giftBoxPrice: 240000,
      ratingSummary: 'امتیاز ۴.۹ از ۵ (بر اساس +۳۴۰ نظر ثبت‌شده)',
      adminPassword: 'admin123',
    },
    products: PRODUCTS.map((p) => ({ ...p, isActive: true })),
    woods: Object.values(WOOD_SPECIES),
    finishes: FINISH_OPTIONS.map((f) => ({ ...f })),
    sizes: SIZE_OPTIONS.map((s) => ({ ...s })),
    services: [
      {
        id: 'service-bespoke',
        icon: 'Hammer',
        title: 'ساخت سفارشی از روی عکس یا ایده',
        description:
          'عکس، اسکچ یا حتی توضیح متنی ایده‌تان را بفرستید؛ همان طرح را با چوب طبیعی و ابعاد دقیق فضای شما می‌سازیم.',
        priceLabel: 'قیمت پس از بررسی طرح اعلام می‌شود',
        features: ['بررسی رایگان ایده و ارائه پیش‌فاکتور', 'ارسال تصویر اسلب چوب پیش از برش', 'امکان تغییر ابعاد، چوب و پرداخت'],
        active: true,
      },
      {
        id: 'service-engraving',
        icon: 'PenTool',
        title: 'حکاکی لیزری اختصاصی',
        description:
          'حکاکی نام، تاریخ خاص، شعر کوتاه یا لوگوی برند شما با سه سبک خط روی تمام دست‌سازه‌های کارگاه.',
        priceLabel: 'رایگان روی تمام سفارش‌ها',
        features: ['پیش‌نمایش زنده حکاکی در سایت', 'سه سبک خط: کلاسیک، مدرن و مینیمال', 'حکاکی لوگوی سازمانی با فایل برداری'],
        active: true,
      },
      {
        id: 'service-corporate',
        icon: 'Gift',
        title: 'هدایای سازمانی و مدیریتی',
        description:
          'ست‌های رومیزی و اکسسوری‌های چوبی با حکاکی لوگوی شرکت، بسته‌بندی لوکس و کارت اصالت برای مشتریان و همکاران VIP شما.',
        priceLabel: 'تخفیف پلکانی از ۱۰ عدد به بالا',
        features: ['حکاکی لوگو و پیام اختصاصی', 'بسته‌بندی موم‌مهر شده با هویت برند شما', 'صدور فاکتور رسمی و قرارداد سازمانی'],
        active: true,
      },
      {
        id: 'service-decor',
        icon: 'Store',
        title: 'دکور چوبی کافی‌شاپ و فروشگاه',
        description:
          'طراحی و ساخت المان‌های دکوراتیو چوب طبیعی برای کافی‌شاپ‌ها، رستوران‌ها و بوتیک‌ها؛ از تابلوی دیواری تا استند محصول.',
        priceLabel: 'بازدید و مشاوره اولیه رایگان',
        features: ['بازدید و اندازه‌گیری در محل (تهران)', 'چوب‌های مقاوم به رطوبت و حرارت', 'اجرای مرحله‌ای بدون تعطیلی کسب‌وکار'],
        active: true,
      },
      {
        id: 'service-repair',
        icon: 'Wrench',
        title: 'بازسازی و احیای ظروف و وسایل چوبی قدیمی',
        description:
          'وسایل چوبی ارزشمند و خاطره‌سازتان را با سنباده‌زنی حرفه‌ای، روغن‌کاری گیاهی و تعمیر اتصالات مثل روز اول تحویل بگیرید.',
        priceLabel: 'بر اساس وضعیت قطعه، پس از بررسی عکس',
        features: ['بررسی با ارسال عکس در واتساپ', 'استفاده از روغن‌های گیاهی خوراکی', 'حفظ اصالت و پتینه طبیعی چوب کهنه'],
        active: true,
      },
      {
        id: 'service-consult',
        icon: 'TreePine',
        title: 'مشاوره انتخاب چوب و چیدمان',
        description:
          'نمی‌دانید کدام چوب با نور و سبک فضای شما هماهنگ‌تر است؟ نمونه رگه‌ها را می‌فرستیم و در انتخاب کنارتان هستیم.',
        priceLabel: 'کاملاً رایگان',
        features: ['ارسال عکس اسلب‌های واقعی موجود', 'پیشنهاد بر اساس نور و رنگ فضای شما', 'بدون هیچ تعهدی برای خرید'],
        active: true,
      },
    ],
    testimonials: [
      {
        id: 'rev-1',
        name: 'مهندس آرش کامرانی',
        city: 'تهران — الهیه',
        productOrdered: 'ساعت دیواری آوروم (چوب گردو سیاه) + استند لپ‌تاپ آرک',
        rating: 5,
        dateLabel: '۲ هفته پیش',
        comment:
          'کیفیت پرداخت چوب گردو واقعاً در حد برندهای لوکس اروپایی است. وقتی بسته را باز کردم بوی ملایم موم طبیعی و چوب کل اتاق کارم را پر کرد. قبل از ارسال هم عکس سه تا اسلب گردو را در واتساپ برایم فرستادند تا خودم نقش چوب ساعتم را انتخاب کنم.',
        active: true,
      },
      {
        id: 'rev-2',
        name: 'دکتر نیلوفر ستوده',
        city: 'اصفهان — چهارباغ بالا',
        productOrdered: 'داک گوشی و ساعت مونولیت با حکاکی اختصاصی',
        rating: 5,
        dateLabel: 'ماه گذشته',
        comment:
          'برای هدیه تولد همسرم داک رومیزی چوب زیتون را با حکاکی تاریخ آشنایی‌مان سفارش دادم. ظرافت حکاکی لیزری و جعبه کادویی موم‌مهر شده آن‌قدر شیک بود که همسرم فکر می‌کرد یک اثر کلکسیونی وارداتی است. ممنون از دقت و خوش‌قولی‌تان.',
        active: true,
      },
      {
        id: 'rev-3',
        name: 'سروش مجد (مدیر استودیو معماری)',
        city: 'شیراز — قصرالدشت',
        productOrdered: '۱۲ عدد ست رومیزی آتلیه و جاکلیدی دیواری نوا (هدایای پایان سال)',
        rating: 5,
        dateLabel: '۳ هفته پیش',
        comment:
          'برای هدیه به کارفرماهای VIP دفتر معماری دنبال کاری بودیم که تبلیغاتیِ تکراری نباشد و حس اصالت چوب طبیعی را منتقل کند. جاکلیدی‌های مغناطیسی نوا با لوگوی ظریف استودیو ما فوق‌العاده از آب درآمدند و بازخورد بی‌نظیری گرفتیم.',
        active: true,
      },
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'سفارش من چقدر طول می‌کشد تا آماده و ارسال شود؟',
        answer:
          'هر اثر پس از تایید رگه چوب توسط شما، بین ۲ تا ۵ روز کاری در کارگاه ساخته، حکاکی و کنترل کیفیت می‌شود و سپس با بسته‌بندی ضدضربه ارسال می‌گردد. زمان دقیق ساخت هر محصول در صفحه همان محصول درج شده است.',
        active: true,
      },
      {
        id: 'faq-2',
        question: 'پرداخت سفارش به چه صورت انجام می‌شود؟',
        answer:
          'پس از ثبت سفارش، ابتدا تصویر اسلب‌های چوب برای انتخاب شما ارسال می‌شود. بعد از تایید شما، بیعانه ساخت (معمولاً ۵۰٪ مبلغ) پرداخت می‌شود و مابقی هنگام آماده‌شدن و پیش از ارسال تسویه می‌گردد. کد پیگیری سفارش را از بخش «پیگیری سفارش» همیشه می‌توانید ببینید.',
        active: true,
      },
      {
        id: 'faq-3',
        question: 'آیا می‌توانم رگه و رنگ چوب اثرم را خودم انتخاب کنم؟',
        answer:
          'بله، این امضای کارگاه اُرسی است. چون هر اسلب چوب طبیعی نقشی منحصربه‌فرد دارد، پیش از برش نهایی عکس قطعات موجود را در واتساپ یا تلگرام برایتان می‌فرستیم تا زیباترین رگه را خودتان انتخاب کنید.',
        active: true,
      },
      {
        id: 'faq-4',
        question: 'هزینه ارسال چقدر است و به چه شهرهایی ارسال دارید؟',
        answer:
          'به سراسر ایران ارسال داریم. هزینه ارسال ثابت است و برای سفارش‌های بالای سقف اعلام‌شده در سبد خرید، ارسال کاملاً رایگان می‌شود. همه بسته‌ها بیمه و با فوم ضدضربه بسته‌بندی می‌شوند.',
        active: true,
      },
      {
        id: 'faq-5',
        question: 'حکاکی لیزری چه متن‌هایی را شامل می‌شود و هزینه دارد؟',
        answer:
          'حکاکی نام، تاریخ، شعر کوتاه یا لوگوی برند روی تمام سفارش‌ها رایگان است. در استودیو شخصی‌سازی سایت می‌توانید متن و سبک خط را وارد کنید و پیش‌نمایش زنده آن را روی چوب ببینید.',
        active: true,
      },
      {
        id: 'faq-6',
        question: 'محصولات چوبی شما چه ضمانتی دارند؟',
        answer:
          'تمام آثار دارای ۵ سال ضمانت سلامت بافت چوب و اتصالات هستند و موتور ساعت‌های دیواری نیز ۳ سال ضمانت تعویض دارد. راهنمای نگهداری ساده هر محصول هم همراه بسته ارسال می‌شود.',
        active: true,
      },
      {
        id: 'faq-7',
        question: 'برای هدایای سازمانی و سفارش تعداد بالا چه شرایطی دارید؟',
        answer:
          'برای سفارش‌های سازمانی (از ۱۰ عدد به بالا) تخفیف پلکانی، حکاکی لوگو، بسته‌بندی با هویت برند شما و فاکتور رسمی ارائه می‌شود. کافیست از بخش «ثبت سفارش طرح دلخواه» درخواستتان را ثبت کنید یا با کارگاه تماس بگیرید.',
        active: true,
      },
    ],
    orders: seedOrders(),
    contactMessages: [
      {
        id: 'seed-msg-1',
        name: 'الهام کریمی',
        phone: '09125557788',
        subject: 'سوال درباره ساخت میز تحریر',
        message:
          'سلام، برای اتاق دخترم یک میز تحریر چوبی کوچک می‌خواهم. امکان ساخت با چوب راش روشن و کشوی مخفی هست؟ حدود قیمت چقدر می‌شود؟',
        read: false,
        createdAt: now - 7 * 60 * 60 * 1000,
      },
      {
        id: 'seed-msg-2',
        name: 'شرکت آوا تجهیز',
        phone: '02188776655',
        subject: 'درخواست کاتالوگ هدایای سازمانی',
        message:
          'سلام وقت بخیر، برای نوروز امسال حدود ۵۰ ست هدیه سازمانی می‌خواهیم. لطفاً شرایط همکاری و کاتالوگ را ارسال فرمایید.',
        read: true,
        createdAt: now - 2 * day,
      },
    ],
    coupons: [
      {
        id: 'coupon-welcome',
        code: 'ORSI10',
        percent: 10,
        minTotal: 2000000,
        active: true,
        description: '۱۰٪ تخفیف اولین سفارش بالای ۲ میلیون تومان',
      },
      {
        id: 'coupon-nowruz',
        code: 'NOWRUZ15',
        percent: 15,
        minTotal: 5000000,
        active: false,
        description: '۱۵٪ تخفیف ویژه نوروز (غیرفعال — نمونه)',
      },
    ],
  };
}
