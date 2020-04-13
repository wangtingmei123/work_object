(function () {

	'use strict';

	angular
		.module('app')
		.controller('ConfirmController', ConfirmController);

	ConfirmController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'API', 'ConfirmProductService','ENUM','ExpressSelectService', 'InvoiceSelectService', 'PaymentModel','AppAuthenticationService', '$interval'];

	function ConfirmController($scope, $state, $rootScope, $stateParams, API, ConfirmProductService,ENUM,ExpressSelectService, InvoiceSelectService, PaymentModel,AppAuthenticationService, $interval) {
		$scope.sgproduct_id_c=ENUM.PRODUCTSCC.CICD1;
		$scope.sgproduct_id_c1=ENUM.PRODUCTSCC.CICD2;
        $scope.buzu = false;
		$scope.isSubmitIng = false;
        $scope.show_cup = false;
        $scope.cpu_len = 0;
        $scope.cpu_len_lod = true;
        $scope.cpu_len_show = false;
        $scope.cpu_len_mun = 0;
        $scope.show_cpu = _show_cpu;
		$scope.touchAddress = _touchAddress;
		$scope.touchExpress = _touchExpress;
		$scope.touchInvoice = _touchInvoice;
		$scope.touchCashgift = _touchCashgift;
		$scope.touchSubmit = _touchSubmit;
		$scope.refreshScore = _refreshScore;
		$scope.refreshComment = _refreshComment;
        $scope.getUserAccount = _getUserAccount;
        $scope.toshoplist = _toshoplist;
        $scope.useCard = _useCard;//重新计算价格（卡卷）
        $scope.nameTipshow = false;
        $scope.torefundTip = _torefundTip;
		$scope.show_choos = _show_choos;
		$scope.show_choos_date = _show_choos_date;
		$scope.is_yd_h = false;
		$scope.is_yd = false;
        $scope.hj_cg = '';
		$scope.names = [];
		$scope.selectedName = '';
		$scope.time = '';
        $scope.time2 = '';
        $scope.availables=[];
        $scope.unavailables=[];
		$scope.refreshDate = _refreshDate;
        function _torefundTip(){
            $scope.nameTipshow = false;
        }
		$scope.refreshtime1 = _refreshtime1;   //时间段
        $scope.nameTipshowa = false;
        $scope.torefundTipa = _torefundTipa;
        $scope.tip_a = '';
        function _torefundTipa() {
            $scope.nameTipshowa = false;
        }

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

			var product=[]
			let pro={}
			let is_gold=0;
            if($scope.hj_cg==1){
                is_gold=1;
			}else{
                is_gold=0;
			}
            product.push({'product_id':ConfirmProductService.product.id,'amount':ConfirmProductService.amount,'is_gold':is_gold})
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
           _refreshOrderPrice()

       }



        function _show_choos(){
			$(".float_choos_time").css("display","block")
			$(".float_choos_date").css("display","none")

		}

		function _show_choos_date(){
			$(".float_choos_date").css("display","block")
			$(".float_choos_time").css("display","none")
		}

        function _refreshtime1(con){
			$scope.time=con;
			if($scope.time!=''){
				$(".msgsda1").css("display","none")
				$(".msgsda2").css("display","block")
			}
			var time1=con.substring(0,con.length-3);
			if(ConfirmProductService.amount==1){
				$scope.time2=parseInt(time1)+1+":00"
			}else if(ConfirmProductService.amount==2){
				$scope.time2=parseInt(time1)+2+":00"
			}

			$(".float_choos_time").css("display","none")
			// $scope.time2 =time1;

		}

		$scope.consigneeList = [];

		$scope.consignee = ConfirmProductService.consignee;
		$scope.invoiceType = ConfirmProductService.invoiceType;
		$scope.invoiceTitle = ConfirmProductService.invoiceTitle;
		$scope.invoiceContent = ConfirmProductService.invoiceContent;
		$scope.cashgift = ConfirmProductService.cashgift;
		$scope.express = ConfirmProductService.express;
		$scope.coupon = ConfirmProductService.coupon;
		$scope.all_discount = 0;
		$scope.isReal = true;//是否是实物
		$scope.telphone = '';

		$scope.user = AppAuthenticationService.getUser();

		$scope.input = {
			score: 0,
			comment: ""
		};

		$scope.input.score = ConfirmProductService.input.score;
		$scope.input.comment = ConfirmProductService.input.comment;
		$scope.input.name = $scope.user.username;
		if($scope.input.score == 0){
			$scope.input.score = "";
		}

		$scope.rule = "";
		$scope.scoreInfo = null;
		$scope.priceInfo = {};
		$scope.canPurchase = _checkCanPurchase();//是否可以购买
		$scope.formatPromo = _formatPromo;
		$scope.maxUseScore = 0;
		$scope.selectedGoods = [];
		$scope.use_balance = 0;//使用余额金额
        $scope.accountInfo = {};//账户下的卡
        $scope.accountNo = 0;//账户id

        if(ConfirmProductService.product){
			var card_good = {};
			card_good.product = ConfirmProductService.product;
			var attrs = ConfirmProductService.attrs;
			card_good.property = "";
			card_good.attrs = [];
			var product_price = parseFloat(card_good.product.current_price);
			$scope.isReal = ConfirmProductService.product.is_real == 1 ? true : false;

		//场馆预订
			let products=ENUM.PRODUCTS;
			let products1=ENUM.PRODUCTS1;
			let products2=ENUM.PRODUCTS2;
			for(let a=0;a<products.length;a++){
				if(ConfirmProductService.product.category==products[a]){
					$scope.is_yd = true;
					$scope.is_yd_h = true;
					var time=[{'time':8,'con':'8:00'},{'time':9,'con':'9:00'},{'time':10,'con':'10:00'},{'time':11,'con':'11:00'},{'time':12,'con':'12:00'},{'time':13,'con':'13:00'},{'time':14,'con':'14:00'},{'time':15,'con':'15:00'},{'time':16,'con':'16:00'},{'time':17,'con':'17:00'},{'time':18,'con':'18:00'},{'time':19,'con':'19:00'},{'time':20,'con':'20:00'},{'time':21,'con':'21:00'},{'time':22,'con':'22:00'}]
					var params={}
                    $scope.hj_cg = ConfirmProductService.hj_cg;
					params.is_gold_time=ConfirmProductService.hj_cg;
					params.amount=ConfirmProductService.amount;
					API.product
						.hjdata(params)
						.then(function (res) {

							$scope.names=res.data;
							var day=res.data[0].date.substr(res.data[0].date.length-2,2);
							var data_obj = new Date();
							var today = data_obj.getDate(); //获取当前日(1-31)
							var hours = data_obj.getHours(); //获取当前小时数(0-23)
							if(ConfirmProductService.hj_cg==0){
								var hj=[];
								for(let c=0;c<$scope.names.length;c++){
									if($scope.names[c].is_holiday==0){
										hj.push($scope.names[c])
									}
								}
								$scope.names=hj;
								$scope.time1=[{'time':8,'con':'8:00'},{'time':9,'con':'9:00'},{'time':10,'con':'10:00'},{'time':11,'con':'11:00'},{'time':12,'con':'12:00'},{'time':13,'con':'13:00'},{'time':14,'con':'14:00'},{'time':15,'con':'15:00'},{'time':16,'con':'16:00'}]
								if(ConfirmProductService.amount==1){
									$scope.time1.splice($scope.time1.length-1,1)
								}else if(ConfirmProductService.amount==2){
									$scope.time1.splice($scope.time1.length-2,2)
								}

{}								if(day==today){
									var sj1=[];
									for(let d=0;d<$scope.time1.length;d++){
										if(hours<$scope.time1[d].time){
											sj1.push($scope.time1[d])
										}
									}
									$scope.time1=sj1;

								}



							}

							if(ConfirmProductService.hj_cg==1){

								$scope.time1=[{'time':16,'con':'16:00'},{'time':17,'con':'17:00'},{'time':18,'con':'18:00'},{'time':19,'con':'19:00'},{'time':20,'con':'20:00'},{'time':21,'con':'21:00'},{'time':22,'con':'22:00'}]
								if($scope.names[0].is_holiday==1){
									$scope.time1=[{'time':8,'con':'8:00'},{'time':9,'con':'9:00'},{'time':10,'con':'10:00'},{'time':11,'con':'11:00'},{'time':12,'con':'12:00'},{'time':13,'con':'13:00'},{'time':14,'con':'14:00'},{'time':15,'con':'15:00'},{'time':16,'con':'16:00'},{'time':17,'con':'17:00'},{'time':18,'con':'18:00'},{'time':19,'con':'19:00'},{'time':20,'con':'20:00'},{'time':21,'con':'21:00'},{'time':22,'con':'22:00'}]

								}
								if(ConfirmProductService.amount==1){
									$scope.time1.splice($scope.time1.length-1,1)
								}else if(ConfirmProductService.amount==2){
									$scope.time1.splice($scope.time1.length-2,2)
								}
								if(day==today){
									var sj=[];
                                   for(let d=0;d<$scope.time1.length;d++){
                                   	if(hours<$scope.time1[d].time){
										sj.push($scope.time1[d])
									}
								   }
									$scope.time1=sj;
								}

							}


						})




				}
			}
			for(let b=0;b<products2.length;b++){
				if(ConfirmProductService.product.category==products2[b]){
					$scope.is_yd_h = false;
				}
			}


			var attrsLength = attrs.length;
			for (var i = 0; i < attrsLength; i++) {  //选择商品属性个数
				var propertiesLength = card_good.product.properties.length;
				for (var j = 0; j < propertiesLength; j++) { //商品属性列表
					var property = card_good.product.properties[j];
					var attrsLengths = property.attrs.length;
					for (var k = 0; k < attrsLengths; k++) {
						var attrItem = property.attrs[k];
						if (attrItem.id == attrs[i]) {
							if (card_good.property.length > 0) {
								card_good.property += "," + attrItem.attr_name;
							} else {
								card_good.property = attrItem.attr_name;
							}
							card_good.attrs.push(attrItem.id);
							product_price += parseFloat(attrItem.attr_price);
						}
					}
				}
			}

			card_good.amount = ConfirmProductService.amount;
			card_good.price = product_price;
			if(ConfirmProductService.product.is_real!=1){
				card_good.price=ConfirmProductService.cgPrice;
			}





			$scope.selectedGoods.push(card_good);
			console.log($scope.selectedGoods[0].product.id)
            //加载卡卷
            _getUserAccount();
		}
		else{
			return;
		}

		_reloadConsignee();
		//_reloadScore();
		_refreshOrderPrice();




		function _touchAddress() {
			$state.go('address-select', {
				address: $scope.consignee ? $scope.consignee.id : null
			});
		}

		function _touchExpress() {

			if (!$scope.consignee) {
                $scope.nameTipshowa = true;
                $scope.tip_a = '请选择地址'
				// $scope.toast('请选择地址');
				return;
			}

			var goodsIds = [];
			var numbers = [];
			for (var key in $scope.selectedGoods) {
				var good = $scope.selectedGoods[key];
				goodsIds.push(good.product.id);
				numbers.push(good.amount);
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
			$state.go('cashgift-select', {
				cashgift: $scope.cashgift ? $scope.cashgift.id : null,
				total: $scope.priceInfo ? $scope.priceInfo.product_price : 0
			});
		}

		function _checkCanPurchase() {
			if (!ConfirmProductService.product)
				return false;
			if (!$scope.consignee && ConfirmProductService.product.is_real == 1)
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
			if(ConfirmProductService.product.is_real != 1){
				return false;
			}
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

						_refreshOrderPrice();
					}
				}
			})
		}

		function _reloadScore() {

			$scope.maxUseScore = 0;

			for (var i = 0; i < $scope.selectedGoods.length; ++i) {
				$scope.maxUseScore += $scope.selectedGoods[i].product.score*$scope.selectedGoods[i].amount;
			}

			API.score.get({})
				.then(function (info) {
					$scope.scoreInfo = info;
				})
		}

		function _refreshScore() {

			 var maxScore = $scope.scoreInfo.score > $scope.maxUseScore ? $scope.maxUseScore : $scope.scoreInfo.score;

			 if ($scope.input.score > maxScore) {
			 	$scope.input.score = maxScore;
			 }

			 if ($scope.input.score < 0) {
			 	$scope.input.score = 0;
			 }

			ConfirmProductService.input.score = $scope.input.score;

			_refreshOrderPrice();
		}



		//场馆预定新增
		function _refreshDate(date_con){
			$(".msgsda1").css("display","block")
			$(".msgsda2").css("display","none")
            $scope.time2='';
			$scope.time='';
			$scope.selectedName = date_con;
			if($scope.selectedName!=''){
				$(".msgsdb1").css("display","none")
				$(".msgsdb2").css("display","block")
			}
			$(".float_choos_date").css("display","none")
			for(let a=0;a<$scope.names.length;a++){
				if(date_con==$scope.names[a].date){
					var day=$scope.names[a].date.substr($scope.names[a].date.length-2,2);
					var data_obj = new Date();
					var today = data_obj.getDate(); //获取当前日(1-31)
					var hours = data_obj.getHours(); //获取当前小时数(0-23)
					if(ConfirmProductService.hj_cg==0){

						$scope.time1=[{'time':8,'con':'8:00'},{'time':9,'con':'9:00'},{'time':10,'con':'10:00'},{'time':11,'con':'11:00'},{'time':12,'con':'12:00'},{'time':13,'con':'13:00'},{'time':14,'con':'14:00'},{'time':15,'con':'15:00'},{'time':16,'con':'16:00'}]
						if(ConfirmProductService.amount==1){
							$scope.time1.splice($scope.time1.length-1,1)
						}else if(ConfirmProductService.amount==2){
							$scope.time1.splice($scope.time1.length-2,2)
						}
						if(day==today){
							var sj1=[];
							for(let d=0;d<$scope.time1.length;d++){
								if(hours<$scope.time1[d].time){
									sj1.push($scope.time1[d])
								}
							}
							$scope.time1=sj1;
						}
						// $scope.input.time1=$scope.time1[1].con;


					}

					if(ConfirmProductService.hj_cg==1){

						$scope.time1=[{'time':16,'con':'16:00'},{'time':17,'con':'17:00'},{'time':18,'con':'18:00'},{'time':19,'con':'19:00'},{'time':20,'con':'20:00'},{'time':21,'con':'21:00'},{'time':22,'con':'22:00'}]


						if($scope.names[a].is_holiday==1){
							$scope.time1=[{'time':8,'con':'8:00'},{'time':9,'con':'9:00'},{'time':10,'con':'10:00'},{'time':11,'con':'11:00'},{'time':12,'con':'12:00'},{'time':13,'con':'13:00'},{'time':14,'con':'14:00'},{'time':15,'con':'15:00'},{'time':16,'con':'16:00'},{'time':17,'con':'17:00'},{'time':18,'con':'18:00'},{'time':19,'con':'19:00'},{'time':20,'con':'20:00'},{'time':21,'con':'21:00'},{'time':22,'con':'22:00'}]



						}


						if(ConfirmProductService.amount==1){
							$scope.time1.splice($scope.time1.length-1,1)
						}else if(ConfirmProductService.amount==2){
							$scope.time1.splice($scope.time1.length-2,2)
						}

						if(day==today){
							var sj=[];
							for(let d=0;d<$scope.time1.length;d++){
								if(hours<$scope.time1[d].time){
									sj.push($scope.time1[d])
								}
							}
							$scope.time1=sj;
						}
						// $scope.input.time1=$scope.time1[1].con;
					}


				}
			}


		}

		function _refreshComment(){
			ConfirmProductService.input.comment = $scope.input.comment;
		}

		function _refreshOrderPrice() {

			if (!$scope.consignee) {
				//return;
			}

			var products = [];

			for (var key in $scope.selectedGoods) {
				var good = $scope.selectedGoods[key];
				var shoppingProduct = {
					goods_id: good.product.id,
					property: good.attrs,
					num: good.amount,
					total_amount: good.amount
				};
				products.push(shoppingProduct);
			}

			var params = {};


			params.order_product = JSON.stringify(products);
			if ($scope.consignee) {
				params.consignee = $scope.consignee.id;
			}

			if ($scope.express) {
				params.shipping = $scope.express.id;
			}

			if ($scope.cashgift) {
				params.cashgift = $scope.cashgift.id;
			}

			if ($scope.coupon) {
				params.coupon = $scope.coupon.id;
			}

			if ($scope.input.score) {
				params.score = $scope.input.score;
			}

            if ($scope.accountNo) {
                params.account_no = $scope.accountNo;
            }

			params.company_id = typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id;
			params.is_gold_price = 0;
			if(ConfirmProductService.hj_cg==1){
				params.is_gold_price = 1;
			}
            params.coupon = $scope.coupon_mo;
			API.order
				.price(params)
				.then(function (priceInfo) {
					if(priceInfo){
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
						//虚拟物品需要展示用户手机号
						if(!$scope.isReal){
							$scope.telphone = priceInfo.telphone;
						}
					}
				})
		}


        function   _show_cpu(){
            $(".layer").show();
            $(".layer").addClass("layerActive")
		}
        //获取用户下的账户
        function _getUserAccount() {
            var params = {};
            params.category = card_good.product.category;
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
        function _useCard(){
            var account_no = [];
            $(".layerCard .cardList .active").each(function(index,element){
                account_no[index] = $(this).attr("data");
            });
            $scope.accountNo = account_no;
            if(account_no.length>0){
                $scope.cpu_len_lod = false;
                $scope.cpu_len_show = true;
                $scope.cpu_len_mun = account_no.length
            }else{
                $scope.cpu_len_lod = true;
                $scope.cpu_len_show = false;
                $scope.cpu_len_mun = account_no.length
			}
            _refreshOrderPrice();

		}
		


	



		function _touchSubmit() {


		    	var sgproduct_id=$scope.selectedGoods[0].product.id

				//    var stime='2020-4-7 00:30'
				//    var etime='2020-4-7 01:00'
				// 	// 转换时间格式，并转换为时间戳
				// 	function tranDate (time) {
				// 	  return new Date(time.replace(/-/g, '/')).getTime();
				// 	}
				// 	// 开始时间
				// 	let startTime = tranDate(stime);
				// 	// 结束时间
				// 	let endTime = tranDate(etime);
				// 	let thisDate = new Date();
				// 	// 获取当前时间，格式为 2018-9-10 20:08
				// 	let currentTime = thisDate.getFullYear() + '-' + (thisDate.getMonth() + 1) + '-' + thisDate.getDate() + ' ' + thisDate.getHours() + ':' + thisDate.getMinutes();
				// 	let nowTime = tranDate(currentTime);
				// 	// 如果当前时间处于时间段内，返回true，否则返回false
				
				// 	if (nowTime < startTime && sgproduct_id==$scope.sgproduct_id_c) {
				// 		$scope.nameTipshowa = true;
				// 		$scope.tip_a = '该商品购买时间4月7号0点开始';
				// 	  return false;
				// 	}

				// 	if (nowTime > endTime && sgproduct_id==$scope.sgproduct_id_c) {
				// 		$scope.nameTipshowa = true;
				// 		$scope.tip_a = '购买已结束';
				// 	  return false;
				// 	}
				




			var consignee = $scope.consignee;
			if (!consignee && ConfirmProductService.product.is_real == 1) {
                $scope.nameTipshowa = true;
                $scope.tip_a = '请填写地址';
				// $scope.toast('请填写地址')
				return;
			}




			if(ConfirmProductService.product.is_real == 1 && consignee.regions[2].id!=37 && (sgproduct_id==23223 || sgproduct_id==23224 || sgproduct_id==23225 || sgproduct_id==9694)){
				$scope.nameTipshowa = true;
				$scope.tip_a = '该商品仅限北京地区购买';
				return
			}

			// 场馆预定新增上线之前放开

			if ($scope.is_yd && ($scope.input.name == '' || $scope.input.name == null)) {
				$scope.nameTipshowa = true;
				$scope.tip_a = '请输入您的姓名';
				return;
			}

			if($scope.is_yd && ($scope.input.name != '' || $scope.input.name != null)){
				let name=$scope.input.name
				let reg =/^[\u4e00-\u9fa5]+$/;
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

				if(name.length>5 || name.length<2){
					$scope.nameTipshow = true;
					return;
				}
			}



			if ($scope.is_yd && $scope.selectedName == '') {
				$scope.nameTipshowa = true;
				$scope.tip_a = '请选择预定日期';
				return;
			}

			if ($scope.is_yd && $scope.is_yd_h && ($scope.time == ''|| $scope.time2 == '')) {
				$scope.nameTipshowa = true;
				$scope.tip_a = '请选择时间段';
				return;
			}

			if ($scope.is_yd && $scope.is_yd_h && ($scope.input.num == ''|| $scope.input.num == null)) {
				$scope.nameTipshowa = true;
				$scope.tip_a = '请输入下场人数';
				return;
			}




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

			//如果是订场就需要备注下下场时间和下场要求。订场之前代码，场馆预定上线之前删除
			// if ((ConfirmProductService.product.goods_type == 8 || ConfirmProductService.product.goods_type == 9) && $scope.input.comment == '') {
            //     $scope.nameTipshowa = true;
            //     $scope.tip_a = '请在备注里面填写日期，时间，人数，如不填全将影响您正常下场'
			// 	// $scope.toast('请在备注里面填写日期，时间，人数，如不填全将影响您正常下场');
			// 	return;
			// }


			if(ConfirmProductService.product.is_real == 1 && consignee.name != null){
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

				if(name.length>5 || name.length<2){
                    $scope.nameTipshow = true;
                    return;
                }
			}


            var params = {};

			for (var key in $scope.selectedGoods) {
				var good = $scope.selectedGoods[key];
				params.product = good.product.id;
				params.property = JSON.stringify(good.attrs);
				params.amount = good.amount;
			}

			if ($scope.consignee) {
				params.consignee = $scope.consignee.id;
			}

			if ($scope.express) {
				params.shipping = $scope.express.id;
			}

			if ($scope.cashgift) {
				params.cashgift = $scope.cashgift.id;
			}

			if ($scope.input.score) {
				params.score = $scope.input.score;
			}

			if ($scope.invoiceContent) {
				params.invoice_content = $scope.invoiceContent.id;
			}

			if ($scope.invoice) {
				params.invoice_type = $scope.invoiceType.id;
			}

			if ($scope.invoiceTitle) {
				params.invoice_title = $scope.invoiceTitle;
			}

			if ($scope.input.comment) {
				params.comment = $scope.input.comment;
			}

            if ($scope.accountNo) {
                params.account_no = $scope.accountNo;
            }

			params.company_id = typeof($scope.user.company.id) == "undefined" ? 0 : $scope.user.company.id;
			params.use_balance = $scope.use_balance;
            params.coupon=$scope.coupon_tt;
            params.coupon_discount_price=$scope.coupon_discount_price;
		//场馆预定新增上线之前放开
			if ($scope.is_yd) {
				params.book_consignee = $scope.input.name;
				params.book_date = $scope.selectedName;
				if($scope.is_yd_h){
					var time=$scope.time.substring(0,$scope.time.length-3);
					params.book_time = time;
					params.people_num = $scope.input.num;
				}
			}

			API.product.purchase(params)
				.then(function (res) {
					console.log(res)
					if(ENUM.ERROR_CODE.OK != res.data.error_code){
						$scope.nameTipshowa = true;
					    $scope.tip_a = res.data.error_desc;
					   return
					}
					var order=res.data.order;
					if (order) {
						ConfirmProductService.clear();
						ExpressSelectService.clear();
						PaymentModel.clear();
						PaymentModel.order = order;

						if(order.total - order.coupon_deduction_price - order.balance_paid <= 0){
							$state.go('order-detail', {
								order: order.id,
								order_type : 0
							});
						} else {
							$state.go('payment', {
								order: order.id
							});
						}
					}
				});
		}

	}

})();