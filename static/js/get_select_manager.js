function getSelectManager(){
    $(document).ready(function(){
        $.ajax({
    url: '/get_select_manager',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        var select = $('#managerSelect');
        select.empty(); // Clear existing options

        // Loop through the data and add options to the select element
        $.each(data, function(key, value) {
            // Assuming "id" is one of the keys
            var id = value.id;

            // Concatenate first name and last name (if available)
            var fullName = value.manager_firstname + ' ' + value.manager_lastname;

            // Create an option element
            var option = new Option(fullName, id);

            // Append the option to the select element
            select.append(option);
        });

        // Initialize Select2
        select.select2();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error: ' + textStatus + ' - ' + errorThrown);
    }
});

        
    });
}

getSelectManager()