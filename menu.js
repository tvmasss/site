document.addEventListener("DOMContentLoaded", function() {
    const menuHTML = `
    <nav id="primary-nav" class="main-navigation">
        <div class="menu-primary-menu-container">
            <ul id="primary-menu" class="sf-menu">
                <li class="menu-item"><a href="about">О нас</a></li>
                <li class="menu-item menu-item-has-children">
                    <a href="#">Рубрики</a><span class="icon"></span>
                    <ul class="sub-menu">
                        <li><a href="phone">Телефоны</a></li>
                        <li><a href="computer">Компьютеры</a></li>
                        <li><a href="tech">Техника</a></li>
                        <li><a href="auto">Авто</a></li>
                        <li><a href="kitchen">Кухня</a></li>
                        <li><a href="health">Здоровье</a></li>
                        <li><a href="travel">Путешествия</a></li>
                        <li><a href="jobs">Работа и Учёба</a></li>
                        <li><a href="building">Строительство</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
    `;

    const container = document.getElementById('menu-placeholder');
    
    if (container) {
        container.innerHTML = menuHTML;

        // Логика активного пункта
        const currentUrl = window.location.href;
        const links = container.querySelectorAll('a');

        links.forEach(link => {
            const href = link.getAttribute('href');
            // Проверяем, что это не просто заглушка "#" и что URL содержит путь ссылки
            if (href && href !== "#" && currentUrl.includes(href)) {
                link.classList.add('current-page');
                // Подсвечиваем родителя (Рубрики), если активна вложенная ссылка
                const parentLi = link.closest('.menu-item-has-children');
                if (parentLi) parentLi.classList.add('active');
            }
        });
    } else {
        console.error("Ошибка: Элемент #menu-placeholder не найден на странице!");
    }



    // --- ВТОРИЧНОЕ МЕНЮ ---
    const secondaryMenuHTML = `
    <nav id="secondary-nav" class="secondary-navigation">
        <div class="menu-secondary-menu-container">
            <ul id="secondary-menu" class="sf-menu">
                <li class="menu-item"><a href="/">Главная</a></li>
                <li class="menu-item"><a href="phone">Телефоны</a></li>
                <li class="menu-item"><a href="computer">Компьютеры</a></li>
                <li class="menu-item"><a href="tech">Техника</a></li>
                <li class="menu-item"><a href="auto">Авто</a></li>
                <li class="menu-item"><a href="kitchen">Кухня</a></li>
                <li class="menu-item"><a href="health">Здоровье</a></li>
                <li class="menu-item"><a href="travel">Путешествия</a></li>
                <li class="menu-item"><a href="jobs">Работа и Учёба</a></li>
                <li class="menu-item"><a href="building">Строительство</a></li>
            </ul>
        </div>
    </nav>
    `;

    const secContainer = document.getElementById('secondary-menu-placeholder');
    
    if (secContainer) {
        secContainer.innerHTML = secondaryMenuHTML;

        const currentPath = window.location.pathname; // Берем только путь (напр. /phone)
        const secLinks = secContainer.querySelectorAll('#secondary-menu li a');

        secLinks.forEach(link => {
            const href = link.getAttribute('href');
            const parentLi = link.parentElement;

            // Очищаем путь от слешей для точного сравнения
            const cleanPath = currentPath.replace(/\//g, '');
            const cleanHref = href.replace(/\//g, '');

            // Проверка для Главной
            if (href === "/" && (currentPath === "/" || currentPath === "/index.html")) {
                parentLi.classList.add('current-menu-item');
                link.classList.add('current-page');
            } 
            // Проверка для остальных страниц (точное совпадение пути)
            else if (cleanHref !== "" && cleanPath === cleanHref) {
                parentLi.classList.add('current-menu-item');
                link.classList.add('current-page');
            }
        });
    }



    // --- МОБИЛЬНОЕ МЕНЮ ---
    const mobileMenuHTML = `
    <nav class="mobile-menu" aria-label="Mobile" role="navigation">
        <ul class="modal-menu reset-list-style">
            <li class="menu-item"><div class="ancestor-wrapper"><a href="/">Главная</a></div></li>
            <li class="menu-item"><div class="ancestor-wrapper"><a href="phone">Телефоны</a></div></li>
            <li class="menu-item"><div class="ancestor-wrapper"><a href="computer">Компьютеры</a></div></li>
            <li class="menu-item"><div class="ancestor-wrapper"><a href="tech">Техника</a></div></li>
            <li class="menu-item"><div class="ancestor-wrapper"><a href="auto">Авто</a></div></li>
            <li class="menu-item"><div class="ancestor-wrapper"><a href="kitchen">Кухня</a></div></li>
            <li class="menu-item"><div class="ancestor-wrapper"><a href="health">Здоровье</a></div></li>
            <li class="menu-item"><div class="ancestor-wrapper"><a href="travel">Путешествия</a></div></li>
            <li class="menu-item"><div class="ancestor-wrapper"><a href="jobs">Работа и Учёба</a></div></li>
            <li class="menu-item"><div class="ancestor-wrapper"><a href="building">Строительство</a></div></li>
        </ul>
    </nav>
    `;

    const mobContainer = document.getElementById('mobile-menu-placeholder');
    
    if (mobContainer) {
        mobContainer.innerHTML = mobileMenuHTML;

        // Логика подсветки активного пункта
        const currentPath = window.location.pathname;
        const mobLinks = mobContainer.querySelectorAll('.modal-menu a');

        mobLinks.forEach(link => {
            const href = link.getAttribute('href');
            const parentLi = link.closest('.menu-item');

            const cleanPath = currentPath.replace(/\//g, '');
            const cleanHref = href.replace(/\//g, '');

            if (href === "/" && (currentPath === "/" || currentPath === "/index.html")) {
                parentLi.classList.add('current-menu-item');
            } else if (cleanHref !== "" && cleanPath === cleanHref) {
                parentLi.classList.add('current-menu-item');
            }
        });
    }




});
