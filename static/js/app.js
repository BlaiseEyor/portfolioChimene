
import { Modal } from 'flowbite'

const $modalElement = document.querySelector('#modalEl');

const modalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    }
}

const modal = new Modal($modalElement, modalOptions);

modal.show();




// section temoigngs

    document.addEventListener("DOMContentLoaded", function () {
        const track = document.getElementById("slider-track");
        const dotsContainer = document.getElementById("dots-container");
        const slider = document.getElementById("testimonial-slider");
        const cards = track.children;
        let currentIndex = 0;
        let interval;

        // Fonction pour déterminer le nombre de cartes visibles selon l'écran
        function getVisibleCardsCount() {
            if (window.innerWidth >= 1024) return 3; // lg
            if (window.innerWidth >= 768) return 2;  // md
            return 1;                                // sm
        }

        // Création des puces de navigation
        function createDots() {
            dotsContainer.innerHTML = "";
            const totalDots = cards.length - getVisibleCardsCount() + 1;
            
            for (let i = 0; i < Math.max(1, totalDots); i++) {
                const dot = document.createElement("button");
                dot.className = `w-3 h-3 rounded-full border-2 border-emerald-500 transition-all duration-300 ${
                    i === currentIndex ? "bg-emerald-500" : "bg-transparent"
                }`;
                dot.addEventListener("click", () => {
                    currentIndex = i;
                    updateSlider();
                    resetTimer();
                });
                dotsContainer.appendChild(dot);
            }
        }

        // Mettre à jour la position du carrousel
        function updateSlider() {
            const cardWidth = cards[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

            // Mise à jour de l'état des puces
            Array.from(dotsContainer.children).forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add("bg-emerald-500");
                } else {
                    dot.classList.remove("bg-emerald-500");
                }
            });
        }

        // Passer à la carte suivante
        function nextSlide() {
            const maxIndex = cards.length - getVisibleCardsCount();
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateSlider();
        }

        // Démarrer et réinitialiser l'intervalle automatique (4 secondes)
        function startTimer() {
            interval = setInterval(nextSlide, 4000);
        }

        function resetTimer() {
            clearInterval(interval);
            startTimer();
        }

        // Mettre en pause le slider lors du survol
        slider.addEventListener("mouseenter", () => clearInterval(interval));
        slider.addEventListener("mouseleave", startTimer);

        // Recalculer la vue en cas de redimensionnement de l'écran
        window.addEventListener("resize", () => {
            createDots();
            if (currentIndex > cards.length - getVisibleCardsCount()) {
                currentIndex = 0;
            }
            updateSlider();
        });

        // Initialisation
        createDots();
        updateSlider();
        startTimer();
    });
