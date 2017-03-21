angular.module('mpos').controller('terminalsCtrl', function ($state, TerminalsService, Terminal, $log, BusinessTypeService, BusinessType, $base64) {
    var vm = this;

    vm.businessTypes = [];
    vm.terminalFound = false;
    vm.showTerminalNotFound = false;
    vm.showSuccessMessage = false;
    vm.terminal = new Terminal();
    BusinessTypeService.findAllBusinessTypes().then(function (list) {

        list.forEach(function (data) {
            var businessType = new BusinessType();
            businessType.setBusinessTypeId(data.businessType.businessTypeId);
            businessType.setBusinessName(data.businessType.businessName);
            vm.businessTypes.push(businessType);
        });
    });


    function sendTerminal() {
        if (vm.terminalForm.$invalid) {
            console.log('invalid', vm.terminalForm);
            angular.forEach(vm.terminalForm.$error.required, function (field) {
                field.$setTouched();
            });
        } else {

            if (!vm.terminalFound) {
                TerminalsService.createTerminal(vm.terminal.createBody()).then(function (success) {
                    successSend();
                });
            }else{
                TerminalsService.updateTerminal(vm.terminal.updateBody(), vm.terminal.terminalId).then(function (success) {
                    successSend();
                });
            }
            function successSend(){
                vm.showSuccessMessage = true;
                resetForm();
            }
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
                    tData.terminal.terminalId,
                    ""
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

    function findTerminal(terminalCode) {
        vm.showSuccessMessage = false;
        if (vm.terminalForm.terminal.$valid) {
            TerminalsService.findTerminal(terminalCode).then(function (data) {
                console.log(data);
                vm.terminal = new Terminal();
                vm.terminal.setCode(terminalCode, false);
                var bt;
                vm.businessTypes.forEach(function (item) {
                    if ($base64.decode(data.businessType) === item.businessTypeId) {
                        bt = item;
                    }
                });
                vm.terminal.setData(
                    data.address,
                    bt,
                    data.cityName,
                    data.businessName,
                    data.countryName,
                    data.email,
                    data.imei,
                    data.license,
                    data.stateId,
                    data.cellphoneNumber,
                    data.terminalId,
                    data.uniqueCode
                );
                if (vm.terminal.terminalId != '') {
                    vm.terminalFound = true;
                    vm.showTerminalNotFound = false;
                } else {
                    vm.terminalFound = false;
                    vm.showTerminalNotFound = true;
                    resetForm();
                }
            }).catch(function (error) {
                $log.info(error);

            });
        }
    }

    function resetForm() {
        vm.terminal = new Terminal();
        vm.terminalForm.$setUntouched();
        vm.terminalForm.$setPristine();
        vm.terminalFound = false;
    }

    vm.showConectionError = false;
    vm.findAllTerminals = findAllTerminals;
    vm.getPageList = getPageList;
    vm.nextPage = nextPage;
    vm.previousPage = previousPage;
    vm.findTerminal = findTerminal;
    vm.sendTerminal = sendTerminal;
    vm.resetForm = resetForm;


});