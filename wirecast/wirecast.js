//Dependencies
var win32ole = require('win32ole');

exports = {
    broadcast: require('broadcast').broadcast;
    record: exports.record = require('record').record;
}
exports.layer = {
    shotnames: require('./shotnames').shotnames;
}
