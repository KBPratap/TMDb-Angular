'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', '$http', function ($scope, $http) {
      var personSearch = "https://api.themoviedb.org/3/search/person?api_key=f58bd80f6749b632ace312c794e314e6&search_type=ngram&query=";
      var movieSearch = "https://api.themoviedb.org/3/person/";//{id}/movie_credits"

      $scope.currentPage = 1;
      //$scope.actorName = "brad";
      $scope.getActorNames = function () {
          var path = personSearch + $scope.actorName + "&page=" + $scope.currentPage;
          $http.get(path).success(function (data) {
              $scope.actors = data.results;
              $scope.totalPages = data.total_pages;
              console.log(data);
          });
          $scope.showActors = true;
      };

      $scope.$watch('actorName', function () {
          $scope.resetActor();
          $scope.resetPage();
      });

      $scope.$watch('myActor', function (newVal, oldVal) {
          console.log($scope.myActor);
      });

      $scope.setName = function (curr) {
          $scope.myActorId = curr;
          $scope.myActor = $scope.actors[curr];
          $scope.getMovieCredits();
      };
      $scope.isActive = function (index) {
          return $scope.myActorId == index;
      }

      $scope.prev = function () {
          if ($scope.currentPage > 1) {
              $scope.currentPage -= 1;
              $scope.resetActor();
              $scope.getActorNames();
          }
      }
      $scope.next = function () {
          if ($scope.currentPage < $scope.totalPages) {
              $scope.currentPage += 1;
              $scope.resetActor();
              $scope.getActorNames();
          }
      }
      $scope.resetPage = function () {
          $scope.currentPage = 1;
          $scope.totalPages = undefined;
      }
      $scope.resetActor = function () {
          $scope.myActorId = undefined;
          $scope.myActor = {};
          $scope.movies = [];
      }

      $scope.getMovieCredits = function () {
          $scope.showActors = false;

          var path = movieSearch + String($scope.myActor.id);
          path += "/movie_credits?api_key=f58bd80f6749b632ace312c794e314e6"//&page=1000"///movie_credits

          $http.get(path).success(function (data) {
              $scope.movies = data.crew;
          });
      };
      $scope.noMovies = function () {
          return $scope.movies.length == 0 && $scope.myActorId !== undefined;
      };

  }])
  .controller('MyCtrl2', ['$scope', function ($scope) {

  }]);
