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
            getParametersAllMeasurementTypes: getParametersAllMeasurementTypes,
            getParametersAllMeasurementTypesList: getParametersAllMeasurementTypesList,
            getStationList: getStationList,
            getStations: getStations,
            getStatusParameters: getStatusParameters,
            getWebcamPhotoList: getWebcamPhotoList,
            setLastWebcamPhoto: setLastWebcamPhoto,
            setLiveWebcamList: setLiveWebcamList,
            setLocation: setLocation,
            setParametersAllMeasurementTypesList: setParametersAllMeasurementTypesList,
            setParametersAllMeasurementTypes: setParametersAllMeasurementTypes,
            //setParameters: setParameters,
            setStationList: setStationList,
            setStations: setStations,
            setStatusParameters: setStatusParameters,
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
        
        function getParametersAllMeasurementTypes() {
            return parametersAllMeasurementTypes;
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
        
        //function setParameters(data) {
        //    var tempParameters = {};
        //    for (var i = 0; i < data.length; i++) {
        //        tempParameters[data[i].parameter_id] = data[i];
        //    }
        //    parameters = tempParameters;
        //}
        
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
