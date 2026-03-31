export function Contact() {
    return `
    <main class="container mx-auto px-4 flex-grow flex items-center justify-center py-10">
        <div class="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                <span class="lang-fr">Gardons le contact</span><span class="lang-en">Let's Keep in Touch</span>
            </h1>
            <div class="flex flex-col md:flex-row gap-4 justify-center items-center w-full mt-10">
                <a href="mailto:dchirez59@gmail.com" class="px-8 py-3 rounded-full bg-blue-600 text-white font-bold w-full md:w-auto hover:bg-blue-700 transition">
                    Email
                </a>
                <a href="tel:+33643246291" class="px-8 py-3 rounded-full border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition w-full md:w-auto">
                    06 43 24 62 91
                </a>
            </div>
        </div>
    </main>`;
}
