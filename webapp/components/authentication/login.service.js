var loginService = function ($resource, $log, $q, $rootScope, $cookieStore, $http, $base64, restApis) {
    var restUrls;

    restApis.getApis().then(function(apis){
       restUrls = apis;
    });


    var getOauth2Token = function () {
        var def = $q.defer();
        var data = 'client_id=CFGkFIU4JKhy9cjG6HnoctOg8aQa&client_secret=Tek1bEVvPXLNb7AI5fkVVbhToEMa&username=admin&password=admin&grant_type=password';
        $http({
            url: restUrls.token,
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response){
            def.resolve(response.data);
        }).catch(function(error){
            def.reject(error);
        });
        return def.promise;
    };

    this.changePassword = function(userId, currentPassword, newPassword, confirmedPassword){
        var def = $q.defer();
        getOauth2Token().then(function(tokenData){
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
        getOauth2Token().then(function(tokenData){
            $http({
                url: restUrls.logout.replace('{userId}', $base64.encode(userId)),
                method: 'DELETE',
                headers : {
                    'Authorization': tokenData.token_type + ' ' + tokenData.access_token
                }
            }).then(function(response){
                console.log(response);
                $rootScope.currentUser = undefined;
                $cookieStore.remove('jd_session');
                def.resolve();
            }).catch(function(error){
                console.log(error);
                def.reject();
            });
        });
        return def.promise;
    };

    this.validateUser = function(credentials){
        var def = $q.defer();


        getOauth2Token().then(function(tokenData){
            console.log(tokenData.access_token);
            var payload = {
                user: $base64.encode(credentials.username),
                password: $base64.encode(sha512(credentials.password)),
                channel: $base64.encode('1'),
                uuid: $base64.encode('82e601b7059dbf50'),
                version: $base64.encode('4.2.2'),
                ipAddress: $base64.encode('192.168.215.239')
            };

            $http({
                url: restUrls.login,
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
                        console.log(userInfoResponse.data);
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


loginService.$inject = ['$resource', '$log', '$q', '$rootScope', '$cookieStore', '$http', '$base64', 'restApis'];
angular.module('mpos').service('LoginService', loginService);
