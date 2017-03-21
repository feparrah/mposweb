(function () {
    angular.module('mpos').service('UserService', UserService);

    function UserService($http, $base64, netcomEnvironment , $log, $q, Oauth2Service) {

        var userApis;
        netcomEnvironment.then(function (apis) {
            userApis = apis.user;
        })


        function findUser(userName){
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                var url = userApis.findUser.replace('{user}', $base64.encode(userName));
                $log.debug('*** findUser ***', url, tokenData.access_token);
                $http.get(url, {
                    headers : {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    console.log(response);
                    var responseCode = $base64.decode(response.data.responseCode);
                    var responseMessage = $base64.decode(response.data.responseMessage);
                    $log.debug('Response :', responseCode, responseMessage);
                });
            });
        }


        this.findUser = findUser;
    }
})();