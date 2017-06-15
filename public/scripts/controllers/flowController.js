angular.module('fishHappensApp')
	.controller('FlowController', FlowController);




function FlowController(){
	var vm = this;
	console.log('THIS IS FLOW CONTROLLER');
	var hello = 'HELLO';

	function initMap() {
	    // used to hold all of the markers
	    var markerArray = [];
	    
	    //**preloaded spots when the page loads**
	    var denver = {lat: 39.7392, lng: -104.9903};
	   
	   // This is the actual map we are working off of //
	    var map = new google.maps.Map(document.getElementById('map'), {
	      zoom: 10,
	      center: denver
	    });
	}

}

