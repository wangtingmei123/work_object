(function () {

    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('order-refund', {
                needAuth: true,
                url: '/order-refund/?order&order_goods_id',
                title: "申请退款",
                templateUrl: 'modules/order-refund/order-refund.html?v=8',
            });
    }

})();