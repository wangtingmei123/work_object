(function () {

	'use strict';

	angular
		.module('app')
		.controller('PaymentFailedController', PaymentFailedController);

	PaymentFailedController.$inject = ['$scope', '$http', '$location', '$state', '$stateParams'];

	function PaymentFailedController($scope, $http, $location, $state, $stateParams) {

		var orderId = $stateParams.order;

		$scope.goOrder = _goOrder;
		function _goOrder(){
			$state.go('my-order', {
				tab: 'all'
			});
		}

		$scope.reason = $stateParams.reason;
		$scope.touchDetail = function () {
			$state.go('order-detail', {
				order: orderId,
				order_type : 0,
			});
		}

	}

})();