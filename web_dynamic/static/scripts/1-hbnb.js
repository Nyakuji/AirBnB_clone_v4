const $ = window.$;

$(document).ready(function () {
    const myAmenities = {};

    $('.amenities input[type="checkbox"]').change(function () {
        const dataId = $(this).data('id');
        const dataName = $(this).data('name');

        if (this.checked) {
            myAmenities[dataId] = dataName;
        } else {
            delete myAmenities[dataId];
        }

        const output = Object.values(myAmenities).join(', ');
        $('div.amenities > h4').text(output);
    });
});

