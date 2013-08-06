'use strict';

function SongListController($scope, $http, $location, $rootScope) {
    $http.get('songs/songs.json').success(function(data) {
        $scope.songs = data;
        $scope.songsFromCategory = [];
        $rootScope.ua = true;
        $rootScope.ang = false;
        $scope.goBack = function () {
            window.history.back();
        }
        $scope.toUa = function () {
            $rootScope.ua = true;
            $rootScope.ang = false;
        }
        $scope.toAng = function () {
            $rootScope.ua = false;
            $rootScope.ang = true;
        }
        $scope.selectSong = function (id) {
            $rootScope.$broadcast('selectSong', {id: id})
        }
        $rootScope.$on('selectCategory', function (event, args) {
            $scope.songsFromCategory = [];
            $scope.category = args.category;
            angular.forEach($scope.songs, function(song){
                 if (song.category === args.category) {
                    $scope.songsFromCategory.push(song);
                 }
            }); 
        });
    });
};

function SongCategoryController($scope, $http, $location, $rootScope) {
    $http.get('songs/songs.json').success(function(data) {
        $scope.songs = data;
        $rootScope.ua = true;
        $rootScope.ang = false;
        $scope.toUa = function () {
            $rootScope.ua = true;
            $rootScope.ang = false;
        }
        $scope.toAng = function () {
            $rootScope.ua = false;
            $rootScope.ang = true;
        }
        $scope.selectCategory = function (category) {
            $rootScope.$broadcast('selectCategory', {category: category})
        }
    });
};


function SongDetailController($scope, $http, $routeParams, $rootScope) {
    $http.get('songs/songs.json').success(function(data) {
        $rootScope.ua = true;
        $rootScope.ang = false;
        $scope.toUa = function () {
            $rootScope.ua = true;
            $rootScope.ang = false;
        }
        $scope.toAng = function () {
            $rootScope.ua = false;
            $rootScope.ang = true;
        }
        var songId = 0;
        $scope.song = data[songId];
        $scope.htmlSongText = data[songId].text.replace(/\n/g, '<br />');
        $scope.htmlSongTextAng = data[songId].textAng.replace(/\n/g, '<br />');
        $scope.goBack = function () {
            window.history.back();
        }
        $rootScope.$on('selectSong', function (event, args) {
            songId = args.id;
            $scope.song = data[songId];
            $scope.htmlSongText = data[songId].text.replace(/\n/g, '<br />');
            $scope.htmlSongTextAng = data[songId].textAng.replace(/\n/g, '<br />');
        });
    });
};