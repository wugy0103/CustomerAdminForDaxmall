'use strict';

<<<<<<< HEAD
=======
/**
 * @ngdoc function
 * @name daxmallAdmin.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the daxmallAdmin
 */
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
App.controller('MainController',['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
  if (!AuthService.isAuthorized('dashboard')){
    $state.go('login');
  }
}]);
