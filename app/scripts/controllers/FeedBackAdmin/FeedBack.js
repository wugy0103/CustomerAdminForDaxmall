/*
 * @Author: 唐文雍
 * @Date:   2016-07-12 16:36:37
 * @Last Modified by:   Marte
 * @Last Modified time: 2016-11-07 17:48:04
 */
//问题反馈管理》

'use strict';
App.controller('FeedBackController', function($scope, $log, $rootScope, $http, $uibModal, restful, ngProgressFactory) {
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.data = {};
    $scope.identity = [{id:0, name:"考生"},{id:1, name:"考评员"}];
    $scope.question = [{id:1, name:"程序错误"},{id:2, name:"产品建议"}];
    //分页
    $scope.PageIndex = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
    $scope.PageSize = $rootScope.PAGINATION_CONFIG.PAGESIZE;
    $scope.maxSize = $rootScope.PAGINATION_CONFIG.MAXSIZE;
    $scope.pageChanged = function() {
        $scope.query();
    };
    $scope.setPage = function() {
        $scope.PageIndex = $scope.toPageNum;
        $scope.query();
    };
    //重置
    $scope.reset = function() {
        $scope.data = {};
        $scope.PageIndex = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
        $scope.toPageNum = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
    }
    //加载
    $scope.query = function() {
        $scope.progressbar.start();
        var params = {
            PageIndex: parseInt($scope.PageIndex),
            PageSize: parseInt($scope.PageSize),
            condition: $scope.data
        };
        console.info(params);
        $scope.FeedBackPromise = restful.fetch("/feedback/getFeedBackInfo", "POST", params).then(function(res) {
            console.info(res);
            if (res.success) {
                $scope.FeedBacks = res.data.rows;
                $scope.FeedBackCount = res.data.count;
            }
            $scope.progressbar.complete();
        });
    };
    $scope.query();

    $scope.beginDatepickerOptions = {
        showWeeks: false
    };
    $scope.endDatepickerOptions = {
        showWeeks: false
    };
    $scope.openBegintime = function() {
        $scope.BegintimeOpened.opened = true;
    };
    $scope.openEndtime = function() {
        $scope.EndtimeOpened.opened = true;
    };
    $scope.BegintimeOpened = {
        opened: false
    };
    $scope.EndtimeOpened = {
        opened: false
    };
    $scope.updateEndDate = function() {
        $scope.endDatepickerOptions.minDate = moment($scope.data.feedbackBegintime*1000).add(1, "days");
    }
    $scope.updateBeginDate = function() {
        $scope.beginDatepickerOptions.maxDate = moment($scope.data.feedbackEndtime*1000).subtract(1, "days");
    }
});


