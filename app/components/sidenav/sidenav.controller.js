<<<<<<< HEAD
/*
 * @Author: 唐文雍
 * @Date:   2016-05-09 20:52:27
 * @Last Modified by:   唐文雍
 * @Last Modified time: 2016-07-07 15:56:26
=======
/**
 * Created by wugy on 2016/12/28.
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
 */

'use strict';
App.controller('SideNavController', function($scope, Session, msgBus) {

    $scope.init = function(){
        $scope.refuseRoute = Session.$storage.refuseRoute;
<<<<<<< HEAD
=======
        $scope.userName = Session.$storage.userName;
        // 获取侧边栏
        console.log($rootScope.api.getSideNav+$rootScope.developerMode);
        /*$scope.sideNavPromise = restful.fetch($rootScope.api.getSideNav+$rootScope.developerMode, "POST").then(function (res) {
            console.log("sideNav:",res);
            if(res.code == 2000){
                $scope.sideNavList = res.data[0].subNav;
            }else{
                toastr.error('获取侧边栏失败！', res.msg);
            }
        }, function (rej) {
            console.info(rej);
        });*/
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
    };
    $scope.init();
    $scope.show = function(route){
        return $scope.refuseRoute.indexOf(route)==-1;
    };
    msgBus.onMsg('login', $scope, function() {
        $scope.init();
    });
});
