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
                <a href="https://github.com/Dchirez" target="_blank" class="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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
                    <a href="https://github.com/Dchirez" target="_blank" class="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" title="GitHub">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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
                <a href="https://github.com/Dchirez" target="_blank" class="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-200 border-b border-gray-50 dark:border-gray-800 pb-2 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <span class="lang-fr">GitHub</span><span class="lang-en">GitHub</span>
                </a>
                <a href="/CV_2026-03-18_Damien_Chirez.pdf" target="_blank" class="block text-center px-4 py-2 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg font-bold">
                    <span class="lang-fr">Voir mon CV</span><span class="lang-en">View Resume</span>
                </a>
            </div>
        </div>
    </nav>`;
}
