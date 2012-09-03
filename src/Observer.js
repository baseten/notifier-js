var Observer = function (obj, callback) {	
	this.object = obj;
	this.callback = callback;
}

Observer.prototype.constructor = Observer;

Observer.prototype.sendNotification = function (notification) {
	this.callback.call(this.object, notification);
}