(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataParametersCtrl', StationDataParametersCtrl);
    
    StationDataParametersCtrl.$inject = [
        '_station', '_parameterList', '_parameters'
    ];
    
    function StationDataParametersCtrl(_station, _parameterList, _parameters) {
        var vm = this;
        
        vm.station = _station;
        vm.parameterList = _parameterList;
        vm.parameters = _parameters;

    }
    
})();
