'use client';

import { useEffect, useEffectEvent, useId, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
    __turnstileLoader?: Promise<void>;
  }
}

type TurnstileWidgetProps = {
  onTokenChange: (token: string) => void;
  resetSignal?: number;
};

function ensureTurnstileScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.turnstile) {
    return Promise.resolve();
  }

  if (window.__turnstileLoader) {
    return window.__turnstileLoader;
  }

  window.__turnstileLoader = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-turnstile-script="true"]');

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Turnstile failed to load.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = 'true';
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('Turnstile failed to load.')), { once: true });
    document.head.appendChild(script);
  });

  return window.__turnstileLoader;
}

export default function TurnstileWidget({ onTokenChange, resetSignal = 0 }: TurnstileWidgetProps) {
  const widgetContainerId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const handleTokenChange = useEffectEvent((token: string) => {
    onTokenChange(token);
  });

  useEffect(() => {
    if (!siteKey || !containerRef.current) {
      return;
    }

    let cancelled = false;

    ensureTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile || widgetIdRef.current) {
          return;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: (token: string) => handleTokenChange(token),
          'expired-callback': () => handleTokenChange(''),
          'error-callback': () => handleTokenChange(''),
        });
      })
      .catch(() => {
        handleTokenChange('');
      });

    return () => {
      cancelled = true;

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [handleTokenChange, siteKey]);

  useEffect(() => {
    if (!widgetIdRef.current || !window.turnstile) {
      return;
    }

    window.turnstile.reset(widgetIdRef.current);
    handleTokenChange('');
  }, [handleTokenChange, resetSignal]);

  if (!siteKey) {
    return null;
  }

  return <div id={widgetContainerId} ref={containerRef} className="min-h-[65px]" />;
}
