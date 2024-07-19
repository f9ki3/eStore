function showSection(section) {
    // Hide all sections
    $('#profile, #privacy, #store, #categories, #units, #taxes, #discounts, #about, #dashboard, #product, #delivery, #account, #supplier').hide();
    // Show the selected section with fadeIn animation
    $(section).fadeIn();
    
    // Store the ID of the clicked button in localStorage
    localStorage.setItem('lastClickedButton', section);
}

showSection('#dashboard');

setTimeout(function(){
window.location.href = '/app';
}, 3000); // 3000 milliseconds = 3 seconds
