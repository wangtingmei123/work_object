(function () {

	'use strict';

	angular
		.module('app')
		.controller('OrderDetailController', OrderDetailController);

	OrderDetailController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM', 'PaymentModel', 'OrderExpressModel'];

	function OrderDetailController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM, PaymentModel, OrderExpressModel) {

		var orderId = $stateParams.order;
		var orderType = $stateParams.order_type;

		$scope.order = {
			id: orderId,
			order_type:orderType
		};

		$scope.isLoading = false;
		$scope.isLoaded = false;
		$scope.is_yd_h = false;
		$scope.is_yd = false;
		$scope.touchPay = _touchPay;
		$scope.touchCancel = _touchCancel;
		$scope.touchConfirm = _touchConfirm;
		$scope.touchExpress = _touchExpress;
		$scope.touchComment = _touchComment;
		$scope.touchProduct = _touchProduct;
		$scope.touchToRefund = _touchToRefund;
		$scope.touchToRefundInfo = _touchToRefundInfo;
		$scope.bookcon = null;


		$scope.showDialog = false;
		$scope.touchDialogCancel = _touchDialogCancel;
		$scope.touchDialogConfirm = _touchDialogConfirm;

		$scope.paymentModel = PaymentModel;
		$scope.orderExpressModel = OrderExpressModel;

		function _touchPay() {
			if (!$scope.order)
				return;

			$scope.paymentModel.clear();
			$scope.paymentModel.order = $scope.order;
			$state.go('payment', {});
		}

		function _touchCancel() {
			if (!$scope.order)
				return;

			$scope.showDialog = true;
		}

		function _touchDialogCancel() {
			$scope.showDialog = false;
		}

		function _touchDialogConfirm() {
			API.order.cancel({
				order: orderId,
				reason: 1
			}).then(function (order) {
				$scope.toast('取消成功');
				$scope.showDialog = false;
				//_reload();
			});
		}

		//确认收货页面
		function _touchConfirm(order_goods_id) {
			API.order.confirm({
				order: orderId,
				order_goods_id: order_goods_id,
			}).then(function (order) {
				$scope.toast('确认成功');
				$state.go('order-detail', {
					order: orderId,
					order_type : 0
				});
				//_reload();
			});
		}

		function _touchExpress() {
			$scope.orderExpressModel.clear();
			$scope.orderExpressModel.order = $scope.order;

			$state.go('order-express', {
				order: $scope.order.id
			});
		}


		//跳转到订单退款页面
		function _touchToRefund(order_goods_id) {
			$state.go('order-refund', {
				order: $scope.order.id,
				order_goods_id : order_goods_id
			});
		}
		//跳转到退款详情页面
		function _touchToRefundInfo(order_goods_id) {
			$state.go('refund-info', {
				order: $scope.order.id,
				order_goods_id : order_goods_id
			});
		}


		function _touchComment(goods_id) {
			$state.go('order-review', {
				order: $scope.order.id,
				order_type :orderType,
				goods_id :goods_id
			});
		}

		function _touchProduct(product) {
			$state.go('product', {
				product: product.id
			});
		}

		function _reload() {
			$scope.isLoading = true;
			$scope.isLoaded = false;
			API.order.get({
				order: orderId,
				order_type :orderType
			}).then(function (order) {
				$scope.order = order;
				var promos = order.promos;
				$scope.promos = [];
				//商品状态导致了订单展示错误，直接返回上级页面
				if(order.goods.length <= 0){
					$scope.goBack();
				}


		//场馆预定

				var products=ENUM.PRODUCTS;
				for(let c=0;c<products.length;c++){
					if(order.goods[0].cat_id==products[c]){
						$scope.is_yd = true;
						API.order.bookcon({
							order_id : orderId
						}).then(function(bookcon){

							$scope.bookcon=bookcon.data;
						})
						var products1=ENUM.PRODUCTS1;
						var products2=ENUM.PRODUCTS2;
						for(let a=0;a<products1.length;a++){
							if(order.goods[0].cat_id==products1[a]){
								$scope.is_yd_h = true;
							}
						}
						for(let b=0;b<products2.length;b++){
							if(order.goods[0].cat_id==products2[b]){
								$scope.is_yd_h = false;
							}
						}

					}
				}



				// score:积分  cashgift:红包  preferential:优惠金额(折扣价格)  goods_reduction:商品减免   order_reduction:(订单减免)   coupon_reduction:(优惠券减免)
				for (var key in promos) {
					if (promos[key].promo == 'score') {
						promos[key].name = "积分";
					} else if (promos[key].promo == 'cashgift') {
						promos[key].name = "红包";
					} else if (promos[key].promo == 'preferential') {
						promos[key].name = "优惠金额";
					} else if (promos[key].promo == 'goods_reduction') {
						promos[key].name = "商品减免";
					} else if (promos[key].promo == 'order_reduction') {
						promos[key].name = "订单减免";
					} else if (promos[key].promo == 'coupon_reduction') {
						promos[key].name = "优惠券减免";
					}
				}

				$scope.promos = promos;
				$scope.isLoading = false;
				$scope.isLoaded = true;
			});




		}

		_reload();
	}

})();