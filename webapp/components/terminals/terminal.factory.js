(function () {
    angular.module('mpos').factory('Terminal', TerminalFactory);

    function TerminalFactory($base64) {
        function Terminal() {
            this.stateId = '1';
        }

        Terminal.prototype.setCode = function (terminalCode, encoded) {
            this.terminalCode = encoded ? $base64.decode(terminalCode) : terminalCode;
            this.notEmptyTerminal = true;
        };

        Terminal.prototype.setData = function (address, businessType, cityName, commerceName, countryName, email, imei, license, stateId, telephoneNumber, terminalId, uniqueCode) {
            this.address = $base64.decode(address);
            this.businessType = typeof businessType == 'string' ? $base64.decode(businessType) : businessType;
            this.cityName = $base64.decode(cityName);
            this.commerceName = $base64.decode(commerceName);
            this.countryName = $base64.decode(countryName);
            this.email = $base64.decode(email);
            this.imei = $base64.decode(imei);
            this.license = $base64.decode(license);
            this.stateId = $base64.decode(stateId);
            this.thelephoneNumber = $base64.decode(telephoneNumber);
            this.terminalId = $base64.decode(terminalId);
            this.uniqueCode = $base64.decode(uniqueCode);
            this.notEmptyAddress = isEmpty(address);
            this.notEmptyBusinessType = isEmpty(businessType);
            this.notEmptyCityName = isEmpty(cityName);
            this.notEmptyCommerceName = isEmpty(commerceName);
            this.notEmptyCountryName = isEmpty(countryName);
            this.notEmptyEmail = isEmpty(email);
            this.notEmptyImei = isEmpty(imei);
            this.notEmptyLicense = isEmpty(license);
            this.notEmptyTelephoneNumber = isEmpty(telephoneNumber);
            this.notEmptyUniqueCode = isEmpty(uniqueCode);

            function isEmpty(value) {
                return value !== '';
            }
        };

        Terminal.prototype.createBody = function () {
            var terminal = this;
            return {
                terminal: $base64.encode(terminal.terminalCode),
                uniqueCode: $base64.encode(terminal.uniqueCode),
                businessType: terminal.businessType ? $base64.encode(terminal.businessType.businessTypeId) : '',
                telephoneContact: $base64.encode(terminal.thelephoneNumber),
                email: $base64.encode(terminal.email),
                address: $base64.encode(terminal.address),
                city: $base64.encode(terminal.cityName),
                imei: $base64.encode(terminal.imei),
                stateId: $base64.encode(terminal.stateId)
            }
        };

        Terminal.prototype.updateBody = function () {
            var terminal = this;
            return {
                stateId: $base64.encode(terminal.stateId),
                email: $base64.encode(terminal.email),
                address: $base64.encode(terminal.address)
            }
        };

        Terminal.prototype.setBusinessType = function (id, list) {
            var businessTypeId = $base64.decode(id);
            list.forEach(function (item) {
                if (businessTypeId === item.businessTypeId) {
                    this.businessType = item;
                    console.log(this.businessType);
                }
            });
        };

        return Terminal;
    }
})();