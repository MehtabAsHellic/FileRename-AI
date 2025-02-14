import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getFCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

export function initializePerformanceMonitoring() {
  // Report performance metrics
  reportWebVitals(({ name, value, id }) => {
    // Send to your analytics platform of choice
    console.log(`Web Vital: ${name} = ${value} (ID: ${id})`);
  });

  // Initialize Performance Observer for long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) { // Long task threshold (50ms)
            console.warn('Long Task detected:', entry);
          }
        });
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('PerformanceObserver error:', e);
    }
  }

  // Initialize Resource Timing monitoring
  try {
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 1000) { // Resource load time threshold (1s)
          console.warn('Slow resource load:', entry);
        }
      });
    });
    
    resourceObserver.observe({ entryTypes: ['resource'] });
  } catch (e) {
    console.error('Resource timing observer error:', e);
  }
}