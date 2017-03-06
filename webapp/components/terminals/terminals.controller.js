angular.module('mpos').controller('terminalsCtrl', function ($state, TerminalsService) {
    var vm = this;

    function findAllTerminals() {
        TerminalsService.countPages().then(function (pages) {
            console.log(pages);
        })
    }

    vm.showConectionError = false;
    vm.findAllTerminals = findAllTerminals;



});