angular.module('mpos').controller('adminUsersCtrl', function ($state) {
    let vm = this;

    vm.showAllAusers = ()=>{
        $state.transitionTo('ausers.list');
    }
});