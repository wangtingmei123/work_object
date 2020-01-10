(function () {

    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('logistics', {
                needAuth: true,
                url: '/logistics?order_goods_id&region&address',
                title: "查看物流",
                templateUrl: 'modules/logistics/logistics.html?v=5',
            });

    }

})();