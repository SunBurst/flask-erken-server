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
        .constant('GroupHighChartOptions', getGroupHighChartOptions())
        .constant('HeatMapOptions', getHeatMapOptions())
        .constant('HighChartOptions', getHighChartOptions())
        .constant('HighchartsDefaultOptions', getHighchartsDefaultOptions());
    
    function getHighchartsDefaultOptions() {
        return Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
    }
    
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
            boost: {
                useGPUTranslations: true
            },
            xAxis: {
                type: 'datetime',
                events: {
                    setExtremes: function(e) {
                        console.log(this);
                        if (typeof(e.rangeSelectorButton)!== 'undefined') {
                            alert('count: '+e.rangeSelectorButton.count + 'text: ' + e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
                        }
                    }
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
    
    function getGroupHighChartOptions() {
        return {
            
            title: {
                text: ''
            },
            
            charts: {
                type: 'spline',
                zoomType: 'xy'
            },
            
            navigator: {
                adaptToUpdatedData: false
            },
            
            rangeSelector: {
                buttons: [{
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 1,
                enabled: true
            },

            plotOptions: {
                series: {
                    showInNavigator: true
                }
            },
            
            scrollbar: {
                liveRedraw: false
            },
            
            xAxis: [{
                events: {
                    setExtremes: function(e) {
                        console.log(e);
                    }
                },
                type: 'datetime'
            }],
            
            yAxis: [],
            
            series: []
        
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
            boost: {
                useGPUTranslations: true
            },
            xAxis: {
                type: 'datetime'
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
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'bottom',
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
            credits: {
                enabled: false
            }
        };
    }

})();
