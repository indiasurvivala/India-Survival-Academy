import { useEffect } from 'react';

/**
 * Custom hook to update page title and meta description dynamically
 * for frontend technical SEO.
 */
export const useDocumentTitle = (title: string, description?: string) => {
  useEffect(() => {
    const brand = 'India Survival Academy';
    const defaultTitle = 'India Survival Academy | Wilderness Awareness & Outdoor Skills Training';
    let fullTitle = defaultTitle;
    if (title) {
      fullTitle = title.includes(brand) ? title : `${title} | ${brand}`;
    }
    document.title = fullTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
};
