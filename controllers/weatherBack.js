'use strict'

let request = require('request');
const wKey = process.env.weatherKey;

function getFourDay (req, res) {
	let latlng = req.params.id;
	console.log(latlng);
	//request
	let url = 'http://api.wunderground.com/api/' + wKey + '/forecast/q/' + latlng + '.json';
	request (url, function (error, response, body) {
		let parseBody = JSON.parse(body);
		//console.log("four day is:", parseBody);
		let forecastDays = parseBody.forecast.simpleforecast.forecastday;
		console.log(forecastDays);
		let fourDay = [];
		let day = {};

		// forecastDays.forEach(function(day) {
		// 	totalDay.weekday = day.date.weekday;
		// 	totalDay.high = day.high.fahrenheit;
		// 	totalDay.low = day.low.fahrenheit;
		// 	totalDay.condition = day.conditions;
		// 	totalDay.maxwind = day.maxwind.mph;
		// 	fourDay.push(totalDay);
		// });

		for (var i = 0; i < forecastDays.length; i++) {
			day.weekday = forecastDays[i].date.weekday;
			day.high = forecastDays[i].high.fahrenheit;
			day.low = forecastDays[i].low.fahrenheit;
			day.conditions = forecastDays[i].conditions;
			day.maxwind = forecastDays[i].maxwind.mph;
			day.icon = forecastDays[i].icon_url;
			fourDay.push(day);
			day = {};
		}
		//console.log(day);
		console.log(fourDay);

		res.json(fourDay);
	});

}

function getCurrentDay (req, res) {
	let latlng = req.params.id;

	let url = 'http://api.wunderground.com/api/' + wKey + '/conditions/q/' + latlng + '.json';
	request (url, function (error, response, body) {
		let parseBody = JSON.parse(body);
		console.log("current day is:", parseBody);
		// console.log("city state is: ", parseBody.current_observation.display_location.full);
		// console.log("elevation is: ", parseBody.current_observation.display_location.elevation);
		// console.log("temp is: ", parseBody.current_observation.temp_f);
		// console.log("pressure is: ", parseBody.current_observation.pressure_in);
		// console.log("pressure trend is: ", parseBody.current_observation.pressure_trend);
		// console.log("feels like: ", parseBody.current_observation.feelslike_f);
		// console.log("wind mph: ", parseBody.current_observation.wind_mph);
		// console.log("wind direction: ", parseBody.current_observation.wind_dir);
		// console.log("weather is: ", parseBody.current_observation.weather);
		// console.log("icon: ", parseBody.current_observation.icon_url);

		let mElevation = parseFloat(parseBody.current_observation.display_location.elevation);
		let convertElevation = Math.round(mElevation * 3.28);
		//console.log("elevation is: ", mElevation);
		//console.log("converted elevation is: ", convertElevation);

		let currentDay = {
			city_state: parseBody.current_observation.display_location.full,
			elevation: "     Elev. " + convertElevation + "'",
			temp: parseBody.current_observation.temp_f + "°F",
			pressure: parseBody.current_observation.pressure_in,
			pressure_trend: parseBody.current_observation.pressure_trend,
			feels_like: parseBody.current_observation.feelslike_f + "°F",
			wind_mph: parseBody.current_observation.wind_mph,
			wind_dir: parseBody.current_observation.wind_dir,
			weather: parseBody.current_observation.weather,
			icon: parseBody.current_observation.icon_url
		};

		console.log(currentDay);

		res.json(currentDay);


	});


	}

function getAstronomy (req, res) {
	let latlng = req.params.id;

	let url = 'http://api.wunderground.com/api/' + wKey + '/astronomy/q/' + latlng + '.json';
	request (url, function (error, response, body) {
		var parseBody = JSON.parse(body);
		//console.log(parseBody);


		let currentMoon = {
			sunrise: parseBody.moon_phase.sunrise.hour + ":" + parseBody.moon_phase.sunrise.minute,
			sunset: parseBody.moon_phase.sunset.hour + ":" + parseBody.moon_phase.sunset.minute,
			moonrise: parseBody.moon_phase.moonrise.hour + ":" + parseBody.moon_phase.moonrise.minute,
			moonset: parseBody.moon_phase.moonset.hour + ":" + parseBody.moon_phase.moonset.minute,
			percentIlluminated: parseBody.moon_phase.percentIlluminated,
			phaseofmoon: parseBody.moon_phase.phaseofMoon
		};

		console.log(currentMoon);
		res.json(currentMoon);
	});
}

function getHourly (req, res) {
	let latlng = req.params.id;

	let url = 'http://api.wunderground.com/api/' + wKey + '/hourly/q/' + latlng + '.json';
	request (url, function (error, response, body) {
		var parseBody = JSON.parse(body);
		console.log(parseBody);
	});
}

function getFutureMoon (req, res) {
	let latlng = req.params.id;

	let url = 'http://api.usno.navy.mil/rstt/oneday?date=5/9/2017&coords=' + latlng;
	request (url, function (error, response, body) {
		var parseBody = JSON.parse(body);
		console.log(parseBody);



		res.json(parseBody);
	});
}

module.exports = {
	getFourDay: getFourDay,
	getCurrentDay: getCurrentDay,
	getAstronomy: getAstronomy,
	getHourly: getHourly,
	getFutureMoon: getFutureMoon
};
