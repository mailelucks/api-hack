 function populateDropDown() {
     /*
     We would like to see if we can get an valid JSON result which we can parse in using AJAX
     */
     /* Update all the parameters for your API test*/
     var result = $.ajax({
             /* update API end point */
             url: "https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=cn2fjcqsvzhaf9xzdhztf6gx",
             dataType: "jsonp",
             /*set the call type GET / POST*/
             type: "GET",
         })
         /* if the call is successful (status 200 OK) show results */
         .done(function (result) {
             /* if the results are meeningful, we can just console.log them */
             $.each(result.makes, function (i, item) {
                 var carMakes = '<option value="' + item.name + '">' + item.name + '</option>';
                 $('#displayCarMakes').append(carMakes);
             });

         })
         /* if the call is NOT successful show errors */
         .fail(function (jqXHR, error, errorThrown) {
             console.log(jqXHR);
             console.log(error);
             console.log(errorThrown);
         });
     console.log(result);
 }


 function searchResults() {
     var e = document.getElementById("displayCarMakes");
     var searchTerm = e.options[e.selectedIndex].value;
     /*
     We would like to see if we can get an valid JSON result which we can parse in using AJAX
     */
     /* Update all the parameters for your API test*/
     var result = $.ajax({
             /* update API end point */

             url: " https://api.edmunds.com/api/vehicle/v2/" + searchTerm + "/models?fmt=json&api_key=cn2fjcqsvzhaf9xzdhztf6gx",
             dataType: "jsonp",
             /*set the call type GET / POST*/
             type: "GET",
         })
         /* if the call is successful (status 200 OK) show results */
         .done(function (result) {
             /* if the results are meeningful, we can just console.log them */
             $('#modelResults').empty();
             $.each(result.models, function (i, item) {
                 //var carModels = '<li class = "modelRow">' + searchTerm + ' ' + item.name;
                 //youtube search
                 
                 $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                         "part": "snippet",
                         "key": "AIzaSyCclIq-RF7zhCJ_JnoXJBLdGvz-v2nzCB0",
                         "q": searchTerm + ' ' + item.name
                     },
                     function (data) {
                         if (data.pageInfo.totalResults == 0) {
                             alert("No videos found!");
                         }
                         // If there are no results it will just empty the list

                         $.each(data.items, function (index, video) {
                             // append li to ul
                             console.log(data.items[0].snippet.thumbnails.medium.url);
                             var videoURL = video.snippet.thumbnails.medium.url;


                         });
                         console.log(data.items[0].snippet.thumbnails.medium.url);


                         var carModels = '<li class = "modelRow"><img class = "car-image" src="' + data.items[0].snippet.thumbnails.medium.url + '"/> <p class="caption">' + searchTerm + ' ' + item.name + '</p> </li>';
                         $('#modelResults').append(carModels);
                         //carModels += '<img src="' + data.items[0].snippet.thumbnails.medium.url + '"/> <br />';

                     }

                 );


                 //carModels += ' </li>';



             });

         })
         /* if the call is NOT successful show errors */
         .fail(function (jqXHR, error, errorThrown) {
             console.log(jqXHR);
             console.log(error);
             console.log(errorThrown);
         });
 }

 $(document).ready(function () {
     populateDropDown();
     $('#searchCars').on('click', searchResults);
 });

