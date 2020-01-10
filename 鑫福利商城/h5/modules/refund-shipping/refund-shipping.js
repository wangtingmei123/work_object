(function () {

    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('refund-shipping', {
                needAuth: true,
                url: '/refund-shipping/?order&order_goods_id',
                title: "申请退款",
                templateUrl: 'modules/refund-shipping/refund-shipping.html',
            });
    }

})();