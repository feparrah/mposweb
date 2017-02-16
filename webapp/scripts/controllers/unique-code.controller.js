angular.module('mpos').controller('uniqueCodeCtrl', function ($state) {
    let vm = this;

    vm.showAllUcodes = () => {
       $state.transitionTo('ucode.list');
    }

    vm.showConectionError = false;
    vm.test = ()=> {
        vm.showConectionError = true;
    }
});