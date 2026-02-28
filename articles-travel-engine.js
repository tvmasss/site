const API_URL = 'http://g9869137.beget.tech/handler.php'; 

async function loadArticles(page = 1, category = 'Путешествия', search = '') {
    const container = document.getElementById('articles-list-container');
    if (!container) return;

    // СТРОИМ URL: важно правильно склеить параметры
    let url = `${API_URL}?page=${page}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Отрисовка статей
        let html = '<div style="display: block; width: 100%;">';
        if (data.articles.length === 0) {
            html += '<p style="text-align:center; padding:20px;">Ничего не найдено</p>';
        }
        data.articles.forEach(post => {
            html += `
                <a href="${post.url}" class="art-item" style="display: flex; margin-bottom: 20px; text-decoration: none; color: inherit;">
                    <img src="${post.img}" style="width: 150px; height: 110px; object-fit: cover; border-radius: 6px; margin-right: 20px;">
                    <div>
                        <h3 style="margin: 0; font-size: 19px;">${post.title}</h3>
                        <p style="color: #666; font-size: 14px;">${post.desc_text}</p>
                    </div>
                </a>`;
        });
        html += '</div>';
        container.innerHTML = html;

        // 2. Отрисовка навигации
renderPagination(data.currentPage, data.totalPages, category, search);

    } catch (e) {
        console.error("Ошибка поиска:", e);
    }
}


function handleSearch() {
    const input = document.getElementById('site-search');
    const query = input ? input.value.trim() : '';
    
    // При поиске сбрасываем на 1 страницу и очищаем категорию (ищем по всему сайту)
    loadArticles(1, '', query); 
}


// 3. Обновленная навигация (чтобы поиск не терялся при переходе по страницам)
function renderPagination(currentPage, totalPages, category, search) {
    const container = document.getElementById('articles-list-container');
    const btnStyle = `display:inline-flex; align-items:center; padding:10px; background:#00ad45; color:#fff; border:none; border-radius:6px; cursor:pointer;`;

    // Создаем контейнеры если их нет
    let navBottom = document.getElementById('articles-nav-bottom') || document.createElement('div');
    if (!navBottom.id) {
        navBottom.id = 'articles-nav-bottom';
        container.after(navBottom);
    }

    let navHtml = `<div style="display:flex; gap:10px; justify-content:center; margin:20px 0 40px;">`;
    
    if (currentPage > 1) {
        // ПЕРЕДАЕМ search В goToPage
        navHtml += `<button onclick="goToPage(1, '${category}', '${search}')" style="${btnStyle}">« Первая</button>`;
        navHtml += `<button onclick="goToPage(${currentPage - 1}, '${category}', '${search}')" style="${btnStyle}">Назад</button>`;
    }

    navHtml += `<span style="align-self:center;">${currentPage} из ${totalPages}</span>`;

    if (currentPage < totalPages) {
        navHtml += `<button onclick="goToPage(${currentPage + 1}, '${category}', '${search}')" style="${btnStyle}">Вперед</button>`;
        navHtml += `<button onclick="goToPage(${totalPages}, '${category}', '${search}')" style="${btnStyle}">Последняя »</button>`;
    }
    
    navHtml += `</div>`;
    navBottom.innerHTML = navHtml;
}

function goToPage(page, category, search) {
    loadArticles(page, category, search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Запуск (можно передать название категории, например loadArticles(1, 'news'))
document.addEventListener("DOMContentLoaded", () => loadArticles(1));