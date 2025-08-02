// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Download image function
async function downloadImage(imageUrl, filename) {
    try {
        // Show loading state
        const downloadButtons = document.querySelectorAll(`[onclick*="${imageUrl}"]`);
        downloadButtons.forEach(btn => {
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Downloading...';
            btn.disabled = true;
            
            // Reset button after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 3000);
        });

        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        window.URL.revokeObjectURL(url);
        
        console.log(`Downloaded: ${filename}`);
    } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed. Please try again.');
    }
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 20, 25, 0.95)';
    } else {
        header.style.background = 'rgba(15, 20, 25, 0.9)';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.8s ease-out';
        }
    });
}, observerOptions);

// Observe all anime sections
document.addEventListener('DOMContentLoaded', function() {
    const animeSections = document.querySelectorAll('.anime-section');
    animeSections.forEach(section => {
        observer.observe(section);
    });
    
    // Add loading states to images
    const images = document.querySelectorAll('.anime-image');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.error('Failed to load image:', this.src);
            this.alt = 'Image failed to load';
        });
    });
});

// Mobile menu toggle (if you want to add mobile menu functionality)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    // Add mobile menu implementation here if needed
    console.log('Mobile menu clicked');
}

// Add click event to mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('nav-link')) {
            focusedElement.click();
        }
    }
});

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('.anime-image[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);