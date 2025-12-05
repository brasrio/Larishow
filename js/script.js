/**
 * ============================================
 * LARISSA FREDERICO - LINK IN BIO
 * Mundo Colorido e Louco 🌈
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Initialize all app features
 */
function initializeApp() {
    addLoadingAnimation();
    initializeImageFallback();
    initializeClickEffects();
    initializeVisibilityAnimations();
    createFlyingEmojis();
    continuouslySpawnEmojis();
}

/**
 * Add loading animation when page loads
 */
function addLoadingAnimation() {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    
    requestAnimationFrame(() => {
        container.style.transition = 'opacity 0.6s ease-out';
        container.style.opacity = '1';
    });
}

/**
 * Handle image loading errors with fallback
 */
function initializeImageFallback() {
    const images = document.querySelectorAll('.profile-img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a colorful placeholder if image fails to load
            this.style.background = 'linear-gradient(135deg, #FF69B4, #BA55D3, #9B59B6)';
            this.alt = 'Larissa Frederico';
            
            // Create initials overlay
            const wrapper = this.parentElement;
            const initials = document.createElement('span');
            initials.textContent = 'LF';
            initials.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 2rem;
                font-weight: bold;
                color: white;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                font-family: 'Fredoka', sans-serif;
            `;
            wrapper.appendChild(initials);
        });
        
        // Add load event for smooth image appearance
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease-out';
        });
    });
}

/**
 * Create many flying emojis that appear all at once and move randomly
 */
function createFlyingEmojis() {
    const container = document.getElementById('emojiContainer');
    const emojis = ['🦋', '✨', '💖', '🌈', '🧚‍♀️', '⭐', '💫', '🌟', '🎀', '💜', '🩷', '🦄', '🔮', '🪷', '🌸', '💕', '🫧', '🎠', '👽', '🌺', '💗', '🪻', '🌷'];
    const emojiCount = 50; // Muitos emojis!
    
    // Criar todos os emojis de uma vez
    for (let i = 0; i < emojiCount; i++) {
        createRandomFlyingEmoji(container, emojis);
    }
}

/**
 * Create a single emoji with truly random movement
 */
function createRandomFlyingEmoji(container, emojis) {
    const emoji = document.createElement('div');
    emoji.className = 'flying-emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Posição inicial aleatória
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    // Tamanho aleatório
    const size = Math.random() * 1.2 + 0.8; // 0.8rem a 2rem
    
    emoji.style.cssText = `
        position: absolute;
        left: ${startX}%;
        top: ${startY}%;
        font-size: ${size}rem;
        opacity: ${Math.random() * 0.4 + 0.5};
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
        z-index: 0;
        pointer-events: none;
        transition: none;
    `;
    
    container.appendChild(emoji);
    
    // Iniciar movimento aleatório individual
    animateEmojiRandomly(emoji);
}

/**
 * Animate a single emoji with random movement
 */
function animateEmojiRandomly(emoji) {
    // Velocidade aleatória para cada emoji
    const speedX = (Math.random() - 0.5) * 4; // -2 a 2
    const speedY = (Math.random() - 0.5) * 4; // -2 a 2
    const rotationSpeed = (Math.random() - 0.5) * 6; // Rotação aleatória
    
    let posX = parseFloat(emoji.style.left);
    let posY = parseFloat(emoji.style.top);
    let rotation = 0;
    let dirX = speedX;
    let dirY = speedY;
    
    // Mudança de direção aleatória periodicamente
    const changeDirectionInterval = setInterval(() => {
        dirX = (Math.random() - 0.5) * 4;
        dirY = (Math.random() - 0.5) * 4;
    }, Math.random() * 3000 + 2000); // Muda direção a cada 2-5 segundos
    
    function move() {
        posX += dirX * 0.1;
        posY += dirY * 0.1;
        rotation += rotationSpeed;
        
        // Bounce nas bordas
        if (posX <= 0 || posX >= 95) {
            dirX *= -1;
            posX = Math.max(0, Math.min(95, posX));
        }
        if (posY <= 0 || posY >= 95) {
            dirY *= -1;
            posY = Math.max(0, Math.min(95, posY));
        }
        
        emoji.style.left = `${posX}%`;
        emoji.style.top = `${posY}%`;
        emoji.style.transform = `rotate(${rotation}deg)`;
        
        requestAnimationFrame(move);
    }
    
    move();
}

/**
 * Continuously spawn new emojis (disabled - all appear at once)
 */
function continuouslySpawnEmojis() {
    // Não adiciona mais emojis - todos aparecem de uma vez
}

/**
 * Add click/touch effects on buttons
 */
function initializeClickEffects() {
    const buttons = document.querySelectorAll('.link-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            createRipple(e, this);
            
            // Add sparkle burst
            createSparkleBurst(e);
            
            // Track click for analytics (can be extended)
            trackClick(this);
        });
        
        // Add hover sound effect indicator (visual)
        button.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

/**
 * Create ripple effect on click
 */
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out forwards;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

/**
 * Create sparkle burst effect on click
 */
function createSparkleBurst(event) {
    const sparkles = ['✨', '💖', '🌟', '⭐', '💫', '🦋', '🌈', '💜', '🩷', '🧚‍♀️'];
    const count = 15;
    
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('span');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            font-size: ${Math.random() * 15 + 18}px;
            pointer-events: none;
            z-index: 9999;
            animation: sparkleBurst 1.2s ease-out forwards;
            --angle: ${(360 / count) * i}deg;
            --distance: ${Math.random() * 80 + 60}px;
        `;
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1200);
    }
}

