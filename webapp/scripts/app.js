angular.module('mpos', ['ui.router', 'pascalprecht.translate', 'ngMessages', 'ngResource', 'ngCookies', 'base64']);
let config = ($stateProvider, $urlRouterProvider, $translateProvider) => {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login.view.html'
    });

    $stateProvider.state('recoverypass', {
        url: '/recuperarpass',
        templateUrl: 'views/recoverypass.view.html'
    });

    $stateProvider.state('changepass', {
        url: '/cambiopass',
        templateUrl: 'views/changepass.view.html'
    });

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.view.html'
    });

    $stateProvider.state('comerces', {
        abstract: true,
        url: '/comercios',
        template: '<div ui-view/>',
        controller: 'comercesCtrl',
        controllerAs: 'vm'
    }).state('comerces.form', {
        url: '/comerciosnit',
        templateUrl: 'views/comerces.view.html',
    }).state('comerces.list', {
        url: '/listacomercios',
        templateUrl: 'views/allcomerces.view.html'
    });

    $stateProvider.state('ucode', {
        url: '/codigounico',
        template: '<div ui-view/>',
        controller: 'uniqueCodeCtrl',
        controllerAs: 'vm'
    }).state('ucode.form', {
        url: '/formulario',
        templateUrl: 'views/ucode.view.html'
    }).state('ucode.list', {
        url: '/lista',
        templateUrl: 'views/allucodes.view.html'
    });

    $stateProvider.state('terminals', {
        url: '/terminales',
        template: '<div ui-view=""/>',
        controller: 'terminalsCtrl',
        controllerAs: 'vm'
    }).state('terminals.form', {
        url: '/form',
        templateUrl: 'views/terminals.view.html'
    }).state('terminals.list', {
        url: '/lista',
        templateUrl: 'views/allterminals.html'
    });

    $stateProvider.state('ausers', {
        url: '/usuariosadm',
        template : '<div ui-view/>',
        controller: 'adminUsersCtrl',
        controllerAs: 'vm'
    }).state('ausers.form',{
        url : '/formulario',
        templateUrl: 'views/ausers.view.html'
    }).state('ausers.list',{
        url : '/lista',
        templateUrl : 'views/allausers.view.html'
    });

    $stateProvider.state('cusers', {
        url: '/usuarioscomercios',
        templateUrl: 'views/cusers.view.html',
        controller: 'comerceUsersCtrl',
        controllerAs: 'vm'
    });

    $stateProvider.state('queries', {
        url: '/consultas',
        templateUrl: 'views/queries.view.html',
        controller : 'queriesCtrl',
        controllerAs : 'vm'

    });

    $stateProvider.state('businesstypes', {
        url: '/tiposnegocio',
        templateUrl: 'views/businesstype.view.html',
        controller : 'businessTypeCtrl',
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
                    if (toState.name !== 'recoverypass') {
                        $state.go('login');
                        event.preventDefault();
                    }
                }
            }
        });
};

angular.module('mpos').config(config);
angular.module('mpos').run(run);