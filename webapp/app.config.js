(function () {

    angular.module('mpos').config(config);

    config.$inject = ['$stateProvider','$urlRouterProvider','$translateProvider','netcomEnvironmentProvider','$logProvider','sessionScheduleProvider'];

    function config($stateProvider, $urlRouterProvider, $translateProvider, netcomEnvironmentProvider,$logProvider,sessionScheduleProvider) {

        netcomEnvironmentProvider.setEnvironment('dev');
        $logProvider.debugEnabled(true);
        sessionScheduleProvider.setRefreshSessionTime(2);

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'components/authentication/login.html'
        });

        $stateProvider.state('recoverypass', {
            url: '/recuperarpass',
            templateUrl: 'components/authentication/recovery-password.html'
        });

        $stateProvider.state('changepass', {
            url: '/cambiopass',
            templateUrl: 'components/authentication/change-password.html'
        });

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'components/home/home.html'
        });

        $stateProvider.state('comerces', {
            abstract: true,
            url: '/comercios',
            template: '<div ui-view/>',
            controller: 'comercesCtrl',
            controllerAs: 'vm'
        }).state('comerces.form', {
            url: '/comerciosnit',
            templateUrl: 'components/comerces/comerces.html',
        }).state('comerces.list', {
            url: '/listacomercios',
            templateUrl: 'components/comerces/comerces-list.html'
        });

        $stateProvider.state('ucode', {
            url: '/codigounico',
            template: '<div ui-view/>',
            controller: 'uniqueCodeCtrl',
            controllerAs: 'vm'
        }).state('ucode.form', {
            url: '/formulario',
            templateUrl: 'components/unique-codes/ucodes.html'
        }).state('ucode.list', {
            url: '/lista',
            templateUrl: 'components/unique-codes/ucodes-list.html'
        });

        $stateProvider.state('terminals', {
            url: '/terminales',
            template: '<div ui-view=""/>',
            controller: 'terminalsCtrl',
            controllerAs: 'vm'
        }).state('terminals.form', {
            url: '/form',
            templateUrl: 'components/terminals/terminals.html'
        }).state('terminals.list', {
            url: '/lista',
            templateUrl: 'components/terminals/terminals-list.html'
        });

        $stateProvider.state('ausers', {
            url: '/usuariosadm',
            template: '<div ui-view/>',
            controller: 'adminUsersCtrl',
            controllerAs: 'vm'
        }).state('ausers.form', {
            url: '/formulario',
            templateUrl: 'components/admin-users/ausers.html'
        }).state('ausers.list', {
            url: '/lista',
            templateUrl: 'components/admin-users/ausers-list.html'
        });

        $stateProvider.state('cusers', {
            url: '/usuarioscomercios',
            templateUrl: 'components/comerce-users/cusers.html',
            controller: 'comerceUsersCtrl',
            controllerAs: 'vm'
        });

        $stateProvider.state('queries', {
            url: '/consultas',
            templateUrl: 'components/queries/queries.html',
            controller: 'queriesCtrl',
            controllerAs: 'vm'

        });

        $stateProvider.state('businesstypes', {
            url: '/tiposnegocio',
            templateUrl: 'components/business-types/business-type.html',
            controller: 'businessTypeCtrl',
            controllerAs: 'vm'
        });


        $urlRouterProvider.otherwise("/home");

        $translateProvider.useStaticFilesLoader({
            prefix: 'config/Language_',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
        $translateProvider.preferredLanguage('es');
    }

})();