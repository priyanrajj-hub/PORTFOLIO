"use strict";

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 01. HTML5 Canvas Neural Engine Execution Context ---
    const canvas = document.getElementById('cyberCanvas');
    const ctx = canvas.getContext('2d', { alpha: false });

    let nodeArray = [];
    const maxConnectionDistance = 140;
    const targetNodeDensityCount = 60;

    function fitEngineViewportBounds() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', () => {
        fitEngineViewportBounds();
        rebootNeuralClusterGrid();
    });
    fitEngineViewportBounds();

    class MainframeNode {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.2 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
        }
        computePhysicsVector() {
            this.x += this.vx; this.y += this.vy;
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
        for (let a = 0; a < nodesCount; a++) {
            for (let b = a + 1; b < nodesCount; b++) {
                const dx = nodeArray[a].x - nodeArray[b].x;
                const dy = nodeArray[a].y - nodeArray[b].y;
                const distSq = (dx * dx) + (dy * dy);

                if (distSq < maxConnectionDistance * maxConnectionDistance) {
                    const linearAlpha = 1 - (Math.sqrt(distSq) / maxConnectionDistance);
                    ctx.strokeStyle = `rgba(33, 38, 45, ${linearAlpha * 0.55})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(nodeArray[a].x, nodeArray[a].y);
                    ctx.lineTo(nodeArray[b].x, nodeArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function coreRenderEngineLoop() {
        ctx.fillStyle = '#0a0e14';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < nodeArray.length; i++) {
            nodeArray[i].computePhysicsVector();
            nodeArray[i].renderNodeDot();
        }
        traceNeuralIntersections();
        requestAnimationFrame(coreRenderEngineLoop);
    }
    rebootNeuralClusterGrid();
    coreRenderEngineLoop();

    // --- 02. Fluid Pointer Glow Engine tracking mouse interactions ---
    const mouseGlowElement = document.getElementById('mouseGlow');
    window.addEventListener('mousemove', (e) => {
        mouseGlowElement.style.left = `${e.clientX}px`;
        mouseGlowElement.style.top = `${e.clientY}px`;
    }, { passive: true });

    // --- 03. Terminal Typewriter Logic Modules strings ---
    const typewriterTargetField = document.getElementById('typewriterText');
    const logDataStringsArray = [
        "AI & Data Science Enthusiast | Builder | Researcher",
        "Initializing secure mainframe node dependencies...",
        "Current Status: Active Member // System Integrity: Nominal"
    ];
    let activeStringIndex = 0, currentCharacterIndex = 0, isDeletingStateActive = false;

    function executeTypewriterLifecycleLoop() {
        const fullStringText = logDataStringsArray[activeStringIndex];
        if (!isDeletingStateActive) {
            typewriterTargetField.textContent = fullStringText.substring(0, currentCharacterIndex + 1);
            currentCharacterIndex++;
            if (currentCharacterIndex === fullStringText.length) {
                isDeletingStateActive = true;
                setTimeout(executeTypewriterLifecycleLoop, 2000);
            } else { setTimeout(executeTypewriterLifecycleLoop, 50); }
        } else {
            typewriterTargetField.textContent = fullStringText.substring(0, currentCharacterIndex - 1);
            currentCharacterIndex--;
            if (currentCharacterIndex === 0) {
                isDeletingStateActive = false;
                activeStringIndex = (activeStringIndex + 1) % logDataStringsArray.length;
                setTimeout(executeTypewriterLifecycleLoop, 400);
            } else { setTimeout(executeTypewriterLifecycleLoop, 25); }
        }
    }
    setTimeout(executeTypewriterLifecycleLoop, 800);

    // --- 04. Identity Text Scramble Grid string animations ---
    const targetNameHeadingNode = document.getElementById('matrixName');
    const cryptographicGlyphsToken = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let scrambleIntervalTrackerInstance = null;

    function runIdentityScrambleSequence() {
        const standardLiteralValue = targetNameHeadingNode.dataset.text;
        let runningIterationCount = 0;
        clearInterval(scrambleIntervalTrackerInstance);
        scrambleIntervalTrackerInstance = setInterval(() => {
            targetNameHeadingNode.innerText = standardLiteralValue.split("").map((character, index) => {
                if (index < runningIterationCount) return standardLiteralValue[index];
                return cryptographicGlyphsToken[Math.floor(Math.random() * cryptographicGlyphsToken.length)];
            }).join("");
            if (runningIterationCount >= standardLiteralValue.length) clearInterval(scrambleIntervalTrackerInstance);
            runningIterationCount += 1 / 3;
        }, 30);
    }
    targetNameHeadingNode.addEventListener('mouseenter', runIdentityScrambleSequence);

    // --- 05. Intersection Scroll Reveal engines transitions ---
    const revealNodeTargetsList = document.querySelectorAll('.reveal-node');
    const viewportScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, { threshold: 0.05 });
    revealNodeTargetsList.forEach(target => viewportScrollObserver.observe(target));
});
