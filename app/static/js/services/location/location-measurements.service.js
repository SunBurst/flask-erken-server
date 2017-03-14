(function() {
    
    'use strict';
    
    angular
        .module('app.services')
        .factory('locationMeasurements', locationMeasurements);
    
    locationMeasurements.$inject = ['$resource'];
    
    function locationMeasurements($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            //Daily
            getDailyStationsAverageParameterMeasurements: getDailyStationsAverageParameterMeasurements,
            getDailyStationsAverageProfileMeasurements: getDailyStationsAverageProfileMeasurements,
            getDailyStationsChartAverageParameterMeasurements: getDailyStationsChartAverageParameterMeasurements,
            //High Frequency
            getHighFrequencyAverageParameterMeasurements: getHighFrequencyAverageParameterMeasurements,
            getHighFrequencyAverageProfileMeasurements: getHighFrequencyAverageProfileMeasurements,
            getHighFrequencyChartAverageParameterMeasurements: getHighFrequencyChartAverageParameterMeasurements,
            getHighFrequencyChartAverageProfileMeasurements: getHighFrequencyChartAverageProfileMeasurements,
            getHighFrequencyStationsAverageParameterMeasurements: getHighFrequencyStationsAverageParameterMeasurements,
            getHighFrequencyStationsAverageProfileMeasurements: getHighFrequencyStationsAverageProfileMeasurements,
            getHighFrequencyStationsChartAverageParameterMeasurements: getHighFrequencyStationsChartAverageParameterMeasurements,
            //Hourly
            getHourlyStationsAverageParameterMeasurements: getHourlyStationsAverageParameterMeasurements,
            getHourlyStationsAverageProfileMeasurements: getHourlyStationsAverageProfileMeasurements,
            getHourlyStationsChartAverageParameterMeasurements: getHourlyStationsChartAverageParameterMeasurements
        };
        
        function getDailyStationsAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_stations_average_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
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
        
        function getDailyStationsAverageProfileMeasurements(locationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_stations_average_profile_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
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
                .then(getDailyStationsAverageProfileMeasurementsComplete)
                .catch(getDailyStationsAverageProfileMeasurementsFailed);
                
            function getDailyStationsAverageProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyStationsAverageProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyStationsChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_stations_average_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
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
            var resource = $resource('/api/average_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
        
        function getHighFrequencyAverageProfileMeasurements(locationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/average_profile_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHighFrequencyAverageProfileMeasurementsComplete)
                .catch(getHighFrequencyAverageProfileMeasurementsFailed);
                
            function getHighFrequencyAverageProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyAverageProfileMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHighFrequencyChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/average_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
        
        function getHighFrequencyChartAverageProfileMeasurements(locationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/average_profile_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHighFrequencyChartAverageProfileMeasurementsComplete)
                .catch(getHighFrequencyChartAverageProfileMeasurementsFailed);
                
            function getHighFrequencyChartAverageProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyChartAverageProfileMeasurementsFailed(error) {
                console.log(error);
            }

        }
        
        function getHighFrequencyStationsAverageParameterMeasurements(locationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
        
        function getHighFrequencyStationsAverageProfileMeasurements(locationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/profile_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHighFrequencyStationsAverageProfileMeasurementsComplete)
                .catch(getHighFrequencyStationsAverageProfileMeasurementsFailed);
                
            function getHighFrequencyStationsAverageProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyStationsAverageProfileMeasurementsFailed(error) {
                console.log(error);
            }

        }

        function getHighFrequencyStationsChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
        
        function getHourlyStationsAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_stations_average_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
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
        
        function getHourlyStationsChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_stations_average_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
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
        
        function getHourlyStationsAverageProfileMeasurements(locationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_stations_average_profile_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
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
                .then(getHourlyStationsAverageProfileMeasurementsComplete)
                .catch(getHourlyStationsAverageProfileMeasurementsFailed);
                
            function getHourlyStationsAverageProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyStationsAverageProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
    }

})();
