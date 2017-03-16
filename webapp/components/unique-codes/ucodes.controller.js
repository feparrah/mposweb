(function () {
    angular.module('mpos').controller('uniqueCodeCtrl', uniqueCodeCtrl);

    function uniqueCodeCtrl($state, UniqueCodeService, $log, UcCommerce, BusinessTypeService, BusinessType) {
        var vm = this;


        vm.showConectionError = false;
        vm.businessTypes = [];
        vm.commerceFound = false;
        vm.showCommerceNotFound = false;
        vm.showSuccessMessage = false;
        vm.comerce = new UcCommerce();
        BusinessTypeService.findAllBusinessTypes().then(function (list) {

            list.forEach(function (data) {
                var businessType = new BusinessType();
                businessType.setBusinessTypeId(data.businessType.businessTypeId);
                businessType.setBusinessName(data.businessType.businessName);
                vm.businessTypes.push(businessType);
            });
        });


        function sendUcCommerce() {
            if (vm.comerceForm.$invalid) {
                angular.forEach(vm.comerceForm.$error.required, function (field) {
                    field.$setDirty();
                });
            }else{
                if(vm.commerceFound){
                    UniqueCodeService.updateUcCommerce(vm.comerce.updateBody(), vm.comerce.ucId).then(function () {
                        successSend();
                    });
                }else {
                    UniqueCodeService.createUcCommerce(vm.comerce.createBody()).then(function () {
                        successSend();
                    });
                }
            }
            function successSend(){
                vm.showSuccessMessage = true;
                resetForm();
            }
        }
        
        function findUcCommerce(uniqueCode){
            vm.showSuccessMessage = false;
            if(vm.comerceForm.ucode.$invalid){
                vm.comerceForm.ucode.$setTouched();
            }else{
                UniqueCodeService.findUcCommerce(uniqueCode).then(function (data) {
                    vm.comerce = new UcCommerce();
                    vm.comerce.setUniqueCode(uniqueCode, false);
                    vm.comerce.setData(
                        data.address,
                        data.cityName,
                        data.contactName,
                        data.countryName,
                        data.email,
                        data.businessName,
                        data.nit,
                        data.stateId,
                        data.telephoneContact,
                        data.ucId
                    );
                    if(vm.comerce.ucId != ''){
                        vm.commerceFound = true;
                        vm.showCommerceNotFound = false;
                    }else{
                        vm.commerceFound = false;
                        vm.showCommerceNotFound = true;
                        resetForm();
                    }
                }).catch(function (error) {
                    $log.error(error);
                });
            }
        }

        function setUcCommerces(list){
            vm.ucCommerces = [];
            angular.forEach(list, function (data) {
                var ucCommerce = new UcCommerce();
                ucCommerce.setUniqueCode(data.ucCommerce.uniqueCode, true);
                ucCommerce.setData(
                    data.ucCommerce.address,
                    data.ucCommerce.cityName,
                    data.ucCommerce.contactName,
                    data.ucCommerce.countryName,
                    data.ucCommerce.email,
                    data.ucCommerce.name,
                    data.ucCommerce.nit,
                    data.ucCommerce.stateId,
                    data.ucCommerce.telephoneContact,
                    data.ucCommerce.ucId
                );
                vm.ucCommerces.push(ucCommerce);
            })
        }

        function getPageList(page) {
            UniqueCodeService.findPage(page).then(function (list) {
                setUcCommerces(list);
                vm.page = page;
            });
        }

        function nextPage() {
            UniqueCodeService.findPage(vm.page + 1).then(function (list) {
                setUcCommerces(list);
                vm.page++;
            });
        }

        function previousPage() {
            UniqueCodeService.findPage(vm.page - 1).then(function (list) {
                setUcCommerces(list);
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
            });
        }


        function resetForm(){
            vm.comerce = new UcCommerce();
            vm.comerceForm.$setUntouched();
            vm.comerceForm.$setPristine();
            vm.commerceFound = false;
        }

        vm.findUcCommerce = findUcCommerce;
        vm.getPageList = getPageList;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.findAllUcodes = findAllUcodes;
        vm.sendUcCommerce = sendUcCommerce;
        vm.resetForm = resetForm;
    }
})();