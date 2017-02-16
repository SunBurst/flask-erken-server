(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('Location', Location);
    
    Location.$inject = ['activeLocation'];
    
    function Location(activeLocation) {
        var vm = this;

        vm.activeTab = 'location-overview';
        vm.changeTabContent = changeTabContent;
        vm.isSet = isSet;
        vm.location = activeLocation.getActiveLocation();
        
        function changeTabContent(tabId) {
            vm.activeTab = tabId;
        };
        
        function isSet(tabId) {
            return vm.activeTab === tabId;
        };

    }
    
})();
