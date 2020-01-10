(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('brand-all', {
				needAuth: true,
				url: '/brand-all',
				title: "全部品牌",
				templateUrl: 'modules/brand-all/brand-all.html?v=5',
			});

	}

})();