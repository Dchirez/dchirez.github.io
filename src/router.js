import { Home } from './views/Home.js';
import { Projects } from './views/Projects.js';
import { Contact } from './views/Contact.js';
import { Formations } from './views/Formations.js';

export const router = {
    '/': Home,
    '/projets': Projects,
    '/contact': Contact,
    '/formations': Formations
};
