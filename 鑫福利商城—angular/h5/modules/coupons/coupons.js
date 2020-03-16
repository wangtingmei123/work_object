(function () {

    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('coupons', {
                needAuth: true,
                url: '/coupons',
                title: "优惠券",
                templateUrl: 'modules/coupons/coupons.html?v=5',
            });

    }

})();