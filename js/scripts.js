var DEBUG_MODE = true;
var debug = function(msg) {
    if (DEBUG_MODE == true) {
        console.log("DEBUG:", msg);
    }
}
var showSnacks = function(question) {

	// clone our result template code
	var result = $('.templates .question').clone();
	
	// Set the question properties in result
	var questionElem = result.find('.question-text a');
	questionElem.attr('href', question.link);
	questionElem.text(question.title);

	// set the date asked property in result
	var asked = result.find('.asked-date');
	var date = new Date(1000*question.creation_date);
	asked.text(date.toString());

	// set the .viewed for question property in result
	var viewed = result.find('.viewed');
	viewed.text(question.view_count);

	// set some properties related to asker
	var asker = result.find('.asker');
	asker.html('<p>Name: <a target="_blank" '+
		'href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
		question.owner.display_name +
		'</a></p>' +
		'<p>Reputation: ' + question.owner.reputation + '</p>'
	);

	return result;
    
};

var getSnacks = function(locale) {
	
	// the parameters we need to pass in our request to StackOverflow's API
	var request = { 
		near: 'locale',
        section: 'food',
		venuePhoto: 1,
        sortByDistance: 1,
        group: 'recommended'
	};
	
	$.ajax({
		url: "https://api.foursquare.com/v2/venues/explore",
		data: request,
		dataType: "jsonp",//use jsonp to avoid cross origin issues
		type: "GET",
	})
    
	.done(function(result){ 
        console.log(result);
//		$('.search-results').html(searchResults);
//		//$.each is a higher order function. It takes an array and a function as an argument.
//		//The function is executed once for each item in the array.
//		$.each(result.items, function(i, item) {
//			var snacks = showSnacks(item);
//			$('.nearbySnacks').append(snacks);
//		});
	})
	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
    
};

$(document).ready(function() {
$('.locationForm').submit( function(e){
		e.preventDefault();
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var locale = $(this).find("input[name='location']").val();
		getSnacks(locale);
	});

});