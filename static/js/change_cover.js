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
              // Store the current image source after loading the new image
              originalImageSrc = $('#bannerImage').attr('src');
              $('#bannerImage').attr('src', e.target.result);
              // Disable the #changeprofile button if a file is selected
              $('#changeprofile').prop('disabled', true);
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
      $('#changeprofile').prop('disabled', false);
      // Hide the #bannerValidation div
      $('#bannerValidation').css('display', 'none');
  });

  $('#saveCover').on('click', function() {
      var file = $('#fileCover')[0].files[0];
      if (file) {
          var formData = new FormData();
          formData.append('fileCover', file);

          $.ajax({
              url: '/upload-banner',  // Adjust this URL to your server endpoint
              type: 'POST',
              data: formData,
              processData: false,
              contentType: false,
              success: function(response) {
                  console.log('File uploaded successfully:', response);
                  // Optionally handle the response from the server
                  $('#bannerValidation').css('display', 'none');
                  $('#changeprofile').prop('disabled', false);
                  showAlert('Update Profile Success!', 'warning');
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.error('File upload failed:', textStatus, errorThrown);
              }
          });
      }
  });
});
