(function () {

    'use strict';

    angular
    .module('app')
    .controller('CodesigninController', CodesigninController);

    CodesigninController.$inject = ['$scope', '$http', '$window', '$location', '$state', '$rootScope', 'API', 'ENUM','ConfigModel', '$interval'];

    function CodesigninController($scope, $http, $window, $location, $state, $rootScope, API, ENUM, ConfigModel, $interval) {

    	$scope.username = "";
    	$scope.code = "";

    	$scope.touchSignup = _touchSignup;
    	$scope.touchForget = _touchForget;
    	//$scope.touchWeixin = _touchWeixin;
        $scope.touchQQ    = _touchQQ;
        $scope.isWeixin    = _isWeixin;
        $scope.touchCodeSignin = _touchCodeSignin;
        $scope.sendSigninCode = _sendSigninCode;
        $scope.goSignin = _goSignin;
        $scope.nameTipshowa = false;
        $scope.torefundTipa = _torefundTipa;
        $scope.tip_a = '';
        function _torefundTipa() {
            $scope.nameTipshowa = false;
        }
        //验证码登录
    	function _touchCodeSignin() {
    		var telphone = $scope.telphone;
    		var code = $scope.mobile_code;
            var valid_id = $scope.valid_id;

            if ( !telphone || telphone.length != 11 ) {
                $scope.nameTipshowa = true;
                $scope.tip_a = '手机号错误'
                // $scope.toast('手机号错误');
                return;
            }

            if ( !code || code.length != 6 ) {
                $scope.nameTipshowa = true;
                $scope.tip_a = '请输入正确的验证码'
                // $scope.toast('请输入正确的验证码');
                return;
            }

			API.auth.base
			.codesignin({telphone:telphone, code:code,'valid_id':valid_id})
			.then(function(success){
                if (success) {
                    $scope.toast('登录成功');
                    $scope.goHome();
                }
                else{
                    $scope.nameTipshowa = true;
                    $scope.tip_a = '手机号或验证码错误'
                    // $scope.toast('手机号或验证码错误');
                }
			});
    	}

        //发送验证码
        function _sendSigninCode()
        {
            var telphone = $scope.telphone;
            if ( !telphone || telphone.length != 11 ) {
                $scope.nameTipshowa = true;
                $scope.tip_a = '手机号错误'
                // $scope.toast('手机号错误');
                return;
            }

            API.auth.base
                .sendsigncode({telphone:telphone})
                .then(function(success){
                    if (success) {
                        $scope.toast('验证码发送成功');
                        timeout();
                        //$scope.goHome();
                    }
                    else{
                        $scope.nameTipshowa = true;
                        $scope.tip_a = '验证码发送失败，请重试'
                        // $scope.toast('验证码发送失败，请重试');
                    }
                });
        }

        $scope.paracont = "获取验证码";
        $scope.paraclass = "mobile-code";
        $scope.paraevent = true;

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

    	function _touchSignup() {
            $state.go('signup', {});
    	}

    	function _touchForget() {
            $state.go('forget', {});
    	}

        function _goSignin() {
            $state.go('signin', {});
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
