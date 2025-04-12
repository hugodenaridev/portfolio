import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../store/useStore';

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
}

const Meta = ({ 
  title = 'Developer Portfolio',
  description = 'Personal portfolio showcasing my work and skills in web development',
  image = '/og-image.jpg'
}: MetaProps) => {
  const location = useLocation();
  const { isDarkMode } = useStore();

  useEffect(() => {
    // Update meta tags
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', image);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.href);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkMode ? '#111827' : '#ffffff');
  }, [title, description, image, location, isDarkMode]);

  return null;
};

export default Meta;