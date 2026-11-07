export type ProductCategory =
  | 'all'
  | 'wall-clock'
  | 'laptop-stand'
  | 'phone-dock'
  | 'key-holder'
  | 'desk-accessories';

export type WoodSpeciesId = string;

export interface WoodSpecies {
  id: WoodSpeciesId;
  name: string;
  subtitle: string;
  origin: string;
  durability: string;
  priceMultiplier: number;
  swatchGradient: string;
  tintOverlay: string;
  accentHex: string;
  grainDescription: string;
}

export interface FinishOption {
  id: string;
  name: string;
  description: string;
  extraCost: number;
  badge: string;
}

export interface SizeOption {
  id: string;
  name: string;
  dimensionsLabel: string;
  priceDelta: number;
}

export interface WoodProduct {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabel: string;
  basePrice: number; // in Tomans
  defaultWood: WoodSpeciesId;
  availableWoods: WoodSpeciesId[];
  dimensions: string;
  weight: string;
  craftHours: number;
  finishType: string;
  image: string;
  badge?: string;
  isBestseller?: boolean;
  isActive?: boolean;
  story: string;
  highlights: string[];
  careGuide: string;
}

export interface OrderCartItem {
  cartItemId: string;
  productId: string;
  title: string;
  categoryLabel: string;
  image: string;
  wood: WoodSpecies;
  finish: FinishOption;
  size: SizeOption;
  customDimensionsText?: string;
  engravingText: string;
  engravingFont: 'nastaaliq' | 'modern' | 'minimal-latin';
  giftPackaging: boolean;
  quantity: number;
  unitPrice: number;
}

export const CATEGORIES: { id: ProductCategory; label: string; count: number; iconName: string }[] = [
  { id: 'all', label: 'همه آثار هنری', count: 8, iconName: 'Sparkles' },
  { id: 'wall-clock', label: 'ساعت دیواری', count: 2, iconName: 'Clock' },
  { id: 'laptop-stand', label: 'استند لپ‌تاپ', count: 2, iconName: 'Laptop' },
  { id: 'phone-dock', label: 'استند گوشی و ساعت', count: 1, iconName: 'Smartphone' },
  { id: 'key-holder', label: 'جاکلیدی دیواری', count: 1, iconName: 'Key' },
  { id: 'desk-accessories', label: 'اکسسوری رومیزی', count: 2, iconName: 'Layers' },
];

