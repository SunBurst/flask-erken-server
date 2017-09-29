(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('stationMeasurements', stationMeasurements);
    
    stationMeasurements.$inject = ['$resource'];
    
    function stationMeasurements($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            //Daily
            getDailyProfileMeasurements: getDailyProfileMeasurements,
            getDailyChartProfileMeasurements: getDailyChartProfileMeasurements,
            getDailyChartSingleParameterMeasurements: getDailyChartSingleParameterMeasurements,
            //High Frequency
            getHighFrequencySingleParameterMeasurements: getHighFrequencySingleParameterMeasurements,
            getHighFrequencyProfileMeasurements: getHighFrequencyProfileMeasurements,
            getHighFrequencyChartProfileMeasurements: getHighFrequencyChartProfileMeasurements,
            getHighFrequencyChartSingleParameterMeasurements: getHighFrequencyChartSingleParameterMeasurements,
            //Hourly
            getHourlyProfileMeasurements: getHourlyProfileMeasurements,
            getHourlyChartSingleParameterMeasurements: getHourlyChartSingleParameterMeasurements,
            getHourlyChartProfileMeasurements: getHourlyChartProfileMeasurements,
            getMeasurementFrequencies: getMeasurementFrequencies,
            // Groups
            getDynamicGroupMeasurements: getDynamicGroupMeasurements,
            getDynamicGroupMeasurementsChart: getDynamicGroupMeasurementsChart,
            getDynamicGroupMeasurementsTimeGrouped: getDynamicGroupMeasurementsTimeGrouped,
            getDailyGroupMeasurements: getDailyGroupMeasurements,
            getDailyGroupMeasurementsChart: getDailyGroupMeasurementsChart,            
            getDailyGroupMeasurementsTimeGrouped: getDailyGroupMeasurementsTimeGrouped,
            getFiveMinGroupMeasurements: getFiveMinGroupMeasurements,
            getFiveMinGroupMeasurementsChart: getFiveMinGroupMeasurementsChart,
            getFiveMinGroupMeasurementsTimeGrouped: getFiveMinGroupMeasurementsTimeGrouped,
            getHourlyGroupMeasurementsChart: getHourlyGroupMeasurementsChart,
            getHourlyGroupMeasurementsTimeGrouped: getHourlyGroupMeasurementsTimeGrouped,
            getHourlyGroupMeasurements: getHourlyGroupMeasurements,
            getThirtyMinGroupMeasurementsChart: getThirtyMinGroupMeasurementsChart,
            getThirtyMinGroupMeasurementsTimeGrouped: getThirtyMinGroupMeasurementsTimeGrouped,
            getTwentyMinGroupMeasurementsChart: getTwentyMinGroupMeasurementsChart,
            getTwentyMinGroupMeasurementsTimeGrouped: getTwentyMinGroupMeasurementsTimeGrouped,
            getFifteenMinGroupMeasurementsChart: getFifteenMinGroupMeasurementsChart,
            getFifteenMinGroupMeasurementsTimeGrouped: getFifteenMinGroupMeasurementsTimeGrouped,
            getTenMinGroupMeasurementsChart: getTenMinGroupMeasurementsChart,
            getTenMinGroupMeasurementsTimeGrouped: getTenMinGroupMeasurementsTimeGrouped,
            getOneMinGroupMeasurementsChart: getOneMinGroupMeasurementsChart,
            getOneMinGroupMeasurementsTimeGrouped: getOneMinGroupMeasurementsTimeGrouped,
            getOneSecGroupMeasurementsChart: getOneSecGroupMeasurementsChart,
            getOneSecGroupMeasurementsTimeGrouped: getOneSecGroupMeasurementsTimeGrouped,
            // Single Parameters
            getDynamicSingleParameterMeasurementsChart: getDynamicSingleParameterMeasurementsChart,
            getDynamicSingleParameterMeasurementsTimeGrouped: getDynamicSingleParameterMeasurementsTimeGrouped,
            getDailySingleParameterMeasurements: getDailySingleParameterMeasurements,
            getDailySingleParameterMeasurementsChart: getDailySingleParameterMeasurementsChart,
            getDailySingleParameterMeasurementsTimeGrouped: getDailySingleParameterMeasurementsTimeGrouped,
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
        
        function getDailyProfileMeasurements(stationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_date: fromDate,
                        to_date: toDate
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
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
        
        function getDailyChartProfileMeasurements(stationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_date: fromDate,
                        to_date: toDate
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
            }).$promise
                .then(getDailyChartProfileMeasurementsComplete)
                .catch(getDailyChartProfileMeasurementsFailed);
                
            function getDailyChartProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyChartProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyChartSingleParameterMeasurements(stationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_date: fromDate,
                        to_date: toDate
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
            }).$promise
                .then(getDailyChartSingleParameterMeasurementsComplete)
                .catch(getDailyChartSingleParameterMeasurementsFailed);
                
            function getDailyChartSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyChartSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHighFrequencySingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHighFrequencySingleParameterMeasurementsComplete)
                .catch(getHighFrequencySingleParameterMeasurementsFailed);
                
            function getHighFrequencySingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencySingleParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHighFrequencyProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHighFrequencyProfileMeasurementsComplete)
                .catch(getHighFrequencyProfileMeasurementsFailed);
                
            function getHighFrequencyProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyProfileMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHighFrequencyChartProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHighFrequencyChartProfileMeasurementsComplete)
                .catch(getHighFrequencyChartProfileMeasurementsFailed);
                
            function getHighFrequencyChartProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyChartProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHighFrequencyChartSingleParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHighFrequencyChartSingleParameterMeasurementsComplete)
                .catch(getHighFrequencyChartSingleParameterMeasurementsFailed);
                
            function getHighFrequencyChartSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyChartSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHourlySingleParameterMeasurements(stationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_date_hour: fromDateHour,
                        to_date_hour: toDateHour
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
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
        
        function getHourlyChartSingleParameterMeasurements(stationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_date_hour: fromDateHour,
                        to_date_hour: toDateHour
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
            }).$promise
                .then(getHourlyChartSingleParameterMeasurementsComplete)
                .catch(getHourlyChartSingleParameterMeasurementsFailed);
                
            function getHourlyChartSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyChartSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHourlyProfileMeasurements(stationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_date_hour: fromDateHour,
                        to_date_hour: toDateHour
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
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
        
        function getHourlyChartProfileMeasurements(stationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_date_hour: fromDateHour,
                        to_date_hour: toDateHour
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
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
        
        function getMeasurementFrequencies(stationId) {
            var resource = $resource('/api/measurement_frequencies_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getMeasurementFrequenciesComplete)
                .catch(getMeasurementFrequenciesFailed);
                
            function getMeasurementFrequenciesComplete(response) {
                return response;
            }
            
            function getMeasurementFrequenciesFailed(error) {
                console.log(error);
            }

        }
        
        function getDynamicGroupMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/group_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getGroupMeasurementsChartComplete)
                .catch(getGroupMeasurementsChartFailed);
                
            function getGroupMeasurementsChartComplete(response) {
                return response;
            }
            
            function getGroupMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDynamicGroupMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/group_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getGroupMeasurementsComplete)
                .catch(getGroupMeasurementsFailed);
                
            function getGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getGroupMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyGroupMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_group_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDailyGroupMeasurementsChartComplete)
                .catch(getDailyGroupMeasurementsChartFailed);
                
            function getDailyGroupMeasurementsChartComplete(response) {
                return response;
            }
            
            function getDailyGroupMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyGroupMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_group_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDailyGroupMeasurementsComplete)
                .catch(getDailyGroupMeasurementsFailed);
                
            function getDailyGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyGroupMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyGroupMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_group_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDailyGroupMeasurementsTimeGroupedComplete)
                .catch(getDailyGroupMeasurementsTimeGroupedFailed);
                
            function getDailyGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getDailyGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinGroupMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_group_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFiveMinGroupMeasurementsChartComplete)
                .catch(getFiveMinGroupMeasurementsChartFailed);
                
            function getFiveMinGroupMeasurementsChartComplete(response) {
                return response;
            }
            
            function getFiveMinGroupMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinGroupMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_group_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFiveMinGroupMeasurementsComplete)
                .catch(getFiveMinGroupMeasurementsFailed);
                
            function getFiveMinGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getFiveMinGroupMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinGroupMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_group_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFiveMinGroupMeasurementsTimeGroupedComplete)
                .catch(getFiveMinGroupMeasurementsTimeGroupedFailed);
                
            function getFiveMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getFiveMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinGroupMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/thirty_min_group_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getThirtyMinGroupMeasurementsChartComplete)
                .catch(getThirtyMinGroupMeasurementsChartFailed);
                
            function getThirtyMinGroupMeasurementsChartComplete(response) {
                return response;
            }
            
            function getThirtyMinGroupMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinGroupMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/thirty_min_group_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getThirtyMinGroupMeasurementsTimeGroupedComplete)
                .catch(getThirtyMinGroupMeasurementsTimeGroupedFailed);
                
            function getThirtyMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getThirtyMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinGroupMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/twenty_min_group_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getTwentyMinGroupMeasurementsChartComplete)
                .catch(getTwentyMinGroupMeasurementsChartFailed);
                
            function getTwentyMinGroupMeasurementsChartComplete(response) {
                return response;
            }
            
            function getTwentyMinGroupMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinGroupMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/twenty_min_group_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getTwentyMinGroupMeasurementsTimeGroupedComplete)
                .catch(getTwentyMinGroupMeasurementsTimeGroupedFailed);
                
            function getTwentyMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getTwentyMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFifteenMinGroupMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/fifteen_min_group_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFifteenMinGroupMeasurementsChartComplete)
                .catch(getFifteenMinGroupMeasurementsChartFailed);
                
            function getFifteenMinGroupMeasurementsChartComplete(response) {
                return response;
            }
            
            function getFifteenMinGroupMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFifteenMinGroupMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/fifteen_min_group_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFifteenMinGroupMeasurementsTimeGroupedComplete)
                .catch(getFifteenMinGroupMeasurementsTimeGroupedFailed);
                
            function getFifteenMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getFifteenMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTenMinGroupMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/ten_min_group_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getTenMinGroupMeasurementsChartComplete)
                .catch(getTenMinGroupMeasurementsChartFailed);
                
            function getTenMinGroupMeasurementsChartComplete(response) {
                return response;
            }
            
            function getTenMinGroupMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTenMinGroupMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/ten_min_group_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getTenMinGroupMeasurementsTimeGroupedComplete)
                .catch(getTenMinGroupMeasurementsTimeGroupedFailed);
                
            function getTenMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getTenMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinGroupMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_min_group_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getOneMinGroupMeasurementsChartComplete)
                .catch(getOneMinGroupMeasurementsChartFailed);
                
            function getOneMinGroupMeasurementsChartComplete(response) {
                return response;
            }
            
            function getOneMinGroupMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinGroupMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_min_group_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getOneMinGroupMeasurementsTimeGroupedComplete)
                .catch(getOneMinGroupMeasurementsTimeGroupedFailed);
                
            function getOneMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getOneMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecGroupMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_sec_group_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getOneSecGroupMeasurementsChartComplete)
                .catch(getOneSecGroupMeasurementsChartFailed);
                
            function getOneSecGroupMeasurementsChartComplete(response) {
                return response;
            }
            
            function getOneSecGroupMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecGroupMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_sec_group_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getOneSecGroupMeasurementsTimeGroupedComplete)
                .catch(getOneSecGroupMeasurementsTimeGroupedFailed);
                
            function getOneSecGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getOneSecGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlyGroupMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_group_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHourlyGroupMeasurementsChartComplete)
                .catch(getHourlyGroupMeasurementsChartFailed);
                
            function getHourlyGroupMeasurementsChartComplete(response) {
                return response;
            }
            
            function getHourlyGroupMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlyGroupMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_group_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHourlyGroupMeasurementsComplete)
                .catch(getHourlyGroupMeasurementsFailed);
                
            function getHourlyGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyGroupMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlyGroupMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_group_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHourlyGroupMeasurementsTimeGroupedComplete)
                .catch(getHourlyGroupMeasurementsTimeGroupedFailed);
                
            function getHourlyGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getHourlyGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDynamicGroupMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/group_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getGroupMeasurementsTimeGroupedComplete)
                .catch(getGroupMeasurementsTimeGroupedFailed);
                
            function getGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDynamicSingleParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/single_parameter_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
        
        function getDynamicSingleParameterMeasurementsTimeGrouped(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/single_parameter_measurements_by_station_time_grouped/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDynamicSingleParameterMeasurementsTimeGroupedComplete)
                .catch(getDynamicSingleParameterMeasurementsTimeGroupedFailed);
                
            function getDynamicSingleParameterMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getDynamicSingleParameterMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailySingleParameterMeasurements(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_single_parameter_measurements_by_station/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getDailySingleParameterMeasurementsChart(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_single_parameter_measurements_by_station_chart/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getDailySingleParameterMeasurementsTimeGrouped(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_single_parameter_measurements_by_station_time_grouped/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getHourlySingleParameterMeasurements(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_single_parameter_measurements_by_station/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getHourlySingleParameterMeasurementsChart(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_single_parameter_measurements_by_station_chart/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getThirtyMinSingleParameterMeasurements(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/thirty_min_single_parameter_measurements_by_station/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getThirtyMinSingleParameterMeasurementsChart(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/thirty_min_single_parameter_measurements_by_station_chart/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getTwentyMinSingleParameterMeasurements(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/twenty_min_single_parameter_measurements_by_station/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getTwentyMinSingleParameterMeasurementsChart(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/twenty_min_single_parameter_measurements_by_station_chart/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getFifteenMinSingleParameterMeasurements(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/fifteen_min_single_parameter_measurements_by_station/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getFifteenMinSingleParameterMeasurementsChart(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/fifteen_min_single_parameter_measurements_by_station_chart/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getTenMinSingleParameterMeasurements(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/ten_min_single_parameter_measurements_by_station/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getTenMinSingleParameterMeasurementsChart(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/ten_min_single_parameter_measurements_by_station_chart/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getFiveMinSingleParameterMeasurements(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_single_parameter_measurements_by_station/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getFiveMinSingleParameterMeasurementsChart(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_single_parameter_measurements_by_station_chart/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getOneMinSingleParameterMeasurements(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_min_single_parameter_measurements_by_station/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getOneMinSingleParameterMeasurementsChart(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_min_single_parameter_measurements_by_station_chart/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getOneSecSingleParameterMeasurements(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_sec_single_parameter_measurements_by_station/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
        
        function getOneSecSingleParameterMeasurementsChart(stationId, parameter, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_sec_single_parameter_measurements_by_station_chart/:station_id/:parameter/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter: parameter,
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
                parameter: parameter, 
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
