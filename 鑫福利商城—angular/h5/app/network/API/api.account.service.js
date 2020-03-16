/**
 * Created by howiezhang on 16/12/8.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('APIAccountService', APIAccountService);

    APIAccountService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];

    function APIAccountService($http, $q, $timeout, CacheFactory, ENUM) {

        var service = new APIEndpoint( $http, $q, $timeout, CacheFactory, 'APIAccountService' );
        //service.get = _get;
        service.list = _list;
        service.acclist = _acclist;
        return service;

        //function _get(params) {
        //    return this.fetch( '/v2/ecapi.balance.get', params, false, function(res){
        //        return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.amount : null;
        //    });
        //}

        function _acclist(params) {
            return this.fetch( '/v2/ecapi.account.goods.class', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.cat_name : null;
            });
        }
        function _list(params) {
            return this.fetch( '/v2/ecapi.account.list', params, false, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.accounts : null;
            });
        }
    }

})();
