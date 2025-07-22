// $(window).scroll(function () {
//     if ($(window).scrollTop() >= $('#topbar').outerHeight()) {
//         $('#navbar').addClass('sticky');
//     } else {
//         $('#navbar').removeClass('sticky');
//     }
// });

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    const stickyOffset = 100; // Adjust based on how far it should scroll

    if (window.scrollY >= stickyOffset) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Menu filtering functionality
document.addEventListener('DOMContentLoaded', function () {
    let menuData = [];

    // Load menu data from JSON file
    fetch('./data/menu-items.json')
        .then(response => response.json())
        .then(data => {
            menuData = data;
            // Initial render after data is loaded
            renderMenuItems(menuData);
        })
        .catch(error => {
            console.error('Error loading menu data:', error);
        });

    function renderMenuItems(items) {
        const menuContainer = document.querySelector('.menu .card');
        const menuHeader = menuContainer.querySelector('.card-header');

        // Clear existing content except header
        menuContainer.innerHTML = '';
        menuContainer.appendChild(menuHeader);

        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'card mb-3';
            menuItem.style.maxWidth = '540px';
            menuItem.innerHTML = `
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${item['image-url']}" class="img-fluid rounded-start" alt="${item.name}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p class="card-text description">${item.desc}</p>
                                    <p class="card-text fw-bold text-primary">${item.price}</p>
                                </div>
                            </div>
                        </div>
                    `;
            menuContainer.appendChild(menuItem);
        });
    }

    // Filter functionality
    const filterLinks = document.querySelectorAll('.menu .nav-link');
    filterLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            filterLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            const filter = this.getAttribute('href').substring(1);

            if (filter === 'all') {
                renderMenuItems(menuData);
            } else {
                const filteredItems = menuData.filter(item => item.type === filter);
                renderMenuItems(filteredItems);
            }
        });
    });
});