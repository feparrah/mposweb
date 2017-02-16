
angular.module('mpos').controller('mainCtrl', function (LoginService, $state , $scope , $rootScope , $http) {
    let vm = this;
    $http.get('https://jsonip.com/').then(response =>{
        vm.currentIpAddress = response.data.ip;
    });

     console.log(vm.sss);


    vm.showLoginError = false;
    vm.logedUser = false;
    vm.showChangePassError = false;
    vm.showChangePassSuccess = false;


    vm.changePass = ()=>{
        if(vm.changePasswordForm.$invalid){
            angular.forEach(vm.changePasswordForm.$error.required, field => {
                field.$setDirty();
                field.$setTouched();
            });
        }else {
            LoginService.changePassword(vm.currentUser.userId, vm.cp.currentpass, vm.cp.newpass, vm.cp.newpass2)
                .then(success => {
                    vm.changePassResponse = success;
                    vm.showChangePassError = false;
                    vm.showChangePassSuccess = true;
                })
                .catch(error => {
                    vm.changePassResponse = error;
                    vm.showChangePassSuccess = false;
                    vm.showChangePassError = true;
                });
            vm.cp = {};
            vm.changePasswordForm.$setUntouched();
            vm.changePasswordForm.$setPristine();

        }
    };

    vm.login = ()=>{
        if(vm.loginForm.$invalid){
            angular.forEach(vm.loginForm.$error.required, (field)=>{
                field.$setTouched();
            });
        }else {
            LoginService.validateUser(vm.credentials).then(()=>{
                vm.showLoginError = false;
                vm.credentials = {};
                $state.go('home');
            }).catch(error => {
                vm.showLoginError = true;
                vm.loginError = error;
            });
        }
    };

    vm.logout = ()=>{
        LoginService.logout(vm.currentUser.userId).then(()=>{
            vm.logedUser = false;
            vm.currentUser = undefined;
            $state.go('login')
        });
        vm.showChangePassSuccess = false;
        vm.showChangePassError = true;
    };

    $rootScope.$watch('currentUser', (newVal , oldVal)=> {
        if(typeof newVal !== 'undefined'){
            vm.logedUser = true;
            vm.currentUser = newVal;
        }
    });
});