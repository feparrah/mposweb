angular.module('mpos').controller('comerceUsersCtrl', function (UserService, User) {
    var vm = this;
    vm.showConectionError = false;


    vm.user = new User();
    vm.userFound = false;
    vm.showSuccessMessage = false;
    vm.showInfoMessage = false;

    vm.findUser = function (userName) {
        UserService.findUser(userName).then(function (data) {
            console.log(data);
            vm.user.setUserName(userName, false);
            vm.user.setData(
                data.userId,
                data.documentType,
                data.documentNumber,
                data.userType,
                data.commerceType,
                data.email,
                data.firstName,
                data.middleName,
                data.lastName,
                data.secondSurname,
                "",
                data.stateId
            );
            console.log(vm.user);
            vm.userFound = true;
            vm.showInfoMessage = false;
            vm.showSuccessMessage = false;
        }).catch(function (error) {
            vm.infoMessage = error;
            vm.showInfoMessage = true;
            vm.showSuccessMessage = false;
            vm.userFound = false;
        });
    }

    vm.sendCUser = function () {
        if (vm.cUserForm.$invalid) {
            angular.forEach(vm.cUserForm.$error.required, function (field) {
                field.$setDirty();
                field.$setTouched();
            });
        } else {
            if (vm.userFound) {
                UserService.updateUser(vm.user.updateBody(), vm.user.userId).then(function () {
                    vm.showSuccessMessage = true;
                    reset();
                }).catch(function (error) {
                    vm.infoMessage = error;
                    vm.showInfoMessage = true;
                });
            } else {
                UserService.createUser(vm.user.createBody()).then(function () {
                    vm.showSuccessMessage = true;
                    reset();
                }).catch(function (error) {
                    vm.infoMessage = error;
                    vm.showInfoMessage = true;
                });

            }
        }
    }

    function reset() {
        vm.userFound = false;
        vm.user = new User();
        vm.cUserForm.$setUntouched();
        vm.cUserForm.$setPristine();
        window.scrollTo(0,0);
    }

    vm.resetForm = function () {
        reset();
        vm.showSuccessMessage = false;
        vm.showInfoMessage = false;
    }

});