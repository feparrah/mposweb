angular.module('mpos').service('LoginService', loginService);

function loginService($resource, $log, $q, $rootScope, $cookieStore, $http, $base64, netcomEnvironment, Oauth2Service) {
    var restUrls;

    netcomEnvironment.then(function(apis){
       restUrls = apis;
    });

    this.refreshSession = function (userId) {
        var def =  $q.defer();
        Oauth2Service.getOauth2Token().then(function(tokenData){
            var url = restUrls.refreshSession.replace('{userId}', $base64.encode(userId));
            $http.put(url,{},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                }
            });
        });
    };

    this.changePassword = function(userId, currentPassword, newPassword, confirmedPassword){
        var def = $q.defer();
        Oauth2Service.getOauth2Token().then(function(tokenData){
            var payload = {
                currentPassword : $base64.encode(sha512(currentPassword)),
                newPassword : $base64.encode(sha512(newPassword)),
                confirmPassword : $base64.encode(sha512(confirmedPassword))
            };
            $http({
                url : restUrls.changePassword.replace('{userId}', $base64.encode(userId)),
                method: 'POST',
                data : payload,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                }
            }).then(function(response){
                var res =  {
                    responseCode : $base64.decode(response.data.responseCode),
                    responseMessage: $base64.decode(response.data.responseMessage)
                };
                if(res.responseCode === '1'){
                    def.resolve(res.responseMessage);
                }else {
                    def.reject(res.responseMessage);
                }
            });
        });
        return def.promise;
    };

    this.logout = function(userId){
        var def = $q.defer();
        Oauth2Service.getOauth2Token().then(function(tokenData){
            $http({
                url: restUrls.logout.replace('{userId}', $base64.encode(userId)),
                method: 'DELETE',
                headers : {
                    'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                }
            }).then(function(response){
                $rootScope.currentUser = undefined;
                $cookieStore.remove('jd_session');
                def.resolve();
            }).catch(function(error){
                def.reject();
            });
        });
        return def.promise;
    };

    this.validateUser = function(credentials, ipAddress){
        var def = $q.defer();


        Oauth2Service.getOauth2Token().then(function(tokenData){
            var payload = {
                user: $base64.encode(credentials.username),
                password: $base64.encode(sha512(credentials.password)),
                channel: $base64.encode(restUrls.login.channel),
                uuid: $base64.encode(restUrls.login.uuid),
                version: $base64.encode(restUrls.login.version),
                ipAddress: $base64.encode(ipAddress)
            };

            $http({
                url: restUrls.login.url,
                method: 'POST',
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                }
            }).then(function(response){


                var userInfo = {
                    descriptionState: $base64.decode(response.data.descriptionState),
                    encryptionKey: $base64.decode(response.data.encryptionKey),
                    loginState: $base64.decode(response.data.loginState),
                    userId: $base64.decode(response.data.userId)
                };
                if (userInfo.loginState === '1') {
                    $http({
                        url : restUrls.userInfo.replace('{userId}', response.data.userId),
                        method : 'GET',
                        headers : {
                            'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                        }
                    }).then( function(userInfoResponse) {
                        var uInfo = {
                            address : $base64.decode(userInfoResponse.data.address),
                            cellPhone : $base64.decode(userInfoResponse.data.cellPhone),
                            email : $base64.decode(userInfoResponse.data.email),
                            firstName : $base64.decode(userInfoResponse.data.firstName),
                            lastConnection : $base64.decode(userInfoResponse.data.lastConnection),
                            lastName : $base64.decode(userInfoResponse.data.lastName),
                            login : $base64.decode(userInfoResponse.data.login),
                            phone : $base64.decode(userInfoResponse.data.phone),
                            responseCode : $base64.decode(userInfoResponse.data.responseCode),
                            responseMessage : $base64.decode(userInfoResponse.data.responseMessage),
                            secondName : $base64.decode(userInfoResponse.data.secondName),
                            surname : $base64.decode(userInfoResponse.data.surname),
                            userId: $base64.decode(response.data.userId)

                        };
                        $rootScope.currentUser = uInfo;
                        $cookieStore.put('jd_session', uInfo);
                        def.resolve();
                    });
                } else {
                    def.reject(userInfo.descriptionState)
                }
            });

        });

        return def.promise;
    };


};



