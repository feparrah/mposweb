(function () {
    angular.module('mpos').service('UniqueCodeService', UniqueCodeService);

    function UniqueCodeService($http, $q, netcomEnvironment, Oauth2Service, $base64, $log, $rootScope, $filter) {
        var ucodesApis;
        netcomEnvironment.then(function (apis) {
            ucodesApis = apis.ucodes;
        });

        function findUcCommerce(id) {
            var def = $q.defer();
            var encodedId = $base64.encode(id);
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $log.debug('*** Find UcCommerce ***', ucodesApis.findUcode.replace('{id}', encodedId), tokenData.access_token);
                $http({
                    method: 'GET',
                    url: ucodesApis.findUcode.replace('{id}', encodedId),
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    var responseMessage = $base64.decode(response.data.responseMessage);
                    $log.debug('Response :', responseCode, responseMessage);
                    if (responseCode === '1') {
                        def.resolve(response.data);
                    } else {
                        def.reject();
                    }
                });
            });
            return def.promise;
        }

        function countPages() {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $log.debug('*** Get UcCommerce Pages ***',ucodesApis.countPages, tokenData.access_token );
                $http({
                    method: 'GET',
                    url: ucodesApis.countPages,
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var pages = $base64.decode(response.data.pages);
                    $log.debug('Pages :', pages);
                    def.resolve(pages);
                }).catch(function (err) {
                    $log.error(err);
                });
            });
            return def.promise;
        }

        function findPage(pageNumber) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                var apiUrl = ucodesApis.findPage.replace('{pageNumber}', $base64.encode(pageNumber));
                $log.debug('*** Find UcCommerce Page ***', pageNumber, apiUrl, tokenData.access_token);
                $http({
                    method: 'GET',
                    url: apiUrl,
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    def.resolve(response.data.ucCommerceList);
                }).catch(function (error) {
                    $log.error(error);
                });

            });
            return def.promise;
        }

        function createUcCommerce(commerce) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                commerce.userId = $base64.encode($rootScope.currentUser.userId);
                $log.debug('*** Create UcCommerce ***', ucodesApis.create, tokenData.access_token);
                $log.debug($filter('json')(commerce));
                $http.post(
                    ucodesApis.create,
                    commerce, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                        }
                    }
                ).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    var responseMessage = $base64.decode(response.data.responseMessage);
                    $log.debug('Response :', responseCode, responseMessage);
                    if (responseCode === '1') {
                        def.resolve();
                    }
                }).catch(function (error) {
                    $log.error(error);
                });

            });
            return def.promise;
        }

        function updateUcCommerce(commerce, ucId) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                commerce.userId = $base64.encode($rootScope.currentUser.userId);
                var apiUrl = ucodesApis.update.replace('{ucId}', $base64.encode(ucId));
                $log.debug('*** Update UcCommerce ***', apiUrl, tokenData.access_token);
                $log.debug($filter('json')(commerce));
                $http.put(
                    apiUrl,
                    commerce, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                        }
                    }
                ).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    var responseMessage = $base64.decode(response.data.responseMessage);
                    $log.debug('Response :', responseCode, responseMessage);
                    if (responseCode === '1') {
                        def.resolve();
                    }
                });
            });
            return def.promise;

        }

        this.findUcCommerce = findUcCommerce;
        this.countPages = countPages;
        this.findPage = findPage;
        this.createUcCommerce = createUcCommerce;
        this.updateUcCommerce = updateUcCommerce;
    }
})();