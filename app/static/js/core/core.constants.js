(function() {
    'use strict';
    
    angular
        .module('app.core')
        .constant('DataTableParameterOptions', function getDataTableParameterOptions(dataSource) {
            var dataSourcesOptions = {
                'Daily': {
                    query: {
                        order: 'date',
                        limit: 5,
                        page: 1
                    }
                },
                'Hourly': {
                    query: {
                        order: 'date_hour',
                        limit: 5,
                        page: 1
                    }
                },
                'High Frequency': {
                    query: {
                        order: 'timestamp',
                        limit: 5,
                        page: 1
                    }
                }
            };
            
            return dataSourcesOptions[dataSource];
        })
        .constant('DatePickerOptions', getDatePickerOptions())
        .constant('GoogleMapClusterOptions', getGoogleMapClusterOptions())
        .constant('GoogleMapDefaultOptions', getDefaultMapOptions())
        .constant('GoogleMapIcons', getGoogleMapIcons())
        .constant('HeatMapOptions', getHeatMapOptions())
        .constant('HighChartOptions', getHighChartOptions())
        .constant('WindRoseChartOptions', getWindRoseChartOptions());

    
    
    function getDatePickerOptions() {
        return {
            applyClass: 'btn-success',
            locale: {
                applyLabel: "Apply",
                fromLabel: "From",
                format: "YYYY-MM-DD HH:mm:ss",
                toLabel: "To",
                cancelLabel: 'Cancel',
                customRangeLabel: 'Custom Range'
            }
        };
    }
    
    function getGoogleMapClusterOptions() {
        return {
            imagePath: '/static/images/google-maps/cluster/m'
        };
    }
    
    function getDefaultMapOptions() {
        return {
            scrollwheel: false, 
            mapTypeControl: true, 
            streetViewControl: false, 
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'],
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#46bcec"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        };
    }
    
    function getGoogleMapIcons() {
        return {
            blueicon: '/static/images/google-maps/icons/blue-dot.png',
            greenicon: '/static/images/google-maps/icons/green-dot.png',
            redicon: '/static/images/google-maps/icons/red-dot.png'
        };
    }
    
    function getHeatMapOptions() {
        return {
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            chart: {
                type: 'heatmap'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                reversed: true,
                labels: {
                    format: '{value:.2f}'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            colorAxis: {
                stops: [
                    [0, '#3060cf'],
                    [0.5, '#fffbbc'],
                    [0.9, '#c4463a'],
                    [1, '#c4463a']
                ],
            },
            series: [],
        };
    }
    
    function getHighChartOptions() {
        return {
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            chart: {
                type: 'spline'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    format: '{value:.2f}'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    },
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f} ' + '' + '</b><br/>',
                shared: true
            },
            series: [],
        };
    }
    
    function getWindRoseChartOptions() {
        return {
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            chart: {
                polar: true,
                type: 'column'
            },
            categories: [
                'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 
                'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
            ],
            pane: {
                size: '85%'
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                y: 100,
                layout: 'vertical'
            },
            xAxis: {
                min: 0,
                max: 360,
                type: "",
                tickInterval: 22.5,
                tickmarkPlacement: 'on',
                labels: {
                    formatter: function () {
                        return categories[this.value / 22.5] + '°';
                    }
                }
            },
            yAxis: {
                min: 0,
                endOnTick: false,
                showLastLabel: true,
                title: {
                    text: 'Frequency (%)'
                },
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                },
                reversedStacks: false
            },
            tooltip: {
                valueSuffix: '%'
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    shadow: false,
                    groupPadding: 0,
                    pointPlacement: 'on'
                }
            },
            series: [],
        };
    }

})();
