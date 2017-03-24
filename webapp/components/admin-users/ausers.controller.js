(function () {
    angular.module('mpos').controller('adminUsersCtrl', adminUsersCtrl);


    function adminUsersCtrl($state, AUserService, AUser) {
        var vm = this;

        vm.user = new AUser();
        vm.userFound = false;
        vm.showUserNotFound = false;
        vm.showSucces = false;


        vm.findAUser = function (userName) {
            if(vm.admUserForm.user.$valid){
                AUserService.findAUser(userName).then(function (data) {
                    if(data.userId != ''){
                        console.log(data);
                        vm.user.setUserName(userName, false);
                        vm.user.setData(
                            data.userId,
                            data.documentType,
                            data.documentNumber,
                            data.email,
                            data.firstName,
                            data.middleName,
                            data.lastName,
                            data.secondSurname,
                            "",
                            data.stateId,
                            data.profileNit,
                            data.profileUniqueCode,
                            data.profileTerminal,
                            data.profileUserCommerce,
                            data.profileUserAdmin
                        );
                        console.log(vm.user);
                        vm.userFound = true;
                        vm.showUserNotFound = false;
                    }else{
                        vm.userFound = false;
                        vm.showUserNotFound = true;
                        vm.resetForm();
                    }

                });
            }else {
                vm.admUserForm.user.$setTouched();
            }

        }
        
        vm.sendUser = function () {
            if (vm.admUserForm.$invalid) {
                angular.forEach(vm.admUserForm.$error.required, function (field) {
                    field.$setDirty();
                    field.$setTouched();
                });
            }else{
                if(vm.userFound){
                    AUserService.updateAUser(vm.user.updateBody(), vm.user.userId).then(function () {
                        vm.showSucces = true;
                        vm.resetForm();
                    });
                }else{
                    AUserService.createAUser(vm.user.createBody());
                }
            }
        }

        vm.resetForm = function () {
            vm.user = new AUser();
            vm.admUserForm.$setUntouched();
            vm.admUserForm.$setPristine();
            vm.showSucces = false;
            window.scrollTo(0,0);
        }
    }
})();

