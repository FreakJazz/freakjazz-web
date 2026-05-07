// Google Analytics 4 Integration
// https://developers.google.com/analytics/devguides/collection/ga4

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Get GA Measurement ID from environment
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

/**
 * Load Google Analytics script
 * Call this once in your app initialization
 */
export const loadGoogleAnalytics = (): void => {
  if (typeof window === 'undefined') {
    console.warn('Google Analytics: Window is undefined, skipping initialization');
    return;
  }

  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics: Measurement ID not found in environment variables');
    return;
  }

  // Check if already loaded
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
    console.log('Google Analytics: Already loaded');
    return;
  }

  // Create and append the GA script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };

  // Configure GA
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  });

  console.log('Google Analytics: Initialized successfully', GA_MEASUREMENT_ID);
};

/**
 * Track custom events
 * @param eventName - Name of the event (e.g., 'quote_form_submit')
 * @param eventParams - Optional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('Google Analytics: gtag not available');
    return;
  }

  window.gtag('event', eventName, eventParams);
  console.log('GA Event:', eventName, eventParams);
};

/**
 * Track page views (for SPA navigation)
 * @param url - Page URL to track
 * @param title - Optional page title
 */
export const trackPageView = (url: string, title?: string): void => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('Google Analytics: gtag not available');
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  });

  console.log('GA Page View:', url);
};

/**
 * Track conversions (form submissions, purchases, etc.)
 * @param conversionId - Conversion event name
 * @param value - Optional conversion value
 * @param currency - Currency code (default: USD)
 */
export const trackConversion = (
  conversionId: string,
  value?: number,
  currency: string = 'USD'
): void => {
  trackEvent(conversionId, {
    value,
    currency,
    event_category: 'conversion',
  });
};

/**
 * Track user interactions
 * @param category - Event category (e.g., 'button', 'link', 'video')
 * @param action - Action taken (e.g., 'click', 'play', 'download')
 * @param label - Optional label for the interaction
 */
export const trackInteraction = (category: string, action: string, label?: string): void => {
  trackEvent(`${category}_${action}`, {
    event_category: category,
    event_action: action,
    event_label: label,
  });
};

/**
 * Track quote form events
 */
export const trackQuoteFormEvent = {
  started: () => {
    trackEvent('quote_form_started', {
      event_category: 'engagement',
      event_label: 'user_started_quote_form',
    });
  },

  blockCompleted: (blockNumber: number, blockName: string) => {
    trackEvent('quote_form_block_completed', {
      event_category: 'engagement',
      block_number: blockNumber,
      block_name: blockName,
    });
  },

  submitted: (data: {
    companyType?: string;
    solutionType?: string;
    budget?: string;
    industry?: string;
    timeline?: string;
  }) => {
    trackEvent('quote_form_submit', {
      event_category: 'engagement',
      ...data,
    });
  },

  success: () => {
    trackConversion('quote_form_success', 1);
  },

  error: (errorMessage: string) => {
    trackEvent('quote_form_error', {
      event_category: 'error',
      error_message: errorMessage,
    });
  },
};

/**
 * Track navigation events
 */
export const trackNavigation = {
  menuClick: (menuItem: string) => {
    trackInteraction('navigation', 'menu_click', menuItem);
  },

  linkClick: (linkUrl: string, linkText: string) => {
    trackInteraction('navigation', 'link_click', `${linkText} - ${linkUrl}`);
  },

  ctaClick: (ctaText: string, ctaLocation: string) => {
    trackEvent('cta_click', {
      event_category: 'engagement',
      cta_text: ctaText,
      cta_location: ctaLocation,
    });
  },
};

/**
 * Track user timing (performance metrics)
 */
export const trackTiming = (
  name: string,
  value: number,
  category: string = 'performance'
): void => {
  trackEvent('timing_complete', {
    name,
    value,
    event_category: category,
  });
};
