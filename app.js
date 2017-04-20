var resumeApp = angular.module('resumeApp', ['ngMaterial', "ngSanitize", "ui.router"]);

resumeApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/tab/dash');
    $stateProvider
    .state('view1', {
        url: "/home",
        templateUrl: "partials/home.html"
    })
    .state('view2', {
        url: "/summary",
        templateUrl: "partials/summary.html"
    })
    .state('view3', {
        url: "/basicinfo",
        templateUrl: "partials/basicinfo.html"
    })
    .state('view4', {
        url: "/experiences",
        templateUrl: "partials/experiences.html"
    })
    .state('view5', {
        url: "/projects",
        templateUrl: "partials/projects.html"
    })
    .state('view6', {
        url: "/education",
        templateUrl: "partials/education.html"
    })
    .state('view7', {
        url: "/skills",
        templateUrl: "partials/skills.html"
    })
    .state('view8', {
        url: "/download",
        templateUrl: "partials/download.html"
    })
    ;
})
