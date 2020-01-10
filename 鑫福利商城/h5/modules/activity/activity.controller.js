(function () {

	'use strict';

	angular
		.module('app')
		.controller('ActivityController', ActivityController);

    ActivityController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM', 'ActivityModel','AppAuthenticationService','ConfigModel'];

	function ActivityController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM, ActivityModel,AppAuthenticationService,ConfigModel) {
        $scope.actId = $stateParams.act_id;
        $scope.user = AppAuthenticationService.getUser();
        $scope.activity_detail = [];
        $scope.activityModel         = ActivityModel;
        $scope.touchProduct         = _touchProduct;

        function _activityDetail(){
            var params = {
                act_id: $scope.actId,
                company_id: typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id
            };

            API.activity
                .detail(params).then(function (activity_detail) {
                    if(activity_detail){
                        $scope.activity_detail = activity_detail;
                    }else{
                        $scope.activity_detail = null;
                    }
                    sessionStorage.setItem('index_act_products',JSON.stringify($scope.activity_detail));
                });
        }


        function _touchProduct(product) {
            sessionStorage.setItem('act_offsetTop', $(window).scrollTop());
            $state.go('product', {
                product: product.id
            });
        }


        function _reload() {
            var act_id = sessionStorage.getItem('act_id');
            if($scope.actId != act_id){
                sessionStorage.removeItem('act_id');
                sessionStorage.removeItem('index_act_products');
            }
            var act_products = sessionStorage.getItem('index_act_products');
            if(act_products != 'undefined' && act_products != null){
                $scope.activity_detail = JSON.parse(act_products);
                var act_offsetTop = sessionStorage.getItem('act_offsetTop');
                if(act_offsetTop > 0){
                    $('html,body').animate({'scrollTop': act_offsetTop}, 0);
                }
            }else{
                _activityDetail();
                sessionStorage.setItem('act_id',$scope.actId);
            }

        }

        _reload();
	}

})();