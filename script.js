// Mean Girls - Main Script

document.addEventListener('DOMContentLoaded', function() {
    // ===========================================
    // Custom Cursor - Only visible on link hover
    // ===========================================
    const cursor = document.querySelector('.custom-cursor');

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
                cursor.classList.add('visible');
            });

            link.addEventListener('mouseleave', function() {
                cursor.classList.remove('visible');
            });
        });
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
