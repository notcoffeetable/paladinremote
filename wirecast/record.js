//pass true to start broadcast false to stop recording.
exports.record = function(document, record) {
    try { 
        if(record){
            document.Broadcast('start');
        }else{
            document.Broadcast('stop');
        }
    }catch(e){
        console.log('**exception caught ***\n' + e);
    }
    return true;
}
