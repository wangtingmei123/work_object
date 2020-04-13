(function () {

	'use strict';

	angular
		.module('app')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$scope', '$http', '$rootScope', '$location', '$state', 'API', 'AppAuthenticationService', 'CartModel','MyFavoriteModel', 'ConfigModel'];

	function ProfileController($scope, $http, $rootScope, $location, $state, API, AppAuthenticationService, CartModel,MyFavoriteModel, ConfigModel) {

		$scope.touchAllOrders 		= _touchAllOrders;
		$scope.touchOrderCreated 	= _touchOrderCreated;
		$scope.touchOrderPayed 		= _touchOrderPayed;
		$scope.touchOrderDelivering = _touchOrderDelivering;
		$scope.touchOrderFinished 	= _touchOrderFinished;

		$scope.touchDialogCancel 	= _touchDialogCancel;
		$scope.touchDialogConfirm 	= _touchDialogConfirm;

		$scope.touchFav 		= _touchFav;
		$scope.touchAddress 	= _touchAddress;
		$scope.touchScore 		= _touchScore;
		$scope.touchCashGift 	= _touchCashGift;
		$scope.touchHelps 		= _touchHelps;
		$scope.touchPassword 	= _touchPassword;
		$scope.touchSignin 		= _touchSignin;
		$scope.touchSignout 	= _touchSignout;
		$scope.touchBonus 		= _touchBonus;
		$scope.touchBalance 	= _touchBalance;
		$scope.isSignIn 		= _isSignIn;
		$scope.touchAccount 	= _touchAccount;
        $scope.tozxlist =    _tozxlist;
        $scope.touchcoupons = _touchcoupons;
		$scope.couponslength=0;
		$scope.guanzhu=false
		

		if(sessionStorage.getItem("show_toc")!=null){

            $scope.guanzhu=true;

		}


        function _touchcoupons() {
            $state.go('coupons')
        }


        _request();
        function _request(){
            API.coupon.list({
            }).then(function (data) {
                $scope.couponslength=data.length;
            });
        }





       function _tozxlist() {
           $state.go('zx-list')
	   }
		$scope.touchChangeIdentity = _touchChangeIdentity;

		$scope.isWeixin  = _isWeixin;
        $scope.touchKnow = _touchKnow;
		$scope.cesum = ''

		$scope.cartModel = CartModel;

        $scope.myFavoriteModel = MyFavoriteModel;

		$scope.user = AppAuthenticationService.getUser();
		$scope.userName = "";
		$scope.telphone = "";
		$scope.company_list = {};



		//福利卡余额
		function balancesum() {
			var params = {};

			params.user_id = $scope.user.id;

			API.product.balancesum(params).then(function (data) {
				$scope.cesum=data

			})
		}
		balancesum()


		ConfigModel.fetch();

		var config = ConfigModel.getConfig();
		$scope.authorize = config.authorize;

		//去退换货须知页面
		function _touchKnow(){
            $state.go('knowall')
		}



		function _touchAllOrders() {
			$state.go('my-order', {
				tab: 'all'
			});
		}

		function _touchOrderCreated() {
			$state.go('my-order', {
				tab: 'created'
			});
		}

		function _touchOrderPayed() {
			$state.go('my-order', {
				tab: 'paid'
			});
		}

		function _touchOrderDelivering() {
			$state.go('my-order', {
				tab: 'delivering'
			});
		}

		function _touchOrderFinished() {
			$state.go('my-order', {
				tab: 'finished'
			});
		}

		function _touchFav() {
			$state.go('my-favorite', {});
		}

		function _touchAddress() {
			$state.go('my-address', {});
		}

		function _touchScore() {
			$state.go('my-score', {
				tab: 'all'
			});
		}

		function _touchCashGift() {
			$state.go('my-cashgift', {});
		}

		function _touchHelps() {
			$state.go('article', {});
		}

		function _touchPassword() {
			$state.go('change-password', {});
		}

		function _touchSignin() {
			if (!AppAuthenticationService.getToken()) {
				$scope.goSignin();
			}
		}

		function _touchSignout() {
			if (AppAuthenticationService.getToken()) {
				API.auth.base
					.signout()
					.then(function (success) {
						if (success) {
							$scope.goHome();
							$scope.toast('注销成功');
						} else {
							$scope.toast('注销失败');
						}
					});
			}
		}

		function _reloadUser() {
			if ( _isSignIn() ) {
				API.user.profileGet().then(function (user) {
					AppAuthenticationService.setUser(user);
					$scope.user = user;
					if(user.nickname){
						$scope.userName = user.nickname;
					} else {
                        $scope.userName = user.username;
					}
					if(user.telphone){
						$scope.telphone = user.telphone;
					} else {
						$scope.telphone = user.telphone;
					}
				})
			};
		}

		function _reload() {
            // sessionStorage.setItem("is_lis", '1');//保存点击的状态
            // sessionStorage.setItem("offsetTop1", 0);//清除上一个页面滚动位置
            // sessionStorage.setItem("offsetTop2", 0);//清除上一个页面滚动位置
			_reloadUser();
			$scope.cartModel.reloadIfNeeded();
            $scope.myFavoriteModel.reload();
		}

		function _isWeixin() {
			return $rootScope.isWeixin();
		}

		function _touchBonus(){
			$state.go('bonus', {});
		}

		function _touchBalance(){
			$state.go('my-balance', {});
		}


		function _isSignIn(){
			return AppAuthenticationService.getToken()
		}

        function _touchAccount(){
            $state.go('my-account', {});
        }

		function _touchChangeIdentity() {
			API.user.companyListGet().then(function (company_list){
				$scope.company_list = company_list;
			})
			$scope.showDialog = true;
		}

		function _touchDialogCancel() {
			$scope.showDialog = false;
		}

		function _touchDialogConfirm()
		{
			var params = {};
			params.company_id = $scope.select_company_id;
			API.user.changeCompanyIdentity(params).then(function(res){
				if(res.data.res == 1){
					_reloadUser();
					$scope.showDialog = false;
				}
			})
		}

		_reload();
	}

})();