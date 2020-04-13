(function () {

	'use strict';

	angular.module('app')
		.run(run)
		.config(config);

	run.$inject = ['$rootScope', '$state', '$stateParams', '$location', '$window', '$timeout', 'AppAuthenticationService'];

	/* @ngInject */
	function run($rootScope, $state, $stateParams, $location, $window, $timeout, AppAuthenticationService) {

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

    //mm修改。。


		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var url=window.location.href
			var urla='zx-list'
			var urlb='productcs'

			console.log(url.indexOf(urlb))

			if(url.indexOf(urla)!=-1 ||url.indexOf(urlb)!=-1){
				return
			}else{
				if (toState.needAuth && !AppAuthenticationService.getToken()) {
					$timeout(function () {
						$rootScope.codesignin();
					}, 1);
				
	
				}
			}
           
		});

		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			$("html, body").animate({
				scrollTop: $("body").offset().top
			}, "fast", function () {});

			if (toState.title) {
				$window.document.title = toState.title;
			}
		});

		$rootScope.$on('$stateNotFound', function (event, toState, toParams, fromState, fromParams) {
            var url=window.location.href
			var urla='zx-list'
			var urlb='productcs'
			if(url.indexOf(urla)!=-1 ||url.indexOf(urlb)!=-1){
				return
			}else{

				if (toState.needAuth && !AppAuthenticationService.getToken()) {

					$timeout(function () {
						$rootScope.codesignin();
					}, 1);
				}else{
					$state.go('home', {});

				}
			}
		});

	}

	/**
	 * Config for the router
	 */
	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	/* @ngInject */
	function config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/main');

		$stateProvider
			.state('404', {
				url: '/404',
				templateUrl: 'app/templates/404.html'
			});
	}

})();