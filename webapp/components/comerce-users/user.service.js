(function () {
    angular.module('mpos').service('UserService', UserService);

    function UserService($http, $base64, netcomEnvironment , $log, $q, Oauth2Service, $filter, $rootScope) {

        var userApis;
        netcomEnvironment.then(function (apis) {
            userApis = apis.cUser;
        })


        function findUser(userName){
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                var url = userApis.findCUser.replace('{user}', $base64.encode(userName));
                $log.debug('*** findUser ***', url, tokenData.access_token);
                $http.get(url, {
                    headers : {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    var responseMessage = $base64.decode(response.data.responseMessage);
                    $log.debug('Response :', responseCode, responseMessage);
                    if (responseCode === '1') {
                        def.resolve(response.data);
                    } else {
                        def.reject(responseMessage);
                    }
                });
            });
            return def.promise;
        }

        function createUser(cUser){
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                cUser.userId = $base64.encode($rootScope.currentUser.userId);
                $log.debug('*** create CUser ***', userApis.create, tokenData.access_token);
                $log.debug($filter('json')(cUser));
                $http.post(userApis.create, cUser, {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    var responseMessage = $base64.decode(response.data.responseMessage);
                    $log.debug('Response :', responseCode, responseMessage);
                    if (responseCode === '1') {
                        def.resolve();
                    } else {
                        def.reject(responseMessage);
                    }
                });
            });
            return def.promise;
        }

        function updateUser(cUser, userId) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                cUser.userIdSession = $base64.encode($rootScope.currentUser.userId);
                var url = userApis.update.replace('{userId}', $base64.encode(userId));
                $log.debug('*** update CUser ***', url, tokenData.access_token);
                $log.debug($filter('json')(cUser));
                $http.put(url, cUser,{
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    var responseMessage = $base64.decode(response.data.responseMessage);
                    $log.debug('Response :', responseCode, responseMessage);
                    if (responseCode === '1') {
                        def.resolve();
                    } else {
                        def.reject(responseMessage);
                    }
                });
            });
            return def.promise;
        }


        this.findUser = findUser;
        this.createUser = createUser;
        this.updateUser = updateUser;
    }
})();