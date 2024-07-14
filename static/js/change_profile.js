

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
              // Store the current image source after loading the new image
              originalImageSrc = $('#profileImage').attr('src');
              $('#profileImage').attr('src', e.target.result);
              // Disable the #changecover button if a file is selected
              $('#changecover').attr('disabled', 'disabled');
              // Show the #profileValidation div
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
      // Hide the #profileValidation div
      $('#profileValidation').css('display', 'none');
  });

  $('#saveProfile').on('click', function() {
      var file = $('#fileProfile')[0].files[0];
      if (file) {
          var formData = new FormData();
          formData.append('fileProfile', file);

          $.ajax({
              url: '/upload-profile',  // Adjust this URL to your server endpoint
              type: 'POST',
              data: formData,
              processData: false,
              contentType: false,
              success: function(response) {
                  console.log('File uploaded successfully:', response);
                  // Optionally handle the response from the server
                  $('#profileValidation').css('display', 'none');
                  $('#changecover').removeAttr('disabled');
                  showAlert('Update Profile Success!', 'warning');
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.error('File upload failed:', textStatus, errorThrown);
              }
          });
      }
  });
});
