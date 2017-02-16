angular.module('mpos').controller('comercesCtrl', function ($state) {
    let vm = this;

    vm.sendComerce = () => {
        if (vm.comercesForm.$invalid) {
            angular.forEach(vm.comercesForm.$error.required, field => {
                field.$setDirty();
                field.$setTouched();
            });
        }
    };

    vm.showAllComereces = () => {
        $state.transitionTo('comerces.list');
    };

    vm.showConectionError = false;
    vm.test = ()=> {
        vm.showConectionError = true;
    }
});