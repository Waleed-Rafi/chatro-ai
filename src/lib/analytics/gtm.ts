// Google Tag Manager Core Configuration
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Initialize GTM
export const initializeGTM = () => {
  if (typeof window !== 'undefined' && GTM_ID) {
    // Load GTM script
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(script);
  }
};

// Push event to data layer
export const pushEvent = (event: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event);
  }
};

// Declare global dataLayer
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
