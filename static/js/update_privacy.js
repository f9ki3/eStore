$(document).ready(function() {
    $('#cancel_username').on('click', function() {
        $('#username_data').hide()
        $('#account_username').show()
    });

    $('#cancel_password').on('click', function() {
        $('#password_data').hide()
        $('#account_password').show()
        $('#account_password_input').val('')
        $('#account_password_input').removeClass('is-invalid border-warning is-valid');

    });

    $('#show_password').on('click', function() {
        var passwordInput = $('#account_password_input');
        var currentType = passwordInput.attr('type');

        if (currentType === 'password') {
            passwordInput.attr('type', 'text');
            $('#show_password').text('Hide Password');
        } else {
            passwordInput.attr('type', 'password');
            $('#show_password').text('Show Password');
        }
    });

    $('#generate_password').on('click', function() {
        var password = generatePassword(12); // Generate a 12-character password
        $('#account_password_input').val(password);
        evaluatePasswordStrength(password);
    });
    
    $('#account_password_input').on('input', function() {
        var password = $(this).val();
        evaluatePasswordStrength(password);
    });
    
    function generatePassword(length) {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
        var password = "";
        for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
    
    function evaluatePasswordStrength(password) {
        var strength = 0;
    
        // Check length
        if (password.length >= 8) {
            strength++;
        }
        // Check for special characters
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            strength++;
        }
        // Check for uppercase and lowercase letters
        if (/[a-z]+/.test(password) && /[A-Z]+/.test(password)) {
            strength++;
        }
    
        // Update input field color based on strength
        var passwordInput = $('#account_password_input');
        if (strength === 0) {
            console.log('invalid');
            passwordInput.removeClass().addClass('form-control is-invalid');
        } else if (strength === 1 || strength === 2) {
            console.log('warning');
            passwordInput.removeClass().removeClass('is-invalid').addClass('form-control border-warning');
        } else if (strength >= 3) {
            console.log('valid');
            passwordInput.removeClass().removeClass('is-invalid border-warning').addClass('form-control is-valid');
        }
    
        // Enable/disable the "Save" button based on password strength
        var saveButton = $('#save_password');
        saveButton.prop('disabled', strength < 1); // Enable button if strength is 3 or higher
    }
    

    $('#btn_edit_username').on('click', function() {
        // console.log('click username')
        $('#password_data, #account_username').hide();
        $('#account_password, #username_data').show();
    });

    $('#btn_edit_password').on('click', function() {
        // console.log('click password')
        $('#password_data, #account_username').show();
        $('#account_password, #username_data').hide();

    });
    
});