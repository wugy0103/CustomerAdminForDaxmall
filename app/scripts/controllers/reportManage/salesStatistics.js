/*
 * @Author: wuguoyuan
 * @Date:   2016-11-10 11:23:56
 * @Last Modified by:   wuguoyuan
 * @Last Modified time: 2016-11-21 16:24:51
 */

'use strict';
App.controller("salesStatisticsController", function ($scope, ngProgressFactory, restful, $rootScope, $uibModal, toastr,$http) {
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.data = {};
    //分页
    $scope.data.pageNum = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
    $scope.data.pageSize = $rootScope.PAGINATION_CONFIG.PAGESIZE;
    //加载
    $scope.query = function () {
        $scope.data.paystartDate = new Date($scope.data.paystartDate).setHours("00", "00", "00");
        $scope.data.payendDate = new Date($scope.data.payendDate).setHours("23", "59", "59");
        $scope.progressbar.start();
        $scope.salesPromise = restful.fetch($rootScope.api.getLsSubCountlist, "POST", $scope.data).then(function(res) {
            console.log("salesparam",$scope.data)
            console.log("sales",res)
            if(!!res.success){
                $scope.salesData = res;
            }else {
                toastr.error(res.message);
            }
            $scope.progressbar.complete();

        }, function(rej) {
            console.log(rej);
            $scope.progressbar.complete();
            toastr.error(rej);
        });
    };
    $scope.query();
    //重置
    $scope.reset = function () {
        $scope.data = {};
        $scope.toPageNum = 1;
        $scope.data.pageNum = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
        $scope.data.pageSize = $rootScope.PAGINATION_CONFIG.PAGESIZE;
    }
    // //搜索
    $scope.search = function () {
        $scope.query();
    }
    $scope.pageChanged = function () {
        $scope.query();
    };
    $scope.setPage = function () {
        $scope.data.pageNum = $scope.toPageNum;
        $scope.query();
    };
    //-----------------时间控件 start-----------------------
    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: false,
    };

    $scope.dateOptions = {
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };
    $scope.toggleMin();
    //点击open1的时候
    $scope.open1 = function () {
        $scope.paystartDateOpened.opened = true;
    };
    //点击open2的时候
    $scope.open2 = function () {
        $scope.payendDateOpened.opened = true;
    };
    $scope.paystartDateOpened = {
        opened: false
    };
    $scope.payendDateOpened = {
        opened: false
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd'];
    $scope.format = $scope.formats[4];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }
        return '';
    }

    //-----------------时间控件  end-----------------------
});
