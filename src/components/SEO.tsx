import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useApp } from '../context/AppContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  const { lang } = useApp();
  const isAr = lang === 'ar';

  const defaultTitle = 'The Social Club | Premium Digital Growth Agency';
  const defaultDescription = isAr 
    ? 'نحن ندمج التسويق، التكنولوجيا، والإبداع لمساعدة الشركات على بناء حضور رقمي أقوى وتحويل الانتباه إلى نمو ملموس.'
    : 'We combine marketing, technology, and creativity to help businesses build a stronger digital presence and turn attention into measurable growth.';
  const defaultImage = 'https://thesocialclubgrowth.com/og-image.jpg';
  const siteUrl = 'https://thesocialclubgrowth.com';

  const seoTitle = title ? `${title} | The Social Club` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoImage} />
    </Helmet>
  );
};

export default SEO;
