$(document).ready(function() {
    $.ajax({
        url: '/get_account_info',
        method: 'GET',
        success: function(response) {
            // Assuming the response is a tuple converted to JSON
            var Data = response;
            $("#account_fullname").text(Data[4] + ' ' + Data[5] );
            $("#account_fullname_input").val(Data[4] + ' ' + Data[5] );
            $("#account_address_input").val(Data[9]);
            $("#account_address").text(Data[9]);
            $("#account_email").text(Data[6]);
            $("#account_email_input").val(Data[6]);
            $("#account_contact").text(Data[7]);
            $("#account_contact_input").val(Data[7]);
            $("#account_username").text(Data[2]);
            $("#account_password").text(Data[3]);
            $("#account_about").text(Data[11]);
            $("#account_about_input").val(Data[11]);
            $("#bannerImage").attr("src", 'static/uploads/'+Data[12]);
            $("#profileImage").attr("src", 'static/uploads/'+Data[8]);
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
});