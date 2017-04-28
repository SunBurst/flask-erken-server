(function() {    
    'use-strict';
    
    angular
        .module('app.station')
        .factory('stationStorage', stationStorage);

    function stationStorage() {
        
        var parametersAllMeasurementTypeList = [];
        var parametersAllMeasurementTypes = {};
        var station = {};
        var sensorList = [];
        var sensors = {};
        
        return {
            getLiveWebcamList: getLiveWebcamList,
            getParametersAllMeasurementTypes: getParametersAllMeasurementTypes,
            getParametersAllMeasurementTypesList: getParametersAllMeasurementTypesList,
            getStation: getStation,
            getSensorList: getSensorList,
            getSensors: getSensors,
            setLiveWebcamList: setLiveWebcamList,
            setParametersAllMeasurementTypes: setParametersAllMeasurementTypes,
            setParametersAllMeasurementTypesList: setParametersAllMeasurementTypesList,
            setStation: setStation,
            setSensorList: setSensorList,
            setSensors: setSensors
        };
        
        function getLiveWebcamList() {
            return liveWebcamList;
        }
        
        function getParametersAllMeasurementTypes() {
            return parametersAllMeasurementTypes;
        }
        
        function getParametersAllMeasurementTypesList() {
            return parametersAllMeasurementTypeList;
        }
        
        function getStation() {
            return station;
        }
        
        function getSensorList() {
            return sensorList;
        }
        
        function getSensors() {
            return sensors;
        }
        
        function setLiveWebcamList(newLiveWebcams) {
            liveWebcamList = newLiveWebcams;
        }
        
        function setParametersAllMeasurementTypesList(data, initObjects) {
            parametersAllMeasurementTypesList = data;
            if (initObjects) {
                setParametersAllMeasurementTypes(data);
            }
        }
        
        function setParametersAllMeasurementTypes(data) {
            var tempParametersAllMeasurementTypes = {};
            for (var i = 0; i < data.length; i++) {
                var parameterId = data[i].parameter_id;
                var measurementTypeId = data[i].measurement_type_id;
                var parameterNotInObject = !(parameterId in tempParametersAllMeasurementTypes);
                if (parameterNotInObject) {
                    tempParametersAllMeasurementTypes[parameterId] = {};
                }
                var measurementTypeNotInObject = !(measurementTypeId in tempParametersAllMeasurementTypes[parameterId]);
                if (measurementTypeNotInObject) {
                    tempParametersAllMeasurementTypes[parameterId][measurementTypeId] = {};
                }
                tempParametersAllMeasurementTypes[parameterId][measurementTypeId] = data[i];
            }
            parametersAllMeasurementTypes = tempParametersAllMeasurementTypes;
        }
        
        function setStation(data) {
            station = data;
        }
        
        function setSensorList(data, initObjects) {
            sensorList = data;
            if (initObjects) {
                setSensors(data);
            }
        }
        
        function setSensors(data) {
            var tempSensors = {};
            for (var i = 0; i < data.length; i++) {
                tempSensors[data[i].sensor_id] = data[i];
            }
            sensors = tempSensors; 
        }
    
    }

})();
