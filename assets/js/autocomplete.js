var base = 'https://www.mapquestapi.com/search/v3/prediction?key=ceiWumpWrG5aqAOi4bsRb8BIkjPl3vtP&limit=5&collection=address,city&q=';


var cities = [];

// / MAKE function and add the input being typed to the end
// / Create arrays for char length
var searchButton = document.querySelector("#search-button");
var searchBox = document.querySelector("#search")
var resultContainer = document.querySelector("#results");
function fetchMapData(keyword) {


    fetch(`https://www.mapquestapi.com/search/v3/prediction?key=ceiWumpWrG5aqAOi4bsRb8BIkjPl3vtP&limit=5&collection=address,city&q=${keyword}`).then(promise => promise.json()).then(data => {

        JSON.stringify(data);
        console.log(data.results);
        for (var i = 0; i < data.results.length; i++) {

            var city = data.results[i].name;

            var state = data.results[i].place.properties.state;


            var longitude = data.results[i].place.geometry.coordinates[0];


            var latitude = data.results[i].place.geometry.coordinates[1];


            cities.push([city, state, latitude, latitude]);

            console.log('Last Log: \n' + cities[i]);
            console.log(`City: ${city}\nState: \n${state}\nLongitude: ${longitude}\nLatitude: ${latitude}`)


        }


    });
}


searchButton.addEventListener('click', function (event) {
    if (info === undefined) {
        alert("No Input Detected")
        return
    } else {
        event.target

        fetchMapData(info)


    }

    var info = searchBox.value;
    if (info === undefined) {
        alert("No Input Detected")

        return
    } else {
        event.target

        fetchMapData(info)


    }


});

searchBox.addEventListener('keydown', function (event) {
    var info = searchBox.value;
    if (info === undefined) {

        return
    } else {
        event.target

        fetchMapData(info)


    }

});

searchBox.addEventListener('keyup', function (event) {
    var info = searchBox.value;

    fetchMapData(info)
    event.target
});
