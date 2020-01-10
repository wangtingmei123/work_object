(function () {

    'use strict';

    angular
        .module('app')
        .controller('WuliusController', WuliusController);

    WuliusController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM', 'PaymentModel', 'OrderExpressModel'];

    function WuliusController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM, PaymentModel, OrderExpressModel) {

        var order_goods_id = $stateParams.order_goods_id;
        var region = $stateParams.region;
        var address = $stateParams.address;
        // $scope.goBack();
        $scope.order = {
            region: region,
            address: address,
            order_goods_id: order_goods_id,
        };

        $scope.logistic=[]

        _request();
       function _request(){
            API.order.logisticSearch({
                order_goods_id: order_goods_id,
            }).then(function (data) {
                $scope.logistic=data.logistic
                if(data.logistic.Traces.length==0){
                    $scope.toast(data.logistic.Reason);
                }
            });
        }




      }

    })();