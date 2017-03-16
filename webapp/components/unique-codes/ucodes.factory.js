(function () {
    angular.module('mpos').factory('UcCommerce', UcCommerceFactory);

    function UcCommerceFactory($base64){
        function UcCommerce(){
            this.stateId = '1';
        }

        UcCommerce.prototype.setUniqueCode = function (uniqueCode, encoded) {
            this.uniqueCode = encoded? $base64.decode(uniqueCode) : uniqueCode;
            this.notEmptyUniqueCode = true;
        };

        UcCommerce.prototype.setData = function(address, cityName, contactName, countryName, email, name, nit, stateId, telephoneContact, ucId, businessType){
            this.address = $base64.decode(address);
            this.cityName =  $base64.decode(cityName);
            this.contactName = $base64.decode(contactName);
            this.countryName = $base64.decode(countryName);
            this.email = $base64.decode(email);
            this.businessName = $base64.decode(name);
            this.nit = $base64.decode(nit);
            this.stateId = $base64.decode(stateId);
            this.telephoneContact = $base64.decode(telephoneContact);
            this.ucId = $base64.decode(ucId);
            this.businessType = typeof businessType == 'string' ? $base64.decode(businessType) : businessType;
            this.notEmptyAddress = address !== '';
            this.notEmptyCityName = cityName !== '';
            this.notEmptyContactName = contactName !== '';
            this.notEmptyCountryName = countryName !== '';
            this.notEmptyEmail = email !== '';
            this.notEmptyBusinessName = name !== '';
            this.notEmptyNit = nit !== '';
            this.notEmptyTelephoneContact = telephoneContact !== '';
        };

        UcCommerce.prototype.createBody = function () {
            var ucCommerce = this;
            return {
                stateId : $base64.encode(ucCommerce.stateId),
                uniqueCode : $base64.encode(ucCommerce.uniqueCode),
                nit : $base64.encode(ucCommerce.nit),
                businessName : $base64.encode(ucCommerce.businessName),
                businessType : ucCommerce.businessType? $base64.encode(ucCommerce.businessType.businessTypeId) : '',
                email : $base64.encode(ucCommerce.email),
                address : $base64.encode(ucCommerce.address),
                city : $base64.encode(ucCommerce.cityName),
                contactName : $base64.encode(ucCommerce.contactName),
                telephoneContact : $base64.encode(ucCommerce.telephoneContact)
            }
        };

        UcCommerce.prototype.updateBody = function () {
            var ucCommerce = this;
            return {
                stateId : $base64.encode(ucCommerce.stateId),
                businessName : $base64.encode(ucCommerce.businessName),
                email : $base64.encode(ucCommerce.email),
                address : $base64.encode(ucCommerce.address),
                contactName : $base64.encode(ucCommerce.contactName),
                telephoneContact : $base64.encode(ucCommerce.telephoneContact)
            }
        };


        return UcCommerce;


    }
})();