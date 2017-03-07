(function () {

    angular.module('mpos').controller('comercesCtrl', commercesCtrl);

    function commercesCtrl($state, ComercesService, $log) {
        var vm = this;
        vm.showConectionError = false;
        vm.commerceFound = false;

        function findComerce(nit) {
            if (vm.comercesForm.nit.$invalid) {
                vm.comercesform.nit.$setTouched();
            } else {
                ComercesService.findComerce(nit).then(function (comerce) {
                    vm.comerce = comerce;
                    vm.disableNit = true;
                    vm.disableBusinessName = comerce.businessName !== '';
                    vm.disableAddress = comerce.address !== '';
                    vm.disableCity = comerce.city !== '';
                    vm.diableCountry = comerce.country !== '';
                    vm.disableContactName = comerce.contactName !== '';
                    vm.disableTelephoneContact = comerce.telephoneContact !== '';
                    vm.commerceFound = true;
                }).catch(function (error) {
                    vm.commerceFound = false;
                    $log.info(error);
                });
            }
        }

        vm.sendComerce = function () {
            if (vm.comercesForm.$invalid) {
                angular.forEach(vm.comercesForm.$error.required, function (field) {
                    field.$setDirty();
                    field.$setTouched();
                });
            } else {
                if (vm.commerceFound) {
                    ComercesService.updateCommerce(vm.comerce).then().catch(function (error) {
                        $log.error(error);
                    });
                } else {
                    ComercesService.createCommerce(vm.comerce).then().catch(function (error) {
                        $log.error(error);
                    });
                }
            }
        };

        function getPageList(page) {
            ComercesService.findPage(page).then(function (list) {
                vm.comercesList = list;
                vm.page = page;
            });
        }

        function nextPage() {
            ComercesService.findPage(vm.page + 1).then(function (list) {
                vm.comercesList = list;
                vm.page++;
            });
        }

        function previousPage() {
            ComercesService.findPage(vm.page - 1).then(function (list) {
                vm.comercesList = list;
                vm.page--;
            });
        }

        function showAllComerces() {
            ComercesService.countPages().then(function (pages) {
                vm.pages = [];
                for (var i = 1; i <= pages; i++) {
                    vm.pages.push(i);
                }
                vm.page = 1;
                vm.getPageList(vm.page);
            });
        }


        vm.findComerce = findComerce;
        vm.getPageList = getPageList;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.showAllComerces = showAllComerces;
    }
})();
