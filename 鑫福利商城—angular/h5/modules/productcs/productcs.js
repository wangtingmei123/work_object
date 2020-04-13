(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {
    var smd=Math.random()
		$stateProvider
			.state('productcs', {
				needAuth: true,
				url: '/productcs/?product',
				title: "商品详情",
				templateUrl: 'modules/productcs/productcs.html?v='+smd,
			});

	}

})();