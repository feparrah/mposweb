angular.module('mpos').controller('comerceUsersCtrl', function () {
    let vm = this;
    vm.showConectionError = false;
    vm.test = ()=> {
        vm.showConectionError = true;
    }
});