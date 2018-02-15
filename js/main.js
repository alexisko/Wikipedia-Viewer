var input = document.getElementById('input');

// CHECK IF USER PRESSES ENTER
$(document).keypress(function(e) {
  if (e.key === 'Enter') {
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
  removeOldResults();
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

function removeOldResults() {
  var results = document.getElementById("results-container");
  while(results.firstChild) {
    results.removeChild(results.firstChild);
  }
}

function displayResults(data) {
  console.log(data);
  var results = data.query.search;
  if(results.length > 0) {
    for(var i = 0; i < results.length; i++) {
      var title = '<div class="result-title"><a href="https://en.wikipedia.org/wiki/' +
      results[i].title + '" target="_blank">' + results[i].title +
      '</a></div>';
      var body = '<div class="result-content">' + results[i].snippet + '...' + '</div>';

      $('#results-container').append('<div class="result come-in">' + title + body + '</div>');
    }
  }

}
