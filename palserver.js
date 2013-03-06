/*
* Initial working but messy server code.
*
* Copyright 2012. Paladin Innovators LLC. All rights reserved.
*/
var http = require('http');
var fs = require('fs');
var url = require('url');
var sys = require('sys')
var exec = require('child_process').exec;
var mdns = require('mdns');
var child;

var advertiseServer = mdns.createAdvertisement(mdns.tcp('paladin-remote'), 1337, function(err, service) {
      if (err) {
        console.log('ERROR:', err);
      } else {
        console.log(service);
      }
    });
advertiseServer.start();

http.createServer(function (req, res) {
    var reqUrl = url.parse(req.url).pathname;
    var _GET = url.parse(req.url, true).query;
    var params = "";

    if("/" == reqUrl)
        reqUrl += "index.html";

    if(1 == reqUrl.split(".").length)
        reqUrl += ".pl";

    if(undefined != _GET) {
        for (p in _GET) {
            // _ is used by jQuery to hack IE caching, not a value you
            // care about passing to perl.
            if("_" == p)
                continue;
            console.log(p + " : " + _GET[p]);
            params += " " + _GET[p];
        }
    }

    if(fs.exists("." + reqUrl, function (exists) {
        if(exists && ("pl" != reqUrl.split(".")[1])) {
            fs.readFile("." + reqUrl, function (err, data) {
                if(!err) {
                    res.end(data);
                }else{
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.end('Five hundred: something done broke!');
                    console.log(err);
                }
            });
        } else if (exists && ("pl" == reqUrl.split(".")[1])) {
            console.log("perl ." + reqUrl + params);
            child = exec("perl ." + reqUrl + params, function (error, stdout, stderr) {
//              sys.print(stdout);
                var perlResponse = stdout.split("\n");
                if(perlResponse.length > 1) {
//                  console.log(perlResponse[1] + "\n");
                    res.writeHead(200, {'content-type': 'text/json'});
                    res.end(JSON.stringify(perlResponse));
                }else{
                    res.end();
                }
//                sys.print('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });          
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('Four oh Four!');
        }
    }));

}).listen(1337);
console.log('Server running...\n');
