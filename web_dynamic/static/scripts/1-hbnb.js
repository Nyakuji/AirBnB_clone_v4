$(document).ready(function() {
    // Variable to store Amenity IDs
    let amenityIds = {};

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        // If the checkbox is checked, store the Amenity ID in the variable
        if ($(this).is(':checked')) {
            amenityIds[amenityId] = amenityName;
        } else {
            // If the checkbox is unchecked, remove the Amenity ID from the variable
            delete amenityIds[amenityId];
        }

        // Update the h4 tag inside the div Amenities with the list of Amenities checked
        updateAmenitiesList();
    });

    // Function to update the h4 tag with the list of Amenities checked
    function updateAmenitiesList() {
        const amenitiesList = Object.values(amenityIds).join(', ');
        $('.filters .amenities h4').text(amenitiesList);
    }
});

