(function () {

    'use strict';

    angular
        .module('app')
        .controller('ShoplistController', ShoplistController);

    ShoplistController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM'];

    function ShoplistController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM) {
        var account = $stateParams.account;
        var MAX_COMMENTS = 3;
        var PER_PAGE = 1000;
        $scope.brands = [];
        $scope.letter_sort=[];
        $scope.cat_name=[];

        //品牌

        API.account
            .acclist({account_no: account})
            .then(function (cat_name) {
                $scope.cat_name = cat_name;

            })

         }

})();
