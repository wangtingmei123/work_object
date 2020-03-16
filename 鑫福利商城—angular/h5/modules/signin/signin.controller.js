(function () {

    'use strict';

    angular
    .module('app')
    .controller('SigninController', SigninController);

    SigninController.$inject = ['$scope', '$http', '$window', '$location', '$state', '$rootScope', 'API','CONSTANTS','AppAuthenticationService', 'ENUM','ConfigModel'];

    function SigninController($scope, $http, $window, $location, $state, $rootScope, API,CONSTANTS, AppAuthenticationService, ENUM,ConfigModel) {

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



        
        function _reload() {
          
			ConfigModel.fetch().then(function(){
				var config = ConfigModel.getConfig();
	            var wechat = config['wechat.web'];
				// if(wechat && CONSTANTS.FOR_WEIXIN && !AppAuthenticationService.getOpenId()){
				// 	if ($rootScope.isWeixin()) {
				// 		$state.go('wechat-authbase', {});
				// 		return;
				// 	}
				// }
				_initShared();
			});
            

			// $scope.cartModel.reloadIfNeeded();
		}
	

		function _initConfig(wechat){
                if ( !wechat ) {
                    console.log("888")
                    return;
                };

                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wechat.app_id, // 必填，公众号的唯一标识
                    timestamp: wechat.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wechat.nonceStr, // 必填，生成签名的随机串
                    signature: wechat.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                console.log(wechat)



                var shared_link='http://shop.xindongguoji.com/h5/'+'?#/home'


                wx.ready( function() {
                    wx.onMenuShareTimeline({
                        title: '鑫福利商城', // 分享标题
                        desc: '鑫福利商城·员工身边的商城', // 分享描述
                        link: shared_link, // 分享链接
                        imgUrl: 'http://shop.xindongguoji.com/h5/image/company_logo_new.png?v=2', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: '鑫福利商城', // 分享标题
                        desc:'鑫福利商城·员工身边的商城',
                        link: shared_link, // 分享链接
                        imgUrl: 'http://shop.xindongguoji.com/h5/image/company_logo_new.png?v=2', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQQ({
                        title: '鑫福利商城', // 分享标题
                        desc: '鑫福利商城·员工身边的商城', // 分享描述
                        link: shared_link, // 分享链接
                        imgUrl: 'http://shop.xindongguoji.com/h5/image/company_logo_new.png?v=2', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                  

                });

                wx.error(function(res){
                    if(GLOBAL_CONFIG.DEBUG){
                        $rootScope.toast(JSON.stringify(res));
                    }
                });

		}

        function _initShared(){
            if(!AppAuthenticationService.getToken()){
                return;
            }
          
            API.bonus.get().then(function (bonus_info) {
            	ConfigModel.fetch().then(function(){
	                var config = ConfigModel.getConfig();
	                var wechat = config['wxpay.web'];
					_initConfig(wechat);
	                return true;
               	});
            });

            setTimeout(function(){
                $(".jiazia-box").css("display","none")
			},100)
        
        }

		_reload();






    }

})();
