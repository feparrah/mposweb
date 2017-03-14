(function () {
    angular.module('mpos').service('BusinessTypeService', BusinessTypeService);

    function BusinessTypeService($base64, netcomEnvironment, Oauth2Service, $http, $q) {
        var apiUrls;
        netcomEnvironment.then(function (apis) {
            apiUrls = apis.businessType;
        });

        function findAllBusinessTypes() {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $http.get(
                    apiUrls.findAllBusinessTypes,
                    {
                        headers: {
                            'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                        }
                    }
                ).then(function (response) {
                    def.resolve(response.data.businessTypeList);
                });
            });
            return def.promise;
        }

        this.findAllBusinessTypes = findAllBusinessTypes;
    }
})();