//This document is a refactoring in progress.
//*Copyright 2013. Paladin Innovators LLC. All rights reserved.*

//Setup dependencies
var mdns = require('mdns');
var express = require('express');
var win32ole = require('win32ole');
var wirecast = require('./wirecast');

//Setup important properties
var app = express();
var lifetime = 0;

// Kinda obvious.... pass -v for verbose logging
if (process.argv.indexOf("-v") >= 2)
    app.use(express.logger('dev'));

//Messy wirecast start up stuff will eventually be consolidated in the
//appropriate module.
try {
    var changeshotindex = require('./wirecast')
    //Should be passed in
    var docID = 1;
    var shotIndex = 2;

    //Get Wirecast
    var wirecastObj = win32ole.client.Dispatch('Wirecast.Application');
    var document = wirecastObj.DocumentByIndex(docID);
    var layer = document.LayerByName('Normal');
    wirecast.changeShotIndex(layer, shotIndex);
    wirecast.broadcast(document, false);
} catch(e) {
    console.log("Error: ", e)
}

// Setup Bonjour advertisement.. need a better solution for this.
var advertiseServer = mdns.createAdvertisement(mdns.tcp('paladin-remote'), 1337, function(err, service){
    if(err) {
        console.log('ERROR:', err);
    }else{
        console.log(service);
    }
});
advertiseServer.start();

//Serve static content.
app.use(express.static(__dirname + '/static', {maxAge: lifetime}));

//Calls meant for `wirecast`. This section should be made into a
//seperate javascript module.
app.use('/wirecast', function(req, res, next){
     var params = cleanAjaxQuery(req.query);
     //console.log("params:", params);

    //quick and dirty replacement of perl with js
    switch(req.path) {
        // returns object with shot indexes and names as
        // property/value pairs in the form 
        //`{'1': 'shot1 name', '2': 'shot2 name'}`
    case "/shotnames":
        res.send(wirecast.shotnames(document,layer));
        break;

    case "/broadcast":
        if(wirecast.broadcast(document, ('true' == params.start))) {
            res.send(200);
        }else{
            res.send(500);
        }
        break;
        
    case "/record":
        if(wirecast.record(document, ('true' == params.start))) {
            res.send(200);
        }else{
            res.send(500);
        }
        break;
        
    case "/changeshotindex":
        if(wirecast.changeShotIndex(layer, params['shotIndex'])){
            res.send(200);
        }else{
            res.send(500)
        }
        break;
    default:
        res.send(404);
        break;
    }
});

//Listening on port 1337.
app.listen(1337);

// _ is used by jQuery to hack IE caching, not a value you
// care about passing to perl. This function cleans that out. If
// paramterizeString is true, returns parameters seperated by " ".
function cleanAjaxQuery(ajaxQuery, parameterizeString) {
    parameterizeString = typeof parameterizeString !== 'undefined' ? parameterizeString : false;
    var cleanQuery = parameterizeString ? "" : {} ;
    for (p in ajaxQuery) {
        if("_" == p)
            continue;
        if(parameterizeString) {
            cleanQuery += " " + ajaxQuery[p];
            continue;
        }
        cleanQuery[p] = ajaxQuery[p];
    }
    return cleanQuery;
}
