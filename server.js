//This document is a refactoring in progress.
//*Copyright 2013. Paladin Innovators LLC. All rights reserved.*

//Setup dependencies
var mdns = require('mdns');
var express = require('express');

//Setup important properties
var app = express();
var lifetime = 0;

// Kinda obvious.... pass -v for verbose logging
if (process.argv.indexOf("-v") >= 2)
    app.use(express.logger('dev'));

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
//seperate module.
app.use('/wirecast', function(req, res, next){
    console.log(req.path);
    console.log(req.query);
    var sys = require('sys')
    var exec = require('child_process').exec;
    var child;
    var params = cleanAjaxQuery(req.query, true);

    console.log(params);

    child = exec("perl ./wirecast" + req.path + ".pl" + params, function (error, stdout, stderr) {
        var perlResponse = stdout.split("\n");
        if(perlResponse.length > 1) {
            res.send(perlResponse);
        }else{
            console.log(perlResponse);
            res.send(500);
        }
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    
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
