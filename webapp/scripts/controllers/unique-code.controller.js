angular.module('mpos').controller('uniqueCodeCtrl', function ($state) {
    var vm = this;

    vm.showAllUcodes = function() {
       $state.transitionTo('ucode.list');
    }

    vm.showConectionError = false;
    vm.test = function(){
        vm.showConectionError = true;
    }
});