(function () {

	'use strict';

	angular
		.module('app')
		.controller('ReviewSuccessController', ReviewSuccessController);

	ReviewSuccessController.$inject = ['$scope', '$http', '$location', '$state', '$stateParams'];

	function ReviewSuccessController($scope, $http, $location, $state, $stateParams) {

		var orderId = $stateParams.order;
		$scope.goOrder = _goOrder;
		function _goOrder(){
			$state.go('my-order', {
				tab: 'all'
			});
		}

		$scope.reason = $stateParams.reason;
		$scope.touchToHome = function () {
			$state.go('home', {});
		}
	}
})();