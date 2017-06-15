
angular.module('fishHappensApp')
	.controller('WeatherController', WeatherController);

WeatherController.$inject = ['$http'];
function WeatherController ($http) {
	let vm = this;

	let locaObject = {
		id: 0,
		current: {
			city_state: 'Select a location to retreive data'
		},
		fourDay: [],
		astronomy: {},
		moonData: {},
		currentFlow: {},
		pastWeekFlow: {},
	};

	vm.locasList = [
		locaObject,
	];

	// let latlng = "43.856501,-110.480835";

	console.log("fourday controller is working");
	//**********************************//
	//***VARIABLES FOR HTTP REQUESTS****//

	let fullCoordinates;	
	let fishSpot;

	//************************//
	//***HTTP CALLS HERE******//

	//WEATHER CALLS
	function currentWeather(){
       	$http
		.get('/api/weather/current/' + fullCoordinates)
		.then(function(response) {
			console.log("am i working still?");
			console.log("current day is: ", response);
			vm.locasList[0].current = response.data;
		});
	}
	
	function fourDayWeather(){
		$http
		.get('/api/weather/fourday/' + fullCoordinates)
		.then(function(response) {
			console.log("am i working still?");
			console.log("four day is: ", response);
			vm.locasList[0].fourDay = response.data;
		});
	}

	function astronomyWeather(){
		$http
		.get('/api/weather/astronomy/' + fullCoordinates)
		.then(function(response) {
			console.log("am i working still?");
			console.log("astronomy is: ", response);
			vm.locasList[0].astronomy = response.data;
		});
	}

	function moonData(){
		$http
		.get('/api/weather/mooncast/' + fullCoordinates)
		.then(function(response) {
			console.log("am i working still?");
			console.log("mooncast is: ", response);
		});
	}

	//STREAM CALLS
	function currentFlowCall(){
        $http
        .post('/fishspots', fishSpot)
        .then(function(response) {
          	console.log(response.data);
        });
	}

	function pastWeekFlow(){
	    $http
	    .post('/fishweek', fishSpot)
	    .then(function(response){
	        console.log(response);
	        const pastWeekFlowArray = response.data.parsedArray;
	        let chartLabel = "Data Sourced from Station: " + response.data.stationName;
	    		if (!pastWeekFlowArray) {
	    			chartLabel = "Sorry, no data available for this location";
	    		}
					Chart.defaults.global.defaultFontColor = '#fff';

					var ctx = document.getElementById("myChart");

					let myChart = new Chart(ctx, {
					    type: 'line',
					    data: {
				        labels: pastWeekFlowArray, // this array is passed in only to provide a label for each piece of 
				        // flow data, and then the labels are hidden. This is to comply with how chart.js sets up their charts
				        datasets: [{
				            label: chartLabel,
				            data: pastWeekFlowArray,
				            backgroundColor: '#cee1ff',
				            borderColor: [
				                '#3c79d8',
				            ],
				            borderWidth: 3
				        },]
					    },
					    options: {
					        scales: {
					            yAxes: [{
									    	gridLines:{
									      color:"rgb(255,255,255)",
									      zeroLineColor:"rgb(255,255,255)"
									    	},
					                ticks: {
					                    beginAtZero:false
					                }
					            }],
					            xAxes: [{
					            	display: false
					            }]
					        }
					    }
					});

	    });
	}

	//SAVE TO DATABASE

	let coordObject = {};	
	function saveLocation(){
		//console.log(typeof fullCoordinates);
		coordObject.coordinates = fullCoordinates;
		console.log(coordObject);	
		$http
		.post('/api/location/', coordObject)
		.then(function(response){
			console.log("saved: ", response);
		});
	}

	window.initMap = function(){
	    // used to hold all of the markers
	    let markerArray = [];
	    
	    //**preloaded spots when the page loads**
	    let denver = {lat: 39.7392, lng: -104.9903};
	   
	   // This is the actual map we are working off of //
	    let map = new google.maps.Map(document.getElementById('map'), {
	      zoom: 10,
	      center: denver
	    });

	    let thisWindow = new google.maps.InfoWindow({
      		content: 'Fishing Spot'
     	});

	    // Event listener for map, makes a new spot on click
	    map.addListener('click', function(e) {
	          placeMarkerAndPanTo(e.latLng, map);
	          });

		// Creates a new marker and saves it to the Marker Array //
		function placeMarkerAndPanTo(latLng, map) {
	      	let fishMarker = new google.maps.Marker({
	        	position: latLng,
	        	map: map
	    });
	    markerArray.push(fishMarker);

	    //**Custom info window for making new spot**
		let newSpotForm = new google.maps.InfoWindow({
	        content: "<form>" +
	                  "Spot Name:" + "<br>" +
	                  "<input type='text' id='spotName' name='spotName' placeholder=''>" +
	                  "<br>" +
	                  "<button id='saveSpot'>Save Spot</button>" +
	                  "<br><br>" +
	                  "</form>"
	    });

	    //**Opens new-spot form so that data can be pulled from form**
	    newSpotForm.open(map, fishMarker);
	 
	    fishSpot = {
		    lat: fishMarker.position.lat(),
		    lng: fishMarker.position.lng()
	    };
	       
		fullCoordinates = (fishSpot.lat + ',' + fishSpot.lng);
		   console.log(fullCoordinates);

		$('#saveSpot').click(function(e){
			e.preventDefault();
			saveLocation();
		});

		//CLICK CALLS*********   
		   currentWeather();
		   fourDayWeather();
		   // astronomyWeather();
		   moonData();
		   currentFlowCall();
		   pastWeekFlow();

		//*********************

		}//close place marker
	};//close initmap
	window.initMap();	
} //close weather WeatherController
