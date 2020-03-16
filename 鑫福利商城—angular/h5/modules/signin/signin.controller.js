(function () {

    'use strict';

    angular
    .module('app')
    .controller('SigninController', SigninController);

    SigninController.$inject = ['$scope', '$http', '$window', '$location', '$state', '$rootScope', 'API', 'ENUM','ConfigModel'];

    function SigninController($scope, $http, $window, $location, $state, $rootScope, API, ENUM,ConfigModel) {

    	$scope.username = "";
    	$scope.password = "";

    	//$scope.touchSignin = _touchSignin;
        $scope.goSignin = _goSignin;

    	$scope.touchSignup = _touchSignup;
    	$scope.touchForget = _touchForget;
    	//$scope.touchWeixin = _touchWeixin;
        $scope.touchQQ    = _touchQQ;
        $scope.isWeixin    = _isWeixin;
        $scope.goCodeSignin = _goCodeSignin;

        $scope.touchTelphoneSignin = _touchTelphoneSignin;

        function _touchTelphoneSignin() {
            var telphone = $scope.telphone;
            var password = $scope.password;

            if ( !telphone || telphone.length != 11 ) {
                $scope.toast('手机号错误');
                return;
            }


            if ( !password || password.length < 4 ) {
                $scope.toast('请输入正确的密码');
                return;
            }

            API.auth.base
                .telphoneignin({telphone:telphone, password:password})
                .then(function(success){
                    if (success) {
                        $scope.toast('登录成功');
                        $scope.goHome();
                    }
                    else{
                        $scope.toast('手机号或密码错误');
                    }
                });
        }

        /*
    	function _touchSignin() {
    		var telphone = $scope.telphone;
    		var password = $scope.password;

            if ( !telphone || telphone.length != 11 ) {
                $scope.toast('手机号错误');
                return;
            }


            if ( !password || password.length < 4 ) {
                $scope.toast('请输入正确的密码');
                return;
            }

			API.auth.base
			.signin({telphone:telphone, password:password})
			.then(function(success){
                if (success) {
                    $scope.toast('登录成功');
                    $scope.goHome();
                }
                else{
                    $scope.toast('手机号或密码错误');
                }
			});
    	}
    	*/


        function _goSignin()
        {
            $state.go('signin', {});
        }


        function _goCodeSignin() {
            $state.go('codesignin', {});
        }

    	function _touchSignup() {
            $state.go('signup', {});
    	}

    	function _touchForget() {
            $state.go('forget', {});
    	}

        /*
    	function _touchWeixin() {
			//$state.go('wechat-auth', {});
    	}
    	*/

        function _touchQQ() {
            $state.go('qq-auth', {});
        }

        function _isWeixin() {
            var config = ConfigModel.getConfig();
            var wechat = config['wechat.web'];
            return wechat && $rootScope.isWeixin();
        }
    }

})();
