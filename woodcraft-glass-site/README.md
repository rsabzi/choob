# وب‌سایت شیشه‌ای (Glassmorphic) استودیو نجاری و دست‌سازه‌های تزیینی چوبی «اُرسی»

این پروژه یک وب‌سایت اختصاصی، مدرن و شیشه‌ای (Warm Smoked Glassmorphism) برای معرفی و ثبت سفارش آنلاین دست‌سازه‌های تزیینی چوبی شامل **ساعت دیواری، استند لپ‌تاپ، داک رومیزی گوشی و ساعت هوشمند، جاکلیدی دیواری مغناطیسی و اکسسوری‌های رومیزی** است.

## ساختار پوشه اختصاصی (`src/woodcraft-studio/`)

- `src/woodcraft-studio/WoodcraftStudioApp.tsx`: کامپوننت اصلی یکپارچه‌ساز تمامی بخش‌ها و مدیریت سبد سفارش.
- `src/woodcraft-studio/data/products.ts`: کاتالوگ کامل محصولات، گونه‌های چوب طبیعی (گردو سیاه، بلوط طلایی، راش ممتاز، زیتون رگه‌دار)، پوشش‌های گیاهی و مبدل اعداد و قیمت فارسی.
- `src/woodcraft-studio/components/GlassHeader.tsx`: نوار ناوبری شناور شیشه‌ای با دسترسی سریع به سبد سفارش و بخش شخصی‌سازی.
- `src/woodcraft-studio/components/HeroSection.tsx`: بخش معرفی اول با نقاط تعاملی (Hotspots) روی محصولات، ساعت چوبی زنده SVG و انتخابگر آنی رنگ چوب.
- `src/woodcraft-studio/components/PortfolioGallery.tsx`: ویترین نمونه‌کارها با قابلیت فیلتر بر اساس دسته‌بندی محصول و نوع چوب.
- `src/woodcraft-studio/components/CustomOrderStudio.tsx`: استودیو ۴ مرحله‌ای شخصی‌سازی آنلاین و پیش‌نمایش زنده حکاکی لیزری روی چوب به همراه محاسبه آنی قیمت.
- `src/woodcraft-studio/components/ProductDetailModal.tsx`: پنجره شیشه‌ای بررسی جزئیات فنی، داستان ساخت و راهنمای نگهداری هر اثر.
- `src/woodcraft-studio/components/OrderCheckoutDrawer.tsx`: کشوی شیشه‌ای سبد سفارش، ثبت مشخصات مشتری، انتخاب پیام‌رسان جهت تایید عکس رگه چوب و صدور کد پیگیری کارگاه.
- `src/woodcraft-studio/components/CraftsmanshipAndReviews.tsx`: بخش معرفی اصالت چوب‌ها، مراحل ۳گانه ساخت و نظرات خریداران.
