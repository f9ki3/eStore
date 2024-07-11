$(document).ready(function() {
    
    function showSection(section) {
        // Hide all sections
        $('#profile, #privacy, #store, #categories, #units, #taxes, #discounts').hide();
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

});
