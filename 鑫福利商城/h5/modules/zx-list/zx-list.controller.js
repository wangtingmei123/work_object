(function () {

    'use strict';

    angular
        .module('app')
        .controller('ZxlistController', ZxlistController);

    ZxlistController.$inject = ['$scope', '$http', '$window', '$timeout','$rootScope', '$location', '$state', '$stateParams', 'API', 'ENUM','AppAuthenticationService', '$cookies', 'SearchService','ConfigModel'];


    function ZxlistController($scope, $http, $window, $timeout, $location, $rootScope, $state, $stateParams, API, ENUM, AppAuthenticationService, $cookies, SearchService,ConfigModel) {

        ConfigModel.fetch();
        $scope.sh_shijian = '';
        $scope.shijian = true;
        var PER_PAGE = 100;
        $scope.show_tip = false;
        $scope.currentSortKey = 5;
        $scope.currentSortValue = 0;
        $scope.currentKeyword =null;
        $scope.currentCategory = 2338;
        // sessionStorage.setItem('category',$scope.currentCategory);
        $scope.currentBrand = null;
        $scope.contit1_id = null;
        $scope.contit2_id = null;
        $scope.currentBrandType = null;
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


        $scope.empe_nos='';
        $scope.dept_no='';
        $scope.cesum = '';
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
        // $scope.loadMore = _loadMore;
        $scope.brandDetail = _brandDetail;
        $scope.touchScreen = _touchScreen; //筛选
        $scope.fenlei = _fenlei;
        $scope.isEmpty = false;
        $scope.isLoaded = false;
        $scope.isLoading = false;
        $scope.isLastPage = false;
        $scope.tipprice = false;
        $scope.tippriceshoe = '';
        $scope.tatle=0;
        $scope.categories=[];
        $scope.is_current = false;
        $scope.list={
            ServiceMobile:""
        };
        $scope.brand = [];
        $scope.touchme = _touchme;
        $scope.touchcart = _touchcart;
        $scope.hidetip = _hidetip;





        function _hidetip(){
            $scope.show_tip = false;
        }


        function _touchcart (){
            sessionStorage.setItem("offsetTop", $(window).scrollTop());//保存滚动位置
            $state.go('cart');
        }

        function _touchme (){
            sessionStorage.setItem("offsetTop", $(window).scrollTop());//保存滚动位置
            $state.go('profile');
        }


     console.log("aa1")

        function GetRequest(urlStr) {
                if (typeof urlStr == "undefined") {
                         var url = decodeURI(location.search); //获取url中"?"符后的字符串
                   } else {
                         var url = "?" + urlStr.split("?")[1];
                    }
                var theRequest = new Object();
               if (url.indexOf("?") != -1) {
                         var str = url.substr(1);
                       var strs = str.split("&");
                       for (var i = 0; i < strs.length; i++) {
                                 theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                             }
                     }
                 return theRequest;
             }
        var aa=window.location.href;
        console.log("aa2")
        console.log(aa)
        var parms_2 = GetRequest(aa);

        if(parms_2['empe_no']!=undefined &&parms_2['dept_no']!=undefined){
            $scope.show_tip = true;
            sessionStorage.setItem("empe_no", parms_2['empe_no'])
            sessionStorage.setItem("dept_no", parms_2['dept_no'])
        }
        console.log("aa3")
        console.log(parms_2['empe_no'])
        console.log(parms_2['dept_no'])
        const key = CryptoJS.enc.Utf8.parse("0102030405060708");  //十六位十六进制数作为密钥
        const iv = CryptoJS.enc.Utf8.parse('0102030405060708');   //十六位十六进制数作为密钥偏移量

        //解密方法
        function Decrypt(word) {
            let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
            let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
            let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
            return decryptedStr.toString();
        }
        //加密方法
        function Encrypt(word) {
            let srcs = CryptoJS.enc.Utf8.parse(word);
            let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            return encrypted.ciphertext.toString().toUpperCase();
        }

        console.log("ddddddddddddd")
        console.log(Encrypt('025361'))
        console.log(Encrypt('025608'))

          // var empe_nos='022569';
          // var dept_no='信息传媒';

        var empe_nos='';
        var dept_no='';

        if(parms_2['empe_no']==undefined && parms_2['dept_no']==undefined){
            empe_nos=Decrypt(sessionStorage.getItem('empe_no'))
            dept_no=sessionStorage.getItem('dept_no')
        }else{
            empe_nos=Decrypt(parms_2['empe_no'])
            dept_no=parms_2['dept_no']
        }

        console.log("aa4")
        console.log(empe_nos)
        console.log(dept_no)

      function _usercodesignin() {
          API.auth.base
              .usercodesignin({user_name:empe_nos, department_name:dept_no})
              .then(function(success){
                  console.log("aa5")
                  console.log($scope.user)
                  $scope.user = AppAuthenticationService.getUser();
                  $scope.empe_nos=$scope.user.company.real_name;
                  $scope.dept_no=$scope.user.company.department_name;
                  _balancesum()
                  console.log("aa6")
                  if (success) {
                      $scope.toast('登录成功');
                  }
                  else{
                      $scope.toast('登录失败');
                  }

              });
      }

        _usercodesignin();



        function _balancesum() {
            var params = {};

            params.user_id = $scope.user.id;
            API.product.balancesum(params).then(function (data) {
                $scope.cesum=data

            })
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
            $('html,body').animate({'scrollTop': 0}, 0);
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
                    key = ENUM.SORT_KEY.PRICE;
                    val = ENUM.SORT_VALUE.DESC;
                } else {
                    key = ENUM.SORT_KEY.PRICE;
                    val = ENUM.SORT_VALUE.ASC;
                }
            } else {
                key = ENUM.SORT_KEY.PRICE;
                val = ENUM.SORT_VALUE.DESC;
            }
            if(key != $scope.currentSortKey){
                $(".filter-item").siblings().removeClass('active');
            }
            if (key != $scope.currentSortKey || val != $scope.currentSortValue) {
                sessionStorage.removeItem('sto_products');
                $('html,body').animate({'scrollTop': 0}, 0);
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
                    company_id: 47
                })
                .then(function (categories) {
                    if (categories && categories.length) {

                        var catea=[]
                        if($scope.currentCategory!=null){
                            catea.push(categories[0].categories)
                            $scope.categories=catea[0]
                        }
                    } else {
                        $scope.categories = null;
                    }
                });



        }

        //筛选
        function _touchScreen() {
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
            $('html,body').animate({'scrollTop': 0}, 0);
            $scope.products = [];
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
            var sto_products = sessionStorage.getItem('sto_products');
            if(sto_products != 'undefined' && sto_products != null) {
                $scope.products = JSON.parse(sto_products);
                var offset = sessionStorage.getItem("offsetTop");
                if (offset > 0) {
                    $('html,body').animate({'scrollTop': offset}, 0);
                }

            }else{
                _fetch(1, PER_PAGE);
            }


        }

        // function _loadMore() {
        //
        //     var scrollTop = $(window).scrollTop();
        //     var docHeight = $(document).height();
        //     var windowHeight = $(window).height();
        //     var scrollHeight=document.body.scrollHeight;
        //
        //     // if(scrollTop + windowHeight != docHeight) {
        //     //     return;
        //     // }
        //     if ($scope.isLoading)
        //         return;
        //     if ($scope.isLastPage)
        //         return;
        //     if ($scope.isEmpty)
        //         return;
        //
        //     if ($scope.products && $scope.products.length) {
        //         _fetch(Math.ceil(($scope.products.length / PER_PAGE) + 1), PER_PAGE);
        //     } else {
        //         _fetch(1, PER_PAGE);
        //     }
        //     // if(sessionStorage.offsetTop){
        //     //    setTimeout(function(){
        //     //        $(".app").scrollTop(parseInt(sessionStorage.offsetTop));
        //     //    },10)
        //     // }
        // }

        function _fetch(page, perPage) {


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
            // params.company_id = typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id;
            params.company_id = 47;

            if($cookies.get('user_city_id')) {
                params.user_city_id = $cookies.get('user_city_id');
            }

            params.sort_key = $scope.currentSortKey;
            params.sort_value = $scope.currentSortValue;
            params.page = page;
            params.per_page = perPage;



            API.product.zxlist(params).then(function (data) {
                    $scope.tatle=data.paged.total;
                    $(".tipp_box").css("display","block")
                    setTimeout(function () {
                        $(".tipp_box").css("display","none")
                    },2000)

                console.log(data)
                var products=data.products.data;
                $scope.products = products;
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