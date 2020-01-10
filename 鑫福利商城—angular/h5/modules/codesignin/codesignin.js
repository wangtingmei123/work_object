(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('codesignin', {
				needAuth: false,
				url: '/codesignin',
				title: "用户验证码登录",
				templateUrl: 'modules/codesignin/codesignin.html?v=8',
			});
	}

})();