export const WOOD_SPECIES: Record<WoodSpeciesId, WoodSpecies> = {
  walnut: {
    id: 'walnut',
    name: 'چوب گردو سیاه',
    subtitle: 'گرم، اشرافی و دارای موج‌های عمیق شکلاتی',
    origin: 'باغ‌های کهنسال تویسرکان و بافت طبیعی خشک‌شده در کوره',
    durability: 'مقاومت بسیار بالا در برابر رطوبت و تغییر فرم',
    priceMultiplier: 1.12,
    swatchGradient: 'linear-gradient(135deg, #4A2F1D 0%, #2B1A10 55%, #1A0F09 100%)',
    tintOverlay: 'rgba(58, 34, 18, 0.22)',
    accentHex: '#8C583A',
    grainDescription: 'موج‌های طبیعی پرکنتراست به رنگ قهوه اسپرسو و عسلی تیره',
  },
  oak: {
    id: 'oak',
    name: 'چوب بلوط طلایی',
    subtitle: 'ساختار مهندسی مستحکم با بافت خطی گرم',
    origin: 'بلوط وارداتی خشک‌شده با تراکم الیاف بالا',
    durability: 'استحکام مکانیکی فوق‌العاده برای استندها و سازه‌های باربر',
    priceMultiplier: 1.0,
    swatchGradient: 'linear-gradient(135deg, #A9713F 0%, #7C4E27 55%, #543216 100%)',
    tintOverlay: 'rgba(180, 120, 60, 0.16)',
    accentHex: '#C88A4B',
    grainDescription: 'رگه‌های کشیده و منظم به رنگ کهربایی روشن و طلایی گرم',
  },
  beech: {
    id: 'beech',
    name: 'چوب راش ممتاز',
    subtitle: 'سطح ابریشمی، مینیمال و یکدست',
    origin: 'راش جنگلی درجه یک با منافذ ریز و تراش‌پذیری دقیق',
    durability: 'مقاوم در برابر سایش روزمره و ایده‌آل برای حکاکی لیزری ظریف',
    priceMultiplier: 0.94,
    swatchGradient: 'linear-gradient(135deg, #C99364 0%, #9E6B40 55%, #734A28 100%)',
    tintOverlay: 'rgba(215, 160, 110, 0.14)',
    accentHex: '#D8A477',
    grainDescription: 'بافت لطیف و گرم با خال‌های بسیار ظریف طبیعی به رنگ کرم-دارچینی',
  },
  olive: {
    id: 'olive',
    name: 'چوب زیتون رگه‌دار',
    subtitle: 'کمیاب، هنری با نقوش آبرنگی بی‌تکرار',
    origin: 'تنه درختان کهنسال زیتون با خشک‌کردن طبیعی ۲ ساله',
    durability: 'چگالی فوق‌العاده بالا و عطر طبیعی دلنشین چوب زیتون',
    priceMultiplier: 1.25,
    swatchGradient: 'linear-gradient(135deg, #986C3C 0%, #59391C 50%, #B8874E 100%)',
    tintOverlay: 'rgba(168, 118, 52, 0.24)',
    accentHex: '#D49B54',
    grainDescription: 'فرم‌های موج‌دار و هنری که هیچ دو قطعه‌ای را شبیه هم نمی‌کند',
  },
};

export const FINISH_OPTIONS: FinishOption[] = [
  {
    id: 'matte-oil',
    name: 'روغن گیاهی مات (Rubio Monocoat)',
    description: 'حفظ حس لمس طبیعی بافت چوب، ضدآب و کاملاً ارگانیک بدون براقیت مصنوعی',
    extraCost: 0,
    badge: 'محبوب‌ترین',
  },
  {
    id: 'beeswax',
    name: 'موم طبیعی زنبور عسل و کارنوبا',
    description: 'جلای مخملی نیمه‌براق با رایحه ملایم طبیعی و تغذیه عمیق الیاف چوب',
    extraCost: 180000,
    badge: 'لمس ابریشمی',
  },
  {
    id: 'brass-inlay',
    name: 'پتینه‌کاری + یراق برنجی دست‌ساز',
    description: 'ترکیب پخ‌های برنجی برس‌خورده و اتصالات مخفی طلایی مات',
    extraCost: 420000,
    badge: 'نسخه کلکسیونی',
  },
];

export const SIZE_OPTIONS: SizeOption[] = [
  {
    id: 'standard',
    name: 'ابعاد استاندارد کارگاه',
    dimensionsLabel: 'متناسب با میز کار و دیوارهای استاندارد',
    priceDelta: 0,
  },
  {
    id: 'executive',
    name: 'نسخه بزرگ مدیریتی (XL)',
    dimensionsLabel: '۳۰٪ بزرگ‌تر با ضخامت چوب بیشتر',
    priceDelta: 550000,
  },
  {
    id: 'custom',
    name: 'ابعاد کاملاً سفارشی شما',
    dimensionsLabel: 'ساخت دقیق بر اساس سانتی‌متر مورد نظر شما',
    priceDelta: 350000,
  },
];

