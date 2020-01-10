(function () {
    'use strict';

    angular
    .module('app')
    .factory('APIOrderService', APIOrderService);

    APIOrderService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];

    function APIOrderService($http, $q, $timeout, CacheFactory, ENUM) {

        var service = new APIEndpoint( $http, $q, $timeout, CacheFactory, 'APIOrderService' );
        service.get = _get;
        service.list = _list;
        service.confirm = _confirm;
        service.reasonList = _reasonList;
        service.cancel = _cancel;
        service.review = _review;
        service.subtotal = _subtotal;
        service.price = _price;
        service.getUserAccount = _getUserAccount;

        service.orderGoodsInfo = _orderGoodsInfo;//
        service.refund = _refund;//
        service.refundInfo = _refundInfo;//
        service.refundShipping = _refundShipping;//
        //service.returnGoods = _returnGoods;//
        //service.returnGoodsInfo = _returnGoodsInfo;//
        service.logisticSearch = _logisticSearch;
        service.bookcon = _bookcon;
        return service;
        function _bookcon(params) {
            return this.fetch( '/v2/ecapi.book.info.item', params, false, function(res){
                return res;
            });
        }


        function _get(params) {
            return this.fetch( '/v2/ecapi.order.get', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order : null;
            });
        }

        function _list(params) {
            return this.fetch( '/v2/ecapi.order.list', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.orders : null;
            });
        }

        function _confirm(params) {
            return this.fetch( '/v2/ecapi.order.confirm', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order : null;
            });
        }

        function _reasonList(params) {
            return this.fetch( '/v2/ecapi.order.reason.list', params, true, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.reasons : null;
            });
        }

        function _cancel(params) {
            return this.fetch( '/v2/ecapi.order.cancel', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order : null;
            });
        }

        function _review(params) {
            return this.fetch( '/v2/ecapi.order.review', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
            });
        }

        function _subtotal(params) {
            return this.fetch( '/v2/ecapi.order.subtotal', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.subtotal : null;
            });
        }

        function _price(params) {
            return this.fetch( '/v2/ecapi.order.price', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order_price : null;
            });
        }
        //2018-12-26 ----start--新增
        function _getUserAccount(params) {
            return this.fetch( '/v2/ecapi.order.user.account', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.accounts : null;
            });
        }
        //end

        //�˿�����
        function _refund(params) {
            return this.fetch( '/v2/ecapi.order.refund', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data : res.data;
            });
        }

        //�˿���������
        function _refundInfo(params) {
            return this.fetch( '/v2/ecapi.order.refundInfo', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data : res.data;
            });
        }

        //��ȡ������Ʒ����
        function _orderGoodsInfo(params){
            return this.fetch( '/v2/ecapi.order.orderGoodsInfo', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data : res.data;
            });
        }

        //��ȡ������Ʒ����
        function _refundShipping(params){
            return this.fetch( '/v2/ecapi.order.refundShipping', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data : null;
            });
        }

        //�˻�����
        //function _returnGoods(params) {
        //    return this.fetch( '/v2/ecapi.order.returnGoods', params, false, function(res){
        //        return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data : res.data;
        //    });
        //}

        //�˻�����
        //function _returnGoodsInfo(params) {
        //    return this.fetch( '/v2/ecapi.order.returnGoodsInfo', params, false, function(res){
        //        return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data : res.data;
        //    });
        //}
        //查看物流
        function _logisticSearch(params){
            return this.fetch( '/v2/ecapi.order.logisticSearch', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data : null;
            });
        }

    }

})();
