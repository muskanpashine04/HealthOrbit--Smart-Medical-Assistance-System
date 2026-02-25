// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Toggle menu icon
            const icon = menuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                // Reset menu icon
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scrolling for anchor links within the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set active navigation based on current page
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav ul li a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Get the href attribute
            const href = link.getAttribute('href');
            
            // Check if current path ends with the href
            if (currentPath.endsWith(href) || 
                (currentPath.endsWith('/') && href === 'index.html') ||
                (currentPath.endsWith('index.html') && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Call the function to set active link
    setActiveNavLink();

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--accent-color)';
                } else {
                    field.style.borderColor = 'var(--border-color)';
                }
            });
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show a success message
                const formData = new FormData(contactForm);
                let formValues = {};
                
                for (let [key, value] of formData.entries()) {
                    formValues[key] = value;
                }
                
                console.log('Form submitted with values:', formValues);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.';
                successMessage.style.color = 'var(--secondary-color)';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '20px';
                successMessage.style.backgroundColor = 'rgba(52, 168, 83, 0.1)';
                successMessage.style.borderRadius = '5px';
                successMessage.style.display = 'flex';
                successMessage.style.alignItems = 'center';
                successMessage.style.gap = '10px';
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                console.log('Newsletter subscription:', emailInput.value);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = 'var(--white)';
                successMessage.style.marginTop = '10px';
                
                newsletterForm.appendChild(successMessage);
                newsletterForm.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }

    // Create placeholder SVG images for demo purposes
    function createPlaceholderSVG(selector, color = '#1a73e8', text = '') {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            if (element.tagName.toLowerCase() === 'img' && element.getAttribute('src').includes('.svg')) {
                const width = element.width || 300;
                const height = element.height || 200;
                
                // Create SVG placeholder
                const svg = `
                <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="${color}" opacity="0.2"/>
                    <text x="50%" y="50%" font-family="Arial" font-size="16" fill="${color}" text-anchor="middle" dominant-baseline="middle">${text || element.alt}</text>
                </svg>
                `;
                
                // Convert SVG to data URL
                const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
                element.src = svgDataUrl;
            }
        });
    }

    // Create placeholder images for the demo
    createPlaceholderSVG('.hero-image img', '#1a73e8', 'Healthcare Professionals');
    createPlaceholderSVG('.service-card img', '#34a853', 'Medical Service');
    createPlaceholderSVG('.about-image img', '#1a73e8', 'About Med-Aids');
    createPlaceholderSVG('.patient-info img', '#ea4335', 'Patient');

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-icon');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // Save user preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.classList.remove('fa-moon');
                darkModeToggle.classList.add('fa-sun');
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.classList.remove('fa-sun');
                darkModeToggle.classList.add('fa-moon');
            }
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.classList.remove('fa-moon');
            darkModeToggle.classList.add('fa-sun');
        } else {
            darkModeToggle.classList.remove('fa-sun');
            darkModeToggle.classList.add('fa-moon');
        }
    }
});