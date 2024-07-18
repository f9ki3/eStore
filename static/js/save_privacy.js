$(document).ready(function(){
    $('#save_username, #save_password').click(function() {
        // console.log('click!')
        var usernameText = $('#account_username_input').val();
        var passwordText = $('#account_password_input').val();

        var formData = new FormData();
        formData.append('username', usernameText);
        formData.append('pasword', passwordText);

        // Ajax request
        $.ajax({
            url: '/update_privacy', // Replace with your server endpoint
            type: 'POST',
            data: formData,
            processData: false,  // Important: prevent jQuery from processing the data
            contentType: false,  // Important: let jQuery set the content type
            success: function(response) {
                // Handle success response
                $('#account_username').text(aboutText); // Update about field
                $('#username_data').hide(); // Hide the input and buttons after saving
                $('#account_username').show(); // Show the paragraph with the updated text

                showAlert('Updated Success', 'warning'); // Show alert for success
                console.log(response)
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error('Error:', error);
            }
        });
    });
});