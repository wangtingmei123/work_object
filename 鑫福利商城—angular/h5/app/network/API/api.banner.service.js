(function () {

    'use strict';

    angular
    .module('app')
    .factory('APIBannerService', APIBannerService);

    APIBannerService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];

    function APIBannerService($http, $q, $timeout, CacheFactory, ENUM) {

        var service = new APIEndpoint( $http, $q, $timeout, CacheFactory, 'APIBannerService' );
        service.list = _list;
        service.activityList = _activityList;
        return service;

        function _list( params ) {
            return this.fetch( '/v2/ecapi.banner.list', params, true, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.banners : null;
            });
        }

        //首页活动获取
        function _activityList( params ) {
            return this.fetch( '/v2/ecapi.goods.index.activity.list', params, true, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.goods_index_activity : null;
            });
        }


    }

})();
