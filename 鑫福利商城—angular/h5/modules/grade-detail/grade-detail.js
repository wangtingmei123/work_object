/**
 * Created by howiezhang on 16/10/19.
 */
(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('grade-detail', {
				needAuth: true,
				url: '/grade-detail?product_id&review_rate',
				title: "商品评价",
				templateUrl: 'modules/grade-detail/grade-detail.html',
			});

	}

})();