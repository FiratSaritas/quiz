// js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---\
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('show');
        });
    }

    // --- Active Nav Link Highlighter ---\
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        // Special case for the home page (index.html or empty path)
        if (currentPath === '' || currentPath === 'index.html') {
            if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '#all-quizzes-section') {
                link.classList.add('active');
            }
        } else if (linkPath === currentPath) {
            // Remove active from home
            document.querySelector('nav ul li a[href="index.html"]')?.classList.remove('active');
            document.querySelector('nav ul li a[href="#all-quizzes-section"]')?.classList.remove('active'); // Also remove if quizzes link was active
            link.classList.add('active');
        }
    });


    // --- Smooth Scrolling for Anchor Links (on the same page) ---\
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ensure it's not just a standalone '#', and that it's an internal link
            if (href.length > 1 && !this.classList.contains('no-smooth-scroll')) { // Added class to opt-out if needed
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for sticky header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Scroll to Top Button ---\
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if(scrollTopBtn) {
        window.onscroll = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Quiz Search Functionality ---\
    const quizSearchInput = document.getElementById('quizSearchInput');
    const quizGrid = document.getElementById('quizGrid');

    if (quizSearchInput && quizGrid) {
        const quizCards = quizGrid.querySelectorAll('.quiz-card');

        quizSearchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase().trim();

            quizCards.forEach(card => {
                const title = card.dataset.title.toLowerCase();
                const description = card.dataset.description.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    }
});