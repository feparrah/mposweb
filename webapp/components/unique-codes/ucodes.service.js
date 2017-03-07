(function () {
    angular.module('mpos').service('UniqueCodeService', UniqueCodeService);

    function UniqueCodeService($http, $q, netcomEnvironment, Oauth2Service, $base64, $log){
        var ucodesApis;
        netcomEnvironment.then(function (apis) {
            ucodesApis = apis.ucodes;
        });

        function UcCommerce(address, cityName, contactName, countryName, email, name, nit, stateId, telephoneContact, ucId, uniqueCode){
                this.address = $base64.decode(address);
                this.cityName =  $base64.decode(cityName);
                this.contactName = $base64.decode(contactName);
                this.countryName = $base64.decode(countryName);
                this.email = $base64.decode(email);
                this.name = $base64.decode(name);
                this.nit = $base64.decode(nit);
                this.stateId = $base64.decode(stateId);
                this.telephoneContact = $base64.decode(telephoneContact);
                this.ucId = $base64.decode(ucId);
                this.uniqueCode = $base64.decode(uniqueCode);
        }

        function findUcCommerce(id){
            var def = $q.defer();
            var encodedId = $base64.encode(id);
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $http({
                    method : 'GET',
                    url : ucodesApis.findUcode.replace('{id}', encodedId),
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var responseCode = $base64.decode(response.data.responseCode);
                    if(responseCode === '1'){
                        var ucCommerce = new UcCommerce(
                            response.data.address,
                            response.data.cityName,
                            response.data.contactName,
                            response.data.countryName,
                            response.data.email,
                            response.data.businessName,
                            response.data.nit,
                            response.data.stateId,
                            response.data.telephoneContact,
                            response.data.ucId,
                            encodedId
                        );
                        def.resolve(ucCommerce);

                    }else {
                        var responseMessage = $base64.decode(response.data.responseMessage);
                        $log.info(responseMessage);
                        def.reject();
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
                    url : ucodesApis.countPages,
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

        function findPage(pageNumber) {
            var def = $q.defer();
            Oauth2Service.getOauth2Token().then(function (tokenData) {
                $http({
                    method : 'GET',
                    url : ucodesApis.findPage.replace('{pageNumber}', $base64.encode(pageNumber)),
                    headers: {
                        'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                    }
                }).then(function (response) {
                    var ucCommerces = [];
                    response.data.ucCommerceList.forEach(function (data) {
                        var ucCommerce = new UcCommerce(
                          data.ucCommerce.address,
                          data.ucCommerce.cityName,
                          data.ucCommerce.contactName,
                          data.ucCommerce.countryName,
                          data.ucCommerce.email,
                          data.ucCommerce.name,
                          data.ucCommerce.nit,
                          data.ucCommerce.stateId,
                          data.ucCommerce.telephoneContact,
                          data.ucCommerce.ucId,
                          data.ucCommerce.uniqueCode
                        );
                        ucCommerces.push(ucCommerce);
                    });
                    def.resolve(ucCommerces);
                }).catch();

            });
            return def.promise;
        }

        this.findUcCommerce = findUcCommerce;
        this.countPages = countPages;
        this.findPage = findPage;
    }
})();