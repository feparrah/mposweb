let loginService = function ($resource, $log, $q, $rootScope, $cookieStore) {
    this.validateUser = credentials => {
        let def = $q.defer();
        if (credentials.username == 'andres' && credentials.password == '123') {
            let user = {
                name: 'Andres'
            };
            $rootScope.currentUser = user;
            $cookieStore.put('jd_session', $rootScope.currentUser);
            def.resolve();
        } else {
            def.reject();
        }
        return def.promise;
    };

};


loginService.$inject = ['$resource', '$log', '$q', '$rootScope', '$cookieStore'];
angular.module('mpos').service('LoginService', loginService);