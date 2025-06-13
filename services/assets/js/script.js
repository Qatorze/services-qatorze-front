// ===================
// CODE DE LA SIDEBAR - OUVRIR ET FERMER LA SIDEBAR
// ===================
function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}
// ===================
// CODE DU DROPDOWN MENU - OUVRIR ET FERMER LE DROPDOWN
// ===================
function showDropdown() {
    const dropdown = document.querySelector('.dropdown-menu')
    dropdown.style.opacity = '1'
}
function hideDropdown() {
    const dropdown = document.querySelector('.dropdown-menu')
    dropdown.style.opacity = '0'
}

// ===================
// CODE DU LIQUIDE GRADIENT
// ===================

// Setup du Canvas 
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Fonction pour générer des chiffres aléatoire dans un interval
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// L'Array qui va contenir tous les cercles et leurs propriétés
let circles = [];
// Les couleurs à utiliser dans le gradient
const colors = ["#007e4bbb", "#000000", "#000000", "#000000"];
// Setup le background color sur l'une des couleurs qu'on souhaite.
document.body.style.backgroundColor = "#000000";
// Créer les données des cercles
function initCircles() {
    // Nettoyer les anciennes données de cercles
    circles = [];
    // Quantité de cercles basés sur la taille de l'écran
    let circleCount = window.innerWidth / 100;
    // Boucle du code autant qu'il y ai des cercles
    for (let i = 0; i < circleCount; i++) {
        // Setup le rayon des cercles
        let radius = window.innerWidth / 7;
        // Setup aléatoirement des cercles dans le canvas sur l'axe des X
        let x = randomBetween(radius, canvas.width - radius);
        // Setup aléatoirement des cercles dans le canvas sur l'axe des Y
        let y = randomBetween(radius, canvas.height - radius);
        // Setup aléatoirement la vélocité sur l'axe des X (La vitesse à laquelle chaque cercles bougent)
        // Egalement basé sur la taille de l'écran
        let dx = randomBetween(window.innerWidth / -800, window.innerWidth / 800);
        // Setup aléatoirement la vélocité sur l'axe des Y (La vitesse à laquelle chaque cercles bougent)
        let dy = randomBetween(window.innerWidth / -800, window.innerWidth / 800);
        // Setup des couleurs aléatoires sur les cercles à partir du tableau de couleur plus haut
        let color = colors[Math.floor(Math.random() * colors.length)];
        // Ajouter de nouvelles données dans le tableau de cercles 
        circles.push({ x, y, dx, dy, radius, color });
    }
}


// Dessiner les cercles avec de nouvelles valeures
function drawCircle(circle) {
    // Commencer le chemin de cercle
    ctx.beginPath();
    // Créer les cercles avec les paramètres pré-établis
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    // Créer et remplir les couleures préétablies
    ctx.fillStyle = circle.color;
    // Rempli les cercles
    ctx.fill();
    // Fermer les chemin des cercles
    ctx.closePath();
}

// Fonction animation
function animate() {
    // Créer une animation en rerunnant la fonction animée encore et encore
    requestAnimationFrame(animate);
    // Néttoyer toutes les précédentes éléments désinnés dans le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Boucle de tous les cercles
    circles.forEach(circle => {
        // Si the cercle atteint le bord du canvas sur l'axe des X sur les deux côtés
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            // Renverse la vitesse des cercles (Pour qu'il rebondisse dans la direction opposée)
            circle.dx = -circle.dx; 
        }
        // Si the cercle atteint le bord du canvas sur l'axe des X sur les deux côtés
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
            // Renverse la vitesse des cercles (Pour qu'il rebondisse dans la direction opposée)
            circle.dy = -circle.dy;
        }
        // Dans tous les autres cas laisser le cercle bouger dans les directions initlales.
        circle.x += circle.dx;
        circle.y += circle.dy;
        // Bouger les cercles en les redessinant encore et encore dans les animations
        drawCircle(circle);
    });
}

// Fonction qui mets le canvas toujours en fullscreen
// Et on le mettra un peut large que le screen entier
function resizeCanvas() {
    canvas.width = window.innerWidth * 1.5;
    canvas.height = window.innerHeight * 1.5;
    // Créer de nouvelles données de cercle sur les écrans de nouvelles tailles
    initCircles();
}
// Mettre le canaves full width au chargement de la page
resizeCanvas();
// Mettre tous les acces à chaque fois que l'écran change de taille
window.addEventListener("resize", resizeCanvas);

