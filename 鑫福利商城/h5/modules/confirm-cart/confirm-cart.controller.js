(function () {

	'use strict';

	angular
		.module('app')
		.controller('ConfirmCartController', ConfirmCartController);

	ConfirmCartController.$inject = ['$scope', '$http', '$location', '$state', '$rootScope', '$timeout', '$stateParams', 'API', 'ENUM', 'ConfirmCartService', 'ExpressSelectService', 'InvoiceSelectService', 'PaymentModel', '$interval'];

	function ConfirmCartController($scope, $http, $location, $state, $rootScope, $timeout, $stateParams, API, ENUM, ConfirmCartService, ExpressSelectService, InvoiceSelectService, PaymentModel, $interval) {

		if (!ConfirmCartService.goods || !ConfirmCartService.goods.length) {
			$timeout(function () {
				$rootScope.goHome();
			}, 1);
			return;
		}
        $scope.buzu = false;
        $scope.goodm = [];
		$scope.isSubmitIng = false;
        $scope.kucun =false;
        $scope.show_cup=false;
        $scope.cpu_len=0;
        $scope.cpu_len_lod=true;
        $scope.cpu_len_show=false;
        $scope.cpu_len_mun=0;
        $scope.toshoplist = _toshoplist;
        $scope.show_cpu = _show_cpu;
		$scope.touchAddress = _touchAddress;
		$scope.touchExpress = _touchExpress;
		$scope.touchInvoice = _touchInvoice;
		$scope.touchCashgift = _touchCashgift;
		$scope.touchSubmit = _touchSubmit;
		$scope.refreshScore = _refreshScore;
		$scope.refreshComment = _refreshComment;
		$scope.useCard = _useCard;
		$scope.getUserAccount = _getUserAccount;
        $scope.queding = _queding;
        $scope.nameTipshow = false;
        $scope.torefundTip = _torefundTip;

        function _torefundTip(){
            $scope.nameTipshow = false;
		}

        $scope.nameTipshowa = false;
        $scope.torefundTipa = _torefundTipa;
        $scope.tip_a = '';
        function _torefundTipa() {
            $scope.nameTipshowa = false;
        }


		$scope.goods = ConfirmCartService.goods;
        // $scope.kucun = ConfirmCartService.kucun;
		$scope.consignee = ConfirmCartService.consignee;
		$scope.invoiceType = ConfirmCartService.invoiceType;
		$scope.invoiceTitle = ConfirmCartService.invoiceTitle;
		$scope.invoiceContent = ConfirmCartService.invoiceContent;
		$scope.cashgift = ConfirmCartService.cashgift;
		//$scope.express = ConfirmCartService.express;
		$scope.coupon = ConfirmCartService.coupon;
		$scope.all_discount = 0;
        $scope.accountInfo = {};//账户下的卡
        $scope.accountNo = 0;//账户id
        $scope.is_active = 0;
		$scope.use_balance = 0;
		$scope.input = {
			score: 0,
			comment: ""
		};

		$scope.input.score = ConfirmCartService.input.score;
		if($scope.input.score == 0){
			$scope.input.score = "";
		}
		$scope.input.comment = ConfirmCartService.input.comment;
		$scope.scoreInfo = null;
		$scope.priceInfo = null;
		$scope.canPurchase = _checkCanPurchase();
		$scope.maxUseScore = 0;
		$scope.formatPromo = _formatPromo;


        //查看可用商品
        function _toshoplist(account) {
            $state.go('shoplist', {
                account: account.account_no,
            })
        }

        $scope.coupon_mo=-1;
        $scope.coupon_tt=0;
        $scope.coupon_discount_price=0;
        $scope.show_coupons=_show_coupons;
        $scope.coupons_show=false;
        $scope.hidecoupon=_hidecoupon;
        $scope.yes_coupons=_yes_coupons;

        function _hidecoupon(){
            $(".coupons_big .coupons_con>.coupons").removeClass("coupons_active");
            var availables=$scope.availables
            for(let a=0;a<availables.length;a++){
                availables[a].checkted=0
            }
            $scope.availables=availables;
            $(".coupons_big").css("display","none")
            $(".coupons_big>.couponsb").animate({bottom:'-8rem'},300)

        }

        function _show_coupons(){
            $(".coupons_big").css("display","block")
            $(".coupons_big>.couponsb").animate({bottom:0},300)
            coupons()
        }


        function coupons(){

            var product=[];
            let pro={};
            var goods = $scope.goods;

            for (let i = 0;i < goods.length; i++) {
                pro.product_id = goods[i].product.id;
                pro.amount = goods[i].amount;
                pro.is_gold = 0;
                 product.push({'product_id':goods[i].product.id,'amount':goods[i].amount,'is_gold':0})

            }

            var params={}
            params.product=product;
            API.coupon.all(params).then(function (data) {
                $scope.availables=data.available;
                $scope.unavailables=data.unavailable;
                var availables=data.available;
                for(let a=0;a<availables.length;a++){

                    if($scope.coupon_tt==availables[a].id){
                        availables[a].checkted=1
                    }else{
                        availables[a].checkted=0
                    }
                }
                $scope.availables=availables;


            });

        }

        function _yes_coupons() {
            var coupons_active= $(".coupons_big").find(".coupons_active").attr("data");
            if(coupons_active==undefined){
                $scope.coupon_mo=0
            }else{
                $scope.coupon_mo=coupons_active;
            }

            $(".coupons_big").css("display","none")
            $(".coupons_big>.couponsb").animate({bottom:'-8rem'},300)
            _reloadPrice()

        }







        function _touchAddress() {
			$state.go('address-select', {
				address: $scope.consignee ? $scope.consignee.id : null
			});
		}

		function _touchExpress() {

			if (!$scope.consignee) {
                $scope.nameTipshowa = true;
                $scope.tip_a = '请选择地址'
				//$scope.toast('请选择地址');
				return;
			}

			var goods = $scope.goods;
			var goodsIds = [];
			var numbers = [];

			for (var i = 0; i < goods.length; ++i) {
				goodsIds.push(goods[i].product.id);
				numbers.push(goods[i].amount);
			}

			ExpressSelectService.clear();
			ExpressSelectService.expressId = $scope.express ? $scope.express.id : null;
			ExpressSelectService.goodsIds = goodsIds;
			ExpressSelectService.goodsNumbers = numbers;
			ExpressSelectService.region = $scope.consignee.id;

			$state.go('express-select', {});
		}

		function _touchInvoice() {
			InvoiceSelectService.clear();
			InvoiceSelectService.type = $scope.invoiceType ? $scope.invoiceType : null;
			InvoiceSelectService.title = $scope.invoiceTitle;
			InvoiceSelectService.content = $scope.invoiceContent ? $scope.invoiceContent : null;

			$state.go('invoice-select', {});
		}

		function _touchCashgift() {

			var goods = $scope.goods;
			var consignee = $scope.consignee;
			var express = $scope.express;
			var cashgift = $scope.cashgift;

			var totalPrice = 0;

			for (var key in goods) {
				totalPrice += goods[key].price;
			}

			$state.go('cashgift-select', {
				cashgift: cashgift ? cashgift.id : null,
				total: totalPrice
			});
		}


        //库存不足点击确定
        function _queding(){
            $scope.kucun = false;

            return;
        }

        //提交订单
		function _touchSubmit() {



			if($scope.isSubmitIng != false){
                $scope.nameTipshowa = true;
                $scope.tip_a = '订单不能重复提交'
                //$scope.toast('订单不能重复提交');
				return;
			}
			$scope.isSubmitIng = true;

			//定时器清除提交订单按钮
			var timer = null;
			timer = $interval(function(){
				$scope.isSubmitIng = false;
				$interval.cancel(timer);
			},6000);

			var goods = $scope.goods;
			var consignee = $scope.consignee;
			var coupon = $scope.coupon;
			var cashgift = $scope.cashgift;
			var score = $scope.input.score;
			var comment = $scope.input.comment;
			var invoiceType = $scope.invoiceType;
			var invoiceTitle = $scope.invoiceTitle;
			var invoiceContent = $scope.invoiceContent;
			var kucun = $scope.kucun;



			if (!goods || !goods.length) {
                $scope.nameTipshowa = true;
                $scope.tip_a = '商品信息不存在'
				//$scope.toast('商品信息不存在')
				return;
			}

            var goodsIds = [];
            var goodssuppliers=[];
            var goodsarr=[];


            for (var i = 0; i < goods.length; i++) {
                goodsIds.push(goods[i].id);
            }
            for (var i = 0; i < goods.length; i++) {
                goodssuppliers.push(goods[i].product.suppliers);
            }

			for (var i = 0; i < goodsIds.length; i++) {
                var activeSubjectsObject = {};
                for (var j = 0; j < goodssuppliers.length; j++) {
                	if(i==j){
                        activeSubjectsObject.id=goodsIds[i]
                        activeSubjectsObject.suppliers=goodssuppliers[j]
                        goodsarr.push(activeSubjectsObject);
					}
                }
			}


			if (!goodsIds || !goodsIds.length) {
                $scope.nameTipshowa = true;
                $scope.tip_a = '商品信息不存在'
				//$scope.toast('商品信息不存在')
				return;
			}

			if (!consignee) {
                $scope.nameTipshowa = true;
                $scope.tip_a = '请填写地址'
				//$scope.toast('请填写地址')
				return;
			}

            // if(!kucun){
            //     // $scope.toast('aaaaaa')
            //     $scope.kucun = true;
            //     return;
            // }

  //判断姓名是否正确

			var name=consignee.name
            var reg =/^[\u4e00-\u9fa5]+$/;
			if(!reg.test(name)){
                $scope.nameTipshow = true;
                return;
			}
			let error_name=ENUM.ERROR_NAME;
			for(let a=0;a<error_name.length;a++){
				if(name.indexOf(error_name[a])!= -1){
					$scope.nameTipshow = true;
					return;
				}
			}

			if(name.length>5||name.length<2){
                $scope.nameTipshow = true;
                return;
			}





			var params = {
				shop: 1,
				consignee: consignee ? consignee.id : null,
				cart_good_id: goodsIds ? JSON.stringify(goodsIds) : null,
				//shipping: express ? express.id : null,
				invoice_type: invoiceType ? invoiceType.id : null,
				invoice_title: invoiceTitle,
				invoice_content: invoiceContent ? invoiceContent.id : null,
				cashgift: cashgift ? cashgift.id : null,
				score: score,
				comment: comment,
				company_id : typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id,
				use_balance : $scope.use_balance,
                account_no : $scope.accountNo ? $scope.accountNo : 0,
                coupon : $scope.coupon_tt,
			    coupon_discount_price : $scope.coupon_discount_price
			};
			API.cart
				.checkout(params)
				.then(function (data) {
         //判断库存
					if(data==null || data=='null'){
						$scope.nameTipshowa = true;
						$scope.tip_a = '您购买的商品库存不足';
						return;
					}
                    var goods=$scope.goods
					var dgoods=data.goods
					var goodm=[]

					if(dgoods != undefined && dgoods.length>0){
                        for(var i=0;i<goods.length;i++){
                            for(var j=0;j<dgoods.length;j++){


                                if(goods[i].goods_id==dgoods[j]){
                                    goodm.push(goods[i])
                                }
                            }
                        }

                        if(goods.length>1){
                            if(goodm.length>0){

                                $scope.goodm=goodm;
                                $scope.kucun = true;
                                return;
                            }
                        }else{
                            if(goodm.length>0){
                                $scope.nameTipshowa = true;
                                $scope.tip_a = '您购买的该商品库存不足'
                                //$scope.toast('您购买的该商品库存不足')
                                return;
                            }
                        }
					}


					if (data.order) {
						ConfirmCartService.clear();
						ExpressSelectService.clear();

						PaymentModel.clear();
						PaymentModel.order = data.order;

						if(data.order.total  - data.order.coupon_deduction_price - data.order.balance_paid  <= 0){
							$state.go('order-detail', {
								order: data.order.id,
								order_type : 0
							});
						} else {
							$state.go('payment', {
								order: data.order.id
							});
						}
					}
				});
		}





		function _checkCanPurchase() {
			if (!$scope.goods || !$scope.goods.length)
				return false;
			if (!$scope.consignee)
				return false;

			return true;
		}

		function _formatPromo(key) {
			if (key == 'score') {
				return "积分";
			} else if (key == 'cashgift') {
				return "红包";
			} else if (key == 'preferential') {
				return "优惠金额";
			} else if (key == 'goods_reduction') {
				return "商品减免";
			} else if (key == 'order_reduction') {
				return "订单减免";
			} else if (key == 'coupon_reduction') {
				return "优惠券减免";
			} else {
				return "其他优惠";
			}
		}

		function _reloadConsignee() {
			var param = {};
			API.consignee.list(param).then(function (consignees) {

				if (consignees) {
					$scope.consigneeList = consignees;

					if (!$scope.consignee) {
						for (var key in $scope.consigneeList) {
							if ($scope.consigneeList[key].is_default) {
								$scope.consignee = $scope.consigneeList[key];
								$scope.canPurchase = _checkCanPurchase();
								$rootScope.$emit('consigneeChanged', $scope.consignee);
							}
						}

					}

				}

			})
		}

		function _reloadScore() {

			$scope.maxUseScore = 0;

			for (var i = 0; i < $scope.goods.length; ++i) {
				$scope.maxUseScore += $scope.goods[i].product.score*$scope.goods[i].amount;
			}

			API.score
				.get({})
				.then(function (info) {
					$scope.scoreInfo = info;
					$scope.refreshScore();
				})
		}

		function _refreshScore() {

			if ($scope.timer) {
				$timeout.cancel($scope.timer);
				$scope.timer = null;
			}

			$scope.timer = $timeout(function () {

				 var maxScore = $scope.scoreInfo.score > $scope.maxUseScore ? $scope.maxUseScore : $scope.scoreInfo.score;

				 if ($scope.input.score > maxScore) {
				 	$scope.input.score = maxScore;
				 }

				 if ($scope.input.score < 0) {
				 	$scope.input.score = 0;
				 }
				ConfirmCartService.input.score = $scope.input.score;
				_reloadPrice();

				$scope.timer = null;

			}, 200)
		}

		function _refreshComment(){
			ConfirmCartService.input.comment = $scope.input.comment;
		}


		function _reloadPrice() {

			var goods = $scope.goods;
			//var consignee = $scope.consignee;
			//var express = $scope.express;
			//var coupon = $scope.coupon;
			//var cashgift = $scope.cashgift;
			//var score = $scope.input.score;

			if (!goods || !goods.length) {
                $scope.nameTipshowa = true;
                $scope.tip_a = '商品信息不存在'
				//$scope.toast('商品信息不存在');
				return;
			}

			var products = [];

			for (var i = 0; i < goods.length; ++i) {
				products.push({
					goods_id: goods[i].product.id,
					property: goods[i].attrs.split(','),
					num: goods[i].amount
				});
			}

			var params = {};
			params.order_product = JSON.stringify(products);

			//if (consignee) {
				//params.consignee = consignee.id;
			//}

			//if (coupon) {
				//params.coupon = coupon.id;
			//}

			//if (score) {
				//params.score = score;
			//}
            if ($scope.accountNo) {
                params.account_no = $scope.accountNo;
            }

			params.company_id = typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id;
            params.coupon=$scope.coupon_mo;
			API.order.price(params)
				.then(function (priceInfo) {
					$scope.priceInfo = priceInfo;
					$scope.all_discount = priceInfo.discount_price;
					$scope.use_balance = priceInfo.use_balance;
                    $scope.coupon_tt=priceInfo.coupon;
                    $scope.coupon_discount_price=priceInfo.coupon_discount_price;
					for(var promo in priceInfo.promos){
						$scope.all_discount += parseFloat(priceInfo.promos[promo].price);
					}

					if(priceInfo.total_price>0 && $scope.user.company.id==47){
                        $scope.buzu = true;
					}else{
                        $scope.buzu = false;
					}
				});
		}

        //2018-12-28新增--- start----

       function _show_cpu(){
           $(".layer").show();
           $(".layer").addClass("layerActive")
		}
        //获取用户下的账户
        function _getUserAccount() {
            var params = {};
            var category = [];
            for (var i = 0; i < $scope.goods.length; ++i) {
                category[i] = $scope.goods[i].product.category;
            }
            params.category = category;
            params.company_id = typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id;

            API.order
                .getUserAccount(params)
                .then(function (accountInfo) {
                	if(accountInfo.available.length>0){
                        $(".layer").show();
                        $(".layer").addClass("layerActive")
                        $scope.cpu_len=accountInfo.available.length

					}
                    if(accountInfo){
                        $scope.accountInfo = accountInfo;

                    }
                })
        }

        //使用卡卷去计算价格
        function _useCard (){
            var account_no = [];

            $(".layerCard .cardList .active").each(function(index,element){
                account_no[index] = $(this).attr("data");
            });
            $scope.accountNo = account_no;
            _reloadPrice();
            if(account_no.length>0){
                $scope.cpu_len_lod = false;
                $scope.cpu_len_show = true;
                $scope.cpu_len_mun=account_no.length
			}else{
                $scope.cpu_len_lod = true;
                $scope.cpu_len_show = false;
                $scope.cpu_len_mun = account_no.length
            }
        }
        //----end-----
		function _reload() {
			_reloadPrice();
			_reloadScore();
			_reloadConsignee();
            _getUserAccount();
		}

		_reload();
	}

})();
