var win32ole = require('win32ole');
var wirecast = require('../wirecast/record');

exports['record'] = function(test) {    
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
    test.equal(wirecast.record(document, true), true);
    test.equal(wirecast.record(document, false), true);
    test.done();
}
