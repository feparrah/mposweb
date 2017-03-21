angular.module('mpos').controller('mainCtrl', function (LoginService, $state, $scope, $rootScope, $http, sessionSchedule,$uibModal,Idle) {
    var vm = this;

    $http.get('https://jsonip.com/').then(function (response) {
        vm.currentIpAddress = response.data.ip;
    });



    function closeModals() {
        if (vm.warning) {
            vm.warning.close();
            vm.warning = null;
        }

        if (vm.timedout) {
            vm.timedout.close();
            vm.timedout = null;
        }
    }

    $scope.$on('IdleEnd', function () {

    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        vm.timedout = $uibModal.open({
            templateUrl: 'components/authentication/timedout-dialog.html'
        });
        vm.timedout.result.then(function () {}, function () {});
        document.title = 'MPOS';
        Idle.unwatch();
        vm.logout();
    });



    vm.showLoginError = false;
    vm.logedUser = false;
    vm.showChangePassError = false;
    vm.showChangePassSuccess = false;


    vm.changePass = function () {
        if (vm.changePasswordForm.$invalid) {
            angular.forEach(vm.changePasswordForm.$error.required, function (field) {
                field.$setDirty();
                field.$setTouched();
            });
        } else {
            LoginService.changePassword(vm.currentUser.userId, vm.cp.currentpass, vm.cp.newpass, vm.cp.newpass2)
                .then(function (success) {
                    vm.changePassResponse = success;
                    vm.showChangePassError = false;
                    vm.showChangePassSuccess = true;
                })
                .catch(function (error) {
                    vm.changePassResponse = error;
                    vm.showChangePassSuccess = false;
                    vm.showChangePassError = true;
                });
            vm.cp = {};
            vm.changePasswordForm.$setUntouched();
            vm.changePasswordForm.$setPristine();

        }
    };

    vm.login = function () {
        if (vm.loginForm.$invalid) {
            angular.forEach(vm.loginForm.$error.required, function (field) {
                field.$setTouched();
            });
        } else {
            LoginService.validateUser(vm.credentials, vm.currentIpAddress).then(function () {
                vm.showLoginError = false;
                vm.credentials = {};
                $state.go('home');
            }).catch(function (error) {
                vm.showLoginError = true;
                vm.loginError = error;
            });
        }
    };

    vm.logout = function () {
        LoginService.logout(vm.currentUser.userId).then(function () {
            vm.logedUser = false;
            vm.currentUser = undefined;
            sessionSchedule.stop();
            $state.go('login')
        });
        vm.showChangePassSuccess = false;
        vm.showChangePassError = true;
    };

    $rootScope.$watch('currentUser', function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
            vm.logedUser = true;
            vm.currentUser = newVal;
            sessionSchedule.init(vm.currentUser.userId);
            Idle.watch();
        }
    });
});