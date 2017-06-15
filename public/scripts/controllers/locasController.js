angular.module('fishHappensApp')
	.controller('LocaController', LocaController)
;



LocaController.$inject = ['$http'];
function LocaController ($http) {
	let vm = this;
	let latlng = "43.856501,-110.480835";

	let locaObject = {
		// resCount: 0,
		id: 1,
		current: {},
		fourDays: [],
		// flow: {},
		astronomy: {},
	};

	vm.locasList = [
		{
			name: 'Nepal',
			elevation: '6,678\'',
			temp: 99,
			current: {
				temp: 'TEST locaObject',
			},
			fourDay: [{
				high: "67",
			},
			{
				high: "88",
			}],
			moon: {
				moonrise: '5:45',
			}
		},
		locaObject,
	];

	$http
		.get('/api/weather/current/' + latlng)
		.then(function(response) {
			console.log('current data: ')
			console.log((response.data));
			const currentRes = response.data;
			vm.locasList[1].current = currentRes;
			console.log('Who am i??');
			console.log(vm.locasList);
			console.log('go city_state:');

		var ctx = document.getElementById("myChart");
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Yesterday", "Current"],
        datasets: [{
            label: 'Past 7 days',
            data: [12, 19.2, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: [
                'rgba(255,99,132,1)',
            ],
            borderWidth: 1
        },
            {label: 'temerature',
            data: [2, 4, 19, 5, 17, 3],
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
            ],
            borderWidth: 1
        },

        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

		},console.log('NOT SO FAST PLAYBOY, CURRENT ERROR'));

	$http
		.get('/api/weather/fourday/' + latlng)
		.then(function(response) {
			const fourDayRes = response.data;
			vm.locasList[1].fourDay = fourDayRes;
			console.log("four day is: ", response);
		});

	$http
		.get('/api/weather/astronomy/' + latlng)
		.then(function(response) {
			const astronomyRes = response.data;
			vm.locasList[1].astronomy = astronomyRes;
			console.log("astronomy is: ", response);

		});


}