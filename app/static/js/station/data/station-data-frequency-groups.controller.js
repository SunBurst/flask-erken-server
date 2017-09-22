(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataGroupsCtrl', StationDataGroupsCtrl);
    
    
    StationDataGroupsCtrl.$inject = [
        '_station', '_groupList', '_groups'
    ];
    
    function StationDataGroupsCtrl(_station, _groupList, _groups) {
        var vm = this;
        
        vm.station = _station;
        vm.groupList = _groupList;
        vm.groups = _groups;

    }
    
})();
