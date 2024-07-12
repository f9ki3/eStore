$(document).ready(function() {
    $.ajax({
        url: '/get_account_info',
        method: 'GET',
        success: function(response) {
            // Assuming the response is a tuple converted to JSON
            var Data = response;
            $("#account_fullname").text(Data[4] + ' ' + Data[5] );
            $("#account_address").text(Data[9]);
            $("#account_email").text(Data[6]);
            $("#account_contact").text(Data[7]);
            $("#account_username").text(Data[2]);
            $("#account_password").text(Data[3]);
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
});