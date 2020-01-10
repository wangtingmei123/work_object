/**
 * Created by howiezhang on 16/10/19.
 */
(function () {

	'use strict';

	angular
		.module('app')
		.controller('GradeDetailController', GradeDetailController);

	GradeDetailController.$inject = ['$scope', '$http', '$window', '$timeout', '$location', '$state', '$stateParams', 'API', 'ENUM'];

	function GradeDetailController($scope, $http, $window, $timeout, $location, $state, $stateParams, API, ENUM) {
		var PER_PAGE = 10;
		$scope.evaluation_select=_evaluation_select;
		$scope.review_rate = $stateParams.review_rate;
		$scope.product_id = $stateParams.product_id;
		$scope.eval_select=4;
		$scope.scores = [1,2,3,4,5];
		$scope.score_select1 = 3;
		$scope.is_comment=true;
		$scope.loadComment = _loadComment;
		$scope.commentlist = [];
		$scope.isLoading = false;
		$scope.allend = false;
		function _evaluation_select(select=''){
			$scope.eval_select=select;
			$scope.commentlist=[];
			$scope.allend = false;
			$scope.isLoaded = false;
			_commentlist(1,PER_PAGE)
		}

		function _loadComment(){

			if($scope.isLoading){
				return
			}


			if ($scope.commentlist && $scope.commentlist.length) {
				_commentlist(Math.ceil(($scope.commentlist.length / PER_PAGE) + 1), PER_PAGE);
			} else {
				_commentlist(1, PER_PAGE);
			}
		}




		function _commentlist(page, perPage){
	    	$scope.isLoading = true;
			$scope.isLoaded = false;
			var params = {};
			params.page = page;
			params.per_page = perPage;
			params.product = $scope.product_id;
			params.grade = $scope.eval_select;
			API.product
				.commentlist(params).then(function(data){
				if(page==1&&(data.reviews.length==0 || data.reviews==[])){
					$scope.is_comment=false
				}else {
					$scope.is_comment=true
				}
				$scope.isLoaded = true;

				$scope.commentlist = $scope.commentlist ? $scope.commentlist.concat(data.reviews) : data.reviews;
				// $scope.isLoading = false;
				$scope.isLastPage = (data.reviews && data.reviews.length < perPage) ? false : true;
				if($scope.isLastPage && $scope.isLoaded){
					$scope.isLoading = false;
				}else {
					$scope.isLoading = true;
					$scope.allend = true;
				}


			});
		}
		_commentlist(1,PER_PAGE)

		function _gtotal(){
			API.product
				.gtotal({
					product:$scope.product_id,
				}).then(function(data){
				$scope.subtotal=data.subtotal;
			});
		}
		_gtotal()
	}
})();