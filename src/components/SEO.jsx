import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Le Petit Cadeau - Bespoke Gifts", 
  description = "Discover Le Petit Cadeau's curated collection of bespoke, high-quality gifts for every occasion.", 
  image = "/og-image.jpg", 
  url = "https://yoursite.com" 
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
