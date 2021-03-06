'use strict';

/* Services */

angular.module('theLawFactory')
.config(['$httpProvider', function ($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}])
.factory('apiService', function ($http, $q) {
    return {
        getDataSample: function (url) {
            var deferred = $q.defer();
            $http.get(url).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data sample");
            });

            return deferred.promise;
        }
    };
})
.factory('api', function ($http, $q, $log, apiService, API_ROOT_URL) {
    if (API_ROOT_URL.substr(-1) != "/") API_ROOT_URL += "/";
    var today_date = new Date().toJSON().split('T')[0];
    var api = {
        getLawlist: function () {
            return apiService.getDataSample(API_ROOT_URL + 'dossiers.csv?date=' + today_date)
                .then(function(data) {
                    $log.debug('law list loaded');
                    return data;
                });
        },
        getProcedure: function (id) {
            return apiService.getDataSample(API_ROOT_URL + id + '/viz/procedure.json?date=' + today_date)
                .then(function(data) {
                    $log.debug('procedure loaded', data);
                    return data;
                });
        },
        getArticle: function (id) {
            return apiService.getDataSample(API_ROOT_URL + id + '/viz/articles_etapes.json?date=' + today_date)
                .then(function(data) {
                    $log.debug('articles loaded', data);
                    return data;
                });
        },
        getAmendement: function (id, step) {
            return apiService.getDataSample(API_ROOT_URL + id + '/viz/amendements_' + step + '.json?date=' + today_date)
                .then(function(data) {
                    $log.debug('amendements loaded', data);
                    return data;
                });
        },
        getAmendementContent: function (api_root, id) {
            return apiService.getDataSample(api_root.replace(/^https?:/, '') + id + '/json?date=' + today_date)
                .then(function(data) {
                    $log.debug('amendement content loaded', data);
                    return data;
                });
        },
        getIntervention: function (id) {
            return apiService.getDataSample(API_ROOT_URL + id + '/viz/interventions.json?date=' + today_date)
                .then(function(data) {
                    $log.debug('interventions loaded', data);
                    return data;
                });
        },
        getDossiers: function () {
            return apiService.getDataSample(API_ROOT_URL + 'dossiers_0.json?date=' + today_date)
                .then(function(data) {
                    $log.debug('dossiers loaded', data);
                    return data;
                });
        },
        getTutorials: function () {
            return apiService.getDataSample('tutorial.json')
                .then(function(data) {
                    $log.debug('tutorials loaded', data);
                    return data;
                });
        },
        getHome: function() {
            return apiService.getDataSample(API_ROOT_URL + 'home.json?date=' + today_date)
                .then(function(data) {
                    $log.debug('home loaded', data);
                    return data;
                });
        }
    };
    return api;
});
