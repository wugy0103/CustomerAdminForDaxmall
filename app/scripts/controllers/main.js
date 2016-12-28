'use strict';

/**
 * @ngdoc function
 * @name daxmallAdmin.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the daxmallAdmin
 */
//App.controller('MainController', function () {
//    this.awesomeThings = [
//      'HTML5 Boilerplate',
//      'AngularJS',
//      'Karma'
//    ];
//  });
App.controller('MainController',['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
  if (!AuthService.isAuthorized('dashboard')){
    $state.go('login');
  }
}]);
