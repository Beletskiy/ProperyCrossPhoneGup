/*global Backbone, _, */
var FormView = Backbone.View.extend({

    el: '#wrapper',
    template: _.template($('#form-template').html()),
    events: {
        'click #go-button': 'goToResultPage',
        'click #faves': 'goToFavesPage'
    },

    goToResultPage: function () {
        'use strict';
        var cityName =  this.$el.find('#inputCity').val();
        app.Routers.main.navigate('search?q=' + cityName, {trigger: true});
    },

    goToFavesPage: function() {
        app.Routers.main.navigate('faves', {trigger: true});
    },

    render: function () {
        'use strict';
        this.$el.html(this.template());
    }
});