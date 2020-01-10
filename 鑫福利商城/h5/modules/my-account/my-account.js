(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('my-account', {
				needAuth: true,
				url: '/my-account?tab',
				title: "我的余额",
				templateUrl: 'modules/my-account/my-account.html?v=1',
			});

	}

})();