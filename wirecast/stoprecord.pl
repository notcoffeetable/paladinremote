#!/usr/bin/perl
use strict;
use CGI;

require Win32::OLE;

print "getting wirecast...\n";
my $wirecast = Win32::OLE->GetActiveObject("Wirecast.Application");

if ($wirecast) {
    print "Got Wirecast \n";
  my $document = $wirecast->DocumentByIndex(1);
  $document->archivetodisk("stop");
}else{
    print "couldn't get wirecast";
}