// Créer les données des cercles au chargement de la page
initCircles();
// Lancer l'animation au chargement de la page
animate();



// ===================
// LE CODE DU CARROUSEL 1 - Changement de slides automatique
// ===================

// document.addEventListener('DOMContentLoaded', () => {
//     const carousel = document.getElementById('carousel');
//     const prevBtn = document.getElementById('prev');
//     const nextBtn = document.getElementById('next');
//     const items = document.querySelectorAll('.carousel-item');
//     const itemCount = items.length;
//     let currentIndex = 0;
//     let autoScrollInterval;
    
//     // Clone le premier et dernier élément pour un défilement infini
//     const firstItem = items[0].cloneNode(true);
//     const lastItem = items[itemCount - 1].cloneNode(true);
//     carousel.appendChild(firstItem);
//     carousel.insertBefore(lastItem, items[0]);
    
//     // Met à jour la position initiale
//     carousel.style.transform = `translateX(-100%)`;
    
//     // Défilement automatique
//     const startAutoScroll = () => {
//         autoScrollInterval = setInterval(() => {
//             nextItem();
//         }, 8000);
//     };
    
//     const stopAutoScroll = () => {
//         clearInterval(autoScrollInterval);
//     };
    
//     // Défilement vers l'élément suivant
//     const nextItem = () => {
//         currentIndex++;
//         carousel.style.transition = 'transform 0.5s ease-in-out';
//         carousel.style.transform = `translateX(${-100 * (currentIndex + 1)}%)`;
        
//         // Si on arrive à la fin (clone du premier élément)
//         if (currentIndex >= itemCount) {
//             setTimeout(() => {
//                 carousel.style.transition = 'none';
//                 currentIndex = 0;
//                 carousel.style.transform = `translateX(-100%)`;
//             }, 500);
//         }
//     };
    
//     // Défilement vers l'élément précédent
//     const prevItem = () => {
//         currentIndex--;
//         carousel.style.transition = 'transform 0.5s ease-in-out';
//         carousel.style.transform = `translateX(${-100 * (currentIndex + 1)}%)`;
        
//         // Si on arrive au début (clone du dernier élément)
//         if (currentIndex < 0) {
//             setTimeout(() => {
//                 carousel.style.transition = 'none';
//                 currentIndex = itemCount - 1;
//                 carousel.style.transform = `translateX(${-100 * (currentIndex + 1)}%)`;
//             }, 500);
//         }
//     };

//     // Événements
//     nextBtn.addEventListener('click', () => {
//         stopAutoScroll();
//         nextItem();
//         startAutoScroll();
//     });
    
//     prevBtn.addEventListener('click', () => {
//         stopAutoScroll();
//         prevItem();
//         startAutoScroll();
//     });
    
//     // Gestion de la fin de transition
//     carousel.addEventListener('transitionend', () => {
//         // Pour le défilement manuel, la logique est déjà gérée dans nextItem/prevItem
//     });
    
//     // Démarrer le défilement automatique
//     startAutoScroll();
    
//     // Pause au survol
//     carousel.addEventListener('mouseenter', stopAutoScroll);
//     carousel.addEventListener('mouseleave', startAutoScroll);
// });


