document.addEventListener("DOMContentLoaded", function() {
    // Наша база данных: ID блока => Данные
    const adDatabase = {
        // Горизонтальные баннеры
        'banner1': { type: 'h', link: '/promo1', img: 'https://demo.wpenjoy.com/enjoylife/wp-content/uploads/sites/10/2021/05/content-banner2.png' },
        'banner2': { type: 'h', link: '/promo2', img: 'https://demo.wpenjoy.com/enjoylife/wp-content/uploads/sites/10/2021/05/content-ad6.png' },
        'banner3': { type: 'h', link: '/promo3', img: 'https://demo.wpenjoy.com/enjoylife/wp-content/uploads/sites/10/2021/05/content-ad6.png' },

        // Квадратные блоки
        'bansquare1':   { type: 's', link: '/sale1',  img: 'https://demo.wpenjoy.com/enjoylife/wp-content/uploads/sites/10/2021/05/300x250-300x250.png' },
        'bansquare2':   { type: 's', link: '/sale2',  img: 'https://demo.wpenjoy.com/enjoylife/wp-content/uploads/sites/10/2021/05/300x250-2-300x250.png' },
        'bansquare3':   { type: 's', link: '/sale3',  img: 'https://demo.wpenjoy.com/enjoylife/wp-content/uploads/sites/10/2021/05/300x250-3-300x250.png' }
    };

    // Шаблоны разметки
    const templates = {
        'h': (data) => `
            <div class="header-ad widget_media_image">
                <a href="${data.link}">
                    <img width="880" height="109" src="${data.img}" class="image" style="max-width: 100%; height: auto;" decoding="async">
                </a>
            </div>`,
        's': (data) => `
            <div class="widget widget_media_image">
                <h2 class="widget-title"><span>Реклама</span></h2>
                <a href="${data.link}">
                    <img width=100% height="250" src="${data.img}" class="image" style="max-width: 100%; height: auto;" decoding="async" loading="lazy">
                </a>
            </div>`
    };

    // Находим все контейнеры с атрибутом data-ad-id
    document.querySelectorAll('[data-ad-id]').forEach(container => {
        const adId = container.getAttribute('data-ad-id');
        const data = adDatabase[adId];

        if (data && templates[data.type]) {
            container.innerHTML = templates[data.type](data);
        }
    });
});