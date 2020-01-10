(function () {

    'use strict';

    angular
        .module('app')
        .controller('RefundInfoController', RefundInfoController);

    RefundInfoController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM'];

    function RefundInfoController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM) {

        var orderId = $stateParams.order;
        var orderGoodsId = $stateParams.order_goods_id;

        $scope.order_goods_info = {};
        $scope.order_info = {};
        $scope.refund_images = {};
        $scope.refund_logs = {};

        $scope.touchCancel = _touchCancel;
        $scope.touchSave = _touchSave;
        $scope.touchToRefundShipping = _touchToRefundShipping;

        //跳转到退款发货信息页面
        function _touchToRefundShipping() {
            $state.go('refund-shipping', {
                order: orderId,
                order_goods_id : orderGoodsId
            });
        }


        function _touchCancel(){
            $scope.goBack();
        }

        function _touchSave() {

        }

        function _orderGoodsInfo() {
            API.order.orderGoodsInfo({
                order: orderId,
                order_goods_id : orderGoodsId
            }).then(function (data) {

                $scope.order_goods_info = data.order_goods_info;
                $scope.order_info = data.order_info;
                $scope.refund_images = data.refund_images;
                $scope.refund_logs = data.refund_logs;

                if(ENUM.ORDER_GOODS_STATUS.RETURNING || ENUM.ORDER_GOODS_STATUS.RETURNED){

                    if(data.order_goods_info.order_status == ENUM.ORDER_GOODS_STATUS.DELIVERIED){
                        var $body = angular.element('body');
                        document.title = '退货详情';
                        var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
                            $timeout(function() {
                                $iframe.off('load').remove();
                            }, 0);
                        }).appendTo($body);
                    }
                }

            });
        }

        _orderGoodsInfo();

    }

})();