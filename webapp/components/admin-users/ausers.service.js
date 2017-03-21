(function () {
    angular.module('mpos').service('AUserService', AUserService);
    
    function AUserService($http, netcomEnvironment, $log, $q, Oauth2Service , $rootScope, $filter, $base64) {
        var aUsersApis;
        netcomEnvironment.then(function (apis) {
            aUsersApis = apis.aUser;
        });
        
        function findAUser(userName) {
            var def =  $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                var url = aUsersApis.findAUser.replace('{user}', $base64.encode(userName));
                $log.debug('*** find Admin User ***', url, tokenData.access_token);
                $http.get(url,{
                    headers : {
                        'Authorization' : tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    var responseMessage = $base64.decode(response.data.responseMessage);
                    $log.debug('Response :', responseCode, responseMessage);
                    if(responseCode === '1'){
                        def.resolve(response.data);
                    }
                });
            });
            return def.promise;


        }

        function createAUser(aUser) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                aUser.userId = $base64.encode($rootScope.currentUser.userId);
                $log.debug('*** create Admin User ***', aUsersApis.create, tokenData.access_token);
                $log.debug($filter('json')(aUser));
                $http.post(aUsersApis.create, aUser, {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    var responseMessage = $base64.decode(response.data.responseMessage);
                    $log.debug('Response :', responseCode, responseMessage);
                    if(responseCode === '1'){
                        def.resolve(response.data);
                    }
                }).catch(function (error) {
                    $log.error(error);
                });
            });
            return def.promise;

        }

        function updateAUser(aUser, userId) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                aUser.userIdSession = $base64.encode($rootScope.currentUser.userId);
                var url = aUsersApis.update.replace('{userId}', $base64.encode(userId));
                $log.debug('*** update Admin User ***', url, tokenData.access_token);
                $log.debug($filter('json')(aUser));
                $http.put(url, aUser, {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    var responseMessage = $base64.decode(response.data.responseMessage);
                    $log.debug('Response :', responseCode, responseMessage);
                    if(responseCode === '1'){
                        def.resolve(response.data);
                    }
                }).catch(function (error) {
                    $log.error(error);
                });

            });
            return def.promise;
        }

        this.findAUser = findAUser;
        this.createAUser = createAUser;
        this.updateAUser = updateAUser;



    }
})();