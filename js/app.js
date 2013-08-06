angular.module('nashaPisnia', ['ui.unique'])
    .filter('newline', function() {
        return function(text){
            return text.replace(/\n/g, '<br />');
        }
    })
    .directive('ngFocus', function () {
        return function (scope, elm, attrs) {
            elm.bind('focus', function () {
                scope.$apply(attrs.ngFocus);
            });
        };
    });