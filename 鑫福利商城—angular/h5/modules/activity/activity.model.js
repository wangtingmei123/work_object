(function () {

	'use strict';

	angular
		.module('app')
		.factory('ActivityModel', ActivityModel);

    ActivityModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

	function ActivityModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

		var PER_PAGE = 10;

		var service = {};
		service.isEmpty = false;
		service.isLoaded = false;
		service.isLoading = false;
		service.isLastPage = false;
		service.activity_detail = null;
		service.rule = null;
		service.history = null;
		//service.detail = _detail;
		service.reload = _reload;
		return service;


		function _reload() {

			if (!AppAuthenticationService.getToken())
				return;

			if (this.isLoading)
				return;

			this.account = null;
			this.isEmpty = false;
			this.isLoaded = false;
			this.isLastPage = false;

			//this.detail();
		}


		//function _detail() {
        //
         //   if (!AppAuthenticationService.getToken())
         //       return;
        //
         //   this.isLoading = true;
         //   var params = {
         //       act_id: actId
         //   };
        //
         //   var _this = this;
        //
         //   API.activity.detail(params).then(function (activity_detail) {
         //       console.log(activity_detail);
         //       _this.activity_detail = _this.activity_detail ? _this.activity_detail : activity_detail;
         //       _this.isEmpty = (_this.activity_detail && _this.activity_detail.length) ? false : true;
         //       _this.isLoaded = true;
         //       _this.isLoading = false;
         //   });
		//}

	}

})();