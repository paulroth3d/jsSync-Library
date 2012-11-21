clear

### this shellscript starts the jasmine testing

#exitOnCompletion="true";
exitOnCompletion="false";

### Check for errors; abandon the process if error exist
function checkError {
    if [[ $1 != 0 ]] ; then
        if [ $exitOnCompletion == "true" ]; then {
			echo "there were failures. now returning"
			#exit 99
		}; else {
			echo "There were failures";
			cat _jasmine-errors.txt
		}; fi;
    fi
}

echo "*** Jasmine Tests... ***"
phantomjs Jasmine-Runner.js
checkError $?


if [ $exitOnCompletion == "true" ]; then {
	echo "successful. now returning."
	#exit 0
}; else {
	echo "successful"
}; fi;
