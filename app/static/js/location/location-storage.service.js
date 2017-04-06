(function() {    
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationStorage', locationStorage);

    function locationStorage() {
        
        var lastWebcamPhoto;
        var liveWebcamList = [];
        var location = {};
        var parametersAllMeasurementTypeList = [];
        var parametersAllMeasurementTypes = {};
        var stationList = [];
        var stations = {};
        var statusParameters = {};
        var statusParmeterlist = [];
        var webcamPhotoList = [];
        
        return {
            getLastWebcamPhoto: getLastWebcamPhoto,
            getLiveWebcamList: getLiveWebcamList,
            getLocation: getLocation,
            getparameterMeasurementTypeList: getparameterMeasurementTypeList,
            getParametersAllMeasurementTypesList: getParametersAllMeasurementTypesList,
            getStationList: getStationList,
            getStations: getStations,
            getStatusparameterMeasurementTypeList: getStatusparameterMeasurementTypeList,
            getStatusParameters: getStatusParameters,
            getWebcamPhotoList: getWebcamPhotoList,
            setLocation: setLocation,
            setLastWebcamPhoto: setLastWebcamPhoto,
            setLiveWebcamList: setLiveWebcamList,
            setParametersAllMeasurementTypesList: setParametersAllMeasurementTypesList,
            setParameters: setParameters,
            setStationList: setStationList,
            setStatusparameterMeasurementTypeList: setStatusparameterMeasurementTypeList,
            setStatusParameters: setStatusParameters,
            setStations: setStations,
            setWebcamPhotosList: setWebcamPhotosList
        };
        
        function getLastWebcamPhoto() {
            return lastWebcamPhoto;
        }
        
        function getLiveWebcamList() {
            return liveWebcamList;
        }
        
        function getLocation() {
            return location;
        }
        
        function getParametersAllMeasurementTypesList() {
            return parametersAllMeasurementTypeList;
        }
        
        function getStationList() {
            return stationList;
        }
        
        function getStations() {
            return stations;
        }
        
        function getParametersAllMeasurementTypesList() {
            return statusparameterMeasurementTypesList;
        }
        
        function getStatusParameters() {
            return statusParameters;
        }
        
        function getWebcamPhotoList() {
            return webcamPhotoList;
        }
        
        function setLastWebcamPhoto(data) {
            lastWebcamPhoto = data;
        }
        
        function setLiveWebcamList(newLiveWebcams) {
            liveWebcamList = newLiveWebcams;
        }
        
        function setLocation(data) {
            location = data;
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
                var parameterNotInObject = !(data[i].parameter_id in tempParametersAllMeasurementTypes);
                if (parameterNotInObject) {
                    tempParametersAllMeasurementTypes[data[i].parameter_id] = null;
                }
                var measurementTypeNotInObject = !(data[i].measurement_type_id in tempParametersAllMeasurementTypes[data[i].parameter_id]);
                if (measurementTypeNotInObject) {
                    tempParametersAllMeasurementTypes[data[i].parameter_id][data[i].measurement_type_id] = null;
                }
                tempParametersAllMeasurementTypes[data[i].parameter_id][data[i].measurement_type] = data[i];
            }
            parametersAllMeasurementTypes = tempParametersAllMeasurementTypes;
        }
        
        function setParameters(data) {
            var tempParameters = {};
            for (var i = 0; i < data.length; i++) {
                tempParameters[data[i].parameter_id] = data[i];
            }
            parameters = tempParameters;
        }
        
        function setStationList(data, initObjects) {
            stationList = data;
            if (initObjects) {
                setStations(data);
            }
        }
        
        function setStations(data) {
            var tempStations = {};
            for (var i = 0; i < data.length; i++) {
                tempStations[data[i].station_id] = data[i];
            }
            stations = tempStations; 
        }
        
        function setStatusparameterMeasurementTypeList(data, initObjects) {
            statusparameterMeasurementTypeList = data;
            if (initObjects) {
                setStatusParameters(data);
            }
        }
        
        function setStatusParameters(data) {
            var tempParameters = {};
            for (var i = 0; i < data.length; i++) {
                tempParameters[data[i].parameter_id] = data[i];
            }
            statusParameters = tempParameters;
        }
        
        function setWebcamPhotosList(data) {
            webcamPhotoList = data;
        }
    
    }

})();
