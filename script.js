// script.js

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initMobileMenu();
    initSmoothScrolling();
    initBackToTop();
    initVerticalSlider();
    initStatCounter();
    initContactForm();
    initFooterYear();
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Vertical Image Slider
function initVerticalSlider() {
    const slider = document.getElementById('verticalSlider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto slide every 3 seconds
    setInterval(nextSlide, 3000);
    
    // Initialize first slide
    showSlide(0);
}

// Stat counter animation
function initStatCounter() {
    const statNumber = document.querySelector('.stat-number');
    if (!statNumber) return;
    
    const target = parseInt(statNumber.getAttribute('data-count'));
    let hasAnimated = false;
    
    function animateCounter() {
        if (hasAnimated) return;
        hasAnimated = true;
        
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                statNumber.textContent = target;
                clearInterval(timer);
            } else {
                statNumber.textContent = Math.floor(current);
            }
        }, stepTime);
    }
    
    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(statNumber);
}

// Contact form submission with option to send via WhatsApp or Email
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check form validity using built-in validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Show send options modal
        showSendOptionsModal(formData);
    });
}

// Show modal with send options
function showSendOptionsModal(formData) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.send-options-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'send-options-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Pilih Metode Pengiriman</h3>
                <p>Bagaimana Anda ingin mengirim pesan ini?</p>
            </div>
            <div class="send-options">
                <button class="send-option-btn whatsapp" data-method="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                    <div class="option-text">
                        <strong>WhatsApp</strong>
                        <span>Kirim langsung via chat</span>
                    </div>
                </button>
                <button class="send-option-btn email" data-method="email">
                    <i class="fas fa-envelope"></i>
                    <div class="option-text">
                        <strong>Email</strong>
                        <span>Kirim via email client</span>
                    </div>
                </button>
            </div>
            <button class="modal-cancel">Batal</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Handle WhatsApp option
    modal.querySelector('.whatsapp').addEventListener('click', function() {
        sendViaWhatsApp(formData);
        closeModal(modal);
    });
    
    // Handle Email option
    modal.querySelector('.email').addEventListener('click', function() {
        sendViaEmail(formData);
        closeModal(modal);
    });
    
    // Handle cancel
    modal.querySelector('.modal-cancel').addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

// Send via WhatsApp
function sendViaWhatsApp(formData) {
    // Construct WhatsApp message
    const messageLines = [
        '=== PESAN DARI WEBSITE AC TIGA PUTRA ===',
        '',
        `Nama: ${formData.name}`,
        `Telepon: ${formData.phone}`,
        formData.email ? `Email: ${formData.email}` : '',
        '',
        'Pesan:',
        formData.message,
        '',
        '================================'
    ];
    
    const fullMessage = messageLines.filter(line => line !== '').join('\n');
    const encodedMessage = encodeURIComponent(fullMessage);
    
    // Open WhatsApp with message
    const whatsappUrl = `https://wa.me/6285745964659?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success notification
    showNotification('Membuka WhatsApp...', 'success');
    
    // Reset form after delay
    setTimeout(() => {
        document.getElementById('contactForm').reset();
    }, 1000);
}

// Send via Email
function sendViaEmail(formData) {
    // Construct email subject and body
    const subject = encodeURIComponent('Pesan dari Website AC Tiga Putra');
    
    const bodyLines = [
        'Pesan dari Website AC Tiga Putra',
        '',
        `Nama: ${formData.name}`,
        `Telepon: ${formData.phone}`,
        formData.email ? `Email: ${formData.email}` : '',
        '',
        'Pesan:',
        formData.message,
        '',
        '---',
        'Dikirim melalui formulir kontak website'
    ];
    
    const body = encodeURIComponent(bodyLines.filter(line => line !== '').join('\n'));
    
    // Open email client
    const mailtoUrl = `mailto:info@acTigaPutra.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    
    // Show success notification
    showNotification('Membuka aplikasi email...', 'success');
    
    // Reset form after delay
    setTimeout(() => {
        document.getElementById('contactForm').reset();
    }, 1000);
}

// Close modal with animation
function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#007bff'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type] || icons.info}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 15px;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add notification styles to page
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s ease;
                padding: 5px;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Update footer year automatically
function initFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press Escape to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Scroll-dependent functions are already handled individually
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);