angular.module('app.services', [])
.factory('Measurements', function($resource) {
    return {
        daily_average_parameter_measurements_by_location: $resource('/api/daily_average_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_date/:to_date/', {}, {
            query: { 
                method: 'GET', params: {
                    location_id: '@location_id', 
                    parameter_id: '@parameter_id', 
                    qc_level: '@qc_level', 
                    from_date: '@from_date',
                    to_date: '@to_date'
                }, 
                isArray: true,
                interceptor: {
                    response: function(response) {
                        return response;
                    } 
                }
            }
        }),
        daily_average_parameter_measurements_by_location_chart: $resource('/api/daily_average_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date/:to_date/', {}, {
            query: { 
                method: 'GET', params: {
                    location_id: '@location_id', 
                    parameter_id: '@parameter_id', 
                    qc_level: '@qc_level', 
                    from_date: '@from_date',
                    to_date: '@to_date'
                }, 
                isArray: false,
                interceptor: {
                    response: function(response) {
                        return response;
                    } 
                }
            }
        }),
        daily_stations_average_parameter_measurements_by_location: $resource('/api/daily_stations_average_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:from_date/:to_date/', {}, {
            query: { 
                method: 'GET', params: {
                    location_id: '@location_id', 
                    parameter_id: '@parameter_id', 
                    qc_level: '@qc_level', 
                    from_date: '@from_date',
                    to_date: '@to_date'
                }, 
                isArray: true,
                interceptor: {
                    response: function(response) {
                        return response;
                    } 
                }
            }
        }),
        daily_stations_average_parameter_measurements_by_location_chart: $resource('/api/daily_stations_average_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:from_date/:to_date/', {}, {
            query: { 
                method: 'GET', params: {
                    location_id: '@location_id', 
                    parameter_id: '@parameter_id', 
                    qc_level: '@qc_level', 
                    from_date: '@from_date',
                    to_date: '@to_date'
                }, 
                isArray: true,
                interceptor: {
                    response: function(response) {
                        return response;
                    } 
                }
            }
        }),
        hourly_parameter_measurements_by_location: $resource('/api/hourly_parameter_measurements_by_location/:location_id/:parameter_id/:qc_level/:year/:from_date_hour/:to_date_hour/', {}, {
            query: { method: 'GET', params: {
                location_id: '@location_id', 
                parameter_id: '@parameter_id', 
                qc_level: '@qc_level', 
                year: '@year',
                from_date_hour: '@from_date_hour',
                to_date_hour: '@to_date_hour'
            }, isArray: true }
        }),
        hourly_parameter_measurements_by_location_chart: $resource('/api/hourly_parameter_measurements_by_location_chart/:location_id/:parameter_id/:qc_level/:year/:from_date_hour/:to_date_hour/', {}, {
        query: { method: 'GET', params: {
            location_id: '@location_id', 
            parameter_id: '@parameter_id', 
            qc_level: '@qc_level', 
            year: '@year',
            from_date_hour: '@from_date_hour',
            to_date_hour: '@to_date_hour'
        }, isArray: true }
    })
};
});
