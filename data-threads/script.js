// ===== Digital Threads JavaScript =====

/**
 * Toggle section visibility when section header is clicked
 * @param {HTMLElement} header - The clicked section header element
 */
function toggleSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.textContent = '▼';
    } else {
        content.classList.add('active');
        icon.textContent = '▲';
    }
}

/**
 * Initialize the page when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Auto-expand the first section on load
    const firstSection = document.querySelector('.section-content');
    const firstIcon = document.querySelector('.toggle-icon');
    
    if (firstSection && firstIcon) {
        firstSection.classList.add('active');
        firstIcon.textContent = '▲';
    }
    
    // Add smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Initialize any other interactive elements
    initializeInteractiveElements();
});

/**
 * Add smooth scrolling behavior to anchor links
 */
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize interactive elements and animations
 */
function initializeInteractiveElements() {
    // Add intersection observer for animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for scroll animations
    const cards = document.querySelectorAll('.card, .project-card, .pioneer-card, .timeline-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Add click event listeners to project cards for future modal functionality
 */
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Future: Open modal with detailed project information
            const projectTitle = this.querySelector('h3').textContent;
            console.log(`Opening project: ${projectTitle}`);
            // This is where you would implement modal functionality
        });
    });
}

/**
 * Search functionality for filtering content (for future implementation)
 * @param {string} searchTerm - The term to search for
 */
function searchContent(searchTerm) {
    const sections = document.querySelectorAll('.section');
    const searchLower = searchTerm.toLowerCase();
    
    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        if (content.includes(searchLower) || searchTerm === '') {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

/**
 * Filter content by category (for future implementation)
 * @param {string} category - The category to filter by
 */
function filterByCategory(category) {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        if (category === 'all') {
            section.style.display = 'block';
        } else {
            const categories = section.getAttribute('data-category');
            if (categories && categories.includes(category)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        }
    });
}

/**
 * Utility function to debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Whether to execute immediately
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}