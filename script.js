// ==========================================================================
// Yogesh E S - Aerospace & UAV Autonomy Portfolio Logic
// Custom Interactive Particles, Scroll Reveal, Web Audio Synth
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Typewriter Effect for Hero Subtitle
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "Aeronautical Engineer"
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
            if (words.length === 1) {
                // Keep the cursor blinking but stop typing loop
                return;
            }
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

    // ==========================================================================
    // 6. Interactive CFD Wind Tunnel Physics & Telemetry Console Logic
    // ==========================================================================
    const wtCanvas = document.getElementById('windTunnelCanvas');
    const clCanvas = document.getElementById('clCurveCanvas');

    if (wtCanvas && clCanvas) {
        const wtCtx = wtCanvas.getContext('2d');
        const clCtx = clCanvas.getContext('2d');

        // Telemetry DOM elements
        const aoaSlider = document.getElementById('aoa-slider');
        const aoaSliderVal = document.getElementById('aoa-slider-val');
        const velocitySlider = document.getElementById('velocity-slider');
        const velocitySliderVal = document.getElementById('velocity-slider-val');
        const airfoilSelect = document.getElementById('airfoil-select');

        const liftVal = document.getElementById('lift-val');
        const dragVal = document.getElementById('drag-val');
        const ldVal = document.getElementById('ld-val');
        const clVal = document.getElementById('cl-val');

        const hudAlphaVal = document.getElementById('hud-alpha-val');
        const stallWarning = document.getElementById('stall-warning');

        // Physics State
        let state = {
            aoa: 4.0, // degrees
            velocity: 80.0, // knots
            airfoil: 'naca4412',
            cl: 0.0,
            cd: 0.0,
            lift: 0.0,
            drag: 0.0,
            ldRatio: 0.0,
            isStalled: false
        };

        // Resize Handlers
        function resizeCanvases() {
            const wtRect = wtCanvas.parentElement.getBoundingClientRect();
            wtCanvas.width = wtRect.width;
            wtCanvas.height = wtRect.height;

            const clRect = clCanvas.parentElement.getBoundingClientRect();
            clCanvas.width = clRect.width;
            clCanvas.height = clRect.height;
        }
        resizeCanvases();
        window.addEventListener('resize', resizeCanvases);

        // Particle stream initialization
        const numParticles = 160;
        let particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * 800,
                y: Math.random() * 360,
                speedOffset: Math.random() * 0.4 + 0.8
            });
        }

        // NACA Airfoil Coefficient Solver
        function solveAerodynamics(aoa, V_kts, type) {
            let cl = 0.0;
            let cd = 0.0;
            let stallAoA = 15.0;
            let minStallAoA = -10.0;
            let isStalled = false;

            const rad = aoa * Math.PI / 180;

            if (type === 'naca0012') { // Symmetric
                stallAoA = 14.0;
                minStallAoA = -14.0;
                if (aoa > stallAoA || aoa < minStallAoA) {
                    isStalled = true;
                    // Post-stall lift fall-off
                    let stallFactor = Math.exp(-Math.abs(aoa - (aoa > 0 ? stallAoA : minStallAoA)) * 0.1);
                    cl = 0.11 * (aoa > 0 ? stallAoA : minStallAoA) * stallFactor;
                    cd = 0.008 + 0.04 * Math.pow(cl, 2) + 0.15 * Math.abs(rad);
                } else {
                    cl = 2 * Math.PI * rad;
                    cd = 0.008 + 0.04 * Math.pow(cl, 2);
                }
            } else if (type === 'naca4412') { // Cambered
                stallAoA = 16.0;
                minStallAoA = -11.0;
                // Shifted lift curve due to camber (lift at 0 AoA is positive)
                let effectiveAoA = aoa + 4.0;
                if (effectiveAoA > (stallAoA + 4.0) || effectiveAoA < (minStallAoA + 4.0)) {
                    isStalled = true;
                    let stallFactor = Math.exp(-Math.abs(effectiveAoA - (effectiveAoA > 0 ? (stallAoA + 4.0) : (minStallAoA + 4.0))) * 0.15);
                    cl = 0.11 * (effectiveAoA > 0 ? (stallAoA + 4.0) : (minStallAoA + 4.0)) * stallFactor;
                    cd = 0.010 + 0.045 * Math.pow(cl, 2) + 0.18 * Math.abs(rad);
                } else {
                    cl = 0.11 * effectiveAoA;
                    cd = 0.010 + 0.045 * Math.pow(cl, 2);
                }
            } else if (type === 'eppler387') { // High Lift
                stallAoA = 17.0;
                minStallAoA = -9.0;
                let effectiveAoA = aoa + 6.0;
                if (effectiveAoA > (stallAoA + 6.0) || effectiveAoA < (minStallAoA + 6.0)) {
                    isStalled = true;
                    let stallFactor = Math.exp(-Math.abs(effectiveAoA - (effectiveAoA > 0 ? (stallAoA + 6.0) : (minStallAoA + 6.0))) * 0.12);
                    cl = 0.11 * (effectiveAoA > 0 ? (stallAoA + 6.0) : (minStallAoA + 6.0)) * stallFactor;
                    cd = 0.012 + 0.05 * Math.pow(cl, 2) + 0.22 * Math.abs(rad);
                } else {
                    cl = 0.11 * effectiveAoA;
                    cd = 0.012 + 0.05 * Math.pow(cl, 2);
                }
            }

            // Convert velocity to m/s (1 knot = 0.5144 m/s)
            let V = V_kts * 0.5144;
            let rho = 1.225; // standard sea-level density
            let S = 0.5; // wing slice area reference

            let lift = 0.5 * rho * V * V * S * cl;
            let drag = 0.5 * rho * V * V * S * cd;
            let ldRatio = cd !== 0 ? (cl / cd) : 0;

            // Make sure negative values of forces are modeled
            return {
                cl: cl,
                cd: cd,
                lift: lift,
                drag: drag,
                ldRatio: ldRatio,
                isStalled: isStalled
            };
        }

        // NACA programmatical coordinates generator
        function getNacaShape(m, p, t, chord, cx, cy, aoaDeg) {
            let points = [];
            const numPoints = 40;
            const aoaRad = -aoaDeg * Math.PI / 180; // Negative because screen Y coordinate increases downwards

            let upper = [];
            let lower = [];

            // Aerodynamic center (approx 25% chord)
            const acX = 0.25 * chord;

            for (let i = 0; i <= numPoints; i++) {
                let beta = (i / numPoints) * Math.PI;
                let x = chord * 0.5 * (1 - Math.cos(beta)); // Cosine spacing for nose detail

                let yt = 5 * t * chord * (
                    0.2969 * Math.sqrt(x/chord) - 
                    0.1260 * (x/chord) - 
                    0.3516 * Math.pow(x/chord, 2) + 
                    0.2843 * Math.pow(x/chord, 3) - 
                    0.1015 * Math.pow(x/chord, 4)
                );

                let yc = 0;
                let dyc_dx = 0;
                if (p > 0) {
                    if (x < p * chord) {
                        yc = (m / (p*p)) * (2*p*(x/chord) - Math.pow(x/chord, 2)) * chord;
                        dyc_dx = (2*m / (p*p)) * (p - x/chord);
                    } else {
                        yc = (m / Math.pow(1-p, 2)) * ((1 - 2*p) + 2*p*(x/chord) - Math.pow(x/chord, 2)) * chord;
                        dyc_dx = (2*m / Math.pow(1-p, 2)) * (p - x/chord);
                    }
                }

                let theta = Math.atan(dyc_dx);
                
                let xu = x - yt * Math.sin(theta);
                let yu = yc + yt * Math.cos(theta);
                let xl = x + yt * Math.sin(theta);
                let yl = yc - yt * Math.cos(theta);

                // Rotate around AC
                function rotatePoint(px, py) {
                    let rx = px - acX;
                    let ry = py; // relative to camber line zero
                    let rotX = rx * Math.cos(aoaRad) - ry * Math.sin(aoaRad);
                    let rotY = rx * Math.sin(aoaRad) + ry * Math.cos(aoaRad);
                    return {
                        x: cx + acX + rotX,
                        y: cy + rotY
                    };
                }

                upper.push(rotatePoint(xu, yu));
                lower.push(rotatePoint(xl, yl));
            }

            // Join upper and lower curves to form closed loop
            points = upper.concat(lower.reverse());
            return points;
        }

        // Particle stream warping function
        function getWarpedY(x, y0, cx, cy, chord, aoa, camber) {
            let dx = x - cx;
            let rx = dx / (chord * 1.3);
            if (Math.abs(rx) > 2) return y0;

            let influence = Math.exp(-rx * rx * 1.5);
            let dy = y0 - cy;
            let ry = dy / (chord * 0.9);
            if (Math.abs(ry) > 2.5) return y0;

            let yInfluence = Math.exp(-ry * ry * 1.6);
            
            // Camber and AoA deflection
            let deflection = (aoa * 0.075 + camber * 2.8) * chord * 0.08;
            let thicknessDeflect = 0.16 * chord * Math.sqrt(Math.max(0, rx + 0.5)) * (1 - Math.max(0, rx - 0.5));
            if (isNaN(thicknessDeflect)) thicknessDeflect = 0;

            let side = dy >= 0 ? 1 : -1;
            let totalDeflect = (deflection * 0.8 * rx + thicknessDeflect * 0.95 * side) * yInfluence * influence;

            return y0 - totalDeflect;
        }

        // Main Wind Tunnel Animation Frame
        function drawWindTunnel() {
            wtCtx.clearRect(0, 0, wtCanvas.width, wtCanvas.height);

            const cx = wtCanvas.width * 0.35;
            const cy = wtCanvas.height * 0.5;
            const chord = Math.min(wtCanvas.width * 0.28, 180);

            // 1. Draw Millimeter Blueprint Grid inside Canvas
            wtCtx.strokeStyle = 'rgba(0, 210, 255, 0.04)';
            wtCtx.lineWidth = 1;
            const minorGrid = 20;
            for (let x = 0; x < wtCanvas.width; x += minorGrid) {
                wtCtx.beginPath();
                wtCtx.moveTo(x, 0);
                wtCtx.lineTo(x, wtCanvas.height);
                wtCtx.stroke();
            }
            for (let y = 0; y < wtCanvas.height; y += minorGrid) {
                wtCtx.beginPath();
                wtCtx.moveTo(0, y);
                wtCtx.lineTo(wtCanvas.width, y);
                wtCtx.stroke();
            }

            wtCtx.strokeStyle = 'rgba(0, 210, 255, 0.09)';
            const majorGrid = 100;
            for (let x = 0; x < wtCanvas.width; x += majorGrid) {
                wtCtx.beginPath();
                wtCtx.moveTo(x, 0);
                wtCtx.lineTo(x, wtCanvas.height);
                wtCtx.stroke();
            }
            for (let y = 0; y < wtCanvas.height; y += majorGrid) {
                wtCtx.beginPath();
                wtCtx.moveTo(0, y);
                wtCtx.lineTo(wtCanvas.width, y);
                wtCtx.stroke();
            }

            // 2. Draw Stagnation Glow / Aerodynamic Pressure Map
            let camberVal = state.airfoil === 'naca0012' ? 0.0 : (state.airfoil === 'naca4412' ? 0.04 : 0.07);
            
            // Draw stagnation point pressure (red high drag glow) at the nose
            let noseRotX = -0.25 * chord;
            let noseRotY = 0;
            let aoaRad = -state.aoa * Math.PI / 180;
            let rotNoseX = cx + 0.25*chord + noseRotX * Math.cos(aoaRad) - noseRotY * Math.sin(aoaRad);
            let rotNoseY = cy + noseRotX * Math.sin(aoaRad) + noseRotY * Math.cos(aoaRad);

            let pressureGradient = wtCtx.createRadialGradient(
                rotNoseX, rotNoseY, 2, 
                rotNoseX, rotNoseY, 25 + Math.abs(state.aoa) * 0.8
            );
            pressureGradient.addColorStop(0, 'rgba(255, 71, 87, 0.35)');
            pressureGradient.addColorStop(0.5, 'rgba(255, 71, 87, 0.1)');
            pressureGradient.addColorStop(1, 'transparent');

            wtCtx.fillStyle = pressureGradient;
            wtCtx.beginPath();
            wtCtx.arc(rotNoseX, rotNoseY, 25 + Math.abs(state.aoa) * 0.8, 0, 2 * Math.PI);
            wtCtx.fill();

            // Upper surface low pressure glow (cyan lift suction)
            if (!state.isStalled && state.cl > 0) {
                let suctionX = cx + 0.25 * chord;
                let suctionY = cy - 15 - state.cl * 12;
                let suctionGrad = wtCtx.createRadialGradient(
                    suctionX, suctionY, 5,
                    suctionX, suctionY, 40 + state.cl * 20
                );
                suctionGrad.addColorStop(0, 'rgba(0, 210, 255, 0.25)');
                suctionGrad.addColorStop(1, 'transparent');
                wtCtx.fillStyle = suctionGrad;
                wtCtx.beginPath();
                wtCtx.arc(suctionX, suctionY, 40 + state.cl * 20, 0, 2 * Math.PI);
                wtCtx.fill();
            }

            // 3. Draw & Update Fluid Particles Streamlines
            const flowSpeed = state.velocity * 0.12;
            wtCtx.fillStyle = 'rgba(0, 210, 255, 0.6)';

            particles.forEach(p => {
                p.x += flowSpeed * p.speedOffset;
                if (p.x > wtCanvas.width) {
                    p.x = 0;
                    p.y = Math.random() * wtCanvas.height;
                }

                // Compute warped path
                let drawY = getWarpedY(p.x, p.y, cx, cy, chord, state.aoa, camberVal);
                let drawX = p.x;

                // Stall wake turbulence: add chaotic oscillations behind wing
                if (state.isStalled && p.x > (cx + chord * 0.3)) {
                    let wakeDistance = (p.x - (cx + chord * 0.3)) / chord;
                    let turbulence = 22 * Math.sin(p.x * 0.15 + Date.now() * 0.05) * Math.min(1.2, wakeDistance);
                    drawY += turbulence;
                }

                // Color particles based on local velocity (Bernoulli effect)
                // Flow on upper surface moves faster (cyan), lower flow moves slower (indigo)
                let isTop = p.y < cy;
                wtCtx.fillStyle = isTop ? 'rgba(0, 210, 255, 0.7)' : 'rgba(99, 102, 241, 0.6)';
                
                // Draw particle
                wtCtx.beginPath();
                wtCtx.arc(drawX, drawY, 1.8, 0, 2 * Math.PI);
                wtCtx.fill();
            });

            // 4. Draw Airfoil Shape (Solved programmatically from NACA definitions)
            let m = state.airfoil === 'naca0012' ? 0.0 : (state.airfoil === 'naca4412' ? 0.04 : 0.07);
            let p = state.airfoil === 'naca0012' ? 0.0 : (state.airfoil === 'naca4412' ? 0.4 : 0.35);
            let t = state.airfoil === 'eppler387' ? 0.09 : 0.12; // Eppler has thin high lift section

            let airfoilPoints = getNacaShape(m, p, t, chord, cx, cy, state.aoa);

            wtCtx.fillStyle = '#061121';
            wtCtx.strokeStyle = state.isStalled ? '#ff4757' : '#00d2ff';
            wtCtx.lineWidth = 2.5;

            wtCtx.beginPath();
            if (airfoilPoints.length > 0) {
                wtCtx.moveTo(airfoilPoints[0].x, airfoilPoints[0].y);
                for (let i = 1; i < airfoilPoints.length; i++) {
                    wtCtx.lineTo(airfoilPoints[i].x, airfoilPoints[i].y);
                }
                wtCtx.closePath();
                wtCtx.fill();
                wtCtx.stroke();
            }

            // 5. Draw Dynamic Vector Force Arrows (Lift & Drag)
            let acX = cx + 0.25 * chord;
            let acY = cy;

            // Scale arrow sizes
            let liftLen = state.lift * 0.45;
            let dragLen = state.drag * 0.95;

            // Limit maximum force arrow lengths for visual safety
            liftLen = Math.max(-120, Math.min(120, liftLen));
            dragLen = Math.min(65, dragLen);

            // Draw Lift Arrow (Upwards, cyan)
            if (Math.abs(liftLen) > 2) {
                wtCtx.strokeStyle = 'rgba(0, 210, 255, 0.95)';
                wtCtx.fillStyle = 'rgba(0, 210, 255, 0.95)';
                wtCtx.lineWidth = 3.5;

                wtCtx.beginPath();
                wtCtx.moveTo(acX, acY);
                wtCtx.lineTo(acX, acY - liftLen);
                wtCtx.stroke();

                // Arrowhead
                let arrowSign = liftLen > 0 ? 1 : -1;
                wtCtx.beginPath();
                wtCtx.moveTo(acX - 6, acY - liftLen + 7 * arrowSign);
                wtCtx.lineTo(acX, acY - liftLen);
                wtCtx.lineTo(acX + 6, acY - liftLen + 7 * arrowSign);
                wtCtx.fill();

                // Label
                wtCtx.font = 'bold 9px Orbitron';
                wtCtx.fillText(`LIFT: ${Math.round(state.lift)}N`, acX + 12, acY - liftLen / 2);
            }

            // Draw Drag Arrow (Rightward/Backward, red)
            if (dragLen > 2) {
                wtCtx.strokeStyle = 'rgba(255, 71, 87, 0.95)';
                wtCtx.fillStyle = 'rgba(255, 71, 87, 0.95)';
                wtCtx.lineWidth = 3.5;

                wtCtx.beginPath();
                wtCtx.moveTo(acX, acY);
                wtCtx.lineTo(acX + dragLen, acY);
                wtCtx.stroke();

                // Arrowhead
                wtCtx.beginPath();
                wtCtx.moveTo(acX + dragLen - 7, acY - 6);
                wtCtx.lineTo(acX + dragLen, acY);
                wtCtx.lineTo(acX + dragLen - 7, acY + 6);
                wtCtx.fill();

                // Label
                wtCtx.font = 'bold 9px Orbitron';
                wtCtx.fillText(`DRAG: ${Math.round(state.drag)}N`, acX + dragLen / 2 - 15, acY + 16);
            }

            requestAnimationFrame(drawWindTunnel);
        }

        // Real-time graph curve visualizer (CL vs AoA)
        function drawClCurve() {
            clCtx.clearRect(0, 0, clCanvas.width, clCanvas.height);

            const width = clCanvas.width;
            const height = clCanvas.height;
            const padding = 25;

            // X-axis mapping: -8 to 22 degrees
            const minAoA = -8;
            const maxAoA = 22;
            function getCanvasX(aoa) {
                return padding + ((aoa - minAoA) / (maxAoA - minAoA)) * (width - 2 * padding);
            }

            // Y-axis mapping: -1.0 to 2.2 CL
            const minCl = -0.8;
            const maxCl = 2.0;
            function getCanvasY(cl) {
                return height - padding - ((cl - minCl) / (maxCl - minCl)) * (height - 2 * padding);
            }

            // 1. Draw Grid Lines & Axes
            clCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            clCtx.lineWidth = 1;

            // Vertical division lines
            for (let a = -5; a <= 20; a += 5) {
                let gx = getCanvasX(a);
                clCtx.beginPath();
                clCtx.moveTo(gx, padding);
                clCtx.lineTo(gx, height - padding);
                clCtx.stroke();

                // X-axis label
                clCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                clCtx.font = '8px Fira Code';
                clCtx.textAlign = 'center';
                clCtx.fillText(`${a}°`, gx, height - padding + 12);
            }

            // Horizontal division lines
            for (let c = -0.5; c <= 1.5; c += 0.5) {
                let gy = getCanvasY(c);
                clCtx.beginPath();
                clCtx.moveTo(padding, gy);
                clCtx.lineTo(width - padding, gy);
                clCtx.stroke();

                // Y-axis label
                clCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                clCtx.font = '8px Fira Code';
                clCtx.textAlign = 'right';
                clCtx.fillText(`${c}`, padding - 4, gy + 3);
            }

            // Zero reference lines
            clCtx.strokeStyle = 'rgba(0, 210, 255, 0.15)';
            clCtx.lineWidth = 1.5;
            // AoA = 0 reference
            clCtx.beginPath();
            clCtx.moveTo(getCanvasX(0), padding);
            clCtx.lineTo(getCanvasX(0), height - padding);
            clCtx.stroke();
            // CL = 0 reference
            clCtx.beginPath();
            clCtx.moveTo(padding, getCanvasY(0));
            clCtx.lineTo(width - padding, getCanvasY(0));
            clCtx.stroke();

            // 2. Draw the Cl Curve over full AoA envelope
            clCtx.beginPath();
            clCtx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
            clCtx.lineWidth = 2.5;

            let first = true;
            for (let a = -8; a <= 22; a += 0.5) {
                let res = solveAerodynamics(a, state.velocity, state.airfoil);
                let cx = getCanvasX(a);
                let cy = getCanvasY(res.cl);

                if (first) {
                    clCtx.moveTo(cx, cy);
                    first = false;
                } else {
                    clCtx.lineTo(cx, cy);
                }
            }
            clCtx.stroke();

            // 3. Highlight Stall Region (Draw transparent red rectangle over AoA > stall limit)
            let limitAoA = state.airfoil === 'naca0012' ? 14 : (state.airfoil === 'naca4412' ? 16 : 17);
            let stallX = getCanvasX(limitAoA);
            clCtx.fillStyle = 'rgba(255, 71, 87, 0.06)';
            clCtx.fillRect(stallX, padding, width - padding - stallX, height - 2 * padding);

            // 4. Draw Current Dynamic State Cursor Indicator Dot
            let currentX = getCanvasX(state.aoa);
            let currentY = getCanvasY(state.cl);

            clCtx.shadowBlur = 12;
            clCtx.shadowColor = state.isStalled ? '#ff4757' : '#00d2ff';
            clCtx.fillStyle = state.isStalled ? '#ff4757' : '#00d2ff';

            clCtx.beginPath();
            clCtx.arc(currentX, currentY, 5.5, 0, 2 * Math.PI);
            clCtx.fill();

            // Reset shadows
            clCtx.shadowBlur = 0;

            // Draw dot text label
            clCtx.fillStyle = '#fff';
            clCtx.font = 'bold 9px Orbitron';
            clCtx.textAlign = 'left';
            clCtx.fillText(`AoA: ${state.aoa}°`, currentX + 8, currentY - 5);
        }

        // Live HUD numbers readout updates
        function updateTelemetryUI() {
            let res = solveAerodynamics(state.aoa, state.velocity, state.airfoil);
            
            state.cl = res.cl;
            state.cd = res.cd;
            state.lift = res.lift;
            state.drag = res.drag;
            state.ldRatio = res.ldRatio;
            state.isStalled = res.isStalled;

            // Update digital gauge displays
            clVal.textContent = state.cl.toFixed(2);
            ldVal.textContent = state.ldRatio.toFixed(1);
            liftVal.textContent = `${state.lift.toFixed(1)} N`;
            dragVal.textContent = `${state.drag.toFixed(1)} N`;

            hudAlphaVal.textContent = `AoA: ${state.aoa.toFixed(2)}°`;

            // Stall UI triggers
            if (state.isStalled) {
                stallWarning.classList.remove('hidden');
                clVal.style.color = '#ff4757';
                liftVal.style.color = '#ff4757';
            } else {
                stallWarning.classList.add('hidden');
                clVal.style.color = '';
                liftVal.style.color = '';
            }

            drawClCurve();
        }

        // Attach Event Listeners
        aoaSlider.addEventListener('input', (e) => {
            state.aoa = parseFloat(e.target.value);
            aoaSliderVal.textContent = `${state.aoa.toFixed(1)}°`;
            updateTelemetryUI();
        });

        velocitySlider.addEventListener('input', (e) => {
            state.velocity = parseFloat(e.target.value);
            velocitySliderVal.textContent = `${state.velocity} kts`;
            updateTelemetryUI();
        });

        airfoilSelect.addEventListener('change', (e) => {
            state.airfoil = e.target.value;
            updateTelemetryUI();
        });

        // Initialize HUD & Start loops
        updateTelemetryUI();
        drawWindTunnel();
    }
});

