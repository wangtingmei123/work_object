(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {
    var smd=Math.random()
		$stateProvider
			.state('product', {
				needAuth: true,
				url: '/product/?product',
				title: "商品详情",
				templateUrl: 'modules/product/product.html?v='+smd,
			});

	}

})();