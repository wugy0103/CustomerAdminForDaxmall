/*
 * @Author: wuguoyuan
 * @Date:   2016-11-10 11:23:56
 * @Last Modified by:   wuguoyuan
 * @Last Modified time: 2016-11-21 16:24:51
 */

'use strict';
App.controller("salesStatisticsController", function ($scope, ngProgressFactory, restful, $rootScope, $uibModal, toastr,$sce) {
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.data = {};
    //分页
    $scope.data.pageNum = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
    $scope.data.pageSize = $rootScope.PAGINATION_CONFIG.PAGESIZE;
    $scope.maxSize= $rootScope.PAGINATION_CONFIG.MAXSIZE;
    //url安全转义
    $scope.sce = {
        exportUrl: $sce.trustAsResourceUrl($rootScope.api.getLsSubCountexp),
    }
    //时间转时间戳
    $scope.OnSetTime = function () {
        $scope.data.paystartDate = new Date($scope.paystartDate).getTime();
        $scope.data.payendDate = new Date($scope.payendDate).getTime();
    }
    //加载
    $scope.query = function () {
        console.log("salesparam",$scope.data)
        $scope.progressbar.start();
        $scope.salesPromise = restful.fetch($rootScope.api.getLsSubCountlist, "POST", $scope.data).then(function(res) {
            console.log("sales",res)
            if(!!res.success){
                $scope.salesData = res;
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
