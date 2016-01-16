var DEBUG_MODE = true;
var debug = function(msg) {
    if (DEBUG_MODE == true) {
        console.log("DEBUG:", msg);
    }
}

var params = {
                
            };

            var result = $.ajax({
                /* update API end point */
                url: "https://api.foursquare.com/v2/venues/explore",
                data: params,
                dataType: "jsonp",
                /*set the call type GET / POST*/
                type: "GET",
            })

            /* if the call is successful (status 200 OK) show results */
            .done(function (result) {
                /* if the results are meeningful, we can just console.log them */
                console.log(result);
            })

            /* if the call is NOT successful show errors */
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });

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