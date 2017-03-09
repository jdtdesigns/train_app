
var app = (function() {

	var addTrainToDB = function(event) {
		var name = $('#name').val(), destination = $('#destination').val(),
				first_time = $('#first_time').val(), frequency = $('#frequency').val()
				hours = first_time[0], minutes = first_time[1];

		event.preventDefault();

		// var date = new Date();
		// date.setHours(hours);
		// date.setMinutes(minutes);


		var db = firebase.database().ref('/trains'),
				train = {};

		train.name = name;
		train.destination = destination;
		train.first_time = first_time;
		train.frequency = frequency;

		db.push(train);	
		$('form').find('input').val('');	

	};

	var getTrains = function() {
		var db = firebase.database().ref('/trains');

		db.on('child_added', function(train) {
			var train = train.val(), currentTime = moment(),
					arr = train.first_time.split(':');
					// hours = arr[0],
					// minutes = arr[1],
					// arrival = moment(train.first_time, 'HH:mm'),
					// arrival_time = moment(moment().diff(arrival)).format('HH:mm'),
					// minutes = moment.duration(arrival.diff(currentTime)).asMinutes().toFixed();
			var future = arr[0] * 60 + arr[1];
			console.log(future);



			// var arrive = moment().set({
   //       'hour' : hours,
   //       'minute'  : minutes 
   //    });

			// console.log(arrive);
			// 12:00 
			// every 30 minutes -- 12:30 1:00 1:30
			// 1:27 Need 1:30 - 1:27 = 3 minutes

			$('table tbody').append(
				'<tr>' + 
					'<td>' + train.name + '</td>' +
					'<td>' + train.destination + '</td>' +
					'<td>' + train.frequency + '</td>' +
					'<td>' + 'blah' + '</td>' + 
					'<td>' + 'blah' + '</td>' +
				'</tr>'
			);
		});

	};

	var init = function() {
		// console.log()

		$('#submit').on('click', addTrainToDB);
		getTrains();
	};

	return { init: init };
})();

app.init();