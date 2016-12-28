/**
 * Created by wugy on 2016/12/28.
 */
'use strict';
App.controller('UserLoginController', ['$scope', '$rootScope', '$state', 'AuthService', 'Session', 'msgBus', '$http', 'restful', '$interval',  '$location', function($scope, $rootScope, $state, AuthService, Session, msgBus, $http, restful, $interval,$location) {
    //��ʼʱ��֮ǰ��¼������Ϣ���
    $scope.load = function() {
        Session.destroy();
        //��ת��½
        if ($location.search().accessToken) {
            $scope.credentials.accessToken = $location.search().accessToken;
            Session.create($location.search().userName);
            msgBus.emitMsg("login");
            $state.go('dashboard');
        }
    };
    $scope.credentials = {};
    $scope.error = "";

    $scope.login = function(credentials) {
        console.log(credentials);
        $scope.loginPromise = AuthService.login(credentials).then(function(res) {
            console.log(res);
            if (res.code == 1) {
                console.log(res.msg);
                return;
            }
            if (res.data.userName) {
                console.log(Session);
                msgBus.emitMsg("login");
                $state.go('dashboard');
            } else {
                $scope.error = data.msg || "��ʱ";
            }
        });
    };


}]);