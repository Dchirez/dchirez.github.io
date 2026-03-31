export function renderNav() {
    return `
    <nav class="fixed top-0 w-full h-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm z-50 transition-colors duration-300">
        <div class="container mx-auto px-4 h-full flex items-center justify-between">
            <a href="#/" class="text-2xl font-bold text-blue-900 dark:text-blue-400 tracking-tight">
                Damien<span class="text-blue-600 dark:text-blue-500">.Dev</span>
            </a>
            <div class="flex items-center gap-4">
                <button class="lang-toggle-btn p-2 font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">EN</button>
                <button id="theme-toggle-btn" class="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition">
                    <svg class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    <svg class="w-6 h-6 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                </button>
                <a href="https://github.com/Dchirez?tab=repositories" target="_blank" class="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition" title="GitHub">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                </a>
                <button id="burger-menu-btn" class="md:hidden flex items-center p-2 text-gray-600 dark:text-gray-300 focus:outline-none">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <div class="hidden md:flex items-center gap-8">
                    <a href="#/" class="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        <span class="lang-fr">Accueil</span><span class="lang-en">Home</span>
                    </a>
                    <a href="#/projets" class="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        <span class="lang-fr">Mes projets</span><span class="lang-en">Projects</span>
                    </a>
                    <a href="#/formations" class="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        <span class="lang-fr">Formations</span><span class="lang-en">Education</span>
                    </a>
                    <a href="#/contact" class="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        <span class="lang-fr">Me contacter</span><span class="lang-en">Contact</span>
                    </a>
                    <a href="https://github.com/Dchirez?tab=repositories" target="_blank" class="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" title="GitHub">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                    </a>
                    <a href="/CV_2026-03-18_Damien_Chirez.pdf" target="_blank" class="px-4 py-2 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg font-bold">
                        <span class="lang-fr">CV</span><span class="lang-en">Resume</span>
                    </a>
                </div>
            </div>
        </div>
        <div id="mobile-menu" class="hidden absolute top-20 left-0 w-full bg-white dark:bg-gray-900 shadow-xl z-40 md:hidden border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div class="flex flex-col px-6 py-4 space-y-4">
                <a href="#/" class="block text-lg font-medium text-gray-700 dark:text-gray-200 border-b border-gray-50 dark:border-gray-800 pb-2">
                    <span class="lang-fr">Accueil</span><span class="lang-en">Home</span>
                </a>
                <a href="#/projets" class="block text-lg font-medium text-gray-700 dark:text-gray-200 border-b border-gray-50 dark:border-gray-800 pb-2">
                    <span class="lang-fr">Mes projets</span><span class="lang-en">Projects</span>
                </a>
                <a href="#/formations" class="block text-lg font-medium text-gray-700 dark:text-gray-200 border-b border-gray-50 dark:border-gray-800 pb-2">
                    <span class="lang-fr">Formations</span><span class="lang-en">Education</span>
                </a>
                <a href="#/contact" class="block text-lg font-medium text-gray-700 dark:text-gray-200 border-b border-gray-50 dark:border-gray-800 pb-2">
                    <span class="lang-fr">Me contacter</span><span class="lang-en">Contact</span>
                </a>
                <a href="https://github.com/Dchirez?tab=repositories" target="_blank" class="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-200 border-b border-gray-50 dark:border-gray-800 pb-2 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                    <span class="lang-fr">GitHub</span><span class="lang-en">GitHub</span>
                </a>
                <a href="/CV_2026-03-18_Damien_Chirez.pdf" target="_blank" class="block text-center px-4 py-2 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg font-bold">
                    <span class="lang-fr">Voir mon CV</span><span class="lang-en">View Resume</span>
                </a>
            </div>
        </div>
    </nav>`;
}
