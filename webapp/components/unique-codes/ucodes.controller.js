(function () {
    angular.module('mpos').controller('uniqueCodeCtrl', uniqueCodeCtrl);

    function uniqueCodeCtrl($state, UniqueCodeService, $log) {
        var vm = this;


        vm.showConectionError = false;


        function findUcCommerce(uniqueCode){
            if(vm.comerceForm.ucode.$invalid){
                vm.comerceForm.ucode.$setTouched();
            }else{
                console.log(uniqueCode);
                UniqueCodeService.findUcCommerce(uniqueCode);
            }
        }

        function getPageList(page) {
            UniqueCodeService.findPage(page).then(function (ucCommerces) {
                vm.ucCommerces = ucCommerces;
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