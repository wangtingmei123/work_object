(function () {

    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('zx-list', {
                needAuth: true,
                url: '/zx-list',
                title: "列表页",
                templateUrl: 'modules/zx-list/zx-list.html?v=11'
            });

    }

})();