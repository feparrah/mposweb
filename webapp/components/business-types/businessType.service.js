(function () {
    angular.module('mpos').service('BusinessTypeService', BusinessTypeService);

    function BusinessTypeService($base64, netcomEnvironment, Oauth2Service, $http, $q, $rootScope, $filter, $log) {
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

        function createBusinessType(businessName) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                var payload = {
                    userId : $base64.encode($rootScope.currentUser.userId),
                    businessName : $base64.encode(businessName)
                };
                $log.debug('*** create businessType ***', apiUrls.create, tokenData.access_token);
                $log.debug($filter('json')(payload));
                $http.post(apiUrls.create, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    console.log(response);
                })
            })
        }

        this.findAllBusinessTypes = findAllBusinessTypes;
        this.createBusinessType = createBusinessType;
    }
})();