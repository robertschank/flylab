var request = require('request');

// GET CURRENT 
function getFishSpot(req, res) {
	
	// var latMin = lat.substring(0, req.body.lat.length-8);
	
	var northLat = makeShortLat(parseFloat(req.body.lat) + 0.1);
	var southLat = makeShortLat(parseFloat(req.body.lat) - 0.1);
	var westLng = makeShortLng(parseFloat(req.body.lng) - 0.1);
	var eastLng = makeShortLng(parseFloat(req.body.lng) + 0.1);
	
	// console.log(northLat);
	// console.log(southLat);
	// console.log(westLng);
	// console.log(eastLng);
	
	request('https://waterservices.usgs.gov/nwis/iv/?format=json&bBox=' + westLng + ',' + southLat + ',' + eastLng + ',' + northLat + '&parameterCd=00060&siteType=ST&siteStatus=all', function(error, response, body){
		var parsedBody = JSON.parse(body);
		res.json(getCurrentFlow(body));
});
} // END OF GET FISH SPOT


// GETS WEEKLY DATA
function getWeeklyFlow(req, res) {
	var northLat = makeShortLat(parseFloat(req.body.lat) + 0.1);
	var southLat = makeShortLat(parseFloat(req.body.lat) - 0.1);
	var westLng = makeShortLng(parseFloat(req.body.lng) - 0.1);
	var eastLng = makeShortLng(parseFloat(req.body.lng) + 0.1);
	var today = new Date();
		today.setDate(today.getDate() - 0.24999999996);
		today = today.toISOString().substring(0, 10);
	var oneWeekAgo = new Date();
    	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7.24999999996);
    	oneWeekAgo = oneWeekAgo.toISOString().substring(0, 10);
    
	request('https://waterservices.usgs.gov/nwis/iv/?format=json&bBox=' + westLng + ',' + southLat + ',' + eastLng + ',' + northLat + '&' + 'startDT=' + oneWeekAgo + '&endDT=' + today + '&parameterCd=00060&siteType=ST&siteStatus=all', function(error, response, body){
		res.json(getWeekOfFlow(body));
		// res.json(getWeekOfFlow(body));
	});
}



//*****************//
//****FUNCTIONS****//
//*****************//

function makeShortLng(latOrLng){
		latOrLng += "";
		for(let i=latOrLng.length;i>=12;i--){
			latOrLng = latOrLng.substring(0, latOrLng.length-1);
		}
		return latOrLng;
}

function makeShortLat(latOrLng){
		latOrLng += "";
		for(let i=latOrLng.length;i>=9;i--){
			latOrLng = latOrLng.substring(0, latOrLng.length-1);
		}
		return latOrLng;
}

function getCurrentFlow(body){
	var parsedBody = JSON.parse(body);
	if(parsedBody.value.timeSeries[0] == undefined) {
		return('Sorry no stream data available');
	} else {
		var stationName = parsedBody.value.timeSeries[0].sourceInfo.siteName;
		var currentFlow = parsedBody.value.timeSeries[0].values[0].value[0].value;
		
		console.log('The Current Flow at ' + stationName + currentFlow);
		return('The Current Flow at ' + stationName + ' is: ' + currentFlow);
	}
}

// This function successfully pulls streamflow data from any given time constraint. Here it's one week // 
function getWeekOfFlow(body){
	var parsedBody = JSON.parse(body);
	var valueArray = [];
	if(parsedBody.value.timeSeries[0] == undefined) {
		return('Sorry no stream data available');
	} else {
		var stationName = parsedBody.value.timeSeries[0].sourceInfo.siteName;
		var flowData = parsedBody.value.timeSeries[0].values[0].value;
		for(let i=0; i<flowData.length; i+=47){ //   <<-- This number can be tweaked to increase/decrease the # of readings collected as it can rise VERY high
			valueArray.push(flowData[i].value);
		}
		console.log('Current Weekly Flow Data: ' + valueArray);
		
		function parsedArray(){
		for(i=0;i<valueArray.length;i++){
			valueArray[i] = parseFloat(valueArray[i]);
		}
		return valueArray;
	}

		console.log('the parsedarray is... ' + typeof parsedArray()[0]);
		// return('Current Weekly Flow Data at ' + stationName + parsedArray());
		const returnObj = {
			stationName: stationName,
			parsedArray: parsedArray(),
		};
		return (returnObj);
	}
}



// MODULE EXPORTS //

module.exports = {
getFishSpot: getFishSpot,
getWeeklyFlow: getWeeklyFlow
};




//*******************//
//***Saved URL*******//
// https://waterservices.usgs.gov/nwis/iv/?format=json&bBox=-105.278875,40.000000,-105.078875,40.151652&startDT=2017-05-01&endDT=2017-05-10&parameterCd=00060&siteType=ST&siteStatus=all


