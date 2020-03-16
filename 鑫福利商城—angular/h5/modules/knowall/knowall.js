(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {
       var random = Math.floor(Math.random()*100);
		$stateProvider
			.state('knowall', {
				needAuth: true,
				url: '/knowall',
				title: "可用商品",
				templateUrl: 'modules/knowall/knowall.html?v='+random,
			});

	}

})();