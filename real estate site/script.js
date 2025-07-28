// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainMenu = document.getElementById('mainMenu');
mobileMenuBtn.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    darkModeToggle.querySelector('i').classList.toggle('fa-moon');
    darkModeToggle.querySelector('i').classList.toggle('fa-sun');
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
        if (mainMenu.classList.contains('active')) {
            mainMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        }
    });
});

// Property filter functionality
const propertyTypeFilter = document.getElementById('propertyType');
const priceRangeFilter = document.getElementById('priceRange');
const propertyCards = document.querySelectorAll('.property-card');

function filterProperties() {
    const type = propertyTypeFilter.value;
    const price = priceRangeFilter.value;

    propertyCards.forEach(card => {
        const cardType = card.dataset.type;
        const cardPrice = card.dataset.price;

        const typeMatch = type === 'all' || type === cardType;
        const priceMatch = price === 'all' || price === cardPrice;

        if (typeMatch && priceMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

propertyTypeFilter.addEventListener('change', filterProperties);
priceRangeFilter.addEventListener('change', filterProperties);

// Form submission (placeholder)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! Our team will get back to you soon.');
    e.target.reset();
});