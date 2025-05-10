document.addEventListener('DOMContentLoaded', function() {
    // Close alert boxes
    document.querySelectorAll('.alert .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.alert').style.display = 'none';
        });
    });
});