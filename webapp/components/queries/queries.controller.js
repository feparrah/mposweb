(function () {
    angular.module('mpos').controller('queriesCtrl', queriesCtrl);


    queriesCtrl.$inject = [];

    function queriesCtrl(){
        var vm = this;
        vm.currentTime = new Date();
        vm.queryType = 1;
        vm.format = 'yyyy/MM/dd';
        vm.dateOptions = {
            showWeeks : false
        };

        vm.queryOption = '1';

        vm.openPopupSD = function () {
            vm.openedSD = true;
        };

        vm.openedSD = false;

        vm.openPopupED = function () {
            vm.openedED = true;
        };

        vm.openedED = false;

        vm.showConectionError = false;
        vm.test = function() {
            vm.showConectionError = true;
        }

    }
})();