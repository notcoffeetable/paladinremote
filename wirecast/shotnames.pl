#!/usr/bin/perl
use strict;
use CGI;

require Win32::OLE;

#print "getting wirecast...\n";
my $w = Win32::OLE->GetActiveObject("Wirecast.Application");

if ($w) {
    my $d = $w->DocumentByIndex(1);
    my $l = $d->LayerByName("Normal");
    my $scount = $l->shotcount();
    for(my $i = 1; $i <= $scount; $i++) {
        my $s = $d->ShotByShotID($l->ShotIDByIndex($i));
        if(1 < $i) {
            print "\n";
        }
        print $s->{'name'};
    }

}else{
    print "couldn't get wirecast";
}
