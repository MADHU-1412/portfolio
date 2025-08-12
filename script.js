// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active state to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navHeight = document.querySelector('.nav').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - navHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add hover effects to project CTAs
    const projectCtas = document.querySelectorAll('.project-cta');
    
    projectCtas.forEach(cta => {
        cta.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        cta.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add scroll reveal animation for projects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all projects for animation
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(50px)';
        project.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(project);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add typing effect to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.classList.add('shine-text');
}



    // Add scroll-triggered animations for other elements
    const fadeElements = document.querySelectorAll('.hero-description, .linkedin-link, .section-title, .about-description, .contact-title');
    
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
    });

    // Ensure images are loaded properly and always visible
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.display = 'block';
        });
        
        img.addEventListener('error', function() {
            console.error('Image failed to load:', this.src);
            // Don't hide the image on error, just log it
        });
        
        // Ensure images are visible immediately
        img.style.opacity = '1';
        img.style.display = 'block';
    });

    // Fix layout issues on window resize
    window.addEventListener('resize', function() {
        // Trigger layout recalculation
        document.body.style.height = document.body.scrollHeight + 'px';
    });
});

// Add CSS for active navigation state and improved styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #4B97EF !important;
        font-weight: 600;
    }
    
    .project-cta {
        cursor: pointer;
    }
    
    .project-cta:hover .cta-text {
        color: #4B97EF;
    }
    
    .project-cta:hover .cta-arrow svg rect {
        fill: #4B97EF;
    }
    
    .project-cta:hover .cta-arrow svg path {
        stroke: #4B97EF;
    }
    
    /* Ensure proper image display - images should always be visible */
    img {
        opacity: 1 !important;
        display: block !important;
        transition: opacity 0.3s ease;
    }
    
    /* Fix for image borders */
    .image-border {
        overflow: hidden;
    }
    
    /* Ensure proper button sizing */
    .project-cta {
        min-width: 223px;
        min-height: 61px;
    }
    
    /* Fix for mobile responsiveness */
    @media (max-width: 768px) {
        .project-content {
            align-items: center;
        }
        
        .project-info {
            order: 1;
        }
        
        .project-image {
            order: 2;
        }
    }
`;
document.head.appendChild(style);
