var win32ole = require('win32ole');
var wirecast = require('../wirecast/shotnames');

exports['shotnames'] = function(test) {
    test.equal(wirecast.shotnames(), true);
    test.done();
}
