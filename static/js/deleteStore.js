$(document).on('click', '#saveDeleteStore', function() {
    // Get the value of the storeDeleteID input
    const storeDeleteId = $('#storeDeleteID').val();
    
    // Create a new FormData object
    const formData = new FormData();
    // Append the storeDeleteId to the FormData object
    formData.append('storeDeleteId', storeDeleteId);
    
    // Perform the AJAX request
    $.ajax({
        url: 'delete_store_id', // Replace with your server endpoint
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            // Handle success
            // console.log(response)
            console.log('Store deleted successfully:', response);
            showAlert('Deleted Store!', 'success');
            fetStoreTable()
            $('#closeDeleteStore').trigger('click');
        },
        error: function(xhr, status, error) {
            // Handle error
            console.error('Failed to delete store:', error);
        }
    });
});