/**
 * Initialize visibility animations using Intersection Observer
 */
function initializeVisibilityAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.link-button, .bio-section').forEach(el => {
        observer.observe(el);
    });
}


/**
 * Track link clicks (placeholder for analytics)
 */
function trackClick(element) {
    const platform = element.classList.contains('tiktok') ? 'TikTok' :
                     element.classList.contains('instagram') ? 'Instagram' :
                     element.classList.contains('facebook') ? 'Facebook' : 'Unknown';
    
    console.log(`🔗 Link clicked: ${platform}`);
    
    // You can integrate with analytics services here
    // Example: gtag('event', 'click', { 'event_category': 'social_link', 'event_label': platform });
}

/**
 * Add CSS animations dynamically
 */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes sparkleBurst {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
            ) scale(0) rotate(720deg);
            opacity: 0;
        }
    }
    
    
    .visible {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(styleSheet);

/**
 * Easter egg: Konami code
 */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateRainbowMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

/**
 * Rainbow mode easter egg
 */
function activateRainbowMode() {
    document.body.style.animation = 'none';
    document.body.style.background = `
        linear-gradient(135deg, 
            #FF6B6B 0%, 
            #FF8E53 14%, 
            #FFD93D 28%, 
            #6BCB77 42%, 
            #4D96FF 57%, 
            #9B59B6 71%, 
            #FF6B6B 85%,
            #FF8E53 100%
        )
    `;
    document.body.style.backgroundSize = '400% 400%';
    
    requestAnimationFrame(() => {
        document.body.style.animation = 'rainbowMode 3s ease infinite';
    });
    
    // Add extra sparkles
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFloatingEmoji(['🌈', '✨', '🦄', '💖', '🧚‍♀️'][Math.floor(Math.random() * 5)]);
        }, i * 100);
    }
    
    console.log('🌈 Rainbow mode activated! 🦄');
}

// Add rainbow mode animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbowMode {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(rainbowStyle);

// Log welcome message
console.log('%c🧚‍♀️ Bem vindos ao mundo colorido da Larissa! 🌈', 'font-size: 16px; color: #FF69B4; font-weight: bold;');
console.log('%cDica: Tente o Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 12px; color: #BA55D3;');

