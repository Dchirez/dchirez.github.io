export function Home() {
    return `
    <main class="flex-grow flex items-center justify-center relative overflow-hidden py-10">
        <div class="container mx-auto px-4 text-center z-10">
            <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
                <span class="lang-fr">Bonjour, je suis Damien et voici mon</span>
                <span class="lang-en">Hello, I am Damien and here is my</span>
                <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Portfolio</span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
                <span class="lang-fr">Étudiant en Informatique, je recherche un stage en Développement informatique à partir de la mi-Avril 2026.</span>
                <span class="lang-en">Computer Science student, I am looking for an IT Development internship starting mid-April 2026.</span>
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/projets" class="px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg">
                    <span class="lang-fr">Découvrir mes projets</span><span class="lang-en">Discover my projects</span>
                </a>
                <a href="/contact" class="px-8 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <span class="lang-fr">Me contacter</span><span class="lang-en">Contact me</span>
                </a>
            </div>
        </div>
    </main>`;
}
