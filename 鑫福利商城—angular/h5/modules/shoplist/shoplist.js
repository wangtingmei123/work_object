(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('shoplist', {
				needAuth: true,
				url: '/shoplist/?account',
				title: "可用商品",
				templateUrl: 'modules/shoplist/shoplist.html?v=3',
			});

	}

})();