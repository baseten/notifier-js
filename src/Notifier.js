var Notifier = Class.extend({

	init: function () {
		this.observers = {};
	},
	
	hasObserverKey: function (name) {
		return this.observers.hasOwnProperty(name);
	},
	
	removeObserverKey: function (name) {
		delete this.observers[name];
	},
	
	getObserverKeys: function () {
		var names = [];
		var name;
		
		for(name in this.observers) {
			names.push(name);
		}
		
		return names;
	},
	
	hasObserver: function (name, observer) {
		if(!this.hasObserverKey(name)) return false;
			
		var bool = false;
		var observers = this.observers[name];
		var i = observers.length;
		var observerTest;
		
		while(--i > -1) {
			observerTest = observers[i];
			
			// we don't care if the observer object is identical, just if the callback is
			if(observer.object == observerTest.object && observer.callback == observerTest.callback) {
				bool = true;
				break;
			}
		}
		
		return bool;
	},
	
	// to get around js problems with contexts, the parent object is passed along with the callback
	// .call() can then be used to pass the correct context in when calling the callback
	registerObserver: function (name, obj, callback) {
		var observer = new Observer(obj, callback);
		
		if(this.hasObserver(name, observer)) {
			return;
		}
		
		if(!this.hasObserverKey(name)) {
			this.observers[name] = [];
		}
		
		this.observers[name].push(observer);
	},
	
	removeObserver: function (name, obj, callback) {	
		if(!this.hasObserverKey(name)) return;
			
		var observers = this.observers[name];
		var i = observers.length;
		var observer;
		
		while(--i > -1) {
			observer = observers[i];
			
			// two duplicate observers are not possible, due to hasObserver test in registerObserver
			if(observer.object == obj && observer.callback == callback) {
				observers.splice(i, 1);
				break;
			}
		}
		
		if(observers.length == 0) {
			this.removeObserverKey(name);
		}
	},
	
	removeObservers: function (name) {
		var names, i;
		
		name = typeof(name) == 'undefined' ? false : name;
		
		if(name) {
			// remove observers against a key
			if(!this.hasObserverKey(name)) return;
		
			this.removeObserverKey(name);
		}
		else {
			// remove all observers against this object
			names = this.getObserverKeys();
			i = names.length;
			
			while(--i > -1) {
				name = names[i]
				this.removeObserverKey(name);
			}
		}
	},
	
	forwardNotification: function (n) {
		
		if(!this.hasObserverKey(n.getName())) return;
		
		this._sendNotification(n);
	},
	
	sendNotification: function (name, body, type) {
		
		if(!this.hasObserverKey(name)) return;
		
		this._sendNotification(new Notification(name, body, type));
	},
	
	_sendNotification: function (notification) {
		var observers = this.observers[notification.getName()];
		var i = observers.length;
		var observer;
		
		// as noted in PureMVC, working copy of observers is required
		// as other observers may be registered by a callback
		
		var observersCopy = [];
		
		// this process will reverse the array
		// this is ok as the final loop is also backwards
		// so observers will be notified in the order they were registered
		
		while(--i > -1) {
			observer = observers[i];
			observersCopy.push(observer);
		}
		
		i = observersCopy.length;
		
		while(--i > -1) {
			observer = observersCopy[i];
			observer.sendNotification(notification);
		}
	}
});