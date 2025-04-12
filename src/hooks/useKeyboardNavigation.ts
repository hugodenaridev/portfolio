import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useKeyboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle keyboard shortcuts when not typing in an input
      if (event.target instanceof HTMLElement &&
          (event.target.tagName === 'INPUT' || 
           event.target.tagName === 'TEXTAREA')) {
        return;
      }

      // Handle Ctrl/Cmd + key combinations for navigation
      if (event.metaKey || event.ctrlKey) {
        switch (event.key.toLowerCase()) {
          case 'arrowup':
            // Navigate to previous section
            navigateToAdjacentSection('prev');
            event.preventDefault();
            break;
          case 'arrowdown':
            // Navigate to next section
            navigateToAdjacentSection('next');
            event.preventDefault();
            break;
          default:
            break;
        }
        return;
      }

      // Regular key shortcuts
      switch (event.key.toLowerCase()) {
        case 'h':
          navigate('/');
          break;
        case 'a':
          navigate('/about');
          break;
        case 'p':
          navigate('/projects');
          break;
        case 'c':
          navigate('/contact');
          break;
        case 'k':
          document.dispatchEvent(new CustomEvent('toggle-keyboard-help'));
          break;
        case 't':
          document.dispatchEvent(new CustomEvent('toggle-theme'));
          break;
        default:
          break;
      }
    };

    const navigateToAdjacentSection = (direction: 'prev' | 'next') => {
      const sections = Array.from(document.querySelectorAll('[data-section]'));
      if (!sections.length) return;

      const currentSection = sections.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3;
      });

      if (!currentSection) return;

      const currentIndex = sections.indexOf(currentSection);
      const targetIndex = direction === 'next' 
        ? Math.min(currentIndex + 1, sections.length - 1)
        : Math.max(currentIndex - 1, 0);

      if (targetIndex !== currentIndex) {
        sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate, location]);

  const shortcuts = [
    { key: 'H', description: 'Go to Home' },
    { key: 'A', description: 'Go to About' },
    { key: 'P', description: 'Go to Projects' },
    { key: 'C', description: 'Go to Contact' },
    { key: 'K', description: 'Toggle keyboard shortcuts' },
    { key: 'T', description: 'Toggle theme' },
    { key: 'Ctrl + ↑', description: 'Previous section' },
    { key: 'Ctrl + ↓', description: 'Next section' },
  ];

  return { shortcuts };
};

export default useKeyboardNavigation;