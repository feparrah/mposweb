angular.module('mpos').controller('comerceUsersCtrl', function (UserService) {
    var vm = this;
    vm.showConectionError = false;
    vm.test = function(){
        vm.showConectionError = true;
    }



    vm.findUser = function (id) {
        UserService.findUser(id);
    }
});