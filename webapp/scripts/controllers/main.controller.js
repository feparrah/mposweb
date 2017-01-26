
angular.module('mpos').controller('mainCtrl', function (LoginService, $state , $scope , $rootScope) {
    let vm = this;
    vm.showLoginError = false;
    vm.logedUser = false;

    vm.login = ()=>{
        if(vm.loginForm.$invalid){
            angular.forEach(vm.loginForm.$error.required, (field)=>{
                field.$setTouched();
            });
        }else {
            LoginService.validateUser(vm.credentials).then(()=>{
                console.log('asd');
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
    };

    $rootScope.$watch('currentUser', (newVal , oldVal)=> {
        if(typeof newVal !== 'undefined'){
            vm.logedUser = true;
            vm.currentUser = newVal;
        }
    });
});