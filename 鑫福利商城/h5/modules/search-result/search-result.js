(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('search-result', {
				needAuth: true,
				url: '/search-result/?keyword&sortKey&sortValue&category&navTitle&navStyle&brand_id&brand_type&category_id1&category_id2',
				title: "列表页",
				templateUrl: 'modules/search-result/search-result.html?v=11'
			});

	}

})();