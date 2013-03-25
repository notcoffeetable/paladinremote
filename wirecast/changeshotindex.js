try {
    //Dependencies
    var win32ole = require('win32ole');
    
    //Should be passed in
    var docID = 1;
    var shotIndex = 2;

    //Get Wirecast
    var wirecast = win32ole.client.Dispatch('Wirecast.Application');
    var document = wirecast.DocumentByIndex(1);
    //changeShotIndex(document.LayerByName('Normal'), shotIndex);

}catch(e){
    console.log('**exception caught ***\n' + e);
}

exports.changeShotIndex = function(layer, index) {
    try{
        var shotID = layer.ShotIDByIndex(index);

        //Using setters and getters is supposed to be obsoleted but calling
        //`layer.ActiveShotID = shotID` causes OLE errors.
        layer.set('ActiveShotID', shotID);
    }catch(e){
        console.log('**exception caught ***\n' + e);
    }
    return true;
}
