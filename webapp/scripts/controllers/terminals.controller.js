angular.module('mpos').controller('terminalsCtrl', function ($state) {
    let vm = this;

    vm.showAllTerminals = ()=>{
        $state.transitionTo('terminals.list');
    }

    vm.showConectionError = false;
    vm.test = ()=> {
        vm.showConectionError = true;
    }
});