(function () {

    'use strict';

    angular
    .module('app')
    .factory('APIActivityService', APIActivityService);

    APIActivityService.$inject =  ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];

    function APIActivityService($http, $q, $timeout, CacheFactory, ENUM) {

        var service = new APIEndpoint( $http, $q, $timeout, CacheFactory, 'APIActivityService' );
        service.detail = _detail;
        return service;

        function _detail( params ) {
            return this.fetch( '/v2/ecapi.goods.index.activity.detail', params, true, function(res){
                return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.activity_detail : null;
            });
        }
    }

})();
