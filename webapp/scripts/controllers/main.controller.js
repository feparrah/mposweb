
angular.module('mpos').controller('mainCtrl', function (LoginService, $state , $scope , $rootScope , $http) {
    let vm = this;
    $http.get('https://jsonip.com/').then(response =>{
        vm.currentIpAddress = response.data.ip;
    });


    vm.showLoginError = false;
    vm.logedUser = false;

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
        console.log(vm.currentUser.userId);
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