// ===================
// LE CODE DU CARROUSEL 2 - (AVEC GSAP)
// ===================
// ===================
// LE CODE DU CARROUSEL 2 - (AVEC GSAP) - VERSION AMÉLIORÉE POUR MOBILE
// ===================

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slideshow');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Configuration initiale
    const slideWidth = slides[0].offsetWidth;
    const slideMargin = 20; // Marge entre les slides
    const totalWidth = slides.length * (slideWidth + slideMargin) - slideMargin;
    
    // Détection mobile pour ajuster les paramètres
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // S'assurer que le slider a la bonne largeur
    slider.style.width = `${totalWidth}px`;
    
    // Variable pour suivre l'index de la slide actuelle
    let currentSlideIndex = 0;
    
    // Fonction pour mettre à jour l'état des boutons de navigation
    function updateNavigationButtons() {
        // Désactiver/activer le bouton précédent
        if (currentSlideIndex === 0) {
            prevBtn.disabled = true;
            prevBtn.style.backgroundColor = '#000000';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.backgroundColor = '';
            prevBtn.style.cursor = 'pointer';
        }
        
        // Désactiver/activer le bouton suivant
        // Calculer le nombre de slides entièrement visibles dans le conteneur
        const visibleWidth = slider.parentNode.offsetWidth;
        const maxIndex = Math.max(0, slides.length - Math.floor(visibleWidth / (slideWidth + slideMargin)));
        
        if (currentSlideIndex >= maxIndex) {
            nextBtn.disabled = true;
            nextBtn.style.backgroundColor = '#000000';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.disabled = false;
            nextBtn.style.backgroundColor = '';
            nextBtn.style.cursor = 'pointer';
        }
    }
    
    // Créer le Draggable avec paramètres optimisés pour mobile
    let draggable = Draggable.create(slider, {
        type: "x",
        edgeResistance: isMobile ? 0.7 : 0.95,
        bounds: {
            minX: -totalWidth + slider.parentNode.offsetWidth,
            maxX: 0
        },
        inertia: true,
        throwResistance: isMobile ? 0.6 : 0.85,
        onDrag: updateProgress,
        onThrowUpdate: updateProgress,
        onPress: function() {
            // Améliore la réactivité au toucher
            if (isMobile) {
                gsap.killTweensOf(slider);
            }
        },
        onThrowComplete: function() {
            // Mise à jour de l'index actuel après un lancer
            currentSlideIndex = Math.round(-this.endX / (slideWidth + slideMargin));
            updateNavigationButtons();
        },
        snap: {
            x: function(endValue) {
                // Calculer à quelle slide s'accrocher
                const index = Math.round(-endValue / (slideWidth + slideMargin));
                currentSlideIndex = index; // Mise à jour de l'index actuel
                updateNavigationButtons();
                return -index * (slideWidth + slideMargin);
            }
        }
    })[0];
    
    // Amélioration pour le touch sur mobile
    if (isMobile) {
        // Prévenir le scroll vertical pendant le swipe horizontal
        slider.addEventListener('touchmove', function(e) {
            const touch = e.touches[0];
            const startX = touch.clientX;
            const startY = touch.clientY;
            
            // Si le mouvement est plus horizontal que vertical, empêcher le scroll
            if (Math.abs(startX) > Math.abs(startY)) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    function updateProgress() {
        // Met à jour le statut actif sur les slides
        const currentPosition = draggable.x;
        const slideSize = slideWidth + slideMargin;
        
        slides.forEach((slide, index) => {
            // Déterminer si cette slide est visible
            const slidePos = index * slideSize;
            const isVisible = -currentPosition <= slidePos + slideSize && 
                              -currentPosition + slider.parentNode.offsetWidth >= slidePos;
                              
            if (isVisible) {
                slide.classList.add('visible');
            } else {
                slide.classList.remove('visible');
            }
        });
    }
    
    // Fonction pour naviguer vers une slide spécifique
    function goToSlide(index) {
        // S'assurer que l'index est dans les limites
        index = Math.max(0, Math.min(index, slides.length - 1));
        
        // Calculer la nouvelle position
        const targetX = -index * (slideWidth + slideMargin);
        
        // Paramètres d'animation ajustés pour mobile
        const animationDuration = isMobile ? 0.7 : 0.5;
        const animationEase = isMobile ? "power2.out" : "power2.out";
        
        // Animer vers la nouvelle position
        gsap.to(slider, {
            x: targetX,
            duration: animationDuration,
            ease: animationEase,
            onUpdate: function() {
                // Mettre à jour manuellement la position de draggable
                draggable.update(true); // Force la mise à jour
                updateProgress();
                updateNavigationButtons();
            },
            onComplete: function() {
                // S'assurer que draggable est complètement synchronisé
                draggable.update(true);
                currentSlideIndex = index;
                updateNavigationButtons();
            }
        });
    }
    
    // Navigation par boutons
    prevBtn.addEventListener('click', function() {
        goToSlide(currentSlideIndex - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        goToSlide(currentSlideIndex + 1);
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlideIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlideIndex + 1);
        }
    });
    
    // Initialiser la position et les statuts
    updateProgress();
    updateNavigationButtons();
    
    // Ajuster en cas de redimensionnement
    window.addEventListener('resize', function() {
        const newBounds = {
            minX: -totalWidth + slider.parentNode.offsetWidth,
            maxX: 0
        };
        
        // Mettre à jour les limites
        draggable.applyBounds(newBounds);
        
        // S'assurer que la position actuelle est valide
        const currentX = draggable.x;
        if (currentX < newBounds.minX) {
            gsap.set(slider, { x: newBounds.minX });
            draggable.update(true);
        }
        
        updateProgress();
        updateNavigationButtons();
    });
});


