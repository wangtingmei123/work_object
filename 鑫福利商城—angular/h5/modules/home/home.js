(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('index', {
				needAuth: true,
				url: '?token',
				title: "首页",
				templateUrl: 'modules/home/home.html?v=14'
			});


		$stateProvider
			.state('home', {
				needAuth: true,
				url: '/home',
				title: "首页",
				templateUrl: 'modules/home/home.html?v=15',
			});

	}

})();