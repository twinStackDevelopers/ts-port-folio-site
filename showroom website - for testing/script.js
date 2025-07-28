document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startSlideInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startSlideInterval();
    });
    
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', startSlideInterval);
    
    startSlideInterval();
    
    // Inventory Filter - ORIGINAL IMPLEMENTATION
    const filterBtns = document.querySelectorAll('.filter-btn');
    const inventoryGrid = document.querySelector('.inventory-grid');
    
    // ORIGINAL CAR DATA WITH EXACT IMAGE LINKS
    const cars = [
        {
            id: 1,
            title: 'Porsche 911 Turbo S',
            image: 'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: '$203,500',
            speed: '0-60: 2.6s',
            fuel: 'Premium',
            transmission: 'PDK Automatic',
            type: 'Sports',
            category: 'sports',
            description: 'The Porsche 911 Turbo S combines breathtaking performance with everyday usability. With 640 horsepower and all-wheel drive, it delivers explosive acceleration and precise handling.'
        },
        {
            id: 2,
            title: 'Mercedes-Benz S-Class',
            image: 'https://www.topgear.com/sites/default/files/2022/03/1-Mercedes-S-Class-plug-in.jpg?w=1784&h=1004',
            price: '$114,000',
            speed: '0-60: 4.5s',
            fuel: 'Premium',
            transmission: '9G-Tronic Automatic',
            type: 'Sedan',
            category: 'luxury',
            description: 'The Mercedes-Benz S-Class redefines luxury with its cutting-edge technology, sumptuous interior, and whisper-quiet ride. The pinnacle of automotive refinement.'
        },
        {
            id: 3,
            title: 'Land Rover Defender',
            image: 'https://images.wsj.net/im-913577?width=700&size=1.499&pixel_ratio=1.5',
            price: '$145,000',
            speed: '0-60: 5.2s',
            fuel: 'Premium',
            transmission: '8-Speed Automatic',
            type: 'SUV',
            category: 'suv',
            description: 'The Range Rover Autobiography offers unparalleled luxury in an SUV package. With its commanding presence and exquisite interior, it sets the standard for premium off-road vehicles.'
        },
        {
            id: 4,
            title: 'Tesla Model S Plaid',
            image: 'https://d2q97jj8nilsnk.cloudfront.net/images/tesla-model-s-plaid-0-60-fastest-tesla.jpg',
            price: '$109,990',
            speed: '0-60: 1.99s',
            fuel: 'Electric',
            transmission: 'Single-Speed',
            type: 'Sedan',
            category: 'electric',
            description: 'The Tesla Model S Plaid is the quickest production car ever made, with 1,020 horsepower and a range of 396 miles. It represents the cutting edge of electric vehicle technology.'
        },
        {
            id: 5,
            title: 'BMW M8 Competition',
            image: 'https://www.xbhp.com/machines/wp-content/uploads/2024/08/BMW-M8-Competition-1.jpg',
            price: '$133,995',
            speed: '0-60: 3.0s',
            fuel: 'Premium',
            transmission: '8-Speed Automatic',
            type: 'Coupe',
            category: 'sports',
            description: 'The BMW M8 Competition combines breathtaking performance with everyday usability. Its 617-hp twin-turbo V8 delivers explosive acceleration while maintaining BMW\'s signature driving dynamics.'
        },
        {
            id: 6,
            title: 'Audi e-tron GT',
            image: 'https://cdn.motor1.com/images/mgl/9m4RBp/s1/2025-audi-e-tron-gt.webp',
            price: '$102,400',
            speed: '0-60: 3.9s',
            fuel: 'Electric',
            transmission: '2-Speed Automatic',
            type: 'Sedan',
            category: 'electric',
            description: 'The Audi e-tron GT combines stunning design with impressive electric performance. With up to 522 horsepower and a range of 238 miles, it offers a perfect blend of style and sustainability.'
        }
    ];
    
    // ORIGINAL DISPLAY FUNCTION
    // In the displayCars function, modify the car card HTML generation and add event listener for inquire buttons
function displayCars(carsToDisplay) {
    inventoryGrid.innerHTML = carsToDisplay.length === 0 
        ? '<p class="no-results">No vehicles match your selection. Please try a different filter.</p>'
        : carsToDisplay.map(car => `
            <div class="car-card">
                <div class="car-image">
                    <img src="${car.image}" alt="${car.title}">
                </div>
                <div class="car-details">
                    <h3 class="car-title">${car.title}</h3>
                    <div class="car-specs">
                        <span><i class="fas fa-tachometer-alt"></i> ${car.speed}</span>
                        <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                        <span><i class="fas fa-cogs"></i> ${car.transmission}</span>
                    </div>
                    <div class="car-price">${car.price}</div>
                    <div class="car-actions">
                        <button class="btn btn-primary view-details" data-id="${car.id}">View Details</button>
                        <button class="btn btn-secondary inquire-btn">Inquire</button>
                    </div>
                </div>
            </div>
        `).join('');
    
    // Add event listeners for view details buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const carId = parseInt(this.dataset.id);
            const selectedCar = cars.find(car => car.id === carId);
            openModal(selectedCar);
        });
    });
    
    // Add event listeners for inquire buttons
    document.querySelectorAll('.inquire-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('contact').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });
}
    
    // ORIGINAL FILTER IMPLEMENTATION
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            displayCars(filter === 'all' ? cars : cars.filter(car => car.category === filter));
        });
    });
    
    // Initialize with all cars
    displayCars(cars);
    
    // Testimonials Slider - ORIGINAL
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(n) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        currentTestimonial = (n + testimonials.length) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }
    
    testimonialNext.addEventListener('click', () => showTestimonial(currentTestimonial + 1));
    testimonialPrev.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
    
    // Modal functionality - ORIGINAL
    const modal = document.getElementById('carModal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    function openModal(car) {
        document.getElementById('modalCarImage').src = car.image;
        document.getElementById('modalCarTitle').textContent = car.title;
        document.getElementById('modalCarSpeed').textContent = car.speed;
        document.getElementById('modalCarFuel').textContent = car.fuel;
        document.getElementById('modalCarTransmission').textContent = car.transmission;
        document.getElementById('modalCarType').textContent = car.type;
        document.getElementById('modalCarDescription').textContent = car.description;
        document.getElementById('modalCarPrice').textContent = car.price;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => e.target === modal && closeModal());
    
    document.getElementById('testDriveBtn').addEventListener('click', () => {
        closeModal();
        document.getElementById('interest').value = 'test-drive';
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('financeBtn').addEventListener('click', () => {
        closeModal();
        document.getElementById('interest').value = 'purchase';
        document.getElementById('message').value = 'I would like information about financing options.';
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Contact form - ORIGINAL
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Your message has been received.');
        this.reset();
    });
    
    // Smooth scrolling - ORIGINAL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Stats Counter Animation - ORIGINAL
    function animateStats() {
        const stats = document.querySelectorAll('.stats-grid h3');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            
            let current = start;
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }

    // Trigger the animation when the stats section comes into view - ORIGINAL
    const statsSection = document.querySelector('.about-section');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            observer.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }
});
