// ===================
// LE CODE DU TEXTE QUI SE REVEAL
// ===================
document.addEventListener("DOMContentLoaded", function() {
    // Préparer les animations de texte
    prepareAnimations();
    
    // Vérifier les éléments visibles au chargement et au scroll
    checkElementsVisibility();
    window.addEventListener('scroll', checkElementsVisibility);
});

// Fonction pour préparer toutes les animations
function prepareAnimations() {
    // 1. Préparer les animations de lettres floues
    document.querySelectorAll('.blur-letters').forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        // Permettre les retours à la ligne normaux
        element.style.whiteSpace = 'normal';
        
        // Diviser le texte en mots pour éviter de couper les mots
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            // Créer un conteneur pour chaque mot
            const wordContainer = document.createElement('span');
            wordContainer.classList.add('word-container');
            wordContainer.style.display = 'inline-block';
            wordContainer.style.whiteSpace = 'nowrap'; // Empêcher la coupure du mot uniquement
            
            // Créer un span pour chaque lettre du mot
            [...word].forEach(char => {
                const span = document.createElement('span');
                span.classList.add('letter');
                span.textContent = char;
                wordContainer.appendChild(span);
            });
            
            element.appendChild(wordContainer);
            
            // Ajouter un espace après chaque mot sauf le dernier
            if (wordIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.classList.add('letter', 'space');
                spaceSpan.innerHTML = '&nbsp;';
                element.appendChild(spaceSpan);
            }
        });
    });
    
    // 2. Préparer les animations de rotation de lettres
    document.querySelectorAll('.spin-letters').forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        // Permettre les retours à la ligne normaux
        element.style.whiteSpace = 'normal';
        
        // Diviser le texte en mots pour éviter de couper les mots
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            // Créer un conteneur pour chaque mot
            const wordContainer = document.createElement('span');
            wordContainer.classList.add('word-container');
            wordContainer.style.display = 'inline-block';
            wordContainer.style.whiteSpace = 'nowrap'; // Empêcher la coupure du mot uniquement
            
            // Créer un span pour chaque lettre du mot
            [...word].forEach(char => {
                const span = document.createElement('span');
                span.classList.add('letter');
                span.textContent = char;
                wordContainer.appendChild(span);
            });
            
            element.appendChild(wordContainer);
            
            // Ajouter un espace après chaque mot sauf le dernier
            if (wordIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.classList.add('letter', 'space');
                spaceSpan.innerHTML = '&nbsp;';
                element.appendChild(spaceSpan);
            }
        });
    });
    
    // 3. Préparer les animations mot par mot
    document.querySelectorAll('.word-fade').forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        element.textContent = '';
        // Permettre les retours à la ligne normaux
        element.style.whiteSpace = 'normal';
        
        // Créer un span pour chaque mot avec l'espace qui suit
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.classList.add('word');
            span.style.display = 'inline-block';
            span.style.whiteSpace = 'nowrap'; // Empêcher la coupure du mot uniquement
            span.textContent = word;
            element.appendChild(span);
            
            // Ajouter un espace après chaque mot sauf le dernier
            if (index < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.classList.add('word', 'space');
                spaceSpan.innerHTML = '&nbsp;';
                element.appendChild(spaceSpan);
            }
        });
    });
}

// Fonction pour vérifier si un élément est visible dans le viewport
function isElementVisible(el, threshold = 0.40) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Vérifier si l'élément est visible à au moins 40% dans le viewport
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const elementHeight = rect.bottom - rect.top;
    
    return (visibleHeight / elementHeight) >= threshold;
}

// Fonction pour animer les lettres avec un délai (séquentiel)
function animateLetters(element) {
    // Sélectionner toutes les lettres (dans les conteneurs de mots et les espaces)
    const letters = element.querySelectorAll('.letter');
    
    letters.forEach((letter, index) => {
        // Ajouter un délai séquentiel pour chaque lettre
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0) rotateY(0deg)';
            letter.style.filter = 'blur(0)';
        }, index * 10);
    });
}

// Fonction pour animer les mots avec un délai
function animateWords(element) {
    const words = element.querySelectorAll('.word');
    
    words.forEach((word, index) => {
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, index * 100); // Délai réduit pour une meilleure fluidité avec les espaces
    });
}

// Fonction pour vérifier tous les éléments et appliquer les animations
function checkElementsVisibility() {
    const elements = document.querySelectorAll('.animate-element');
    
    elements.forEach(element => {
        if (isElementVisible(element) && !element.classList.contains('visible')) {
            element.classList.add('visible');
            
            // Appliquer l'animation spécifique selon le type
            if (element.classList.contains('blur-letters') || element.classList.contains('spin-letters')) {
                animateLetters(element);
            } else if (element.classList.contains('word-fade')) {
                animateWords(element);
            }
        }
    });
}