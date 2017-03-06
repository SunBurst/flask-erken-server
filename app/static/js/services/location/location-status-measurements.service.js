(function() {
    
    'use strict';
    
    angular
        .module('app.services')
        .factory('locationStatusMeasurements', locationStatusMeasurements);
    
    locationStatusMeasurements.$inject = ['$resource'];
    
    function locationStatusMeasurements($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            //Daily
            getDailyAverageParameterMeasurements: getDailyAverageParameterMeasurements,
            getDailyChartAverageParameterMeasurements: getDailyChartAverageParameterMeasurements,
            getDailyStationsAverageParameterMeasurements: getDailyStationsAverageParameterMeasurements,
            getDailyStationsChartAverageParameterMeasurements: getDailyStationsChartAverageParameterMeasurements,
            //High Frequency
            getHighFrequencyAverageParameterMeasurements: getHighFrequencyAverageParameterMeasurements,
            getHighFrequencyChartAverageParameterMeasurements: getHighFrequencyChartAverageParameterMeasurements,
            getHighFrequencyStationsAverageParameterMeasurements: getHighFrequencyStationsAverageParameterMeasurements,
            getHighFrequencyStationsChartAverageParameterMeasurements: getHighFrequencyStationsChartAverageParameterMeasurements,
            //Hourly
            getHourlyAverageParameterMeasurements: getHourlyAverageParameterMeasurements,
            getHourlyChartAverageParameterMeasurements: getHourlyChartAverageParameterMeasurements,
            getHourlyStationsAverageParameterMeasurements: getHourlyStationsAverageParameterMeasurements,
            getHourlyStationsChartAverageParameterMeasurements: getHourlyStationsChartAverageParameterMeasurements
        };
        
        function getDailyAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_average_status_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
            }).$promise
                .then(getDailyAverageParameterMeasurementsComplete)
                .catch(getDailyAverageParameterMeasurementsFailed);
                
            function getDailyAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getDailyChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_average_status_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_date: fromDate,
                        to_date: toDate
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
            }).$promise
                .then(getDailyChartAverageParameterMeasurementsComplete)
                .catch(getDailyChartAverageParameterMeasurementsFailed);
                
            function getDailyChartAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyChartAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getDailyStationsAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_stations_average_status_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
            }).$promise
                .then(getDailyStationsAverageParameterMeasurementsComplete)
                .catch(getDailyStationsAverageParameterMeasurementsFailed);
                
            function getDailyStationsAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyStationsAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyStationsChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_stations_average_status_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
            }).$promise
                .then(getDailyStationsChartAverageParameterMeasurementsComplete)
                .catch(getDailyStationsChartAverageParameterMeasurementsFailed);
                
            function getDailyStationsChartAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyStationsChartAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHighFrequencyAverageParameterMeasurements(locationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/average_status_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHighFrequencyAverageParameterMeasurementsComplete)
                .catch(getHighFrequencyAverageParameterMeasurementsFailed);
                
            function getHighFrequencyAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHighFrequencyChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/average_status_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHighFrequencyChartAverageParameterMeasurementsComplete)
                .catch(getHighFrequencyChartAverageParameterMeasurementsFailed);
                
            function getHighFrequencyChartAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyChartAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHighFrequencyStationsAverageParameterMeasurements(locationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/status_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHighFrequencyStationsAverageParameterMeasurementsComplete)
                .catch(getHighFrequencyStationsAverageParameterMeasurementsFailed);
                
            function getHighFrequencyStationsAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyStationsAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }

        function getHighFrequencyStationsChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/status_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHighFrequencyStationsChartAverageParameterMeasurementsComplete)
                .catch(getHighFrequencyStationsChartAverageParameterMeasurementsFailed);
                
            function getHighFrequencyStationsChartAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyStationsChartAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHourlyAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_average_status_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
            }).$promise
                .then(getHourlyAverageParameterMeasurementsComplete)
                .catch(getHourlyAverageParameterMeasurementsFailed);
                
            function getHourlyAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHourlyStationsAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_stations_average_status_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
            }).$promise
                .then(getHourlyStationsAverageParameterMeasurementsComplete)
                .catch(getHourlyStationsAverageParameterMeasurementsFailed);
                
            function getHourlyStationsAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyStationsAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHourlyChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_average_status_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_date_hour: fromDateHour,
                        to_date_hour: toDateHour
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
            }).$promise
                .then(getHourlyChartAverageParameterMeasurementsComplete)
                .catch(getHourlyChartAverageParameterMeasurementsFailed);
                
            function getHourlyChartAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyChartAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHourlyStationsChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_stations_average_status_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
            }).$promise
                .then(getHourlyStationsChartAverageParameterMeasurementsComplete)
                .catch(getHourlyStationsChartAverageParameterMeasurementsFailed);
                
            function getHourlyStationsChartAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyStationsChartAverageParameterMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
    }

})();
