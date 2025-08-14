import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top when navigating to cart page
    if (pathname === '/cart') {
      // Small delay to ensure page transition is complete
      setTimeout(() => {
        if ('scrollBehavior' in document.documentElement.style) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
