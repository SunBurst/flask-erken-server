(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('activeLocationDataChartsFactory', activeLocationDataChartsFactory);

    activeLocationDataChartsFactory.$inject = ['activeLocation', 'HighChartOptions'];

    function activeLocationDataChartsFactory(activeLocation, HighChartOptions) {
        
        var activeLocationParametersChartsLookup = {};
        
        return {
            getActiveLocationParametersChartsLookup: getActiveLocationParametersChartsLookup,
            setActiveLocationParametersChartsLookup: setActiveLocationParametersChartsLookup
        };
        
        function getActiveLocationParametersChartsLookup() {
            return activeLocationParametersChartsLookup;
        }
        
        function setActiveLocationParametersChartsLookup(newParameters) {
            activeLocationParametersCharts = {};
            for (var i = 0; i < newParameters.length; i++) {
                var parameterEntry = newParameters[i];
                parameterEntry['charts'] = {
                    'locationAvgChart': HighChartOptions,
                    'stationsAvgChart': HighChartOptions
                };
                activeLocationParametersCharts[newParameters[i].parameter_id] = parameterEntry;
            }
        }
        
    }

})();
