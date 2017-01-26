angular.module('mpos', ['ui.router', 'pascalprecht.translate', 'ngMessages', 'ngResource', 'ngCookies', 'base64']);
let config = ($stateProvider, $urlRouterProvider, $translateProvider) => {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login.view.html'
    });

    $stateProvider.state('recoverypass',{
        url : '/recuperarpass',
        templateUrl : 'views/recoverypass.view.html'
    });

    $stateProvider.state('changepass',{
        url : '/cambiopass',
        templateUrl : 'views/changepass.view.html'
    });

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.view.html'
    });

    $stateProvider.state('comerces', {
        url: '/comerciosnit',
        templateUrl: 'views/comerces.view.html',
        controller: 'comercesCtrl',
        controllerAs: 'vm'
    });

    $stateProvider.state('ucode', {
        url: '/codigounico',
        templateUrl : 'views/ucode.view.html',
        controller : 'uniqueCodeCtrl',
        controllerAs : 'vm'
    });

    $stateProvider.state('terminals', {
        url : '/terminales',
        templateUrl : 'views/terminals.view.html',
        controller : 'terminalsCtrl',
        controllerAs : 'vm'
    });

    $stateProvider.state('ausers', {
        url : '/usuariosadm',
        templateUrl : 'views/ausers.view.html',
        controller : 'adminUsersCtrl',
        controllerAs : 'vm'
    });

    $stateProvider.state('cusers',{
        url : '/usuarioscomercios',
        templateUrl : 'views/cusers.view.html',
        controller : 'comerceUsersCtrl',
        controllerAs : 'vm'
    });


    $urlRouterProvider.otherwise("/home");

    $translateProvider.useStaticFilesLoader({
        prefix: 'config/Language_',
        suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
    $translateProvider.preferredLanguage('es');
};
let run = ($rootScope, $cookieStore, $state) => {
    $rootScope.currentUser = $cookieStore.get('jd_session');
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams, options) {
            if (!$rootScope.currentUser) {
                if (toState.name !== 'login') {
                    if(toState.name !== 'recoverypass'){
                        $state.go('login');
                        event.preventDefault();
                    }
                }
            }
        });
};

angular.module('mpos').config(config);
angular.module('mpos').run(run);