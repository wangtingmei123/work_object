(function () {

    'use strict';

    angular
        .module('app')
        .controller('KnowallController', KnowallController);

    KnowallController.$inject = ['$scope', '$http', '$location', '$state', 'API', 'ENUM', 'CartModel','AppAuthenticationService'];

    function KnowallController($scope, $http, $location, $state, API, ENUM, CartModel,AppAuthenticationService) {

        var MAX_COMMENTS = 3;
        var PER_PAGE = 1000;
        $scope.brands = [];
        $scope.letter_sort=[];
        //品牌


    }

})();
