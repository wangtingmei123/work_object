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
            var urla='http://test.ecshop.com/h5/#/zx-list'
            if (toState.needAuth && !AppAuthenticationService.getToken()) {
                if(url.indexOf(urla)==-1){
                    $timeout(function () {
                        $rootScope.codesignin();
                    }, 1);
				}else{

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
            var urla='http://test.ecshop.com/h5/#/zx-list'
            if (toState.needAuth && !AppAuthenticationService.getToken()) {

                if(url.indexOf(urla)==-1){
                    $timeout(function () {
                        $rootScope.codesignin();
                    }, 1);
                }else{

                }
                // $timeout(function () {
                //     $rootScope.codesignin();
                // }, 1);
            }else{
                $state.go('home', {});

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