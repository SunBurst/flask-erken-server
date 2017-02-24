(function() {
    
    'use strict';
    
    angular
        .module('app.location')
        .controller('Location', Location);
    
    Location.$inject = ['locationStorage'];
    
    function Location(locationStorage) {
        var vm = this;

        vm.activeTab = 'location-overview';
        vm.changeTabContent = changeTabContent;
        vm.isSet = isSet;
        vm.location = locationStorage.getLocation();
        
        function changeTabContent(tabId) {
            vm.activeTab = tabId;
        };
        
        function isSet(tabId) {
            return vm.activeTab === tabId;
        };

    }
    
})();
