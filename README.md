paladin-remote
=============

Summary
-------
Remote control for Telestream's Wirecast through a node.js served web interface. OLE manipulation through Perl. Documentation in `/docs` by docco (currently incomplete).

Dependencies
------------
- Express
- mdns

How to Use/Install
------------------
- Clone repo
- `cd paladinremote && npm install`
- `node server.js [-v]`
- Make sure Telestream Wirecast is running, currently shots are only recognized in layer 3.
- In your browser go to `localhost:1337`

*Copyright 2013. Paladin Innovators LLC. All rights reserved.*