(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('stationVideosInifiniteScrolling', stationVideosInifiniteScrolling);
    
    stationVideosInifiniteScrolling.$inject = ['$q', 'stationVideos'];
    
    function stationVideosInifiniteScrolling($q, stationVideos) {
        var stationVideosInifiniteScrolling = function(stationId) {
            this.stationId = stationId;
            this.videoUrls = [];
            this.startDate = null;
            this.endDate = null;
            this.fromDate = null;
            this.toDate = null;
            this.busy = false;
        };

        stationVideosInifiniteScrolling.prototype.loadVideos = function() {
            console.log("loadVideos");
            console.log("this.busy is ", this.busy);
            if (this.busy) return;
            this.busy = true;

            var tempFromDate = this.toDate.clone().subtract(30, 'days');
            if (tempFromDate.isBefore(this.startDate)) {
                this.fromDate = startDate.clone();
            }
            else {
                this.fromDate = tempFromDate;
            }
            
            this.getVideoUrls().then(function(data) {
                this.videoUrls.push.apply(this.videoUrls, data);
                this.busy = false;
                console.log("this.busy is ", this.busy);
            }.bind(this));
        };
        
        stationVideosInifiniteScrolling.prototype.noVideos = function() {
            if (this.videoUrls.length == 0) {
                return true;
            }
            return false;
        };
        
        stationVideosInifiniteScrolling.prototype.getVideosTimeRange = function() {
            var limit = 1;
            var promises = {
                firstRowResource: stationVideos.getVideoUrlsAscendingByLimit(this.stationId, limit),
                lastRowResource: stationVideos.getVideoUrlsDescendingByLimit(this.stationId, limit)
            };
            return $q.all(promises).then(function(response) {
                return response;
            });
        };
        
        stationVideosInifiniteScrolling.prototype.isBusy = function() {
            if (this.busy) return true;
            return false;
        };
        
        stationVideosInifiniteScrolling.prototype.initVideosTimeRange = function() {
            console.log("init");
            console.log("this.busy is ", this.busy);
            if (this.busy) return;
            this.busy = true;
            return this.getVideosTimeRange().then(function(response) {
                if (Array.isArray(response.firstRowResource.data) || response.firstRowResource.data.length) {
                    this.startDate = response.firstRowResource.data[0].added_date;
                    this.fromDate = moment(this.startDate);
                }
                if (Array.isArray(response.lastRowResource.data) || response.lastRowResource.data.length) {
                    this.endDate = response.lastRowResource.data[0].added_date;
                    this.toDate = moment(this.endDate);
                }
                this.busy = false;
                console.log("this.busy is ", this.busy);
                return response;
            }.bind(this));
        };
        
        stationVideosInifiniteScrolling.prototype.appendVideoUrls = function() {
            console.log("append");
            console.log("this.busy is ", this.busy);
            if (this.busy) return;
            this.busy = true;
            var tempFromDate = this.toDate.clone().subtract(30, 'days');
            if (tempFromDate.isBefore(this.startDate)) {
                this.fromDate = this.startDate.clone();
            }
            else {
                this.fromDate = tempFromDate;
            }
            
            return this.getVideoUrls().then(function(data) {
                this.videoUrls.push.apply(this.videoUrls, data);
                this.busy = false;
                console.log("this.busy is ", this.busy);
                return data;
            }.bind(this));
        };
        
        stationVideosInifiniteScrolling.prototype.getVideoUrls = function(stationId) {
            var fromTimestamp = this.fromDate.valueOf();
            var toTimestamp = this.toDate.valueOf();
            return stationVideos.getVideoUrls(this.stationId, fromTimestamp, toTimestamp)
                .then(function(response) {
                    return response.data;
                });
        };
        
      return stationVideosInifiniteScrolling;
    }
    
})();
