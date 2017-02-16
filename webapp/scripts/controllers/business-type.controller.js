angular.module('mpos').controller('businessTypeCtrl', function () {
    let vm = this;
    vm.showConectionError = false;
    vm.test = ()=> {
        vm.showConectionError = true;
    }
});