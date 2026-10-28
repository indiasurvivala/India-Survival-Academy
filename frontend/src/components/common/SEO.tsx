import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Enterprise SEO Manager Component for India Survival Academy
 *
 * Synchronizes document title, meta description, canonical URL,
 * Open Graph, Twitter cards, robots directives, and Schema.org JSON-LD.
 * Zero external dependencies. Avoids duplicates and handles route transitions.
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage,
  noIndex = false,
  keywords,
  schema
}) => {
  const location = useLocation();

  useEffect(() => {
    const brand = siteConfig.academyName;

    // 1. Format document title cleanly without duplicate brand suffixes
    let fullTitle = siteConfig.defaultTitle || `${brand} | Wilderness Awareness & Outdoor Skills Training`;
    if (title) {
      fullTitle = title.includes(brand) ? title : `${title} | ${brand}`;
    }
    document.title = fullTitle;

    // Helper for upserting meta tags safely
    const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // 2. Primary Meta Description and Title
    const metaDesc = description || siteConfig.defaultDescription || '';
    setMetaTag('name', 'description', metaDesc);
    setMetaTag('name', 'title', fullTitle);

    // 3. Keywords
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 4. Robots Directives
    const robotsContent = noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMetaTag('name', 'robots', robotsContent);

    // 5. Canonical URL configuration
    const activePath = canonicalPath !== undefined ? canonicalPath : location.pathname;
    const cleanPath = activePath === '/' ? '' : activePath.startsWith('/') ? activePath : `/${activePath}`;
    const canonicalUrl = `${siteConfig.siteUrl}${cleanPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (noIndex) {
      // 404 off-trail routes should not be indexed with canonical signals
      if (canonicalLink) {
        canonicalLink.remove();
      }
    } else {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // 6. Absolute Open Graph & Twitter Social Image
    const rawImage = ogImage || siteConfig.logoPath;
    const absoluteImage = rawImage.startsWith('http')
      ? rawImage
      : `${siteConfig.siteUrl}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`;

    // 7. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', brand);
    setMetaTag('property', 'og:locale', 'en_IN');
    setMetaTag('property', 'og:image', absoluteImage);
    if (!noIndex) {
      setMetaTag('property', 'og:url', canonicalUrl);
    }

    // 8. Twitter / X Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', absoluteImage);
    if (!noIndex) {
      setMetaTag('name', 'twitter:url', canonicalUrl);
    }

    // 9. Structured Data JSON-LD (Unique tag ID per route)
    const jsonLdId = 'dynamic-page-jsonld';
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = jsonLdId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    // Cleanup dynamic JSON-LD on unmount
    return () => {
      const dynamicScript = document.getElementById(jsonLdId);
      if (dynamicScript) {
        dynamicScript.remove();
      }
    };
  }, [title, description, canonicalPath, ogType, ogImage, noIndex, keywords, schema, location.pathname]);

  return null;
};
