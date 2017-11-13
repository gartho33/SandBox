var app = angular.module('myApp', ['ui.router', 'ngAnimate', 'ui.grid']);
app.service('testService', function(){
        this.testLog = function(){
            console.log('test log from service');
        },
        this.testProp = 'test property from service',
        this.testCallFn = function($scope){
            console.log($scope.test)
        }
});

app.controller('RadioMenu', ['$scope', function($scope){
        $scope.isChecked = 'true';
        $scope.$watch('isChecked', function(){
            console.log('isChecked changed to: '+$scope.isChecked)
            console.log("Type of isChecked is: "+typeof($scope.isChecked))
        })
    }]);

app.controller('sandboxController', ['$scope', '$compile', 'testService', function($scope, $compile, testService){
    $scope.title = 'Sandbox';
    $scope.test = "Using Angular 1.4.3";
}]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    var viewTemplates = {
        nav: { templateUrl: 'views/nav.html', controller: '' }
    }
    
    $stateProvider
    .state('home',{
        url: '/',
        views: {
            'nav': viewTemplates.nav,
            '': {templateUrl: 'sandbox.html', controller: 'sandboxController'}
        }
    })
    .state('demos',{
        url: '/demos',
        views: {
            'nav': viewTemplates.nav,
            '': { templateUrl: 'views/Demos.html', controller: '' }
        }        
    })
    .state('spacing',{
        url: '/spacing',
        views: {
            'nav': viewTemplates.nav,
            '': { templateUrl: 'views/pageViews/spacing/spacing.html' }
        }
    })
});