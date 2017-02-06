/*
 * @Author: wuguoyuan
 * @Date:   2016-11-10 11:23:56
 * @Last Modified by:   wuguoyuan
 * @Last Modified time: 2016-11-21 16:24:51
 */

'use strict';
App.controller("userManageController", function ($scope, ngProgressFactory, restful, $rootScope, $uibModal, toastr,$sce) {
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.data = {};
    //分页
    $scope.data.pageNum = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
    $scope.data.pageSize = $rootScope.PAGINATION_CONFIG.PAGESIZE;
    $scope.maxSize= $rootScope.PAGINATION_CONFIG.MAXSIZE;
    //url安全转义
    $scope.sce = {
        exportUrl: $sce.trustAsResourceUrl($rootScope.api.getLsUserexportExcel),
    }
    //时间转时间戳
    $scope.OnSetTime = function () {
        $scope.data.lastLoginTimeStart = new Date($scope.lastLoginTimeStart).getTime();
        $scope.data.lastLoginTimeEnd = new Date($scope.lastLoginTimeEnd).getTime();
    }
    //加载
    $scope.query = function () {
        console.log("userparam",$scope.data)
        $scope.progressbar.start();
        $scope.userPromise = restful.fetch($rootScope.api.getLsUserlist, "POST", $scope.data).then(function(res) {
            console.log("user",res)
            if(!!res.success){
                $scope.userData = res;
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
