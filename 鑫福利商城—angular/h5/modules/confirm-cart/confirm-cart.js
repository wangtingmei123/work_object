(function () {

  'use strict';

  angular
  .module('app')
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config( $stateProvider, $urlRouterProvider ) {
      var random = Math.floor(Math.random()*100);
    $stateProvider
    .state('confirm-cart', {
      needAuth: true,
      url:'/confirm-cart',
      templateUrl: 'modules/confirm-cart/confirm-cart.html?v='+random,
    });

  }

})();
