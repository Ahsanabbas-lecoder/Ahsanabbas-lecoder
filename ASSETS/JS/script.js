   // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Initialize GSAP animations
        document.addEventListener('DOMContentLoaded', function() {
            // Verify GSAP and ScrollTrigger are loaded
            console.log('GSAP:', typeof gsap !== 'undefined' ? 'Loaded' : 'Not Loaded');
            console.log('ScrollTrigger:', typeof ScrollTrigger !== 'undefined' ? 'Loaded' : 'Not Loaded');

            // Register ScrollTrigger plugin
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
            } else {
                console.error('GSAP or ScrollTrigger failed to load');
                // Fallback: Ensure project and skill cards are visible
                document.querySelectorAll('.project-card, .skill-card').forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }

            // Hero section animations
            gsap.from("#profile-img", {
                duration: 1.2,
                y: -60,
                opacity: 0,
                ease: "back.out(1.7)"
            });

            gsap.from("#hero-title", {
                duration: 1.2,
                y: -40,
                opacity: 0,
                delay: 0.3,
                ease: "power3.out"
            });

            gsap.from("#hero-subtitle", {
                duration: 1.2,
                y: -40,
                opacity: 0,
                delay: 0.6,
                ease: "power3.out"
            });

            gsap.from("#hero-buttons", {
                duration: 1.2,
                y: 40,
                opacity: 0,
                delay: 0.9,
                ease: "power3.out"
            });

            // Floating shapes animation
            const createShapes = () => {
                const colors = ["rgba(52, 152, 219, 0.2)", "rgba(155, 89, 182, 0.2)", "rgba(26, 188, 156, 0.2)"];
                for (let i = 1; i <= 3; i++) {
                    const shape = document.getElementById(`shape${i}`);
                    shape.style.width = `${Math.random() * 150 + 50}px`;
                    shape.style.height = shape.style.width;
                    shape.style.background = colors[i-1];
                    shape.style.top = `${Math.random() * 80 + 10}%`;
                    shape.style.left = `${Math.random() * 80 + 10}%`;
                    gsap.to(shape, {
                        duration: 15 + (i * 5),
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 100 - 50,
                        rotation: 360,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: i * 0.5
                    });
                }
            };
            createShapes();

            // Section title animations
            gsap.utils.toArray(".section-title").forEach(title => {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    duration: 0.9,
                    x: -60,
                    opacity: 0,
                    ease: "power3.out"
                });
            });

            // About section animations
            gsap.from("#about-left", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                duration: 0.9,
                x: -60,
                opacity: 0,
                ease: "power3.out"
            });

            gsap.from("#about-right", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                duration: 0.9,
                x: 60,
                opacity: 0,
                ease: "power3.out",
                delay: 0.2
            });

            // Projects animations
            gsap.utils.toArray(".project-card").forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    duration: 0.9,
                    y: 60,
                    opacity: 0,
                    ease: "power3.out",
                    delay: i * 0.15
                });
            });

            // Skills animations
            gsap.utils.toArray(".skill-card").forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    duration: 0.9,
                    y: 60,
                    opacity: 0,
                    ease: "power3.out",
                    delay: i * 0.15
                });
            });

            // Education animations
            gsap.utils.toArray("#edu1, #edu2, #edu3").forEach((edu, i) => {
                gsap.from(edu, {
                    scrollTrigger: {
                        trigger: "#education",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    duration: 0.9,
                    y: 60,
                    opacity: 0,
                    ease: "power3.out",
                    delay: i * 0.25
                });
            });

            // Contact animations
            gsap.from("#contact-info", {
                scrollTrigger: {
                    trigger: "#contact",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                duration: 0.9,
                x: -60,
                opacity: 0,
                ease: "power3.out"
            });

            gsap.from("#contact-form", {
                scrollTrigger: {
                    trigger: "#contact",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                duration: 0.9,
                x: 60,
                opacity: 0,
                ease: "power3.out",
                delay: 0.2
            });

            // Form submission handling with loading state
            const form = document.getElementById('contactForm');
            const result = document.getElementById('form-submit-message');
            const submitBtn = document.getElementById('submit-btn');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                submitBtn.disabled = true;
                submitBtn.classList.add('form-loading');
                submitBtn.textContent = 'Sending...';
                const formData = new FormData(form);
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('form-loading');
                    submitBtn.textContent = 'Send Message';
                    if (response.ok) {
                        result.innerHTML = 'Thank you for your message! I will get back to you soon.';
                        result.className = 'alert alert-success mt-3';
                        result.style.display = 'block';
                        form.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('form-loading');
                    submitBtn.textContent = 'Send Message';
                    result.innerHTML = 'Oops! There was a problem submitting your form. Please try again later.';
                    result.className = 'alert alert-danger mt-3';
                    result.style.display = 'block';
                });
            });

            // Back to top button
            const backToTop = document.getElementById('back-to-top');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.style.display = 'block';
                } else {
                    backToTop.style.display = 'none';
                }
            });

            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });