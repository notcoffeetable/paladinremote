#!/usr/bin/perl
use strict;
use CGI;

require Win32::OLE;

print "getting wirecast...\n";
checkwirecast();

sub checkwirecast {
    my $w = Win32::OLE->GetActiveObject("Wirecast.Application");
    if($w == 0) {
        print "loading wirecast \n";
        $w = Win32::OLE->new("Wirecast.Application");
    }

    if($w) {
        print "got wirecast";
    }
}
