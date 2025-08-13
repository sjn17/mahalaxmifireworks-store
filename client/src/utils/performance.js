// Performance monitoring utility
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.init();
  }

  init() {
    // Monitor Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    this.observeTTFB();
    
    // Monitor custom metrics
    this.observeCustomMetrics();
    
    // Monitor resource loading
    this.observeResourceTiming();
    
    // Monitor errors
    this.observeErrors();
  }

  // Largest Contentful Paint
  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        this.logMetric('LCP', lastEntry.startTime);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  // First Input Delay
  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          this.logMetric('FID', this.metrics.fid);
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  // Cumulative Layout Shift
  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = clsValue;
        this.logMetric('CLS', clsValue);
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  // First Contentful Paint
  observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fcp = entry.startTime;
          this.logMetric('FCP', entry.startTime);
        });
      });
      
      observer.observe({ entryTypes: ['first-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  // Time to First Byte
  observeTTFB() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.metrics.ttfb = entry.responseStart - entry.requestStart;
            this.logMetric('TTFB', this.metrics.ttfb);
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    }
  }

  // Custom metrics
  observeCustomMetrics() {
    // Monitor component render times
    if (window.React) {
      this.monitorReactPerformance();
    }
    
    // Monitor API response times
    this.monitorAPIPerformance();
  }

  // Monitor React performance
  monitorReactPerformance() {
    const originalRender = React.Component.prototype.render;
    React.Component.prototype.render = function() {
      const start = performance.now();
      const result = originalRender.call(this);
      const end = performance.now();
      
      // Log slow renders
      if (end - start > 16) { // 16ms = 60fps threshold
        console.warn(`Slow render detected: ${end - start}ms`, this.constructor.name);
      }
      
      return result;
    };
  }

  // Monitor API performance
  monitorAPIPerformance() {
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const start = performance.now();
      return originalFetch.apply(this, args).then((response) => {
        const end = performance.now();
        const duration = end - start;
        
        // Log slow API calls
        if (duration > 1000) { // 1 second threshold
          console.warn(`Slow API call detected: ${duration}ms`, args[0]);
        }
        
        return response;
      });
    };
  }

  // Monitor resource timing
  observeResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.duration > 1000) { // 1 second threshold
            console.warn(`Slow resource load: ${entry.name} took ${entry.duration}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  // Monitor errors
  observeErrors() {
    window.addEventListener('error', (event) => {
      this.logError('JavaScript Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.logError('Unhandled Promise Rejection', {
        reason: event.reason
      });
    });
  }

  // Log metrics
  logMetric(name, value) {
    console.log(`📊 ${name}: ${value.toFixed(2)}ms`);
    
    // Send to analytics if available
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value
      });
    }
  }

  // Log errors
  logError(type, details) {
    console.error(`❌ ${type}:`, details);
    
    // Send to error tracking if available
    if (window.Sentry) {
      window.Sentry.captureException(new Error(type), {
        extra: details
      });
    }
  }

  // Get all metrics
  getMetrics() {
    return { ...this.metrics };
  }

  // Get performance score
  getPerformanceScore() {
    const scores = {
      lcp: this.getLCPScore(),
      fid: this.getFIDScore(),
      cls: this.getCLSScore(),
      fcp: this.getFCPScore(),
      ttfb: this.getTTFBScore()
    };
    
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Math.round(totalScore / Object.keys(scores).length);
  }

  // Score individual metrics
  getLCPScore() {
    const lcp = this.metrics.lcp;
    if (lcp <= 2500) return 100;
    if (lcp <= 4000) return 80;
    if (lcp <= 6000) return 60;
    return 40;
  }

  getFIDScore() {
    const fid = this.metrics.fid;
    if (fid <= 100) return 100;
    if (fid <= 300) return 80;
    if (fid <= 500) return 60;
    return 40;
  }

  getCLSScore() {
    const cls = this.metrics.cls;
    if (cls <= 0.1) return 100;
    if (cls <= 0.25) return 80;
    if (cls <= 0.4) return 60;
    return 40;
  }

  getFCPScore() {
    const fcp = this.metrics.fcp;
    if (fcp <= 1800) return 100;
    if (fcp <= 3000) return 80;
    if (fcp <= 4000) return 60;
    return 40;
  }

  getTTFBScore() {
    const ttfb = this.metrics.ttfb;
    if (ttfb <= 800) return 100;
    if (ttfb <= 1800) return 80;
    if (ttfb <= 3000) return 60;
    return 40;
  }

  // Cleanup
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Create global instance
const performanceMonitor = new PerformanceMonitor();

// Export for use in components
export default performanceMonitor;

// Auto-cleanup on page unload
window.addEventListener('beforeunload', () => {
  performanceMonitor.destroy();
});
