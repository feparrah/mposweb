(function () {
    angular.module('mpos').controller('uniqueCodeCtrl', uniqueCodeCtrl);

    function uniqueCodeCtrl($state, UniqueCodeService, $log) {
        var vm = this;


        vm.showConectionError = false;


        function findUcCommerce(uniqueCode){
            if(vm.comerceForm.ucode.$invalid){
                vm.comerceForm.ucode.$setTouched();
            }else{
                UniqueCodeService.findUcCommerce(uniqueCode).then(function (ucCommerce) {
                    vm.comerce = ucCommerce;
                    vm.disableAddress = vm.comerce.address !== '';
                    vm.disableCityName = vm.comerce.cityName !== '';
                    vm.disableContactName = vm.comerce.contactName !== '';
                    vm.disableCountryName = vm.comerce.countryName !== '';
                    vm.disableEmail = vm.comerce.email !== '';
                    vm.disableName = vm.comerce.name !== '';
                    vm.disableNit = vm.comerce.nit !== '';
                    vm.disableTelephoneContact = vm.comerce.telephoneContact !== '';
                    vm.disableUniqueCode = vm.comerce.uniqueCode !== '';

                });
            }
        }

        function getPageList(page) {
            UniqueCodeService.findPage(page).then(function (ucCommerces) {
                vm.ucCommerces = ucCommerces;
                vm.page = page;
            });
        }

        function nextPage() {
            UniqueCodeService.findPage(vm.page + 1).then(function (list) {
                vm.comercesList = list;
                vm.page++;
            });
        }

        function previousPage() {
            UniqueCodeService.findPage(vm.page - 1).then(function (list) {
                vm.comercesList = list;
                vm.page--;
            });
        }

        function findAllUcodes() {
            UniqueCodeService.countPages().then(function (pages) {
                vm.pages = [];
                for (var i = 1; i <= pages; i++) {
                    vm.pages.push(i);
                }
                vm.page = 1;
                vm.getPageList(vm.page);
            }).catch(function (error) {
                $log.error(error);
            });
        }


        vm.findUcCommerce = findUcCommerce;
        vm.getPageList = getPageList;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.findAllUcodes = findAllUcodes;
    }
})();