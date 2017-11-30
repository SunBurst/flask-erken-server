(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationCamsAndPhotosVideosCtrl', StationCamsAndPhotosVideosCtrl);
    
    StationCamsAndPhotosVideosCtrl.$inject = ['$q', '$timeout', 'ngYoutubeEmbedService', 'stationStorage', 'stationVideos'];
    
    function StationCamsAndPhotosVideosCtrl($q, $timeout, ngYoutubeEmbedService, stationStorage, stationVideos) {
        var vm = this;
        vm.station = stationStorage.getStation();
        
        activate();
        
        function getVideosTimeRange() {
            var limit = 1;
            var promises = {
                firstRowResource: stationVideos.getVideoUrlsAscendingByLimit(vm.station.id, limit),
                lastRowResource: stationVideos.getVideoUrlsDescendingByLimit(vm.station.id, limit)
            };
            return $q.all(promises).then(function(response) {
                return response;
            });
        }
        
        function initVideosTimeRange() {
            return getVideosTimeRange().then(function(response) {
                var obj = {
                    firstTimestamp: null,
                    lastTimestamp: null
                };
                if (Array.isArray(response.firstRowResource.data) || response.firstRowResource.data.length) {
                    obj.firstTimestamp = response.firstRowResource.data[0].added_date;
                }
                if (Array.isArray(response.lastRowResource.data) || response.lastRowResource.data.length) {
                    obj.lastTimestamp = response.lastRowResource.data[0].added_date;
                }
                return obj;
            });
        }
        
        function VideoItems(stationId, firstTimestamp, lastTimestamp) {
            this.stationId = stationId;
            this.busy = false;
            this.lowerMomentLimit = moment(firstTimestamp);
            this.upperMomentLimit = moment(lastTimestamp);
            this.fromMoment = moment(lastTimestamp).subtract(30, 'days');
            this.toMoment = moment(lastTimestamp);
            this.items = [];
            this.fetchMoreItems_();
        }
        
        VideoItems.prototype.getVideoUrls = function() {
            var fromTimestamp = this.fromMoment.valueOf();
            var toTimestamp = this.toMoment.valueOf();
            return stationVideos.getVideoUrls(this.stationId, fromTimestamp, toTimestamp)
                .then(function(response) {
                    return response.data;
                });
        };

        VideoItems.prototype.getItemAtIndex = function(index) {
            if (index > this.items.length) {
                this.fetchMoreItems_();
                return null;
            }
            
            return this.items[index];
        };
            
        VideoItems.prototype.getLength = function() {
            return this.items.length + 5;
        };
            
        VideoItems.prototype.noVideos = function() {
            if (this.items.length == 0) {
                return true;
            }
            return false;
        };
            
        VideoItems.prototype.fetchMoreItems_ = function() {
            if (this.busy) return;
            this.busy = true;
            this.getVideoUrls().then(angular.bind(this, function(data) {
                for (var i = 0; i < data.length; i++) {
                    this.items.push(data[i]);
                }
                
                var tempToMoment = (this.toMoment.clone()).subtract(30, 'days');
                var tempFromMoment = (this.fromMoment.clone()).subtract(30, 'days');
                
                if (tempToMoment.isBefore(this.lowerMomentLimit)) {
                    this.toMoment = this.lowerMomentLimit.clone();
                }
                else {
                    this.toMoment = tempToMoment;
                }
                if (tempFromMoment.isBefore(this.lowerMomentLimit)) {
                    this.fromMoment = this.lowerMomentLimit.clone();
                }
                else {
                    this.fromMoment = tempFromMoment;
                }
                
                this.busy = false;
            }));
        
          };
          
        function activate() {
            initVideosTimeRange().then(function(obj) {
                vm.videos = new VideoItems(vm.station.id, obj.firstTimestamp, obj.lastTimestamp);
            });
        }

    }
    
})();
