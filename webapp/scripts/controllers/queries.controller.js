angular.module('mpos').controller('queriesCtrl', function($state ,$scope){
    let vm = this;
    vm.currentTime = new Date();
    vm.queryType = 1;

    vm.showConectionError = false;
    vm.test = ()=> {
        vm.showConectionError = true;
    }

});