(function() {    
    'use strict';
    
    angular
        .module('app.services')
        .filter('trustAsResourceUrl', TrustAsResourceUrl);
    
    TrustAsResourceUrl.$inject = ['$sce'];
    
    function TrustAsResourceUrl($sce){
        return function(url) {
            var notUrl = !(url);
            if (notUrl) {
                return;
            }
            var ID = '';
            url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            if(url[2] !== undefined) {
                ID = url[2].split(/[^0-9a-z_\-]/i);
                ID = ID[0];
            }
            else {
                ID = url;
            }
            return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + ID);
        };
    }

})();
