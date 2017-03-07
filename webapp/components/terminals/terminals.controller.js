angular.module('mpos').controller('terminalsCtrl', function ($state, TerminalsService) {
    var vm = this;

    function getPageList(pageNumber) {
        TerminalsService.findPage(pageNumber).then(function (terminals) {
            vm.terminals = terminals;
            vm.page = pageNumber;
        });
    }

    function findAllTerminals() {
        TerminalsService.countPages().then(function (pages) {
            vm.pages = [];
            for (var i = 1; i <= pages; i++) {
                vm.pages.push(i);
            }
            vm.page = 1;
            vm.getPageList(vm.page);
        })
    }

    function nextPage() {
        TerminalsService.findPage(vm.page + 1).then(function (list) {
            vm.terminals = list;
            vm.page++;
        });
    }

    function previousPage() {
        TerminalsService.findPage(vm.page - 1).then(function (list) {
            vm.terminals = list;
            vm.page--;
        });
    }

    function findTerminal(terminalCode){
        if(vm.terminalForm.terminal.$valid){
            TerminalsService.findTerminal(terminalCode);
        }
    }

    vm.showConectionError = false;
    vm.findAllTerminals = findAllTerminals;
    vm.getPageList = getPageList;
    vm.nextPage = nextPage;
    vm.previousPage = previousPage;
    vm.findTerminal = findTerminal;



});