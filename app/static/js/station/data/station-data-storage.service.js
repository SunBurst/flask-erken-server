(function() {
    'use-strict';
    
    angular
        .module('app.station')
        .factory('stationDataStorage', stationDataStorage);

    function stationDataStorage() {
        
        var groupList = [];
        var groupParameterList = [];
        var groupParameters = {};
        var measurementFrequencies = {};
        var parametersAllMeasurementTypesSelection = {};
        
        return {
            getGroupList: getGroupList,
            getGroupParameterList: getGroupParameterList,
            getGroupParameters: getGroupParameters,
            getMeasurementFrequencies: getMeasurementFrequencies,
            getParameterSelectedValue: getParameterSelectedValue,
            getParametersAllMeasurementTypesSelection: getParametersAllMeasurementTypesSelection,
            setGroupList: setGroupList,
            setGroupParameterList: setGroupParameterList,
            //setGroupParameters: setGroupParameters,
            setMeasurementFrequencies: setMeasurementFrequencies,
            setParameterSelectedValue: setParameterSelectedValue,
            setParametersAllMeasurementTypesSelection: setParametersAllMeasurementTypesSelection,
            updateParametersAllMeasurementTypesSelection: updateParametersAllMeasurementTypesSelection
        };
        
        function getGroupList() {
            return groupList;
        }
        
        function getGroupParameterList() {
            return groupParameterList;
        }
        
        function getGroupParameters() {
            return groupParameters;
        }
        
        function getMeasurementFrequencies() {
            return measurementFrequencies;
        }
        
        function getParameterSelectedValue(parameterId, measurementTypeId) {
            return parametersAllMeasurementTypesSelection[parameterId][measurementTypeId];
        }
        
        function getParametersAllMeasurementTypesSelection() {
            return parametersAllMeasurementTypesSelection;
        }
        
        function setGroupList(data) {
            groupList = data;
        }
        
        function setGroupParameterList(data, initObjects) {
            console.log(data);
            groupParameterList = data;
            if (initObjects) {
                //var done = setGroupParameters(data);
            }
        }
        
        //function setGroupParameters(data) {
        //    var tempGroupParameters = {};
        //    for (var i = 0; i < data.length; i++) {
        //        var groupId = data[i].group_id;
        //       var groupNotInObject = !(groupId in tempGroupParameters);
        //        if (groupNotInObject) {
        //            tempGroupParameters[groupId] = [];
        //        }
        //        tempGroupParameters[groupId].push(data);
        //    }
        //    groupParameters = tempGroupParameters;
        //    return groupParameters;
        //}
        
        function setMeasurementFrequencies(data) {
            measurementFrequencies = data;
        }
        
        function setParametersAllMeasurementTypesSelection(data) {

            var tempSelection = [];

            for (var i = 0; i < data.length; i++) {
                tempDataEntry = angular.copy(data[i]);
                tempDataEntry['selected'] = false;
                tempSelection.push(tempDataEntry);
                
            }
            parametersAllMeasurementTypesSelection = tempSelection;

            return parametersAllMeasurementTypesSelection;

        }
        
        function setParameterSelectedValue(parameterId, measurementTypeId, newValue) {
            parametersAllMeasurementTypesSelection[parameterId][measurementTypeId] = newValue;
        }
        
        function updateParametersAllMeasurementTypesSelection(newData) {
            parametersAllMeasurementTypesSelection = angular.copy(newData);
        }
        
    }
    
})();
