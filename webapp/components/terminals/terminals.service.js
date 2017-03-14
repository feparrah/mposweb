(function () {
    angular.module('mpos').service('TerminalsService', TerminalsService);

    function TerminalsService($http, $q, netcomEnvironment, Oauth2Service, $base64, $rootScope, $filter, $log){
        var terminalsApis;
        netcomEnvironment.then(function (apis) {
            terminalsApis = apis.terminals;
        });


        function Terminal(address, businessType, cityName, commerceName, countryName, email, imei, license, stateId, telephoneNumber, terminalCode, terminalId){
            this.address = $base64.decode(address);
            this.businessType = $base64.decode(businessType);
            this.cityName = $base64.decode(cityName);
            this.commerceName = $base64.decode(commerceName);
            this.countryName = $base64.decode(countryName);
            this.email = $base64.decode(email);
            this.imei = $base64.decode(imei);
            this.licence = $base64.decode(license);
            this.stateId = $base64.decode(stateId);
            this.thelephoneNumber = $base64.decode(telephoneNumber);
            this.terminalCode = $base64.decode(terminalCode);
            this.terminalId = $base64.decode(terminalId);

        }

        function findTerminal(terminalCode){
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                console.log(tokenData.access_token);
                console.log(terminalsApis.findTerminal.replace('{id}', $base64.encode(terminalCode)));
                $http({
                    method : 'GET',
                    url : terminalsApis.findTerminal.replace('{id}', $base64.encode(terminalCode)),
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    if (responseCode === '1') {
                        def.resolve(response.data);
                    } else {
                        var responseMessage = $base64.decode(response.data.responseMessage);
                        def.reject(responseMessage);
                    }
                });
            });
            return def.promise;
        }

        function countPages(){
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
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

        function findPage(pageNumber){
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $http({
                    method : 'GET',
                    url : terminalsApis.findPage.replace('{pageNumber}', $base64.encode(pageNumber)),
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    def.resolve(response.data.terminalList);
                }).catch();
            });
            return def.promise;
        }

        function createTerminal(terminal){
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $log.debug($filter('json')(terminal), terminalsApis.create, tokenData.access_token);
                $http.post(terminalsApis.create, terminal,{
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    if (responseCode === '1') {

                    } else {
                        var responseMessage = $base64.decode(response.data.responseMessage);
                        def.reject(responseMessage);
                    }
                }).catch(function (error) {
                    $log.error(error);
                });
            });
            return def.promise;
        }

        this.countPages = countPages;
        this.findPage = findPage;
        this.findTerminal = findTerminal;
        this.createTerminal = createTerminal;
    }
})();