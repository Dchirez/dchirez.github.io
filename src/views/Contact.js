export function Contact() {
    return `
    <main class="container mx-auto px-4 flex-grow flex items-center justify-center py-10">
        <div class="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                <span class="lang-fr">Gardons le contact</span><span class="lang-en">Let's Keep in Touch</span>
            </h1>

            <form action="https://formspree.io/f/mykbjbdb" method="POST" class="space-y-6">
                <!-- Nom -->
                <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        <span class="lang-fr">Nom</span><span class="lang-en">Name</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder=""
                    />
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        <span class="lang-fr">Email</span><span class="lang-en">Email</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="votre@email.com"
                    />
                </div>

                <!-- Sujet -->
                <div>
                    <label for="subject" class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        <span class="lang-fr">Sujet</span><span class="lang-en">Subject</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder=""
                    />
                </div>

                <!-- Message -->
                <div>
                    <label for="message" class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        <span class="lang-fr">Message</span><span class="lang-en">Message</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                        placeholder=""
                    ></textarea>
                </div>

                <!-- Bouton Soumettre -->
                <div class="flex gap-4 justify-center">
                    <button
                        type="submit"
                        class="px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                    >
                        <span class="lang-fr">Envoyer</span><span class="lang-en">Send</span>
                    </button>
                    <a href="mailto:dchirez59@gmail.com" class="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                        Email
                    </a>
                </div>
            </form>

            <!-- Informations de Contact Alternatives -->
            <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                    <span class="lang-fr">Ou contactez-moi directement :</span><span class="lang-en">Or contact me directly:</span>
                </p>
                <div class="flex flex-col md:flex-row gap-4 justify-center">
                    <a href="tel:+33643246291" class="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition text-center">
                        📞 06 43 24 62 91
                    </a>
                </div>
            </div>
        </div>
    </main>`;
}
