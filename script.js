document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverables = document.querySelectorAll('a, .cta-button, .feature-card');

    // Update cursor position
    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" }); // Creates a smooth "follow"
    });

    // Animate cursor on hover
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-grow');
        });
        item.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-grow');
        });
    });


    // --- 2. Button Ripple Effect Logic ---
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX;
            const y = e.clientY;
            const buttonRect = e.target.getBoundingClientRect();
            const xInside = x - buttonRect.left;
            const yInside = y - buttonRect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.top = yInside + 'px';
            ripple.style.left = xInside + 'px';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });


    // --- 3. 3D Card Tilt Effect Logic ---
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card center
            const x = e.clientX - cardRect.left - cardRect.width / 2;
            const y = e.clientY - cardRect.top - cardRect.height / 2;

            // Define max rotation (e.g., 15 degrees)
            const maxTilt = 15;

            // Calculate rotation
            // (y / height) gives a value from -0.5 to 0.5. Multiply by maxTilt.
            const rotX = (y / (cardRect.height / 2)) * -maxTilt; // Invert X for natural tilt
            const rotY = (x / (cardRect.width / 2)) * maxTilt;

            // Apply the 3D transform
            card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
            card.style.boxShadow = "0 20px 50px rgba(13, 44, 84, 0.3)";
        });

        // Reset card when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
            card.style.boxShadow = "0 10px 30px rgba(13, 44, 84, 0.1)";
        });
    });

});