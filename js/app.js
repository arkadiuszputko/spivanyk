// Pomidoro Mobile Application
// app.js
//
// This is the main application .js file
// with modules, controllers and router
//
// created by @sauliuz
// PopularOwl Labs // www.popularowl.com
// Visit www.htmlcenter.com 
// for more mobile application templates
////////////////////////////////////////////

// Defining angular application model
// for Pomidoro app
//
var spivanykApp = angular.module('spivanykApp',[]);


////////// ROUTING /////////////////////////

// Deffining $routeProvider for Pomidoro applicatiom module
//
spivanykApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'SongListController',
            templateUrl: 'views/SongListView.html'
        })
        .when('/song/:songId',
        {
            controller: 'SongDetailController',
            templateUrl: 'views/SongDetailView.html'
        })
        .otherwise({ redirectTo: '/'});

});

spivanykApp.controller('SongListController', function($scope, $http, $rootScope){
    
    // Controller is going to set recommendedMovies
    // variable for the $scope object in order for view to
    // display its contents on the screen as html 
    $scope.songs = [];
    if (!$rootScope.ua && !$rootScope.ang) {
        $rootScope.ua = true;
        $rootScope.ang = false;
    }

    $scope.showDetails = function (id) {
        $rootScope.songId = id;
    }

    // Just a housekeeping.
    // In the init method we are declaring all the
    // neccesarry settings and assignments
    init();

    $rootScope.toUa = function () {
        $rootScope.ua = true;
        $rootScope.ang = false;
        console.log('chuj');
    }

    $rootScope.toAng = function () {
        $rootScope.ua = false;
        $rootScope.ang = true;      
        console.log('chuj');
    }

        
    function init(){

        // As we need to wait for $http.get 
        // request data to be ready we are 
        // using .then on the promisse received
        // from factory
        $http.get('songs/songs.json').success(function(data) {
            $scope.songs = data;
            $scope.ready = true;
        });
    };
    
});

// TheatersController
//
spivanykApp.controller('SongDetailController', function($scope, $http, $rootScope, $routeParams){
    
    // This controller is going to set theaters
    // variable for the $scope object in order for view to
    // display its contents on the screen as html 
    $scope.song = {};

    if (!$rootScope.ua && !$rootScope.ang) {
        $rootScope.ua = true;
        $rootScope.ang = false;
    }

    $rootScope.toUa = function () {
        $rootScope.ua = true;
        $rootScope.ang = false;     
    }

    $rootScope.toAng = function () {
        $rootScope.ua = false;
        $rootScope.ang = true;      
    }

    // Just a housekeeping.
    // In the init method we are declaring all the
    // neccesarry settings and assignments
    init();

    function init(){
        $http.get('songs/songs.json').success(function(data) {
            $scope.song = data[$routeParams.songId.toString()];
            $scope.ready = true;
        });
    }   
});