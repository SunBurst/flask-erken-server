(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('stationProfileMeasurements', stationProfileMeasurements);
    
    stationProfileMeasurements.$inject = ['$resource'];
    
    function stationProfileMeasurements($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            
            getDynamicProfileMeasurements: getDynamicProfileMeasurements,
            getDynamicProfileMeasurementsChart: getDynamicProfileMeasurementsChart,
            getDailyProfileMeasurements: getDailyProfileMeasurements,
            getDailyProfileMeasurementsChart: getDailyProfileMeasurementsChart,
            getHourlyProfileMeasurements: getHourlyProfileMeasurements,
            getHourlyProfileMeasurementsChart: getHourlyProfileMeasurementsChart,
            getThirtyMinProfileMeasurements: getThirtyMinProfileMeasurements,
            getThirtyMinProfileMeasurementsChart: getThirtyMinProfileMeasurementsChart,
            getTwentyMinProfileMeasurements: getTwentyMinProfileMeasurements,
            getTwentyMinProfileMeasurementsChart: getTwentyMinProfileMeasurementsChart,
            getFifteenMinProfileMeasurements: getFifteenMinProfileMeasurements,
            getFifteenMinProfileMeasurementsChart: getFifteenMinProfileMeasurementsChart,
            getTenMinProfileMeasurements: getTenMinProfileMeasurements,
            getTenMinProfileMeasurementsChart: getTenMinProfileMeasurementsChart,
            getFiveMinProfileMeasurements: getFiveMinProfileMeasurements,
            getFiveMinProfileMeasurementsChart: getFiveMinProfileMeasurementsChart,
            getOneMinProfileMeasurements: getOneMinProfileMeasurements,
            getOneMinProfileMeasurementsChart: getOneMinProfileMeasurementsChart,
            getOneSecProfileMeasurements: getOneSecProfileMeasurements,
            getOneSecProfileMeasurementsChart: getOneSecProfileMeasurementsChart
            
        };
        
        function getDynamicProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/dynamic_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getDynamicProfileMeasurementsComplete)
                .catch(getDynamicProfileMeasurementsFailed);
                
            function getDynamicProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getDynamicProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDynamicProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/dynamic_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getDynamicProfileMeasurementsChartComplete)
                .catch(getDynamicProfileMeasurementsChartFailed);
                
            function getDynamicProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getDynamicProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getDailyProfileMeasurementsComplete)
                .catch(getDailyProfileMeasurementsFailed);
                
            function getDailyProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getDailyProfileMeasurementsChartComplete)
                .catch(getDailyProfileMeasurementsChartFailed);
                
            function getDailyProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getDailyProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlyProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHourlyProfileMeasurementsComplete)
                .catch(getHourlyProfileMeasurementsFailed);
                
            function getHourlyProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlyProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHourlyProfileMeasurementsChartComplete)
                .catch(getHourlyProfileMeasurementsChartFailed);
                
            function getHourlyProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getHourlyProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/thirty_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getThirtyMinProfileMeasurementsComplete)
                .catch(getThirtyMinProfileMeasurementsFailed);
                
            function getThirtyMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getThirtyMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/thirty_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getThirtyMinProfileMeasurementsChartComplete)
                .catch(getThirtyMinProfileMeasurementsChartFailed);
                
            function getThirtyMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getThirtyMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/twenty_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getTwentyMinProfileMeasurementsComplete)
                .catch(getTwentyMinProfileMeasurementsFailed);
                
            function getTwentyMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getTwentyMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/twenty_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getTwentyMinProfileMeasurementsChartComplete)
                .catch(getTwentyMinProfileMeasurementsChartFailed);
                
            function getTwentyMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getTwentyMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFifteenMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/fifteen_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getFifteenMinProfileMeasurementsComplete)
                .catch(getFifteenMinProfileMeasurementsFailed);
                
            function getFifteenMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getFifteenMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFifteenMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/fifteen_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getFifteenMinProfileMeasurementsChartComplete)
                .catch(getFifteenMinProfileMeasurementsChartFailed);
                
            function getFifteenMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getFifteenMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTenMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/ten_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getTenMinProfileMeasurementsComplete)
                .catch(getTenMinProfileMeasurementsFailed);
                
            function getTenMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getTenMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTenMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/ten_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getTenMinProfileMeasurementsChartComplete)
                .catch(getTenMinProfileMeasurementsChartFailed);
                
            function getTenMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getTenMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getFiveMinProfileMeasurementsComplete)
                .catch(getFiveMinProfileMeasurementsFailed);
                
            function getFiveMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getFiveMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getFiveMinProfileMeasurementsChartComplete)
                .catch(getFiveMinProfileMeasurementsChartFailed);
                
            function getFiveMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getFiveMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getOneMinProfileMeasurementsComplete)
                .catch(getOneMinProfileMeasurementsFailed);
                
            function getOneMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getOneMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getOneMinProfileMeasurementsChartComplete)
                .catch(getOneMinProfileMeasurementsChartFailed);
                
            function getOneMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getOneMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_sec_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getOneSecProfileMeasurementsComplete)
                .catch(getOneSecProfileMeasurementsFailed);
                
            function getOneSecProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getOneSecProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_sec_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getOneSecProfileMeasurementsChartComplete)
                .catch(getOneSecProfileMeasurementsChartFailed);
                
            function getOneSecProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getOneSecProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
    }

})();
