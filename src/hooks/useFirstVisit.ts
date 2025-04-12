import { useEffect, useState } from 'react';

const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('has_visited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('has_visited', 'true');
      
      // Show keyboard shortcuts after a brief delay
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('toggle-keyboard-help'));
      }, 2000);
    }
  }, []);

  return isFirstVisit;
};

export default useFirstVisit;