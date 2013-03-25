//Dependencies
var win32ole = require('win32ole');
var wirecast = require("../wirecast/broadcast");

exports['broadcast'] = function(test) {
    try {
        
        //Should be passed in
        var docID = 1;
        var shotIndex = 2;

        //Get Wirecast
        var wirecastObj = win32ole.client.Dispatch('Wirecast.Application');
        var document = wirecastObj.DocumentByIndex(1);

    }catch(e){
        console.log('**exception caught ***\n' + e);
    }
    test.equal(wirecast.broadcast(document, true), true);
    test.equal(wirecast.broadcast(document, false), true);
    // test.throws(function() {wirecast.broadcast()});
    // test.throws(function() {wirecast.broadcast(null)});
    // test.throws(function() {wirecast.broadcast(true)});
    // test.throws(function() {wirecast.broadcast(1, true)});
    test.done();
}
