/*
 * @Author: wuguoyuan
 * @Date:   2016-11-10 11:23:56
 * @Last Modified by:   wuguoyuan
 * @Last Modified time: 2016-11-21 16:24:51
 */

'use strict';
App.controller("refundManageController", function ($scope, ngProgressFactory, restful, $rootScope, $uibModal, toastr,$sce) {
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.data = {};
    $scope.zhuangtai1 = [{
        stauts: "申请售后",
        status_id: "0"
    }, {
        stauts: "取消",
        status_id: "-2"
    }, {
        stauts: "不同意(初审拒绝)",
        status_id: "-1"
    }, {
        stauts: "同意售后(初审)",
        status_id: "1"
    }, {
        stauts: "已填写物流单号",
        status_id: "2"
    }, {
        stauts: "同意退款",
        status_id: "3"
    }, {
        stauts: "完成",
        status_id: "4"
    }];
    $scope.zhuangtai2 = [{
        stauts: "退货",
        status_id: "0"
    }, {
        stauts: "换货",
        status_id: "1"
    }, {
        stauts: "退款",
        status_id: "2"
    }];
    //分页
    $scope.data.pageNum = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
    $scope.data.pageSize = $rootScope.PAGINATION_CONFIG.PAGESIZE;
    $scope.maxSize= $rootScope.PAGINATION_CONFIG.MAXSIZE;
    //url安全转义
    $scope.sce = {
        exportUrl: $sce.trustAsResourceUrl($rootScope.api.getLsProdReturnexp),
    }
    //加载
    $scope.query = function () {
        $scope.data.startDate = new Date($scope.data.startDate).setHours("00", "00", "00");
        $scope.data.endDate = new Date($scope.data.endDate).setHours("23", "59", "59");
        $scope.data.finishPayStartDate = new Date($scope.data.finishPayStartDate).setHours("00", "00", "00");
        $scope.data.finishPayEndDate = new Date($scope.data.finishPayEndDate).setHours("23", "59", "59");
        $scope.progressbar.start();
        $scope.refundPromise = restful.fetch($rootScope.api.getLsProdReturnlist, "POST", $scope.data).then(function(res) {
            console.log("refundparam",$scope.data)
            console.log("refund",res)
            if(!!res.success){
                $scope.refundData = res;
            }else {
                toastr.error(res.message,"服务器错误：");
            }
            $scope.progressbar.complete();
        }, function(rej) {
            console.log(rej);
            $scope.progressbar.complete();
            toastr.error(rej,"请求失败：");
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
        $scope.startDateOpened.opened = true;
    };
    //点击open2的时候
    $scope.open2 = function () {
        $scope.endDateOpened.opened = true;
    };
    //点击open3的时候
    $scope.open3 = function () {
        $scope.finishPayStartDateOpened.opened = true;
    };
    //点击open4的时候
    $scope.open4 = function () {
        debugger
        $scope.finishPayEndDateOpened.opened = true;
    };
    $scope.startDateOpened = {
        opened: false
    };
    $scope.endDateOpened = {
        opened: false
    };
    $scope.finishPayStartDateOpened = {
        opened: false
    };
    $scope.finishPayEndDateOpened = {
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
