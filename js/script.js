/**
 * Professional Portfolio Website JavaScript
 * This script handles animations, interactions, and form validation
 */

// Wait for the DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const currentYearElem = document.getElementById('current-year');

    // Set current year in the footer
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // Navigation Menu Toggle for Mobile
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add animation to menu toggle
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu when clicking a nav link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                menuToggle.click();
            }
        });
    });

    // Sticky Header on Scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
        
        // Highlight active section in navigation
        highlightActiveSection();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip empty href or href="#" links
            if (!targetId || targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section in navigation based on scroll position
    function highlightActiveSection() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Filter projects 
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all filter buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact Form Validation and Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'Please enter a subject');
                isValid = false;
            } else {
                removeError(subjectInput);
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, simulate form submission
            if (isValid) {
                // In a real application, you would submit the form to a server here
                // For this demo, we'll just show a success message
                
                // Create a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! I'll get back to you soon.</p>
                `;
                
                // Clear form fields
                contactForm.reset();
                
                // Replace form with success message
                contactForm.style.display = 'none';
                contactForm.parentNode.appendChild(successMessage);
                
                // Optional: Reset form after a delay
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    successMessage.remove();
                }, 5000);
            }
        });
        
        // Email validation helper function
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Show error message
        function showError(input, message) {
            const formGroup = input.parentElement;
            let errorElement = formGroup.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            input.classList.add('error-input');
        }
        
        // Remove error message
        function removeError(input) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                errorElement.remove();
            }
            
            input.classList.remove('error-input');
        }
    }

    // Add animation to skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    
    // Function to animate skill bars when they come into view
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-in-out';
                    bar.style.width = width;
                }, 100);
            }
        });
    }
    
    // Trigger animation on scroll
    window.addEventListener('scroll', animateSkillBars);
    // Trigger once on load
    animateSkillBars();

    // Initialize AOS for scroll animations
    initializeAOS();
});

// Simple Animation on Scroll functionality
function initializeAOS() {
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .about-details, .contact-form-container, .contact-info');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.classList.add('will-animate');
        observer.observe(element);
    });
}

// Add subtle animations to elements
function initializeAnimations() {
    // Add floating animation to section titles and scroll indicator
    document.querySelectorAll('.section-header h2').forEach(header => {
        header.classList.add('float-element');
    });
    
    document.querySelectorAll('.scroll-down').forEach(el => {
        el.classList.add('float-element');
    });
    
    // Add subtle glow effect to skill progress bars
    document.querySelectorAll('.skill-level').forEach(el => {
        el.classList.add('glossy');
    });
    
    // Add subtle shine to section underlines
    document.querySelectorAll('.underline').forEach(el => {
        el.classList.add('glossy');
    });
    
    // Add subtle glow to primary buttons
    document.querySelectorAll('.primary-btn').forEach(btn => {
        btn.classList.add('subtle-glow');
    });
}

// Initialize animations when the page loads
initializeAnimations();

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    .will-animate {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .error-message {
        color: var(--error-color);
        font-size: 0.85rem;
        margin-top: 5px;
    }
    
    .error-input {
        border-color: var(--error-color) !important;
    }
    
    .form-success-message {
        text-align: center;
        padding: 2rem;
        background-color: rgba(40, 167, 69, 0.1);
        border-radius: var(--border-radius-md);
        color: var(--success-color);
    }
    
    .form-success-message i {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    /* Enhanced animations */
    .text-content h1 {
        animation: gradientText 5s ease infinite;
        background-size: 200% 200%;
    }
    
    .subtle-glow {
        box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
        transition: box-shadow 0.3s ease;
    }
    
    .subtle-glow:hover {
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
    }
    
    .glossy {
        position: relative;
        overflow: hidden;
    }
    
    .glossy::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.05) 40%,
            rgba(255, 255, 255, 0) 100%
        );
        transform: rotate(30deg);
        pointer-events: none;
    }

    .skill-item, .project-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    box-shadow 0.4s ease,
                    background-color 0.4s ease;
    }

    .social-icons a {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    box-shadow 0.4s ease, 
                    background-color 0.4s ease;
    }

    @keyframes gradientText {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .btn {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .section-header h2::before {
        animation: floatText 5s ease-in-out infinite;
    }

    @keyframes floatText {
        0%, 100% {
            transform: translateX(-50%) translateY(0px);
        }
        50% {
            transform: translateX(-50%) translateY(-7px);
        }
    }
    
    .float-element {
        animation: float 4s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    /* Smooth scroll behavior */
    html {
        scroll-behavior: smooth;
    }

    /* Back to top button animation */
    .back-to-top {
        transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .back-to-top.show {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
        }
    }
</style>
`);
