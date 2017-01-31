angular.module('mpos').service('restApis', function ($http, $q) {
    this.getApis = function () {
        let def = $q.defer();
        $http.get('config/restApi.json').then(response => {
            def.resolve(response.data);
        });
        return def.promise;
    }
});