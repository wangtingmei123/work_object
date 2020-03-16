(function () {

	'use strict';

	angular
		.module('app')
		.controller('AddressEditController', AddressEditController);

	AddressEditController.$inject = ['$scope', '$http', '$rootScope', 'API', '$location', '$q', '$window', '$state', 'ENUM','$stateParams', 'AppAuthenticationService', 'AddressEditModel'];

	function AddressEditController($scope, $http, $rootScope, API, $location, $q, $window, $state, $stateParams, AppAuthenticationService, ENUM, AddressEditModel) {

		$scope.touchSave = _touchSave;
		$scope.touchSetDefault = _touchSetDefault;
		$scope.touchPickerShow = _touchPickerShow;
		$scope.touchPickerRegion = _touchPickerRegion;
		$scope.touchPickerCancel = _touchPickerCancel;
		$scope.formatRegions = _formatRegions;
		$scope.touchDelete = _touchDelete;
		$scope.touchCancel = _touchCancel;
        $scope.torefundTip = _torefundTip;
        $scope.torefundTipa = _torefundTipa;
        $scope.tip_a = '';
        $scope.nameTipshow = false;
        $scope.nameTipshowa = false;

        function _torefundTip(){
            $scope.nameTipshow = false;
        }

        function _torefundTipa() {
            $scope.nameTipshowa = false;
        }



		$scope.showPicker = false;
		$scope.pickerData = [];
		$scope.pickerRegions = [];
		$scope.pickerRegionName = null;

		$scope.addressEditModel = AddressEditModel;

		var consignee = $scope.addressEditModel.consignee;
		if (consignee && consignee.id) {
			$scope.name = consignee.name;
			$scope.mobile = consignee.mobile;
			$scope.regions = consignee.regions;
			$scope.address = consignee.address;
			$scope.isDefault = consignee.is_default;
		}

		function _touchCancel(){
			$scope.goBack();
		}

		function _touchSave() {
			let name = $scope.name;
			let mobile = $scope.mobile;
			let address = $scope.address;
			let regions = $scope.regions;

			// if (!name || name.length < 2) {
			// 	$scope.toast('请输入姓名');
			// 	return;
			// }


      //判断姓名是否正确

            let reg =/^[\u4e00-\u9fa5]+$/;
            if(!reg.test(name)){
                $scope.nameTipshow = true;
                return;
            }

			let error_name=['先生','女士','小姐','大爷','大妈','大娘','大奶','爷爷','奶奶','爸爸','妈妈','叔叔','婶婶','姑姑','姑父','姐夫','姐姐','哥哥','表哥','堂哥'];

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


			if (!mobile || mobile.length < 5 || mobile== undefined) {
				$scope.toast('请输入电话');
                $scope.tip_a = '请输入电话';
                $scope.nameTipshowa = true;
				return;
			}



			if (!regions || !regions.length) {
				$scope.toast('请选择地区');
                $scope.tip_a = '请选择地区';
                $scope.nameTipshowa = true;
				return;
			}

			var lastRegion = regions[regions.length - 1];
			if (!lastRegion) {
				$scope.toast('请选择地区');
                $scope.tip_a = '请选择地区';
                $scope.nameTipshowa = true;
				return;
			}

			if (!address || address.length < 1) {
				$scope.toast('请输入地址');
                $scope.tip_a = '请输入地址';
                $scope.nameTipshowa = true;
				return;
			}

			$scope.addressEditModel
				.save(name, mobile, lastRegion.id, address)
				.then(function (success) {
					if (success) {
						$scope.toast('保存成功');
						$scope.goBack();
					} else {
						console.log(111)
						$scope.toast('请稍后再试');
					}
				})
		}

		function _touchSetDefault() {
			$scope.isDefault = !$scope.isDefault;
		}

		function _touchDelete(){

			var params = {};
			params.consignee = $scope.addressEditModel.consignee.id;
			API.consignee
				.delete(params)
				.then(function (res) {
					if(res){
						$scope.toast('删除成功');
						$scope.goBack();
					}
					else{
						$scope.toast('删除失败');
					}
				});
		}

		function _touchPickerShow() {
			$scope.pickerData = [];
			$scope.pickerRegions = [];
			$scope.pickerRegionName = null;

			$scope.showPicker = true;

			$scope.addressEditModel
				.reloadIfNeeded()
				.then(function (success) {
					if (success) {
						$scope.pickerData = $scope.addressEditModel.regions;
					} else {
						$scope.toast('请稍后再试');
						$scope.touchPickerCancel();
					}
				});
		}

		function _touchPickerRegion(region) {
			console.log("aaa")
			var no_list=[22,32,6,27,34,36,397,33,35,400]
			for(let a=0;a<no_list.length;a++){
				if(region.id==no_list[a]){
					$scope.tip_a = '该地区不支持配送';
					$scope.nameTipshowa = true;
					return
				}
			}

			$scope.pickerRegions.push(region);
			$scope.pickerRegionName = _formatRegions($scope.pickerRegions);
            console.log(region)
			if (region.regions && region.regions.length) {
				$scope.pickerData = region.regions;
			} else {
				$scope.regions = $scope.pickerRegions;
				$scope.showPicker = false;
			}
		}

		function _touchPickerCancel() {
			$scope.showPicker = false;

			$scope.pickerData = [];
			$scope.pickerRegions = [];
			$scope.pickerRegionName = null;
		}

		function _formatRegions(regions) {
			var address = '';

			for (var i = 0; i < regions.length; ++i) {
				address += regions[i].name;
				address += ' ';
			}

			return address;
		}
	}

})();