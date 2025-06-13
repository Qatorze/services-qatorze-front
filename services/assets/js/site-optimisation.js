class PerformanceAnimation {
    constructor() {
        this.container = document.getElementById('performanceContainer');
        this.visualContainer = document.getElementById('visualContainer');
        this.loadingTime = document.getElementById('loadingTime');
        this.loadingBars = document.getElementById('loadingBars');
        this.improvementBadge = document.getElementById('improvementBadge');
        this.stateIndicator = document.getElementById('stateIndicator');
        this.interactiveHint = document.getElementById('interactiveHint');
        this.optimizationProcess = document.getElementById('optimizationProcess');
        this.websiteAnimation = document.getElementById('websiteAnimation');
        this.score = document.getElementById('score');
        this.beforeValue = document.getElementById('beforeValue');
        this.afterValue = document.getElementById('afterValue');

        // Ajout : détection de la bento-grid
        this.bentoGrid = document.querySelector('.bento-grid');
        console.log('Bento grid trouvé ?', this.bentoGrid);

        this.isVisible = false;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupInteractivity();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isVisible) {
                    this.isVisible = true;
                    this.startAnimation();
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-50px'
        });

        observer.observe(this.visualContainer);
    }

    setupInteractivity() {
        this.container.addEventListener('click', () => {
            if (!this.isAnimating) {
                this.restartAnimation();
            }
        });
    }

    async startAnimation() {
        this.container.classList.add('visible');
        await this.delay(500);
        this.runOptimizationSequence();
    }

    async runOptimizationSequence() {
        this.isAnimating = true;

        // Log état initial de la bento-grid
        if (this.bentoGrid) {
            console.log('Avant animation, style de la bento-grid :', getComputedStyle(this.bentoGrid).display);
        }

        // Phase 1: État initial - afficher l'animation du site
        this.websiteAnimation.classList.add('active');
        this.stateIndicator.textContent = 'Site Lent';
        this.stateIndicator.className = 'state-indicator before visible';
        await this.delay(1200);

        // Phase 2: Optimisation - logo apparaît au-dessus du site
        this.stateIndicator.textContent = 'Optimisation...';
        this.optimizationProcess.classList.add('active');

        // Animation de l'optimisation (logo qui tourne)
        await this.animateProgress();

        // Phase 3: Changer les barres en vert AVANT le badge
        this.updateLoadingBars('green');
        await this.delay(600);

        // Puis afficher le badge d'amélioration
        this.optimizationProcess.classList.remove('active');
        this.improvementBadge.classList.add('visible');

        // Animation du temps de chargement
        await this.animateLoadingTime(3.45, 0.86, 1800);

        // Animation du score
        this.animateScore(32, 94, 1200);

        // Phase 4: État final - site optimisé
        await this.delay(500);
        this.stateIndicator.textContent = 'Optimisé';
        this.stateIndicator.className = 'state-indicator after visible';

        // Accélérer l'animation du site
        this.updateWebsiteElements('fast');

        // Masquer le badge après 2 secondes
        await this.delay(2000);
        this.improvementBadge.classList.remove('visible');

        // Changer les barres pour les versions rapides
        this.updateLoadingBars('fast');

        await this.delay(500);
        this.interactiveHint.classList.add('visible');

        this.isAnimating = false;

        // Log état final de la bento-grid
        if (this.bentoGrid) {
            console.log('Après animation, style de la bento-grid :', getComputedStyle(this.bentoGrid).display);
        }
    }

    async animateProgress() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    async animateLoadingTime(from, to, duration) {
        return new Promise((resolve) => {
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);

                const currentValue = from - (from - to) * easeOut;
                this.loadingTime.textContent = currentValue.toFixed(2) + 's';

                if (progress > 0.6) {
                    this.loadingTime.className = 'loading-time fast';
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            animate();
        });
    }

    animateScore(from, to, duration) {
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 2);
            const currentValue = Math.round(from + (to - from) * easeOut);

            this.score.textContent = currentValue;

            if (currentValue < 50) {
                this.score.style.color = '#ef4444';
            } else if (currentValue < 80) {
                this.score.style.color = '#fbbf24';
            } else {
                this.score.style.color = '#10b981';
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    updateLoadingBars(type) {
        const bars = this.loadingBars.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.className = `bar ${type}-loading`;
            }, index * 40);
        });
    }

    updateWebsiteElements(type) {
        const elements = this.websiteAnimation.querySelectorAll('.website-element');
        elements.forEach((element, index) => {
            setTimeout(() => {
                if (type === 'fast') {
                    element.classList.add('fast');
                } else {
                    element.classList.remove('fast');
                }
            }, index * 50);
        });
    }

    async restartAnimation() {
        // Reset
        this.loadingTime.textContent = '3.45s';
        this.loadingTime.className = 'loading-time slow';
        this.score.textContent = '32';
        this.score.style.color = '#fbbf24';
        this.improvementBadge.classList.remove('visible');
        this.interactiveHint.classList.remove('visible');
        this.optimizationProcess.classList.remove('active');
        this.updateLoadingBars('slow');
        this.updateWebsiteElements('slow');

        await this.delay(300);
        this.runOptimizationSequence();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PerformanceAnimation();
});
