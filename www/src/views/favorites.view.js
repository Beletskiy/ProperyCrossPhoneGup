/*global Backbone, _, */
var FavoriteListView = Backbone.View.extend({
    el: '#wrapper',
    template: _.template($('#favorite-template').html()),

    events: {
        'click .favorite-list li': 'houseDetail'
    },

    render: function () {
        'use strict';
        var messageAboutNoFavorites = 'You have not added any properties to your favourites';
        if (app.Collections.Favorites.models.length > 0) {
            this.$el.html(this.template({
                houses: app.Collections.Favorites.models,
                message: ''
            }));
        } else {
            this.$el.html(this.template({
                houses: app.Collections.Favorites.models,
                message: messageAboutNoFavorites
            }));
        }
    },
    houseDetail: function (el) {
        'use strict';
        var index = el.currentTarget.id;
        app.Routers.main.navigate('faves/house?number=' + index, {trigger: true});
    }
});


