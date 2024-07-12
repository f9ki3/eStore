$(document).ready(function() {
    
    // for settings menu 
    function showSection(section) {
        // Hide all sections
        $('#profile, #privacy, #store, #categories, #units, #taxes, #discounts #about').hide();
        // Show the selected section with fadeIn animation
        $(section).fadeIn();
    }

    $("#btn_profile").click(function() {
        showSection('#profile');
    });

    $("#btn_privacy").click(function() {
        showSection('#privacy');
    });

    $("#btn_store").click(function() {
        showSection('#store');
    });

    $("#btn_categories").click(function() {
        showSection('#categories');
    });

    $("#btn_units").click(function() {
        showSection('#units');
    });

    $("#btn_taxes").click(function() {
        showSection('#taxes');
    });

    $("#btn_dicounts").click(function() {
        showSection('#discounts');
    });


    // for profile menu
    function showProfile(section) {
        // Hide all sections
        $('#about, #fullname').hide();
        // Show the selected section with fadeIn animation
        $(section).fadeIn();
    }
    
    $("#btn_edit_about").click(function() {
        showProfile('#about_data');
    });

    $("#btn_edit_fullname").click(function() {
        showProfile('#fullname_data');
    });


});
