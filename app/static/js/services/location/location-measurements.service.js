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
            getDailyChartAverageParameterMeasurements: getDailyChartAverageParameterMeasurements
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
                .catch(getDailyChartAverageParameterMeasurementsCompleteFailed);
                
            function getDailyChartAverageParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyChartAverageParameterMeasurementsCompleteFailed(error) {
                console.log(error);
            }

        }
        
    }

})();
