let loginService = function ($resource, $log, $q, $rootScope, $cookieStore, $http, $base64) {
    let getOauth2Token = function () {
        let def = $q.defer();
        let data = 'client_id=CFGkFIU4JKhy9cjG6HnoctOg8aQa&client_secret=Tek1bEVvPXLNb7AI5fkVVbhToEMa&username=admin&password=admin&grant_type=password';
        $http({
            url: '/api/token',
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            def.resolve(response.data);
        }).catch(error => {
            def.reject(error);
        });
        return def.promise;
    };

    this.logout = userId => {
        let def = $q.defer();
        getOauth2Token().then(tokenData => {
            $http({
                url: 'api/' + $base64.encode(userId) + '/sessions',
                method: 'DELETE',
                headers : {
                    'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                }
            }).then(response => {
                console.log(response);
                $rootScope.currentUser = undefined;
                $cookieStore.remove('jd_session');
                def.resolve();
            }).catch(error => {
                console.log(error);
                def.reject();
            });
        });
        return def.promise;
    };

    this.validateUser = credentials => {
        let def = $q.defer();


        getOauth2Token().then(tokenData => {
            console.log(tokenData.access_token);
            let payload = {
                user: $base64.encode(credentials.username),
                password: $base64.encode(sha512(credentials.password)),
                channel: $base64.encode('1'),
                uuid: $base64.encode('82e601b7059dbf50'),
                version: $base64.encode('4.2.2'),
                ipAddress: $base64.encode('192.168.215.239')
            };
            $http({
                url: '/api/sessions',
                method: 'POST',
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                }
            }).then(response => {
                let userInfo = {
                    descriptionState: $base64.decode(response.data.descriptionState),
                    encryptionKey: $base64.decode(response.data.encryptionKey),
                    loginState: $base64.decode(response.data.loginState),
                    userId: $base64.decode(response.data.userId)
                };


                if (userInfo.loginState === '1') {
                    $rootScope.currentUser = userInfo;
                    $cookieStore.put('jd_session', userInfo);
                    def.resolve();
                } else {
                    def.reject(userInfo.descriptionState)
                }


            });

        });

        return def.promise;
    };


};


loginService.$inject = ['$resource', '$log', '$q', '$rootScope', '$cookieStore', '$http', '$base64'];
angular.module('mpos').service('LoginService', loginService);