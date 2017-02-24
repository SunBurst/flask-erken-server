(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataChartsParameter', LocationDataChartsParameter);
    
    LocationDataChartsParameter.$inject = [
        '$scope',
        'activeLocation', 
        'activeLocationDataSourceFactory', 
        'activeLocationDataDatePickerFactory', 
        'LocationsFactory', 
        'HighChartOptions'
    ];
    
    function LocationDataChartsParameter($scope, activeLocation, activeLocationDataSourceFactory, activeLocationDataDatePickerFactory, LocationsFactory, HighChartOptions) {
        $scope.chartParameter;
        $scope.location = activeLocation.getActiveLocation();
        
        $scope.dataSourcesModel = {
            dataSources: activeLocationDataSourceFactory.getDataSources(),
            selectedDataSource: activeLocationDataSourceFactory.getSelectedDataSource()
        };
        
        $scope.datePickerModel = {
            datePicker: activeLocationDataDatePickerFactory.datePicker,
            datePickerOptions: activeLocationDataDatePickerFactory.datePickerOptions
        };
        
        $scope.initParameter = function(parameter) {
            $scope.chartParameter = parameter;
        }
        
        $scope.initChart = function() {
            $scope.chartParameter.charts.locationAvgChart.title.text = $scope.dataSourcesModel.selectedDataSource + ' Average ' + $scope.chartParameter.parameter_name + ' at ' + $scope.location.location_name;
            $scope.chartParameter.charts.locationAvgChart.yAxis.title.text = $scope.chartParameter.parameter_name + ' (' + $scope.chartParameter.parameter_unit + ')';
        }
        
        //var vm = this;
        //vm.location = activeLocation.getActiveLocation();
        //vm.parameter;
        //vm.initChart = initChart;
        //vm.initParameter = initParameter;
        //vm.applyDataSourceChange = applyDataSourceChange;
        //vm.applyDatePickerChange = applyDatePickerChange;
        //vm.chartOptionsModel = {
        //    locationChartOptions: HighChartOptions,
        //    stationsChartOptions: HighChartOptions
        //};
        
        //vm.dataSourcesModel = {
        //    dataSources: activeLocationDataSourceFactory.getDataSources(),
        //    selectedDataSource: activeLocationDataSourceFactory.getSelectedDataSource()
        //};
        
        //vm.datePickerModel = {
        //    datePicker: activeLocationDataDatePickerFactory.datePicker,
        //    datePickerOptions: activeLocationDataDatePickerFactory.datePickerOptions
        //};
        
        //function applyDataSourceChange() {
        //    vm.dataSourcesModel.selectedDataSource = activeLocationDataSourceFactory.getSelectedDataSource()
        //    vm.initChart();
        //}
        
        //function applyDatePickerChange() {
        //    vm.chartOptionsModel.locationChartOptions.subtitle.text = vm.datePickerModel.datePicker.date.startDate.format('YYYY-MM-DD HH:mm:ss')  + ' - ' + vm.datePickerModel.datePicker.date.endDate.format('YYYY-MM-DD HH:mm:ss');
        //}
        
        //function initChart() {
        //    console.log("initializing chart with parameter ", vm.parameter.parameter_name);
        //    vm.chartOptionsModel.locationChartOptions.title.text = vm.dataSourcesModel.selectedDataSource + ' Average ' + vm.parameter.parameter_name + ' at ' + vm.location.location_name;
        //    vm.chartOptionsModel.locationChartOptions.yAxis.title.text = vm.parameter.parameter_name + ' (' + vm.parameter.parameter_unit + ')';
        //}
        
        //function initParameter(parameter) {
        //  vm.parameter = parameter;
        //    vm.initChart();
        //}
        
        //$scope.$on('dataSourceChange', function() {
        //    vm.applyDataSourceChange();
        //});
        
        //$scope.$on('datePickerChange', function() {
        //    vm.applyDatePickerChange();
        //});
        
    }
    
})();
