/**
 * Created by howiezhang on 16/10/6.
 */
(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('article', {
				needAuth: true,
				url: '/article?id&title',
				title: "使用帮助",
				templateUrl: 'modules/article/article.html',
			});

	}

})();