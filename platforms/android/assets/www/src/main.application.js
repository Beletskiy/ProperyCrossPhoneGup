/*global Backbone */
var app = {
    Views: {},
    Models: {},
    Collections: {},
    Routers: {}
};

var NUMBER_OF_RESULTS = 20;

app.Models.house = new HouseModel();
app.Collections.ListOfHouses = new ListOfHousesCollection();
app.Collections.Favorites = new FavoritesCollection();
app.Views.favorite = new FavoriteListView();
app.Views.details = new DetailsView();
app.Views.listOfHouses = new ListOfHousesView();
app.Views.form = new FormView();
app.Routers.main = new Router();
Backbone.history.start(); //route the initial URL
