    // Initialize the state variable
    var state = 0; // 0 for 'createManager', 1 for 'selectManager'

$(document).ready(function() {

    $('#selectManager').click(function() {
        $(this).addClass('btn-warning');
        $('#createManager').removeClass('btn-warning');
        $('#selectManager-select').show();
        $('#selectManager-add').hide();

        // Update the state
        state = 1;
    });

    $('#createManager').click(function() {
        $(this).addClass('btn-warning');
        $('#selectManager').removeClass('btn-warning');
        $('#selectManager-select').hide();
        $('#selectManager-add').show();

        // Update the state
        state = 0;
    });

    // You can use the 'state' variable as needed here
    $('#saveStore').click(function() {
        if (state == 0) {
            // Create a FormData object
            var formData = new FormData();
    
            // Append values of the input fields to the FormData object
            formData.append('storeImage', $('#storeImage').prop('files')[0]); // Assuming file input for image
            formData.append('storeName', $('#storeName').val());
            formData.append('storeEmail', $('#storeEmail').val());
            formData.append('storeAddress', $('#storeAddress').val());
            formData.append('managerFirstname', $('#managerFirstname').val());
            formData.append('managerLastname', $('#managerLastname').val());
            formData.append('managerContact', $('#managerContact').val());
            formData.append('managerEmail', $('#managerEmail').val());
    
            // Send the FormData object using jQuery AJAX
            $.ajax({
                url: 'insert_store', // Replace with your server endpoint
                type: 'POST',
                data: formData,
                processData: false, // Important for FormData
                contentType: false, // Important for FormData
                success: function(response) {
                    console.log('Form submitted successfully:', response);
                },
                error: function(xhr, status, error) {
                    console.error('Form submission failed:', error);
                }
            });
        } else if (state == 1) {
            console.log('It is 1');
        } else {
            console.log('Invalid State!');
        }
    });
    
    
});
