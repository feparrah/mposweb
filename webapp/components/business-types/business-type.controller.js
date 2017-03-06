angular.module('mpos').controller('businessTypeCtrl', function () {
    var vm = this;
    vm.showConectionError = false;
    vm.test = function(){
        vm.showConectionError = true;
    }
});