/* global Backbone, _, app*/
var DetailsView = Backbone.View.extend({

    el: '#wrapper',
    template: _.template($('#details-template').html()),
    events: {
        'click #add-to-favorite': 'saveToFavorite',
        'click #remove-from-favorite': 'removeFromFavorite'
    },

    render: function (index, collection) {
        'use strict';
        this.index = index;
        if (collection.models.length > 0) {
            this.$el.html(this.template({
                priceFormatted: collection.models[index].attributes.price_formatted,
                title: collection.models[index].attributes.title,
                imgUrl: collection.models[index].attributes.img_url,
                bedroomNumber: collection.models[index].attributes.bedroom_number,
                bathroomNumber: collection.models[index].attributes.bathroom_number,
                summary: collection.models[index].attributes.summary
            }));
            if (this.isInFavorite(index, collection)) {
                this.changeButtonFavAttr();
            }
        } else {
            this.$el.append("<h2>Can't found information. Back to the previous page</h2>");
        }
    },
    saveToFavorite: function () {
        'use strict';
        app.Collections.Favorites.add(app.Collections.ListOfHouses.models[this.index]);
        this.changeButtonFavAttr();
    },

    removeFromFavorite: function () {
        'use strict';
        var houseForRemove,
            currentHash = window.location.hash;

        this.$el.find('.faves').html(' + ').attr({
            title: 'add to favorite',
            id: 'add-to-favorite'
        });
        if (this.isFavoritePage(currentHash)) {
            app.Collections.Favorites.remove(app.Collections.Favorites.models[this.index]);
        } else {
            houseForRemove = app.Collections.Favorites.findWhere
            ({guid: app.Collections.ListOfHouses.models[this.index].attributes.guid});
            app.Collections.Favorites.remove(houseForRemove);
        }
    },

    isInFavorite: function (index, collection) {
        'use strict';
        var currentGuid = collection.models[index].attributes.guid;

        for (var i = 0; i < app.Collections.Favorites.models.length; i++) {
            if (app.Collections.Favorites.models[i].attributes.guid === currentGuid) {
                return true;
            }
        }
    },

    isFavoritePage: function (hash) {
        'use strict';
        return (hash.indexOf('faves') + 1);
    },

    changeButtonFavAttr: function () {
        'use strict';
        this.$el.find('.faves').html(' - ').attr({
            title: 'remove from favorite',
            id: 'remove-from-favorite'
        });
    }

});