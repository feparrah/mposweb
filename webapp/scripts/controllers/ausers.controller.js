angular.module('mpos').controller('adminUsersCtrl', function ($state) {
   var vm = this;

    vm.showAllAusers = function(){
        $state.transitionTo('ausers.list');
    }

    vm.showConectionError = false;
    vm.test = function(){
        vm.showConectionError = true;
    }
});