$(document).ready(function() {
    $('#btn_edit_about').on('click', function() {
        $('#about_data').show();
        $('#fullname_data').hide();
        $('#address_data').hide();
        $('#email_data').hide();
        $('#contact_data').hide();
        $('#account_about').hide();
        $('#account_fullname').show();
        $('#account_address').show();
        $('#account_email').show();
        $('#account_contact').show();
    });

    $('#btn_edit_fullname').on('click', function() {
        $('#fullname_data').show();
        $('#about_data').hide();
        $('#address_data').hide();
        $('#email_data').hide();
        $('#contact_data').hide();
        $('#account_about').show();
        $('#account_fullname').hide();
        $('#account_address').show();
        $('#account_email').show();
        $('#account_contact').show();
    });

    $('#btn_edit_address').on('click', function() {
        $('#address_data').show();
        $('#about_data').hide();
        $('#fullname_data').hide();
        $('#email_data').hide();
        $('#contact_data').hide();
        $('#account_about').show();
        $('#account_fullname').show();
        $('#account_address').hide();
        $('#account_email').show();
        $('#account_contact').show();
    });

    $('#btn_edit_email').on('click', function() {
        $('#email_data').show();
        $('#about_data').hide();
        $('#fullname_data').hide();
        $('#address_data').hide();
        $('#contact_data').hide();
        $('#account_about').show();
        $('#account_fullname').show();
        $('#account_address').show();
        $('#account_email').hide();
        $('#account_contact').show();
    });

    $('#btn_edit_contact').on('click', function() {
        $('#contact_data').show();
        $('#about_data').hide();
        $('#fullname_data').hide();
        $('#address_data').hide();
        $('#email_data').hide();
        $('#account_about').show();
        $('#account_fullname').show();
        $('#account_address').show();
        $('#account_email').show();
        $('#account_contact').hide();
    });

    $('#cancel_about').on('click', function(){
        $('#about_data').hide();
        $('#fullname_data').hide();
        $('#address_data').hide();
        $('#email_data').hide();
        $('#contact_data').hide();
        $('#account_about').show();
        $('#account_fullname').show();
        $('#account_address').show();
        $('#account_email').show();
        $('#account_contact').show();
    });

    $('#cancel_fullname').on('click', function(){
        $('#about_data').hide();
        $('#fullname_data').hide();
        $('#address_data').hide();
        $('#email_data').hide();
        $('#contact_data').hide();
        $('#account_about').show();
        $('#account_fullname').show();
        $('#account_address').show();
        $('#account_email').show();
        $('#account_contact').show();
    });

    $('#cancel_address').on('click', function(){
        $('#about_data').hide();
        $('#fullname_data').hide();
        $('#address_data').hide();
        $('#email_data').hide();
        $('#contact_data').hide();
        $('#account_about').show();
        $('#account_fullname').show();
        $('#account_address').show();
        $('#account_email').show();
        $('#account_contact').show();
    });

    $('#cancel_email').on('click', function(){
        $('#about_data').hide();
        $('#fullname_data').hide();
        $('#address_data').hide();
        $('#email_data').hide();
        $('#contact_data').hide();
        $('#account_about').show();
        $('#account_fullname').show();
        $('#account_address').show();
        $('#account_email').show();
        $('#account_contact').show();
    });

    $('#cancel_contact').on('click', function(){
        $('#about_data').hide();
        $('#fullname_data').hide();
        $('#address_data').hide();
        $('#email_data').hide();
        $('#contact_data').hide();
        $('#account_about').show();
        $('#account_fullname').show();
        $('#account_address').show();
        $('#account_email').show();
        $('#account_contact').show();
    });
});