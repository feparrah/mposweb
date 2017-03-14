(function () {
    angular.module('mpos').service('Oauth2Service', Oauth2Service);

    function Oauth2Service($q, $http, netcomEnvironment) {

        function getOauth2Token() {
            var def = $q.defer();
            netcomEnvironment.then(function (apis) {
                var data = 'client_id=CFGkFIU4JKhy9cjG6HnoctOg8aQa&client_secret=Tek1bEVvPXLNb7AI5fkVVbhToEMa&username=admin&password=admin&grant_type=password';
                $http.post(apis.token, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
                    def.resolve(response.data);
                }).catch(function (error) {
                    def.reject();
                });
            });
            return def.promise;
        }


        this.getOauth2Token = getOauth2Token;
    }


})();