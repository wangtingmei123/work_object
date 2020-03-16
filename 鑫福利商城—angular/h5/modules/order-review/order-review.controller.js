/**
 * Created by howiezhang on 16/10/19.
 */
(function () {

	'use strict';

	angular
		.module('app')
		.controller('OrderReviewController', OrderReviewController);

	OrderReviewController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams','AppAuthenticationService','API', 'ENUM'];

	function OrderReviewController($scope, $http, $window, $timeout, $location, $state, $stateParams, AppAuthenticationService, API, ENUM) {

		var orderId = $stateParams.order;
		var orderType = $stateParams.order_type;
		var goodsId = $stateParams.goods_id;
		console.log(goodsId)

		$scope.order = {
			id: orderId
		};
		$scope.goods=[];
		$scope.order=[];
		$scope.isLoading = false;
		$scope.isLoaded = false;
		$scope.isAnonymous = 0;

		$scope.nameTipshowa = false;
		$scope.torefundTipa = _torefundTipa;
		$scope.tip_a = '';

		$scope.touchGood = _touchGood;
		$scope.touchSetAnonymous = _touchSetAnonymous;
		$scope.touchSubmit = _touchSubmit;
		$scope.tochscore = _tochscore;
		$scope.scores = [1,2,3,4,5];
		$scope.score_select1=0;
		$scope.score_select2=0;
		$scope.score_select3=0;
		$scope.grade = 0;
		$scope.comment='';

		function _torefundTipa() {
			$scope.nameTipshowa = false;
		}

		//打分
		function _tochscore(score_num,score_type){
			if(score_type==1){
				$scope.score_select1=score_num;
			}else if(score_type==2){
				$scope.score_select2=score_num;
			}else if(score_type==3){
				$scope.score_select3=score_num;
			}

		}

		//获取商品信息
		function _reload() {
			$scope.isLoading = true;
			$scope.isLoaded = false;

			API.order.get({
				order: orderId,
				order_type :orderType
			}).then(function (order) {
				$scope.order = order;
				$scope.isLoading = false;
				$scope.isLoaded = true;
				console.log(order)
				for(let i=0;i<order.goods.length;i++){
					if(order.goods[i].id==goodsId){
						$scope.goods=order.goods[i]
					}
				}

			});
		}


		//评价
		function _touchGood(grade_statre) {
			if(grade_statre==ENUM.ORDER_GRADE.GOOD){
				$scope.grade = ENUM.ORDER_GRADE.GOOD;
			}else if(grade_statre==ENUM.ORDER_GRADE.MEDIUM){
				$scope.grade = ENUM.ORDER_GRADE.MEDIUM;
			}else if(grade_statre==ENUM.ORDER_GRADE.BAD){
				$scope.grade = ENUM.ORDER_GRADE.BAD;
			}

		}


		function _touchSetAnonymous() {
			$scope.isAnonymous = !$scope.isAnonymous;
		}

		function _touchSubmit() {


			if($scope.grade==0){
				$scope.nameTipshowa = true;
				$scope.tip_a = '请选择整体评价'
				return;
			}

			if($scope.score_select1==0){
				$scope.nameTipshowa = true;
				$scope.tip_a = '请选择描述相符'
				return;
			}

			if($scope.score_select2==0){
				$scope.nameTipshowa = true;
				$scope.tip_a = '请选择商品质量'
				return;
			}

			if($scope.score_select3==0){
				$scope.nameTipshowa = true;
				$scope.tip_a = '请选择物流包装'
				return;
			}


			var comment=$(".item-textarea>textarea").val()
			console.log(comment)
			if(comment==''){
				$scope.nameTipshowa = true;
				$scope.tip_a = '请填写文字评价'
				return;
			}

			var user = AppAuthenticationService.getUser();
			console.log(user)
			var params = {};
			// params.user_id = user.id;
			params.order = orderId;
			params.goods = goodsId;
			params.grade = $scope.grade;
			params.desc_rank = $scope.score_select1;
			params.quality_rank = $scope.score_select2;
			params.pack_rank = $scope.score_select3;
			params.content = comment;
			params.is_anonymous = 0;


			// params.user = comment;

			console.log()

			API.order.review(params)
				.then(function (succeed) {
					if (succeed) {
						$state.go('review-success', {
							order: $scope.order.id
						});
					}
				})
		}

		_reload();
	}

})();