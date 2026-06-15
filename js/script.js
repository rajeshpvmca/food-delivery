document.addEventListener('DOMContentLoaded', function() {
    // Load Header
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setActiveNavLink(); // Apply the active state to the menu
            initHeaderScroll(); // Initialize scroll effect after loading
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Preloader Logic
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => preloader.remove(), 600);
            }, 2500); // 2.5 seconds delay added here
        }
    });
});

function setActiveNavLink() {
    // Get current page name (e.g., 'index.html' or empty for root)
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active'); // Clear any existing active class first
        
        const href = link.getAttribute('href');
        
        // Only add active if it matches the current filename or root index
        if (href === page || (page === 'index.html' && (href === './' || href === 'index.html'))) {
            link.classList.add('active');
        }
    });
}

function initMenuFilter() {
    const filterBtns = document.querySelectorAll('.btn-filter');
    const menuItems = document.querySelectorAll('.menu-item-wrap');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.classList.add('aos-animate');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function initHeaderScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('header-scrolled');
        } else {
            navbar.classList.remove('header-scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', initMenuFilter);

new Swiper(".testimonialSlider", {

    loop:true,

    autoplay:{
        delay:4000,
        disableOnInteraction:false,
    },

    speed:1200,

    pagination:{
        el:".swiper-pagination",
        clickable:true,
    }

});

new Swiper(".brandSlider", {
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    speed: 1000,
    slidesPerView: 2,
    spaceBetween: 30,
    breakpoints: {
        576: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 5,
        }
    }
});

const galleryModal = document.getElementById('galleryModal');

galleryModal.addEventListener('show.bs.modal', function (event) {

    const button = event.relatedTarget;

    const imageSrc = button.getAttribute('data-src');

    document.getElementById('galleryModalImg').src = imageSrc;

});