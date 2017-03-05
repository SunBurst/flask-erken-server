(function() {
    
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationStatusStorage', locationStatusStorage);

    function locationStatusStorage() {
        
        var statusParameterSelection = {};
        
        return {
            getStatusParameterSelectedValue: getStatusParameterSelectedValue,
            getStatusParameterSelection: getStatusParameterSelection,
            setStatusParameterSelectedValue: setStatusParameterSelectedValue,
            setStatusParameterSelection: setStatusParameterSelection
        };
        
        function getStatusParameterSelectedValue(parameterId) {
            return statusParameterSelection[parameterId];
        }
        
        function getStatusParameterSelection() {
            return statusParameterSelection;
        }
        
        function setStatusParameterSelection(data) {
            var tempSelection = {};
            for (var i = 0; i < data.length; i++) {
                var parameterId = data[i].parameter_id;
                tempSelection[parameterId] = false;
                
            }
            statusParameterSelection = tempSelection;
        
            return statusParameterSelection;

        }
        
        function setStatusParameterSelectedValue(parameterId, newValue) {
            statusParameterSelection[parameterId] = newValue;
        }
        
    }
    
})();
