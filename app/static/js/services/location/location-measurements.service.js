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
            getDailyStationsAverageParameterGroupMeasurements: getDailyStationsAverageParameterGroupMeasurements,
            getDailyStationsAverageProfileMeasurements: getDailyStationsAverageProfileMeasurements,
            getDailyStationsChartAverageParameterGroupMeasurements: getDailyStationsChartAverageParameterGroupMeasurements,
            getDailyStationsChartAverageParameterMeasurements: getDailyStationsChartAverageParameterMeasurements,
            //High Frequency
            getHighFrequencyStationsAverageParameterMeasurements: getHighFrequencyStationsAverageParameterMeasurements,
            getHighFrequencyStationsAverageParameterGroupMeasurements: getHighFrequencyStationsAverageParameterGroupMeasurements,
            getHighFrequencyStationsAverageProfileMeasurements: getHighFrequencyStationsAverageProfileMeasurements,
            getHighFrequencyStationsChartAverageParameterGroupMeasurements: getHighFrequencyStationsChartAverageParameterGroupMeasurements,
            getHighFrequencyStationsChartAverageParameterMeasurements: getHighFrequencyStationsChartAverageParameterMeasurements,
            //Hourly
            getHourlyStationsAverageParameterMeasurements: getHourlyStationsAverageParameterMeasurements,
            getHourlyStationsAverageParameterGroupMeasurements: getHourlyStationsAverageParameterGroupMeasurements,
            getHourlyStationsAverageProfileMeasurements: getHourlyStationsAverageProfileMeasurements,
            getHourlyStationsChartAverageParameterMeasurements: getHourlyStationsChartAverageParameterMeasurements,
            getHourlyStationsChartAverageParameterGroupMeasurements: getHourlyStationsChartAverageParameterGroupMeasurements,
            getHourlyStationsChartAverageProfileMeasurements: getHourlyStationsChartAverageProfileMeasurements
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
        
        function getDailyStationsAverageParameterGroupMeasurements(locationId, groupId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_stations_average_parameter_group_measurements_by_location/:location_id/:group_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                group_id: groupId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
            }).$promise
                .then(getDailyStationsAverageParameterGroupMeasurementsComplete)
                .catch(getDailyStationsAverageParameterGroupMeasurementsFailed);
                
            function getDailyStationsAverageParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyStationsAverageParameterGroupMeasurementsFailed(error) {
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
        
        function getDailyStationsChartAverageParameterGroupMeasurements(locationId, groupId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_stations_average_parameter_group_measurements_by_location_chart/:location_id/:group_id/:qc_level/:from_date/:to_date', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                group_id: groupId, 
                qc_level: qcLevel, 
                from_date: fromDate, 
                to_date: toDate
            }).$promise
                .then(getDailyStationsChartAverageParameterGroupMeasurementsComplete)
                .catch(getDailyStationsChartAverageParameterGroupMeasurementsFailed);
                
            function getDailyStationsChartAverageParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyStationsChartAverageParameterGroupMeasurementsFailed(error) {
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
        
        function getHighFrequencyStationsAverageParameterGroupMeasurements(locationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/parameter_group_measurements_by_location/:location_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                group_id: groupId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHighFrequencyStationsAverageParameterGroupMeasurementsComplete)
                .catch(getHighFrequencyStationsAverageParameterGroupMeasurementsFailed);
                
            function getHighFrequencyStationsAverageParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyStationsAverageParameterGroupMeasurementsFailed(error) {
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
        
        function getHighFrequencyStationsChartAverageParameterGroupMeasurements(locationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/parameter_group_measurements_by_location_chart/:location_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                group_id: groupId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHighFrequencyStationsChartAverageParameterGroupMeasurementsComplete)
                .catch(getHighFrequencyStationsChartAverageParameterGroupMeasurementsFailed);
                
            function getHighFrequencyStationsChartAverageParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getHighFrequencyStationsChartAverageParameterGroupMeasurementsFailed(error) {
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
        
        function getHourlyStationsAverageParameterGroupMeasurements(locationId, groupId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_parameter_group_measurements_by_location/:location_id/:group_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                group_id: groupId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
            }).$promise
                .then(getHourlyStationsAverageParameterGroupMeasurementsComplete)
                .catch(getHourlyStationsAverageParameterGroupMeasurementsFailed);
                
            function getHourlyStationsAverageParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyStationsAverageParameterGroupMeasurementsFailed(error) {
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
        
        function getHourlyStationsChartAverageParameterGroupMeasurements(locationId, groupId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_parameter_group_measurements_by_location_chart/:location_id/:group_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
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
                location_id: locationId, 
                group_id: groupId, 
                qc_level: qcLevel, 
                from_date_hour: fromDateHour, 
                to_date_hour: toDateHour
            }).$promise
                .then(getHourlyStationsChartAverageParameterGroupMeasurementsComplete)
                .catch(getHourlyStationsChartAverageParameterGroupMeasurementsFailed);
                
            function getHourlyStationsChartAverageParameterGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyStationsChartAverageParameterGroupMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlyStationsChartAverageProfileMeasurements(locationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_stations_average_profile_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
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
