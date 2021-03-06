var test = require('tape');
var mobservable = require('mobservable');
var observer = require('../').observer;

test('testIsComponentReactive', function(test) {
    var component = observer({ render: function() {}});
    test.equal(component.isMobservableReactObserver, true);
    test.equal(mobservable.isObservable(component), false); // dependencies not known yet
    test.equal(mobservable.isObservable(component.render), false); // dependencies not known yet

    component.componentWillMount();
    component.render();
    test.equal(mobservable.isObservable(component.render), true); // dependencies not known yet
    test.equal(mobservable.isObservable(component), false);

    mobservable.extendReactive(component, {});
    test.equal(mobservable.isObservable(component), true);

    test.end();
});

test('testGetDNode', function(test) {
    var getD = mobservable.extras.getDNode;

    var c = observer({ render: function() {}});
    c.componentWillMount();
    c.render();
    test.ok(getD(c.render));

    test.end();
});