// ===================
// LE CODE POUR LES ELEMENTS DE HOVER + MODALE
// ===================

// Configuration des logos avec URLs d'images garanties

const elements = document.querySelectorAll('.element');
const hoverMessage = document.getElementById('hover-message');
const hoverMedia = document.getElementById('hover-media');
const mediaContent = document.getElementById('media-content');
const blurContainer = document.getElementById('blur-container');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.querySelector('.close-btn');

// Fonction pour suivre le curseur avec le message texte
function followCursorWithText(e, element) {
    const message = element.getAttribute('data-message');
    hoverMessage.textContent = message;
    hoverMessage.style.opacity = '1';
    hoverMedia.style.opacity = '0';
    
    // Calcul de la position du message par rapport au curseur
    const x = e.clientX;
    const y = e.clientY - 30; // Légèrement au dessus du curseur
    
    hoverMessage.style.left = `${x}px`;
    hoverMessage.style.top = `${y}px`;
}

// Fonction pour suivre le curseur avec le média (image/vidéo)
function followCursorWithMedia(e, element) {
    hoverMessage.style.opacity = '0';
    hoverMedia.style.opacity = '1';
    
    // Préparation du contenu média
    const mediaType = element.getAttribute('data-media-type');
    const mediaSrc = element.getAttribute('data-media-src');
    
    if (mediaType === 'image') {
        if (mediaContent.tagName.toLowerCase() !== 'img') {
            const img = document.createElement('img');
            img.id = 'media-content';
            img.src = mediaSrc;
            img.alt = 'Aperçu';
            hoverMedia.innerHTML = '';
            hoverMedia.appendChild(img);
        } else {
            mediaContent.src = mediaSrc;
        }
    } else if (mediaType === 'video') {
        if (mediaContent.tagName.toLowerCase() !== 'video') {
            const video = document.createElement('video');
            video.id = 'media-content';
            video.src = mediaSrc;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            hoverMedia.innerHTML = '';
            hoverMedia.appendChild(video);
        } else {
            mediaContent.src = mediaSrc;
        }
    }
    
    // Calcul de la position du média par rapport au curseur
    const x = e.clientX;
    const y = e.clientY - 60; // Plus haut que le curseur pour la visibilité
    
    hoverMedia.style.left = `${x}px`;
    hoverMedia.style.top = `${y}px`;
}

// Pour chaque élément, ajouter les gestionnaires d'événements
elements.forEach(element => {
    // Événement quand la souris entre sur l'élément
    element.addEventListener('mouseenter', () => {
        const mediaType = element.getAttribute('data-media-type');
        if (mediaType === 'text') {
            hoverMessage.style.opacity = '1';
        } else {
            hoverMedia.style.opacity = '1';
        }
    });
    
    // Événement quand la souris bouge sur l'élément
    element.addEventListener('mousemove', (e) => {
        const mediaType = element.getAttribute('data-media-type');
        if (mediaType === 'text') {
            followCursorWithText(e, element);
        } else {
            followCursorWithMedia(e, element);
        }
    });
    
    // Événement quand la souris quitte l'élément
    element.addEventListener('mouseleave', () => {
        hoverMessage.style.opacity = '0';
        hoverMedia.style.opacity = '0';
    });
    
    // Événement quand on clique sur l'élément
    element.addEventListener('click', () => {
        // Récupérer les données spécifiques à cet élément
        const title = element.getAttribute('data-title');
        const description = element.getAttribute('data-description');
        const imagesStr = element.getAttribute('data-images');
        const images = JSON.parse(imagesStr);
        
        // Mettre à jour le contenu de la modale
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const imageGallery = document.getElementById('image-gallery');
        
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        // Vider puis remplir la galerie d'images
        imageGallery.innerHTML = '';
        images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = title;
            img.className = 'gallery-image';
            imageGallery.appendChild(img);
        });
        
        // Afficher la modale
        blurContainer.classList.add('active');
    });
});

// Fermer la div avec l'image quand on clique sur le bouton de fermeture
closeBtn.addEventListener('click', () => {
    blurContainer.classList.remove('active');
});

