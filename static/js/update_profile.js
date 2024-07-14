$(document).ready(function() {
    $('#save_about').click(function() {
        var aboutText = $('#account_about_input').val();
        
        // Create FormData object
        var formData = new FormData();
        formData.append('about', aboutText);

        // Ajax request
        $.ajax({
            url: '/update_about', // Replace with your server endpoint
            type: 'POST',
            data: formData,
            processData: false,  // Important: prevent jQuery from processing the data
            contentType: false,  // Important: let jQuery set the content type
            success: function(response) {
                // Handle success response
                $('#account_about').text(aboutText); // Update displayed text on success
                $('#about_data').hide(); // Hide the input and buttons after saving
                $('#account_about').show(); // Show the paragraph with the updated text
                showAlert('Update Success', 'warning')
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error('Error:', error);
            }
        });
    });

});