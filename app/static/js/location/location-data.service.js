(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('activeLocationDataFactory', activeLocationDataFactory);

    function activeLocationDataFactory() {
        
        var activeLocationParametersSelection = [];
        
        return {
            getActiveLocationParametersSelection: getActiveLocationParametersSelection,
            setActiveLocationParametersSelection: setActiveLocationParametersSelection
        };
        
        function getActiveLocationParametersSelection() {
            return activeLocationParametersSelection;
        }
        
        function setActiveLocationParametersSelection(newParameters) {
            activeLocationParametersSelection = [];
            for (var i = 0; i < newParameters.length; i++) {
                var parameterSelectionEntry = newParameters[i];
                parameterSelectionEntry.selected = false;
                activeLocationParametersSelection.push(parameterSelectionEntry);
            }
            
        }
    }
    
})();
