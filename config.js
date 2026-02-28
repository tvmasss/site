const SITE_CONFIG = {
    name: "Лайфхакиум",
    logo: "", // Прямая ссылка на лого
    footerText: `© ${new Date().getFullYear()} Все права защищены.`,
    
    // Ссылки для поиска
    searchPlaceholder: "Найти...",
    apiSearchUrl: "http://g9869137.beget.tech/handler.php"
};

// Функция для автоматического заполнения общих элементов (шапка, футер)
function initSiteLayout() {
    // Заполняем название сайта (если есть элементы с классом site-name)
    document.querySelectorAll('.site-name').forEach(el => el.innerText = SITE_CONFIG.name);
    
    // Заполняем логотип
    const logoImg = document.getElementById('site-logo');
    if (logoImg) logoImg.src = SITE_CONFIG.logo;

    // Заполняем футер
    const footer = document.getElementById('site-footer-text');
    if (footer) footer.innerText = SITE_CONFIG.footerText;
}

// Запускаем при загрузке
document.addEventListener("DOMContentLoaded", initSiteLayout);


document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('site-search');

    if (searchInput) {
        // Слушаем нажатие клавиш в поле поиска
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Предотвращаем перезагрузку страницы
                handleSearch();         // Вызываем вашу функцию поиска
            }
        });
    }
});