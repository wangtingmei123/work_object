(function () {

    'use strict';

    angular
        .module('app')
        .controller('RefundShippingController', RefundShippingController);

    RefundShippingController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM'];

    function RefundShippingController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM) {

        var orderId = $stateParams.order;
        var orderGoodsId = $stateParams.order_goods_id;

        $scope.touchCancel = _touchCancel;
        $scope.touchSave = _touchSave;

        function _touchCancel(){
            $scope.goBack();
        }

        function _touchSave() {
            if($scope.shipping_name == ''){
                $scope.toast('请填写快递公司名称');
                return;
            }
            if($scope.shipping_sn == ''){
                $scope.toast('请填写运单号');
                return;
            }

            var params = {};
            params.order = orderId;
            params.order_goods_id = orderGoodsId;
            params.shipping_name = $scope.shipping_name;
            params.shipping_sn = $scope.shipping_sn;

            API.order.refundShipping(params).then(function (data) {
                if(!data){
                    $scope.toast('保存退货运单信息失败');
                } else {
                    //跳转到退款详情页面
                    $state.go('refund-info', {
                        order: orderId,
                        order_goods_id : orderGoodsId
                    });
                }
            });
            return '';
        }

    }

})();