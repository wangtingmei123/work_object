(function () {
    'use strict';

    angular
    .module('app')
    .factory('APIProductService', APIProductService);

    APIProductService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];

    function APIProductService($http, $q, $timeout, CacheFactory, ENUM) {

        var service = new APIEndpoint( $http, $q, $timeout, CacheFactory, 'APIProductService' );
        service.list = _list;
        service.homeList = _homeList;
        service.accessoryList = _accessoryList;
        service.get = _get;
        service.like = _like;
        service.unlike = _unlike;
        service.likedList = _likedList;
        service.validate = _validate;
        service.purchase = _purchase;
        service.searchStock = _searchStock;//天马查询库存
        service.balancesum = _balancesum;  //中信领奖福利余额
        service.zxlist = _zxlist;
        service.hjdata = _hjdata;   //黄金时间
        service.gtotal = _gtotal;   //评价总数
        service.commentlist = _commentlist; //评价详情
        return service;

        function _commentlist(params){
            return this.fetch( '/v2/ecapi.comment.list', params, false, function(res){
                return (res.data &&(ENUM.ERROR_CODE.OK == res.data.error_code)) ? res.data : null;

            });
        }

        function _gtotal(params){
            return this.fetch( '/v2/ecapi.comment.total', params, false, function(res){
                return (res.data &&(ENUM.ERROR_CODE.OK == res.data.error_code)) ? res.data : null;

            });
        }

        function _hjdata(params){
            return this.fetch( '/v2/ecapi.stadium.book.days', params, false, function(res){
                return res;

            });
        }


        function _zxlist(params) {
            return this.fetch( '/v2/ecapi.product.zx.List', params, false, function(res){
                return (res.data &&(ENUM.ERROR_CODE.OK == res.data.error_code)) ? res.data : null;

            });
        }
        
        
        
        

        function _balancesum(params) {
            return this.fetch( '/v2/ecapi.balance.sum', params, false, function(res){
                return res.data;

            });
        }


        function _searchStock(params) {
            return this.fetch( '/v2/ecapi.product.tm.stock', params, false, function(res){
                return (res.data &&(ENUM.ERROR_CODE.OK == res.data.error_code)) ? res.data.tm_stock : null;

            });
        }

        function _list(params) {
            return this.fetch( '/v2/ecapi.product.list', params, false, function(res){
                    return (res.data &&(ENUM.ERROR_CODE.OK == res.data.error_code)) ? res.data : null;

            });
        }

        function _homeList(params){
            return this.fetch( '/v2/ecapi.home.product.list', params, false, function(res){
                    return (res.data &&(ENUM.ERROR_CODE.OK == res.data.error_code)) ? res.data : null;

            });            
        }

        function _accessoryList(params) {
            return this.fetch( '/v2/ecapi.product.list', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.products : null;
            });
        }

        function _get(params) {
            return this.fetch( '/v2/ecapi.product.get', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.product : null;
            });
        }

        function _like(params) {
            return this.fetch( '/v2/ecapi.product.like', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.is_liked : true;
            });
        }

        function _unlike(params) {
            return this.fetch( '/v2/ecapi.product.unlike', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.is_liked : false;
            });
        }

        function _likedList(params) {
            return this.fetch( '/v2/ecapi.product.liked.list', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.products : null;
            });
        }

        function _validate(params) {
            return this.fetch( '/v2/ecapi.product.validate', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.is_valid : false;
            });
        }

        function _purchase(params) {
            return this.fetch( '/v2/ecapi.product.purchase', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order : null;
            });
        }

    }

})();
