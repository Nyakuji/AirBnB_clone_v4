const $ = window.$;

$(document).ready(function () {
    const myAmenities = {};

    // Function to update the h4 tag with the list of Amenities checked
    function updateAmenitiesList() {
        const output = Object.values(myAmenities).join(', ');
        $('div.amenities > h4').text(output);
    }

    // Listen for changes on each input checkbox tag
    $('.amenities input[type="checkbox"]').change(function () {
        const dataId = $(this).data('id');
        const dataName = $(this).data('name');

        if (this.checked) {
            myAmenities[dataId] = dataName;
        } else {
            delete myAmenities[dataId];
        }

        // Update the h4 tag inside the div Amenities with the list of Amenities checked
        updateAmenitiesList();
    });

    // Request http://0.0.0.0:5001/api/v1/status/
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        // Check if the status is "OK"
        if (data.status === 'OK') {
            // If "OK", add the class available to the div#api_status
            $('#api_status').addClass('available');
        } else {
            // If not "OK", remove the class available from the div#api_status
            $('#api_status').removeClass('available');
        }
    });
});

