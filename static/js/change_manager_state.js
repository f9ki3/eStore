    // Initialize the state variable
    var state = 1; // 0 for 'createManager', 1 for 'selectManager'

$(document).ready(function() {

    $('#selectManager').click(function() {
        $(this).addClass('btn-warning');
        $('#createManager').removeClass('btn-warning');
        $('#selectManager-select').show();
        $('#selectManager-add').hide();

        // Update the state
        state = 1;
    });

    $('#createManager').click(function() {
        $(this).addClass('btn-warning');
        $('#selectManager').removeClass('btn-warning');
        $('#selectManager-select').hide();
        $('#selectManager-add').show();

        // Update the state
        state = 0;
    });
});
