(function () {

	'use strict';

	angular
		.module('app')
		.controller('SearchResultController', SearchResultController);

	SearchResultController.$inject = ['$scope', '$http', '$window', '$timeout','$rootScope', '$location', '$state', '$stateParams', 'API', 'ENUM','AppAuthenticationService', '$cookies', 'SearchService'];

	function SearchResultController($scope, $http, $window, $timeout, $location, $rootScope, $state, $stateParams, API, ENUM, AppAuthenticationService, $cookies, SearchService) {

		var PER_PAGE = 10;
        $scope.l_a = null;
        $scope.l_b = null;
        $scope.page_all = 0;
        $scope.page_index =0;
        $scope.user = AppAuthenticationService.getUser();
        $scope.category_id1 = $stateParams.category_id1 ?$stateParams.category_id1:null;
        $scope.category_id2 = $stateParams.category_id2 ?$stateParams.category_id2:null;
		$scope.currentSortKey = $stateParams.sortKey ? $stateParams.sortKey : ENUM.SORT_KEY.DEFAULT;
		$scope.currentSortValue = $stateParams.sortValue ? $stateParams.sortValue : ENUM.SORT_KEY.DESC;
		$scope.currentKeyword = $stateParams.keyword ?$stateParams.keyword:null;
		$scope.currentCategory = $stateParams.category ?$stateParams.category:null;
		$scope.currentBrand = $stateParams.brand_id ? $stateParams.brand_id : null;
        $scope.contit1_id = null;
        $scope.contit2_id = null;
		$scope.currentBrandType = $stateParams.brand_type ? $stateParams.brand_type : null;
        $scope.currentMinPrice = 0;
        $scope.currentMaxPrice = 0;
		$scope.navTitle = $stateParams.navTitle;
		$scope.navStyle = $stateParams.navStyle;
        $scope.user = AppAuthenticationService.getUser();
        $scope.currentBranda=$scope.currentBrand;
        $scope.currentCategorya=$scope.currentCategory;
		if (!$scope.navStyle) {
			$scope.navStyle = 'default';
		}
         $scope.history = SearchService.history;
        //$window.history = SearchService.history;


		$scope.products = null;
		$scope.brandItem = null;
        $scope.touchSearchbabk = _touchSearchbabk;
		$scope.touchSearch = _touchSearch;
		$scope.touchSortDefault = _touchSortDefault;
		$scope.touchSortSale = _touchSortSale;
		$scope.touchSortDate = _touchSortDate;
		$scope.touchSortPrice = _touchSortPrice;
		$scope.touchSortCredit = _touchSortCredit;
		$scope.touchProduct = _touchProduct;
		$scope.loadMore = _loadMore;
		$scope.brandDetail = _brandDetail;
		$scope.touchScreen = _touchScreen; //筛选
        $scope.fenlei = _fenlei;
        $scope.touchChoos = _touchChoos;
		$scope.isEmpty = false;
		$scope.isLoaded = false;
		$scope.isLoading = false;
		$scope.isLastPage = false;
        $scope.tipprice = false;
        $scope.tippriceshoe = ''
        $scope.tatle=0;
        $scope.categories=[];
        $scope.is_current = false;
        $scope.list={
            ServiceMobile:""
        };
        $scope.brand = [];

        function  _touchChoos() {

            if($scope.l_a!=null&&$scope.l_b!=null){
                $(".contit1 .contit2").find(".contit2_box").eq($scope.l_a).find(".checkboxGroup1").find("li").eq($scope.l_b).addClass('active')
                $(".contit1 .ctips1").removeClass('active');
                $scope.l_a=null;
                $scope.l_b=null;
            }
        }


        function _fenlei(that){

            if(that.target.attributes.style.value=="background: #f2f2f2;color:#999"){

                that.target.attributes.style.value="background: #df283a;color:#fff"
                // that.target.attributes.style.textContent="background: red"
                // that.target.attributes.style.nodeValue="background: red"
            }else{
                that.target.attributes.style.value="background: #f2f2f2;color:#999"
            }

        }

        function _touchSearchbabk(){
            $state.go('search', {});
        }


        function _touchSearch() {

            if (!$scope.list.ServiceMobile || $scope.list.ServiceMobile.length < 1) {
                $scope.toast('请输入正确的关键字');
                return;
            }
            $scope.currentKeyword = $scope.list.ServiceMobile;
            $scope.currentSortKey=ENUM.SORT_KEY.DEFAULT;
            $scope.currentSortValue= ENUM.SORT_VALUE.DEFAULT;
            $scope.currentCategory= null;
            $scope.navTitle=$scope.list.ServiceMobile;
            $scope.navStyle= 'search';
            sessionStorage.removeItem('sto_products');
            _reload();

		}


		function _touchSortDefault() {
            $(".sortT3 .up").css({"border-bottom":"5px solid #4a4a4a","margin-top":0})
            $(".sortT3 .down").css({"border-top":"5px solid #4a4a4a","margin-top":0})

			var key = ENUM.SORT_KEY.DEFAULT;
			var val = ENUM.SORT_VALUE.DEFAULT;
            sessionStorage.removeItem('sto_products');
			// if (key != $scope.currentSortKey || val != $scope.currentSortValue) {
                $(".filter-item").siblings().removeClass('active');
                $(".search-filter span").eq(0).attr('class','text');
                $(".ind").eq(0).attr('class','ind');
                $(".sortT2").css("color","#4a4a4a")
                $(".sortT1").css("color","#df283a")
                $(".sortT3").css("color","#4a4a4a")
				$scope.currentSortKey = key;
				$scope.currentSortValue = val;
				_reload();
			// }
		}

		function _touchSortSale() {
			var key = ENUM.SORT_KEY.SALE;
			var val = ENUM.SORT_VALUE.DESC;
			if (key != $scope.currentSortKey || val != $scope.currentSortValue) {
				$scope.currentSortKey = key;
				$scope.currentSortValue = val;
				_reload();
			}
		}

		function _touchSortDate() {
			var key = ENUM.SORT_KEY.DATE;
			var val = ENUM.SORT_VALUE.DESC;

			if (key != $scope.currentSortKey || val != $scope.currentSortValue) {
                sessionStorage.removeItem('sto_products');
                $(".filter-item").siblings().removeClass('active');
                $(".ind").attr('class','ind');
				$scope.currentSortKey = key;
				$scope.currentSortValue = val;

				_reload();
			}
		}

		function _touchSortPrice() {
            $(".sortT2").css("color","#4a4a4a")
            $(".sortT1").css("color","#4a4a4a")
            $(".sortT3").css("color","#df283a")
			var key = ENUM.SORT_KEY.PRICE;
			var val = ENUM.SORT_VALUE.DESC;

			if ($scope.currentSortKey == ENUM.SORT_KEY.PRICE) {

				if ($scope.currentSortValue == ENUM.SORT_VALUE.DEFAULT || $scope.currentSortValue == ENUM.SORT_VALUE.ASC) {

                    $(".sortT3 .up").css({"border-bottom":"0 solid #df283a"})
                    $(".sortT3 .down").css({"border-top":"5px solid #df283a","margin-top":"-4px"})
					key = ENUM.SORT_KEY.PRICE;
					val = ENUM.SORT_VALUE.DESC;
				} else {
                    $(".sortT3 .down").css("border-top","0 solid #df283a")
                    $(".sortT3 .up").css({"border-bottom":"5px solid #df283a","margin-top":"4px"})
					key = ENUM.SORT_KEY.PRICE;
					val = ENUM.SORT_VALUE.ASC;
				}
			} else {
                $(".sortT3 .up").css({"border-bottom":"0 solid #df283a"})
                $(".sortT3 .down").css({"border-top":"5px solid #df283a","margin-top":"-4px"})
				key = ENUM.SORT_KEY.PRICE;
				val = ENUM.SORT_VALUE.DESC;
			}
            if(key != $scope.currentSortKey){
                $(".filter-item").siblings().removeClass('active');
            }
			if (key != $scope.currentSortKey || val != $scope.currentSortValue) {
                sessionStorage.removeItem('sto_products');
				$scope.currentSortKey = key;
				$scope.currentSortValue = val;
				_reload();
			}
		}

		function _touchSortCredit() {
			var key = ENUM.SORT_KEY.CREDIT;
			var val = ENUM.SORT_VALUE.DESC;
			if (key != $scope.currentSortKey || val != $scope.currentSortValue) {
				$scope.currentSortKey = key;
				$scope.currentSortValue = val;
				_reload();
			}
		}
        _tochoos()
        //筛选选项
        function _tochoos() {
            API.category
                .list({
                    page: 1,
                    per_page: PER_PAGE,
                    company_id: typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id
                })
                .then(function (categories) {
                    if (categories && categories.length) {

                        var catea=[]
                        if($scope.currentCategory!=null){
                            for(let i=0;i<categories.length;i++){
                                if($scope.category_id1!=null){
                                    if($scope.category_id1==categories[i].id){
                                        catea.push(categories[i].categories)
                                        for(let a=0;a<catea[0].length;a++){
                                            if($scope.category_id2==catea[0][a].id){
                                                let cateab=catea[0][a].three_categories;
                                                for(let b=0;b<cateab.length;b++){
                                                    if($scope.currentCategory==cateab[b].cat_id){
                                                        $scope.l_a=a;
                                                        $scope.l_b=b;
                                                    }
                                                }
                                            }
                                        }

                                    }

                                }else{
                                    if($scope.currentCategory==categories[i].id){
                                        catea.push(categories[i].categories)
                                    }
                                }

                            }
                            $scope.categories=catea[0]
                            var brand=[]

                            if($scope.currentCategory=='2192' || $scope.category_id1=='2192'){
                                brand=[{'id':'43','name':'PHILIPS飞利浦'},
                                    {'id':'77','name':'Dyson戴森'},
                                    {'id':'88','name':'Beats'},
                                    {'id':'89','name':'B&O'},
                                    {'id':'90','name':'JBL'},
                                    {'id':'91','name':'斐讯'},
                                    {'id':'96','name':'Midea美的'},
                                    {'id':'97','name':'BOSE'},
                                    {'id':'98','name':'哈曼卡顿'},
                                    {'id':'462','name':'莱克'},
                                    {'id':'121','name':'TCL'},
                                    {'id':'182','name':'亚都'}

                                ]
                                $scope.brand=brand
                            }else if($scope.currentCategory=='2103' || $scope.category_id1=='2103'){
                                brand=[{'id':'1','name':'Adidas阿迪达斯'},
                                    {'id':'5','name':'New Balance新百伦'},
                                    {'id':'7','name':'Skechers斯凯奇'},
                                    {'id':'8','name':'Jack Wolfskin狼爪'},
                                    {'id':'9','name':'Columbia哥伦比亚'},
                                    {'id':'12','name':'Nathome北欧欧慕'},
                                    {'id':'79','name':'Nike耐克'},
                                    {'id':'80','name':'Adidas Originals阿迪三叶草'},
                                    {'id':'81','name':'PUMA彪马'},
                                    {'id':'82','name':'Converse匡威'},
                                    {'id':'87','name':'Onitsuka Tiger鬼冢虎'},
                                    {'id':'351','name':'Under Armour安德玛'}
                                ]
                                $scope.brand=brand
                            }else if($scope.currentCategory=='2136' || $scope.category_id1=='2136'){
                                brand=[{'id':'136','name':'斯伯丁'},
                                    {'id':'288','name':'MobiGarden牧高笛'},
                                    {'id':'179','name':'McDavid迈克达威'},
                                    {'id':'333','name':'高特'},
                                    {'id':'1','name':'Adidas阿迪达斯'},
                                    {'id':'79','name':'Nike耐克'},
                                    {'id':'99','name':'Wilson'},
                                    {'id':'177','name':'SCALER思凯乐'},
                                    {'id':'460','name':'蕉下'},
                                    {'id':'138','name':'Kenmont卡蒙'}
                                ]
                                $scope.brand=brand
                            }else if($scope.currentCategory=='2095' || $scope.category_id1=='2095'){
                                brand=[{'id':'181','name':'车点点'},
                                    {'id':'3','name':'大众书局'},
                                    {'id':'240','name':'网票网'}

                                ]
                            }else if($scope.currentCategory=='2095' || $scope.category_id1=='2095'){
                                brand=[{'id':'218','name':'中粮'},
                                    {'id':'249','name':'特华得'},
                                    {'id':'464','name':'碧青园'}
                                ]
                                $scope.brand=brand
                            }else if($scope.currentCategory=='2172' || $scope.category_id1=='2172'){
                                brand=[{'id':'215','name':'LOVO罗莱'},
                                    {'id':'230','name':'博堡'},
                                    {'id':'238','name':'DESLON德世朗'},
                                    {'id':'356','name':'富安娜'},
                                    {'id':'439','name':'迪士尼Disney'},
                                    {'id':'286','name':'博洋家纺'},
                                    {'id':'355','name':'彩羊（恒源祥）'},
                                    {'id':'248','name':'水星家纺'},
                                    {'id':'219','name':'Westinghouse西屋'},
                                    {'id':'241','name':'Thermos膳魔师'},
                                    {'id':'406','name':'米技（MIJI）'},
                                    {'id':'23','name':'HUGO BOSS'},
                                    {'id':'220','name':'帕拉Para'}
                                ]
                                $scope.brand=brand
                            }

                        }
                    } else {
                        $scope.categories = null;
                    }
                });



        }

        //筛选
        function _touchScreen() {
            $(".sortT3 .up").css({"border-bottom":"5px solid #4a4a4a","margin-top":0})
            $(".sortT3 .down").css({"border-top":"5px solid #4a4a4a","margin-top":0})
            $(".sortT2").css("color","#df283a")
            $(".sortT1").css("color","#4a4a4a")
            $(".sortT3").css("color","#4a4a4a")
            $scope.currentMinPrice = parseInt($("#input_min_price").val());
            $scope.currentMaxPrice= parseInt($("#input_max_price").val());
            if($scope.currentMinPrice>$scope.currentMaxPrice){
                $scope.tipprice=true
                $scope.tippriceshoe='最低价不得高于最高价'
                return
            }
            if(parseInt($("#input_max_price").val())<=0){
                $scope.tipprice=true
                $scope.tippriceshoe='最高价不得小于等于0'
                return
            }

            if($scope.currentMinPrice==''||$scope.currentMinPrice==' '){
                $scope.currentMinPrice=0
            }
            if($scope.currentMaxPrice==''||$scope.currentMaxPrice==' '){
                $scope.currentMaxPrice=0
            }

            $(".searchLayer").removeClass("searchLayerAni");

            var contit1=$(".contit1").find(".contit2 .active")
            var contit1_id={}
             for(var i=0;i<contit1.length;i++){
                 contit1_id[i]=contit1[i].attributes.data.value
                 // contit1_id.push(contit1[i].attributes.data.value)
             }
            var contit2=$(".contit2").find(".contit2 .active")
            var contit2_id={}
            for(var i=0;i<contit2.length;i++){
                contit2_id[i]=contit2[i].attributes.data.value
            }


            if(JSON.stringify(contit1_id)!='{}'){
                $scope.currentCategory=JSON.stringify(contit1_id)
            }else{
                $scope.currentCategory=$scope.currentCategorya
            }
            if(JSON.stringify(contit2_id)!='{}'){
                $scope.currentBrand=JSON.stringify(contit2_id)
            }else{
                $scope.currentBrand=$scope.currentBranda
            }


            // var screen_brand_id = $(".brand .active").attr('data');
            if(!$scope.currentMinPrice && !$scope.currentMaxPrice){
                var index = $(".checkboxGroup2 .active").index();
                if(index == 0){
                    $scope.currentMinPrice = 0;
                    $scope.currentMaxPrice = 200;
                }else if(index == 1){
                    $scope.currentMinPrice = 200;
                    $scope.currentMaxPrice = 499;
                }else if(index == 2){
                    $scope.currentMinPrice = 500;
                    $scope.currentMaxPrice = 999;
                }else if(index == 3){
                    $scope.currentMinPrice = 1000;
                    $scope.currentMaxPrice = 1999;
                }else if(index == 4){
                    $scope.currentMinPrice = 2000;
                    // $scope.currentMaxPrice = 100000000;
                }
            }
                sessionStorage.removeItem('sto_products');
                $(".filter-item").siblings().removeClass('active');
                $(".ind").attr('class','ind');

                $scope.is_current = true;

                _reload();

        }

		function _touchProduct(product) {
            //var st = $(".app").scrollTop();
            //sessionStorage.searchScrollTop = st;

            sessionStorage.setItem("offsetTop", $(window).scrollTop());//保存滚动位置
			$state.go('product', {
				product: product.id
			});
		}

		function _reload() {
            if ($scope.isLoading)
				return;

            if($scope.currentBrand && $scope.currentBrandType){
                _brandDetail();
            }
			$scope.products = null;
			$scope.isEmpty = false;
			$scope.isLoaded = false;
            var cate = sessionStorage.getItem('category');
            var city_id = sessionStorage.getItem('user_city_id');
            var brand_id = sessionStorage.getItem('brand');
            var max_price = sessionStorage.getItem('max_price');
            if(($scope.currentCategory > 0 && $scope.currentCategory != cate) ||
                ($cookies.get('user_city_id') > 0 && $cookies.get('user_city_id') != city_id && city_id != null)
             || ($scope.currentBrand > 0 && $scope.currentBrand != brand_id)
             || ($scope.currentMaxPrice > 0 && $scope.currentMaxPrice != max_price)
            ){

                sessionStorage.removeItem('sto_products');
            }

            var sto_products = sessionStorage.getItem('sto_products');
            if(sto_products != 'undefined' && sto_products != null) {



                $scope.products = JSON.parse(sto_products);
                var offset = sessionStorage.getItem("offsetTop");
                if (offset > 0) {
                    $('html,body').animate({'scrollTop': offset}, 0);
                }
                var k = sessionStorage.getItem('keyword');
                if(!k && k != 'undefined' && k != 0){
                    $scope.currentKeyword = k;
                }
                var sort_key = sessionStorage.getItem('sort_key');
                var sort_value = sessionStorage.getItem('sort_value');
                $scope.currentSortKey = sort_key;
                $scope.currentSortValue = sort_value;
                if(sort_key == 0){
                    $(".filter-item").siblings().removeClass('active');
                    $(".filter-item").eq(0).attr('class','filter-item active');
                    $(".search-filter span").eq(0).attr('class','text');
                }else if(sort_key == 5){
                    $("span.text").eq(0).attr('class','');
                    $(".filter-item").eq(1).attr('class','filter-item active');
                    $(".filter-item").eq(1).find('span').attr('class','text');
                }else if(sort_key == 1){
                    $("span.text").eq(0).attr('class','');
                    $(".filter-item").eq(2).attr('class','filter-item active');
                    if(sort_value ==1){
                        $(".ind").eq(0).attr('class','ind active');
                        $(".ind").eq(1).attr('class','ind');
                    }else if(sort_value ==2){
                        $(".ind").eq(1).attr('class','ind active');
                        $(".ind").eq(0).attr('class','ind');
                    }
                }
                if(sessionStorage.getItem('tatle')!= 'undefined' && sessionStorage.getItem('tatle') != null){
                    $scope.tatle=sessionStorage.getItem('tatle');
                    $(".tipp_box").css("display","block")
                    setTimeout(function () {
                        $(".tipp_box").css("display","none")
                    },2000)
                }
                if(sessionStorage.getItem('page_index')!= 'undefined' && sessionStorage.getItem('page_index') != null){
                    $scope.page_index=sessionStorage.getItem('page_index');
                }
                if(sessionStorage.getItem('page_all')!= 'undefined' && sessionStorage.getItem('page_all') != null) {
                    $scope.page_all=sessionStorage.getItem('page_all');
                }


            }else{
                _fetch(1, PER_PAGE);
            }

		}

        function _loadMore() {
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height();
            var windowHeight = $(window).height();
            var scrollHeight=document.body.scrollHeight;


            if(scrollTop + windowHeight != docHeight) {
                    return;
            }
			if ($scope.isLoading)
				return;
			if ($scope.isLastPage)
				return;
            if ($scope.isEmpty)
                return;

			if ($scope.products && $scope.products.length) {
				_fetch(Math.ceil(($scope.products.length / PER_PAGE) + 1), PER_PAGE);
			} else {
				_fetch(1, PER_PAGE);
			}
            //if(sessionStorage.offsetTop){
            //    setTimeout(function(){
            //        $(".app").scrollTop(parseInt(sessionStorage.offsetTop));
            //    },10)
            //}
		}

		function _fetch(page, perPage) {
			$scope.isLoading = true;

			var params = {};

			if($scope.currentCategory){
				params.category = $scope.currentCategory;
			}

			if($scope.currentKeyword){
				params.keyword = $scope.currentKeyword;
			}

            if($scope.currentBrand){
                params.brand = $scope.currentBrand;
            }

            if($scope.currentMinPrice){
                params.min_price = $scope.currentMinPrice;
            }

            if($scope.currentMaxPrice){
                params.max_price = $scope.currentMaxPrice;
            }
            params.company_id = typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id;

			if($cookies.get('user_city_id')) {
				params.user_city_id = $cookies.get('user_city_id');
			}

			params.sort_key = $scope.currentSortKey;
			params.sort_value = $scope.currentSortValue;
			params.page = page;
			params.per_page = perPage;


                // sessionStorage.setItem('category',$scope.currentCategory);
                // sessionStorage.setItem('brand',$scope.currentBrand);

                sessionStorage.setItem('keyword',$scope.currentKeyword);
                sessionStorage.setItem('user_city_id',$cookies.get('user_city_id'));
                sessionStorage.setItem('sort_key',$scope.currentSortKey);
                sessionStorage.setItem('sort_value',$scope.currentSortValue);
                sessionStorage.setItem('max_price',$scope.currentMaxPrice);


            if(!$scope.is_current){
                sessionStorage.setItem('brand',$scope.currentBrand);
                sessionStorage.setItem('category',$scope.currentCategory);
            }


			API.product.list(params).then(function (data) {
			    if(page==1){
                   $scope.tatle=data.paged.total;
                    sessionStorage.setItem('tatle',$scope.tatle);
                    console.log(sessionStorage.getItem('tatle'))

                    $scope.page_all = Math.ceil($scope.tatle/perPage);
                    sessionStorage.setItem('page_all', $scope.page_all);
                    $(".tipp_box").css("display","block")
                    setTimeout(function () {
                        $(".tipp_box").css("display","none")
                    },2000)

                }

			    if(data.products.length>0){
                    $scope.page_index =data.paged.page;
                    sessionStorage.setItem('page_index', data.paged.page);
                }


                var products=data.products;
				$scope.products = $scope.products ? $scope.products.concat(products) : products;
				$scope.isEmpty = ($scope.products && $scope.products.length) ? false : true;
				$scope.isLoaded = true;
                //$scope.isLoading = false;

				$scope.isLastPage = (products && products.length < perPage) ? !$scope.isEmpty : false;
                if($scope.isLastPage && $scope.isLoaded){
                    $scope.isLoading = false;
                }else{
                    setTimeout(function(){
                        $scope.isLoading = false;
                    },2000);
                }
                sessionStorage.setItem('sto_products',JSON.stringify($scope.products));
			});
		}


        window.onload = function() {
            document.body.addEventListener("touchmove", function(evt) {
                if (!evt._isScroller) {
                    evt.preventDefault();
                }
            });

            var gamerule = document.querySelector(".proList");
            var overscroll = function(el) {
                el.addEventListener("touchstart", function() {
                    var top = el.scrollTop,
                        totalScroll = el.scrollHeight,
                        currentScroll = top + el.offsetHeight;
                    if (top === 0) {
                        el.scrollTop = 1;
                    } else if (currentScroll === totalScroll) {
                        el.scrollTop = top - 1;
                    }
                });
                el.addEventListener("touchmove", function(evt) {
                    if (el.offsetHeight < el.scrollHeight)
                        evt._isScroller = true;
                });
            };
        };



        function _brandDetail(){
            var params = {};
            params.brand_id = $scope.currentBrand;
            API.brand.detail(params).then(function (brandItem) {
                if(brandItem){
                    $scope.brandItem = brandItem;
                }else{
                    $scope.brandItem = null;
                }
            });
        }

		_reload();
	}

})();