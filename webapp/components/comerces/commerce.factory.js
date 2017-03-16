(function () {
    angular.module('mpos').factory('Commerce', CommerceFactory);

    function CommerceFactory($base64) {
        function Commerce() {
            this.stateId = '1';
        }

        Commerce.prototype.setNit = function (nit, encoded) {
            this.nit = encoded? $base64.decode(nit): nit;
            this.notEmptyNit = true;
        };

        Commerce.prototype.setData = function (address, businessName, city, cityCode, contactName, country, nitId, stateId, telephoneContact) {
            this.address = $base64.decode(address);
            this.businessName = $base64.decode(businessName);
            this.city = $base64.decode(city);
            this.cityCode = $base64.decode(cityCode);
            this.contactName = $base64.decode(contactName);
            this.country = $base64.decode(country);
            this.nitId = $base64.decode(nitId);
            this.stateId = $base64.decode(stateId);
            this.telephoneContact = $base64.decode(telephoneContact);
            this.notEmptyAddress = address !== '';
            this.notEmptyBusinessName = businessName !== '';
            this.notEmptyCity = city !== '';
            this.notEmptyContactName = contactName !== '';
            this.notEmptyCountry = country !== '';
            this.notEmptyTelephoneContact = telephoneContact !== '';
        };


        Commerce.prototype.createBody = function () {
            var commerce = this;
            return {
                stateId: $base64.encode(commerce.stateId),
                nit: $base64.encode(commerce.nit),
                businessName: $base64.encode(commerce.businessName),
                address: $base64.encode(commerce.address),
                city: $base64.encode(commerce.city),
                contactName: $base64.encode(commerce.contactName),
                telephoneContact: $base64.encode(commerce.telephoneContact)
            }
        };

        Commerce.prototype.updateBody = function () {
            var commerce = this;
            return {
                stateId: $base64.encode(commerce.stateId),
                businessName: $base64.encode(commerce.businessName),
                address: $base64.encode(commerce.address),
                contactName: $base64.encode(commerce.contactName),
                telephoneContact: $base64.encode(commerce.telephoneContact)
            }
        };

        return Commerce;
    }
})();