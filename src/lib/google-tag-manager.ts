// Google Tag Manager Integration
// https://developers.google.com/tag-platform/tag-manager/web

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Get GTM ID from environment
export const GTM_ID = import.meta.env.VITE_GTM_ID || '';

/**
 * Load Google Tag Manager
 * Call this once in your app initialization
 */
export const loadGoogleTagManager = (): void => {
  if (typeof window === 'undefined') {
    console.warn('GTM: Window is undefined, skipping initialization');
    return;
  }

  if (!GTM_ID) {
    console.warn('GTM: Container ID not found in environment variables');
    return;
  }

  // Check if already loaded
  if (document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`)) {
    console.log('GTM: Already loaded');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  // Create and append the GTM script to <head>
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Create and append the noscript iframe to <body>
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);

  console.log('GTM: Initialized successfully', GTM_ID);
};

/**
 * Push custom events to GTM dataLayer
 * @param event - Event name
 * @param data - Additional event data
 */
export const pushToDataLayer = (event: string, data?: Record<string, any>): void => {
  if (typeof window === 'undefined' || !window.dataLayer) {
    console.warn('GTM: dataLayer not available');
    return;
  }

  window.dataLayer.push({
    event,
    ...data,
  });

  console.log('GTM Event:', event, data);
};

/**
 * Track page views through GTM
 * @param url - Page URL
 * @param title - Page title
 */
export const trackPageViewGTM = (url: string, title?: string): void => {
  pushToDataLayer('pageview', {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};

/**
 * Track custom events through GTM
 * @param eventName - Name of the event
 * @param eventData - Event data
 */
export const trackEventGTM = (eventName: string, eventData?: Record<string, any>): void => {
  pushToDataLayer(eventName, eventData);
};

/**
 * Track form submissions
 */
export const trackFormSubmitGTM = (formName: string, formData?: Record<string, any>): void => {
  pushToDataLayer('form_submit', {
    form_name: formName,
    ...formData,
  });
};

/**
 * Track conversions
 */
export const trackConversionGTM = (
  conversionName: string,
  value?: number,
  currency: string = 'USD'
): void => {
  pushToDataLayer('conversion', {
    conversion_name: conversionName,
    value,
    currency,
  });
};

/**
 * Track quote form events for GTM
 */
export const trackQuoteFormGTM = {
  started: () => {
    pushToDataLayer('quote_form_started', {
      event_category: 'engagement',
    });
  },

  blockCompleted: (blockNumber: number, blockName: string) => {
    pushToDataLayer('quote_form_block_completed', {
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
    pushToDataLayer('quote_form_submit', {
      event_category: 'engagement',
      ...data,
    });
  },

  success: () => {
    pushToDataLayer('quote_form_success', {
      event_category: 'conversion',
      conversion_value: 1,
    });
  },

  error: (errorMessage: string) => {
    pushToDataLayer('quote_form_error', {
      event_category: 'error',
      error_message: errorMessage,
    });
  },
};

/**
 * Track navigation events
 */
export const trackNavigationGTM = {
  menuClick: (menuItem: string) => {
    pushToDataLayer('menu_click', {
      event_category: 'navigation',
      menu_item: menuItem,
    });
  },

  linkClick: (linkUrl: string, linkText: string) => {
    pushToDataLayer('link_click', {
      event_category: 'navigation',
      link_url: linkUrl,
      link_text: linkText,
    });
  },

  ctaClick: (ctaText: string, ctaLocation: string) => {
    pushToDataLayer('cta_click', {
      event_category: 'engagement',
      cta_text: ctaText,
      cta_location: ctaLocation,
    });
  },
};

/**
 * Track user data (for remarketing, etc.)
 * Only use if user has consented
 */
export const setUserDataGTM = (userId?: string, userData?: Record<string, any>): void => {
  if (userId) {
    pushToDataLayer('set_user_id', {
      user_id: userId,
    });
  }

  if (userData) {
    pushToDataLayer('set_user_data', userData);
  }
};

/**
 * Track e-commerce events (if needed in the future)
 */
export const trackEcommerceGTM = {
  viewItem: (itemId: string, itemName: string, price: number) => {
    pushToDataLayer('view_item', {
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          price,
        },
      ],
    });
  },

  addToCart: (itemId: string, itemName: string, price: number, quantity: number = 1) => {
    pushToDataLayer('add_to_cart', {
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          price,
          quantity,
        },
      ],
    });
  },

  purchase: (transactionId: string, value: number, items: any[]) => {
    pushToDataLayer('purchase', {
      transaction_id: transactionId,
      value,
      currency: 'USD',
      items,
    });
  },
};
