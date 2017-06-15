
// $(document).ready(function(){
//     console.log( "ready!" );
// });




// // INITIALIZES THE MAP //
// function initMap() {
//     // used to hold all of the markers
//     var markerArray = [];
    
//     //**preloaded spots when the page loads**
//     var denver = {lat: 39.7392, lng: -104.9903};
   
//    // This is the actual map we are working off of //
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 10,
//       center: denver
//     });

//      // var marker = new google.maps.Marker({
//      //    position: denver,
//      //    map: map
//      //  });

//      var thisWindow = new google.maps.InfoWindow({
//       content: 'Fishing Spot'
//      });

//     // Event listener for map, makes a new spot on click
//     map.addListener('click', function(e) {
//           placeMarkerAndPanTo(e.latLng, map);
//           });
   
     

//         // Creates a new marker and saves it to the Marker Array //
//          function placeMarkerAndPanTo(latLng, map) {
//       let fishMarker = new google.maps.Marker({
//         position: latLng,
//         map: map
//       });
//       markerArray.push(fishMarker);
    
//       //**Custom info window for making new spot**
//       var newSpotForm = new google.maps.InfoWindow({
//         content: "<form>" +
//                   "Spot Name:" + "<br>" +
//                   "<input type='text' id='spotName' name='spotName' placeholder=''>" +
//                   "<br>" +
//                   "<button id='oneWeek'>One Week</button>" +
//                   "<input type='submit' id='submit' value='submit'>" + "<br><br>" +
//                   "</form>"
      
//       });

//       //**Opens new-spot form so that data can be pulled from form**
//       newSpotForm.open(map, fishMarker);

//       //needs to look like '2342342.234,-2342342.234'


     

//       // console.log(latAndLng());
     
      
//       let fishSpot = {
//         lat: fishMarker.position.lat(),
//         lng: fishMarker.position.lng()
//       };
       
//        let fullCoordinates = (fishSpot.lat + ',' + fishSpot.lng);
//        console.log(fullCoordinates);
      

            

            

      
//           //On submitting the new form, make ajax request here
//           $('form').submit(function(event){
//             event.preventDefault();
//             // console.log(fishSpot);
//               $.ajax({
//                 url:'/fishspots',
//                 type: 'POST',
//                 data: fishSpot,
//               }).done(function(data){
//                 console.log(data);
//                 $('#dropDataHere').append(data);
//               });
            
//                 newSpotForm.close();
//               });


//           $('#oneWeek').click(function(event){
//               event.preventDefault();
//                 $.ajax({
//                   url:'/fishweek',
//                   type: 'POST',
//                   data: fishSpot,
//                 }).done(function(data){
//                   console.log(data);
//                 });
//                   newSpotForm.close();
//           });




//   } // Closing tag for the Initialized Map -- all code for map goes inside //

// }
// //******************************************************************************//
// //**************TESTING MATERIALS SECTION *** TESTING MATERIALS SECTION*********//


//           //****************************************//
//           //** THIS CODE WORKS FOR DISPLAYING  *****//
//           //** ALL LAT LNG'S FOR MARKERS IN ARRAY **//
//           //****************************************//
//           // for(i=0;i<markerArray.length;i++){
//           //   console.log(markerArray[0].position.lat() + " " + markerArray[0].position.lng());




