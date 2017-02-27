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
            getDailyChartAverageParameterMeasurements: getDailyChartAverageParameterMeasurements,
            getDailyStationsChartAverageParameterMeasurements: getDailyStationsChartAverageParameterMeasurements,
            getHighFrequencyChartAverageParameterMeasurements: getHighFrequencyChartAverageParameterMeasurements,
            getHourlyChartAverageParameterMeasurements: getHourlyChartAverageParameterMeasurements,
            getHourlyStationsChartAverageParameterMeasurements: getHourlyStationsChartAverageParameterMeasurements
        };
        
        function getDailyChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDate, toDate) {
            var resource = $resource('/api/daily_average_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date/:to_date', {}, {
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
        
        function getHighFrequencyChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            
        }
        
        function getHourlyChartAverageParameterMeasurements(locationId, parameterId, qcLevel, fromDateHour, toDateHour) {
            var resource = $resource('/api/hourly_average_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date_hour/:to_date_hour', {}, {
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
        
    }

})();
