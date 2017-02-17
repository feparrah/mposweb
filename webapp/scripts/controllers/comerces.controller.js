angular.module('mpos').controller('comercesCtrl', function ($state) {
    var vm = this;
    vm.showConectionError = false;
    vm.test = function(){
        console.log('asdsd');
        vm.showConectionError = true;
    };

    vm.sendComerce = function(){
        if (vm.comercesForm.$invalid) {
            angular.forEach(vm.comercesForm.$error.required, function(field) {
                field.$setDirty();
                field.$setTouched();
            });
        }
    };

    vm.showAllComereces = function(){
        $state.transitionTo('comerces.list');
    };


});