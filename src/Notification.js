var Notification = function (name, body, type) {
	
	// As Notification name, body and type is so important
	// js 'private' vars are worth the extra memory footprint
	
	var _name = name;
	var _body = typeof(body) == 'undefined' ? null : body;
	var _type = typeof(type) == 'undefined' ? null : type;
	
	this.getName = function () {
		return _name;
	}
	
	this.getBody = function () {
		return _body;
	}
	
	this.getType = function () {
		return _type;
	}
	
	this.setBody = function (body) {
		_body = body;
	}
	
	this.setType = function (type) {
		_type = type;
	}
	
	this.toString = function () {
		return 'Notification ' + _name + ' ' + _type;
	}
}