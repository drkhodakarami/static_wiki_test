document.addEventListener('DOMContentLoaded', function() {
    // Toggle submenu visibility
    document.querySelectorAll('.menu-item').forEach(item => {
        // Skip menu items that are direct links
        if (!item.querySelector('.arrow')) return;
        
        item.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});