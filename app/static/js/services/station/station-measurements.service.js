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
            getDailyParameterGroupMeasurements: getDailyParameterGroupMeasurements,
            getDailyProfileMeasurements: getDailyProfileMeasurements,
            getDailyChartParameterGroupMeasurements: getDailyChartParameterGroupMeasurements,
            getDailyChartSingleParameterMeasurements: getDailyChartSingleParameterMeasurements,
            //High Frequency
            getHighFrequencySingleParameterMeasurements: getHighFrequencySingleParameterMeasurements,
            getHighFrequencyParameterGroupMeasurements: getHighFrequencyParameterGroupMeasurements,
            getHighFrequencyProfileMeasurements: getHighFrequencyProfileMeasurements,
            getHighFrequencyChartParameterGroupMeasurements: getHighFrequencyChartParameterGroupMeasurements,
            getHighFrequencyChartSingleParameterMeasurements: getHighFrequencyChartSingleParameterMeasurements,
            //Hourly
            getHourlySingleParameterMeasurements: getHourlySingleParameterMeasurements,
            getHourlyParameterGroupMeasurements: getHourlyParameterGroupMeasurements,
            getHourlyProfileMeasurements: getHourlyProfileMeasurements,
            getHourlyChartSingleParameterMeasurements: getHourlyChartSingleParameterMeasurements,
            getHourlyChartParameterGroupMeasurements: getHourlyChartParameterGroupMeasurements,
            getHourlyChartProfileMeasurements: getHourlyChartProfileMeasurements
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
        
        function getDailyParameterGroupMeasurements(stationId, groupId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_parameter_group_measurements_by_station/:station_id/:group_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
            }).$promise
                .then(getDailyParameterGroupMeasurementsComplete)
                .catch(getDailyParameterGroupMeasurementsFailed);
                
            function getDailyParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyParameterGroupMeasurementsFailed(error) {
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
        
        function getDailyChartParameterGroupMeasurements(stationId, groupId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_parameter_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
            }).$promise
                .then(getDailyChartParameterGroupMeasurementsComplete)
                .catch(getDailyChartParameterGroupMeasurementsFailed);
                
            function getDailyChartParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyChartParameterGroupMeasurementsFailed(error) {
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
        
        function getHighFrequencyParameterGroupMeasurements(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/parameter_group_measurements_by_station/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHighFrequencyParameterGroupMeasurementsComplete)
                .catch(getHighFrequencyParameterGroupMeasurementsFailed);
                
            function getHighFrequencyParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyParameterGroupMeasurementsFailed(error) {
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
        
        function getHighFrequencyChartParameterGroupMeasurements(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/parameter_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHighFrequencyChartParameterGroupMeasurementsComplete)
                .catch(getHighFrequencyChartParameterGroupMeasurementsFailed);
                
            function getHighFrequencyChartParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyChartParameterGroupMeasurementsFailed(error) {
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
        
        function getHourlyParameterGroupMeasurements(stationId, groupId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_parameter_group_measurements_by_station/:station_id/:group_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
            }).$promise
                .then(getHourlyParameterGroupMeasurementsComplete)
                .catch(getHourlyParameterGroupMeasurementsFailed);
                
            function getHourlyParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyParameterGroupMeasurementsFailed(error) {
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
        
        function getHourlyChartParameterGroupMeasurements(stationId, groupId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_parameter_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
            }).$promise
                .then(getHourlyChartParameterGroupMeasurementsComplete)
                .catch(getHourlyChartParameterGroupMeasurementsFailed);
                
            function getHourlyChartParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyChartParameterGroupMeasurementsFailed(error) {
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
        
    }

})();
