(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('stationGroupMeasurements', stationGroupMeasurements);
    
    stationGroupMeasurements.$inject = ['$resource'];
    
    function stationGroupMeasurements($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            
            getDynamicGroupMeasurementsChart: getDynamicGroupMeasurementsChart,
            getDynamicGroupMeasurementsTimeGrouped: getDynamicGroupMeasurementsTimeGrouped,
            getDailyGroupMeasurementsChart: getDailyGroupMeasurementsChart,            
            getDailyGroupMeasurementsTimeGrouped: getDailyGroupMeasurementsTimeGrouped,
            getFiveMinGroupMeasurementsChart: getFiveMinGroupMeasurementsChart,
            getFiveMinGroupMeasurementsTimeGrouped: getFiveMinGroupMeasurementsTimeGrouped,
            getHourlyGroupMeasurementsChart: getHourlyGroupMeasurementsChart,
            getHourlyGroupMeasurementsTimeGrouped: getHourlyGroupMeasurementsTimeGrouped,
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
        
        function getDynamicGroupMeasurementsChart(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/dynamic_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId,
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
        
        function getDynamicGroupMeasurementsTimeGrouped(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/dynamic_group_measurements_by_station_time_grouped/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getGroupMeasurementsTimeGroupedComplete)
                .catch(getGroupMeasurementsTimeGroupedFailed);
                
            function getGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyGroupMeasurementsChart(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
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
        
        function getDailyGroupMeasurements(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_group_measurements_by_station/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDailyGroupMeasurementsComplete)
                .catch(getDailyGroupMeasurementsFailed);
                
            function getDailyGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyGroupMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyGroupMeasurementsTimeGrouped(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/daily_group_measurements_by_station_time_grouped/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getDailyGroupMeasurementsTimeGroupedComplete)
                .catch(getDailyGroupMeasurementsTimeGroupedFailed);
                
            function getDailyGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getDailyGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlyGroupMeasurementsChart(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
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
        
        function getHourlyGroupMeasurementsTimeGrouped(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/hourly_group_measurements_by_station_time_grouped/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getHourlyGroupMeasurementsTimeGroupedComplete)
                .catch(getHourlyGroupMeasurementsTimeGroupedFailed);
                
            function getHourlyGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getHourlyGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinGroupMeasurementsChart(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/thirty_min_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
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
        
        function getThirtyMinGroupMeasurementsTimeGrouped(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/thirty_min_group_measurements_by_station_time_grouped/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getThirtyMinGroupMeasurementsTimeGroupedComplete)
                .catch(getThirtyMinGroupMeasurementsTimeGroupedFailed);
                
            function getThirtyMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getThirtyMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinGroupMeasurementsChart(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/twenty_min_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
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
        
        function getTwentyMinGroupMeasurementsTimeGrouped(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/twenty_min_group_measurements_by_station_time_grouped/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getTwentyMinGroupMeasurementsTimeGroupedComplete)
                .catch(getTwentyMinGroupMeasurementsTimeGroupedFailed);
                
            function getTwentyMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getTwentyMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFifteenMinGroupMeasurementsChart(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/fifteen_min_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
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
        
        function getFifteenMinGroupMeasurementsTimeGrouped(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/fifteen_min_group_measurements_by_station_time_grouped/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFifteenMinGroupMeasurementsTimeGroupedComplete)
                .catch(getFifteenMinGroupMeasurementsTimeGroupedFailed);
                
            function getFifteenMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getFifteenMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTenMinGroupMeasurementsChart(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/ten_min_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
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
        
        function getTenMinGroupMeasurementsTimeGrouped(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/ten_min_group_measurements_by_station_time_grouped/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getTenMinGroupMeasurementsTimeGroupedComplete)
                .catch(getTenMinGroupMeasurementsTimeGroupedFailed);
                
            function getTenMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getTenMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinGroupMeasurementsChart(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
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
        
        function getFiveMinGroupMeasurements(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_group_measurements_by_station/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFiveMinGroupMeasurementsComplete)
                .catch(getFiveMinGroupMeasurementsFailed);
                
            function getFiveMinGroupMeasurementsComplete(response) {
                return response;
            }
            
            function getFiveMinGroupMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinGroupMeasurementsTimeGrouped(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/five_min_group_measurements_by_station_time_grouped/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getFiveMinGroupMeasurementsTimeGroupedComplete)
                .catch(getFiveMinGroupMeasurementsTimeGroupedFailed);
                
            function getFiveMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getFiveMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinGroupMeasurementsChart(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_min_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
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
        
        function getOneMinGroupMeasurementsTimeGrouped(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_min_group_measurements_by_station_time_grouped/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getOneMinGroupMeasurementsTimeGroupedComplete)
                .catch(getOneMinGroupMeasurementsTimeGroupedFailed);
                
            function getOneMinGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getOneMinGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecGroupMeasurementsChart(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_sec_group_measurements_by_station_chart/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId,
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
                group_id: groupId, 
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
        
        function getOneSecGroupMeasurementsTimeGrouped(stationId, groupId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/one_sec_group_measurements_by_station_time_grouped/:station_id/:group_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
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
                .then(getOneSecGroupMeasurementsTimeGroupedComplete)
                .catch(getOneSecGroupMeasurementsTimeGroupedFailed);
                
            function getOneSecGroupMeasurementsTimeGroupedComplete(response) {
                return response;
            }
            
            function getOneSecGroupMeasurementsTimeGroupedFailed(error) {
                console.log(error);
            }
        
        }
        
    }
    
})();
