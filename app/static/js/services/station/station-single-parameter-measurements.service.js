(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('stationSingleParameterMeasurements', stationSingleParameterMeasurements);
    
    stationSingleParameterMeasurements.$inject = ['$resource'];
    
    function stationSingleParameterMeasurements($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {

            getDynamicSingleParameterMeasurementsChart: getDynamicSingleParameterMeasurementsChart,
            getDynamicSingleParameterMeasurements: getDynamicSingleParameterMeasurements,
            getDailySingleParameterMeasurements: getDailySingleParameterMeasurements,
            getDailySingleParameterMeasurementsChart: getDailySingleParameterMeasurementsChart,
            getHourlySingleParameterMeasurements: getHourlySingleParameterMeasurements,
            getHourlySingleParameterMeasurementsChart: getHourlySingleParameterMeasurementsChart,
            getThirtyMinSingleParameterMeasurements: getThirtyMinSingleParameterMeasurements,
            getThirtyMinSingleParameterMeasurementsChart: getThirtyMinSingleParameterMeasurementsChart,
            getTwentyMinSingleParameterMeasurements: getTwentyMinSingleParameterMeasurements,
            getTwentyMinSingleParameterMeasurementsChart: getTwentyMinSingleParameterMeasurementsChart,
            getFifteenMinSingleParameterMeasurements: getFifteenMinSingleParameterMeasurements,
            getFifteenMinSingleParameterMeasurementsChart: getFifteenMinSingleParameterMeasurementsChart,
            getTenMinSingleParameterMeasurements: getTenMinSingleParameterMeasurements,
            getTenMinSingleParameterMeasurementsChart: getTenMinSingleParameterMeasurementsChart,
            getFiveMinSingleParameterMeasurements: getFiveMinSingleParameterMeasurements,
            getFiveMinSingleParameterMeasurementsChart: getFiveMinSingleParameterMeasurementsChart,
            getOneMinSingleParameterMeasurements: getOneMinSingleParameterMeasurements,
            getOneMinSingleParameterMeasurementsChart: getOneMinSingleParameterMeasurementsChart,
            getOneSecSingleParameterMeasurements: getOneSecSingleParameterMeasurements,
            getOneSecSingleParameterMeasurementsChart: getOneSecSingleParameterMeasurementsChart
            
        };
        
        function getDynamicSingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/dynamic_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDynamicSingleParameterMeasurementsChartComplete)
                .catch(getDynamicSingleParameterMeasurementsChartFailed);
                
            function getDynamicSingleParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getDynamicSingleParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDynamicSingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/dynamic_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDynamicSingleParameterMeasurementsComplete)
                .catch(getDynamicSingleParameterMeasurementsFailed);
                
            function getDynamicSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDynamicSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailySingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDailySingleParameterMeasurementsComplete)
                .catch(getDailySingleParameterMeasurementsFailed);
                
            function getDailySingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDailySingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailySingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDailySingleParameterMeasurementsChartComplete)
                .catch(getDailySingleParameterMeasurementsChartFailed);
                
            function getDailySingleParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getDailySingleParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailySingleParameterMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_single_parameter_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDailySingleParameterMeasurementsTimeGroupedComplete)
                .catch(getDailySingleParameterMeasurementsTimeGroupedFailed);
                
            function getDailySingleParameterMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getDailySingleParameterMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlySingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHourlySingleParameterMeasurementsComplete)
                .catch(getHourlySingleParameterMeasurementsFailed);
                
            function getHourlySingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlySingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlySingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHourlySingleParameterMeasurementsChartComplete)
                .catch(getHourlySingleParameterMeasurementsChartFailed);
                
            function getHourlySingleParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getHourlySingleParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinSingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/thirty_min_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getThirtyMinSingleParameterMeasurementsComplete)
                .catch(getThirtyMinSingleParameterMeasurementsFailed);
                
            function getThirtyMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getThirtyMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinSingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/thirty_min_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getThirtyMinSingleParameterMeasurementsChartComplete)
                .catch(getThirtyMinSingleParameterMeasurementsChartFailed);
                
            function getThirtyMinSingleParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getThirtyMinSingleParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinSingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/twenty_min_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getTwentyMinSingleParameterMeasurementsComplete)
                .catch(getTwentyMinSingleParameterMeasurementsFailed);
                
            function getTwentyMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getTwentyMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinSingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/twenty_min_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getTwentyMinSingleParameterMeasurementsChartComplete)
                .catch(getTwentyMinSingleParameterMeasurementsChartFailed);
                
            function getTwentyMinSingleParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getTwentyMinSingleParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFifteenMinSingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/fifteen_min_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFifteenMinSingleParameterMeasurementsComplete)
                .catch(getFifteenMinSingleParameterMeasurementsFailed);
                
            function getFifteenMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getFifteenMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFifteenMinSingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/fifteen_min_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFifteenMinSingleParameterMeasurementsChartComplete)
                .catch(getFifteenMinSingleParameterMeasurementsChartFailed);
                
            function getFifteenMinSingleParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getFifteenMinSingleParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTenMinSingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/ten_min_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getTenMinSingleParameterMeasurementsComplete)
                .catch(getTenMinSingleParameterMeasurementsFailed);
                
            function getTenMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getTenMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTenMinSingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/ten_min_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getTenMinSingleParameterMeasurementsChartComplete)
                .catch(getTenMinSingleParameterMeasurementsChartFailed);
                
            function getTenMinSingleParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getTenMinSingleParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinSingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFiveMinSingleParameterMeasurementsComplete)
                .catch(getFiveMinSingleParameterMeasurementsFailed);
                
            function getFiveMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getFiveMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinSingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFiveMinSingleParameterMeasurementsChartComplete)
                .catch(getFiveMinSingleParameterMeasurementsChartFailed);
                
            function getFiveMinSingleParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getFiveMinSingleParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinSingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_min_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getOneMinSingleParameterMeasurementsComplete)
                .catch(getOneMinSingleParameterMeasurementsFailed);
                
            function getOneMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getOneMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinSingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_min_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getOneMinSingleParameterMeasurementsChartComplete)
                .catch(getOneMinSingleParameterMeasurementsChartFailed);
                
            function getOneMinSingleParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getOneMinSingleParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecSingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_sec_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getOneSecSingleParameterMeasurementsComplete)
                .catch(getOneSecSingleParameterMeasurementsFailed);
                
            function getOneSecSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getOneSecSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecSingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_sec_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getOneSecSingleParameterMeasurementsChartComplete)
                .catch(getOneSecSingleParameterMeasurementsChartFailed);
                
            function getOneSecSingleParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getOneSecSingleParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
    }
    
})();
