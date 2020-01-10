(function () {

    'use strict';

    angular
        .module('app')
        .controller('CouponsController', CouponsController);

    CouponsController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM', 'PaymentModel', 'OrderExpressModel'];

    function CouponsController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM, PaymentModel, OrderExpressModel) {

        var order_goods_id = $stateParams.order_goods_id;
        var region = $stateParams.region;
        var address = $stateParams.address;
        // $scope.goBack();

        $scope.coupons=[]

        _request();
       function _request(){
           API.coupon.list({

           }).then(function (data) {
               $scope.coupons=data;
           });
        }




      }

    })();