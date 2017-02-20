(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('activeLocationDataFactory', activeLocationDataFactory);

    function activeLocationDataFactory() {

        var messages = {};

        messages.list = [];

        messages.add = function(message){
        messages.list.push({id: messages.list.length, text: message});
        };

        return messages;
        
        
        return {
            activeLocationParametersSelection: [],
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
