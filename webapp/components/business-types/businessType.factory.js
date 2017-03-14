(function () {
    angular.module('mpos').factory('BusinessType', BusinessTypeFactory);

    function BusinessTypeFactory($base64){
        function BusinessType(){}

        BusinessType.prototype.setBusinessTypeId = function (businessTypeId) {
            this.businessTypeId = $base64.decode(businessTypeId);
        };

        BusinessType.prototype.setBusinessName =  function (businessName) {
            this.businessName = $base64.decode(businessName);
        };

        return BusinessType;
    }
})();