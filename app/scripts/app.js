/**
 * Created by wugy on 2016/12/28.
 */
<<<<<<< HEAD

'use strict';
var App, modules;
modules = ['ngAria', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ui.router', 'ngSanitize', 'ui.bootstrap',
    'ngTouch', 'ngProgress', 'ui.select', 'checklist-model', "ajoslin.promise-tracker", 'angularPromiseButtons', 'AdminFilters',
    'AdminService', "ui.bootstrap", 'ngStorage', 'angular-confirm', 'toastr', 'ngTagsInput', 'naif.base64',
    'ngUpload', 'ui.tree', 'angularMoment'];//"cgBusy", , 'ui.bootstrap.datetimepicker'删掉
App = angular.module('CustomerAdminForDaxmall', modules);

//路由配置
App.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/User/Login');
    $stateProvider.state('dashboard', {
            url: '/',
            templateUrl: 'views/main.html'
        })
        .state('login', {
            url: '/User/Login',
            templateUrl: 'views/User/Login.html'
        })
        //报表模块-》订单管理
        .state('orderManage', {
            url: '/reportManage/orderManage',
            templateUrl: 'views/reportManage/orderManage.html'
        })

});

//promise 按钮
App.config(function(angularPromiseButtonsProvider) {
    angularPromiseButtonsProvider.extendConfig({
        spinnerTpl: '<i class="fa fa-spinner" aria-hidden="true"></i>',
        disableBtn: true,
        btnLoadingClass: 'is-loading',
        addClassToCurrentBtnOnly: false,
        disableCurrentBtnOnly: false
    });
});

//toast 对话框
App.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        timeOut: 3000,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
    });
});

// http拦截器
App.config(function($httpProvider) {
    $httpProvider.interceptors.push([
        '$injector',
        function($injector) {
            return $injector.get('AuthInterceptor');
        }
    ]);
});

//监控路由变化
App.run(function($state, $rootScope, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //判断是否是不包括头部和侧栏的页面
        $rootScope.isOwnPage = _.contains(["login"], toState.name);
        //路由拦截，无权限则跳转到登录界面
        var nextRoute = toState.name;
        //console.log(nextRoute)
        if (!AuthService.isAuthorized(nextRoute) && !$rootScope.isOwnPage && toState.name != "dashboard") {
            event.preventDefault(); //阻止页面跳转\
            $state.go('login');
        }
    });
});
=======
var App, modules;
modules = ['ui.router', 'AdminService','AdminFilters','angularPromiseButtons', 'toastr','ngStorage', 'angular-confirm', 'ngTagsInput', 'naif.base64','ngUpload', 'ui.tree','ngProgress', 'ui.select'];
App = angular.module('daxmallAdmin', modules);

//路由配置
App.config(['$stateProvider', '$urlRouterProvider',"$locationProvider", function($stateProvider, $urlRouterProvider,$locationProvider) {
  $locationProvider.hashPrefix('');//新的ngRoute中默认的路由分割符号是#!，已经不是#了,这句话就是用回#。
  $urlRouterProvider.otherwise('/user/login');
  $stateProvider.state('dashboard', {
    url: "/",
    templateUrl: 'views/main.html'
  })
    .state('login', {
      url: '/user/login',
      templateUrl: 'views/user/login.html'
    })
//报表模块-》订单管理
    .state('orderManage', {
      url: '/reportManage/orderManage',
      templateUrl: 'views/reportManage/orderManage.html'
    })
}]);

//promise 按钮
App.config(['angularPromiseButtonsProvider', function(angularPromiseButtonsProvider) {
  angularPromiseButtonsProvider.extendConfig({
    spinnerTpl: '<i class="iconfont icon-jiazai" aria-hidden="true"></i>',
    disableBtn: true,
    btnLoadingClass: 'is-loading',
    addClassToCurrentBtnOnly: false,
    disableCurrentBtnOnly: false
  });
}]);

//toast 对话框
App.config(['toastrConfig', function(toastrConfig) {
  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,
    timeOut: 3000,
    newestOnTop: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body'
  });
}]);

// http拦截器
App.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
}]);

//监控路由变化
App.run(['$state', '$rootScope', 'AuthService', function($state, $rootScope, AuthService) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    //判断是否是不包括头部和侧栏的页面
    $rootScope.isOwnPage = _.contains(["login"], toState.name);
    //路由拦截，无权限则跳转到登录界面
    var nextRoute = toState.name;
    //console.log(nextRoute)
    if (!AuthService.isAuthorized(nextRoute) && !$rootScope.isOwnPage && toState.name != "dashboard") {
      event.preventDefault(); //阻止页面跳转\
      $state.go('login');
    }
  });
}]);
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
