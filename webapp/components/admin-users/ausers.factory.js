(function () {
    angular.module('mpos').factory('AUser', AUserFactory);

    function AUserFactory($base64) {
        function AUser() {
            this.stateId = '1';
            this.profileNit = '0';
            this.profileUniqueCode = '0';
            this.profileTerminal = '0';
            this.profileUserCommerce = '0';
            this.profileUserAdmin = '0';
        }

        AUser.prototype.setUserName = function (userName, encoded) {
            this.userName = encoded ? $base64.decode(userName) : userName;
            this.isNotEmptyUserName = true;
        }

        AUser.prototype.setData = function (userId,
                                            documentType,
                                            documentNumber,
                                            email,
                                            firstName,
                                            middleName,
                                            lastName,
                                            secondSurname,
                                            password,
                                            stateId,
                                            profileNit,
                                            profileUniqueCode,
                                            profileTerminal,
                                            profileUserCommerce,
                                            profileUserAdmin) {

            this.userId = $base64.decode(userId);
            this.documentType = $base64.decode(documentType);
            this.documentNumber = $base64.decode(documentNumber);
            this.email = $base64.decode(email);
            this.firstName = $base64.decode(firstName);
            this.middleName = $base64.decode(middleName);
            this.lastName = $base64.decode(lastName);
            this.secondSurname = $base64.decode(secondSurname);
            this.password = $base64.decode(password);
            this.stateId = $base64.decode(stateId);
            this.profileNit = $base64.decode(profileNit);
            this.profileUniqueCode = $base64.decode(profileUniqueCode);
            this.profileTerminal = $base64.decode(profileTerminal);
            this.profileUserCommerce = $base64.decode(profileUserCommerce);
            this.profileUserAdmin = $base64.decode(profileUserAdmin);
            this.isNotEmptyDocumentType = isNotEmpty(this.documentType);
            this.isNotEmptyDocumentNumber = isNotEmpty(this.documentNumber);
            this.isNotEmptyEmail = isNotEmpty(this.email);
            this.isNotEmptyFirstName = isNotEmpty(this.firstName);
            this.isNotEmptyMiddleName = isNotEmpty(this.middleName);
            this.isNotEmptyLastName = isNotEmpty(this.lastName);
            this.isNotEmptySecondSurname = isNotEmpty(this.secondSurname);
            this.isNotEmptyPassword = true;


            
            function isNotEmpty(value) {
                return value != '' && value != ' ';
            }
        }

        AUser.prototype.createBody = function () {
            var user = this;
            return {
                userName: $base64.encode(user.userName),
                documentType: user.documentType ? $base64.encode(user.documentType) : '',
                documentNumber: $base64.encode(user.documentNumber),
                email: $base64.encode(user.email),
                firstName: $base64.encode(user.firstName),
                middleName: $base64.encode(user.middleName),
                lastName: $base64.encode(user.lastName),
                secondSurname: $base64.encode(user.secondSurname),
                password: $base64.encode(sha512(user.password)),
                stateId: $base64.encode(user.stateId),
                profileNit: $base64.encode(user.profileNit),
                profileUniqueCode: $base64.encode(user.profileUniqueCode),
                profileTerminal: $base64.encode(user.profileTerminal),
                profileUserCommerce: $base64.encode(user.profileUserCommerce),
                profileUserAdmin: $base64.encode(user.profileUserAdmin)
            }
        }

        AUser.prototype.updateBody = function () {
            var user = this;
            return {
                email: $base64.encode(user.email),
                firstName: $base64.encode(user.firstName),
                middleName: $base64.encode(user.middleName),
                lastName: $base64.encode(user.lastName),
                secondSurname: $base64.encode(user.secondSurname),
                password: $base64.encode(user.password),
                stateId: $base64.encode(user.stateId),
                profileNit: $base64.encode(user.profileNit),
                profileUniqueCode: $base64.encode(user.profileUniqueCode),
                profileTerminal: $base64.encode(user.profileTerminal),
                profileUserCommerce: $base64.encode(user.profileUserCommerce),
                profileUserAdmin: $base64.encode(user.profileUserAdmin)
            }
        }


        return AUser;


    }
})();