// Fermer également en cliquant à l'extérieur de l'image
blurContainer.addEventListener('click', (e) => {
    if (e.target === blurContainer) {
        blurContainer.classList.remove('active');
    }
});


// ===================
// LE CODE DU BACKGROUND QUI CHANGE AU HOVER DES LOGOS :
// ===================
document.addEventListener('DOMContentLoaded', function() {
    const logoItems = document.querySelectorAll('.logo-item');
    const container = document.querySelector('.container-drop-l');
    let currentBg = '';
    
    // Préchargement des images
    const preloadImages = () => {
        logoItems.forEach(item => {
            const img = new Image();
            img.src = item.querySelector('.logo-image').src;
        });
    };
    preloadImages();
    
    // Gestion des hover
    logoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const newBg = this.querySelector('.logo-image').src;
            if (newBg !== currentBg) {
                container.classList.add('changing');
                
                setTimeout(() => {
                    container.style.backgroundImage = `url(${newBg})`;
                    currentBg = newBg;
                    
                    setTimeout(() => {
                        container.classList.remove('changing');
                    }, 800);
                }, 50);
            }
        });
    });
});


// ===================
// TEXTE QUI CHANGE EN ROTATING
// ===================

document.addEventListener('DOMContentLoaded', function () {
    const textChanging = document.querySelector('.text-changing');
    const output = textChanging.querySelector('.text-output');
    
    const texts = [
        // { text: "Dev. Sites web et E-com", color: "#00753d" },
        { text: "Conception graphique", color: "#414141" },
        { text: "Dev. App Web", color: "##FFC900" },
        { text: "Audit & conseil Tech", color: "#00998f" },
        { text: "Réseaux sociaux", color: "#3c0075" },
        { text: "Dev. App mobile", color: "#9c0707" },
        { text: "Logiciels metiers", color: "#6bffb8" },
        { text: "Branding et design", color: "#b84aff" },
    ];
    
    let currentIndex = 0;
    let typingSpeed = 50;
    let pauseBetweenWords = 5000;
    
    function typeText(text, index = 0, callback) {
        if (index < text.length) {
            output.textContent += text.charAt(index);
            setTimeout(() => typeText(text, index + 1, callback), typingSpeed);
        } else {
            setTimeout(callback, pauseBetweenWords);
        }
    }
    
    function deleteText(callback) {
        const text = output.textContent;
        if (text.length > 0) {
            output.textContent = text.slice(0, -1);
            setTimeout(() => deleteText(callback), typingSpeed / 1.5);
        } else {
            callback();
        }
    }
    
    function loopTyping() {
        const { text, color } = texts[currentIndex];
        textChanging.style.backgroundColor = color;
        
        deleteText(() => {
            typeText(text, 0, () => {
                currentIndex = (currentIndex + 1) % texts.length;
                setTimeout(loopTyping, pauseBetweenWords);
            });
        });
    }
    
    // Initialisation
    output.textContent = texts[0].text;
    textChanging.style.backgroundColor = texts[0].color;
    
    setTimeout(loopTyping, 3000);
});

// ===================
// CODE POUR LE MODELE 3D
// ===================

const viewer = document.querySelector('model-viewer');

viewer.addEventListener('load', () => {
    const model = viewer.model;
    if (model) {
        model.traverse((node) => {
            if (node.material) {
                node.material.wireframe = true;
            }
        });
    }
});


// ===================
// CODE POUR LE SYSTEME DE CARROUSSEL SUR MOBILE + MODALE
// ===================

// class TechCarousel {
//     constructor() {
//         this.carousel = document.querySelector('.tech-carousel-mobile');
//         this.inner = document.querySelector('.carousel-inner');
//         this.prevBtn = document.querySelector('.tech-carousel-mobile .prev-btn');
//         this.nextBtn = document.querySelector('.tech-carousel-mobile .next-btn');
//         this.dotsContainer = document.querySelector('.carousel-dots');
//         this.cards = document.querySelectorAll('.tech-grid .tech-card');
//         this.currentIndex = 0;
        
//         this.initCarousel();
//         this.setupEvents();
//     }
    
//     initCarousel() {
//         // Clone les cartes dans le carrousel mobile
//         this.cards.forEach(card => {
//             const clone = card.cloneNode(true);
//             this.inner.appendChild(clone);
//         });
        
