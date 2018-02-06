var input = document.getElementById('input');

// CHECK IF USER PRESSES ENTER
$(document).keypress(function(e) {
  var keycode = e.key;
  if (keycode === 'Enter') {
    console.log(keycode);
    console.log(input.value);
    getResults(input.value);
  }
});

// USER PRESSED SEARCH BTN
$('#search').click(function() {
  console.log(input.value);
  getResults(input.value);
});

// RANDOM BTN
$('#random').click(function() {
  window.location = "https://en.wikipedia.org/wiki/Special:Random";
});

// AJAX CALL
function getResults(input) {
  var term = input.split(' ').join('+');
  $.ajax({
        type: 'GET',
        url: 'https://en.wikipedia.org/w/api.php?',
        data: {
          action: 'query',
          list: 'search',
          srsearch: term,
          format: 'json'
        },
        dataType: 'jsonp',
        success: function(data) {
          console.log(data);
        }
      });
}
