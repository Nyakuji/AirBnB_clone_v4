const $ = window.$;

$(document).ready(function () {
    const myStates = {};
    const myCities = {};

    const statesCheckbox = $('.locations input[type="checkbox"]');
    const citiesCheckbox = $('.locations ul input[type="checkbox"]');
    const searchButton = $('.filters button');

    statesCheckbox.prop('checked', false);
    citiesCheckbox.prop('checked', false);

    statesCheckbox.change(function () {
        const dataId = $(this).attr('data-id');
        const dataName = $(this).attr('data-name');

        if (this.checked) {
            myStates[dataId] = dataName;
        } else {
            delete myStates[dataId];
        }

        updateLocations();
    });

    citiesCheckbox.change(function () {
        const dataId = $(this).attr('data-id');
        const dataName = $(this).attr('data-name');

        if (this.checked) {
            myCities[dataId] = dataName;
        } else {
            delete myCities[dataId];
        }

        updateLocations();
    });

    searchButton.click(function () {
        // Make a new POST request to places_search with the lists of Amenities, Cities, and States checked
        const amenities = getCheckedValues($('.amenities input[type="checkbox"]'));
        const cities = Object.values(myCities);
        const states = Object.values(myStates);

        const requestData = {
            amenities: amenities,
            cities: cities,
            states: states
        };

        // Make the POST request
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            data: JSON.stringify(requestData),
            success: function (data) {
                // Handle the success response, update the places section with the new data, etc.
                console.log('POST request successful!', data);
            },
            error: function (error) {
                console.error('Error in POST request:', error);
            }
        });
    });

    function updateLocations() {
        // Update the h4 tag inside the div Locations with the list of States and Cities checked
        const statesList = Object.values(myStates).join(', ');
        const citiesList = Object.values(myCities).join(', ');
        const locationsText = statesList + (citiesList ? ', ' + citiesList : '');

        $('div.locations > h4').text(locationsText);
    }

    function getCheckedValues(checkboxes) {
        // Helper function to get the values of checked checkboxes
        const checkedValues = [];

        checkboxes.each(function () {
            if (this.checked) {
                checkedValues.push($(this).attr('data-id'));
            }
        });

        return checkedValues;
    }
});

