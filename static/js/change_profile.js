  $(document).ready(function() {
    var originalImageSrc = $('#profileImage').attr('src');
  
    $('#changeprofile').on('click', function() {
      $('#fileProfile').click();
    });
  
    $('#fileProfile').on('change', function(event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $('#profileImage').attr('src', e.target.result);
          // Disable the #changecover button if a file is selected
          $('#changecover').attr('disabled', 'disabled');
          // Show the #bannerValidation div
          $('#profileValidation').css('display', 'flex');
        };
        reader.readAsDataURL(file);
      }
    });
  
    $('#cancelProfile').on('click', function() {
      // Reset the file input
      $('#fileProfile').val('');
      // Revert the image to the original source
      $('#profileImage').attr('src', originalImageSrc);
      // Enable the #changeprofile button
      $('#changecover').removeAttr('disabled');
      // Hide the #bannerValidation div
      $('#profileValidation').css('display', 'none');
    });
  });
  
  