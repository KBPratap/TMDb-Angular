'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var tmdbServices = angular.module('myApp.services', ['ngResource']);

    //.value('version', '0.1');
tmdbServices.factory('TmdbSearchPerson', ['$http', function ($http) {
    var path = "https://api.themoviedb.org/3/search/person?api_key=f58bd80f6749b632ace312c794e314e6&search_type=ngram&query=" + name;
    $http.get('').success(function (data) {

    });
}]);