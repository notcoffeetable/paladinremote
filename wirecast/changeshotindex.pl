#!/usr/bin/perl
use strict;
use CGI;

require Win32::OLE;

print "getting wirecast...\n";
my $w = Win32::OLE->GetActiveObject("Wirecast.Application");

if ($w) {
    my $d = $w->DocumentByIndex(1);
    my $l = $d->LayerByName("Normal");
    if($ARGV[0] =~ /^[+-]?\d+$/) {
        my $s = $l->ShotIDByIndex($ARGV[0]);
        if($s) {
            print $s;
            print "attempting to change shot...\n";
            $l->{'ActiveShotID'} = $s;
        }
    }

}else{
    print "couldn't get wirecast";
}
