(function () {

	'use strict';

	angular
		.module('app')
		.controller('SearchController', SearchController);

	SearchController.$inject = ['$scope', '$http', '$window', '$timeout', '$rootScope', '$state', 'API', 'ENUM', 'SearchService'];

	function SearchController($scope, $http, $window, $timeout, $rootScope, $state, API, ENUM, SearchService) {

		$scope.currentKeyword = '';

		$scope.keywords = null;
		 $scope.history = SearchService.history;
        //$window.history = SearchService.history;
		$scope.touchSearch = touchSearch;
		$scope.touchKeyword = touchKeyword;

		function touchSearch() {
			if (!$scope.currentKeyword || $scope.currentKeyword.length < 1) {
				$scope.toast('请输入正确的关键字');
				return;
			}
			//修改
			sessionStorage.removeItem('sto_products');
			$rootScope.$emit('searchChanged', $scope.currentKeyword);
			$state.go('search-result', {
                sortKey: ENUM.SORT_KEY.DATE,
                sortValue: ENUM.SORT_VALUE.DESC,
				keyword: $scope.currentKeyword,
				category: null,
				navTitle: $scope.currentKeyword,
				navStyle: 'search'
			});
		}

		function touchKeyword(keyword) {
            sessionStorage.removeItem('sto_products');
			if (!keyword || keyword.length < 1) {
				$scope.toast('请输入正确的关键字');
				return;
			}

			$scope.currentKeyword = keyword;

			$rootScope.$emit('searchChanged', keyword);

			$state.go('search-result', {
                sortKey: ENUM.SORT_KEY.DATE,
                sortValue: ENUM.SORT_VALUE.DESC,
				keyword: keyword,
				category: null,
				navTitle: keyword,
				navStyle: 'search'
			});
		}

		function _reloadKeywords() {
			API.search.
			keywordList({})
				.then(function (keywords) {
					$scope.keywords = keywords;
				})
		}

		function _reload() {
			_reloadKeywords();
		}

		_reload();
	}

})();