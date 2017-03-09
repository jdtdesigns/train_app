
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
					arr = train.first_time.split(':'),
					hour = moment().format('H'),
					minute = moment().format('m'),
					future = arr[0] * 60 + arr[1],
					current = hour * 60 + minute;
					// hours = arr[0],
					// minutes = arr[1],
					// arrival = moment(train.first_time, 'HH:mm'),
					// arrival_time = moment(moment().diff(arrival)).format('HH:mm'),
					// minutes = moment.duration(arrival.diff(currentTime)).asMinutes().toFixed();


			// Find how much time has passed since the first train
			var diff = current - future;

		// Find how many trains have come so far
			var trainsSinceFirst = Math.floor(diff/frequency);

		// Find how long until the next train comes
			var nextArrival = ((trainsSinceFirst + 1) * frequency) + ftMoment;

			if (future < current) {
				var minAway = nextArrival - timeMoment;
				var nextArrival = moment().add(minAway, 'minutes').format('HH:mm');
			} 
			else {
				var nextArrival = firstTrain;
				var minAway = ftMoment - timeMoment;
			};
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