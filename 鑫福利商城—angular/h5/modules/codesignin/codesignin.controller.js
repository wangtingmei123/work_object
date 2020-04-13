(function () {

    'use strict';

    angular
    .module('app')
    .controller('CodesigninController', CodesigninController);

    CodesigninController.$inject = ['$scope', '$http', '$window', '$location', '$state', '$rootScope','CONSTANTS','AppAuthenticationService', 'API', 'ENUM','ConfigModel', '$interval'];

    function CodesigninController($scope, $http, $window, $location, $state, $rootScope, CONSTANTS, AppAuthenticationService,API, ENUM, ConfigModel, $interval) {

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
                    if(sessionStorage.getItem("show_toc")==null){
                        if(AppAuthenticationService.getUser().company.id==75){
                           
                            window.location.href='http://shop.xindongguoji.com/h5/?#/productcs/?product='+ENUM.PRODUCTSCC.CICD2

                        }else{
                            $scope.goHome();

                        }

                    }else{
                        
                        window.location.href='http://shop.xindongguoji.com/h5/?#/productcs/?product='+sessionStorage.getItem("productId")

                    }


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
           if(!AppAuthenticationService.getToken()){
                return;
            }
        }

		_reload();










    }

})();
