// Pas encore de code JavaScript ici

// Vous êtes développeur ? Envoyez nous une candidature spontanée en mentionnant le terme "BBOXA"
// Email : info@qatorze.com

// Postes à pourvoir : 
// - Développeur Front-End Angular
// - Développeur Full Stack Java & Angular
// - Développeur Back-End Java - Expérimenté
// - Développeur Mobile Android (Java et Kotlin) 

// Code pour le menu en mode petit écran 

document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('hidden');
    document.getElementById('menu-open').classList.toggle('hidden');
    document.getElementById('menu-close').classList.toggle('hidden');
});

// Code pour ouvrir et fermer un dropdown
    window.addEventListener('load', () => {
    (function() {
        const collapse = document.querySelector('#hs-collapse-to-destroy');
        const destroy = document.querySelector('#hs-destroy-collapse');
        const autoInit = document.querySelector('#hs-auto-init-collapse');

        destroy.addEventListener('click', () => {
        const {element} = HSCollapse.getInstance(collapse, true);

        element.destroy();

        destroy.setAttribute('disabled', 'disabled');
        autoInit.removeAttribute('disabled');
        });

        autoInit.addEventListener('click', () => {
        HSCollapse.autoInit();

        autoInit.setAttribute('disabled', 'disabled');
        destroy.removeAttribute('disabled');
        });
    });
});


// STYLE DU DEFILLEMENT

const style = document.createElement('style');
style.textContent = `
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); } /* Changement ici: -100% */
  }

  .animate-marquee {
      /* Pas d'animation au début */
      animation: none;
  }

`;
document.head.appendChild(style);

const logoContainer = document.getElementById('logo-container');
const logos = logoContainer.innerHTML; // Stocke le contenu initial

function duplicateLogos() {
    const containerWidth = logoContainer.offsetWidth;
    let logosWidth = 0;
    const logoElements = logoContainer.querySelectorAll('img');

    // Calcule la largeur totale des logos originaux
    logoElements.forEach(logo => {
        logosWidth += logo.offsetWidth + parseInt(getComputedStyle(logo).marginLeft) + parseInt(getComputedStyle(logo).marginRight);
    });

    // Calcule le nombre de duplications nécessaires
    let numDuplicates = Math.ceil(containerWidth / logosWidth);

    // Duplique les logos
    for (let i = 0; i < numDuplicates; i++) {
        logoContainer.innerHTML += logos;
    }
    // Ajoute l'animation *après* la duplication.
    logoContainer.classList.add('animate-marquee');
    //Redéfinis l'animation
    style.textContent = `
        @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-${logosWidth}px); } /* Défilement de la largeur des logos originaux */
        }

        .animate-marquee {
            animation: marquee ${logosWidth/10}s linear infinite; /* Vitesse basée sur la largeur */
        }
    `;
}

duplicateLogos(); // Appelle la fonction au chargement initial

// Redimensionne la duplication si la fenêtre est redimensionnée
window.addEventListener('resize', () => {
    logoContainer.innerHTML = logos; // Réinitialise le contenu
    duplicateLogos();
});


// Script du scrollSpy 

document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll("[data-hs-tab]");
    const tabPanels = document.querySelectorAll("[role='tabpanel']");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            // Désélectionner tous les onglets
            tabs.forEach(t => t.setAttribute("aria-selected", "false"));
            this.setAttribute("aria-selected", "true");

            // Masquer tous les panneaux
            tabPanels.forEach(panel => panel.classList.add("hidden"));
            
            // Afficher le panneau correspondant
            const targetPanel = document.querySelector(this.getAttribute("data-hs-tab"));
            if (targetPanel) {
                targetPanel.classList.remove("hidden");
            }
        });
    });

    // Les encres pour naviger vers les sections qui correspondent 

    // Sélectionner tous les liens de la navbar
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
    
            const sectionName = this.textContent.trim().toLowerCase();
            const targetSection = document.getElementById(sectionName);
    
            if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Ajuste selon la hauteur du header
                behavior: "smooth"
            });
            }
        });
        });
});

// CODE DEU REVEAL D'ELEMENT AU HOVER DE LA SOURIS

document.querySelector('.reveal-container').addEventListener('mousemove', function(event) {
    const container = event.currentTarget;
    const img = container.querySelector('img');
  
    // Obtenir les dimensions du conteneur
    const rect = container.getBoundingClientRect();
  
    // Calculer la position du curseur par rapport au conteneur
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    // Définir la zone révélée autour du curseur
    const radius = 100; /* Ajustez la taille du cercle révélateur */
    const clipPath = `circle(${radius}px at ${x}px ${y}px)`;
  
    // Appliquer le clip-path à l'image
    img.style.clipPath = clipPath;
  });
  
  // Réinitialiser l'effet lorsque la souris quitte le conteneur
  document.querySelector('.reveal-container').addEventListener('mouseleave', function(event) {
    const img = event.currentTarget.querySelector('img');
    img.style.clipPath = 'circle(0 at 0 0)'; /* Masquer à nouveau l'image */
});
  