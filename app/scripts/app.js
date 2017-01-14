/**
 * Created by wugy on 2016/12/28.
 */

'use strict';
var App, modules;
modules = ['ui.router', 'ngSanitize', 'ngProgress', 'ui.select', 'angularPromiseButtons', 'AdminFilters','AdminService', "ui.bootstrap", 'ngStorage', 'angular-confirm', 'toastr'];//"cgBusy", , 'ui.bootstrap.datetimepicker'删掉
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
        //报表模块-》用户管理
        .state('userManage', {
            url: '/reportManage/userManage',
            templateUrl: 'views/reportManage/userManage.html'
        })
        //报表模块-》退货退款
        .state('refundManage', {
            url: '/reportManage/refundManage',
            templateUrl: 'views/reportManage/refundManage.html'
        })
        //报表模块-》销售统计
        .state('salesStatistics', {
            url: '/reportManage/salesStatistics',
            templateUrl: 'views/reportManage/salesStatistics.html'
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
