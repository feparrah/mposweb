angular.module('mpos').controller('queriesCtrl', function($state ,$scope){
    var vm = this;
    vm.currentTime = new Date();
    vm.queryType = 1;

    vm.showConectionError = false;
    vm.test = function() {
        vm.showConectionError = true;
    }

});