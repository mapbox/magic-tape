magic-tape
----------
Wrapper around tape that adds a few additional goodies. Note that you will also want to include `tape` as one of your project's dependencies if you want to use the `tape` testrunner command.

**Before**

```js
var tape = require('tape');

tape('apples', function(assert) {
    assert.ok(true, 'apples are great!');
    assert.end();
});
```

**After**

```js
var tape = require('magic-tape');

tape('apples', function(assert) {
    assert.ok(true, 'apples are great!');
    assert.end();
});
```

### Goodies

```sh
tape -g <pattern>
tape --grep <pattern>
```

Register and run only the tests that match `<pattern>`.

```js
var tape = require('magic-tape');
tape.beforeEach('testName', {}, function(assert) {
    assert.end();
});
```

Register and run a test once before all other tests.

```js
var tape = require('magic-tape');
tape.afterEach('testName', {}, function(assert) {
    assert.end();
});
```

Register and run a test once after all other tests.

