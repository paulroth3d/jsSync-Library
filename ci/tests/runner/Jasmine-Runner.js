var LOGFILE = 'ci/output/_jasmineErrors.txt';

FS = require('fs');
phantom.injectJs('./Jasmine-Parser.js');

var url = 'file://' + FS.absolute('ci/tests/runner/spec-runner.html');
UnitTester.init(url);
