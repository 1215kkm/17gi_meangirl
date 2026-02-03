// Mean Girls - Main Script

document.addEventListener('DOMContentLoaded', function() {
    // ===========================================
    // Custom Cursor - Only visible on link hover
    // ===========================================
    const cursor = document.querySelector('.custom-cursor');
    let cursorDirection = null;

    if (cursor) {
        // Track mouse position
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Show cursor only when hovering over links
        const links = document.querySelectorAll('a, button, .social-card, .view-icon, .show-more, [role="button"]');

        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                cursor.classList.remove('cursor-left', 'cursor-right');
                cursor.classList.add('visible');
            });

            link.addEventListener('mouseleave', function() {
                cursor.classList.remove('visible', 'cursor-left', 'cursor-right');
            });
        });
    }

    // ===========================================
    // Hero Slider with Auto-play (7 seconds)
    // ===========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroTitles = document.querySelectorAll('.hero-title-list li');
    const progressFill = document.querySelector('.hero-progress-fill');
    let currentSlide = 0;
    let slideInterval;
    let progressInterval;
    const slideDuration = 7000; // 7 seconds
    const progressStep = 50; // Update every 50ms

    function updateHeroSlide(index, direction = 'next') {
        // Update slides
        heroSlides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i === index) {
                slide.classList.add('active');
            } else if (direction === 'next' && i === (index - 1 + heroSlides.length) % heroSlides.length) {
                slide.classList.add('prev');
            }
        });

        // Update titles
        heroTitles.forEach((title, i) => {
            title.classList.remove('active');
            if (i === index) {
                title.classList.add('active');
            }
        });
    }

    function startProgress() {
        let progress = 0;
        if (progressFill) {
            progressFill.style.width = '0%';
        }

        progressInterval = setInterval(() => {
            progress += (progressStep / slideDuration) * 100;
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
        }, progressStep);
    }

    function nextSlide() {
        clearInterval(progressInterval);
        currentSlide = (currentSlide + 1) % heroSlides.length;
        updateHeroSlide(currentSlide, 'next');
        startProgress();
    }

    function startAutoSlide() {
        if (heroSlides.length > 0) {
            updateHeroSlide(currentSlide);
            startProgress();
            slideInterval = setInterval(nextSlide, slideDuration);
        }
    }

    // Title click to change slide
    heroTitles.forEach((title, index) => {
        title.addEventListener('click', function() {
            clearInterval(slideInterval);
            clearInterval(progressInterval);
            currentSlide = index;
            updateHeroSlide(currentSlide);
            startProgress();
            slideInterval = setInterval(nextSlide, slideDuration);
        });

        title.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
            clearInterval(progressInterval);
            currentSlide = index;
            updateHeroSlide(currentSlide);
            if (progressFill) {
                progressFill.style.width = '0%';
            }
        });

        title.addEventListener('mouseleave', function() {
            startProgress();
            slideInterval = setInterval(nextSlide, slideDuration);
        });
    });

    startAutoSlide();

    // ===========================================
    // All Films Swiper
    // ===========================================
    const allfilmsSwiperContainer = document.querySelector('.allfilms-swiper');
    let allfilmsSwiper = null;

    if (allfilmsSwiperContainer && typeof Swiper !== 'undefined') {
        allfilmsSwiper = new Swiper('.allfilms-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 6,
            speed: 800,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            grabCursor: false,
            allowTouchMove: true,
        });

        // Navigation areas with arrow cursors
        const prevArea = document.querySelector('.swiper-nav-prev');
        const nextArea = document.querySelector('.swiper-nav-next');

        if (prevArea && cursor) {
            prevArea.addEventListener('mouseenter', function() {
                cursor.classList.add('visible', 'cursor-left');
            });

            prevArea.addEventListener('mouseleave', function() {
                cursor.classList.remove('visible', 'cursor-left');
            });

            prevArea.addEventListener('click', function() {
                allfilmsSwiper.slidePrev();
            });
        }

        if (nextArea && cursor) {
            nextArea.addEventListener('mouseenter', function() {
                cursor.classList.add('visible', 'cursor-right');
            });

            nextArea.addEventListener('mouseleave', function() {
                cursor.classList.remove('visible', 'cursor-right');
            });

            nextArea.addEventListener('click', function() {
                allfilmsSwiper.slideNext();
            });
        }
    }

    // ===========================================
    // View Toggle (Grid/List) for All Films page
    // ===========================================
    const btnGridView = document.getElementById('btn-grid-view');
    const btnListView = document.getElementById('btn-list-view');
    const viewGrid = document.getElementById('view-grid');
    const viewList = document.getElementById('view-list');

    if (btnGridView && btnListView && viewGrid && viewList) {
        btnGridView.addEventListener('click', function() {
            viewGrid.classList.remove('hidden');
            viewList.classList.add('hidden');
        });

        btnListView.addEventListener('click', function() {
            viewGrid.classList.add('hidden');
            viewList.classList.remove('hidden');
        });
    }

    // ===========================================
    // Cursor Follow Image for List View
    // ===========================================
    const cursorImg = document.getElementById('cursor-img');
    const listRows = document.querySelectorAll('.list-row');

    if (cursorImg && listRows.length > 0) {
        listRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                cursorImg.style.opacity = '1';
            });

            row.addEventListener('mouseleave', function() {
                cursorImg.style.opacity = '0';
            });

            row.addEventListener('mousemove', function(e) {
                cursorImg.style.left = (e.clientX + 20) + 'px';
                cursorImg.style.top = (e.clientY - 50) + 'px';
            });
        });
    }

    // ===========================================
    // Film Menu Active State (Film Detail page)
    // ===========================================
    const filmsMenu = document.querySelectorAll('.films-menu li');

    if (filmsMenu.length > 0) {
        filmsMenu.forEach(item => {
            item.addEventListener('click', function() {
                filmsMenu.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ===========================================
    // Smooth Scroll for Navigation
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
