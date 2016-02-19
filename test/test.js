// We test magic-tape using tape (yay)

var path = require('path');
var tape = require('tape');
var exec = require('child_process').exec;
var tapeBin = path.resolve(__dirname + '/../node_modules/.bin/tape');

tape('normal', function(assert) {
    exec(tapeBin + ' ' + path.resolve(__dirname + '/example-project.js'), function(err, stdout, stderr) {
        assert.ifError(err);
        assert.equal(/tests 6/.test(stdout), true, 'runs 6 tests');
        assert.equal(/# apples/.test(stdout), true, 'runs apples');
        assert.equal(/# bananas/.test(stdout), true, 'runs bananas');
        assert.equal(/# oranges/.test(stdout), true, 'runs oranges');
        assert.end();
    });
});

tape('-g apples', function(assert) {
    exec(tapeBin + ' -g apples ' + path.resolve(__dirname + '/example-project.js'), function(err, stdout, stderr) {
        assert.ifError(err);
        assert.equal(/tests 2/.test(stdout), true, 'runs 2 tests');
        assert.equal(/# apples/.test(stdout), true, 'runs apples');
        assert.equal(/# bananas/.test(stdout), false, 'skips bananas');
        assert.equal(/# oranges/.test(stdout), false, 'skips oranges');
        assert.end();
    });
});

tape('--grep apples', function(assert) {
    exec(tapeBin + ' --grep apples ' + path.resolve(__dirname + '/example-project.js'), function(err, stdout, stderr) {
        assert.ifError(err);
        assert.equal(/tests 2/.test(stdout), true, 'runs 2 tests');
        assert.equal(/# apples/.test(stdout), true, 'runs apples');
        assert.equal(/# bananas/.test(stdout), false, 'skips bananas');
        assert.equal(/# oranges/.test(stdout), false, 'skips oranges');
        assert.end();
    });
});

tape('beforeEach', function(assert) {
    exec(tapeBin + ' ' + path.resolve(__dirname + '/example-before.js'), function(err, stdout, stderr) {
        assert.ifError(err);
        assert.equal(/tests 9/.test(stdout), true, 'runs 9 tests');
        assert.deepEqual(stdout.split('\n'), [
            'TAP version 13',
            '# before',
            'ok 1 wash the fruits!',
            '# apples',
            'ok 2 crunchy',
            'ok 3 mushy',
            '# before',
            'ok 4 wash the fruits!',
            '# bananas',
            'ok 5 yellow',
            'ok 6 brown',
            '# before',
            'ok 7 wash the fruits!',
            '# oranges',
            'ok 8 sour',
            'ok 9 tough',
            '',
            '1..9',
            '# tests 9',
            '# pass  9',
            '',
            '# ok',
            '',
            ''
        ], 'washes fruits before each testrun');
        assert.end();
    });
});

tape('afterEach', function(assert) {
    exec(tapeBin + ' ' + path.resolve(__dirname + '/example-after.js'), function(err, stdout, stderr) {
        assert.ifError(err);
        assert.equal(/tests 9/.test(stdout), true, 'runs 9 tests');
        assert.deepEqual(stdout.split('\n'), [
            'TAP version 13',
            '# apples',
            'ok 1 crunchy',
            'ok 2 mushy',
            '# after',
            'ok 3 compost the scraps!',
            '# bananas',
            'ok 4 yellow',
            'ok 5 brown',
            '# after',
            'ok 6 compost the scraps!',
            '# oranges',
            'ok 7 sour',
            'ok 8 tough',
            '# after',
            'ok 9 compost the scraps!',
            '',
            '1..9',
            '# tests 9',
            '# pass  9',
            '',
            '# ok',
            '',
            ''
        ], 'washes fruits before each testrun');
        assert.end();
    });
});

