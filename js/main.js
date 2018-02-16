var input = document.getElementById('input');

$(document).keypress(function(e) {
  if (e.key === 'Enter') {
    search(input.value);
  }
});

$('#search').click(function() {
  search(input.value);
});

$('#random').click(function() {
  window.open("https://en.wikipedia.org/wiki/Special:Random");
});

function search(input) {
  if(input.length > 0) {
    clearResults();

    $.ajax({
      type: 'GET',
      url: 'https://en.wikipedia.org/w/api.php?',
      data: {
        action: 'query',
        list: 'search',
        srsearch: input.split(' ').join('+'),
        format: 'json'
      },
      dataType: 'jsonp',
      success: displayResults
    });
  }
}

function clearResults() {
  var results = document.getElementById("results-container");
  while(results.firstChild) {
    results.removeChild(results.firstChild);
  }
}

function displayResults(data) {
  var results = data.query.search;
  if(results.length > 0) {
    for(var i = 0; i < 5; i++) {
      var title = '<div class="result-title"><a href="https://en.wikipedia.org/wiki/' +
      results[i].title + '" target="_blank">' + results[i].title +
      '</a></div>';
      var body = '<div class="result-content">' + results[i].snippet + '...' + '</div>';

      $('#results-container').append('<div class="result come-in">' + title + body + '</div>');
    }
  } else {
    var error = '<p>There were no results matching the query.</p>' +
    '<p>The page <strong>"' + input.value + '"</strong> does not exist.  ' +
    'You can <a href="tps://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation" target="_blank">' +
    'ask for it to be created.</a></p>';
    $('#results-container').append('<div class="error">' + error + '</div>');
  }
}
