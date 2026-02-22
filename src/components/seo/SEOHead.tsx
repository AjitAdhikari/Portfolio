import { useEffect } from 'react';
import { developerInfo } from '@/data/developer';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export function SEOHead({ title, description }: SEOHeadProps) {
  const fullTitle = title
    ? `${title} | ${developerInfo.name}`
    : `${developerInfo.name} - Software Developer from Nepal`;

  const fullDescription = description || developerInfo.bio;

  useEffect(() => {
    document.title = fullTitle;
    const updateMeta = (name: string, content: string, isProp = false) => {
      const attr = isProp ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    updateMeta('description', fullDescription);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', fullDescription, true);
    updateMeta('og:type', 'website', true);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', fullDescription);
    updateMeta('author', developerInfo.name);
    updateMeta('keywords', 'Ajit Adhikari, Software Developer, Nepal, React, Full Stack, Portfolio');
  }, [fullTitle, fullDescription]);

  return null;
}
