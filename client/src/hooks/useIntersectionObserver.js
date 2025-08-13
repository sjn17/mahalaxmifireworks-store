import { useEffect, useRef, useState, useCallback } from 'react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    triggerOnce = false
  } = options;

  const callback = useCallback((entries) => {
    const [entry] = entries;
    
    if (entry.isIntersecting) {
      setIsIntersecting(true);
      if (triggerOnce && !hasIntersected) {
        setHasIntersected(true);
      }
    } else if (!triggerOnce) {
      setIsIntersecting(false);
    }
  }, [triggerOnce, hasIntersected]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
      root
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [callback, threshold, rootMargin, root]);

  const disconnect = useCallback(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver(() => {});
      observer.disconnect();
    }
  }, []);

  return [elementRef, isIntersecting, disconnect];
};

export default useIntersectionObserver;
