$(document).ready(function() {
    $('#btn_edit_username').on('click', function() {
        // console.log('click username')
        $('#username_data').show();
        $('#account_username').hide();
    });

    $('#btn_edit_password').on('click', function() {
        // console.log('click password')
        $('#password_data').show();
        $('#account_password').hide();
    });
    
});