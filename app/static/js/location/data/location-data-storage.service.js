(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationDataStorage', locationDataStorage);

    function locationDataStorage() {
        
        var parametersAllMeasurementTypesSelection = {};
        
        return {
            getParameterSelectedValue: getParameterSelectedValue,
            getParametersAllMeasurementTypesSelection: getParametersAllMeasurementTypesSelection,
            setParameterSelectedValue: setParameterSelectedValue,
            setParametersAllMeasurementTypesSelection: setParametersAllMeasurementTypesSelection
        };
        
        function getParameterSelectedValue(parameterId, measurementTypeId) {
            return parametersAllMeasurementTypesSelection[parameterId][measurementTypeId];
        }
        
        function getParametersAllMeasurementTypesSelection() {
            return parametersAllMeasurementTypesSelection;
        }
        
        function setParametersAllMeasurementTypesSelection(data) {
            var tempSelection = {};

            for (var i = 0; i < data.length; i++) {
                var parameterId = data[i].parameter_id;
                var measurementTypeId = data[i].measurement_type_id;
                var parameterNotInObject = !(parameterId in tempSelection);
                if (parameterNotInObject) {
                    tempSelection[parameterId] = {};
                }
                var measurementNotInObject = !(measurementTypeId in tempSelection[parameterId]);
                if (measurementNotInObject) {
                    tempSelection[parameterId][measurementTypeId] = false;
                }
                
                tempSelection[parameterId][measurementTypeId] = false;
                
            }
            parametersAllMeasurementTypesSelection = tempSelection;

            return parametersAllMeasurementTypesSelection;

        }
        
        //function setParameterSelection(data) {
        //    var tempSelection = {};
        //    for (var i = 0; i < data.length; i++) {
        //        var parameterId = data[i].parameter_id;
        //        tempSelection[parameterId] = false;
                
        //    }
        //    parameterSelection = tempSelection;
        
        //    return parameterSelection;

        //}
        
        function setParameterSelectedValue(parameterId, measurementTypeId, newValue) {
            parameterSelection[parameterId][measurementTypeId] = newValue;
        }
        
    }
    
})();
