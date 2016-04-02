Task = function (desc, freq, urg, last) {
	var theTask = {}; // the object
	
	/// private variables
	var description = desc;
	var frequency = freq || "Once";
	var urgency = urg || 0;
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
};

WhatShouldIDo = function (containerId) {
	var WSID = {}; // the object
	
	/// private variables
	var taskList = [];
	var displayedTask = {};
	var displayedTaskIndex = -1;
	
	/// private functions
	function loadData() {
		var rawData, rawItem, i, l, currentItem;
		
		if (localStorage["wsid.items"]) {
			rawData = JSON.parse(localStorage["wsid.items"]);
			
			l = rawData.items.length;
			for (i = 0; i < l; i++) {
				rawItem = rawData.items[i];
				currentItem = Task(rawItem.description, rawItem.frequency, rawItem.urgency, rawItem.lastDone);
				currentItem.boost();
				taskList.push(currentItem);
			}
			
			storeData(); // store the boost that's been added to the current items
		}
	}
	
	function storeData() {
		var i, l = taskList.length;
		var toStore = [];
		
		for (i = 0; i < l; i++) {
			toStore.push(taskList[i].toString());
		}
		
		localStorage["wsid.items"] = '{"items": [' + toStore.join(",") + ']}';
	}
	
	function selectAnswer(index) {
		var answer;
		if ((index >=0) && (index < taskList.length)) {
			answer = taskList.splice(index, 1);
			storeData();
		}
		return answer;
	}
	
	/// public functions
	WSID.areWeGood = function () {
		return (('localStorage' in window) && (window.localStorage !== null));
	};
	
	WSID.addToList = function (task, frequency) {
		taskList.push(Task(task, frequency));
		storeData();
	};
	
	WSID.completeTask = function () {
		if ((displayedTaskIndex >= 0) && (displayedTaskIndex < taskList.length)) {
			taskList.splice(displayedTaskIndex, 1);
			storeData();
		}
		WSID.answer();
	};
	
	WSID.skipTask = function () {
		if ((displayedTaskIndex >= 0) && (displayedTaskIndex < taskList.length)) {
			taskList[displayedTaskIndex].boost();
			storeData();
		}
		WSID.answer();
	};
	
	WSID.answer = function () {
		var i, currentUrgency, answer;
		var l = taskList.length;
		var selectedIndex = -1;
		var selectedUrgency = -1;
		
		for (i = 0; i < l; i++) {
			currentUrgency = taskList[i].urgency(true);
			if ((currentUrgency > selectedUrgency) && ((!displayedTask.description) || (taskList[i].description() !== displayedTask.description()))) {
				selectedIndex = i;
				selectedUrgency = currentUrgency;
			}
		}

		if (selectedIndex !== -1) {
			answer = taskList[selectedIndex];
		} else {
			answer = Task("Add a task");
		}
		
		$("#" + containerId).html(answer.description());
		displayedTask = answer;
		displayedTaskIndex = selectedIndex;
	};
	
	/// initialize
	loadData();
	
	return WSID;
};