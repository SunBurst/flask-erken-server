(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationDataStorage', locationDataStorage);

    function locationDataStorage() {
        
        var parameterSelection = {};
        
        return {
            getParameterSelectedValue: getParameterSelectedValue,
            getParametersAllMeasurementTypesSelection: getParametersAllMeasurementTypesSelection,
            setParameterSelectedValue: setParameterSelectedValue,
            setParametersAllMeasurementTypesSelection: setParametersAllMeasurementTypesSelection
        };
        
        function getParameterSelectedValue(parameterId, measurementTypeId) {
            return parameterSelection[parameterId][measurementTypeId];
        }
        
        function getParametersAllMeasurementTypesSelection() {
            return parameterSelection;
        }
        
        function setParametersAllMeasurementTypesSelection(data) {
            var tempSelection = {};
            for (var i = 0; i < data.length; i++) {
                var parameterId = data[i].parameter_id;
                var measurementTypeId = data[i].measurement_type_id;
                var parameterNotInObject = !(parameterId in tempSelection);
                var measurementNotInObject = !(measurementTypeId in tempSelection[parameterId]);
                if (parameterNotInObject) {
                    tempSelection[parameterId] = null;
                }
                if (measurementNotInObject) {
                    tempSelection[parameterId][measurementTypeId] = null;
                }
                
                tempSelection[parameterId][measurementTypeId] = false;
                
            }
            parameterSelection = tempSelection;
        
            return parameterSelection;

        }
        
        function setParameterSelection(data) {
            var tempSelection = {};
            for (var i = 0; i < data.length; i++) {
                var parameterId = data[i].parameter_id;
                tempSelection[parameterId] = false;
                
            }
            parameterSelection = tempSelection;
        
            return parameterSelection;

        }
        
        function setParameterSelectedValue(parameterId, measurementTypeId, newValue) {
            parameterSelection[parameterId][measurementTypeId] = newValue;
        }
        
    }
    
})();
