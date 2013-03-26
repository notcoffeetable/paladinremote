//Return an object with shots in parent layer
//wirecast.layer.shotnames();
// try {
//     var win32ole = require('win32ole');
//     var wirecast = win32ole.client.Dispatch('Wirecast.Application');
//     var layer = wirecast.DocumentByIndex(1).LayerByName('Normal');
//     shotnames(wirecast.DocumentByIndex(1), layer);
// }catch(e){
//     console.log('**Error caught***\n' + e);
// }

exports.shotnames = function(document, layer){
//function shotnames(document, layer) {
    try {
        var shotcount = layer.ShotCount;
        var shots = {}
        for(var i = 1; i <= shotcount; i++) {
            shots[i] = document.ShotByShotID(layer.ShotIDByIndex(i)).Name;
            //console.log("shot " + i + ":", document.ShotByShotID(layer.ShotIDByIndex(i)).Name);
        }
    }catch(e){
        console.log('**Error caught***\n' + e);
    }
    console.log(shots);
    return shots;
}
