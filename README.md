NotifierJS
==========

Simple custom event model for Javascript.

For a while now I've been frustrated by the lack of a custom event model for Javascript.
Apparently one is defined in the spec but not supported cross browser.

A lot of the js frameworks provide one in some form or another, but you don't always
necessarily want an *entire* framework.

I know a lot of people moving from the world of AS3 to Javascript and HTML5 have
complained of the lack of an event system and the one is AS3 is not only great,
but hugely integral to the language.

So here is Notifier JS. I have taken inspiration from both the AS3 event model
and the Notification system in PureMVC, anyone familiar with either should get up
and running pretty quickly.

This library is small and has no dependencies, although it is built on top of John Resig's
simple Javascript Inheritance script, to make life a little easier:

http://ejohn.org/blog/simple-javascript-inheritance/

### Example ###

If you want an object to be able to send custom notifications then extend the
Notifier class:

```html
<script>
// the extend syntax comes from John Resig's Inheritance script
var Dispatcher = Notifier.extend({
	
	foo: 0,
	
	init: function () {
		this.foo = 0;
	}
	
	updateSomething: function (value) {
		this.foo = value;
		
		// to dispatch an event call sendNotification
		// like in PureMVC the first argument is the name, second the body of the notification (optional), third type (optional)
		this.sendNotification(Dispatcher.CUSTOM_EVENT, this.foo);
	}
});

// Notification names are defined statically on the 'Class'
Dispatcher.NAME = "Dispatcher";
Dispatcher.CUSTOM_EVENT = Dispatcher.NAME + "CustomEvent";

function onFooUpdated(n) {
	console.log(n.getName());	// outputs "DispatcherCustomEvent"
	console.log(n.getBody());	// outputs 2
}

// to listen for events you need to register an observer
// this is very similar to addEventListener in AS3
// the second argument gets around scoping issues in Javascript so the callback function is run on the correct object

var dispatcher = new Dispatcher();
dispatcher.registerObserver(Dispatcher.CUSTOM_EVENT, this, onFooUpdated);
dispatcher.updateSomething(2);
</script>
```