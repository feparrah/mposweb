angular.module('mpos').service('restApis', function ($http, $q) {
    this.getApis = function () {
        var def = $q.defer();
        $http.get('config/restApi.json').then(function(response){
            def.resolve(response.data);
        });
        return def.promise;
    }
});