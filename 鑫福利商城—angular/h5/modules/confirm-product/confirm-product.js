(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {
        var random = Math.floor(Math.random()*100);
		$stateProvider
			.state('confirm-product', {
				needAuth: true,
				url: '/confirm-product',
				title: "确认订单",
				templateUrl: 'modules/confirm-product/confirm-product.html?v='+random,
			});
	}

})();