export default function Task(desc, freq = "Once", urg = 0, last = "") {
	var theTask = {}; // the object
	
	/// private variables
	var description = desc;
	var frequency = freq;
	var urgency = urg;
	var lastDone = last;
	
	urgency = parseInt(urgency, 10); // could be coming in as a string
	lastDone = parseInt(lastDone, 10); // could be coming in as a string
	
	/// public functions
	theTask.boost = function () {
		urgency += 1;
	};

	theTask.description = function () {
		return description;
	};
	
	theTask.urgency = function (fuzzinate) {
		if (fuzzinate) {
			return urgency + Math.floor(Math.random() * 5);
		} else {
			return urgency;
		}
	};
	
	theTask.toString = function () {
		return '{"description": "' + description + '", "frequency": "' + frequency + '", "urgency": "' + urgency + '", "lastDone": "' + lastDone + '"}';
	};

	return theTask;
}
