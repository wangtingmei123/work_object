(function () {

	'use strict';

	angular
		.module('app')
		.factory('MyAccountModel', MyAccountModel);

	MyAccountModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

	function MyAccountModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

		var PER_PAGE = 10;

		var service = {};
		service.isEmpty = false;
		service.isLoaded = false;
		service.isLoading = false;
		service.isLastPage = false;
		service.account = null;
		service.rule = null;
		service.history = null;
		service.count = _count;
		service.fetch = _fetch;
		service.reload = _reload;
		service.loadMore = _loadMore;
		return service;

		function _count() {

			//if (!AppAuthenticationService.getToken())
			//	return;
            //
			//var _this = this;
            //
			//API.card
			//	.get({})
			//	.then(function (data) {
			//		_this.card = data.card;
			//		_this.rule = data.rule;
			//	});
		}

		function _reload() {

			if (!AppAuthenticationService.getToken())
				return;

			if (this.isLoading)
				return;

			this.account = null;
			this.isEmpty = false;
			this.isLoaded = false;
			this.isLastPage = false;

			this.fetch(1, PER_PAGE);
		}

		function _loadMore() {

			if (!AppAuthenticationService.getToken())
				return;

			if (this.isLoading)
				return;
			if (this.isLastPage)
				return;

			if (this.account && this.account.length) {
				this.fetch((this.account.length / PER_PAGE) + 1, PER_PAGE);
			} else {
				this.fetch(1, PER_PAGE);
			}
		}

		function _fetch(page, perPage) {

            if (!AppAuthenticationService.getToken())
                return;

            this.isLoading = true;

            var params = {
                page: page,
                per_page: perPage
            };

            if (null != this.status) {
                params.status = this.status;
            }
            params.company_id = service.company_id;

            var _this = this;

            API.account.list(params).then(function (account) {
            	console.log(account)
                _this.account = _this.account ? _this.account.concat(account) : account;
                _this.isEmpty = (_this.account && _this.account.length) ? false : true;
                _this.isLoaded = true;
                _this.isLoading = false;
                _this.isLastPage = (account && account.length < perPage) ? !_this.isEmpty : false;
            });
		}

	}

})();