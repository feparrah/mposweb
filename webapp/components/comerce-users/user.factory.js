(function () {
    angular.module('mpos').factory('User', UserFactory);

    function UserFactory($base64) {
        function User() {
            this.stateId = '1';
        }

        User.prototype.setUserName = function (userName, encoded) {
            this.userName = encoded ? $base64.decode(userName) : userName;
        }

        User.prototype.setData = function (userId, documentType, documentNumber, userType, commerceType, email, firstName, middleName, lastName, secondSurname, password, stateId) {
            this.userId = userId;
            this.documentType = documentType;
            this.documentNumber = documentNumber;
            this.userType = userType;
            this.commerceType = commerceType;
            this.email = email;
            this.firstName =  firstName;
            this.middleName = middleName;
            this.lastName = lastName;
            this.secondSurname = secondSurname;
            this.password = password;
            this.stateId = stateId;
        }
    }
})();