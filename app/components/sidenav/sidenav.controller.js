/*
 * @Author: 唐文雍
 * @Date:   2016-05-09 20:52:27
 * @Last Modified by:   snoob
 * @Last Modified time: 2016-11-18 16:32:05
 */

'use strict';
App.controller('SideNavController', function($scope, Session, msgBus,restful,toastr,$rootScope) {

    $scope.init = function(){
        $scope.refuseRoute = Session.$storage.refuseRoute;
        $scope.userName = Session.$storage.userName;
        // 获取侧边栏
        console.log($rootScope.api.getSideNav+$rootScope.developerMode);
        $scope.sideNavPromise = restful.fetch($rootScope.api.getSideNav+$rootScope.developerMode, "POST").then(function (res) {
            console.log("sideNav:",res);
            if(res.code == 2000){
                $scope.sideNavList = res.data[0].subNav;
            }else{
                toastr.error('获取侧边栏失败！', res.msg);
            }
        }, function (rej) {
            console.info(rej);
        });
    };
    $scope.init();
    $scope.show = function(route){
        return $scope.refuseRoute.indexOf(route)==-1;
    };
    msgBus.onMsg('login', $scope, function() {
        $scope.init();
    });
});
