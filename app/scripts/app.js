'use strict';

/**
 * @ngdoc overview
 * @name daxmallAdmin
 * @description
 * # daxmallAdmin
 *
 * Main module of the application.
 */
  //.config(function ($routeProvider) {
  //  $routeProvider
  //    .when('/', {
  //      templateUrl: 'views/main.html',
  //      controller: 'MainCtrl',
  //      controllerAs: 'main'
  //    })
  //    .when('/about', {
  //      templateUrl: 'views/about.html',
  //      controller: 'AboutCtrl',
  //      controllerAs: 'about'
  //    })
  //    .otherwise({
  //      redirectTo: '/'
  //    });
  //});
//modules = ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize','ngTouch','ui.router',  'ui.bootstrap',
//  'ngProgress', 'ui.select', 'checklist-model', "ajoslin.promise-tracker", 'angularPromiseButtons', 'AdminFilters',
//  'AdminService', "ui.bootstrap", "cgBusy", 'ngStorage', 'angular-confirm', 'toastr', 'ngTagsInput', 'naif.base64',
//  'ngUpload', 'ui.tree', 'angularMoment', 'ui.bootstrap.datetimepicker'
//];

var App, modules;
modules = ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize','ngTouch','ui.router'];
App = angular.module('daxmallAdmin', modules);

//路由配置
App.config(['$stateProvider', '$urlRouterProvider',"$locationProvider", function($stateProvider, $urlRouterProvider,$locationProvider) {
  $locationProvider.hashPrefix('');//新的ngRoute中默认的路由分割符号是!#，已经不是#了,这句话就是用回#。
  $urlRouterProvider.otherwise('/User/Login');
  $stateProvider.state('dashboard', {
    url: "/",
    templateUrl: 'views/main.html'
  })
    .state('login', {
      url: '/User/Login',
      templateUrl: 'views/User/Login.html'
    })
}]);

////promise 按钮
//App.config(['angularPromiseButtonsProvider', function(angularPromiseButtonsProvider) {
//  angularPromiseButtonsProvider.extendConfig({
//    spinnerTpl: '<i class="fa fa-spinner" aria-hidden="true"></i>',
//    disableBtn: true,
//    btnLoadingClass: 'is-loading',
//    addClassToCurrentBtnOnly: false,
//    disableCurrentBtnOnly: false
//  });
//}]);
//
////toast 对话框
//App.config(['toastrConfig', function(toastrConfig) {
//  angular.extend(toastrConfig, {
//    autoDismiss: false,
//    containerId: 'toast-container',
//    maxOpened: 0,
//    timeOut: 3000,
//    newestOnTop: true,
//    positionClass: 'toast-top-right',
//    preventDuplicates: false,
//    preventOpenDuplicates: false,
//    target: 'body'
//  });
//}]);
//
//// http拦截器
//App.config(['$httpProvider', function($httpProvider) {
//  $httpProvider.interceptors.push([
//    '$injector',
//    function($injector) {
//      return $injector.get('AuthInterceptor');
//    }
//  ]);
//}]);
//
////监控路由变化
//App.run(['$state', '$rootScope', 'AuthService', function($state, $rootScope, AuthService) {
//  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
//    //判断是否是不包括头部和侧栏的页面
//    $rootScope.isOwnPage = _.contains(["login"], toState.name);
//    //路由拦截，无权限则跳转到登录界面
//    var nextRoute = toState.name;
//    //console.log(nextRoute)
//    if (!AuthService.isAuthorized(nextRoute) && !$rootScope.isOwnPage && toState.name != "dashboard") {
//      event.preventDefault(); //阻止页面跳转\
//      $state.go('login');
//    }
//  });
//}]);
