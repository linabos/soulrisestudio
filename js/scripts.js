/*!
* Start Bootstrap - Business Casual v7.0.9 (https://startbootstrap.com/theme/business-casual)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
*/
// Highlights current date on contact page
window.addEventListener('DOMContentLoaded', event => {
    const listHoursArray = document.body.querySelectorAll('.list-hours li');
    if (listHoursArray.length > 0) {
        listHoursArray[new Date().getDay()].classList.add(('today'));
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Hover dropdown functionality
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdown && dropdownToggle && dropdownMenu) {
        // Prevent default click behavior on dropdown toggle
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            // Still allow navigation to #services if clicked
            const target = document.querySelector('#services');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Show dropdown on hover
        dropdown.addEventListener('mouseenter', function () {
            dropdownMenu.classList.add('show');
        });
        
        // Hide dropdown when leaving the entire dropdown area
        dropdown.addEventListener('mouseleave', function () {
            dropdownMenu.classList.remove('show');
        });
    }
    
})


// Function to display Instagram posts
function displayInstagramPosts(posts, container) {
    container.innerHTML = '';
    
    posts.forEach((post, index) => {
        const postHTML = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="instagram-post bg-white rounded overflow-hidden shadow position-relative" style="border: 1px solid #dbdbdb;">
                    <a href="https://instagram.com/lina.with.love" target="_blank" class="text-decoration-none">
                        <div class="instagram-img-container" style="height: 250px; width: 100%; background: ${post.gradient}; display: flex; align-items: center; justify-content: center; color: white; text-align: center; position: relative; background-size: cover; background-position: center;">
                            <div class="overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(131, 58, 180, 0.8), rgba(253, 29, 29, 0.8), rgba(252, 176, 69, 0.8)); display: flex; align-items: center; justify-content: center;">
                                <div class="text-center">
                                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${post.icon}</div>
                                    <p class="mb-1 fw-bold" style="font-size: 0.9rem;">@lina.with.love</p>
                                    <p class="mb-0 small opacity-75">${post.caption}</p>
                                </div>
                            </div>
                        </div>
                        <div class="p-3" style="background: white;">
                            <div class="d-flex align-items-center mb-2">
                                <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; font-size: 0.8rem; color: white;">
                                    L
                                </div>
                                <span class="ms-2 fw-bold text-dark" style="font-size: 0.9rem;">lina.with.love</span>
                                <div class="ms-auto">
                                    <i class="fab fa-instagram text-primary"></i>
                                </div>
                            </div>
                            <p class="mb-2 text-dark" style="font-size: 0.85rem;">${post.description}</p>
                            <div class="d-flex align-items-center text-muted" style="font-size: 0.75rem;">
                                <i class="far fa-heart me-1"></i>
                                <span class="me-3">${Math.floor(Math.random() * 50) + 20}</span>
                                <i class="far fa-comment me-1"></i>
                                <span class="me-3">${Math.floor(Math.random() * 10) + 2}</span>
                                <span class="ms-auto">${post.timeAgo}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        `;
        container.innerHTML += postHTML;
    });
    
    console.log('Instagram feed loaded successfully with @lina.with.love posts!');
}