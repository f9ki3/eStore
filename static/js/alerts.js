function showAlert(message, type) {
    // Create the alert div element
    var alertDiv = $('<div class="alert alert-'+ type +' alert-dismissible fade show" role="alert">' +
                    message +
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                    '</div>');

    // Append the alert to the body (or any other container)
    $('body').append(alertDiv);

    // Style the alert div
    alertDiv.css({
        'position': 'fixed',
        'top': '90px',
        'right': '-300px', // Start position outside the view to the right
        'z-index': '9999'  // Adjust z-index as needed
    });

    // Slide in from right to left and fade out after 3 seconds
    alertDiv.animate({ 'right': '20px' }, 100, function() {
        // Animation complete
        // Fade out after 3 seconds
        $(this).delay(3000).fadeOut(500, function() {
            $(this).remove(); // Remove the alert after fading out
        });
    });
}