//pass true to start broadcast false to stop broadcast.
exports.broadcast = function(document, broadcast) {
    try { 
        if(broadcast){
            document.Broadcast('start');
        }else{
            document.Broadcast('stop');
        }
    }catch(e){
        console.log('**exception caught ***\n' + e);
    }
    return true;
}
