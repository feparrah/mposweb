(function () {
    angular.module('mpos').provider('netcomEnvironment', netcomEnvironment);

    function netcomEnvironment() {
        var environment;
        this.setEnvironment = function (env) {
            environment = env;
        };

        this.$get = ['$http', function ($http) {
            return $http.get('/Config/restApi.json').then(function (response) {
                return response.data[environment];
            });
        }];
    }
})();