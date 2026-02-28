// Конфигурация Google Analytics
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; 

// 1. Загрузка основного скрипта gtag.js
function loadGAScript() {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com{GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
}

// 2. Инициализация функций отслеживания
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

// 3. Запуск при загрузке
loadGAScript();
gtag('js', new Date());
gtag('config', GA_MEASUREMENT_ID);

// Экспортируем функцию для отслеживания событий (например, поиска)
function trackEvent(action, category, label) {
    if (typeof gtag === 'function') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}