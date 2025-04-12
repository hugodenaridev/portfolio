import { useEffect } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

const useSectionInView = (sectionId: string) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    if (isVisible) {
      // Update URL hash without scrolling
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  }, [isVisible, sectionId]);

  return { elementRef, isVisible };
};

export default useSectionInView;