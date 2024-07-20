$(document).ready(function() {
    $('#save_profile, #save_fullname, #save_address, #save_email, #save_contact').click(function() {
        // console.log('click!')
        var aboutText = $('#account_about_input').val();
        var firstnameText = $('#account_firstname_input').val();
        var lastnameText = $('#account_lastname_input').val();
        var addressText = $('#account_address_input').val();
        var emailText = $('#account_email_input').val();
        var contactText = $('#account_contact_input').val();
        
        // Create FormData object
        var formData = new FormData();
        formData.append('about', aboutText);
        formData.append('firstname', firstnameText);
        formData.append('lastname', lastnameText);
        formData.append('address', addressText);
        formData.append('email', emailText);
        formData.append('contact', contactText);

        // Ajax request
        $.ajax({
            url: '/update_about', // Replacep with your server endpoint
            type: 'POST',
            data: formData,
            processData: false,  // Important: prevent jQuery from processing the data
            contentType: false,  // Important: let jQuery set the content type
            success: function(response) {
                // Handle success response
                $('#account_about').text(aboutText); // Update about field
                $('#about_data').hide(); // Hide the input and buttons after saving
                $('#account_about').show(); // Show the paragraph with the updated text

                $('#account_fullname').text(firstnameText + ' ' + lastnameText); // Update fullname field
                $('#fullname_data').hide(); // Hide the input and buttons after saving
                $('#account_fullname').show(); // Show the paragraph with the updated text

                $('#account_address').text(addressText); // Update address field
                $('#address_data').hide(); // Hide the input and buttons after saving
                $('#account_address').show(); // Show the paragraph with the updated text

                $('#account_email').text(emailText); // Update email field
                $('#email_data').hide(); // Hide the input and buttons after saving
                $('#account_email').show(); // Show the paragraph with the updated text

                $('#account_contact').text(contactText); // Update contact field
                $('#contact_data').hide(); // Hide the input and buttons after saving
                $('#account_contact').show(); // Show the paragraph with the updated text

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



