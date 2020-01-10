(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('teegon', {
				needAuth: true,
				url: '/teegon',
				title: "收银台",
				templateUrl: 'modules/teegon/teegon.html',
			});

	}

})();