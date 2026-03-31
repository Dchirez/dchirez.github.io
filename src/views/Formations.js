export function Formations() {
    return `
    <main class="container mx-auto px-4 py-10 flex-grow">
        <div class="text-center mb-10 max-w-2xl mx-auto">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
                <span class="lang-fr">Mes Formations</span><span class="lang-en">My Education</span>
            </h1>
        </div>
        <div class="max-w-3xl mx-auto space-y-6">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-4 border-l-blue-600 transition-colors duration-300">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                    <span class="lang-fr">2e année en BUT Informatique</span><span class="lang-en">2nd year in IT Bachelor's Degree</span>
                </h3>
                <p class="text-blue-600 dark:text-blue-400 font-semibold mt-1">IUT Lens • 2025 - 2026</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-4 border-l-gray-300 dark:border-l-gray-600 transition-colors duration-300">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                    <span class="lang-fr">Baccalauréat Général</span><span class="lang-en">High School Diploma</span>
                </h3>
                <p class="text-gray-600 dark:text-gray-400 font-semibold mt-1">Lycée Jean Bart Dunkerque • 2024 - 2025</p>
            </div>
        </div>
    </main>`;
}
