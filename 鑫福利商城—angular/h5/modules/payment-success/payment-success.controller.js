(function () {

	'use strict';

	angular
		.module('app')
		.controller('PaymentSuccessController', PaymentSuccessController);

	PaymentSuccessController.$inject = ['$scope', '$http', '$location', '$state', '$stateParams'];

	function PaymentSuccessController($scope, $http, $location, $state, $stateParams) {

		var orderId = $stateParams.order;
		$scope.goOrder = _goOrder;
		function _goOrder(){
			$state.go('my-order', {
				tab: 'all'
			});
		}
		$scope.touchDetail = function () {
			$state.go('order-detail', {
				order: orderId,
				order_type : 0,
			});
		}

	}

})();