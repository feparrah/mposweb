angular.module('mpos').controller('terminalsCtrl', function ($state) {
    var vm = this;

    vm.showAllTerminals = function(){
        $state.transitionTo('terminals.list');
    }

    vm.showConectionError = false;
    vm.test = function() {
        vm.showConectionError = true;
    }
});