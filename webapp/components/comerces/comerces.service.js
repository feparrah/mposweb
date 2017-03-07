(function () {
    angular.module('mpos').service('ComercesService', ComercesService);


    function ComercesService($http, $q, netcomEnvironment, Oauth2Service, $base64, $rootScope, $log) {
        var comercesApis;
        netcomEnvironment.then(function (apis) {
            comercesApis = apis.comerces;
        });

        function Comerce(nit, address, businessName, city, cityCode, contactName, country, nitId, stateId, telephoneContact) {
            this.nit = $base64.decode(nit);
            this.address = $base64.decode(address);
            this.businessName = $base64.decode(businessName);
            this.city = $base64.decode(city);
            this.cityCode = $base64.decode(cityCode);
            this.contactName = $base64.decode(contactName);
            this.country = $base64.decode(country);
            this.nitId = $base64.decode(nitId);
            this.stateId = $base64.decode(stateId);
            this.telephoneContact = $base64.decode(telephoneContact);

        }

        function findComerce(id) {
            var def = $q.defer();
            var encodedId = $base64.encode(id);
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $http({
                    method: 'GET',
                    url: comercesApis.findComerce.replace('{id}', encodedId),
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    if (responseCode === '1') {
                        var comerce = new Comerce(
                            encodedId,
                            response.data.address,
                            response.data.businessName,
                            response.data.city,
                            response.data.cityCode,
                            response.data.contactName,
                            response.data.country,
                            response.data.nitId,
                            response.data.stateId,
                            response.data.telephoneContact);
                        def.resolve(comerce);
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
                    url : comercesApis.countPages,
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    def.resolve($base64.decode(response.data.pages));
                }).catch(function (err) {
                    def.reject();
                });
            });
            return def.promise;
        }

        function findPage(pageNumber) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $http({
                    method : 'GET',
                    url : comercesApis.findPage.replace('{page}', $base64.encode(pageNumber)),
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var commerces = [];
                    response.data.nitCommerceList.forEach(function (data) {
                        var comerce = new Comerce(
                            data.nitCommerce.nit,
                            data.nitCommerce.address,
                            data.nitCommerce.businessName,
                            data.nitCommerce.cityName,
                            "",
                            data.nitCommerce.contactName,
                            data.nitCommerce.countryName,
                            data.nitCommerce.nitId,
                            data.nitCommerce.stateId,
                            data.nitCommerce.telephoneContact);
                        commerces.push(comerce);
                    });
                    def.resolve(commerces);
                }).catch();

            });
            return def.promise;
        }

        function createCommerce(commerce){
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                var payload = {
                    userId : $base64.encode($rootScope.currentUser.userId),
                    stateId : $base64.encode(commerce.stateId),
                    nit : $base64.encode(commerce.nit),
                    businessName : $base64.encode(commerce.businessName),
                    address : $base64.encode(commerce.address),
                    city : $base64.encode(commerce.city),
                    contactName : $base64.encode(commerce.contactName),
                    telephoneContact : $base64.encode(commerce.telephoneContact)
                };
                $http({
                    method : 'POST',
                    url : comercesApis.create,
                    data : payload,
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    if(responseCode === '1'){

                    }else{
                        var responseMessage = $base64.decode(response.data.responseMessage);
                        def.reject(responseMessage);
                    }
                });
            });
            return def.promise;
        }

        function updateCommerce(commerce) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
               var payload = {
                   userId : $base64.encode($rootScope.currentUser.userId),
                   stateId : $base64.encode(commerce.stateId),
                   businessName : $base64.encode(commerce.businessName),
                   address : $base64.encode(commerce.address),
                   contactName : $base64.encode(commerce.contactName),
                   telephoneContact : $base64.encode(commerce.telephoneContact)
               };
               $http({
                   method : 'PUT',
                   url : comercesApis.update.replace('{id}', $base64.encode(commerce.nit)),
                   data : payload,
                   headers: {
                       'Content-Type' : 'application/json',
                       'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                   }
               }).then(function (response) {
                   var responseCode = $base64.decode(response.data.responseCode);
                   if(responseCode === '1'){
                        def.resolve();
                   }else{
                       var responseMessage = $base64.decode(response.data.responseMessage);
                       def.reject(responseMessage);
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