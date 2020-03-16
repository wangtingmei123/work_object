(function () {

	'use strict';

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$http','$rootScope', '$timeout', '$location', '$state', 'API', 'ENUM','CONSTANTS', '$window', 'AppAuthenticationService','ConfigModel','$cookies'];

	function HomeController($scope, $http,$rootScope, $timeout, $location, $state, API, ENUM,CONSTANTS, $window, AppAuthenticationService,ConfigModel,$cookies) {

    //mm新增


		var MAX_BANNERS = 10;
		var MAX_NOTICES = 5;
		var MAX_CATEGORIES = 4;
		var MAX_PRODUCTS = 4;

		$scope.banners = [];
		$scope.notices = [];
		$scope.activityList = [];
        $scope.activityList2 = [];
		$scope.brand_arr = [
            {'brand_id':79,'brand_name':'耐克','img':'image/brand/1.png'},
            {'brand_id':1,'brand_name':'阿迪达斯','img':'image/brand/2.png'},
            {'brand_id':7,'brand_name':'斯凯奇','img':'image/brand/3.png'},
            {'brand_id':81,'brand_name':'彪马','img':'image/brand/4.png'},
            {'brand_id':5,'brand_name':'新百伦','img':'image/brand/5.png'},
            {'brand_id':88,'brand_name':'BEATS','img':'image/brand/6.png'},
            {'brand_id':90,'brand_name':'JBL','img':'image/brand/7.png'},
            {'brand_id':89,'brand_name':'B&O','img':'image/brand/8.png'},
            {'brand_id':43,'brand_name':'PHILIPS','img':'image/brand/9.png'},
            {'brand_id':241,'brand_name':'THERMOS','img':'image/brand/10.png'},
            {'brand_id':215,'brand_name':'罗莱','img':'image/brand/11.png'},
            {'brand_id':218,'brand_name':'中粮','img':'image/brand/12.png'},
        ];
		$scope.zero_cate_id = 0;
		$scope.one_cate_id = 1;
		$scope.two_cate_id = 2;
		$scope.three_cate_id = 3;
		$scope.four_cate_id = 4;


		// var emptyCategory = {};
		// var emptyCategories = [];

		// for ( var i = 0; i < MAX_CATEGORIES; ++i ) {
		//   emptyCategories.push( emptyCategory );
		// }

		// $scope.categories = emptyCategories;

		var emptyProduct = {};
		var emptyProducts = [];

		for (var i = 0; i < MAX_PRODUCTS; ++i) {
			emptyProducts.push(emptyProduct);
		}

		$scope.topSale = emptyProducts;
		$scope.newArrival = emptyProducts;
		$scope.editorChoice = emptyProducts;

		$scope.touchSearch = _touchSearch;
		$scope.touchBanner = _touchBanner;
		$scope.touchNotice = _touchNotice;
		$scope.touchCategory = _touchCategory;
		$scope.touchProduct = _touchProduct;
		$scope.touchGroup = _touchGroup;
		$scope.jump = _jump;
		$scope.touchActivity = _touchActivity;
		$scope.touchSearchResult = _touchSearchResult;

		$scope.reload = _reload;
		$scope.loadMore = _loadMore;
        $scope.touchProduct =_touchProduct;
		// $scope.cartModel = CartModel;
        $scope.user = AppAuthenticationService.getUser();

        function _touchProduct(product) {
            $state.go('product', {
                product: product.id
            });
        }



		//首页的区域选择下拉菜单展示
		$scope.regionList = {0:'全国',2:'北京',10:'上海'}
		$scope.showRegionList = false; //是否展示下拉菜单
		$scope.changeRegionShow = _changeRegionShow;//
		$scope.changeLocation = _changeLocation;
		$scope.user_city_id = $cookies.get('user_city_id') ? parseInt($cookies.get('user_city_id')) : 0;
		$scope.region_name = $scope.user_city_id ? $scope.regionList[$scope.user_city_id] : '全国';
		function _changeLocation(region_id)
		{
			$cookies.put('user_city_id', region_id);
			$scope.user_city_id = region_id;
			$scope.region_name = $scope.user_city_id ? $scope.regionList[$scope.user_city_id] : '全国';
		}
		function _changeRegionShow()
		{
			$scope.showRegionList = !$scope.showRegionList;
		}

		function _touchSearch() {
			$state.go('search', {});
		}

		function _touchBanner(banner) {
            sessionStorage.setItem('home_offsetTop', $(window).scrollTop());
			if (!banner.link || !banner.link.length) {
				$scope.toast('没有链接');
				return;
			}

			$window.location.href = banner.link;
		}
        function _jump(cat_url){
            sessionStorage.setItem('home_offsetTop', $(window).scrollTop());
            if(!cat_url.length){
                $scope.toast('没有链接');
                return;
            }
            $window.location.href = cat_url;
        }
		function _touchNotice(notice) {
			var url = '';
			if (notice.url.indexOf("http://", 0) == -1) {
				url = "http://" + notice.url;
			} else {
				url = notice.url;
			}
			$window.location.href = url;
		}

		function _touchGroup(group) {
			$state.go('home', {
			});
		}

		function _touchCategory(category) {
			$state.go('search-result', {
                sortKey: ENUM.SORT_KEY.DATE,
                sortValue: ENUM.SORT_VALUE.DESC,

				keyword: null,
				category: category.id,

				navTitle: category.name,
				navStyle: 'default'
			});

		}

		//function _touchProduct(product) {
         //   sessionStorage.setItem('home_offsetTop', $(window).scrollTop());
		//	$state.go('product', {
		//		product: product.id,
		//	});
		//}

		function _reloadBanners() {
			API.banner
				.list({
					page: 1,
					per_page: MAX_BANNERS
				})
				.then(function (banners) {
					$scope.banners = banners;
					var timer = $timeout(function () {
						$scope.bannerSwiper = new Swiper('.swiper-container', {
							pagination: '.swiper-pagination',
							paginationClickable: true,
							spaceBetween: 30,
							centeredSlides: true,
							autoplay: 6000,
							autoplayDisableOnInteraction: false,
							loop: true
						});
					}, 1);
				});
		}

		// function _reloadNotices() {
         //    -----------------------
		// 	API.notice
		// 		.list({
		// 			page: 1,
		// 			per_page: MAX_NOTICES
		// 		})
		// 		.then(function (notices) {
		// 			$scope.notices = notices;
		// 			var timer = $timeout(function () {
		// 				$scope.noticeSwiper = new Swiper('.notice-slide', {
		// 					spaceBetween: 30,
		// 					centeredSlides: true,
		// 					autoplay: 6000,
		// 					autoplayDisableOnInteraction: false,
		// 					direction: 'vertical',
		// 					loop: true
		// 				});
		// 			}, 1);
		// 		});
		// }

		// function _reloadCategories() {
         //    //---------------
		// 	API.category
		// 		.list({
		// 			page: 1,
		// 			per_page: MAX_CATEGORIES
		// 		})
		// 		.then(function (categories) {
		// 			$scope.categories = categories;
		// 		});
		// }

		// function _reloadEditorChoice() {
         //    //-----------------
		// 	API.product
		// 		.list({
		// 			page: 1,
		// 			per_page: MAX_PRODUCTS,
		// 			sort_key: ENUM.SORT_KEY.POPULAR,
		// 			sort_value: ENUM.SORT_VALUE.DESC
		// 		})
		// 		.then(function (products) {
		// 			$scope.editorChoice = products;
		// 		});
		// }

		// function _reloadTopSale() {
		// 	API.product
         //        .list({
         //            page: 1,
         //            per_page: MAX_PRODUCTS,
         //            sort_key: ENUM.SORT_KEY.SALE,
         //            sort_value: ENUM.SORT_VALUE.DESC
         //        })
         //        .then(function (products) {
         //            $scope.topSale = products;
         //        });
		// }

		// function _reloadNewArrival() {
         //    //-----------------
		// 	API.product
		// 		.list({
		// 			page: 1,
		// 			per_page: MAX_PRODUCTS,
		// 			sort_key: ENUM.SORT_KEY.DATE,
		// 			sort_value: ENUM.SORT_VALUE.DESC
		// 		})
		// 		.then(function (products) {
		// 			$scope.newArrival = products;
		// 		});
		// }

		// function _reloadHomeList() {
         //    //-----------------
		// 	API.product
		// 		.homeList()
		// 		.then(function (data) {
		// 			$scope.newArrival = data.recently_products;
		// 			$scope.topSale = data.hot_products;
		// 			$scope.editorChoice = data.good_products;
         //           sessionStorage.setItem('list_data',JSON.stringify(data));
		// 		});
        //
		// }

        function _reloadActivityList() {
            API.banner
                .activityList({
                    page: 1,
                    per_page: 10000,
                    cate_id: 2//$scope.four_cate_id
                })
                .then(function (activity_data) {
                    if(activity_data==null ||activity_data=='undefined' ||activity_data==''){
                        return
                    }
                    // if(activity_data.length==null ||activity_data.length=='undefined'){
                    //     return
                    // }
                    $scope.activityList = activity_data;
                    if($scope.user==null ||$scope.user=='undefined' ||$scope.user==''){
                        return
                    }
                    for(let i=0;i<activity_data.length;i++){
                        if(activity_data[i].cate_id==4){
                            var params = {
                                act_id: activity_data[i].act_id,
                                company_id: typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id
                            };
                            API.activity
                                .detail(params).then(function (activity_detail) {
                                if(activity_detail){
                                    var activityList2=$scope.activityList2
                                    activity_detail.goods_list=activity_detail.goods_list.slice(0,7)
                                    $scope.activityList2 = activityList2.concat(activity_detail);
                                    for(var a=0;a<$scope.activityList2.length-1;a++){
                                        for(var b=0;b<$scope.activityList2.length-1-a;b++){
                                            if($scope.activityList2[b].act_id<$scope.activityList2[b+1].act_id){
                                                var temp = $scope.activityList2[b];
                                                $scope.activityList2[b] = $scope.activityList2[b+1];
                                                $scope.activityList2[b+1] = temp;
                                            }
                                         }
                                    }

                                }else{

                                }
                            });
                        }
                    }

                });

        }

        function _touchActivity(activity){
            // console.log($scope.user)
            if($scope.user.company.id==67 ||$scope.user.company.id==55 ||$scope.user.company.id==24){
                return
            }

            $state.go('activity', {
                act_id: activity.act_id
            });
        }

        function _touchSearchResult(brand_id){
            $state.go('search-result', {
                sortKey: ENUM.SORT_KEY.DATE,
                sortValue: ENUM.SORT_VALUE.DESC,
                keyword: null,
                category: null,
                brand_id:brand_id,
                brand_type:1,
                navTitle: null,
                navStyle: 'default'
            });
        }

        function _touchProduct(product) {
            $state.go('product', {
                product: product.id
            });
        }


        function _reload() {
            // sessionStorage.setItem("is_lis", '1');//保存点击的状态
            // sessionStorage.setItem("offsetTop1", 0);//清除上一个页面滚动位置
            // sessionStorage.setItem("offsetTop2", 0);//清除上一个页面滚动位置
            _reloadBanners();
            //_reloadNotices();
            _reloadActivityList();
            // var list_data = sessionStorage.getItem('list_data');
            // if(list_data != 'undefined' && list_data != null){
            //     var data = JSON.parse(list_data);
            //     $scope.newArrival = data.recently_products;
            //     $scope.topSale = data.hot_products;
            //     $scope.editorChoice = data.good_products;
            //     var home_offsetTop = sessionStorage.getItem('home_offsetTop');
            //     if(home_offsetTop > 0){
            //         $('html,body').animate({'scrollTop': home_offsetTop}, 0);
            //     }
            // }else{
            //     // _reloadCategories();
            //     //_reloadEditorChoice();
            //     //_reloadNewArrival();
            //     //_reloadTopSale();
            //     _reloadHomeList();
            // }

			ConfigModel.fetch().then(function(){
				var config = ConfigModel.getConfig();
	            var wechat = config['wechat.web'];
				if(wechat && CONSTANTS.FOR_WEIXIN && !AppAuthenticationService.getOpenId()){
					if ($rootScope.isWeixin()) {
						$state.go('wechat-authbase', {});
						return;
					}
				}
				_initShared();
			});
            

			// $scope.cartModel.reloadIfNeeded();
		}
		function _loadMore() {
			// TODO:
		}


		function _initConfig(wechat,url){
                if ( !wechat ) {
                    return;
                };

                wx.config({
                    debug: GLOBAL_CONFIG.DEBUG, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wechat.app_id, // 必填，公众号的唯一标识
                    timestamp: wechat.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wechat.nonceStr, // 必填，生成签名的随机串
                    signature: wechat.signature,// 必填，签名，见附录1
                    jsApiList: ['chooseWXPay',
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                console.log(wechat)



                var shared_link = url;

                wx.ready( function() {
                    wx.onMenuShareTimeline({
                        title: '首页', // 分享标题
                        desc:'',
                        link: shared_link, // 分享链接
                        imgUrl: '', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: '首页', // 分享标题
                        desc:'',
                        link: shared_link, // 分享链接
                        imgUrl: '', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQQ({
                        title: '首页', // 分享标题
                        desc: '', // 分享描述
                        link: shared_link, // 分享链接
                        imgUrl: '', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareWeibo({
                        title: '首页', // 分享标题
                        desc: '', // 分享描述
                        link: shared_link, // 分享链接
                        imgUrl: '', // 分享图标
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
					_initConfig(wechat,bonus_info.shared_link);
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