type AnalyticsEvent = {
    action: string;
    category: string;
    label?: string;
};

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
        gtag?: (...args: unknown[]) => void;
    }
}

let initialized = false;

export function initializeAnalytics() {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

    if (!measurementId || initialized) {
        return;
    }

    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push({ event: "gtag", args });
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
}

export function trackEvent({ action, category, label }: AnalyticsEvent) {
    if (window.gtag) {
        window.gtag("event", action, { event_category: category, event_label: label });
    }

    window.dataLayer?.push({ event: action, category, label });
}
