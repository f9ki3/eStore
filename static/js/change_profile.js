$(document).ready(function() {
    $('#changeprofile').on('click', function() {
      $('#fileProfile').click();
    });
  
    $('#fileProfile').on('change', function(event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $('#profileImage').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  });
  