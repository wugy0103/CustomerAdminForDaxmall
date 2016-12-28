/**
 * Created by wugy on 2016/12/28.
 */

'use strict';
App.controller('HeaderController', function($scope, $state, restful, Session, msgBus,$rootScope) {

    msgBus.onMsg('login', $scope, function() {
        $scope.init();
    });
    $scope.init = function(){
        $scope.userName = Session.$storage.userName;

    };
    $scope.init();
    $scope.logout = function() {
        restful.fetch($rootScope.api.logout,"POST",{userName:$scope.userName}).then(function(res) {
            console.log("logout",res)
            Session.destroy();
            console.log(Session);
            if(res.code == 2000){
                $state.go('login');
            }
        }, function(rej) {
            console.info(rej);
        });
    };
});
