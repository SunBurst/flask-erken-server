(function() {
    
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationDataStorage', locationDataStorage);

    function locationDataStorage() {
        
        var parameterSelection = {};
        
        return {
            getParameterSelection: getParameterSelection,
            setParameterSelection: setParameterSelection
        };
        
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
        
    }
    
})();
