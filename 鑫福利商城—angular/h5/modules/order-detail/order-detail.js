(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('order-detail', {
				needAuth: true,
				url: '/order-detail/?order&order_type',
				title: "订单详情",
				templateUrl: 'modules/order-detail/order-detail.html?v=10',
			});
	}

})();