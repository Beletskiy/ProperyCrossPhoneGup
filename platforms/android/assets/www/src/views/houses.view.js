/*global Backbone, _, */
var ListOfHousesView = Backbone.View.extend({
    el: '#wrapper',
    template: _.template($('#houses-template').html()),

    events: {
        'click #more-results': 'loadMoreResults',
        'click .house-list li': 'houseDetail',
        'click .arrow': 'backToThePreviousPage'
    },

    initialize: function () {
        'use strict';
        this.listenTo(app.Collections.ListOfHouses, 'sync', this.render);
    },

    initRender: function (urlParam) {
        'use strict';
        var self = this;
        this.pageNumber = 1;
        this.city = urlParam;
        this.showSpinner = true;
        this.showResult = false;
        app.Collections.ListOfHouses.fetch({
            reset: true,
            success: function () {
                //console.log('success initRender');
                self.showSpinner = false;
                self.showResult = true;
            },
            error: function (collection, response, options) {
                self.showSpinner = false;
                self.showResult = true;
                self.$el.html(self.template({
                    amountHousesOnThePage: 0,
                    amountOfAllHouses: 0,
                    houses: app.Collections.ListOfHouses.models,
                    flag: self.showSpinner,
                    showResult: self.showResult,
                    message: 'Where was a problem with your search'
                }));
                console.log('error in initRender');
            }
        });
        this.render();
    },

    render: function () {
        'use strict';
        var totalResults = app.Collections.ListOfHouses.commonInfo.totalResults;
        this.$el.html(this.template({
            amountHousesOnThePage: NUMBER_OF_RESULTS * this.pageNumber,
            amountOfAllHouses: totalResults,
            houses: app.Collections.ListOfHouses.models,
            flag: this.showSpinner,
            showResult: this.showResult,
            message: 'There were no properties found for the given location'
        }));
    },

    loadMoreResults: function () {
        'use strict';
        var self = this;
        this.pageNumber++;
        this.showSpinner = true;
        app.Collections.ListOfHouses.fetch({
            remove: false,
            success: function () {
                self.showSpinner = false;
            },
            error: function (collection, response, options) {
                console.log('error in more results');
            }
        });
    },

    houseDetail: function (el) {
        'use strict';
        var index = el.currentTarget.id;
        app.Routers.main.navigate('house?number=' + index, {trigger: true});
    },

    backToThePreviousPage: function () {
        'use strict';
        window.history.back();
    }
});