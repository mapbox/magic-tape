var tape = require('../index.js');

tape('apples', function(assert) {
    assert.ok('crunchy apples are the best', 'crunchy');
    assert.ok('mushy apples are the worst', 'mushy');
    assert.end();
});

tape('bananas', function(assert) {
    assert.ok('yellow bananas are the best', 'yellow');
    assert.ok('brown bananas are the worst', 'brown');
    assert.end();
});

tape('oranges', function(assert) {
    assert.ok('source oranges are the best', 'sour');
    assert.ok('tough oranges are the worst', 'tough');
    assert.end();
});

