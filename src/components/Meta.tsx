import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../store/useStore';

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const Meta = ({
  title = 'Portfolio',
  description = 'Full-stack developer portfolio showcasing modern web applications and technical expertise',
  image = '/og-image.jpg',
  type = 'website'
}: MetaProps) => {
  const { isDarkMode } = useStore();
  const location = useLocation();
  const fullTitle = `${title} | Developer Portfolio`;
  const url = `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const metaTags = {
      description,
      'og:title': fullTitle,
      'og:description': description,
      'og:image': `${window.location.origin}${image}`,
      'og:url': url,
      'og:type': type,
      'twitter:card': 'summary_large_image',
      'twitter:title': fullTitle,
      'twitter:description': description,
      'twitter:image': `${window.location.origin}${image}`,
      'theme-color': isDarkMode ? '#0f172a' : '#f8fafc',
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      // Update existing tags
      const existingTag = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
        return;
      }

      // Create new tags if they don't exist
      const tag = document.createElement('meta');
      if (name.startsWith('og:')) {
        tag.setAttribute('property', name);
      } else {
        tag.setAttribute('name', name);
      }
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    });

    // Cleanup function
    return () => {
      // Only remove tags we might have added, leave essential ones
      const tagsToRemove = [
        'og:title',
        'og:description',
        'og:image',
        'og:url',
        'og:type',
        'twitter:card',
        'twitter:title',
        'twitter:description',
        'twitter:image',
      ];

      tagsToRemove.forEach(name => {
        const tag = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
        if (tag) {
          tag.remove();
        }
      });
    };
  }, [fullTitle, description, image, url, type, isDarkMode]);

  return null;
};

export default Meta;