/* global Backbone */
var ListOfHousesCollection = Backbone.Collection.extend({

    url: function () {
        'use strict';
        var URL = 'http://api.nestoria.co.uk/api?pretty=1&country=uk&encoding=json&action=search_listings&listing_type=buy',
            page = '&page=' + app.Views.listOfHouses.pageNumber,
            city = '&place_name=' + app.Views.listOfHouses.city;
        return URL + page + city;
    },

    model: HouseModel,

    commonInfo: {
        totalResults: 0
    },

    parse: function (data) {
        'use strict';
        var listings,
            result = [];

        if (data.response.hasOwnProperty('listings') && Array.isArray(data.response.listings)) {
            listings = data.response.listings;
        } else {
            listings = [];
        }

        if (data.response.hasOwnProperty('total_results') && typeof data.response.total_results === 'number') {
            this.commonInfo.totalResults = data.response.total_results;
        } else {
            this.commonInfo.totalResults = 0;
        }

        for (var i = 0; i < listings.length; i++) {
            result.push({
                price_formatted: listings[i].price_formatted,
                summary: listings[i].summary,
                thumb_url: listings[i].thumb_url,
                img_url: listings[i].img_url,
                title: listings[i].title,
                bedroom_number: listings[i].bedroom_number,
                bathroom_number: listings[i].bathroom_number,
                guid: listings[i].guid
            });
        }
        return result;
    }
});