$(document).ready(function() {
    
    // Function to show a specific section and store the last clicked button
    function showSection(section) {
        // Hide all sections
        $('#profile, #privacy, #store, #categories, #units, #taxes, #discounts, #about, #dashboard, #product, #delivery, #account, #supplier').hide();
        // Show the selected section with fadeIn animation
        $(section).fadeIn();
        
        // Store the ID of the clicked button in localStorage
        localStorage.setItem('lastClickedButton', section);
    }

    // Retrieve the last clicked button from localStorage on page load
    var lastClickedSection = localStorage.getItem('lastClickedButton');
    if (lastClickedSection) {
        showSection(lastClickedSection);
    }

    // Click event handlers for each button
    $("#btn_dashboard").click(function() {
        showSection('#dashboard');
    });

    $("#btn_product").click(function() {
        showSection('#product');
    });
    
    $("#btn_delivery").click(function() {
        showSection('#delivery');
    });

    $("#btn_account").click(function() {
        showSection('#account');
    });

    $("#btn_supplier").click(function() {
        showSection('#supplier');
    });

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

    $("#btn_discounts").click(function() {
        showSection('#discounts');
    });

});
