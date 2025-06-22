   // Set current year
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Form handling with Web3Forms API
        const contactForm = document.getElementById('contactForm');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const submitText = document.getElementById('submit-text');
        const submitSpinner = document.getElementById('submit-spinner');
        const messageDiv = document.getElementById('form-submit-message');

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            submitText.textContent = 'Sending...';
            submitSpinner.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const result = await response.json();
                
                if (result.success) {
                    messageDiv.textContent = 'Thank you! Your message has been sent.';
                    messageDiv.className = 'alert alert-success mt-3';
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                messageDiv.textContent = 'Oops! There was a problem sending your message. Please try again later.';
                messageDiv.className = 'alert alert-danger mt-3';
            } finally {
                messageDiv.style.display = 'block';
                submitText.textContent = 'Send Message';
                submitSpinner.style.display = 'none';
                submitBtn.disabled = false;
            }
        });

        // Project card animation
        document.addEventListener('DOMContentLoaded', function() {
            const projectCards = document.querySelectorAll('.project-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    }
                });
            }, {threshold: 0.1});

            projectCards.forEach(card => {
                observer.observe(card);
            });

            // GSAP animations for other elements
            gsap.registerPlugin(ScrollTrigger);
            
            gsap.utils.toArray(".section-title").forEach(title => {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    duration: 0.8,
                    x: -50,
                    opacity: 0,
                    ease: "power3.out"
                });
            });
        });