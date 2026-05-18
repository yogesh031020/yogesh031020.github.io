// ==========================================================================
// Yogesh E S - Aerospace & UAV Autonomy Portfolio Logic
// Custom Interactive Particles, Scroll Reveal, Web Audio Synth
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Typewriter Effect for Hero Subtitle
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "UAV Autonomy Architect",
        "Embedded Systems Engineer",
        "Aerospace AI Specialist",
        "Robotics Systems Builder"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 150;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            delay = 50; // Deletes faster
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            delay = 100; // Normal typing speed
        }

        // Handle word switching and delays
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            delay = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 500; // Pause before typing next word
        }

        setTimeout(type, delay);
    }

    if (typewriterElement) {
        type();
    }

    // 2. Premium Scroll Reveal IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal, .reveal-delay');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once revealed, no need to keep observing
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Copy-to-Clipboard Direct Console Feature
    const copyButton = document.getElementById('copy-button');
    const emailText = document.getElementById('email-text');

    if (copyButton && emailText) {
        copyButton.addEventListener('click', () => {
            // Get plain text draft (cleaning up HTML tags)
            const draftText = emailText.innerText.replace(/Subject:/g, "Subject:").trim();
            
            navigator.clipboard.writeText(draftText)
                .then(() => {
                    const originalHTML = copyButton.innerHTML;
                    copyButton.innerHTML = `<i class="fa-solid fa-circle-check"></i> Command Executed: Copied!`;
                    copyButton.style.background = '#10b981';
                    copyButton.style.color = '#fff';
                    copyButton.style.borderColor = '#10b981';
                    copyButton.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.4)';

                    setTimeout(() => {
                        copyButton.innerHTML = originalHTML;
                        copyButton.style.background = '';
                        copyButton.style.color = '';
                        copyButton.style.borderColor = '';
                        copyButton.style.boxShadow = '';
                    }, 3000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    }

    // 4. Interactive Glitch Sound Hover Accent (Web Audio API Synthesizer)
    let audioCtx = null;

    function playCyberClick(frequency = 1200, duration = 0.05) {
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + duration);

            gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Audio context failed or blocked by browser security (ignores silently)
        }
    }

    // Attach premium click dynamics to interactive components
    const clickElements = document.querySelectorAll('.project-card, .btn, .nav-link');
    clickElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            playCyberClick(2200, 0.04);
        });
    });

    // 5. Active Link Underline Dynamics on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 250)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});
