var tape = require('tape');
var argv = require('minimist')(process.argv.slice(2), {
    alias: { 'grep': 'g' }
});

// If --grep option is used run only tests matching pattern
var pattern = argv.grep ? new RegExp(argv.grep) : null;

// Test to be run before every other test
var _beforeEach = [];

// Test to be run after every other test
var _afterEach = [];

// Export magicTape and all tape methods
module.exports = magicTape;
module.exports.beforeEach = beforeEach;
module.exports.afterEach = afterEach;
for (var k in tape) magicTape[k] = tape[k];

// Main magicTape function that wraps tape
function magicTape(name, conf, cb) {
    if (!pattern) {
        if (_beforeEach.length) {
            for (var i = 0; i < _beforeEach.length; i++) {
                tape.apply(this, _beforeEach[i]);
            }
        }
        tape.apply(this, arguments);
        if (_afterEach.length) {
            for (var i = 0; i < _afterEach.length; i++) {
                tape.apply(this, _afterEach[i]);
            }
        }
    } else if (pattern.test(name)) {
        tape.apply(this, arguments);
    }
}

function beforeEach() { _beforeEach.push(arguments); }

function afterEach() { _afterEach.push(arguments); }

