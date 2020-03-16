(function () {

    'use strict';

    angular
    .module('app')
    .factory('AppAuthenticationService', AppAuthenticationService);

    AppAuthenticationService.$inject = ['$rootScope', '$localStorage', '$cookies'];

    function AppAuthenticationService($rootScope, $localStorage, $cookies) {

        // keep user logged in after page refresh
        try{
            $rootScope.user = $cookies.getObject( 'u' );
            $rootScope.token = $cookies.get( 't' );
            $rootScope.openId = $cookies.get( 'o' );
            $rootScope.references = $cookies.get( 'r' );
            $rootScope.valid_id = $cookies.get( 'valid_id' );
        }
        catch(e){

        }

        var service = {};
        service.signin = _signin;
        service.signout = _signout;
        service.kickout = _kickout;
        service.setCredentials = _setCredentials;
        service.setSigninCode = _setSigninCode;
        service.clearCredentials = _clearCredentials;
        service.setUser = _setUser;
        service.getUser = _getUser;
        service.getToken = _getToken;
        service.setToken = _setToken;
        service.setReferences = _setReferences;
        service.getReferences = _getReferences;
        service.getValidId = _get_valid_id;

        service.setOpenId = _setOpenId;
        service.getOpenId = _getOpenId;

        var EXPIRED_DAY = 7;
        var EXPIRED_MINUTE = 1;

        return service;

        function _signin( token, user ) {
            _setCredentials( token, user );
            $timeout(function(){
                $rootScope.goHome();
            }, 1);
        }

        function _signout() {
            _clearCredentials();
            $timeout(function(){
                $rootScope.goHome();
            }, 1);
        }

        function _kickout() {
            _clearCredentials();
            //$rootScope.goSignin();
            $rootScope.codesignin();
        }

        function _setCredentials( token, user ) {
            $rootScope.user = user;
            $rootScope.token = token;
            try{
                // save to cookie storage
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);

                $cookies.putObject( 'u', user , {'expires': exdate});
                $cookies.put( 't', token ,{'expires': exdate});
            }
            catch(e){

            }
        }

        function _setSigninCode( valid_id ) {
            $rootScope.valid_id = valid_id;
            try{
                // save to cookie storage
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);

                $cookies.putObject( 'valid_id', valid_id , {'valid_id': valid_id});
            }
            catch(e){

            }
        }


        function _setReferences(references){
            $rootScope.references = references;

            try{
                // save to cookie storage
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);

                $cookies.put( 'r', references ,{'expires': exdate});                
            }
            catch(e){

            }


        }

        function _getReferences(){
            return $rootScope.references ;
        }

        function _get_valid_id() {
            return $rootScope.valid_id ;
        }

        function _clearCredentials() {

            $rootScope.user = null;
            $rootScope.token = null;
            $rootScope.openId = null;

            // delete from cookie storage

            $cookies.remove( 'u' );
            $cookies.remove( 't' );
            $cookies.remove( 'o' );
        }

        function _getUser() {
            return $rootScope.user;
        }
        function _setUser(user) {
            $rootScope.user = user;
            
            try{
               var options = {};
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);
                options.expires =  exdate;
                $cookies.putObject( 'u', user ,options); 
            }   
            catch(e){

            }             

        }

        function _setToken( token ) {
            $rootScope.token = token;

            try{
                // save to cookie storage
                var options = {};
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);
                options.expires =  exdate;

                $cookies.put( 't', token ,options);
            }   
            catch(e){

            }  
        }

        function _getToken() {
            return $rootScope.token;
        }

        function _setOpenId(openId){

            $rootScope.openId = openId;

            try{
                // save to cookie storage
                var options = {};
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);
                options.expires =  exdate;
                $cookies.put( 'o', openId,options);
            }
            catch(e){

            }
        }
        //获取id
        function _getOpenId(){
            return $rootScope.openId;
        }

    }

})();