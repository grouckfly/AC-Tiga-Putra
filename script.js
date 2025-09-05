// script.js

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initScrollAnimations();
    initBackToTop();
    initContactForm();
    initStatCounters();
    initSmoothScrolling();
    initMobileMenu();
    initAOSAnimations();
    auto_stat_slider();

    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    document.getElementById('year').textContent = new Date().getFullYear();
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
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
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
    
    // Scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            scrollToSection('services');
        });
    }
}

// Utility function for scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
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

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Validasi form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // 2. Tampilkan status loading PADA TOMBOL
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        submitBtn.disabled = true;

        // 3. Kumpulkan data dari form
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // 4. Buat URL WhatsApp (logika "bulletproof" dipindah ke sini)
        const phoneNumber = '6285745964659';
        const cleanName = data.name ? data.name.trim() : 'Tidak diisi';
        const cleanPhone = data.phone ? data.phone.trim() : 'Tidak diisi';
        const cleanEmail = data.email ? data.email.trim() : 'Tidak diisi';
        const cleanMessage = data.message ? data.message.trim() : 'Tidak ada pesan tambahan';

        const messageParts = [
            "Halo, saya ingin konsultasi tentang layanan AC.",
            "",
            "*Detail Pengirim:*",
            `- Nama: ${cleanName}`,
            `- Telepon: ${cleanPhone}`,
            `- Email: ${cleanEmail}`,
            `- Pesan: ${cleanMessage}`
        ];
        const encodedMessage = encodeURIComponent(messageParts.join('\n'));
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // 5. Buka WhatsApp SEKARANG JUGA
        // Karena ini langsung dieksekusi setelah event 'submit', browser tidak akan memblokirnya.
        window.open(whatsappUrl, '_blank');

        // 6. Atur jeda singkat HANYA untuk reset UI (tombol dan form)
        setTimeout(() => {
            showNotification('Pesan Anda telah dialihkan ke WhatsApp!', 'success');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 800); // Jeda singkat 0.8 detik
    });
}

// Form submission simulation
function submitContactForm(data) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    // Simulasi proses pengiriman
    setTimeout(() => {
        // Kembalikan tombol ke kondisi semula
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Tampilkan notifikasi sukses
        showNotification('Pesan Anda berhasil terkirim!', 'success');
        
        // Kosongkan kolom formulir
        document.getElementById('contactForm').reset();
        
        // Panggil fungsi untuk membuat dan menampilkan link WhatsApp
        generateWhatsAppLink(data);

    }, 1000);
}

// Generate WhatsApp link
function generateWhatsAppLink(data) {
    // GANTI DENGAN NOMOR WHATSAPP ANDA YANG BENAR
    const phoneNumber = '6285745964659'; 

    // 1. Bersihkan setiap input dari spasi yang tidak perlu
    const cleanName = data.name ? data.name.trim() : 'Tidak diisi';
    const cleanPhone = data.phone ? data.phone.trim() : 'Tidak diisi';
    const cleanEmail = data.email ? data.email.trim() : 'Tidak diisi';
    const cleanMessage = data.message ? data.message.trim() : 'Tidak ada pesan tambahan';

    // 2. Buat pesan dari array untuk format yang paling konsisten
    const messageParts = [
        "Halo, saya ingin konsultasi tentang layanan AC.",
        "", // Baris kosong
        "*Detail Pengirim:*",
        `- Nama: ${cleanName}`,
        `- Telepon: ${cleanPhone}`,
        `- Email: ${cleanEmail}`,
        `- Pesan: ${cleanMessage}`
    ];

    // 3. Gabungkan dan encode pesan
    const encodedMessage = encodeURIComponent(messageParts.join('\n'));

    // 4. Buat URL final
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // 5. LANGSUNG BUKA URL DI TAB BARU
    window.open(whatsappUrl, '_blank');
}

// Validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    return phoneRegex.test(phone.replace(/\s|-/g, ''));
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
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
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
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Counter animation for statistics
function initStatCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = target / 50; // Adjust speed
            const duration = 2000; // 2 seconds
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, stepTime);
        });
    }
    
    // Trigger animation when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(statsSection);
    }
}

// Scroll animations
function initScrollAnimations() {
    // Add loading animation to elements
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .contact-item');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Simple AOS (Animate On Scroll) implementation
function initAOSAnimations() {
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            } else {
                entry.target.classList.remove('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    aosElements.forEach(element => {
        aosObserver.observe(element);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Loading screen (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add stagger animation to main elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.classList.add('loading');
    });
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

function auto_stat_slider(){
    const sliderWrapper = document.querySelector('.stat-slider-wrapper');
        const slides = document.querySelectorAll('.stat-slide');
        
        // Cek jika elemen slider ada di halaman
        if (sliderWrapper && slides.length > 0) {
            const slideHeight = slides[0].clientHeight; // Mengambil tinggi satu slide secara dinamis
            let currentIndex = 0;

            setInterval(() => {
                // Pindah ke slide berikutnya
                currentIndex++;

                // Jika sudah di slide terakhir, kembali ke awal
                if (currentIndex >= slides.length) {
                    currentIndex = 0;
                }

                // Geser wrapper ke atas sejauh tinggi slide dikali indeks slide saat ini
                sliderWrapper.style.transform = `translateY(-${currentIndex * slideHeight}px)`;

            }, 3000); // Ganti slide setiap 3000 milidetik (3 detik)
        }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Scroll-dependent functions here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Add CSS animations dynamically
const style = document.createElement('style');
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
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;

document.head.appendChild(style);