export const PRODUCTS: WoodProduct[] = [
  {
    id: 'clock-walnut-aurum',
    title: 'ساعت دیواری «آوروم» چوب گردو و برنج',
    subtitle: 'ترکیب صفحه یکپارچه گردو سیاه با عقربه‌های برنجی دست‌ساز و موتور آرام‌گرد آلمانی',
    category: 'wall-clock',
    categoryLabel: 'ساعت دیواری',
    basePrice: 2850000,
    defaultWood: 'walnut',
    availableWoods: ['walnut', 'oak', 'olive'],
    dimensions: 'قطر ۳۸ سانتی‌متر × ضخامت ۲.۸ سانتی‌متر',
    weight: '۱.۶ کیلوگرم',
    craftHours: 14,
    finishType: 'روغن گیاهی مات مونوکوت + برنج برس‌خورده',
    image: '/images/clock-walnut-brass.jpg',
    badge: 'پرفروش‌ترین اثر دیواری',
    isBestseller: true,
    story:
      'ساعت دیواری آوروم از یک اسلب یکپارچه چوب گردوی کهنسال تراشیده شده است. خطوط شعاعی برنجی با دقت دهم میلی‌متر درون بافت چوب جای‌گذاری شده‌اند تا در نور گرم شب، درخششی ظریف و شاعرانه روی دیوار خانه یا دفتر شما خلق کنند.',
    highlights: [
      'موتور سوئیپ کاملاً بی‌صدا (Silent Sweep) با ۳ سال ضمانت تعویض',
      'نشانگرهای ساعت از جنس برنج خالص کارشده در دل چوب',
      'امکان حکاکی نام خانوادگی، تاریخ ازدواج یا شعار برند در پشت یا لبه ساعت',
    ],
    careGuide: 'هر ۶ ماه یک‌بار با دستمال میکروفایبر خشک غبارروبی شود؛ بی‌نیاز از واکس شیمیایی.',
  },
  {
    id: 'laptop-stand-ergo-arc',
    title: 'استند لپ‌تاپ ارگونومیک «آرک» (طراحی معلق)',
    subtitle: 'زاویه دید استاندارد ۱۸ درجه با گردش هوای طبیعی و جایگاه مخفی کیبورد در زیر استند',
    category: 'laptop-stand',
    categoryLabel: 'استند لپ‌تاپ',
    basePrice: 2190000,
    defaultWood: 'oak',
    availableWoods: ['oak', 'walnut', 'beech'],
    dimensions: '۲۸ × ۲۴ × ۱۳ سانتی‌متر (مناسب ۱۳ تا ۱۷ اینچ)',
    weight: '۱.۱ کیلوگرم',
    craftHours: 11,
    finishType: 'روغن طبیعی ضدخش + پدهای چرم طبیعی دست‌دوز',
    image: '/images/laptop-stand-oak.jpg',
    badge: 'طراحی ارگونومیک',
    isBestseller: true,
    story:
      'استند لپ‌تاپ آرک برای برنامه‌نویسان، طراحان و مدیرانی ساخته شده که ساعت‌ها پشت میز کار می‌کنند. اتصالات کام و زبانه سنتی بدون حتی یک پیچ فلزی نمایان، وزن لپ‌تاپ‌های سنگین تا ۸ کیلوگرم را بدون کوچک‌ترین لرزش تحمل می‌کند.',
    highlights: [
      'شیارهای عبور هوا برای خنک‌ماندن مک‌بوک و لپ‌تاپ‌های حرفه‌ای',
      'پدهای تماس از چرم طبیعی گاوی برای جلوگیری از خط و خش روی بدنه لپ‌تاپ',
      'محفظه زیرین برای قرار دادن کیبورد مکانیکی یا دفترچه یادداشت',
    ],
    careGuide: 'مقاوم در برابر لکه قهوه و رطوبت دست به لطف پوشش دو لایه روغن گیاهی.',
  },
  {
    id: 'phone-watch-dock-monolith',
    title: 'داک رومیزی گوشی و ساعت هوشمند «مونولیت»',
    subtitle: 'حجم هندسی تراش‌خورده با کانال‌های مخفی کابل شارژ مگ‌سیف و اپل‌واچ',
    category: 'phone-dock',
    categoryLabel: 'استند گوشی و ساعت',
    basePrice: 1380000,
    defaultWood: 'walnut',
    availableWoods: ['walnut', 'olive', 'oak', 'beech'],
    dimensions: '۱۸ × ۱۱ × ۹.۵ سانتی‌متر',
    weight: '۶۸۰ گرم',
    craftHours: 7,
    finishType: 'موم طبیعی زنبور عسل + کفی چوب‌پنبه ضدلغزش',
    image: '/images/phone-watch-dock.jpg',
    badge: 'هدیه محبوب مدیریتی',
    isBestseller: true,
    story:
      'مونولیت آشفتگی کابل‌های روی میز کار و پاتختی را به یک مجسمه چوبی مینیمال تبدیل می‌کند. زاویه ۶۲ درجه‌ای تکیه‌گاه گوشی برای مشاهده اعلان‌ها و تماس تصویری بدون برداشتن گوشی از روی استند مهندسی شده است.',
    highlights: [
      'مسیر مخفی زیرین برای عبور کابل شارژر موبایل و ساعت هوشمند',
      'وزن متعادل شده با هسته برنجی داخلی برای برداشتن راحت گوشی با یک دست',
      'جایگاه اختصاصی انگشتر، ایرپاد و ساعت مچی کلاسیک یا هوشمند',
    ],
    careGuide: 'با دستمال نمدار نرم قابل تمیز کردن است.',
  },
  {
    id: 'key-holder-fluted-zen',
    title: 'جاکلیدی دیواری مغناطیسی و شلف «نوا»',
    subtitle: 'طراحی موج‌دار معماری با آهنرباهای نئودیمیوم مخفی و پین‌های برنجی دست‌تراش',
    category: 'key-holder',
    categoryLabel: 'جاکلیدی دیواری',
    basePrice: 1490000,
    defaultWood: 'walnut',
    availableWoods: ['walnut', 'oak', 'beech'],
    dimensions: '۳۲ × ۹.۵ × ۶ سانتی‌متر',
    weight: '۷۵۰ گرم',
    craftHours: 8,
    finishType: 'روغن گیاهی مات + پین‌های برنجی توپر',
    image: '/images/key-holder-wall.jpg',
    badge: 'مغناطیس قدرتمند مخفی',
    story:
      'اولین چیزی که هنگام ورود به خانه لمس می‌کنید باید حس گرما و نظم را منتقل کند. جاکلیدی دیواری «نوا» با ۵ مگنت نئودیمیوم مخفی در زیر لایه چوب، دسته‌کلیدهای سنگین را به‌صورت جادویی روی سطح چوب نگه می‌دارد و لبه بالایی آن جایگاه عینک آفتابی، کیف پول و نامه‌هاست.',
    highlights: [
      '۵ مگنت مخفی فوق‌قوی + ۳ پین برنجی برای آویز ریموت خودرو و کلیدها',
      'نصب کاملاً مخفی روی دیوار (پیچ‌ها پس از نصب دیده نمی‌شوند)',
      'شیار بالایی ضدلغزش برای قرار دادن عینک، ساعت و کارت‌های روزمره',
    ],
    careGuide: 'مناسب ورودی منزل و دفاتر کار مدرن؛ همراه با شابلون نصب دقیق.',
  },
  {
    id: 'clock-olive-horizon',
    title: 'ساعت دیواری روستیک-مدرن «افق» چوب زیتون و شیشه دودی',
    subtitle: 'تلفیق لبه‌های طبیعی چوب زیتون صدساله با شیشه سکوریت دودی و عقربه‌های طلایی مات',
    category: 'wall-clock',
    categoryLabel: 'ساعت دیواری',
    basePrice: 3650000,
    defaultWood: 'olive',
    availableWoods: ['olive', 'walnut'],
    dimensions: 'قطر ۴۲ سانتی‌متر × ضخامت ۳ سانتی‌متر',
    weight: '۲.۱ کیلوگرم',
    craftHours: 19,
    finishType: 'پولیش ابریشمی موم کارنوبا + شیشه شامپاینی دودی',
    image: '/images/clock-epox-olive.jpg',
    badge: 'تک‌نسخه هنری (Unique Grain)',
    story:
      'هر ساعت «افق» به دلیل استفاده از اسلب‌های لبه طبیعی (Live-Edge) درخت زیتون، نقشی منحصر‌به‌فرد دارد که در هیچ خانه دیگری تکرار نمی‌شود. شیشه دودی مرکزی، کنتراستی خیره‌کننده میان شفافیت مدرن و اصالت چوب وحشی ایجاد کرده است.',
    highlights: [
      'استفاده از چوب زیتون با رگه‌های آبرنگی طبیعی و لبه‌های دست‌تراش',
      'شیشه دودی ۶ میلی‌متری تراش‌خورده با لبه‌های پخ دیاموند',
      'ارسال تصویر اسلب چوب به مشتری پیش از برش نهایی جهت تایید نقش چوب',
    ],
    careGuide: 'بخش شیشه‌ای با دستمال عینک و بخش چوبی با پارچه کتان خشک تمیز شود.',
  },
  {
    id: 'desk-organizer-atelier',
    title: 'ست نظم‌دهنده رومیزی ۵ تکه «آتلیه»',
    subtitle: 'سینی ماژولار چوب زیتون و گردو برای خودنویس، کارت ویزیت، ساعت و اکسسوری‌های روزمره',
    category: 'desk-accessories',
    categoryLabel: 'اکسسوری رومیزی',
    basePrice: 1890000,
    defaultWood: 'olive',
    availableWoods: ['olive', 'walnut', 'oak', 'beech'],
    dimensions: '۳۴ × ۱۶ × ۳.۲ سانتی‌متر (مجموع چیدمان)',
    weight: '۸۲۰ گرم',
    craftHours: 10,
    finishType: 'موم زنبور عسل + اتصال مگنتی قطعات به یکدیگر',
    image: '/images/desk-organizer-set.jpg',
    badge: 'اتصال مگنتی ماژولار',
    story:
      'ست رومیزی آتلیه با الهام از جعبه‌های ابزار دقیق ساعت‌سازان سوئیسی طراحی شده است. قطعات این ست توسط مگنت‌های ظریف در لبه‌ها به هم متصل می‌شوند تا بتوانید چیدمان میز کار خود را هر روز مطابق سلیقه‌تان تغییر دهید.',
    highlights: [
      'شیارهای تراش‌خورده مخصوص خودنویس و روان‌نویس‌های کلکسیونی',
      'استند کارت ویزیت با زاویه برداشت آسان و جایگاه یادداشت‌های روزانه',
      'مناسب‌ترین گزینه برای هدایای سازمانی لوکس با حکاکی لوگوی شرکت',
    ],
    careGuide: 'پوشش ضدلکه جوهر؛ مناسب استفاده مداوم روی میز مدیریت.',
  },
  {
    id: 'headphone-stand-symphony',
    title: 'استند هدفون و اکسسوری «سمفونی» چوب گردو و برنج',
    subtitle: 'قوس ارگونومیک محافظ هدبند هدفون به همراه سینی جواهرات و فلش‌مموری در پایه',
    category: 'desk-accessories',
    categoryLabel: 'اکسسوری رومیزی',
    basePrice: 1740000,
    defaultWood: 'walnut',
    availableWoods: ['walnut', 'oak', 'beech'],
    dimensions: 'ارتفاع ۲۷.۵ × پایه ۱۴ × ۱۴ سانتی‌متر',
    weight: '۸۹۰ گرم',
    craftHours: 9,
    finishType: 'روغن گیاهی مات + ستون برنجی برس‌خورده',
    image: '/images/headphone-stand-walnut.jpg',
    badge: 'محافظ فرم هدبند',
    story:
      'برخلاف استندهای فلزی تیز که به فوم هدفون‌های حرفه‌ای آسیب می‌زنند، قوس بالایی «سمفونی» با شعاع انحنای دقیق سر انسان از چوب یکپارچه گردو فرم داده شده تا فشار وزن هدفون به‌صورت کاملاً یکنواخت پخش شود.',
    highlights: [
      'ستون میانی از جنس برنج توپر با مرکز ثقل پایین برای پایداری کامل',
      'حوضچه تراش‌خورده در پایه برای نگهداری دانگل، ایرپاد، ساعت یا حلقه',
      'نگهدارنده مخفی کابل هدفون در بخش پشتی ستون',
    ],
    careGuide: 'بدون نیاز به مونتاژ؛ آماده استفاده بلافاصله پس از باز کردن جعبه هدیه.',
  },
  {
    id: 'laptop-stand-vertical-zenith',
    title: 'استند عمودی دوتایی لپ‌تاپ و تبلت «زنیت»',
    subtitle: 'نگهدارنده عمودی مک‌بوک و آیپد با عرض قابل تنظیم و بدنه یکپارچه چوب گردو',
    category: 'laptop-stand',
    categoryLabel: 'استند لپ‌تاپ',
    basePrice: 1620000,
    defaultWood: 'walnut',
    availableWoods: ['walnut', 'oak', 'beech', 'olive'],
    dimensions: '۱۸ × ۱۱ × ۶.۵ سانتی‌متر',
    weight: '۷۹۰ گرم',
    craftHours: 8,
    finishType: 'روغن مونوکوت + جداره داخلی نمد مرینوس طبیعی',
    image: '/images/hero-desk-setup.jpg',
    badge: 'آزادسازی فضای میز',
    story:
      'هنگامی که لپ‌تاپ را به مانیتور اکسترنال متصل می‌کنید، استند عمودی «زنیت» تا ۷۵٪ فضای میز کار شما را آزاد می‌کند. جداره داخلی با نمد پشم طبیعی پوشانده شده تا بدنه آلومینیومی لپ‌تاپ در کمال امنیت قرار گیرد.',
    highlights: [
      'پیچ برنجی دست‌ساز در زیر پایه برای تنظیم عرض شیار از ۱۲ تا ۲۶ میلی‌متر',
      'دو شیار مجزا برای قرارگیری هم‌زمان لپ‌تاپ و تبلت یا گوشی',
      'کفی سنگین و ضدلغزش سیلیکونی برای ثبات ۱۰۰ درصدی روی میز شیشه‌ای یا چوبی',
    ],
    careGuide: 'گردگیری شیار داخلی با برس نرم؛ مقاوم در برابر حرارت لپ‌تاپ.',
  },
];

