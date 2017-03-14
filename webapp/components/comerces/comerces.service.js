(function () {
    angular.module('mpos').service('ComercesService', ComercesService);


    function ComercesService($http, $q, netcomEnvironment, Oauth2Service, $base64, $rootScope, $filter, $log) {
        var comercesApis;
        netcomEnvironment.then(function (apis) {
            comercesApis = apis.comerces;
        });


        function findComerce(id) {
            var def = $q.defer();
            var encodedId = $base64.encode(id);
            Oauth2Service.getOauth2Token().then(function (tokenData) {

                $log.debug('*** Find Commerce ***', comercesApis.findComerce.replace('{id}', encodedId), tokenData.access_token);
                $http({
                    method: 'GET',
                    url: comercesApis.findComerce.replace('{id}', encodedId),
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
                        def.reject(responseMessage);
                    }

                }).catch(function (error) {
                    $log.error(error);
                });
            });
            return def.promise;

        }

        function countPages() {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $log.debug('*** Find Commerce Pages ***', comercesApis.countPages, tokenData.access_token);
                $http({
                    method: 'GET',
                    url: comercesApis.countPages,
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var pages = $base64.decode(response.data.pages);
                    $log.debug('Pages :', pages);
                    def.resolve(pages);
                }).catch(function (err) {
                    def.reject();
                });
            });
            return def.promise;
        }

        function findPage(pageNumber) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $log.debug('*** Find Commerce Page ***', pageNumber, comercesApis.findPage.replace('{page}', $base64.encode(pageNumber)), tokenData.access_token);
                $http.get(comercesApis.findPage.replace('{page}', $base64.encode(pageNumber)), {
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    def.resolve(response.data.nitCommerceList);
                }).catch();

            });
            return def.promise;
        }


        function createCommerce(commerce) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                commerce.userId = $base64.encode($rootScope.currentUser.userId);
                $log.debug('**** Commerce Nit creation ****', comercesApis.create, tokenData.access_token);
                $log.debug($filter('json')(commerce));
                $http.post(comercesApis.create, commerce, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
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

        function updateCommerce(commerce, nitId) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                commerce.userId = $base64.encode($rootScope.currentUser.userId);
                var apiUrl = comercesApis.update.replace('{id}', $base64.encode(nitId));
                $log.debug('**** Commerce Nit update ****', apiUrl, tokenData.access_token);
                $http.put(apiUrl, commerce, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
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

        this.findComerce = findComerce;
        this.countPages = countPages;
        this.findPage = findPage;
        this.createCommerce = createCommerce;
        this.updateCommerce = updateCommerce;
    }


})();