//         // Crée les indicateurs de dots
//         this.cards.forEach((_, index) => {
//             const dot = document.createElement('div');
//             dot.classList.add('dot');
//             if (index === 0) dot.classList.add('active');
//             dot.addEventListener('click', () => this.goToSlide(index));
//             this.dotsContainer.appendChild(dot);
//         });
        
//         this.updateCarousel();
//     }
    
//     setupEvents() {
//         this.prevBtn.addEventListener('click', () => this.prevSlide());
//         this.nextBtn.addEventListener('click', () => this.nextSlide());
        
//         // Navigation au clavier
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'ArrowLeft') this.prevSlide();
//             if (e.key === 'ArrowRight') this.nextSlide();
//         });
        
//         // Redimensionnement
//         window.addEventListener('resize', () => {
//             this.updateCarousel();
//         });
//     }
    
//     updateCarousel() {
//         const slideWidth = this.carousel.offsetWidth;
//         this.inner.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
        
//         // Mettre à jour les dots
//         const dots = document.querySelectorAll('.dot');
//         dots.forEach((dot, index) => {
//             dot.classList.toggle('active', index === this.currentIndex);
//         });
        
//         // Désactiver les boutons si nécessaire
//         this.prevBtn.disabled = this.currentIndex === 0;
//         this.nextBtn.disabled = this.currentIndex === this.cards.length - 1;
//     }
    
//     prevSlide() {
//         if (this.currentIndex > 0) {
//             this.currentIndex--;
//             this.updateCarousel();
//         }
//     }
    
//     nextSlide() {
//         if (this.currentIndex < this.cards.length - 1) {
//             this.currentIndex++;
//             this.updateCarousel();
//         }
//     }
    
//     goToSlide(index) {
//         this.currentIndex = index;
//         this.updateCarousel();
//     }
// }

// // Initialisation
// document.addEventListener('DOMContentLoaded', () => {
//     if (window.innerWidth <= 767) {
//         new TechCarousel();
//     }
    
//     window.addEventListener('resize', () => {
//         if (window.innerWidth <= 767 && !document.querySelector('.carousel-inner').children.length) {
//             new TechCarousel();
//         }
//     });
// });

// ===================
// CODE DE LA SECTION FAQ
// ===================

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Basculer l'item actuel
            item.classList.toggle('active');
        });
    });
});


// ===================
// CODE DU DROPDOWN DANS LE FOOTER
// ===================
 /**
  * Gestion du dropdown de langue
  * Permet d'ouvrir/fermer le menu de sélection de langue
  */
// document.addEventListener('DOMContentLoaded', function() {
//     const dropdown = document.getElementById('languageDropdown');
//     const button = document.getElementById('languageButton');
//     const menu = dropdown.querySelector('.language-dropdown-menu');

//     // Gestion du clic sur le bouton
//     button.addEventListener('click', function(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         toggleDropdown();
//     });

//     // Fermeture du dropdown en cliquant ailleurs
//     document.addEventListener('click', function(e) {
//         if (!dropdown.contains(e.target)) {
//             closeDropdown();
//         }
//     });

//     // Gestion des touches clavier pour l'accessibilité
//     button.addEventListener('keydown', function(e) {
//         if (e.key === 'Enter' || e.key === ' ') {
//             e.preventDefault();
//             toggleDropdown();
//         } else if (e.key === 'Escape') {
//             closeDropdown();
//         }
//     });

//     /**
//      * Ouvre ou ferme le dropdown
//      */
//     function toggleDropdown() {
//         const isOpen = dropdown.classList.contains('open');
//         if (isOpen) {
//             closeDropdown();
//         } else {
//             openDropdown();
//         }
//     }

//     /**
//      * Ouvre le dropdown
//      */
//     function openDropdown() {
//         dropdown.classList.add('open');
//         button.setAttribute('aria-expanded', 'true');
//     }

//     /**
//      * Ferme le dropdown
//      */
//     function closeDropdown() {
//         dropdown.classList.remove('open');
//         button.setAttribute('aria-expanded', 'false');
//     }

//     // Gestion des clics sur les éléments du menu
//     const menuItems = menu.querySelectorAll('.language-dropdown-item');
//     menuItems.forEach(item => {
//         item.addEventListener('click', function(e) {
//             e.preventDefault();
//             // Ici vous pouvez ajouter la logique pour changer de langue
//             console.log('Langue sélectionnée:', this.textContent.trim());
//             closeDropdown();
//         });
//     });
// });