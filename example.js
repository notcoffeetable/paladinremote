var http = require('http');
var fs = require('fs');
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
}).listen(1337, '192.168.1.109');
console.log('Server running at http://192.168.1.109:1337/');

function startBroadcast() {
// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;

// executes `pwd`
child = exec("perl ./startbroadcast.pl", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
}

function stopBroadcast() {
// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;

// executes `pwd`
child = exec("perl ./stopbroadcast.pl", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
}

function changeShotIndex(index) {
// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;

// executes `pwd`
child = exec("perl ./changeshotindex.pl " + index, function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
}
