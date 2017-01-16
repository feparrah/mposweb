angular.module('mpos',['ui.router','pascalprecht.translate','ngMessages','ngResource','ngCookies']);
let config = ($stateProvider, $urlRouterProvider,$translateProvider)=>{
    $stateProvider.state('login',{
        url : '/login',
        templateUrl : 'views/login.view.html'
    });

    $stateProvider.state('home',{
        url : '/home',
        templateUrl : 'views/home.view.html'
    });



    $urlRouterProvider.otherwise("/home");

    $translateProvider.useStaticFilesLoader({
        prefix: 'config/Language_',
        suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
    $translateProvider.preferredLanguage('es');
};
let run = ($rootScope, $cookieStore,$state)=>{
    $rootScope.currentUser = $cookieStore.get('jd_session');
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options){
            if(!$rootScope.currentUser){
                if(toState.name !== 'login'){
                    $state.go('login');
                    event.preventDefault();
                }
            }
        });
};

angular.module('mpos').config(config);
angular.module('mpos').run(run);