angular.module('fishHappensApp')
	.controller('SpotController', SpotController);

SpotController.$inject = ['$http'];
function SpotController ($http) {
	let vm = this;
	console.log("spot controller working");
	vm.locations = {};
	vm.saveSpots = [];
	vm.getSpots = {};

	vm.loca = [{
		id: "Secret Id",
		current: {
			city_state: 'Click a location\'s Data button'
		},
		fourDay: [],
		astronomy: {},
		moonData: {},
		currentFlow: {},
		pastWeekFlow: {},
	}];

	$http
	.get('/api/location')
	.then(function (response) {
		console.log(response);
		vm.locations = response.data;
		vm.locations.forEach(function(spots) {
			//vm.saveSpots.push(spots);
			//console.log(spots.coordinates);
			//currentWeather(spots);
		});
	});

	function currentWeather(spots){
		console.log("SPOTS.COORDINATES");
		console.log(spots.coordinates);
		const latlong = spots.coordinates + "";
       	$http
		.get('/api/weather/current/' + latlong)
		.then(function(response) {
			//console.log("am i working still?");
			console.log("current days from db are: ", response);
			vm.loca[0].current = response.data;
			//vm.locasList[0].current = response.data;
		},console.log("ERROR"));
	}

	function fourDayWeather(spots){
		$http
		.get('/api/weather/fourday/' + spots.coordinates)
		.then(function(response) {
			console.log("am i working still?");
			console.log("four day is: ", response);
			vm.loca[0].fourDay = response.data;
		});
	}

	vm.getData = getData;
	function getData(places){
		console.log("data button clicked");
		console.log(places);
		currentWeather(places);
		fourDayWeather(places);
	}

	vm.deleteLocation = deleteLocation;
	function deleteLocation(places){
		console.log("deletebutton clicked");
		console.log(places.id);
		//var index = vm.locations.indexOf(places);
		// console.log(index);
		// vm.locations.splice(index, 1);
		$http
		.delete('/api/location/' + places.id)
		.then(function(response) {
			var index = vm.locations.indexOf(places);
			console.log(index);
			vm.locations.splice(index, 1);
		});
	}
}//close SpotController

