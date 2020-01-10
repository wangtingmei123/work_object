(function ()  {

    'use strict';

    angular
        .module('app')
        .controller('OrderRefundController', OrderRefundController);

    OrderRefundController.$inject = ['$scope','$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM','Upload'];

    function OrderRefundController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM,Upload) {
        // $rootScope.toast('图片上传失败,请重试');
        var orderId = $stateParams.order;
        var orderGoodsId = $stateParams.order_goods_id;

        $scope.order_goods_info = {};
        $scope.order_info = {};

        $scope.touchCancel = _touchCancel;
        $scope.touchSave = _touchSave;

        $scope.refundReason = '';
        $scope.refundReasonName = '请选择';
        $scope.touchRetundReasonPickerShow = _touchRetundReasonPickerShow;
        $scope.touchRefundReasonPicker = _touchRefundReasonPicker;
        $scope.touchRefundReasonPicker1 = _touchRefundReasonPicker1;
        $scope.touchRefundReasonPickerCancel = _touchRefundReasonPickerCancel;
        $scope.pickerRefundReasonData = {1:"不想要了",3:"下错单了",4:"其他"};
        $scope.pickerRefundReasonData1 = {5:"尺码不合适",6:"商品质量问题",7:"买错了",8:"未收到货",9:"不想要了",10:"商家发错货",11:"图片与实物不符",12:"其他"};
        $scope.showRefundReasonPicker = false;
        $scope.nameTipshowa = false;
        $scope.torefundTipa = _torefundTipa;
        $scope.tip_a = '';
        function _torefundTipa() {
            $scope.nameTipshowa = false;
        }
        $scope.refund_image_list = [{image:'','position':'正面'},
                                     {image:'','position':'背面'},
                                     //{image:'','position':'侧面'},
                                     //{image:'','position':'底部'},
                                     {image:'','position':'包装'},
                                     //{image:'','position':'吊牌'},
                                     //{image:'','position':'整体'}
                                   ];
		
		
        //上传图片
        $scope.upload = function (file, index) {
            if(!file){
                return '';
            }

            /* 压缩图片上传 */
            lrz(file[0], {
                width: 800, //设置压缩参数
                //quality : 0.5,
                //fieldName :'file',
            }).then(function (rst) {
                /* 处理成功后执行 */
                var img = new Image();
                img.src = rst.base64;
                Upload.upload({
                     url: GLOBAL_CONFIG.API_HOST+'/v2/ecapi.order.imageUpload',
                    data: {
                        refund_image : rst.base64,
                        username:'test_mwq',
                        type:'refund',
                    }
                }).then(function (resp) {
                    if(resp.data.image_url != ''){
                        var image_list = $scope.refund_image_list;
                        image_list[index].image = resp.data.image_url;
                    } else {
                        $scope.nameTipshowa = true;
                        $scope.tip_a = '图片上传失败,请重试'
                        // $scope.toast('图片上传失败,请重试');
                        return;
                    }
                }, function (resp) {
                    $scope.nameTipshowa = true;
                    $scope.tip_a = '图片上传失败,请重试'
                    // $scope.toast('图片上传失败,请重试');
                    return;
                }, function (evt) {

                });

            }).catch(function (err) {
                /* 处理失败后执行 */
                $scope.nameTipshowa = true;
                $scope.tip_a = '图片上传失败,请重试'
                // $scope.toast('图片上传失败,请重试');
                return;
            }).always(function () {
                /* 必然执行 */
            })

            //图片上传到FILES
            //Upload.upload({
            //    url: GLOBAL_CONFIG.API_HOST+'/v2/ecapi.order.imageUpload',
            //    data: {
            //        refund_image: file,
            //        username:'test_mwq'
            //    }
            //}).then(function (resp) {
            //    //console.log('上传成功', resp);
            //    var image_list = $scope.refund_image_list;
            //    console.log('当前图片集里面图片',image_list);
            //    image_list[index].image = resp.data.image_url;
            //}, function (resp) {
            //    console.log('Error status: ' + resp.status);
            //}, function (evt) {
            //    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            //});
        };

        function _touchCancel(){
            $scope.goBack();
        }

        function _touchSave() {
            if($scope.refundReason == ''){
                // $scope.nameTipshowa = true;
                // $scope.tip_a = '请选择退款原因';
                ngToast.create({
                    content: `<a class="error-toast">${msg}</a>`,
                    timeout: 2000,
                    dismissOnTimeout: true
                });
                // $scope.toast('请选择退款原因');
                return;
            }

            if($scope.reason == '' || $scope.reason ==undefined){
                $scope.nameTipshowa = true;
                $scope.tip_a = '请填写款说明'
                // $scope.toast('请填写款说明');
                return;
            }

            //退货时校验上传的图片
            if($scope.order_goods_info.order_status == ENUM.ORDER_GOODS_STATUS.DELIVERIED) {
                for(var i in $scope.refund_image_list){
                    if($scope.refund_image_list[i].image == ''){
                        $scope.nameTipshowa = true;
                        $scope.tip_a = '请上传商品'+ $scope.refund_image_list[i].position+'图片'
                        // $scope.toast('请上传商品'+ $scope.refund_image_list[i].position+'图片');
                        return;
                    }
                }
            }

            var params = {};
            params.order = orderId;
            params.order_goods_id = orderGoodsId;
            params.refund_type = $scope.order_goods_info.order_status == ENUM.ORDER_GOODS_STATUS.DELIVERIED ? 2 : 1;
            params.refund_reason_type = $scope.refundReason;
            params.reason = $scope.reason;
            params.image_list = $scope.refund_image_list;
		
            API.order.refund(params).then(function (data) {
                if(data.error_code > 0){
                    $scope.toast(data.error_desc);
                } else {
                    if(data.result == true){
                        $scope.nameTipshowa = true;
                        $scope.tip_a = '申请退款成功'
                        // $scope.toast('申请退款成功');
                        //跳转到退款详情页面
                        $state.go('refund-info', {
                            order: orderId,
                            order_goods_id : orderGoodsId
                        });
                    } else {
                        $scope.nameTipshowa = true;
                        $scope.tip_a = '申请退款失败'
                        // $scope.toast('申请退款失败');
                    }
                }
            });
            return '';
        }

        function _touchRetundReasonPickerShow() {
            $scope.showRefundReasonPicker = true;
        }

        function _touchRefundReasonPicker(reason_type) {
            var reason_type_list = $scope.pickerRefundReasonData;
            $scope.refundReason = reason_type;
            $scope.refundReasonName = reason_type_list[reason_type];

            $scope.showRefundReasonPicker = false;
        }

        function _touchRefundReasonPicker1(reason_type) {
            var reason_type_list = $scope.pickerRefundReasonData1;
            $scope.refundReason = reason_type;
            $scope.refundReasonName = reason_type_list[reason_type];

            $scope.showRefundReasonPicker = false;
        }

        function _touchRefundReasonPickerCancel() {
            $scope.showRefundReasonPicker = false;
        }

        function _orderGoodsInfo() {
            API.order.orderGoodsInfo({
                order: orderId,
                order_goods_id : orderGoodsId
            }).then(function (data) {
                if(!(data.order_goods_info.order_status == ENUM.ORDER_GOODS_STATUS.PAID || data.order_goods_info.order_status == ENUM.ORDER_GOODS_STATUS.DELIVERIED || data.order_goods_info.order_status == ENUM.ORDER_GOODS_STATUS.DELIVERY)){
                    $scope.goBack();
                }
                $scope.order_goods_info = data.order_goods_info;

                if(data.order_goods_info.order_status == ENUM.ORDER_GOODS_STATUS.DELIVERIED){
                    var $body = angular.element('body');
                    document.title = '申请退货';
                    var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
                        $timeout(function() {
                            $iframe.off('load').remove();
                        }, 0);
                    }).appendTo($body);
                }

            });
        }

        _orderGoodsInfo();

    }

})();