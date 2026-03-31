import { router } from './router.js';
import { renderNav } from './components/Nav.js';

const app = document.getElementById('app');

function renderLayout(content) {
    if (!app) return;
    app.innerHTML = `
        ${renderNav()}
        <div class="pt-20 flex-grow flex flex-col w-full">
            ${content}
        </div>
        <footer class="bg-gray-800 dark:bg-black text-gray-300 py-8 border-t-4 border-blue-600 mt-auto w-full transition-colors duration-300">
            <div class="container mx-auto px-4 text-center text-sm">
                <span class="lang-fr">&copy; 2026 Damien CHIREZ. Tous droits réservés.</span>
                <span class="lang-en">&copy; 2026 Damien CHIREZ. All rights reserved.</span>
            </div>
        </footer>
    `;
    setupLanguage();
}

function setupTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
        });
    }
}

function setupLanguage() {
    let currentLang = localStorage.getItem('language') || 'fr';
    document.body.classList.remove('fr', 'en');
    document.body.classList.add(currentLang);

    const langBtns = document.querySelectorAll('.lang-toggle-btn');
    langBtns.forEach(btn => {
        btn.innerText = currentLang === 'fr' ? 'EN' : 'FR';
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            localStorage.setItem('language', currentLang);
            document.body.classList.remove('fr', 'en');
            document.body.classList.add(currentLang);
            document.querySelectorAll('.lang-toggle-btn').forEach(b => {
                b.innerText = currentLang === 'fr' ? 'EN' : 'FR';
            });
        });
    });
}

function updateScrollProgress() {
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        progressBar.style.height = `${progress}%`;
    }
}

function handleNavigation() {
    let path = window.location.pathname;
    if (!path || path === '/' || path === '') path = '/';

    const view = router[path] || router['/'];
    if (typeof view === 'function') {
        renderLayout(view());
        setupTheme();
    } else {
        renderLayout('<h2 class="text-center py-20 text-2xl dark:text-white"><span class="lang-fr">Erreur 404 - Vue introuvable</span><span class="lang-en">Error 404 - View not found</span></h2>');
    }

    setTimeout(updateScrollProgress, 50);
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
        const href = link.getAttribute('href');
        // Intercepter les liens internes
        if (href && href.startsWith('/') && !link.target) {
            e.preventDefault();
            window.history.pushState({}, '', href);
            handleNavigation();

            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            return;
        }
    }

    const burgerBtn = e.target.closest('#burger-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (burgerBtn && mobileMenu) {
        mobileMenu.classList.toggle('hidden');
        return;
    }

    if (mobileMenu && !mobileMenu.classList.contains('hidden') && e.target.closest('a')) {
        mobileMenu.classList.add('hidden');
    }
});

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);
window.addEventListener('popstate', handleNavigation);
window.addEventListener('load', handleNavigation);

handleNavigation();
