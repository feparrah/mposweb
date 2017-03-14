(function () {
    angular.module('mpos').provider('sessionSchedule', sessionSchedule);

    function sessionSchedule() {
        var refreshSessionTime;
        this.setRefreshSessionTime = function (time) {
            refreshSessionTime = time;
        };

        var schedule;

        this.$get = function ($interval) {
            return {
                init: function () {
                    schedule = $interval(function () {
                        console.log('Andres Felipe Gonzalez');
                    }, refreshSessionTime * 1000);
                },
                stop : function () {
                    $interval.stop(schedule);
                }
            }
        }

    }
})();