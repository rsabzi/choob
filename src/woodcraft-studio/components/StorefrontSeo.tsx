import React, { useEffect } from 'react';
import { toIntlPhone, type WoodProduct } from '../data/products';
import type { FaqItem, SiteSettings } from '../store/types';

export const SITE_URL = 'https://chooby.vercel.app';

const SEO_KEYWORDS = [
  'خرید دست‌سازه چوبی سفارشی',
  'ساعت دیواری چوبی دست‌ساز',
  'ساعت چوب گردو',
  'استند لپ‌تاپ چوبی',
  'اکسسوری رومیزی چوبی',
  'هدیه چوبی اختصاصی',
  'هدایای سازمانی چوبی',
  'حکاکی لیزری روی چوب',
  'ساخت سفارشی محصولات چوبی',
  'جاکلیدی دیواری چوبی',
  'داک گوشی و ساعت چوبی',
  'دکور چوبی دست‌ساز',
].join('، ');

function setMeta(kind: 'name' | 'property', key: string, content: string) {
  if (!content) return;
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${kind}="${key}"]`
  );
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(kind, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function absoluteAssetUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

interface StorefrontSeoProps {
  settings: SiteSettings;
  products: WoodProduct[];
  faqs: FaqItem[];
}

export const StorefrontSeo: React.FC<StorefrontSeoProps> = ({
  settings,
  products,
  faqs,
}) => {
  useEffect(() => {
    const title = `${settings.brandName} | خرید دست‌سازه چوبی سفارشی، ساعت دیواری و استند لپ‌تاپ چوبی`;
    const description = `${settings.brandName}: خرید و ساخت سفارشی ساعت دیواری چوبی، استند لپ‌تاپ، داک گوشی، جاکلیدی و هدیه چوبی دست‌ساز با حکاکی لیزری رایگان، انتخاب رگه چوب توسط مشتری و ارسال به سراسر ایران. مشاوره و سفارش: ${settings.phoneDisplay}`;
    const image = absoluteAssetUrl(settings.heroImage);
    const telephone = `+${toIntlPhone(settings.whatsappNumber || settings.phoneDisplay)}`;
    const telegramId = settings.telegramId.replace(/^@+/, '').trim();
    const sameAs = [
      telegramId ? `https://t.me/${telegramId}` : '',
      settings.instagramId
        ? `https://www.instagram.com/${settings.instagramId.replace(/^@+/, '')}`
        : '',
    ].filter(Boolean);

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', SEO_KEYWORDS);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    setMeta('name', 'author', settings.brandName);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:locale', 'fa_IR');
    setMeta('property', 'og:site_name', settings.brandName);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', SITE_URL);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:alt', 'دست‌سازه‌های چوب طبیعی سفارشی کارگاه اُرسی');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    setCanonical(SITE_URL);

    const productList = {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#product-list`,
      name: 'دست‌سازه‌های چوبی سفارشی کارگاه اُرسی',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          '@id': `${SITE_URL}/#product-${product.id}`,
          name: product.title,
          description: product.subtitle,
          image: absoluteAssetUrl(product.image),
          category: product.categoryLabel,
          material: 'چوب طبیعی',
          brand: { '@type': 'Brand', name: settings.brandName },
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}/#portfolio`,
            priceCurrency: 'IRR',
            price: product.basePrice * 10,
            availability: 'https://schema.org/MadeToOrder',
            itemCondition: 'https://schema.org/NewCondition',
            seller: { '@id': `${SITE_URL}/#store` },
          },
        },
      })),
    };

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Store',
          '@id': `${SITE_URL}/#store`,
          name: settings.brandName,
          description,
          url: SITE_URL,
          image,
          logo: `${SITE_URL}/favicon.svg`,
          telephone,
          email: settings.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: settings.address,
            addressCountry: 'IR',
          },
          areaServed: { '@type': 'Country', name: 'ایران' },
          currenciesAccepted: 'IRR',
          sameAs,
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: settings.brandName,
          inLanguage: 'fa-IR',
          publisher: { '@id': `${SITE_URL}/#store` },
        },
        productList,
        {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/#faq-schema`,
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ],
    };

    let script = document.getElementById('orsi-structured-data') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'orsi-structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
  }, [settings, products, faqs]);

  return null;
};
