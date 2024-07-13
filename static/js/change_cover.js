$(document).ready(function() {
    var originalImageSrc = $('#bannerImage').attr('src');
  
    $('#changecover').on('click', function() {
      $('#fileCover').click();
    });
  
    $('#fileCover').on('change', function(event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $('#bannerImage').attr('src', e.target.result);
          // Disable the #changeprofile button if a file is selected
          $('#changeprofile').attr('disabled', 'disabled');
          // Show the #bannerValidation div
          $('#bannerValidation').css('display', 'flex');
        };
        reader.readAsDataURL(file);
      }
    });
  
    $('#cancelBanner').on('click', function() {
      // Reset the file input
      $('#fileCover').val('');
      // Revert the image to the original source
      $('#bannerImage').attr('src', originalImageSrc);
      // Enable the #changeprofile button
      $('#changeprofile').removeAttr('disabled');
      // Hide the #bannerValidation div
      $('#bannerValidation').css('display', 'none');
    });
  });
  