(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDownloadInfoDialogController', StationDownloadInfoDialogController);
        
    StationDownloadInfoDialogController.$inject = ['$mdDialog', 'stationStorage'];
    
    function StationDownloadInfoDialogController($mdDialog, stationStorage) {
        var vm = this;
        
        vm.station = stationStorage.getStation();
        vm.cancel = cancel;
        vm.getHeader = getHeader;
        vm.hide = hide;
        vm.isChecked = isChecked;
        vm.prepareCSVExport = prepareCSVExport;
        vm.toggleAll = toggleAll;
        
        vm.selectedInfoFields = {
            'ID': {
                selected: false
            },
            'Name': {
                selected: false
            },
            'Environment Category': {
                selected: false
            },
            'Position (WGS84)': {
                selected: false
            },
            'Short Description': {
                selected: false
            },
            'Long Description': {
                selected: false
            }
        };
        
        function cancel() {
            $mdDialog.cancel();
        };
        
        function checkAllInfoFields() {
            for (var infoField in vm.selectedInfoFields) {
               if (vm.selectedInfoFields.hasOwnProperty(infoField)) {
                    vm.selectedInfoFields[infoField].selected = true;
                }
            }
        }
        
        function getHeader() {
            var header = [];
            for (var infoField in vm.selectedInfoFields) {
                if (vm.selectedInfoFields.hasOwnProperty(infoField)) {
                    if (vm.selectedInfoFields[infoField].selected) {
                        header.push(infoField);
                    }
                }
            }
            return header;
        }
        
        function hide() {
            $mdDialog.hide();
        };

        function isChecked() {
            var selectedLength = selectedInfoFieldsLength();
            var totalLength = selectedInfoFieldsTotalLength();

            return selectedLength === totalLength;
        };

        function isIndeterminate() {
            var selectedLength = selectedInfoFieldsLength();
            var totalLength = selectedInfoFieldsTotalLength();
            return (selectedLength !== 0 &&
                selectedLength !== totalLength);
        };
        
        function prepareCSVExport() {
            var dataExport = [{}];
            var header = getHeader();
            
            for (var i = 0; i < header.length; i++) {
                var infoField = header[i];
                var value = undefined;
                if (infoField === 'ID') {
                    value = vm.station.id;
                }
                else if (infoField === 'Name') {
                    value = vm.station.name;
                }
                else if (infoField === 'Environment Category') {
                    value = vm.station.environment_category;
                }
                else if (infoField === 'Position (WGS84)') {
                    if (vm.station.position) {
                        if (vm.station.position.latitude) {
                            value = vm.station.position.latitude;
                        }
                        if (vm.station.position.longitude) {
                            value += ', ' + vm.station.position.longitude;
                        }
                    }
                }
                else if (infoField === 'Short Description') {
                    if (vm.station.description) {
                        if (vm.station.description.short_description) {
                            value = vm.station.description.short_description;
                        }
                    }
                }
                else if (infoField === 'Long Description') {
                    if (vm.station.description) {
                        if (vm.station.description.long_description) {
                            value = vm.station.description.long_description;
                        }
                    }
                }
                dataExport[0][infoField] = value;
            }
            
            return dataExport;
        }
        
        function selectedInfoFieldsLength() {
            var selectedLength = 0;
            for (var infoField in vm.selectedInfoFields) {
               if (vm.selectedInfoFields.hasOwnProperty(infoField)) {
                  if (vm.selectedInfoFields[infoField].selected) {
                      selectedLength += 1;
                  }
               }
            }
            return selectedLength;
        }
        
        function selectedInfoFieldsTotalLength() {
            return Object.keys(vm.selectedInfoFields).length;
        }
        
        function toggleAll() {
            var selectedLength = selectedInfoFieldsLength();
            var totalLength = selectedInfoFieldsTotalLength();
            if (selectedLength === totalLength) {
                truncateSelectedInfoFields();
            } 
            else if (selectedLength === 0 || selectedLength > 0) {
                checkAllInfoFields();
            }
        }
        
        function toggleInfoField(infoField) {
            vm.selectedInfoFields[infoField].selected = !vm.selectedInfoFields[infoField].selected;
        }
        
        function truncateSelectedInfoFields() {
            for (var infoField in vm.selectedInfoFields) {
                if (vm.selectedInfoFields.hasOwnProperty(infoField)) {
                    vm.selectedInfoFields[infoField].selected = false;
                }
            }
        }

    }

})();
