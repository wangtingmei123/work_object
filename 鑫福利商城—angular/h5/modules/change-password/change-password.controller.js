(function () {

	'use strict';

	angular
		.module('app')
		.controller('ChangePasswordController', ChangePasswordController);

	ChangePasswordController.$inject = ['$scope', '$http', '$window', '$location', '$state', 'API', 'ENUM','$interval','AppAuthenticationService'];

	function ChangePasswordController($scope, $http, $window, $location, $state, API, ENUM,$interval,AppAuthenticationService) {

		$scope.oldPassword = "";
		$scope.newPassword = "";

		$scope.touchChangePassword = touchChangePassword;
		$scope.touchTabPassword = _touchTabPassword;
		$scope.touchTabValidCode = _touchTabValidCode;
		$scope.currentTab = 'password';//"validCode"
		$scope.modifyPass = {show:true};//"validCode"

		$scope.paracont = "获取验证码";
		$scope.paraclass = "mobile-code";
		$scope.paraevent = true;
		$scope.toucheMobileCode = _toucheMobileCode;
		$scope.touchValidCodePassword = _touchValidCodePassword;
		$scope.state=
		{
			mobile : ""
		};

		//验证码修改密码 点击发送验证码
		function _toucheMobileCode() {
			if ( !$scope.paraevent ) {return;}
			var mobile = $scope.state.mobile;

			if ( !mobile || mobile.length < 1 ) {
				$scope.toast('请输入手机号码');
				return;
			}

			var params = {};
			params.mobile = mobile;
			params.code = "86";

			//发送验证码
			var telphone = $scope.state.mobile;
			API.auth.base
				.sendsigncode({telphone:telphone})
				.then(function(success){
					if (success) {
						$scope.toast('验证码发送成功');
						timeout();
					}
					else{
						$scope.toast('验证码发送失败，请重试');
					}
				});
		}

		//验证码修改密码
		function _touchValidCodePassword() {
			var mobile = $scope.state.mobile;
			var code = $scope.state.mobile_code;
			var password = $scope.state.mobile_password;
			var password2 = $scope.state.mobile_password2;

			if ( !mobile || mobile.length < 1 ) {
				$scope.toast('请输入手机号码');
				return;
			}

			if ( !code || code.length != 6 ) {
				$scope.toast('请输入正确的手机验证码');
				return;
			}

			if ( !password || password.length < 6 ) {
				$scope.toast('请输入正确的密码');
				return;
			}

			if ( password != password2 ) {
				$scope.toast('请输入正确的密码');
				$scope.password2 = '';
				return;
			}

			var params = {};
			params.mobile = mobile;
			params.code = code;
			params.password = password;
			params.valid_id = $scope.valid_id;

			if(AppAuthenticationService.getReferences()){
				params.invite_code =  parseInt(AppAuthenticationService.getReferences());
			}

			API.auth.mobile.reset(params).then(function(res) {
				if ( res.data && ENUM.ERROR_CODE.OK == res.data.error_code ) {
					$scope.toast('找回密码成功');
					$scope.goBack();
				}
				else{
					$scope.toast(res.data.error_desc);
				}
			});
		}

		//点击密码tab事件
		function _touchTabPassword() {
			if ($scope.currentTab != 'password') {
				$scope.currentTab = 'password';
				$scope.modifyPass = {show:true};
			}
		}

		//点击点击验证码tab事件
		function _touchTabValidCode() {
			if ($scope.currentTab != 'validCode') {
				$scope.currentTab = 'validCode';
				$scope.modifyPass = {show:false};
			}
		}

		function touchChangePassword() {

			var oldPassword = $scope.state.oldPassword;
			var newPassword = $scope.state.newPassword;
			var newPassword2 = $scope.state.newPassword2;

			if (newPassword != newPassword2) {
				$scope.toast("两次密码输入不一致");
				return;
			}

			API.user.passwordUpdate({
					old_password: oldPassword,
					password: newPassword
				})
				.then(function (res) {
					if (res.data.error_code == 0) {
						$scope.toast('密码修改成功');
						$scope.goBack();
					} else {
						$scope.toast(res.data.error_desc);
					}

				});

		}

		function timeout() {
			var second = 60,
				timePromise = undefined;

			timePromise = $interval(function(){
				if(second<=0){
					$interval.cancel(timePromise);
					timePromise = undefined;

					second = 60;
					$scope.paracont = "重发验证码";
					$scope.paraclass = "mobile-code";
					$scope.paraevent = true;
				}
				else
				{
					$scope.paracont = second + "s";
					$scope.paraclass = "not-mobile-code";
					$scope.paraevent = false;
					second--;
				}
			},1000,100);
		}

	}

})();