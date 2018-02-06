var input = document.getElementById('input');

// CHECK IF USER PRESSES ENTER
$(document).keypress(function(e) {
  var keycode = e.key;
  if (keycode === 'Enter') {
    getResults(input.value);
  }
});

// USER PRESSED SEARCH BTN
$('#search').click(function() {
  getResults(input.value);
});

// RANDOM BTN
$('#random').click(function() {
  window.open("https://en.wikipedia.org/wiki/Special:Random");
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
        success: displayResults
      });
}

function displayResults(data) {
  console.log(data);
  var results = data.query.search;
  if(results.length > 0) {
    for(var i = 0; i < 3; i++) {
      var title = '<div><a href="https://en.wikipedia.org/wiki/' +
      results[i].title + '" target="_blank">' + results[i].title +
      '</a></div>';
      var body = '';

      $('.results').append('<div>' + title + '</div>');
    }
  }

}
