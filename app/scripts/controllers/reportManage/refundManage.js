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
    //时间转时间戳
    $scope.OnSetTime = function () {
        $scope.data.startDate = new Date($scope.startDate).getTime();
        $scope.data.endDate = new Date($scope.endDate).getTime();
        $scope.data.finishPayStartDate = new Date($scope.finishPayStartDate).getTime();
        $scope.data.finishPayEndDate = new Date($scope.finishPayEndDate).getTime();
    }
    //加载
    $scope.query = function () {
        $scope.progressbar.start();
        console.log("refundparam",$scope.data)
        $scope.refundPromise = restful.fetch($rootScope.api.getLsProdReturnlist, "POST", $scope.data).then(function(res) {
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
            toastr.error(rej.status+"("+rej.statusText+")","请求失败：");
        });
    };
    $scope.query();
    //重置
    $scope.reset = function () {
        $scope.data = {};
        $scope.startDate=$scope.data.startDate;
        $scope.endDate=$scope.data.startDate;
        $scope.finishPayStartDate=$scope.data.startDate;
        $scope.finishPayEndDate=$scope.data.startDate;
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

});
