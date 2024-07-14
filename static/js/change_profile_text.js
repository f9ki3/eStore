$(document).ready(function() {
    $('#btn_edit_about').on('click', function() {
        $('#about_data').show();
        $('#fullname_data').hide();
    });

    $('#btn_edit_fullname').on('click', function() {
        $('#fullname_data').show();
        $('#about_data').hide();
    });

    $('#cancel').on('click', function(){
        $('#about_data').hide();
        $('#fullname_data').hide();
    });
});
