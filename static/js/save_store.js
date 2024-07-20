$(document).ready(function() {

    $('#closeCreateStore, #cancelCreateStore').click(function() {
        $('#storeImage').val('').removeClass('is-valid is-invalid');
        $('#storeName').val('').removeClass('is-valid is-invalid');
        $('#storeOwner').val('').removeClass('is-valid is-invalid');
        $('#storeEmail').val('').removeClass('is-valid is-invalid');
        $('#storeAddress').val('').removeClass('is-valid is-invalid');
        $('#managerFirstname').val('').removeClass('is-valid is-invalid');
        $('#managerLastname').val('').removeClass('is-valid is-invalid');
        $('#managerContact').val('').removeClass('is-valid is-invalid');
        $('#managerEmail').val('').removeClass('is-valid is-invalid');
    });
    

    // You can use the 'state' variable as needed here
    $('#saveStore').click(function() {
        if (state == 0) {
            // Get values of the input fields
            var storeImage = $('#storeImage')[0].files[0];  // Get the file from the input
            var storeName = $('#storeName').val();
            var storeOwner = $('#storeOwner').val();
            var storeEmail = $('#storeEmail').val();
            var storeAddress = $('#storeAddress').val();
            var managerFirstname = $('#managerFirstname').val();
            var managerLastname = $('#managerLastname').val();
            var managerContact = $('#managerContact').val();
            var managerEmail = $('#managerEmail').val();
        
            // Define regex patterns for email and 11-digit number
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var numberPattern = /^\d{11}$/;
        
            // Validate inputs
            function validateInput(selector, value, pattern = null) {
                if (!value || (pattern && !pattern.test(value))) {
                    $(selector).removeClass('is-valid').addClass('is-invalid');
                } else {
                    $(selector).removeClass('is-invalid').addClass('is-valid');
                }
            }
        
            validateInput('#storeImage', storeImage ? 'file selected' : '');
            validateInput('#storeName', storeName);
            validateInput('#storeOwner', storeOwner);
            validateInput('#storeEmail', storeEmail, emailPattern);
            validateInput('#storeAddress', storeAddress);
            validateInput('#managerFirstname', managerFirstname);
            validateInput('#managerLastname', managerLastname);
            validateInput('#managerContact', managerContact, numberPattern);
            validateInput('#managerEmail', managerEmail, emailPattern);
            
            // Check if all inputs are valid
            if ($('.is-invalid').length === 0) {
                // Create a FormData object and append input values
                var formData = new FormData();
                formData.append('storeImage', storeImage);
                formData.append('storeName', storeName);
                formData.append('storeOwner', storeOwner);
                formData.append('storeEmail', storeEmail);
                formData.append('storeAddress', storeAddress);
                formData.append('managerFirstname', managerFirstname);
                formData.append('managerLastname', managerLastname);
                formData.append('managerContact', managerContact);
                formData.append('managerEmail', managerEmail);
        
                // Send the data using Ajax
                $.ajax({
                    url: 'insert_store',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        // Handle the response from the server
                        showAlert('Insert store record!', 'warning');
                        // Clear the values and remove the 'is-valid' class from the specified elements
                        $('#storeImage').val('').removeClass('is-valid');
                        $('#storeName').val('').removeClass('is-valid');
                        $('#storeOwner').val('').removeClass('is-valid');
                        $('#storeEmail').val('').removeClass('is-valid');
                        $('#storeAddress').val('').removeClass('is-valid');
                        $('#managerFirstname').val('').removeClass('is-valid');
                        $('#managerLastname').val('').removeClass('is-valid');
                        $('#managerContact').val('').removeClass('is-valid');
                        $('#managerEmail').val('').removeClass('is-valid');
                        $('#closeCreateStore').trigger('click');
                        // Update the table
                        fetStoreTable()
                    },
                    error: function(error) {
                        // Handle errors
                        showAlert(error, 'danger');
                    }
                });
            } else {
                console.log('Validation failed!');
            }
        } else if (state == 1) {
            console.log('it is 1');
        } else {
            console.log('Invalid State!');
        }
    });
    
    
    
});
