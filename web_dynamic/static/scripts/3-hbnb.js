const $ = window.$;

$(document).ready(function () {
    // Function to create an article tag for a place
    function createPlaceArticle(place) {
        const article = $('<article>');
        const titleBox = $('<div class="title_box">');
        titleBox.append('<h2>' + place.name + '</h2>');
        titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
        article.append(titleBox);
        
        const information = $('<div class="information">');
        information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
        information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
        information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');
        article.append(information);
        
        const user = $('<div class="user">');
        user.append('<b>Owner:</b> ' + place.host.first_name + ' ' + place.host.last_name);
        article.append(user);
        
        const description = $('<div class="description">');
        description.html(place.description);
        article.append(description);
        
        // Append the created article tag to the places section
        $('section.places').append(article);
    }

    // Make a POST request to the places_search endpoint
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            // Loop through the results and create article tags for each place
            for (const place of data) {
                createPlaceArticle(place);
            }
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
});

