/**
 * Created by howiezhang on 16/9/27.
 */
(function () {

	'use strict';

	angular
		.module('app')
		.controller('WeChatAuthController', WeChatAuthController);

	WeChatAuthController.$inject = ['$scope', '$http', '$window', '$location', '$timeout','AppAuthenticationService','ENUM'];

	function WeChatAuthController($scope, $http, $window, $location, $timeout,AppAuthenticationService,ENUM) {


      var url=''
	  if(sessionStorage.getItem("show_toc")==null){
		if(AppAuthenticationService.getUser().company.id==75){
		   
			url='http://shop.xindongguoji.com/h5/?#/productcs/?product='+ENUM.PRODUCTSCC.CICD2

		}else{
			url=$window.location.protocol+"//"+$window.location.host+$window.location.pathname

		}

	}else{
		url='http://shop.xindongguoji.com/h5/?#/productcs/?product='+sessionStorage.getItem("productId")


	}

		var callbackUrl = encodeURIComponent(url);
		
		
		console.log(callbackUrl)

		var scope = "snsapi_userinfo";

		var locationRef = GLOBAL_CONFIG.API_HOST + "/v2/ecapi.auth.web?vendor=1"+"&scope="+scope+"&referer=" + callbackUrl;

		$window.location.href = locationRef;
	}

})();