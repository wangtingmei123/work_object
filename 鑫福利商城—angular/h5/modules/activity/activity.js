(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('activity', {
				needAuth: true,
				url: '/activity?act_id',
				title: "活动",
				templateUrl: 'modules/activity/activity.html',
			});

	}

})();