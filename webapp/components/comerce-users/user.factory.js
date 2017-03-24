(function () {
    angular.module('mpos').factory('User', UserFactory);

    function UserFactory($base64) {
        function User() {
            this.stateId = '1';
        }

        User.prototype.setUserName = function (userName, encoded) {
            this.userName = encoded ? $base64.decode(userName) : userName;
            this.disableUserName = true;
        }

        User.prototype.setData = function (userId, documentType, documentNumber, userType, commerceType, email, firstName, middleName, lastName, secondSurname, password, stateId) {

            this.userId = $base64.decode(userId);
            this.documentType = $base64.decode(documentType);
            this.documentNumber = $base64.decode(documentNumber);
            this.userType = $base64.decode(userType);
            this.commerceType = $base64.decode(commerceType);
            this.email = $base64.decode(email);
            this.firstName = $base64.decode(firstName);
            this.middleName = $base64.decode(middleName);
            this.lastName = $base64.decode(lastName);
            this.secondSurname = $base64.decode(secondSurname);
            this.password = $base64.decode(password);
            this.stateId = $base64.decode(stateId);
            this.disableDocumentType = true;
            this.disableDocumentNumber = true;
            this.disableUserType = true;
            this.disableCommerceType = true;
            this.disablePassword = true;
        }


        User.prototype.createBody = function () {
            var user = this;
            return {
                userName: $base64.encode(user.userName),
                documentType: $base64.encode(user.documentType),
                documentNumber: $base64.encode(user.documentNumber),
                userType: $base64.encode(user.userType),
                commerceType: $base64.encode(user.commerceType),
                email: $base64.encode(user.email),
                firstName: $base64.encode(user.firstName),
                middleName: $base64.encode(user.middleName),
                lastName: $base64.encode(user.lastName),
                secondSurname: $base64.encode(user.secondSurname),
                password: $base64.encode(sha512(user.password)),
                stateId: $base64.encode(user.stateId)
            }
        }

        User.prototype.updateBody = function () {
            var user = this;
            return {
                email: $base64.encode(user.email),
                firstName: $base64.encode(user.firstName),
                middleName: $base64.encode(user.middleName),
                lastName: $base64.encode(user.lastName),
                secondSurname: $base64.encode(user.secondSurname),
                stateId: $base64.encode(user.stateId)
            }
        }

        return User;
    }
})();