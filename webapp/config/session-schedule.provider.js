(function () {
    angular.module('mpos').provider('sessionSchedule', sessionSchedule);

    function sessionSchedule() {
        var refreshSessionTime;
        this.setRefreshSessionTime = function (time) {
            refreshSessionTime = time;
        };

        var schedule;

        this.$get = function ($interval,LoginService) {
            return {
                init: function (userId) {
                    LoginService.refreshSession(userId);
                    schedule = $interval(function () {
                        LoginService.refreshSession(userId);
                    }, refreshSessionTime * 1000);
                },
                stop : function () {
                    $interval.cancel(schedule);
                }
            }
        }

    }
})();