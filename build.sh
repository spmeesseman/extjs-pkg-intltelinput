#!/bin/bash

cd "$(dirname ${BASH_SOURCE[0]})"


PACKAGEDIR=node_modules/intl-tel-input/build
PACKAGENAME=intltelinput

rm -fr $PACKAGENAME
mkdir $PACKAGENAME
cp -fr $PACKAGEDIR/* $PACKAGENAME

#
# Make file text replacements in main terh*.js and SpellTime*.js files
#

#echo "Replacing JS root path"
#echo     $PACKAGENAME/TehKey$SSVERSION
#sed -i 's/"TehKey'"$SSVERSION"'"/Ext.manifest.resources.base + "\/'"$PACKAGENAME"'\/TehKey'"$SSVERSION"'"/g' resources/terh$SSVERSION.js

#
# The Ter.js file is written without the pre-path when referencing the scripts so tht they can be
# adjusted according to version when building this package.  Add the path to the control script to
# the extjs class file where needed...
#

#echo "Replacing file reference in wrapper js"
#echo     $PACKAGENAME/ter_hlp.pdf
#sed -i s/terh25.js/terh$SSVERSION.js/g src/Ter.js

exit
