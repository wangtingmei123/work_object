(function () {

    'use strict';

    angular
        .module('app')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$scope', '$http', '$location', '$state', 'API', 'ENUM', 'CartModel','AppAuthenticationService'];

    function CategoryController($scope, $http, $location, $state, API, ENUM, CartModel,AppAuthenticationService) {

        var PER_PAGE = 1000;
        $scope.data = {};
        $scope.categories = [];
        $scope.brands = [];
        $scope.selectedSide = null;
        $scope.active_t=true;
        $scope.touchFenlei=_touchFenlei;
        $scope.touchSearch = _touchSearch;
        $scope.touchSide = _touchSide;
        $scope.touchMain = _touchMain;
        $scope.touchBrand = _touchBrand;
        // $scope.touchBrand1= _touchBrand1;
        $scope.touchSearchResult = _touchSearchResult;
        $scope.touchBrandall = _touchBrandall;
        $scope.cartModel = CartModel;
        $scope.loadMoresc = _loadMoresc;
        $scope.loadMoresc1 = _loadMoresc1;
        $scope.user = AppAuthenticationService.getUser();
        $scope.shop_img_url = ENUM.SHOP_IMG_URL;

        function _loadMoresc() {
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height();
            var windowHeight = $(window).height();
            var scrollHeight=document.body.scrollHeight;

            if(scrollTop + windowHeight != docHeight) {
                return;
            }
        }

        function _loadMoresc1() {
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height();
            var windowHeight = $(window).height();
            var scrollHeight=document.body.scrollHeight;

            if(scrollTop + windowHeight != docHeight) {
                return;
            }
        }

        window.onload = function() {
            document.body.addEventListener("touchmove", function(evt) {
                if (!evt._isScroller) {
                    evt.preventDefault();
                }
            });

            var gamerule = document.querySelector(".list_li");
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



        //跳转到全部品牌页面
        function _touchBrandall(){
            sessionStorage.setItem("is_lis", '2');//保存点击的状态
            $state.go('brand-all', {});
        }


        function _touchSearch() {
            $state.go('search', {});
        }

        function _touchSide(index) {
            $scope.selectedSide = $scope.categories[index];
            $scope.subCategories = $scope.categories[index].categories;
            sessionStorage.setItem('s_index',index);
        }

        function _touchMain(main,id,category_id,category2_id) {

            sessionStorage.setItem("is_lis", '1');//保存点击的状态
            sessionStorage.setItem("offsetTop1", $(window).scrollTop());//保存滚动位置
            if (id > 0) {
                //var side = $scope.selectedSide;
                var side = main;
                $state.go('search-result', {
                    sortKey: ENUM.SORT_KEY.DATE,
                    sortValue: ENUM.SORT_VALUE.DESC,
                    keyword: null,
                    category: side.id,
                    navTitle: side.name,
                    navStyle: 'default',
                    category_id1:category_id,
                    category_id2:category2_id,
                });

            } else {

                $state.go('search-result', {
                    sortKey: ENUM.SORT_KEY.DATE,
                    sortValue: ENUM.SORT_VALUE.DESC,
                    keyword: null,
                    category: main.cat_id,
                    navTitle: main.name,
                    navStyle: 'default',
                    category_id1:category_id,
                    category_id2:category2_id,
                });

            }
        }


        function _touchSearchResult(brand_id){
            sessionStorage.setItem("is_lis", '2');//保存点击的状态
            sessionStorage.setItem("offsetTop2", $(window).scrollTop());//保存滚动位置
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

       function _touchFenlei(){
           $scope.brands = null;
           _reloadCategories();
       }
        function _touchBrand(){
            $scope.brands =  _reloadBrands();
        }



        //分类
        function _reloadCategories() {
            API.category
                .list({
                    page: 1,
                    per_page: PER_PAGE,
                    company_id: typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id
                })
                .then(function (categories) {
                    if (categories && categories.length) {
                        $scope.categories = categories;
                        var s_index = sessionStorage.getItem('s_index');
                        var offset1 = sessionStorage.getItem("offsetTop1");
                        if (offset1 > 0) {
                            $('html,body').animate({'scrollTop': offset1}, 0);
                        }

                        s_index = s_index == null ? 0 : s_index;
                        $scope.selectedSide = categories[s_index];
                        $scope.subCategories = categories[s_index].categories;
                        //$scope.selectedSide = categories[0];
                        //$scope.subCategories = categories[0].categories;
                    } else {
                        $scope.categories = null;
                        $scope.selectedSide = null;
                        $scope.subCategories = null;
                    }
                });
        }

        //品牌
        function _reloadBrands() {
            API.brand
                .list({
                    page: 1,
                    per_page: PER_PAGE
                })
                .then(function (brands) {

                    if (brands && brands.length) {
                        $scope.brands = brands;

                        var offset2 = sessionStorage.getItem("offsetTop2");
                        if (offset2 > 0) {
                            $('html,body').animate({'scrollTop': offset2}, 0);
                        }
                    } else {
                        $scope.brands = null;
                    }
                });
        }

        function _reload() {

            var is_lis = sessionStorage.getItem("is_lis");
            if(is_lis=='1'||is_lis==null){
                $(".islis1").addClass("active").siblings("li").removeClass("active")
                _reloadCategories();

            }else if(is_lis=='2'){
                $(".islis2").addClass("active").siblings("li").removeClass("active")
                _reloadBrands()
            }

        }

        _reload();
    }

})();