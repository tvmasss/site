document.addEventListener("DOMContentLoaded", async function() {
    const container = document.getElementById('new-container');
    if (!container) return;

    try {
        const response = await fetch('/js/newarticles.json'); 
        if (!response.ok) throw new Error("JSON 404");
        
        const posts = await response.json();
        const currentPath = window.location.pathname;






        let html = '<div id="enjoylife-recent-2" class="widget widget-enjoylife-recent widget-posts-thumbnail"><h2 class="widget-title"><span>Недавние статьи</span></h2><div class="pop-list">';

        // Фильтруем и берем 5 штук
        const filtered = posts.filter(p => p.url !== currentPath).slice(0, 5);

        filtered.forEach(post => {
            html += `
                 <a href="${post.url}" class="pop-item" 
                   style="display: flex !important; flex-direction: row !important; align-items: flex-start !important; text-decoration: none !important; margin-bottom: 15px !important; width: 100% !important;"
                   onmouseover="this.querySelector('.pop-title').style.color='#00ad45'" 
                   onmouseout="this.querySelector('.pop-title').style.color='#333'">
                    
                    <div class="pop-img-col" style="flex-shrink: 0 !important; width: 100px !important; margin-right: 12px !important;">
                        <img src="${post.img}" 
                             style="width: 100px !important; height: 75px !important; min-width: 100px !important; max-width: 100px !important; min-height: 75px !important; max-height: 75px !important; object-fit: cover !important; display: block !important; border-radius: 4px !important;">
                    </div>
                    
                    <div class="pop-txt-col" style="flex-grow: 1 !important; min-width: 0 !important;">
                        <span class="pop-title" 
                              style="font-size: 14px !important; line-height: 1.3 !important; color: #333 !important; font-weight: 600 !important; display: block !important; text-align: left !important; transition: color 0.2s ease;">
                            ${post.title}
                        </span>
                    </div>
                </a></div>`;
        });

        html += '</div>';
        container.innerHTML = html;
    } catch (e) {
        console.error("Ошибка:", e);
    }
});