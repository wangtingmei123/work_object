(function () {

  'use strict';

  angular
  .module('app')
  .controller('ProductController', ProductController);

  ProductController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM', 'AppAuthenticationService', 'ConfirmProductService', 'CartModel','ConfigModel'];

  function ProductController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM, AppAuthenticationService, ConfirmProductService, CartModel,ConfigModel) {
      $scope.idcon = 'img-viewer-wrap';
      var MAX_COMMENTS = 3;
      var productId = $stateParams.product;
      $scope.tip_a = '';
      $scope.sgproduct_id_c=ENUM.PRODUCTSCC.CICD1;
      $scope.sgproduct_id_c1=ENUM.PRODUCTSCC.CICD2;
	  $scope.noAttrNumber = null;   //默认检查库存
	  $scope.clickAttrId = null;   //当前点击的ID检测是否第一排
      $scope.currentStock = null; //当前库存
      $scope.currentAttrs = [];   //单选属性
      $scope.currentSelectedPrice = 0;   //单选属性
      $scope.input = {
          currentAmount: 1
      };
      $scope.user = AppAuthenticationService.getUser();

      $scope.optionalAttrs = []; //多选属性
      $scope.canPurchase = false;//是否可以购买[立即购买]
      $scope.canCartPurchase = false;//是否可以添加购物车

      $scope.product = null;
      $scope.comments = [];

      $scope.cartModel = CartModel;
      $scope.toAkucun = _toAkucun;
      $scope.tousize = _tousize;
      $scope.touchAmountSub = _touchAmountSub;
      $scope.touchAmountAdd = _touchAmountAdd;
      $scope.touchAttr = _touchAttr;
      $scope.touchLike = _touchLike;
      $scope.touchComments = _touchComments;
      $scope.touchComment = _touchComment;
      $scope.touchCart = _touchCart;
      $scope.touchAddCart = _touchAddCart;
      $scope.touchPurchase = _touchPurchase;
      $scope.refreshAmount = _refreshAmount;

      $scope.formatGrade = _formatGrade;
      $scope.isAttrSelected = _isAttrSelected;
      $scope.kefu = _kefu;
      $scope.isLoading = false;
      $scope.isLoaded = false;
      $scope.is_yd = 0;
      $scope.is_yd_h = false;
      $scope.is_yd_h_son = true;
      $scope.hj_cg = 2;
      $scope.tozxlist = _tozxlist;
      $scope.torefundTipa = _torefundTipa;
      $scope.nameTipshowa = false;

      $scope.torefundTipb = _torefundTipb;
      $scope.nameTipshowb = false;
      $scope.tobrand = _tobrand;
      $scope.tograde = _tograde;

      $scope.scrollpro = _scrollpro;
      
      function _scrollpro(){
 
          var top=$(window).scrollTop()
          $(".banner_product").css({top:-(top/1.8)+"px"});


      }

      function _tobrand(brand_id){
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


      function _tograde(product_id,review_rate){
          $state.go('grade-detail', {
              product_id: product_id,
              review_rate:review_rate
          });
      }



      function _tozxlist() {
          $state.go('zx-list')
      }

      function _torefundTipb() {
          $scope.nameTipshowb = false;
      }

      function _torefundTipa() {
          $scope.nameTipshowa = false;
      }
      //客服
      function _kefu(){
          $(".layer").show()
          $(".confirm_kefu").show();
          $(".confirm_kefu").addClass("contActive");
      }


      function _touchAmountSub() {
        if ( !_checkCanPurchase() )
          return;

        if ( !$scope.product )
          return;

        if ( $scope.product.stock && $scope.product.stock.length ) {
          if ( !$scope.currentStock )
            return;
        }

        var amount = $scope.input.currentAmount;
        if ( amount <= 1 ){
            $scope.toast('受不了了，宝贝不能再少了');
            return;
        }

          $scope.input.currentAmount = amount - 1;
      }

      function _refreshAmount(){

          var amount = $scope.input.currentAmount;
          // if (amount <=0 ) {
          //     $scope.input.currentAmount = 1;
          // }
          if (amount > 2 && $scope.is_yd ==1) {
              $scope.input.currentAmount = 2;
          }

      }

      function _touchAmountAdd() {

      //    场馆预定数量最多为2
      if($scope.is_yd==1 && $scope.input.currentAmount>=2){
          return;
      }

// 指定商品数量限制



        if ( !_checkCanPurchase() )
          return;

        if ( !$scope.product )
          return;

        if ( $scope.product.stock && $scope.product.stock.length ) {
          if ( !$scope.currentStock )
            return;

          var amount = $scope.input.currentAmount;
          var stock = parseInt($scope.currentStock.stock_number);
          if ( amount >= stock )
            return;

            $scope.input.currentAmount =amount + 1;
        } else {
          var amount = $scope.input.currentAmount;
          var stock = $scope.product.good_stock;
          if ( amount >= stock )
            return;

            $scope.input.currentAmount =amount + 1;
        }

      }

     function _toAkucun(price,hj_cg=2) {

          if($scope.is_yd==1){
              $scope.currentSelectedPrice=price;
              $scope.hj_cg=hj_cg;

          }


         let product = $scope.product;
         let proper0;
         let proper1;
         let pa=1;
         let pb=2;
          for(let a=0;a<product.properties.length;a++){
              if(product.properties[a].name.indexOf('颜色')!=-1){
                  proper0=product.properties[a];
                  pa=a+1;
              }

              if(product.properties[a].name.indexOf('尺码')!=-1){
                  proper1=product.properties[a];
                  pb=a+1;
              }
          }



         //判断颜色
         if(proper0 != undefined){
             if(proper0.attrs.length>0) {
                 let active_index1=$(".titm:nth-child("+pa+") .sizeList").find(".active").index()
                 _tousize(product, proper0.attrs[active_index1])
             }
         }else{

             $(".add_cart").css({"background":"#191919","color":"#fff"})
             $(".add_cart").html('加入购物车')
             $(".add_buy").css({"background":"#df283a","color":"#fff"})
             $(".add_buy").html('立即购买')
         }

         //判断尺码
         if(proper1 != undefined){
             if(proper1.attrs.length>0) {
                 let active_index2=$(".titm:nth-child("+pb+") .sizeList").find(".active").index()
                 _tousize(product, proper1.attrs[active_index2])
             }
         }else{
             $(".add_cart").css({"background":"#191919","color":"#fff"})
             $(".add_cart").html('加入购物车')
             $(".add_buy").css({"background":"#df283a","color":"#fff"})
             $(".add_buy").html('立即购买')
         }

         // 点击颜色切换
         for(let a=0;a<$scope.product.properties.length;a++){
             if($scope.product.properties[a].name.indexOf('颜色')!=-1 || $scope.product.properties[a].name.indexOf('款式')!=-1 || $scope.product.properties[a].name.indexOf('类型')!=-1 ||$scope.product.properties[a].name.indexOf('样式')!=-1){

                 let activea=$(".titm").eq(a).find(".sizeList").find(".active").index()
                 let color_name=$.trim($scope.product.properties[a].attrs[activea].attr_name);
                 for(let b=0;b<$scope.product.photos.length;b++){
                     if(color_name==$.trim($scope.product.photos[b].name)){
                         let index = $scope.product.photos.indexOf($scope.product.photos[b])
                        
                         $scope.flashSwiper[0].slideTo(index,0);
                         $(".img_ss>img").attr('src',$scope.product.photos[b].thumb);
                         $scope.product.default_photo.large=$scope.product.photos[b].large;
                         $scope.product.default_photo.thumb=$scope.product.photos[b].thumb;
                         return;
                     }
                 }
             }
         }


     }

      function _tousize(product, attr){


              var product = $scope.product;
              //测试67，(线上421 460)

              if (product.is_real == 1 && (product.suppliers == 421 ||  product.suppliers == 460) ) {

                  var sizelist=[];
                  if(product.properties.length>0){
                      for(var i=0;i<product.properties.length;i++){
                          var name=$.trim(product.properties[i].name)
                          name=name.slice(0, 2)
                          if(name == '尺码'){
                              sizelist.push(product.properties[i].attrs)
                          }
                      }
                  }

                  sizelist=sizelist[0]
                  var suppliers=product.suppliers;


                  if(product.sku=='zx--BA5559-010' && $scope.user.company.id==47){
                      product.sku='BA5559-010'
                  }

                  for( var j=0;j<sizelist.length;j++){

                      if(sizelist[j].id == attr.id){

                          API.product
                              .searchStock({goods_sn: product.sku, size: attr.attr_name,suppliers:suppliers})
                              .then(function (tm_stock_res) {
                                  if (tm_stock_res == 0) {
                                      $scope.currentStock = null;
                                      $scope.canPurchase = false;
                                      $scope.canCartPurchase = false;
                                      $(".add_cart").css({"background":"#ccc","color":"#666"})
                                      $(".add_buy").css({"background":"#ccc","color":"#666"})
                                      $(".add_cart").html('已售罄')
                                      $(".add_buy").html('已售罄')

                                  } else {
                                      $(".add_cart").css({"background":"#191919","color":"#fff"})
                                      $(".add_cart").html('加入购物车')
                                      $(".add_buy").css({"background":"#df283a","color":"#fff"})
                                      $(".add_buy").html('立即购买')
                                  }
                              }, function (error) {
                                  $scope.isChoose = false;
                              });

                      }else{
                          // $(".add_cart").css({"background":"#191919","color":"#fff"})
                          // $(".add_cart").html('加入购物车')
                          // $(".add_buy").css({"background":"#df283a","color":"#fff"})
                          // $(".add_buy").html('立即购买')
                      }
                  }

              }else{
                  $(".add_cart").css({"background":"#191919","color":"#fff"})
                  $(".add_cart").html('加入购物车')
                  $(".add_buy").css({"background":"#df283a","color":"#fff"})
                  $(".add_buy").html('立即购买')
              }

      }



      function _touchAttr( property, attr ) {

        if ( !$scope.product )
          return;

		var product = $scope.product;

          //判断库存
          _tousize(product, attr)

        if ( attr.is_multiselect ) {
          var attrs = [].concat( $scope.optionalAttrs );
          var index = attrs.indexOf( attr.id );
          if ( -1 == index ) {
            attrs.push( attr.id );
          } else {
            attrs.splice( index, 1 );
          }
          $scope.optionalAttrs = attrs;
          _refreshPrice();
        } else {
          var stock = null;
          var attrs = [].concat( $scope.currentAttrs );
          var index = attrs.indexOf( attr.id );
          attrs.push( attr.id );
		  $scope.clickAttrId = 0;
		  for ( var i = 0; i < product.properties.length; ++i ) {
				if(i == 0){
					var property_wh = product.properties[i];
					if ( !property_wh.is_multiselect ) {
						for ( var j = 0; j < property_wh.attrs.length; ++j ) {			
							if(property_wh.attrs[j].id == attr.id){
								$scope.clickAttrId = 1;
								break;
							}	
						}
					}
				}	
		  }
		  if($scope.clickAttrId  == 1){
			  var attrs = [];
			  var index = attrs.indexOf( attr.id );
			  attrs.push( attr.id );
			  for ( var i = 1; i < product.properties.length; ++i ) {
            	var property_wh = product.properties[i];
				if ( !property_wh.is_multiselect ) {
				  $('#attr_id_'+property_wh.attrs[0].id).addClass('active').siblings().removeClass('active');
				  $('#attr_id_'+property_wh.attrs[0].id).removeClass('no_goods_attrnumber').siblings().removeClass('no_goods_attrnumber');
				  attrs.push( property_wh.attrs[0].id );
				}
          	  }
		  }
		  for ( var i in property.attrs ) {
            if ( property.attrs[i].id != attr.id ) {
              var index = attrs.indexOf( property.attrs[i].id );
              if ( -1 != index ) {
                attrs.splice( index, 1 );
              }
            }
          }
          attrs = attrs.filter(function( attr, index, self ){
            return self.indexOf(attr) === index;
          });
          attrs.sort(function(a, b){
            return a - b;
          })
          if ( attrs.length ) {
            var key = attrs.join('|');
            for ( var i = 0; i < product.stock.length; ++i ) {
              var goods_attr = product.stock[i].goods_attr;
              var goods_attr_array =  goods_attr.split("|");
              goods_attr_array.sort(function(a, b){
                return a - b;
              })
              var goods_attr_str = goods_attr_array.join('|');
              if ( goods_attr_str == key ) {
                stock = product.stock[i];

				var stock_number = parseInt(stock.stock_number);

				if($scope.clickAttrId == 1 && stock_number == 0 ){
					var attrs_wh = key.split("|");
					for ( var i = 0; i < attrs_wh.length; ++i ) {
						if(i != 0){
							$('#attr_id_'+attrs_wh[i]).addClass('no_goods_attrnumber')
						}
					}
				}
				else if( stock_number == 0){
					$('#attr_id_'+attr.id).addClass('no_goods_attrnumber')
				}
                break;
              }
            }
          }

          $scope.currentAttrs = attrs;
          $scope.currentStock = stock;
          $scope.canPurchase = _checkCanPurchase();
          $scope.canCartPurchase = _checkCartCanPurchase();

          _refreshPrice();
        }

          //选择颜色切换图片新增
          for(let a=0;a<product.properties.length;a++){
              if(product.properties[a].name.indexOf('颜色')!=-1 || product.properties[a].name.indexOf('款式')!=-1 || product.properties[a].name.indexOf('类型')!=-1 ||product.properties[a].name.indexOf('样式')!=-1){
                  let color_name=$.trim(attr.attr_name);
                  for(let b=0;b<product.photos.length;b++){
                      if(color_name==$.trim(product.photos[b].name)){
                          let index = product.photos.indexOf(product.photos[b])
                          $scope.flashSwiper[0].slideTo(index,0);
                          $(".img_ss>img").attr('src',product.photos[b].thumb);
                          $scope.product.default_photo.large=product.photos[b].large;
                          $scope.product.default_photo.thumb=product.photos[b].thumb;
                          return;
                      }

                  }
              }
          }



    }


      function _touchComments() {
          $state.go('comment', {
            product: productId
          });
      }

      function _touchComment( comment ) {
          $state.go('comment', {
            product: productId
          });
      }

      function _touchCart() {

        if ( !AppAuthenticationService.getToken() ) {
          $scope.goSignin();
          return;
        }
        if($scope.user.company.id==47){
            $state.go('cart', {});
        }else{
            $state.go('cart-select', {});
        }

      }

      function _touchLike(){
        if ( !AppAuthenticationService.getToken() ) {
          $scope.goSignin();
          return;
        }
        if ( $scope.product.is_liked ) {
            $scope.product.is_liked = false;
            API.product
            .unlike({product:productId})
            .then(function(is_liked){
              $scope.product.is_liked = is_liked;
              $scope.toast('取消收藏');
            }, function(error){
              $scope.product.is_liked = true;
            });
        } else {
            $scope.product.is_liked = true;
            API.product
            .like({product:productId})
            .then(function(is_liked){
              $scope.product.is_liked = is_liked;
              $scope.toast('收藏成功');
            }, function(error){
              $scope.product.is_liked = false;
            });
        }
      }



   //飞入购物车动画
   function fly() {

    var globalLeft = $('.jgouwc').offset().left+25;
    var globalTop = $('.jgouwc').offset().top - $(document).scrollTop() +20;

    // var img =$scope.product.photos[0].large; //获取当前点击图片链接
    var img=$(".img_ss>img").attr('src');
    var flyer = $('<img class="flyer-img" src="' + img + '">'); //抛物体对象
    // layer.msg('成功加入购物车！');
    flyer.fly({
        start: {
            left: 325,
            top: 200
        },
        end: {
            top: globalTop,
            left: globalLeft,
            width: 10,
            height: 10,
        },

        autoPlay: true, //是否直接运动,默认true
        speed: 1.5, //越大越快，默认1.2
        vertex_Rtop:20,//运动轨迹最高点top值，默认20
        onEnd: function () {
            $(flyer).remove();
        }

      })
    }







      function _touchAddCart() {
          if( $(".add_cart").html()=='已售罄'){
              $scope.nameTipshowa = true;
              $scope.tip_a = '库存不足'
              return
          }
          if($scope.product.good_stock<=0){
              $scope.nameTipshowa = true;
              $scope.tip_a = '该商品库存不足'
              return
          }

        if ( !_checkCanPurchase() )
          return;

        //虚拟商品不能添加购物车
        if($scope.product.is_real == 0){
            $scope.nameTipshowa = true;
            $scope.tip_a = '虚拟商品请点击立即购买'
            // $scope.toast('虚拟商品请点击立即购买');
            return
        }

        if ( !AppAuthenticationService.getToken() ) {
          $scope.goSignin();
          return;
        }


        let attrs = [].concat($scope.currentAttrs).concat($scope.optionalAttrs);
        let amount;
        if($scope.input.currentAmount==''||$scope.input.currentAmount<1){
            amount = 1
        }else{
            amount = $scope.input.currentAmount;
        }



          let product = $scope.product;
          let proper1;
          let pb=1;
          let pro_id=0;

          for(let b=0;b<product.properties.length;b++){
              if(product.properties[b].name.indexOf('尺码')!=-1){
                  proper1=product.properties[b];
                  pb=b+1;
              }
          }

          if(proper1 != undefined){
              if(proper1.attrs.length>0) {
                  let active_index2=$(".titm:nth-child("+pb+") .sizeList").find(".active").index();
                  pro_id=proper1.attrs[active_index2].id
              }
          }

        CartModel
        .add(productId, attrs, amount, pro_id)
        .then(function(succeed){
            if ( succeed ) {
                // $scope.nameTipshowa = true;
                // $scope.tip_a = '已添加到购物车';
                fly()
              // $scope.toast('已添加到购物车');
            }
        });
      }

      function _touchPurchase() {

          if( $(".add_buy").html()=='已售罄'){
              $scope.nameTipshowa = true;
              $scope.tip_a = '库存不足';
              return
          }
          if($scope.product.good_stock<=0){
              $scope.nameTipshowa = true;
              $scope.tip_a = '该商品库存不足'
              return
          }

        if ( !_checkCanPurchase() )
          return;

        if ( !AppAuthenticationService.getToken() ) {
          $scope.goSignin();
          return;
        }


        var product = $scope.product;
        var attrs = [].concat($scope.currentAttrs).concat($scope.optionalAttrs);
          var amount=$scope.input.currentAmount;

        ConfirmProductService.clear();
        ConfirmProductService.product = product;
        ConfirmProductService.attrs = attrs;
        if(amount==''||amount<1){
            ConfirmProductService.amount =1
        }else{
            ConfirmProductService.amount = amount;
        }

        ConfirmProductService.cgPrice = $scope.currentSelectedPrice;
        ConfirmProductService.hj_cg = $scope.hj_cg;
        $state.go('confirm-product', {});
      }

      function _refreshPrice(){
        var attrs = [].concat($scope.currentAttrs).concat($scope.optionalAttrs);

          //$scope.currentSelectedPrice = parseInt($scope.product.current_price);
          $scope.currentSelectedPrice = parseFloat($scope.product.current_price);

          for ( var i = 0; i < $scope.product.properties.length; ++i ) {
            var property = $scope.product.properties[i];
            
            for ( var j in property.attrs ) {              
                var index = attrs.indexOf( property.attrs[j].id );
                if ( -1 != index && property.attrs[j].attr_price)  {
                    $scope.currentSelectedPrice += parseFloat(property.attrs[j].attr_price);
                }              
            }
          }

      }
      function _checkCanPurchase() {
        var product = $scope.product;
        var required = false;

        if ( !product || !product.good_stock )
          return false;

        for ( var i in  product.properties ) {
          if ( !product.properties[i].is_multiselect ) {
            required = true;
            break;
          }
        }

        if ( required ) {
          if ( !$scope.currentAttrs || !$scope.currentAttrs.length ) {

            return false;
          }
          if ( !$scope.currentStock || !$scope.currentStock.stock_number) {
              $scope.nameTipshowa = true;
              $scope.tip_a = '库存不足';
              return false;
          }
        }

        return true;
      }

      function _checkCartCanPurchase() {
          var product = $scope.product;
          var required = false;

          if ( !product || !product.good_stock )
              return false;

          //虚拟商品不可以添加进购物车
          if(product.is_real == 0) {
              return false;
          }

          for ( var i in  product.properties ) {
              if ( !product.properties[i].is_multiselect ) {
                  required = true;
                  break;
              }
          }

          if ( required ) {
              if ( !$scope.currentAttrs || !$scope.currentAttrs.length ) {
                  return false;
              }
              if ( !$scope.currentStock || !$scope.currentStock.stock_number) {
                  // $scope.nameTipshowa = true;
                  // $scope.tip_a = '库存不足';
                  return false;
              }
          }

          return true;
      }


      function _formatGrade( grade ) {
        if ( ENUM.REVIEW_GRADE.BAD == grade ) {
          return '差评';
        } else if ( ENUM.REVIEW_GRADE.MEDIUM == grade ) {
          return '中评';
        } else if ( ENUM.REVIEW_GRADE.GOOD == grade ) {
          return '好评';
        }
        return '中评';
      }

      function _isAttrSelected( attr ) {

        if ( attr.is_multiselect ) {
          return $scope.optionalAttrs.indexOf(attr.id) == -1 ? false : true;
        } else {
          return $scope.currentAttrs.indexOf(attr.id) == -1 ? false : true;
        }
      }

      function _reloadProduct() {
        $scope.isLoading = true;
        API.product
        .get({product:productId})
        .then(function(product){
            if(product==null){
                $scope.nameTipshowb=true
            }

   //场馆预定
            var products=ENUM.PRODUCTS;
            var products1=ENUM.PRODUCTS1;
            var products2=ENUM.PRODUCTS2;
            var products21=ENUM.PRODUCTS21;

            for(let i=0;i<products.length;i++){
                if(product.category==products[i]){
                    $scope.is_yd = 1;
                    for(let a=0;a<products1.length;a++){
                        if(product.category==products1[a]){
                            $scope.is_yd_h = true;
                        }
                    }
                    for(let b=0;b<products2.length;b++){
                        if(product.category==products2[b]){
                            $scope.is_yd_h = false;

                            for(let c=0;c<products21.length;c++){
                                if(product.category==products21[c]){
                                    $scope.is_yd_h_son = false;

                                }
                            }


                        }
                    }

                }
            }





          product.properties.sort(function(a, b){
            return a.is_multiselect - b.is_multiselect;
          })

          $scope.product = product;
          $scope.isLoaded = true;
          $scope.isLoading = false;
          $scope.canPurchase = _checkCanPurchase();
          $scope.canCartPurchase = _checkCartCanPurchase();



          ConfigModel.fetch().then(function(){
            var config = ConfigModel.getConfig();
            var wechat = config['wxpay.web'];
            _initConfig(wechat,product.share_url);
                  return true;
          });
         


          if ( product.photos && product.photos.length > 1 ) {
            var timer = $timeout( function() {
                $scope.flashSwiper = new Swiper('.product-flash', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: false,
                    autoplayDisableOnInteraction: false,
                    loop: false
                });
            }, 1 );
          } else {
            var timer = $timeout( function() {
                $scope.flashSwiper = new Swiper('.product-flash', {
                    pagination: '.swiper-pagination',
                    paginationClickable: false,
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: 0,
                    autoplayDisableOnInteraction: false,
                    loop: false
                });
            }, 1 );
          }

          var defaultAttrIds = [];
          var defaultAttrStock = null;

          for ( var i = 0; i < product.properties.length; ++i ) {
            var property = product.properties[i];
            if ( !property.is_multiselect ) {
			 
			  if($scope.fristAttrid == null){
				$scope.fristAttrid = property.attrs[0].id;
			  }
			  else{
			  	$scope.lastAttrid = property.attrs[0].id;
			  }
              defaultAttrIds.push( property.attrs[0].id );
            }
          }

          defaultAttrIds.sort(function(a, b){
            return a - b;
          })

          if ( defaultAttrIds.length ) {
            var stockSelector = defaultAttrIds.join('|');
            for ( var i = 0; i < product.stock.length; ++i ) {

              var goods_attr = product.stock[i].goods_attr;
              var goods_attr_array =  goods_attr.split("|");

              goods_attr_array.sort(function(a, b){
                return a - b;
              })

             var goods_attr_str = goods_attr_array.join('|');
              if ( goods_attr_str == stockSelector ) {
                defaultAttrStock = product.stock[i];
                break;
              }
            }
          }
          

          $scope.currentAttrs = defaultAttrIds;
          $scope.currentStock = defaultAttrStock;
          $scope.canPurchase = _checkCanPurchase();
          $scope.canCartPurchase = _checkCartCanPurchase();
          _refreshPrice();
          _reloadComments();




                // var mySwiper = new Swiper('.swiper-container', {
                //
                // });
                setTimeout(function(){
                    (function(){
                        function auto_data_size() {
                            $("figure img").each(function () {

                                var imgs = new Image();
                                imgs.src = $(this).attr("data-yulan");
                                var w = $(this).attr('data-origin_w'),
                                    h = $(this).attr('data-origin_h');
                                $(this).parents("a").attr("data-size", w + "x" + h);
                            })
                        }

                        auto_data_size();
                        $("img.js-img-viewer").each(function(){
                            $(this).parents('.img-dv a').attr('href',$(this).attr('data-yulan'))
                        });
                        var initPhotoSwipeFromDOM = function(gallerySelector) {
                            // 解析来自DOM元素幻灯片数据（URL，标题，大小...）
                            var parseThumbnailElements = function(el) {
                                var thumbElements = el.childNodes,
                                    numNodes = thumbElements.length,
                                    items = [],
                                    figureEl,
                                    linkEl,
                                    size,
                                    item,
                                    divEl;
                                for(var i = 0; i < numNodes; i++) {
                                    figureEl = thumbElements[i]; // <figure> element
                                    // 仅包括元素节点
                                    if(figureEl.nodeType !== 1) {
                                        continue;
                                    }
                                    divEl = figureEl.children[0];
                                    linkEl = divEl.children[0];
                                    // <a> element

                                    size = linkEl.getAttribute('data-size').split('x');
                                    // 创建幻灯片对象
                                    item = {
                                        src: linkEl.getAttribute('href'),
                                        w: parseInt(size[0], 10),
                                        h: parseInt(size[1], 10)
                                    };
                                    if(figureEl.children.length > 1) {
                                        item.title = figureEl.children[1].innerHTML;
                                    }

                                    if(linkEl.children.length > 0) {
                                        // <img> 缩略图节点, 检索缩略图网址
                                        item.msrc = linkEl.children[0].getAttribute('src');

                                    }
                                    item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
                                    items.push(item);

                                }
                                return items;

                            };

                            // 查找最近的父节点
                            var closest = function closest(el, fn) {
                                return el && ( fn(el) ? el : closest(el.parentNode, fn) );
                            };

                            // 当用户点击缩略图触发
                            var onThumbnailsClick = function(e) {
                                e = e || window.event;
                                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                                var eTarget = e.target || e.srcElement;
                                var clickedListItem = closest(eTarget, function(el) {
                                    return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
                                });
                                if(!clickedListItem) {
                                    return;
                                }
                                var clickedGallery = clickedListItem.parentNode,
                                    childNodes = clickedListItem.parentNode.childNodes,
                                    numChildNodes = childNodes.length,
                                    nodeIndex = 0,
                                    index;
                                for (var i = 0; i < numChildNodes; i++) {
                                    if(childNodes[i].nodeType !== 1) {
                                        continue;
                                    }
                                    if(childNodes[i] === clickedListItem) {
                                        index = nodeIndex;
                                        break;
                                    }
                                    nodeIndex++;
                                }
                                if(index >= 0) {
                                    openPhotoSwipe( index, clickedGallery );
                                }
                                return false;
                            };

                            var photoswipeParseHash = function() {
                                var hash = window.location.hash.substring(1),
                                    params = {};
                                if(hash.length < 5) {
                                    return params;
                                }
                                var vars = hash.split('&');
                                for (var i = 0; i < vars.length; i++) {
                                    if(!vars[i]) {
                                        continue;
                                    }
                                    var pair = vars[i].split('=');
                                    if(pair.length < 2) {
                                        continue;
                                    }
                                    params[pair[0]] = pair[1];
                                }
                                if(params.gid) {
                                    params.gid = parseInt(params.gid, 10);
                                }
                                return params;
                            };

                            var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
                                var pswpElement = document.querySelectorAll('.pswp')[0],
                                    gallery,
                                    options,
                                    items;
                                items = parseThumbnailElements(galleryElement);
                                // 这里可以定义参数
                                options = {
                                    barsSize: {
                                        top: 100,
                                        bottom: 100
                                    },
                                    fullscreenEl : false,
                                    shareButtons: [
                                        {id:'wechat', label:'分享微信', url:'#'},
                                        {id:'weibo', label:'新浪微博', url:'#'},
                                        {id:'download', label:'保存图片', url:'{{raw_image_url}}', download:true}
                                    ],
                                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                                    getThumbBoundsFn: function(index) {
                                        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                                            rect = thumbnail.getBoundingClientRect();
                                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                                    }
                                };
                                if(fromURL) {
                                    if(options.galleryPIDs) {
                                        for(var j = 0; j < items.length; j++) {
                                            if(items[j].pid == index) {
                                                options.index = j;
                                                break;
                                            }
                                        }
                                    } else {
                                        options.index = parseInt(index, 10) - 1;
                                    }
                                } else {
                                    options.index = parseInt(index, 10);
                                }
                                if( isNaN(options.index) ) {
                                    return;
                                }
                                if(disableAnimation) {
                                    options.showAnimationDuration = 0;
                                }
                                gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                                gallery.init();
                            };

                            var galleryElements = document.querySelectorAll( gallerySelector );
                            for(var i = 0, l = galleryElements.length; i < l; i++) {
                                galleryElements[i].setAttribute('data-pswp-uid', i+1);
                                galleryElements[i].onclick = onThumbnailsClick;
                            }
                            var hashData = photoswipeParseHash();
                            if(hashData.pid && hashData.gid) {
                                openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
                            }
                        };
                        initPhotoSwipeFromDOM('.js-imgs-viewer-wrap');
                    })();
                },200)



        });
      }

      function _initConfig(wechat,url){

        if(!AppAuthenticationService.getToken()){
                return;
            }
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

                var shared_link = url;

                wx.ready( function() {
                    wx.onMenuShareTimeline({
                        title: '商品详情', // 分享标题
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
                        title: '商品详情', // 分享标题
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
                        title: '商品详情', // 分享标题
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
                        title: '商品详情', // 分享标题
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

      function _reloadComments() {
        if ( !$scope.product )
          return;

        API.review
        .productList({
            product:productId,
            grade:ENUM.REVIEW_GRADE.ALL,
            page:1,
            per_page:MAX_COMMENTS
        }).then(function(comments){
            $scope.comments = comments;
        });
      }

      function _reload() {
        _reloadProduct();
      }

      _reload();






  }

})();
