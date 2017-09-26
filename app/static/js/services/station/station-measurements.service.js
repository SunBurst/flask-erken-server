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
            getDailySingleParameterMeasurements: getDailySingleParameterMeasurements,
            getDailyProfileMeasurements: getDailyProfileMeasurements,
            getDailyChartProfileMeasurements: getDailyChartProfileMeasurements,
            getDailyChartSingleParameterMeasurements: getDailyChartSingleParameterMeasurements,
            //High Frequency
            getHighFrequencySingleParameterMeasurements: getHighFrequencySingleParameterMeasurements,
            getHighFrequencyProfileMeasurements: getHighFrequencyProfileMeasurements,
            getHighFrequencyChartProfileMeasurements: getHighFrequencyChartProfileMeasurements,
            getHighFrequencyChartSingleParameterMeasurements: getHighFrequencyChartSingleParameterMeasurements,
            //Hourly
            getHourlySingleParameterMeasurements: getHourlySingleParameterMeasurements,
            getHourlyProfileMeasurements: getHourlyProfileMeasurements,
            getHourlyChartSingleParameterMeasurements: getHourlyChartSingleParameterMeasurements,
            getHourlyChartProfileMeasurements: getHourlyChartProfileMeasurements,
            getMeasurementFrequencies: getMeasurementFrequencies,
            //Groups
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
            getOneSecGroupMeasurementsTimeGrouped: getOneSecGroupMeasurementsTimeGrouped
            
        };
        
        function getDailySingleParameterMeasurements(stationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_single_parameter_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
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
                .then(getDailySingleParameterMeasurementsComplete)
                .catch(getDailySingleParameterMeasurementsFailed);
                
            function getDailySingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDailySingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
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
        
    }

})();
