(function () {

    angular.module('mpos').run(run);

    run.$inject = ['$rootScope','$cookieStore','$state'];

    function run($rootScope, $cookieStore, $state) {
        $rootScope.currentUser = $cookieStore.get('jd_session');
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, options) {
                if (!$rootScope.currentUser) {
                    if (toState.name !== 'login') {
                        if (toState.name !== 'recoverypass') {
                            $state.go('login');
                            event.preventDefault();
                        }
                    }
                }
            });
    }
})();