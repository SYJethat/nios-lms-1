'use client';

import React from 'react';
import Script from 'next/script';

export function HydrationFix() {
    return (
        <Script
            id="hydration-fix"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
          (function() {
            function removeCzAttribute() {
              if (typeof document !== 'undefined' && document.body && document.body.hasAttribute('cz-shortcut-listen')) {
                document.body.removeAttribute('cz-shortcut-listen');
              }
            }

            // Remove immediately
            removeCzAttribute();

            // Watch for if the extension adds it again
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'cz-shortcut-listen') {
                  removeCzAttribute();
                }
              });
            });

            if (typeof document !== 'undefined' && document.body) {
                observer.observe(document.body, { 
                  attributes: true, 
                  attributeFilter: ['cz-shortcut-listen'] 
                });
            }

            // Also clean on load
            window.addEventListener('load', removeCzAttribute);
          })();
        `,
            }}
        />
    );
}