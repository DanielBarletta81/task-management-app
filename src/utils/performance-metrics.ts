// Modern way to measure Largest Contentful Paint
export function measureLCP(callback: (lcp: number) => void): void {
  // Create a variable to store the LCP value
  let lcpValue: number | null = null;
  
  // Create new PerformanceObserver instance
  const po = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    // We use the latest LCP entry as it's the most accurate
    const latestEntry = entries[entries.length - 1];
    
    if (latestEntry) {
      // startTime gives us the LCP value in milliseconds
      lcpValue = latestEntry.startTime;
      callback(lcpValue);
    }
  });

  // Register observer for LCP
  po.observe({ type: 'largest-contentful-paint', buffered: true });
  
  // Disconnect observer once the page is fully loaded
  window.addEventListener('load', () => {
    if (lcpValue === null) {
      // If LCP wasn't captured yet, wait a bit more
      setTimeout(() => {
        po.disconnect();
        // If we still have a value, report it
        if (lcpValue !== null) {
          callback(lcpValue);
        }
      }, 1000);
    } else {
      po.disconnect();
    }
  });
}