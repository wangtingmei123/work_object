(function () {

	'use strict';

	angular
		.module('app')
		.controller('MyOrderController', MyOrderController);

	MyOrderController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM', 'PaymentModel', 'MyOrderModel', 'OrderExpressModel'];

	function MyOrderController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM, PaymentModel, MyOrderModel, OrderExpressModel) {

		$scope.TAB_ALL = 0;
		$scope.TAB_CREATED = 1;
		$scope.TAB_PAID = 2;
		$scope.TAB_DELIVERING = 3;
		//$scope.TAB_DELIVERIED = 4;
		$scope.TAB_FINISH = 4;

        $scope.refundTipshow = false;
		$scope.currentTab = $scope.TAB_ALL;

		$scope.cancellingOrder = null;
		$scope.showDialog = false;

		$scope.myOrderModel = MyOrderModel;
		$scope.paymentModel = PaymentModel;
		$scope.orderExpressModel = OrderExpressModel;

		if ($stateParams.tab == 'all') {
			$scope.currentTab = $scope.TAB_ALL;
			$scope.myOrderModel.status = null;
		} else if ($stateParams.tab == 'created') {
			$scope.currentTab = $scope.TAB_CREATED;
			$scope.myOrderModel.status = ENUM.ORDER_STATUS.CREATED;
		} else if ($stateParams.tab == 'paid') {
			$scope.currentTab = $scope.TAB_PAID;
			$scope.myOrderModel.status = ENUM.ORDER_STATUS.PAID;
		} else if ($stateParams.tab == 'delivering') {
			$scope.currentTab = $scope.TAB_DELIVERING;
			$scope.myOrderModel.status = ENUM.ORDER_STATUS.DELIVERING;
		} else if ($stateParams.tab == 'delivered') {
			//$scope.currentTab = $scope.TAB_DELIVERIED;
			//$scope.myOrderModel.status = ENUM.ORDER_STATUS.DELIVERIED;
		} else if ($stateParams.tab == 'finished') {
			$scope.currentTab = $scope.TAB_FINISH;
			$scope.myOrderModel.status = ENUM.ORDER_STATUS.FINISHED;
		} else {
			$scope.currentTab = $scope.TAB_ALL;
			$scope.myOrderModel.status = null;
		}

		$scope.touchTabAll = _touchTabAll;//全部订单
		$scope.touchTabCreated = _touchTabCreated;//待支付
		$scope.touchTabPaid = _touchTabPaid;//待发货
		$scope.touchTabDelivering = _touchTabDelivering;//待收货
		//$scope.touchTabDeliveried = _touchTabDeliveried;
		$scope.touchTabFinish = _touchTabFinish;//已完成


		$scope.touchDialogCancel = _touchDialogCancel;
		$scope.touchDialogConfirm = _touchDialogConfirm;

		$scope.touchOrder = _touchOrder;
		$scope.touchPay = _touchPay;
		$scope.touchCancel = _touchCancel;
		$scope.touchConfirm = _touchConfirm;
		$scope.touchExpress = _touchExpress;
		$scope.touchComment = _touchComment;
		$scope.touchToRefund = _touchToRefund;
        $scope.torefundTip = _torefundTip;
        $scope.toknowall =  _toknowall;
        $scope.touchToRefundInfo = _touchToRefundInfo;
        $scope.touchlogisitics = _touchlogisitics;

        function _touchToRefundInfo(orderId ,order_goods_id) {
            $state.go('refund-info', {
                order: orderId,
                order_goods_id : order_goods_id

            });
        }


        function _torefundTip($event){
            $event.stopPropagation();
            $scope.refundTipshow=!$scope.refundTipshow;
		}

        function _toknowall(){
            $state.go('knowall')
        }

     //  查看物流
     function _touchlogisitics(region,address,order_goods_id,$event){
         $event.stopPropagation();
         $state.go('logistics', {
             region: region,
             address: address,
             order_goods_id: order_goods_id,
         });
	 }

		function _touchTabAll() {
			if ($scope.currentTab != $scope.TAB_ALL) {
				$scope.currentTab = $scope.TAB_ALL;
				$scope.myOrderModel.status = null;
				$scope.myOrderModel.reload();
			}
		}

		function _touchTabCreated() {
			if ($scope.currentTab != $scope.TAB_CREATED) {
				$scope.currentTab = $scope.TAB_CREATED;
				$scope.myOrderModel.status = ENUM.ORDER_STATUS.CREATED;
				$scope.myOrderModel.reload();
			}
		}

		function _touchTabPaid() {
			if ($scope.currentTab != $scope.TAB_PAID) {
				$scope.currentTab = $scope.TAB_PAID;
				$scope.myOrderModel.status = ENUM.ORDER_STATUS.PAID;
				$scope.myOrderModel.reload();
			}
		}

		function _touchTabDelivering() {
			if ($scope.currentTab != $scope.TAB_DELIVERING) {
				$scope.currentTab = $scope.TAB_DELIVERING;
				$scope.myOrderModel.status = ENUM.ORDER_STATUS.DELIVERING;
				$scope.myOrderModel.reload();
			}
		}

		//已完成订单
		function _touchTabFinish() {
			if ($scope.currentTab != $scope.TAB_FINISH) {
				$scope.currentTab = $scope.TAB_FINISH;
				$scope.myOrderModel.status = ENUM.ORDER_STATUS.FINISHED;
				$scope.myOrderModel.reload();
			}
		}

		function _touchOrder(order,order_type) {
			$state.go('order-detail', {
				order: order.id,
				order_type:order_type
			});
		}

		
		//确认收货页面
		function _touchConfirm(orderId ,order_goods_id) {
			
			API.order.confirm({
				order: orderId,
				order_goods_id: order_goods_id,
			}).then(function (order) {
				$scope.toast('确认成功');
				$state.go('confirm-delivery', {
					order: orderId,
					order_type : 0
				});
				//_reload();
			});
		}
		
		//跳转到订单退款页面
		function _touchToRefund(orderId ,order_goods_id,$event) {
            $event.stopPropagation();
			$state.go('order-refund', {
				order: orderId,
				order_goods_id : order_goods_id
			});
		}
		
		function _touchExpress(order) {
			$scope.orderExpressModel.clear();
			$scope.orderExpressModel.order = order;

			$state.go('order-express', {
				order: order.id
			});
		}

		function _touchComment(order,goods,$event) {
			$event.stopPropagation();
			$state.go('order-review', {
				order: order.id,
				order_type :4,
                goods_id :goods.id
			});
		}

		function _touchPay(order) {
			if (order) {
				$scope.paymentModel.clear();
				$scope.paymentModel.order = order;
				$state.go('payment', {});
			}
		}

		function _touchCancel(order) {
			$scope.cancellingOrder = order;
			$scope.showDialog = true;
		}

		function _touchDialogCancel() {
			$scope.cancellingOrder = null;
			$scope.showDialog = false;
		}

		function _touchDialogConfirm() {
			API.order.cancel({
				order: $scope.cancellingOrder.id,
				reason: 1
			}).then(function (order) {
				$scope.myOrderModel.reload();
				$scope.cancellingOrder = null;
				$scope.showDialog = false;
			});
		}

		$scope.myOrderModel.reload();
	}

})();