// ==========================================================================
// Yogesh E S - Aerospace & UAV Autonomy Portfolio Logic
// Custom Interactive Particle, Typewriter, and Console Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Typewriter Effect for Hero Subtitle
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "UAV Autonomy Engineer",
        "Embedded Systems Architect",
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

    // Initialize typewriter if element exists
    if (typewriterElement) {
        type();
    }

    // 2. Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight when section is 30% inside the viewport
            if (window.scrollY >= (sectionTop - 200)) {
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

    // 3. Copy-to-Clipboard Direct Console Feature
    const copyButton = document.getElementById('copy-button');
    const emailText = document.getElementById('email-text');

    if (copyButton && emailText) {
        copyButton.addEventListener('click', () => {
            // Get plain text draft (cleaning up HTML tags)
            const draftText = emailText.innerText.replace(/Subject:/g, "Subject:").trim();
            
            navigator.clipboard.writeText(draftText)
                .then(() => {
                    // Visual feedback: Switch button states
                    const originalHTML = copyButton.innerHTML;
                    copyButton.innerHTML = `<i class="fa-solid fa-circle-check"></i> Draft Copied to Clipboard!`;
                    copyButton.style.background = '#39ff14';
                    copyButton.style.color = '#030712';
                    copyButton.style.borderColor = '#39ff14';
                    copyButton.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.4)';

                    // Reset button after 3 seconds
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

    // 4. Smooth Scrolling for Internal Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Accounts for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. Interactive Glitch Sound Hover Accent (Web Audio API Synthesizer)
    // Plays a micro, high-tech synthesised click sound when project cards or links are hovered.
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
            // Dynamic exponential sweep for a cybernetic sound
            osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + duration);

            gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Audio context failed or blocked by browser security (ignores silently)
        }
    }

    // Attach sound dynamics to buttons and project cards
    const clickElements = document.querySelectorAll('.project-card, .btn, .nav-link');
    clickElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            playCyberClick(1800, 0.04);
        });
    });
});
