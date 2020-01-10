(function () {

	'use strict';

	angular
		.module('app')
		.controller('MyAccountController', MyAccountController);

    MyAccountController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM', 'PaymentModel', 'MyAccountModel','ConfigModel'];

	function MyAccountController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM, PaymentModel, MyAccountModel,ConfigModel) {
        $scope.myAccountModel = MyAccountModel;

		$scope.myAccountModel.count();
		$scope.myAccountModel.reload();
        $scope.toshoplist = _toshoplist;
        //查看可用商品
        function _toshoplist(account) {
        	console.log(account)
            $state.go('shoplist', {
                account: account.account_no,
            })
        }
	}

})();