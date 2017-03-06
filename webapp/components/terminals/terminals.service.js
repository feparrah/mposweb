(function () {
    angular.module('mpos').service('TerminalsService', TerminalsService);

    function TerminalsService($http, $q, netcomEnvironment, Oauth2Service, $base64, $rootScope){
        var terminalsApis;
        netcomEnvironment.then(function (apis) {
            terminalsApis = apis.terminals;
        });

        function countPages(){
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                console.log(terminalsApis.countPages);
                console.log(tokenData.access_token);
                $http({
                    method : 'GET',
                    url : terminalsApis.countPages,
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    def.resolve($base64.decode(response.data.pages));
                }).catch(function (err) {
                    def.reject(err);
                });
            });
            return def.promise;
        }

        this.countPages = countPages;
    }
})();