/**
 * ==========================================================================
 * Priyanraj J | Interactive Mainframe Script Engine Core
 * Architecture: Optimized Vanishing Vector Arrays & Performance Node Clusters
 * ==========================================================================
 */

"use strict";

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 01. HARDWARE-ACCELERATED HTML5 CANVASES NEURAL ENGINE ---
    const canvas = document.getElementById('cyberCanvas');
    const ctx = canvas.getContext('2d', { alpha: false }); // Disable transparency layer for memory optimization

    let nodeArray = [];
    let animationFrameId = null;
    const maxConnectionDistance = 140;
    const targetNodeDensityCount = 60;

    // Viewport Scaler Configuration Mapping
    function fitEngineViewportBounds() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Low-overhead debouncer rule matching resize events
    let resizeDebounceTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeDebounceTimeout);
        resizeDebounceTimeout = setTimeout(() => {
            fitEngineViewportBounds();
            rebootNeuralClusterGrid();
        }, 150);
    });
    fitEngineViewportBounds();

    // Data-Structure Model Tracking Physics Properties
    class MainframeNode {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.2 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
        }
        computePhysicsVector() {
            this.x += this.vx;
            this.y += this.vy;

            // Boundary Collisions Check Logic Loop
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        renderNodeDot() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(88, 166, 255, 0.25)';
            ctx.fill();
        }
    }

    function rebootNeuralClusterGrid() {
        nodeArray = [];
        for (let i = 0; i < targetNodeDensityCount; i++) {
            nodeArray.push(new MainframeNode());
        }
    }

    function traceNeuralIntersections() {
        const nodesCount = nodeArray.length;
        const maxDistSq = maxConnectionDistance * maxConnectionDistance;

        for (let a = 0; a < nodesCount; a++) {
            const nodeA = nodeArray[a];
            for (let b = a + 1; b < nodesCount; b++) {
                const nodeB = nodeArray[b];
                
                // Fast distance approximation checking before Math.sqrt execution
                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const distSq = (dx * dx) + (dy * dy);

                if (distSq < maxDistSq) {
                    const linearAlpha = 1 - (Math.sqrt(distSq) / maxConnectionDistance);
                    ctx.strokeStyle = `rgba(33, 38, 45, ${linearAlpha * 0.55})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(nodeA.x, nodeA.y);
                    ctx.lineTo(nodeB.x, nodeB.y);
                    ctx.stroke();
                }
            }
        }
    }

    function coreRenderEngineLoop() {
        ctx.fillStyle = '#05070a'; // Matches your precise CSS background hex token
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const nodesCount = nodeArray.length;
        for (let i = 0; i < nodesCount; i++) {
            nodeArray[i].computePhysicsVector();
            nodeArray[i].renderNodeDot();
        }
        
        traceNeuralIntersections();
        animationFrameId = requestAnimationFrame(coreRenderEngineLoop);
    }

    rebootNeuralClusterGrid();
    coreRenderEngineLoop();


    // --- 02. FLUID POINTER GLOW INTERACTIVE TRACKER ---
    const mouseGlowElement = document.getElementById('mouseGlow');
    window.addEventListener('mousemove', (e) => {
        mouseGlowElement.style.left = `${e.clientX}px`;
        mouseGlowElement.style.top = `${e.clientY}px`;
    }, { passive: true }); // Passivity optimization flags for frame performance


    // --- 03. HIGH-FIDELITY MATRIX LOG TYPEWRITER ENGINE ---
    const typewriterTargetField = document.getElementById('typewriterText');
    const logDataStringsArray = [
        "AI & Data Science Enthusiast | Builder | Researcher",
        "Initializing secure mainframe node dependencies...",
        "Current Status: Active Member // System Integrity: Nominal"
    ];
    let activeStringIndex = 0;
    let currentCharacterIndex = 0;
    let isDeletingStateActive = false;

    function executeTypewriterLifecycleLoop() {
        const fullStringText = logDataStringsArray[activeStringIndex];
        
        if (!isDeletingStateActive) {
            typewriterTargetField.textContent = fullStringText.substring(0, currentCharacterIndex + 1);
            currentCharacterIndex++;
            
            if (currentCharacterIndex === fullStringText.length) {
                isDeletingStateActive = true;
                setTimeout(executeTypewriterLifecycleLoop, 2000); // Terminal visual dwell delay
            } else {
                setTimeout(executeTypewriterLifecycleLoop, 50);
            }
        } else {
            typewriterTargetField.textContent = fullStringText.substring(0, currentCharacterIndex - 1);
            currentCharacterIndex--;
            
            if (currentCharacterIndex === 0) {
                isDeletingStateActive = false;
                activeStringIndex = (activeStringIndex + 1) % logDataStringsArray.length;
                setTimeout(executeTypewriterLifecycleLoop, 400); // Transition buffer delay
            } else {
                setTimeout(executeTypewriterLifecycleLoop, 25);
            }
        }
    }
    setTimeout(executeTypewriterLifecycleLoop, 800);


    // --- 04. REAL-TIME NAME STRING SCRAMBLE MATRIX PROTOCOL ---
    const targetNameHeadingNode = document.getElementById('matrixName');
    const cryptographicGlyphsToken = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let scrambleIntervalTrackerInstance = null;

    function runIdentityScrambleSequence() {
        const standardLiteralValue = targetNameHeadingNode.dataset.text;
        let runningIterationCount = 0;
        
        clearInterval(scrambleIntervalTrackerInstance);
        
        scrambleIntervalTrackerInstance = setInterval(() => {
            targetNameHeadingNode.innerText = standardLiteralValue.split("").map((character, index) => {
                if (index < runningIterationCount) {
                    return standardLiteralValue[index]; // Return correct string value lock
                }
                return cryptographicGlyphsToken[Math.floor(Math.random() * cryptographicGlyphsToken.length)];
            }).join("");
            
            if (runningIterationCount >= standardLiteralValue.length) {
                clearInterval(scrambleIntervalTrackerInstance);
            }
            runningIterationCount += 1 / 3; // Controls progression speed
        }, 30);
    }
    // Triggers beautifully whenever the user inspects or hovers your profile name
    targetNameHeadingNode.addEventListener('mouseenter', runIdentityScrambleSequence);


    // --- 05. HIGH-PERFORMANCE INTERSECTION OBSERVER SCROLL REVEALS ---
    const revealNodeTargetsList = document.querySelectorAll('.reveal-node');
    
    const viewportScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, { threshold: 0.05 });

    revealNodeTargetsList.forEach(targetNode => {
        viewportScrollObserver.observe(targetNode);
    });
});
