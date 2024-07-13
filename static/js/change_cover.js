$(document).ready(function() {
    $('#changecover').on('click', function() {
      $('#fileCover').click();
    });
  
    $('#fileCover').on('change', function(event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $('#bannerImage').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  });
  