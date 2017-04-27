(function() {
    'use-strict';
    
    angular
        .module('app.station')
        .factory('stationDataStorage', stationDataStorage);

    function stationDataStorage() {
        
        var parametersAllMeasurementTypesSelection = {};
        
        return {
            getParameterSelectedValue: getParameterSelectedValue,
            getParametersAllMeasurementTypesSelection: getParametersAllMeasurementTypesSelection,
            setParameterSelectedValue: setParameterSelectedValue,
            setParametersAllMeasurementTypesSelection: setParametersAllMeasurementTypesSelection,
            updateParametersAllMeasurementTypesSelection: updateParametersAllMeasurementTypesSelection
        };
        
        function getParameterSelectedValue(parameterId, measurementTypeId) {
            return parametersAllMeasurementTypesSelection[parameterId][measurementTypeId];
        }
        
        function getParametersAllMeasurementTypesSelection() {
            return parametersAllMeasurementTypesSelection;
        }
        
        function setParametersAllMeasurementTypesSelection(data) {

            var tempSelection = [];

            for (var i = 0; i < data.length; i++) {
                tempDataEntry = angular.copy(data[i]);
                tempDataEntry['selected'] = false;
                tempSelection.push(tempDataEntry);
                
            }
            parametersAllMeasurementTypesSelection = tempSelection;

            return parametersAllMeasurementTypesSelection;

        }
        
        function setParameterSelectedValue(parameterId, measurementTypeId, newValue) {
            parametersAllMeasurementTypesSelection[parameterId][measurementTypeId] = newValue;
        }
        
        function updateParametersAllMeasurementTypesSelection(newData) {
            parametersAllMeasurementTypesSelection = angular.copy(newData);
        }
        
    }
    
})();
