angular.module('mpos').controller('comerceUsersCtrl', function () {
    var vm = this;
    vm.showConectionError = false;
    vm.test = function(){
        vm.showConectionError = true;
    }
});