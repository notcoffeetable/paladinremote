paladin-remote
==============

Summary
-------
Remote control for Telestream's Wirecast through a node.js served web interface. OLE manipulation through Perl. Documentation in `/docs` by docco (currently incomplete).

Dependencies
------------
- Express
- mdns

Requirements
------------
- Python ~> 2.7.3
- Wirecast ~> 4.0

How to Use/Install
------------------
Add python as an environment variable to your $PATH

Open **Control Panel> System> Advanced System Settings> Environment Variables> Edit**
Add the following to your PATH variable

	c:\python27;c:\python27\scripts

Clone Repo and Install Dependencies

	git clone git@github.com:notcoffeetable/paladinremote.git
	cd paladinremote
	npm install

Start the server

	node server.js [-v]
	
Make sure Telestream Wirecast is running, currently shots are only recognized in layer 3.

In your browser go to `localhost:1337`

*Copyright 2013. Paladin Innovators LLC. All rights reserved.*