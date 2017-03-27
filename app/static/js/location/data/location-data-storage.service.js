(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationDataStorage', locationDataStorage);

    function locationDataStorage() {
        
        var parameterSelection = {};
        
        return {
            getParameterSelectedValue: getParameterSelectedValue,
            getParameterSelection: getParameterSelection,
            setParameterSelectedValue: setParameterSelectedValue,
            setParameterSelection: setParameterSelection
        };
        
        function getParameterSelectedValue(parameterId) {
            return parameterSelection[parameterId];
        }
        
        function getParameterSelection() {
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
        
        function setParameterSelectedValue(parameterId, newValue) {
            parameterSelection[parameterId] = newValue;
        }
        
    }
    
})();
