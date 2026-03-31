export function Projects() {
    const techLogos = {
        java: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
        c: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg',
        web: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
        typescript: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
        kotlin: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/kotlin/kotlin-original.svg',
        angular: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angular/angular-original.svg',
        python: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg'
    };

    const projets = [
        { 
            id: 'lensymphony', icon: '🎵', bg: 'bg-blue-600', titre: 'LenSymphony', tech: 'java', techDisplay: 'Java / XML', type: 'univ', 
            descFr: 'Projet d\'étude : Synthétiseur musical XML.', descEn: 'Academic project: XML musical synthesizer.',
            detailsFr: 'Projet universitaire réalisé en groupe de quatre étudiants. L\'objectif était de développer un synthétiseur musical capable de lire et d\'interpréter des partitions au format XML. Organisé en méthode agile avec des sprints d\'une semaine, ce projet nous a permis d\'approfondir nos compétences en Java et dans l\'automatisation avec Gradle. Le programme analyse le fichier XML en entrée pour générer et faire jouer la musique avec les instruments spécifiés dans les consignes.',
            detailsEn: 'University project carried out in a group of four students. The objective was to develop a musical synthesizer capable of reading and interpreting XML sheet music. Organized using agile methodology with weekly sprints, this project allowed us to deepen our skills in Java and Gradle automation. The program parses the input XML file to generate and play the music with the specified instruments.'
        },
        { 
            id: 'mariage', icon: '💍', bg: 'bg-pink-500', titre: 'UnOuiPourLaVie', tech: 'web', techDisplay: 'HTML / CSS', type: 'univ', 
            descFr: 'Création d\'un site web complet pour organiser un mariage.', descEn: 'Creation of a complete website for wedding planning.',
            detailsFr: 'Création d\'un site web vitrine complet en HTML et CSS pur, conçu pour organiser le mariage de ses rêves. Afin de proposer l\'expérience utilisateur la plus ergonomique possible, nous avons mené une analyse sur les sites de Wedding Planners les plus populaires de l\'industrie. Ce projet m\'a permis de consolider mes bases en intégration web, en design responsive et en structuration sémantique des pages.',
            detailsEn: 'Creation of a complete showcase website in pure HTML and CSS, designed to plan your dream wedding. To offer the most ergonomic user experience possible, we conducted an analysis on the most popular Wedding Planner sites in the industry. This project allowed me to consolidate my foundations in web integration, responsive design, and semantic page structuring.'
        },
        {
            id: 'quizz', icon: '❓', logo: '/logo/QuizzLogo.png', bg: 'bg-yellow-500', titre: 'Quizz Culture G', tech: 'c', techDisplay: 'C', type: 'perso', 
            descFr: 'Jeu de questions-réponses interactif en console.', descEn: 'Interactive console-based trivia game.',
            detailsFr: 'L\'un de mes tout premiers projets personnels, développé en C. Il s\'agit d\'un jeu de quizz interactif en console testant la culture générale du joueur à travers plusieurs thématiques. L\'utilisateur interagit en saisissant les numéros de ses réponses. Ce projet m\'a aidé à maîtriser les bases de la programmation impérative, la gestion des entrées/sorties standards et les structures de contrôle.',
            detailsEn: 'One of my very first personal projects, developed in C. It is an interactive console quiz game testing the player\'s general knowledge across several themes. The user interacts by entering the numbers of their answers. This project helped me master the basics of imperative programming, standard I/O management, and control structures.'
        },
        {
            id: 'justeprix', icon: '🏷️', logo: '/logo/JustePrixLogo.png', bg: 'bg-purple-500', titre: 'Juste Prix', tech: 'c', techDisplay: 'C', type: 'perso', 
            descFr: 'Mini-jeu basé sur le célèbre concept télévisé.', descEn: 'Mini-game based on the famous TV show concept.',
            detailsFr: 'Mini-jeu développé en C reprenant le concept du "Juste Prix". Le programme génère un prix aléatoire que le joueur doit deviner, en se basant sur un système de niveaux de difficulté paramétrables. Le retour d\'information interactif se fait via la console. C\'était une excellente introduction à la logique algorithmique et à la manipulation des variables aléatoires.',
            detailsEn: 'Mini-game developed in C based on the "Price is Right" concept. The program generates a random price that the player has to guess, based on a system of adjustable difficulty levels. Interactive feedback is provided via the console. This was an excellent introduction to algorithmic logic and random variable manipulation.'
        },
        {
            id: 'pacman', icon: '🟡', logo: '/logo/PacManLogo.png', bg: 'bg-orange-500', titre: 'Pac-Man', tech: 'java', techDisplay: 'Java / Gradle', type: 'univ', 
            descFr: 'Reproduction du jeu culte avec Patrons de Conception.', descEn: 'Reproduction of the cult game with Design Patterns.',
            detailsFr: 'Projet académique d\'envergure réalisé en équipe de quatre, visant à recréer de A à Z le célèbre jeu Pac-Man en Java et JavaFX, avec l\'outil de build Gradle. Nous y avons implémenté rigoureusement divers Patrons de Conception (Design Patterns) étudiés en cours. Le développement s\'est étalé sur plusieurs semaines selon la méthode Agile, avec des sprints réguliers et une gestion de version stricte via un dépôt Git et un système de tickets.',
            detailsEn: 'Large-scale academic project carried out by a team of four, aiming to recreate the famous Pac-Man game from scratch in Java and JavaFX, using the Gradle build tool. We strictly implemented various Design Patterns studied in class. The development spanned several weeks according to the Agile methodology, with regular sprints and strict version control via a Git repository and an issue tracking system.'
        },
        { 
            id: 'portfoliov1', icon: '🌐', bg: 'bg-indigo-500', titre: 'Portfolio V1', tech: 'web', techDisplay: 'Web', type: 'perso', 
            descFr: 'Conception de mon tout premier site personnel.', descEn: 'Design of my very first personal website.',
            detailsFr: 'Conception et développement de la toute première version de mon portfolio en ligne. Ce site a été entièrement codé à la main, en partant de zéro, sans utiliser le moindre framework ou bibliothèque externe (HTML/CSS natif). L\'objectif principal était de mettre en pratique mes compétences en conception web et de posséder une première véritable vitrine pour mes projets.',
            detailsEn: 'Design and development of the very first version of my online portfolio. This site was entirely coded by hand from scratch, without using any framework or external library (native HTML/CSS). The main objective was to put my web design skills into practice and to have a real first showcase for my projects.'
        },
        {
            id: 'bataille', icon: '🚢', logo: '/logo/BatailleLogo.png', bg: 'bg-teal-500', titre: 'Bataille Navale', tech: 'c', techDisplay: 'C', type: 'perso', 
            descFr: 'Jeu de plateau interactif contre une IA basique.', descEn: 'Interactive board game against a basic AI.',
            detailsFr: 'Jeu de bataille navale classique jouable dans le terminal, entièrement programmé en langage C. Ce projet met en œuvre la manipulation de tableaux à deux dimensions (matrices) pour gérer la grille de jeu de manière fluide, ainsi qu\'une intelligence artificielle basique permettant au joueur d\'affronter l\'ordinateur de manière automatisée.',
            detailsEn: 'Classic battleship game playable in the terminal, entirely programmed in C. This project implements the manipulation of two-dimensional arrays (matrices) to smoothly manage the game grid, as well as a basic artificial intelligence allowing the player to play against the computer automatically.'
        },
        {
            id: 'demineur', icon: '💣', logo: '/logo/DemineurLogo.png', bg: 'bg-red-500', titre: 'Démineur', tech: 'c', techDisplay: 'C', type: 'perso', 
            descFr: 'Génération de grille et algorithme de déminage.', descEn: 'Grid generation and minesweeper algorithm.',
            detailsFr: 'Reproduction du célèbre jeu du Démineur en console, codé en C. Le programme génère dynamiquement une grille à double entrée et y répartit aléatoirement un nombre défini de mines en fonction de la difficulté sélectionnée par l\'utilisateur. Le joueur peut interagir en saisissant les coordonnées pour révéler une case ou y placer un drapeau.',
            detailsEn: 'Reproduction of the famous Minesweeper game in the console, coded in C. The program dynamically generates a double-entry grid and randomly distributes a defined number of mines based on the difficulty selected by the user. The player can interact by entering coordinates to reveal a square or place a flag.'
        },
        { 
            id: 'coffre', icon: '🔐', bg: 'bg-slate-600', titre: 'SecurWord', tech: 'java typescript', techDisplay: 'Java / TypeScript', type: 'perso', 
            descFr: 'Gestionnaire sécurisé de mots de passe.', descEn: 'Secure password manager.',
            detailsFr: 'Application de cybersécurité personnelle développée en Java et TypeScript. Ce coffre-fort numérique permet le stockage crypté et sécurisé des mots de passe et des identifiants de l\'utilisateur. En complément, l\'application intègre une fonctionnalité AutoFill très pratique qui pré-remplit automatiquement les formulaires de connexion sur les sites web précédemment enregistrés.',
            detailsEn: 'Personal cybersecurity application developed in Java and TypeScript. This digital vault allows the encrypted and secure storage of the user\'s passwords and credentials. In addition, the application incorporates a very convenient AutoFill feature that automatically pre-fills login forms on previously saved websites.'
        },
        {
            id: 'ordo', icon: '📄', logo: '/logo/OrdoReadLogo.png', bg: 'bg-green-500', titre: 'OrdoRead', tech: 'kotlin', techDisplay: 'Kotlin', type: 'perso', 
            descFr: 'Extraction et automatisation de rappels médicaux.', descEn: 'Extraction and automation of medical reminders.',
            detailsFr: 'Application pratique développée en Kotlin pour faciliter le suivi médical au quotidien. Son principe de fonctionnement est d\'utiliser l\'appareil photo pour scanner une ordonnance médicale : l\'application extrait ensuite les données de prescription pour ajouter automatiquement la posologie et les rappels de prise des médicaments directement dans le calendrier du smartphone.',
            detailsEn: 'Practical application developed in Kotlin to facilitate daily medical tracking. Its operating principle is to use the camera to scan a medical prescription: the application then extracts the prescription data to automatically add the dosage and medication reminders directly into the smartphone\'s calendar.'
        },
        {
            id: 'marathon', icon: '💻', bg: 'bg-cyan-500', titre: 'Marathon Web', tech: 'web', techDisplay: 'Web', type: 'univ',
            descFr: 'Hackathon interdisciplinaire en développement web.', descEn: 'Interdisciplinary hackathon in web development.',
            detailsFr: 'Événement de développement intensif réalisé dans le cadre universitaire, en étroite collaboration avec des étudiants du département MMI (Métiers du Multimédia et de l\'Internet). Le défi consistait à concevoir, maquetter et développer un site de blog fonctionnel dans un temps imparti très court, mettant à l\'épreuve notre capacité à travailler en équipe sous pression.',
            detailsEn: 'Intensive development event carried out within the university framework, in close collaboration with students from the MMI (Multimedia and Internet Professions) department. The challenge was to design, mock up, and develop a functional blog site within a very short timeframe, testing our ability to work in a team under pressure.'
        },
        {
            id: 'gmbmanager', icon: '🗺️', logo: '/logo/GMBLogo.png', bg: 'bg-amber-500', titre: 'GMB Manager', tech: 'angular python typescript', techDisplay: 'Angular / Python / TypeScript', type: 'perso',
            github: 'https://github.com/Dchirez/GMB_Manager.git',
            descFr: 'Application de gestion des fiches Google My Business.', descEn: 'Google My Business profile management application.',
            detailsFr: 'Application fullstack personnelle conçue pour aider les petits commerces locaux à gérer et optimiser leur présence en ligne via Google My Business. Le frontend utilise Angular 21 avec TypeScript et Tailwind CSS pour une interface moderne et réactive. Le backend repose sur Python Flask pour les traitements métier. L\'application s\'intègre avec Google OAuth 2.0 et la Google Business Profile API pour une gestion authentifiée des fiches commerciales, incluant un système de scoring de complétude de profil (0-100), la gestion des avis clients, et la création de publications.',
            detailsEn: 'Personal fullstack application designed to help local businesses manage and optimize their online presence via Google My Business. The frontend uses Angular 21 with TypeScript and Tailwind CSS for a modern and reactive interface. The backend relies on Python Flask for business logic processing. The application integrates with Google OAuth 2.0 and the Google Business Profile API for authenticated business profile management, including a profile completion scoring system (0-100), customer review management, and publication creation.'
        }
    ];

    const allTechscomposite = projets.flatMap(p => p.tech.split(' '));
    const uniqueTechs = [...new Set(allTechscomposite)];
    const techOrder = ['java', 'c', 'web', 'typescript', 'kotlin', 'angular', 'python'];
    const orderedUniqueTechs = techOrder.filter(t => uniqueTechs.includes(t));

    setTimeout(() => {
        const modal = document.getElementById('projectModal');
        const modalContent = document.getElementById('modalContent');
        const modalBody = document.getElementById('dynamicContentContainer');
        const closeBtn = document.getElementById('closeModalBtn');

        function openModalById(projectId) {
            const project = projets.find(p => p.id === projectId);
            if(project) {
                const techArray = project.tech.split(' ');
                const techIconsHtml = techArray.map(tech => {
                    const logoUrl = techLogos[tech];
                    const name = tech === 'web' ? 'Web' : (tech.charAt(0).toUpperCase() + tech.slice(1));
                    return `
                        <div class="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 min-w-[70px]">
                            <img src="${logoUrl}" alt="${name}" class="h-8 w-8 mb-2" />
                            <span class="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">${name}</span>
                        </div>
                    `;
                }).join('');

                const githubLink = project.github ? `
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 mt-6 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-semibold">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        <span class="lang-fr">Voir sur GitHub</span>
                        <span class="lang-en">View on GitHub</span>
                    </a>
                ` : '';

                modalBody.innerHTML = `
                    <div class="${project.bg} h-32 md:h-48 flex items-center justify-center relative overflow-hidden">
                        ${project.logo ? `<img src="${project.logo}" alt="${project.titre} logo" class="h-32 w-32 md:h-48 md:w-48 object-contain" />` : `<div class="text-6xl md:text-8xl">${project.icon}</div>`}
                    </div>
                    <div class="p-8 md:p-10 text-left bg-white dark:bg-gray-800 transition-colors duration-300">
                        <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">${project.titre}</h2>
                            <span class="px-4 py-1.5 ${project.type === 'univ' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' : 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300'} rounded-full text-sm font-bold capitalize whitespace-nowrap">
                                <span class="lang-fr">${project.type === 'univ' ? 'Universitaire' : 'Personnel'}</span>
                                <span class="lang-en">${project.type === 'univ' ? 'Academic' : 'Personal'}</span>
                            </span>
                        </div>
                        <div class="flex flex-wrap gap-3 mb-8">
                            ${techIconsHtml}
                        </div>
                        <div class="prose max-w-none text-gray-600 dark:text-gray-300 space-y-4">
                            <p>
                                <span class="lang-fr">${project.detailsFr}</span>
                                <span class="lang-en">${project.detailsEn}</span>
                            </p>
                            ${githubLink}
                        </div>
                    </div>
                `;
                
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                
                setTimeout(() => {
                    modalContent.classList.remove('opacity-0', 'scale-95');
                    modalContent.classList.add('opacity-100', 'scale-100');
                }, 10);
            }
        }

        const carousel = document.querySelector('.carousel-3d');
        const cells = document.querySelectorAll('.carousel-cell');
        
        if (carousel && cells.length > 0) {
            const cellCount = cells.length;
            let selectedIndex = 0;
            const cellWidth = 340;
            
            function rotateCarousel() {
                const screenWidth = window.innerWidth;
                let effectiveWidth = (screenWidth > 1200) ? cellWidth + 100 : (screenWidth > 768 ? cellWidth + 60 : cellWidth + 20);
                const radius = Math.round((effectiveWidth / 2) / Math.tan(Math.PI / cellCount));
                const theta = 360 / cellCount;
                
                let normalizedIndex = ((selectedIndex % cellCount) + cellCount) % cellCount;

                cells.forEach((cell, i) => {
                    cell.style.transform = `rotateY(${i * theta}deg) translateZ(${radius}px)`;
                    
                    let diff = Math.abs(i - normalizedIndex);
                    if (diff > cellCount / 2) diff = cellCount - diff;

                    cell.classList.remove('opacity-100', 'shadow-2xl', 'opacity-40', 'pointer-events-auto', 'pointer-events-none');
                    cell.style.zIndex = "";

                    if (diff === 0) {
                        cell.classList.add('opacity-100', 'shadow-2xl', 'pointer-events-auto');
                        cell.style.zIndex = "50";
                    } else if (diff <= 2) {
                        cell.classList.add('opacity-40', 'pointer-events-auto');
                        cell.style.zIndex = "40";
                    } else {
                        cell.classList.add('opacity-40', 'pointer-events-none');
                        cell.style.zIndex = "10";
                    }
                });
                
                const angle = selectedIndex / cellCount * -360;
                carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
            }
            
            rotateCarousel();
            window.addEventListener('resize', rotateCarousel);
            document.getElementById('prevBtn')?.addEventListener('click', () => { selectedIndex--; rotateCarousel(); });
            document.getElementById('nextBtn')?.addEventListener('click', () => { selectedIndex++; rotateCarousel(); });

            cells.forEach((cell, i) => {
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    let normalizedIndex = ((selectedIndex % cellCount) + cellCount) % cellCount;
                    
                    if (i === normalizedIndex) {
                        const link = cell.querySelector('a');
                        if(link && link.dataset.id) openModalById(link.dataset.id);
                    } else {
                        let diff = i - normalizedIndex;
                        if (diff > cellCount / 2) diff -= cellCount;
                        if (diff < -cellCount / 2) diff += cellCount;
                        selectedIndex += diff;
                        rotateCarousel();
                    }
                });
            });
        }

        const filtresButtons = document.querySelectorAll('.btn-filtre');
        const projetsList = document.querySelectorAll('.bouton-projet');
        let currentType = 'all';
        let currentTech = 'all';

        filtresButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const group = btn.dataset.group;
                const filter = btn.dataset.filter;
                
                if (group === 'type') currentType = filter;
                if (group === 'tech') currentTech = filter;

                document.querySelectorAll(`.btn-filtre[data-group="${group}"]`).forEach(b => {
                    b.classList.remove('bg-blue-600', 'text-white', 'ring-2', 'ring-blue-600', 'bg-blue-50', 'dark:bg-blue-900/40', 'border-blue-500');
                    b.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300', 'border-gray-100', 'dark:border-gray-700');
                    
                    const techNameSpan = b.querySelector('.tech-name-hover');
                    if(techNameSpan) {
                        techNameSpan.classList.add('text-gray-600', 'dark:text-gray-300', 'bg-white', 'dark:bg-gray-800');
                        techNameSpan.classList.remove('text-blue-700', 'font-bold');
                    }
                });

                btn.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300', 'border-gray-100', 'dark:border-gray-700');
                
                if (group === 'tech' && filter !== 'all') {
                    btn.classList.add('bg-blue-50', 'dark:bg-blue-900/40', 'border-blue-500', 'ring-2', 'ring-blue-200', 'dark:ring-blue-800');
                    const techNameSpan = btn.querySelector('.tech-name-hover');
                    if(techNameSpan) {
                        techNameSpan.classList.remove('text-gray-600', 'dark:text-gray-300');
                        techNameSpan.classList.add('text-blue-700', 'dark:text-blue-400', 'font-bold');
                    }
                } else {
                    btn.classList.add('bg-blue-600', 'text-white', 'ring-2', 'ring-blue-600');
                }

                projetsList.forEach(p => {
                    const matchType = currentType === 'all' || p.dataset.type === currentType;
                    const techArray = p.dataset.tech.split(' ');
                    const matchTech = currentTech === 'all' || techArray.includes(currentTech);
                    p.style.display = (matchType && matchTech) ? 'block' : 'none';
                });
            });
        });

        document.querySelectorAll('.grid .open-modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.dataset.id || btn.closest('.open-modal-btn').dataset.id;
                openModalById(projectId);
            });
        });

        function closeModal() {
            modalContent.classList.remove('opacity-100', 'scale-100');
            modalContent.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
        
        closeBtn?.addEventListener('click', closeModal);
        modal?.addEventListener('click', (e) => {
            if (e.target === modal || e.target.id === 'modalOverlay') closeModal();
        });
        
        if (!window.hasModalKeydownListener) {
            document.addEventListener('keydown', (e) => {
                const currentModal = document.getElementById('projectModal');
                if (e.key === 'Escape' && currentModal && !currentModal.classList.contains('hidden')) {
                    const cb = document.getElementById('closeModalBtn');
                    if(cb) cb.click();
                }
            });
            window.hasModalKeydownListener = true;
        }

    }, 50);

    const techFilterButtons = orderedUniqueTechs.map(tech => {
        const logoUrl = techLogos[tech];
        const name = tech === 'web' ? 'Web' : (tech.charAt(0).toUpperCase() + tech.slice(1));
        
        return `
            <button class="btn-filtre group relative flex flex-col items-center p-3 rounded-2xl transition duration-300 border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 min-w-[70px] min-h-[70px] justify-center" data-group="tech" data-filter="${tech}">
                <img src="${logoUrl}" alt="${name} logo" class="h-8 w-8 transition transform group-hover:scale-110 mb-1" />
                <span class="absolute top-[100%] mt-1 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-0.5 rounded shadow hidden group-hover:block whitespace-nowrap z-10 tech-name-hover">
                    ${name}
                </span>
            </button>
        `;
    }).join('');

    const carouselCells = projets.map(p => `
        <div class="carousel-cell absolute w-[340px] h-[240px] left-0 top-0 opacity-40 transition-all duration-500 backface-hidden cursor-pointer">
            <a href="#" class="block w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300 group" data-id="${p.id}">
                <div class="h-2 ${p.bg} shrink-0"></div>
                <div class="p-4 flex flex-col items-center justify-center flex-grow text-center">
                    ${p.logo ? `<img src="${p.logo}" alt="${p.titre} logo" class="h-20 w-20 mb-2 object-contain transform group-hover:scale-110 transition-transform duration-300" />` : `<div class="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">${p.icon}</div>`}
                    <h2 class="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">${p.titre}</h2>
                    <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm">${p.techDisplay}</p>
                </div>
            </a>
        </div>
    `).join('');

    const gridCards = projets.map(p => `
        <a href="#" class="open-modal-btn bouton-projet bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition cursor-pointer block group" data-type="${p.type}" data-tech="${p.tech}" data-id="${p.id}">
            <div class="flex items-start gap-3 mb-3">
                ${p.logo ? `<img src="${p.logo}" alt="${p.titre} logo" class="h-12 w-12 object-contain flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />` : `<div class="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">${p.icon}</div>`}
                <div class="flex-grow">
                    <div class="flex justify-between items-start gap-2">
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">${p.titre}</h3>
                        <span class="text-xs font-bold ${p.type === 'univ' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300'} px-2 py-1 rounded capitalize whitespace-nowrap">
                            <span class="lang-fr">${p.type === 'univ' ? 'Universitaire' : 'Personnel'}</span>
                            <span class="lang-en">${p.type === 'univ' ? 'Academic' : 'Personal'}</span>
                        </span>
                    </div>
                </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm font-semibold">${p.techDisplay}</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">
                <span class="lang-fr">${p.descFr}</span>
                <span class="lang-en">${p.descEn}</span>
            </p>
        </a>
    `).join('');

    return `
    <style>
        .scene-3d { perspective: 1000px; transform-style: preserve-3d; }
        .carousel-3d { transform-style: preserve-3d; transition: transform 1s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .backface-hidden { backface-visibility: hidden; }
        .btn-filtre img { pointer-events: none; }
    </style>
    <main class="container mx-auto px-4 py-10 flex-grow overflow-hidden relative pb-20">
        <div class="text-center mb-10 max-w-2xl mx-auto">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
                <span class="lang-fr">Mes Réalisations</span><span class="lang-en">My Projects</span>
            </h1>
        </div>

        <div class="relative w-full max-w-6xl mx-auto h-[260px] md:h-[320px] mb-12 flex items-center justify-center">
            <button id="prevBtn" class="absolute left-4 md:left-10 z-20 p-3 text-blue-600 dark:text-blue-400 hover:text-white bg-white/80 dark:bg-gray-800/80 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-full shadow-lg border border-blue-100 dark:border-gray-700 hover:scale-110 transition-all duration-300">
                <svg fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            
            <div class="scene-3d w-[340px] h-[240px] relative z-10">
                <div class="carousel-3d w-full h-full absolute">
                    ${carouselCells}
                </div>
            </div>

            <button id="nextBtn" class="absolute right-4 md:right-10 z-20 p-3 text-blue-600 dark:text-blue-400 hover:text-white bg-white/80 dark:bg-gray-800/80 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-full shadow-lg border border-blue-100 dark:border-gray-700 hover:scale-110 transition-all duration-300">
                <svg fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
        </div>

        <div class="max-w-5xl mx-auto mb-16 flex flex-col items-center gap-6">
            <div class="flex flex-wrap justify-center items-center gap-3 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 rounded-full shadow-inner transition-colors duration-300">
                <span class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3">
                    <span class="lang-fr">Contexte :</span><span class="lang-en">Context :</span>
                </span>
                <button class="btn-filtre bg-blue-600 text-white ring-2 ring-blue-600 px-4 py-2 rounded-full font-semibold text-sm transition" data-group="type" data-filter="all">
                    <span class="lang-fr">Tout</span><span class="lang-en">All</span>
                </button>
                <button class="btn-filtre bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-full font-semibold text-sm transition" data-group="type" data-filter="univ">
                    <span class="lang-fr">Universitaire</span><span class="lang-en">Academic</span>
                </button>
                <button class="btn-filtre bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-full font-semibold text-sm transition" data-group="type" data-filter="perso">
                    <span class="lang-fr">Personnel</span><span class="lang-en">Personal</span>
                </button>
            </div>
            
            <div class="flex flex-wrap justify-center items-center gap-3 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 rounded-3xl shadow-inner transition-colors duration-300">
                <span class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3">Techno :</span>
                <button class="btn-filtre bg-blue-600 text-white ring-2 ring-blue-600 px-4 py-2 rounded-full font-semibold text-sm transition" data-group="tech" data-filter="all">
                    <span class="lang-fr">Toutes</span><span class="lang-en">All</span>
                </button>
                ${techFilterButtons}
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-10">
            ${gridCards}
        </div>
        
        <div id="projectModal" class="fixed inset-0 z-[100] hidden flex items-center justify-center">
            <div id="modalOverlay" class="absolute inset-0 bg-gray-900/75 backdrop-blur-sm cursor-pointer"></div>
            <div id="modalContent" class="relative z-10 w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform scale-95 opacity-0 transition-all duration-300 mx-4 max-h-[90vh] flex flex-col border border-gray-100 dark:border-gray-700">
                <button id="closeModalBtn" class="absolute top-4 right-4 z-20 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white bg-white/90 dark:bg-gray-800/90 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition shadow-sm border border-gray-200 dark:border-gray-600">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div id="dynamicContentContainer" class="overflow-y-auto"></div>
            </div>
        </div>
    </main>`;
}
