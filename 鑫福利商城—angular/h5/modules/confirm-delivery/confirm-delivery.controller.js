(function () {

	'use strict';

	angular
		.module('app')
		.controller('ConfirmDeliveryController', ConfirmDeliveryController);

	ConfirmDeliveryController.$inject = ['$scope', '$http', '$location', '$state', '$stateParams'];

	function ConfirmDeliveryController($scope, $http, $location, $state, $stateParams) {

		var orderId = $stateParams.order;
		$scope.isDelivery = true;
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
				order_type : 0
			});
		}

		$scope.touchComment = function() {
			$state.go('order-review', {
				order: orderId
			});
		}
	}

})();