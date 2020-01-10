(function () {

    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('refund-info', {
                needAuth: true,
                url: '/refund-info/?order&order_goods_id',
                title: "退款详情",
                templateUrl: 'modules/refund-info/refund-info.html?v=1',
            });
    }

})();