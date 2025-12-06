// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Fermer le menu mobile en cliquant sur un lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Gestion des pages du tableau de bord
    const dashboardNavLinks = document.querySelectorAll('.dashboard-nav a');
    const dashboardSections = document.querySelectorAll('.dashboard-section-content');
    
    if (dashboardNavLinks.length > 0) {
        dashboardNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Retirer la classe active de tous les liens
                dashboardNavLinks.forEach(l => l.classList.remove('active'));
                // Ajouter la classe active au lien cliqué
                this.classList.add('active');
                
                // Masquer toutes les sections
                dashboardSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Afficher la section correspondante
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }
    
    // Gestion du formulaire de publication d'annonce
    const annonceForm = document.getElementById('annonce-form');
    if (annonceForm) {
        annonceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = {
                type: document.getElementById('annonce-type').value,
                titre: document.getElementById('titre').value,
                domaine: document.getElementById('domaine').value,
                competence: document.getElementById('competence').value,
                description: document.getElementById('description').value,
                niveau: document.querySelector('input[name="niveau"]:checked')?.value,
                disponibilites: Array.from(document.querySelectorAll('input[name="dispo"]:checked')).map(cb => cb.value),
                ville: document.getElementById('ville').value,
                contact: document.getElementById('contact').value
            };
            
            // Simulation d'envoi de données
            console.log('Données du formulaire:', formData);
            
            // Affichage d'un message de confirmation
            alert('Votre annonce a été publiée avec succès ! Elle sera visible après validation.');
            
            // Redirection vers la page des annonces
            setTimeout(() => {
                window.location.href = 'annonces.html';
            }, 1000);
        });
    }
    
    // Données des annonces (simulation)
    const annonces = [
        {
            id: 1,
            type: 'propose',
            titre: 'Cours de guitare pour débutants',
            domaine: 'musique',
            competence: 'Guitare acoustique',
            description: 'Je propose des cours de guitare pour débutants. Je peux enseigner les accords de base, quelques morceaux simples et la théorie musicale élémentaire.',
            niveau: 'débutant',
            ville: 'Paris',
            date: '2023-10-15',
            auteur: 'Thomas R.',
            statut: 'active'
        },
        {
            id: 2,
            type: 'cherche',
            titre: 'Apprendre Python',
            domaine: 'informatique',
            competence: 'Python',
            description: 'Je cherche à apprendre les bases de la programmation en Python pour mes études. Je peux offrir des cours d\'espagnol en échange.',
            niveau: 'débutant',
            ville: 'Lyon',
            date: '2023-10-14',
            auteur: 'Marie L.',
            statut: 'active'
        },
        {
            id: 3,
            type: 'propose',
            titre: 'Cours d\'espagnol conversationnel',
            domaine: 'langues',
            competence: 'Espagnol',
            description: 'Native espagnole, je propose des cours de conversation pour améliorer votre fluidité et votre accent. Tous niveaux bienvenus.',
            niveau: 'tous',
            ville: 'Toulouse',
            date: '2023-10-13',
            auteur: 'Sophie K.',
            statut: 'active'
        },
        {
            id: 4,
            type: 'cherche',
            titre: 'Apprendre la photographie',
            domaine: 'art',
            competence: 'Photographie',
            description: 'Je cherche quelqu\'un pour m\'initier à la photographie (composition, réglages manuels, post-traitement). En échange, je peux enseigner HTML/CSS.',
            niveau: 'débutant',
            ville: 'Paris',
            date: '2023-10-12',
            auteur: 'Alexandre B.',
            statut: 'active'
        },
        {
            id: 5,
            type: 'propose',
            titre: 'Cours de cuisine italienne',
            domaine: 'cuisine',
            competence: 'Cuisine italienne',
            description: 'Je propose des ateliers de cuisine italienne (pâtes fraîches, sauces, desserts). Matériel fourni sur place.',
            niveau: 'intermédiaire',
            ville: 'Lyon',
            date: '2023-10-11',
            auteur: 'Marco V.',
            statut: 'active'
        },
        {
            id: 6,
            type: 'cherche',
            titre: 'Cours de yoga',
            domaine: 'sport',
            competence: 'Yoga',
            description: 'Je cherche un professeur de yoga pour des séances hebdomadaires. En échange, je peux offrir des cours de marketing digital.',
            niveau: 'débutant',
            ville: 'Bordeaux',
            date: '2023-10-10',
            auteur: 'Julie M.',
            statut: 'active'
        }
    ];
    
    // Affichage des annonces sur la page annonces.html
    const annoncesContainer = document.getElementById('annonces-container');
    const userAnnoncesContainer = document.getElementById('user-annonces');
    
    function renderAnnonces(annoncesList, container, isDashboard = false) {
        if (!container) return;
        
        container.innerHTML = '';
        
        annoncesList.forEach(annonce => {
            const annonceCard = document.createElement('article');
            annonceCard.className = 'annonce-card';
            annonceCard.dataset.id = annonce.id;
            annonceCard.dataset.type = annonce.type;
            annonceCard.dataset.domaine = annonce.domaine;
            
            const typeText = annonce.type === 'propose' ? 'Je propose' : 'Je cherche';
            const typeClass = annonce.type === 'propose' ? 'propose' : 'cherche';
            
            // Formatage de la date
            const dateObj = new Date(annonce.date);
            const dateFormatted = dateObj.toLocaleDateString('fr-FR');
            
            annonceCard.innerHTML = `
                <div class="annonce-header">
                    <span class="annonce-type ${typeClass}">${typeText}</span>
                    <span class="annonce-date">${dateFormatted}</span>
                </div>
                <div class="annonce-content">
                    <h3>${annonce.titre}</h3>
                    <span class="annonce-domain">${annonce.domaine}</span>
                    <p class="annonce-description">${annonce.description}</p>
                    <div class="annonce-details">
                        <span><i class="fas fa-chart-line"></i> Niveau: ${annonce.niveau}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${annonce.ville}</span>
                    </div>
                </div>
                <div class="annonce-footer">
                    <div class="annonce-author">
                        <div class="author-avatar-small">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <span>${annonce.auteur}</span>
                    </div>
                    ${isDashboard ? 
                        `<div class="annonce-actions">
                            <button class="btn btn-small ${annonce.statut === 'active' ? 'btn-outline' : ''} toggle-status" data-id="${annonce.id}">
                                ${annonce.statut === 'active' ? 'Clôturer' : 'Réactiver'}
                            </button>
                        </div>` 
                        : 
                        `<a href="#" class="btn btn-small">Contacter</a>`
                    }
                </div>
            `;
            
            container.appendChild(annonceCard);
        });
        
        // Ajout des événements pour les boutons de clôture/réactivation (dashboard)
        if (isDashboard) {
            document.querySelectorAll('.toggle-status').forEach(button => {
                button.addEventListener('click', function() {
                    const annonceId = parseInt(this.dataset.id);
                    const annonce = annonces.find(a => a.id === annonceId);
                    
                    if (annonce) {
                        annonce.statut = annonce.statut === 'active' ? 'closed' : 'active';
                        this.textContent = annonce.statut === 'active' ? 'Clôturer' : 'Réactiver';
                        this.classList.toggle('btn-outline');
                        
                        // Mise à jour de l'affichage
                        renderUserAnnonces();
                    }
                });
            });
        }
    }
    
    // Filtrer les annonces
    function filterAnnonces() {
        const categoryFilter = document.getElementById('category-filter');
        const domainFilter = document.getElementById('domain-filter');
        
        if (!categoryFilter || !domainFilter || !annoncesContainer) return;
        
        const categoryValue = categoryFilter.value;
        const domainValue = domainFilter.value;
        
        let filtered = [...annonces];
        
        // Filtre par catégorie
        if (categoryValue !== 'all') {
            filtered = filtered.filter(annonce => annonce.type === categoryValue);
        }
        
        // Filtre par domaine
        if (domainValue !== 'all') {
            filtered = filtered.filter(annonce => annonce.domaine === domainValue);
        }
        
        renderAnnonces(filtered, annoncesContainer);
    }
    
    // Initialiser les filtres
    const categoryFilter = document.getElementById('category-filter');
    const domainFilter = document.getElementById('domain-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    if (categoryFilter && domainFilter) {
        categoryFilter.addEventListener('change', filterAnnonces);
        domainFilter.addEventListener('change', filterAnnonces);
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            if (categoryFilter) categoryFilter.value = 'all';
            if (domainFilter) domainFilter.value = 'all';
            filterAnnonces();
        });
    }
    
    // Afficher les annonces de l'utilisateur (dashboard)
    function renderUserAnnonces() {
        if (!userAnnoncesContainer) return;
        
        // Simulation d'annonces de l'utilisateur
        const userAnnonces = [
            {
                id: 2,
                type: 'cherche',
                titre: 'Apprendre Python',
                domaine: 'informatique',
                competence: 'Python',
                description: 'Je cherche à apprendre les bases de la programmation en Python pour mes études. Je peux offrir des cours d\'espagnol en échange.',
                niveau: 'débutant',
                ville: 'Lyon',
                date: '2023-10-14',
                auteur: 'Marie L.',
                statut: 'active'
            },
            {
                id: 7,
                type: 'propose',
                titre: 'Cours de programmation web',
                domaine: 'informatique',
                competence: 'HTML/CSS/JavaScript',
                description: 'Je propose des cours de développement web front-end pour débutants. Apprenez à créer vos premiers sites web interactifs.',
                niveau: 'débutant',
                ville: 'Lyon',
                date: '2023-10-05',
                auteur: 'Marie L.',
                statut: 'closed'
            }
        ];
        
        renderAnnonces(userAnnonces, userAnnoncesContainer, true);
    }
    
    // Initialisation
    if (annoncesContainer) {
        renderAnnonces(annonces, annoncesContainer);
    }
    
    if (userAnnoncesContainer) {
        renderUserAnnonces();
    }
});