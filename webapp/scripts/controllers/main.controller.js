
angular.module('mpos').controller('mainCtrl', function (LoginService, $state) {
    let vm = this;
    vm.showLoginError = false;
    vm.login = ()=>{
        if(vm.loginForm.$invalid){
            angular.forEach(vm.loginForm.$error.required, (field)=>{
                field.$setTouched();
            });
        }else {
            LoginService.validateUser(vm.credentials).then(()=>{
                $state.go('home');
            }).catch(error => {
                vm.showLoginError = true;
            });
        }
    };
});