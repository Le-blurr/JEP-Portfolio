document.addEventListener('DOMContentLoaded', () => {
    const welcomeContainer = document.querySelector('.welcome-container');
    const welcomeText = document.querySelector('.welcome-text');
    const transitionLink = document.querySelector('.transition-link');

    // Initial animation for welcome text
    setTimeout(() => {
        welcomeText.style.opacity = '1';
        transitionLink.style.opacity = '1';
    }, 1500);

    // Click event listener for the transition link
    transitionLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        welcomeContainer.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to index.html after fade-out
        }, 1000); // Timeout to match fade-out animation
    });

    // Function to update spotlight position
    function updateSpotlightPosition(x, y) {
        const spotlight = document.querySelector('.spotlight');
        spotlight.style.setProperty('--cursor-x', x + 'px');
        spotlight.style.setProperty('--cursor-y', y + 'px');
    }

    // Mouse move event for desktop
    document.addEventListener('mousemove', (e) => {
        updateSpotlightPosition(e.clientX, e.clientY);
    });

    // Touch move event for mobile
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        updateSpotlightPosition(touch.clientX, touch.clientY);
    });
});
