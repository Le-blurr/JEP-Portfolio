document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', e => {
        cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-active');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-active');
    });

    const mainContent = document.querySelector('main');
    const pages = document.querySelectorAll('.page');
    const pageCount = pages.length;
    let currentPage = 0;
    let isTransitioning = false; // Flag to track if a transition is in progress
    let startX = 0;
    let startY = 0;
    let isSwiping = false; // Flag to detect if user is swiping

    // Function to handle page transition
    const transitionToPage = (pageIndex) => {
        if (pageIndex >= 0 && pageIndex < pageCount && !isTransitioning) {
            currentPage = pageIndex;
            isTransitioning = true;
            mainContent.style.transform = `translateX(-${currentPage * 100}vw)`;

            // Reset isTransitioning flag after transition animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 1000); // Adjust this timeout to match your transition duration
        }
    };

    // Scroll event listener for page transitions (desktop)
    document.addEventListener('wheel', e => {
        if (e.deltaY > 0) {
            // Scroll down: transition to next page
            transitionToPage(currentPage + 1);
        } else if (e.deltaY < 0) {
            // Scroll up: transition to previous page
            transitionToPage(currentPage - 1);
        }
    });

    // Touch event listeners for horizontal swipe (mobile)
    mainContent.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = false;
    });

    mainContent.addEventListener('touchmove', e => {
        if (!startX || !startY) {
            return;
        }

        const endX = e.touches[0].clientX;
        const endY = e.touches[0].clientY;

        const diffX = startX - endX;
        const diffY = startY - endY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe detected
            e.preventDefault(); // Prevent vertical scrolling
            isSwiping = true;
            if (diffX > 0) {
                // Swipe left: transition to next page
                transitionToPage(currentPage + 1);
            } else {
                // Swipe right: transition to previous page
                transitionToPage(currentPage - 1);
            }
        }
    });

    mainContent.addEventListener('touchend', () => {
        if (isSwiping) {
            startX = 0;
            startY = 0;
            isSwiping = false;
        }
    });

    // Gallery lightbox functionality (unchanged)
    const galleryImages = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');

    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = image.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', e => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    });

    // Keyboard navigation for gallery lightbox (next and previous image) (unchanged)
    document.addEventListener('keydown', e => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                // Add logic to show the next image
            } else if (e.key === 'ArrowLeft') {
                // Add logic to show the previous image
            }
        }
    });
});
