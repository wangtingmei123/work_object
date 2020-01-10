(function () {

	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {
        var random = Math.floor(Math.random()*100);
		$stateProvider
			.state('address-edit', {
				needAuth: true,
				url: '/address-edit',
				title: '收货地址',
				templateUrl: 'modules/address-edit/address-edit.html?v='+random,
			});

	}

})();