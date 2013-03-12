/*
* This document is a refactoring in progress.
*
*Copyright 2012. Paladin Innovators LLC. All rights reserved.
*
*/


var http = require('http');
var fs = require('fs');
var mdns = require('mdns');

var advertiseServer = mdns.createAdvertisement(mdns.tcp('paladin-remote'), 1337, function(err, service) {
      if (err) {
        console.log('ERROR:', err);
      } else {
        console.log(service);
      }
    });
advertiseServer.start();

http.createServer(function (req, res) {
  var functionCall = req.url.split("/")[1].split("?")[0];
  console.log(functionCall + '\n');
  if("startBroadcast" == functionCall) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('Attemped to start broadcast\n');
      startBroadcast.call();
  }
  if("stopBroadcast" == functionCall){  
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('attempted to stop broadcast\n');
      stopBroadcast.call();
  }
  if("changeShotIndex" == functionCall){
      res.writeHead(200, {'Content-Type': 'text/html'});
      var shotID = req.url.split("/")[1].split("?")[1].split("&")[0].split("=")[1];
      console.log('new shot: ' + shotID);
      res.end('attempted to change shot index');
      changeShotIndex(shotID);
  }else{
      console.log(fs.existsSync('./' + functionCall));
      if(fs.existsSync('./' + functionCall)) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(fs.readFileSync('./' + functionCall));
      }else{
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end('Four oh Four!');
      }
  }
}).listen(1337);
console.log('Server running');

function startBroadcast() {
var sys = require('sys')
var exec = require('child_process').exec;
var child;

child = exec("perl ./startbroadcast.pl", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
}

function stopBroadcast() {
var sys = require('sys')
var exec = require('child_process').exec;
var child;

child = exec("perl ./stopbroadcast.pl", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
}

function changeShotIndex(index) {
var sys = require('sys')
var exec = require('child_process').exec;
var child;

child = exec("perl ./changeshotindex.pl " + index, function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
}
