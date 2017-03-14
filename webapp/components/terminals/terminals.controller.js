angular.module('mpos').controller('terminalsCtrl', function ($state, TerminalsService, Terminal, $log, BusinessTypeService, BusinessType) {
    var vm = this;

    vm.businessTypes = [];
    vm.terminal = new Terminal();
    BusinessTypeService.findAllBusinessTypes().then(function (list) {

        list.forEach(function (data) {
            var businessType = new BusinessType();
            businessType.setBusinessTypeId(data.businessType.businessTypeId);
            businessType.setBusinessName(data.businessType.businessName);
            vm.businessTypes.push(businessType);
        });
    });


    function sendTerminal(){
        if (vm.terminalForm.$invalid) {
            angular.forEach(vm.terminalForm.$error.required, function (field) {
                field.$setTouched();
            });
        }else{
            TerminalsService.createTerminal(vm.terminal.createBody()).then(function (success) {
                $log.info(success);
            }).catch(function (error) {
                $log.error(error);
            });
        }
    }

    function getPageList(pageNumber) {
        TerminalsService.findPage(pageNumber).then(function (list) {
            vm.terminals = [];
            list.forEach(function (tData) {
                var terminal = new Terminal();
                terminal.setCode(tData.terminal.terminalCode, true);
                terminal.setData(
                    tData.terminal.address,
                    tData.terminal.businessType,
                    tData.terminal.cityName,
                    tData.terminal.commerceName,
                    tData.terminal.countryName,
                    tData.terminal.email,
                    tData.terminal.imei,
                    tData.terminal.license,
                    tData.terminal.stateId,
                    tData.terminal.telephoneNumber,
                    tData.terminal.terminalId
                );
                vm.terminals.push(terminal);
            });
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
            TerminalsService.findTerminal(terminalCode).then(function (data) {
                console.log(data);
                vm.terminal = new Terminal();
                vm.terminal.setCode(terminalCode, false);
            }).catch(function (error) {
                $log.info(error);
            });
        }
    }

    vm.showConectionError = false;
    vm.findAllTerminals = findAllTerminals;
    vm.getPageList = getPageList;
    vm.nextPage = nextPage;
    vm.previousPage = previousPage;
    vm.findTerminal = findTerminal;
    vm.sendTerminal = sendTerminal;



});