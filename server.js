//This document is a refactoring in progress.
//*Copyright 2013. Paladin Innovators LLC. All rights reserved.*

//Setup dependencies
var mdns = require('mdns');
var express = require('express');

//Setup important properties
var app = express();
var lifetime = 0;

// Setup Bonjour advertisement
var advertiseServer = mdns.createAdvertisement(mdns.tcp('paladin-remote'), 1337, function(err, service){
    if(err) {
        console.log('ERROR:', err);
    }else{
        console.log(service);
    }
});
advertiseServer.start();

// Kinda obvious....
app.use(express.logger('dev'));

//Serve static content.
app.use(express.static(__dirname + '/static', {maxAge: lifetime}));

//Calls meant for `wirecast`.
app.use('/wirecast', function(req, res, next){
    console.log('call to wirecast!!!');
});

//Listening on port 1337.
app.listen(1337);
