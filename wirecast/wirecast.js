//Dependencies
var win32ole = require('win32ole');

try {
    var wirecast = win32ole.client.Dispatch('Wirecast.Application');
}catch(e){
    console.log('*** exception caught ***\n' + e);
}
exports = {
    broadcast: require('broadcast').broadcast;
    record: exports.record = require('record').record;
}
exports.layer = {
    shotnames: require('./shotnames').shotnames;
}
