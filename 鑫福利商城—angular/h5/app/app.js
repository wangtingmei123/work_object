(function () {

	'use strict';

	angular
		.module('app', [
			// 'ngAnimate',
			'ngAria',
			'ngCookies',
			'ngMessages',
			'ngResource',
			'ngSanitize',
			'ngStorage',
			'ui.router',
			'ui.router.util',
			'angularLazyImg',
			'infinite-scroll',
			'angular-cache',
			'angular-loading-bar',
			'ngToast',
			'ngFileUpload'
		]);

	angular
		.module('app')
		.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$locationProvider', '$sceDelegateProvider', 'cfpLoadingBarProvider', 'ngToastProvider',
			function ($controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider, $sceDelegateProvider, cfpLoadingBarProvider, ngToastProvider) {
				// lazy controller, directive and service
				app.controller = $controllerProvider.register;
				app.directive = $compileProvider.directive;
				app.filter = $filterProvider.register;
				app.factory = $provide.factory;
				app.service = $provide.service;
				app.constant = $provide.constant;
				app.value = $provide.value;

				$sceDelegateProvider.resourceUrlWhitelist([
					// Allow same origin resource loads.
					'self',
					// Allow loading from our assets domain.  Notice the difference between * and **.
					GLOBAL_CONFIG.API_HOST + '/**'
				]);

				cfpLoadingBarProvider.includeSpinner = false;

				ngToastProvider.configure({
					horizontalPosition: 'center',
					verticalPosition: 'center',
					maxNumber: 1,
					animation: 'fade' // or 'fade'
				});

			}
		]);


	//设置页面的添加点击时间
	/*
	angular
		.module('app').config(['$provide', function ($provide) {
		$provide.decorator('ngClickDirective',['$delegate','$timeout', function ($delegate,$timeout) {
			var original = $delegate[0].compile;
			var delay = 2000;   //设置间隔时间
			$delegate[0].compile = function (element, attrs, transclude) {

				var disabled = false;
				function onClick(evt) {
					if (disabled) {
						evt.preventDefault();
						evt.stopImmediatePropagation();
					} else {
						disabled = true;
						$timeout(function () { disabled = false; }, delay, false);
					}
				}
				//   scope.$on('$destroy', function () { iElement.off('click', onClick); });
				element.on('click', onClick);

				return original(element, attrs, transclude);
			};
			return $delegate;
		}]);
	}]);
	*/

	/**
	 * A clone of the Node.js util.inherits() function. This will require
	 * browser support for the ES5 Object.create() method.
	 *
	 * @param {Function} ctor
	 *   The child constructor.
	 * @param {Function} superCtor
	 *   The parent constructor.
	 */
	angular.inherits = function (ctor, superCtor) {
		ctor.super_ = superCtor;
		ctor.prototype = Object.create(superCtor.prototype, {
			constructor: {
				value: ctor,
				enumerable: false
			}
		});
	};

})();