/* global Backbone */
var HouseModel = Backbone.Model.extend({

    defaults: {
        bathroom_number: null,
        bedroom_number: null,
        img_url: '',
        price_formatted: '',
        summary: '',
        thumb_url: '',
        title: '',
        guid: ''
    }
});

