(function () {

    angular.module('mpos').controller('comercesCtrl', commercesCtrl);

    function commercesCtrl($state, ComercesService, $log, Commerce) {
        var vm = this;
        vm.showConectionError = false;
        vm.commerceFound = false;
        vm.showCommerceNotFound = false;
        vm.showSuccessMessage = false;
        vm.comerce = new Commerce();

        function findComerce(nit) {
            vm.showSuccessMessage = false;
            if (vm.comercesForm.nit.$valid) {

                ComercesService.findComerce(vm.comerce.nit).then(function (data) {
                    vm.comerce.setNit(nit, false);
                    vm.comerce.setData(
                        data.address,
                        data.businessName,
                        data.city,
                        data.cityCode,
                        data.contactName,
                        data.country,
                        data.nitId,
                        data.stateId,
                        data.telephoneContact
                    );
                    vm.commerceFound = true;
                    vm.showCommerceNotFound = false;
                }).catch(function (error) {

                    vm.commerceFound = false;
                    vm.showCommerceNotFound = true;
                    resetForm();
                });
            }
        }

        function sendComerce() {
            if (vm.comercesForm.$invalid) {
                angular.forEach(vm.comercesForm.$error.required, function (field) {
                    field.$setDirty();
                    field.$setTouched();
                });
            } else {
                if (!vm.commerceFound) {
                    ComercesService.createCommerce(vm.comerce.createBody()).then(function () {
                        successSend();
                    });
                } else {
                    ComercesService.updateCommerce(vm.comerce.updateBody(), vm.comerce.nitId).then(function () {
                        successSend();
                    });
                }
            }
            function successSend(){
                vm.showSuccessMessage = true;
                resetForm();
            }
        }

        function setCommercesList(listData){
            vm.comercesList = [];
            listData.forEach(function (data) {
                var commerce = new Commerce();
                commerce.setNit(data.nitCommerce.nit, true);
                commerce.setData(
                    data.nitCommerce.address,
                    data.nitCommerce.businessName,
                    data.nitCommerce.cityName,
                    '',
                    data.nitCommerce.contactName,
                    data.nitCommerce.countryName,
                    data.nitCommerce.nitId,
                    data.nitCommerce.stateId,
                    data.nitCommerce.telephoneContact);
                vm.comercesList.push(commerce);
            });
        }

        function getPageList(page) {
            ComercesService.findPage(page).then(function (list) {
                setCommercesList(list);
                vm.page = page;
            });
        }

        function nextPage() {
            ComercesService.findPage(vm.page + 1).then(function (list) {
                setCommercesList(list);
                vm.page++;
            });
        }

        function previousPage() {
            ComercesService.findPage(vm.page - 1).then(function (list) {
                setCommercesList(list);
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

        function resetForm(){
            vm.comerce = new Commerce();
            vm.comercesForm.$setUntouched();
            vm.comercesForm.$setPristine();
            vm.commerceFound = false;
        }


        vm.sendComerce = sendComerce;
        vm.findComerce = findComerce;
        vm.getPageList = getPageList;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.showAllComerces = showAllComerces;
        vm.resetForm = resetForm;
    }
})();
