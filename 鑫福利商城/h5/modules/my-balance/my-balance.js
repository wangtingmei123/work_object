(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('my-balance', {
				needAuth: true,
				url: '/my-balance',
				title: "我的账户",
				templateUrl: 'modules/my-balance/my-balance.html?v=3',
			});

	}

})();