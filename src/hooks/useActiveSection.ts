import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    
    const handleScroll = () => {
      const pageMiddle = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const { top, bottom } = element.getBoundingClientRect();
        const sectionTop = top + window.scrollY;
        const sectionBottom = bottom + window.scrollY;

        if (pageMiddle >= sectionTop && pageMiddle <= sectionBottom) {
          setActiveSection(element.dataset.section || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]); // Reset when route changes

  return activeSection;
};

export default useActiveSection;