export function toPersianDigits(input: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(input).replace(/\d/g, (d) => persianDigits[Number(d)]);
}

export function toEnglishDigits(input: string): string {
  const fa = '۰۱۲۳۴۵۶۷۸۹';
  const ar = '٠١٢٣٤٥٦٧٨٩';
  return String(input)
    .replace(/[۰-۹]/g, (d) => String(fa.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ar.indexOf(d)));
}

export function woodById(woods: WoodSpecies[], id: WoodSpeciesId): WoodSpecies {
  return woods.find((w) => w.id === id) ?? woods[0];
}

export function normalizeIranPhone(raw: string): string | null {
  let digits = toEnglishDigits(raw).replace(/[\s-]/g, '');
  if (digits.startsWith('+98')) digits = `0${digits.slice(3)}`;
  if (digits.startsWith('98') && digits.length === 12) digits = `0${digits.slice(2)}`;
  return /^09\d{9}$/.test(digits) ? digits : null;
}

export function toIntlPhone(localPhone: string): string {
  const normalized = normalizeIranPhone(localPhone) ?? localPhone;
  return normalized.startsWith('0') ? `98${normalized.slice(1)}` : normalized;
}

export function formatTomans(amount: number): string {
  const rounded = Math.round(amount / 1000) * 1000;
  const formattedWithCommas = rounded.toLocaleString('en-US');
  return toPersianDigits(formattedWithCommas);
}
